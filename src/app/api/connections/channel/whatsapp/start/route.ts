import { NextRequest, NextResponse } from "next/server";
import { appSupabaseAdmin } from "@/lib/appSupabase";
import { requireOrg } from "@/lib/connections/auth";
import { signState, newNonce } from "@/lib/connections/oauth";

export const dynamic = "force-dynamic";

// WhatsApp's own start route, distinct from the generic OAuth
// [category]/[provider]/start — Embedded Signup is a client-side popup
// (Meta JS SDK), not a server-built redirect URL, so there's no `auth_url`
// to return. Instead this creates the pending connection row (same
// tenant-binding pattern as OAuth) and hands back the signed `state` plus
// the public config the client-side FB.login() call needs.
export async function POST(request: NextRequest) {
  const response = NextResponse.json({ ok: true });
  const auth = await requireOrg(request, response);
  if (auth instanceof NextResponse) return auth;
  const { orgId } = auth;

  const appId = process.env.META_CONNECTIONS_APP_ID;
  const configId = process.env.META_WHATSAPP_CONFIG_ID;
  if (!appId || !configId) {
    return NextResponse.json({ error: "WhatsApp connection is not configured (missing Meta app id / config id)" }, { status: 500 });
  }

  const admin = appSupabaseAdmin();
  const nonce = newNonce();

  const { data: connection, error } = await admin
    .from("connections")
    .upsert(
      {
        org_id: orgId,
        category: "channel",
        provider: "whatsapp",
        method: "guided",
        status: "pending",
        oauth_nonce: nonce,
        oauth_state_created_at: new Date().toISOString(),
        health_reason: null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "org_id,category,provider" }
    )
    .select("id")
    .single();

  if (error || !connection) {
    return NextResponse.json({ error: `Failed to start connection: ${error?.message}` }, { status: 500 });
  }

  const state = signState({ connectionId: connection.id, orgId, nonce, iat: Date.now() });

  return NextResponse.json({ appId, configId, state }, { headers: response.headers });
}
