import { registerProvider, type ProviderAdapter, type OAuthTokens } from "./registry";
import { googleRedirectUri as sharedRedirectUri } from "./googleShared";

// Zoho CRM — Method A (OAuth), region-scoped per §5.1 ("Zoho is EU / US /
// IN"). Whether one client_id serves all three data centers or each needs
// its own registration was flagged as unconfirmed in the plan — verify
// against Zoho's developer console before relying on a single
// ZOHO_CONNECTIONS_CLIENT_ID across regions; env shape here assumes one app
// works across DCs (Zoho's own docs say the OAuth app is DC-specific to
// where it was registered, but a single app CAN authorize users on other
// DCs it explicitly supports — reusing the war-room integration's existing
// EU-registered app as the default, single-DC-app assumption to confirm).

const REGION_HOSTS: Record<string, { accounts: string; api: string }> = {
  eu: { accounts: "accounts.zoho.eu", api: "www.zohoapis.eu" },
  us: { accounts: "accounts.zoho.com", api: "www.zohoapis.com" },
  in: { accounts: "accounts.zoho.in", api: "www.zohoapis.in" },
};

function hostsFor(region: string | undefined) {
  const hosts = REGION_HOSTS[region ?? ""];
  if (!hosts) throw new Error(`Unsupported Zoho region: ${region}`);
  return hosts;
}

function clientCreds() {
  const clientId = process.env.ZOHO_CONNECTIONS_CLIENT_ID;
  const clientSecret = process.env.ZOHO_CONNECTIONS_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error("ZOHO_CONNECTIONS_CLIENT_ID / ZOHO_CONNECTIONS_CLIENT_SECRET env missing");
  }
  return { clientId, clientSecret };
}

const SCOPES = ["ZohoCRM.modules.ALL", "ZohoCRM.settings.ALL", "ZohoCRM.users.READ", "aaaserver.profile.READ"];

const adapter: ProviderAdapter = {
  category: "crm",
  method: "oauth",
  supportsRegion: true,

  buildAuthUrl({ state, region }) {
    const { accounts } = hostsFor(region);
    const { clientId } = clientCreds();
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: sharedRedirectUri(),
      response_type: "code",
      scope: SCOPES.join(","),
      access_type: "offline",
      prompt: "consent",
      state,
    });
    return `https://${accounts}/oauth/v2/auth?${params.toString()}`;
  },

  async exchangeCode({ code, region }) {
    const { accounts, api } = hostsFor(region);
    const { clientId, clientSecret } = clientCreds();
    const res = await fetch(`https://${accounts}/oauth/v2/token`, {
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
    if (!res.ok) throw new Error(`Zoho code exchange failed: ${res.status} ${await res.text()}`);
    const json = (await res.json()) as { access_token?: string; refresh_token?: string; expires_in?: number; error?: string };
    if (!json.access_token || !json.refresh_token) {
      throw new Error(`Zoho code exchange did not return tokens: ${json.error ?? "unknown error"}`);
    }

    const profileRes = await fetch(`https://${api}/crm/v3/users?type=CurrentUser`, {
      headers: { Authorization: `Zoho-oauthtoken ${json.access_token}` },
    });
    const profile = profileRes.ok
      ? ((await profileRes.json()) as { users?: { email?: string }[] })
      : {};

    return {
      access_token: json.access_token,
      refresh_token: json.refresh_token,
      expires_at: Date.now() + (json.expires_in ?? 3600) * 1000,
      external_account_ref: profile.users?.[0]?.email ?? "connected",
      scopes: SCOPES,
    };
  },

  async refresh(secret: OAuthTokens) {
    if (!secret.refresh_token) throw new Error("No refresh_token stored for this connection");
    const { accounts } = hostsFor(secret.region);
    const { clientId, clientSecret } = clientCreds();
    const res = await fetch(`https://${accounts}/oauth/v2/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: secret.refresh_token,
        grant_type: "refresh_token",
      }),
    });
    if (!res.ok) throw new Error(`Zoho token refresh failed: ${res.status} ${await res.text()}`);
    const json = (await res.json()) as { access_token: string; expires_in: number };
    return {
      access_token: json.access_token,
      refresh_token: secret.refresh_token,
      expires_at: Date.now() + json.expires_in * 1000,
      region: secret.region,
    };
  },

  async revoke(secret: OAuthTokens) {
    const { accounts } = hostsFor(secret.region);
    await fetch(`https://${accounts}/oauth/v2/token/revoke?token=${encodeURIComponent(secret.refresh_token ?? "")}`, {
      method: "POST",
    });
  },

  async test(secret) {
    const tokens = secret as unknown as OAuthTokens;
    const { api } = hostsFor(tokens.region);
    const res = await fetch(`https://${api}/crm/v3/settings/modules`, {
      headers: { Authorization: `Zoho-oauthtoken ${tokens.access_token}` },
    });
    if (!res.ok) {
      return { healthy: false, reason: `Zoho CRM read failed: ${res.status}` };
    }
    const json = (await res.json()) as { modules?: { api_name: string; module_name: string }[] };
    return {
      healthy: true,
      resources: (json.modules ?? []).map((m) => ({ id: m.api_name, label: m.module_name })),
    };
  },
};

registerProvider("crm:zoho", adapter);
export default adapter;
