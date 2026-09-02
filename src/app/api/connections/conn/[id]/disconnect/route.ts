import { NextRequest, NextResponse } from "next/server";
import { appSupabaseAdmin } from "@/lib/appSupabase";
import { requireOrg } from "@/lib/connections/auth";
import { readSecret, deleteSecret } from "@/lib/connections/secrets";
import { getProvider } from "@/lib/connections/providers";
import type { OAuthTokens } from "@/lib/connections/providers/registry";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const response = NextResponse.json({ ok: true });
  const auth = await requireOrg(request, response);
  if (auth instanceof NextResponse) return auth;

  const admin = appSupabaseAdmin();
  const { data: connection } = await admin
    .from("connections")
    .select("id, org_id, category, provider, secret_ref")
    .eq("id", id)
    .maybeSingle();

  if (!connection || connection.org_id !== auth.orgId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const adapter = (() => {
    try {
      return getProvider(`${connection.category}:${connection.provider}`);
    } catch {
      return null;
    }
  })();

  // Best-effort provider revoke (§5.1: "revokes at the provider where
  // supported") — a failure here must not block the local disconnect.
  if (adapter?.revoke && connection.secret_ref) {
    try {
      const secret = await readSecret<OAuthTokens>(connection.secret_ref);
      if (secret) await adapter.revoke(secret);
    } catch {
      // best-effort — proceed to local disconnect regardless
    }
  }

  await deleteSecret(connection.secret_ref);

  // Row is kept, not deleted — §5.1: "reruns the same start flow on the
  // existing connection row rather than creating a new one," and anything
  // that later references this connection.id (Phase 2's config_version)
  // should resolve to "disconnected," not a dangling FK / 404.
  await admin
    .from("connections")
    .update({
      status: "disconnected",
      secret_ref: null,
      oauth_nonce: null,
      oauth_state_created_at: null,
      health_reason: null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", connection.id);

  return NextResponse.json({ ok: true }, { headers: response.headers });
}
