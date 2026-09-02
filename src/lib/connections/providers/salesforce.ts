import { registerProvider, type ProviderAdapter, type OAuthTokens } from "./registry";
import { googleRedirectUri as sharedRedirectUri } from "./googleShared";

// Salesforce CRM — Method A (OAuth), region-scoped per §5.1 ("Salesforce can
// be production or sandbox"). Endpoints stable/unchanged for over a decade:
// https://help.salesforce.com/s/articleView?id=sf.remoteaccess_oauth_web_server_flow.htm
//
// Salesforce's token response includes `instance_url` — every subsequent API
// call must go to THAT host, not a fixed one (the org's actual instance can
// be on any of dozens of Salesforce pods). Stored in the secret payload
// alongside the token, same pattern as Zoho's `region`.

const API_VERSION = "v59.0";

function domainFor(region: string | undefined): string {
  return region === "sandbox" ? "test.salesforce.com" : "login.salesforce.com";
}

function clientCreds() {
  const clientId = process.env.SALESFORCE_CONNECTIONS_CLIENT_ID;
  const clientSecret = process.env.SALESFORCE_CONNECTIONS_CLIENT_SECRET;
  if (!clientId || !clientSecret) throw new Error("SALESFORCE_CONNECTIONS_CLIENT_ID / SALESFORCE_CONNECTIONS_CLIENT_SECRET env missing");
  return { clientId, clientSecret };
}

const adapter: ProviderAdapter = {
  category: "crm",
  method: "oauth",
  supportsRegion: true,

  buildAuthUrl({ state, region }) {
    const { clientId } = clientCreds();
    const params = new URLSearchParams({
      response_type: "code",
      client_id: clientId,
      redirect_uri: sharedRedirectUri(),
      scope: "api refresh_token",
      state,
    });
    return `https://${domainFor(region)}/services/oauth2/authorize?${params.toString()}`;
  },

  async exchangeCode({ code, region }) {
    const { clientId, clientSecret } = clientCreds();
    const res = await fetch(`https://${domainFor(region)}/services/oauth2/token`, {
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
    if (!res.ok) throw new Error(`Salesforce code exchange failed: ${res.status} ${await res.text()}`);
    const json = (await res.json()) as {
      access_token: string;
      refresh_token: string;
      instance_url: string;
      id: string; // identity URL, contains the org/user id
    };

    return {
      access_token: json.access_token,
      refresh_token: json.refresh_token,
      // Salesforce access tokens don't carry a fixed TTL in the response —
      // treated as short-lived; refresh proactively on any 401 via the
      // health job / test() retry rather than trusting a stored expiry.
      expires_at: Date.now() + 15 * 60 * 1000,
      instance_url: json.instance_url,
      external_account_ref: json.instance_url.replace(/^https?:\/\//, ""),
      scopes: ["api", "refresh_token"],
    };
  },

  async refresh(secret: OAuthTokens & { instance_url?: string }) {
    if (!secret.refresh_token) throw new Error("No refresh_token stored for this connection");
    const { clientId, clientSecret } = clientCreds();
    const res = await fetch(`https://${domainFor(secret.region)}/services/oauth2/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: secret.refresh_token,
      }),
    });
    if (!res.ok) throw new Error(`Salesforce token refresh failed: ${res.status} ${await res.text()}`);
    const json = (await res.json()) as { access_token: string; instance_url: string };
    return { access_token: json.access_token, refresh_token: secret.refresh_token, expires_at: Date.now() + 15 * 60 * 1000 };
  },

  async revoke(secret: OAuthTokens) {
    await fetch(`https://login.salesforce.com/services/oauth2/revoke?token=${encodeURIComponent(secret.refresh_token ?? secret.access_token)}`, {
      method: "POST",
    });
  },

  async test(secret) {
    const tokens = secret as unknown as OAuthTokens;
    if (!tokens.instance_url) return { healthy: false, reason: "No Salesforce instance URL stored for this connection" };

    const res = await fetch(`${tokens.instance_url}/services/data/${API_VERSION}/sobjects`, {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });
    if (!res.ok) return { healthy: false, reason: `Salesforce read failed: ${res.status}` };
    const json = (await res.json()) as { sobjects?: { name: string; label: string; createable: boolean }[] };
    const creatable = (json.sobjects ?? []).filter((o) => o.createable).slice(0, 50);
    return { healthy: true, resources: creatable.map((o) => ({ id: o.name, label: o.label })) };
  },
};

registerProvider("crm:salesforce", adapter);
export default adapter;
