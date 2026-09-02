import { NextRequest, NextResponse } from "next/server";
import { appSupabaseAdmin } from "@/lib/appSupabase";
import { requireOrg } from "@/lib/connections/auth";
import { signState, newNonce } from "@/lib/connections/oauth";
import { getProvider } from "@/lib/connections/providers";

export const dynamic = "force-dynamic";

type Body = { region?: string };

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ category: string; provider: string }> }
) {
  const { category, provider } = await params;

  const response = NextResponse.json({ ok: true });
  const auth = await requireOrg(request, response);
  if (auth instanceof NextResponse) return auth;
  const { orgId } = auth;

  const adapter = (() => {
    try {
      return getProvider(`${category}:${provider}`);
    } catch {
      return null;
    }
  })();
  if (!adapter) return NextResponse.json({ error: `Unknown connection: ${category}/${provider}` }, { status: 404 });
  // "oauth" and "meta_oauth" (Instagram) are mechanically identical here —
  // both redirect through this same route via buildAuthUrl/exchangeCode.
  // "guided" (WhatsApp) has its own dedicated start/complete pair instead
  // (see channel/whatsapp/start/route.ts) since Embedded Signup isn't a
  // server redirect at all.
  if ((adapter.method !== "oauth" && adapter.method !== "meta_oauth") || !adapter.buildAuthUrl) {
    return NextResponse.json({ error: `${provider} does not connect via OAuth` }, { status: 400 });
  }

  let body: Body = {};
  try {
    body = (await request.json()) as Body;
  } catch {
    // no body is fine — region is optional
  }
  if (adapter.supportsRegion && !body.region) {
    return NextResponse.json({ error: "region is required for this provider" }, { status: 400 });
  }

  const admin = appSupabaseAdmin();
  const nonce = newNonce();

  // Upsert on (org_id, category, provider) — a reconnect reuses the same row
  // (0005_connections.sql's unique index) so anything referencing this
  // connection's id elsewhere never dangles.
  const { data: connection, error } = await admin
    .from("connections")
    .upsert(
      {
        org_id: orgId,
        category,
        provider,
        method: adapter.method,
        status: "pending",
        region: body.region ?? null,
        oauth_nonce: nonce,
        oauth_state_created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "org_id,category,provider" }
    )
    .select("id")
    .single();

  if (error || !connection) {
    return NextResponse.json({ error: `Failed to start connection: ${error?.message}` }, { status: 500 });
  }

  const state = signState({
    connectionId: connection.id,
    orgId,
    nonce,
    iat: Date.now(),
  });

  const authUrl = adapter.buildAuthUrl({ connectionId: connection.id, state, region: body.region });
  return NextResponse.json({ auth_url: authUrl }, { headers: response.headers });
}
