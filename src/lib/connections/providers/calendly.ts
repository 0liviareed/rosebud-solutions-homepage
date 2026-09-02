import { registerProvider, type ProviderAdapter, type OAuthTokens } from "./registry";
import { googleRedirectUri as sharedRedirectUri } from "./googleShared";

// Calendly — Method A (OAuth). Endpoints confirmed against Calendly's own
// developer docs (developer.calendly.com/api-docs/3cefb59b832eb-calendly-o-auth-2-0):
// auth.calendly.com for the OAuth dance, api.calendly.com for the API
// itself — two different hosts, don't conflate them. Access tokens expire
// after 2 hours per Calendly's docs.

const AUTH_URL = "https://auth.calendly.com/oauth/authorize";
const TOKEN_URL = "https://auth.calendly.com/oauth/token";
const SCOPES = ["scheduled_events:read"];

function clientCreds() {
  const clientId = process.env.CALENDLY_CONNECTIONS_CLIENT_ID;
  const clientSecret = process.env.CALENDLY_CONNECTIONS_CLIENT_SECRET;
  if (!clientId || !clientSecret) throw new Error("CALENDLY_CONNECTIONS_CLIENT_ID / CALENDLY_CONNECTIONS_CLIENT_SECRET env missing");
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
    if (!res.ok) throw new Error(`Calendly code exchange failed: ${res.status} ${await res.text()}`);
    const json = (await res.json()) as { access_token: string; refresh_token: string; expires_in: number };

    const meRes = await fetch("https://api.calendly.com/users/me", {
      headers: { Authorization: `Bearer ${json.access_token}` },
    });
    const me = meRes.ok ? ((await meRes.json()) as { resource?: { email?: string } }) : {};

    return {
      access_token: json.access_token,
      refresh_token: json.refresh_token,
      expires_at: Date.now() + json.expires_in * 1000,
      external_account_ref: me.resource?.email ?? "connected",
      scopes: SCOPES,
    };
  },

  async refresh(secret: OAuthTokens) {
    if (!secret.refresh_token) throw new Error("No refresh_token stored for this connection");
    const { clientId, clientSecret } = clientCreds();
    const res = await fetch(TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ client_id: clientId, client_secret: clientSecret, refresh_token: secret.refresh_token, grant_type: "refresh_token" }),
    });
    if (!res.ok) throw new Error(`Calendly token refresh failed: ${res.status} ${await res.text()}`);
    const json = (await res.json()) as { access_token: string; refresh_token: string; expires_in: number };
    return { access_token: json.access_token, refresh_token: json.refresh_token, expires_at: Date.now() + json.expires_in * 1000 };
  },

  async test(secret) {
    const tokens = secret as unknown as OAuthTokens;
    const meRes = await fetch("https://api.calendly.com/users/me", {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });
    if (!meRes.ok) return { healthy: false, reason: `Calendly read failed: ${meRes.status}` };
    const me = (await meRes.json()) as { resource?: { uri: string; email: string } };
    if (!me.resource) return { healthy: false, reason: "Calendly did not return a user profile" };

    const eventTypesRes = await fetch(`https://api.calendly.com/event_types?user=${encodeURIComponent(me.resource.uri)}`, {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });
    const eventTypes = eventTypesRes.ok
      ? ((await eventTypesRes.json()) as { collection?: { uri: string; name: string }[] })
      : {};

    return {
      healthy: true,
      resources: (eventTypes.collection ?? []).map((e) => ({ id: e.uri, label: e.name })),
    };
  },
};

registerProvider("calendar:calendly", adapter);
export default adapter;
