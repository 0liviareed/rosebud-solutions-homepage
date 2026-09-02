import { registerProvider, type ProviderAdapter, type OAuthTokens } from "./registry";
import { googleRedirectUri as sharedRedirectUri } from "./googleShared";

// Cal.com — Method A (OAuth). ⚠ LOWER CONFIDENCE THAN THE OTHER ADAPTERS —
// verified via cal.com/help/apps-and-integrations/oauth (fetched directly,
// not from memory), but two real risks found during that research and not
// yet resolved:
//   1. Cal.com's own GitHub issue tracker (calcom/cal.com#27686) reports the
//      documented token endpoint (/v2/auth/oauth2/token) returning 404 as of
//      Jan 2026 — an open, acknowledged bug, not a guess on our part.
//   2. Cal.com OAuth clients require Cal.com's own admin approval before
//      they're operational at all — a real lead-time item like Google/Meta
//      review, not just a registration form.
// Smoke-test this end-to-end against a real Cal.com account BEFORE trusting
// it in production — do not assume it works from a clean build alone.

const AUTH_URL = "https://app.cal.com/auth/oauth2/authorize";
const TOKEN_URL = "https://api.cal.com/v2/auth/oauth2/token";
const SCOPES = ["EVENT_TYPE_READ", "BOOKING_READ", "BOOKING_WRITE", "SCHEDULE_READ"];

function clientCreds() {
  const clientId = process.env.CALCOM_CONNECTIONS_CLIENT_ID;
  const clientSecret = process.env.CALCOM_CONNECTIONS_CLIENT_SECRET;
  if (!clientId || !clientSecret) throw new Error("CALCOM_CONNECTIONS_CLIENT_ID / CALCOM_CONNECTIONS_CLIENT_SECRET env missing");
  return { clientId, clientSecret };
}

const adapter: ProviderAdapter = {
  category: "calendar",
  method: "oauth",

  buildAuthUrl({ state }) {
    const { clientId } = clientCreds();
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: sharedRedirectUri(),
      response_type: "code",
      scope: SCOPES.join(" "),
      state,
    });
    return `${AUTH_URL}?${params.toString()}`;
  },

  async exchangeCode({ code }) {
    const { clientId, clientSecret } = clientCreds();
    const res = await fetch(TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        grant_type: "authorization_code",
        redirect_uri: sharedRedirectUri(),
      }),
    });
    if (!res.ok) throw new Error(`Cal.com code exchange failed: ${res.status} ${await res.text()}`);
    const json = (await res.json()) as { access_token: string; refresh_token?: string; expires_in?: number };
    if (!json.refresh_token) throw new Error("Cal.com did not return a refresh_token");

    return {
      access_token: json.access_token,
      refresh_token: json.refresh_token,
      // Cal.com's docs note access tokens expire after just 30 minutes —
      // fall back to that if expires_in is absent from the response.
      expires_at: Date.now() + (json.expires_in ?? 30 * 60) * 1000,
      external_account_ref: "connected",
      scopes: SCOPES,
    };
  },

  async refresh(secret: OAuthTokens) {
    if (!secret.refresh_token) throw new Error("No refresh_token stored for this connection");
    const { clientId, clientSecret } = clientCreds();
    const res = await fetch(TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: secret.refresh_token,
        grant_type: "refresh_token",
      }),
    });
    if (!res.ok) throw new Error(`Cal.com token refresh failed: ${res.status} ${await res.text()}`);
    const json = (await res.json()) as { access_token: string; expires_in?: number };
    return { access_token: json.access_token, refresh_token: secret.refresh_token, expires_at: Date.now() + (json.expires_in ?? 30 * 60) * 1000 };
  },

  async test(secret) {
    const tokens = secret as unknown as OAuthTokens;
    const res = await fetch("https://api.cal.com/v2/event-types", {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });
    if (!res.ok) return { healthy: false, reason: `Cal.com read failed: ${res.status}` };
    const json = (await res.json()) as { data?: { id: number; title: string }[] };
    return { healthy: true, resources: (json.data ?? []).map((e) => ({ id: String(e.id), label: e.title })) };
  },
};

registerProvider("calendar:calcom", adapter);
export default adapter;
