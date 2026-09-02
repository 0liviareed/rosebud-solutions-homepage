import { registerProvider, type ProviderAdapter, type OAuthTokens } from "./registry";
import { googleRedirectUri as sharedRedirectUri } from "./googleShared";

// Pipedrive CRM — Method A (OAuth). Confirmed against Pipedrive's own
// changelog (developers.pipedrive.com/changelog/post/new-parameter-in-oauth-oauthtoken-responses):
// the token response includes `api_domain` (e.g. "https://mycompany.pipedrive.com"),
// which every subsequent API call must target — same instance-host pattern
// as Salesforce, persisted in the secret alongside the token.

const AUTH_URL = "https://oauth.pipedrive.com/oauth/authorize";
const TOKEN_URL = "https://oauth.pipedrive.com/oauth/token";

function clientCreds() {
  const clientId = process.env.PIPEDRIVE_CONNECTIONS_CLIENT_ID;
  const clientSecret = process.env.PIPEDRIVE_CONNECTIONS_CLIENT_SECRET;
  if (!clientId || !clientSecret) throw new Error("PIPEDRIVE_CONNECTIONS_CLIENT_ID / PIPEDRIVE_CONNECTIONS_CLIENT_SECRET env missing");
  return { clientId, clientSecret };
}

const adapter: ProviderAdapter = {
  category: "crm",
  method: "oauth",

  buildAuthUrl({ state }) {
    const { clientId } = clientCreds();
    const params = new URLSearchParams({ client_id: clientId, redirect_uri: sharedRedirectUri(), state });
    return `${AUTH_URL}?${params.toString()}`;
  },

  async exchangeCode({ code }) {
    const { clientId, clientSecret } = clientCreds();
    const res = await fetch(TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      },
      body: new URLSearchParams({ grant_type: "authorization_code", code, redirect_uri: sharedRedirectUri() }),
    });
    if (!res.ok) throw new Error(`Pipedrive code exchange failed: ${res.status} ${await res.text()}`);
    const json = (await res.json()) as {
      access_token: string;
      refresh_token: string;
      expires_in: number;
      api_domain: string;
    };

    return {
      access_token: json.access_token,
      refresh_token: json.refresh_token,
      expires_at: Date.now() + json.expires_in * 1000,
      instance_url: json.api_domain,
      external_account_ref: json.api_domain.replace(/^https?:\/\//, ""),
      scopes: [],
    };
  },

  async refresh(secret: OAuthTokens) {
    if (!secret.refresh_token) throw new Error("No refresh_token stored for this connection");
    const { clientId, clientSecret } = clientCreds();
    const res = await fetch(TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      },
      body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: secret.refresh_token }),
    });
    if (!res.ok) throw new Error(`Pipedrive token refresh failed: ${res.status} ${await res.text()}`);
    const json = (await res.json()) as { access_token: string; refresh_token: string; expires_in: number };
    return { access_token: json.access_token, refresh_token: json.refresh_token, expires_at: Date.now() + json.expires_in * 1000 };
  },

  async test(secret) {
    const tokens = secret as unknown as OAuthTokens;
    if (!tokens.instance_url) return { healthy: false, reason: "No Pipedrive api_domain stored for this connection" };
    // Pipelines map directly onto §5.1's "which of their pipelines" scoping
    // question, same role as HubSpot's deal pipelines above.
    const res = await fetch(`${tokens.instance_url}/api/v1/pipelines`, {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });
    if (!res.ok) return { healthy: false, reason: `Pipedrive read failed: ${res.status}` };
    const json = (await res.json()) as { data?: { id: number; name: string }[] };
    return { healthy: true, resources: (json.data ?? []).map((p) => ({ id: String(p.id), label: p.name })) };
  },
};

registerProvider("crm:pipedrive", adapter);
export default adapter;
