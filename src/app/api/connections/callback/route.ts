import { NextRequest, NextResponse } from "next/server";
import { appSupabaseAdmin } from "@/lib/appSupabase";
import { verifyState } from "@/lib/connections/oauth";
import { storeSecret } from "@/lib/connections/secrets";
import { getProvider } from "@/lib/connections/providers";

export const dynamic = "force-dynamic";

// Single generic callback for every OAuth provider — provider identity
// travels inside the signed `state`, so only one redirect URI needs
// registering in each provider's developer console
// (Rosebud_Engine_SelfServe_Build_Doc_v3.md §5.1).

function redirectToConnections(base: string, query: Record<string, string>): NextResponse {
  const url = new URL("/app/connections", base);
  for (const [k, v] of Object.entries(query)) url.searchParams.set(k, v);
  return NextResponse.redirect(url);
}

export async function GET(request: NextRequest) {
  const site = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://rosebud.global").replace(/\/$/, "");
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const stateParam = searchParams.get("state");
  const providerError = searchParams.get("error");

  if (providerError) {
    return redirectToConnections(site, { error: providerError });
  }
  if (!code || !stateParam) {
    return redirectToConnections(site, { error: "missing_code_or_state" });
  }

  const state = verifyState(stateParam);
  if (!state) {
    return redirectToConnections(site, { error: "invalid_or_expired_state" });
  }

  const admin = appSupabaseAdmin();
  const { data: connection, error: fetchError } = await admin
    .from("connections")
    .select("id, org_id, category, provider, region, oauth_nonce, status")
    .eq("id", state.connectionId)
    .maybeSingle();

  if (fetchError || !connection) {
    return redirectToConnections(site, { error: "connection_not_found" });
  }
  // Nonce cross-check — single-use replay protection beyond the HMAC itself
  // (§5.1: "a callback cannot be replayed against another tenant").
  if (connection.org_id !== state.orgId || connection.oauth_nonce !== state.nonce) {
    return redirectToConnections(site, { error: "state_mismatch" });
  }

  const adapter = (() => {
    try {
      return getProvider(`${connection.category}:${connection.provider}`);
    } catch {
      return null;
    }
  })();
  if (!adapter?.exchangeCode) {
    return redirectToConnections(site, { error: "provider_not_configured" });
  }

  try {
    const tokens = await adapter.exchangeCode({ code, region: connection.region ?? undefined });
    // region travels inside the secret payload (not just the connections
    // row) so region-scoped adapters (Zoho) can pick the right host on
    // every later refresh/test/revoke call, which only receive `secret`.
    const secretRef = await storeSecret(connection.id, {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_at: tokens.expires_at,
      region: connection.region ?? undefined,
      // Provider-specific extras (e.g. Salesforce's instance_url) that
      // exchangeCode may have returned beyond the base OAuthTokens shape —
      // persisted so test()/refresh() have them later without a schema
      // change per adapter.
      instance_url: (tokens as { instance_url?: string }).instance_url,
    });

    await admin
      .from("connections")
      .update({
        status: "active",
        external_account_ref: tokens.external_account_ref,
        scopes: tokens.scopes,
        secret_ref: secretRef,
        oauth_nonce: null,
        oauth_state_created_at: null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", connection.id);

    return redirectToConnections(site, { connected: connection.provider });
  } catch (err) {
    // Left as `pending` with a reason rather than a 6th DB status — the S2
    // card renders this as the wireframe's "error" state, derived from
    // pending + health_reason rather than a distinct stored status (v3 doc
    // §5's connection record only lists 5 status values).
    const reason = err instanceof Error ? err.message : "exchange_failed";
    await admin
      .from("connections")
      .update({ health_reason: reason, oauth_nonce: null, updated_at: new Date().toISOString() })
      .eq("id", connection.id);
    return redirectToConnections(site, { error: reason });
  }
}
