import { NextRequest, NextResponse } from "next/server";
import { appSupabaseAdmin } from "@/lib/appSupabase";
import { requireOrg } from "@/lib/connections/auth";
import { storeSecret } from "@/lib/connections/secrets";
import { getProvider } from "@/lib/connections/providers";

export const dynamic = "force-dynamic";

// Method B (credential) — §5.1: the client enters a credential for their own
// service; the server validates it live BEFORE ever storing it, so a failed
// attempt never leaves a stuck row. Unlike the OAuth start/callback pair,
// this is a single synchronous round-trip — no redirect, no signed state.
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
  if (adapter.method !== "credential") {
    return NextResponse.json({ error: `${provider} does not connect via a credential form` }, { status: 400 });
  }

  let credential: Record<string, unknown>;
  try {
    credential = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // Live-validate the RAW entered credential first. Nothing is written to
  // Supabase at all if this fails — no half-created row to clean up.
  const result = await adapter.test(credential);
  if (!result.healthy) {
    return NextResponse.json({ ok: false, reason: result.reason ?? "Validation failed" }, { status: 400, headers: response.headers });
  }

  const admin = appSupabaseAdmin();
  const { data: connection, error } = await admin
    .from("connections")
    .upsert(
      {
        org_id: orgId,
        category,
        provider,
        method: "credential",
        status: "pending",
        updated_at: new Date().toISOString(),
      },
      { onConflict: "org_id,category,provider" }
    )
    .select("id")
    .single();

  if (error || !connection) {
    return NextResponse.json({ error: `Failed to save connection: ${error?.message}` }, { status: 500 });
  }

  const secretRef = await storeSecret(connection.id, credential);

  await admin
    .from("connections")
    .update({
      status: "active",
      external_account_ref: result.externalAccountRef ?? "connected",
      secret_ref: secretRef,
      health_reason: null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", connection.id);

  return NextResponse.json({ ok: true, resources: result.resources ?? [] }, { headers: response.headers });
}
