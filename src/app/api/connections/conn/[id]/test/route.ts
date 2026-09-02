import { NextRequest, NextResponse } from "next/server";
import { appSupabaseAdmin } from "@/lib/appSupabase";
import { requireOrg } from "@/lib/connections/auth";
import { readSecret, updateSecret } from "@/lib/connections/secrets";
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
  if (!adapter) return NextResponse.json({ error: "Unknown provider" }, { status: 400 });

  let secret = await readSecret<OAuthTokens>(connection.secret_ref);
  if (!secret) {
    return NextResponse.json({ healthy: false, reason: "No credential stored for this connection" }, { headers: response.headers });
  }

  let result = await adapter.test(secret);

  // One refresh-and-retry before failing, so Test stays useful without
  // waiting on the scheduled health job (plan §5, "POST /:id/test").
  if (!result.healthy && adapter.refresh && secret.refresh_token) {
    try {
      const refreshed = await adapter.refresh(secret);
      secret = { ...secret, ...refreshed };
      if (connection.secret_ref) await updateSecret(connection.secret_ref, secret);
      result = await adapter.test(secret);
    } catch {
      // fall through with the original failure result
    }
  }

  await admin
    .from("connections")
    .update({
      last_health_check: new Date().toISOString(),
      health_reason: result.healthy ? null : (result.reason ?? "unhealthy"),
      updated_at: new Date().toISOString(),
    })
    .eq("id", connection.id);

  return NextResponse.json(result, { headers: response.headers });
}
