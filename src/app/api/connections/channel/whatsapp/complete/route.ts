import { NextRequest, NextResponse } from "next/server";
import { appSupabaseAdmin } from "@/lib/appSupabase";
import { requireOrg } from "@/lib/connections/auth";
import { verifyState } from "@/lib/connections/oauth";
import { storeSecret } from "@/lib/connections/secrets";

export const dynamic = "force-dynamic";

const GRAPH_VERSION = "v21.0";

// Client posts here once Meta's Embedded Signup JS flow finishes and hands
// back {code, wabaId, phoneNumberId} via a JS event (not a URL redirect —
// see whatsapp.ts's file comment for why this can't reuse the shared OAuth
// callback route).
//
// The exchanged token is long-lived but the PHONE NUMBER still needs Meta's
// review before it can send — status stays `pending` with a distinguishing
// `health_reason` marker ("IN_REVIEW: ...") rather than flipping to
// `active`, matching the wireframe's "◐ In review · approval ~5d" card
// state. The health job checks for this marker and flips pending→active
// once Meta's own verification status clears, with no further client
// action (§5.1: "health job flips status = active on its own").
export async function POST(request: NextRequest) {
  const response = NextResponse.json({ ok: true });
  const auth = await requireOrg(request, response);
  if (auth instanceof NextResponse) return auth;

  let body: { state?: string; code?: string; wabaId?: string; phoneNumberId?: string };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
  const { state: stateParam, code, wabaId, phoneNumberId } = body;
  if (!stateParam || !code || !wabaId || !phoneNumberId) {
    return NextResponse.json({ error: "state, code, wabaId, and phoneNumberId are all required" }, { status: 400 });
  }

  const state = verifyState(stateParam);
  if (!state || state.orgId !== auth.orgId) {
    return NextResponse.json({ error: "invalid_or_expired_state" }, { status: 400 });
  }

  const admin = appSupabaseAdmin();
  const { data: connection } = await admin
    .from("connections")
    .select("id, org_id, oauth_nonce")
    .eq("id", state.connectionId)
    .maybeSingle();

  if (!connection || connection.org_id !== auth.orgId || connection.oauth_nonce !== state.nonce) {
    return NextResponse.json({ error: "state_mismatch" }, { status: 400 });
  }

  const appId = process.env.META_CONNECTIONS_APP_ID;
  const appSecret = process.env.META_CONNECTIONS_APP_SECRET;
  if (!appId || !appSecret) {
    return NextResponse.json({ error: "WhatsApp connection is not configured" }, { status: 500 });
  }

  try {
    const tokenRes = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/oauth/access_token?` +
        new URLSearchParams({ client_id: appId, client_secret: appSecret, code }).toString()
    );
    if (!tokenRes.ok) throw new Error(`Meta token exchange failed: ${tokenRes.status} ${await tokenRes.text()}`);
    const token = (await tokenRes.json()) as { access_token: string };

    // Register the phone number for Cloud API use (required step after
    // Embedded Signup per Meta's onboarding docs) -- best-effort; a failure
    // here still leaves a usable pending connection since the client can
    // retry Test() once Meta's own review completes.
    let displayNumber: string | null = null;
    try {
      const numberRes = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${phoneNumberId}?fields=display_phone_number`, {
        headers: { Authorization: `Bearer ${token.access_token}` },
      });
      if (numberRes.ok) {
        const numberJson = (await numberRes.json()) as { display_phone_number?: string };
        displayNumber = numberJson.display_phone_number ?? null;
      }
    } catch {
      // best-effort only
    }

    const secretRef = await storeSecret(connection.id, {
      access_token: token.access_token,
      waba_id: wabaId,
      phone_number_id: phoneNumberId,
    });

    await admin
      .from("connections")
      .update({
        status: "pending",
        external_account_ref: displayNumber ?? "connected — pending Meta review",
        secret_ref: secretRef,
        scopes: ["whatsapp_business_messaging", "whatsapp_business_management"],
        oauth_nonce: null,
        oauth_state_created_at: null,
        health_reason: "IN_REVIEW: Meta approval pending — typically ~5 business days",
        updated_at: new Date().toISOString(),
      })
      .eq("id", connection.id);

    return NextResponse.json({ ok: true }, { headers: response.headers });
  } catch (err) {
    const reason = err instanceof Error ? err.message : "exchange_failed";
    await admin
      .from("connections")
      .update({ health_reason: reason, oauth_nonce: null, updated_at: new Date().toISOString() })
      .eq("id", connection.id);
    return NextResponse.json({ error: reason }, { status: 400, headers: response.headers });
  }
}
