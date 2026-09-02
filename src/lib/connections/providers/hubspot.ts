import { registerProvider, type ProviderAdapter, type OAuthTokens } from "./registry";
import { googleRedirectUri as sharedRedirectUri } from "./googleShared";

// HubSpot CRM — Method A (OAuth). Endpoints stable/unchanged for years:
// https://developers.hubspot.com/docs/api/oauth-quickstart-guide

const AUTH_URL = "https://app.hubspot.com/oauth/authorize";
const TOKEN_URL = "https://api.hubapi.com/oauth/v1/token";
const SCOPES = ["crm.objects.contacts.read", "crm.objects.contacts.write", "crm.schemas.deals.read"];

function clientCreds() {
  const clientId = process.env.HUBSPOT_CONNECTIONS_CLIENT_ID;
  const clientSecret = process.env.HUBSPOT_CONNECTIONS_CLIENT_SECRET;
  if (!clientId || !clientSecret) throw new Error("HUBSPOT_CONNECTIONS_CLIENT_ID / HUBSPOT_CONNECTIONS_CLIENT_SECRET env missing");
  return { clientId, clientSecret };
}

const adapter: ProviderAdapter = {
  category: "crm",
  method: "oauth",

  buildAuthUrl({ state }) {
    const { clientId } = clientCreds();
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: sharedRedirectUri(),
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
        grant_type: "authorization_code",
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: sharedRedirectUri(),
        code,
      }),
    });
    if (!res.ok) throw new Error(`HubSpot code exchange failed: ${res.status} ${await res.text()}`);
    const json = (await res.json()) as { access_token: string; refresh_token: string; expires_in: number };

    const accountRes = await fetch("https://api.hubapi.com/account-info/v3/details", {
      headers: { Authorization: `Bearer ${json.access_token}` },
    });
    const account = accountRes.ok ? ((await accountRes.json()) as { portalId?: number; accountType?: string }) : {};

    return {
      access_token: json.access_token,
      refresh_token: json.refresh_token,
      expires_at: Date.now() + json.expires_in * 1000,
      external_account_ref: account.portalId ? `Portal ${account.portalId}` : "connected",
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
        grant_type: "refresh_token",
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: secret.refresh_token,
      }),
    });
    if (!res.ok) throw new Error(`HubSpot token refresh failed: ${res.status} ${await res.text()}`);
    const json = (await res.json()) as { access_token: string; refresh_token: string; expires_in: number };
    return { access_token: json.access_token, refresh_token: json.refresh_token, expires_at: Date.now() + json.expires_in * 1000 };
  },

  // No documented revoke-by-refresh-token endpoint — HubSpot's own guidance
  // is that uninstalling the app in the portal's own UI is how a client
  // revokes access. Left undefined; disconnect() already treats revoke as
  // optional and always removes our local copy regardless.

  async test(secret) {
    const tokens = secret as unknown as OAuthTokens;
    // "Pipelines" maps directly onto §5.1's post-connect scoping question
    // ("after a CRM connects, which of their pipelines or modules leads
    // write to") — same role Zoho's module list and Pipedrive's pipeline
    // list play below.
    const res = await fetch("https://api.hubapi.com/crm/v3/pipelines/deals", {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });
    if (!res.ok) return { healthy: false, reason: `HubSpot read failed: ${res.status}` };
    const json = (await res.json()) as { results?: { id: string; label: string }[] };
    return { healthy: true, resources: (json.results ?? []).map((p) => ({ id: p.id, label: p.label })) };
  },
};

registerProvider("crm:hubspot", adapter);
export default adapter;
