import { registerProvider, type ProviderAdapter, type OAuthTokens } from "./registry";
import { googleRedirectUri as sharedRedirectUri } from "./googleShared";

// Instagram — Method D (Meta OAuth), §5.1: "Same shape as Method A, against
// the client's own Meta assets... client selects their own Facebook Page
// linked to their own Instagram professional account and grants messaging
// permissions." This is the Page-linked flow (classic Facebook Login for
// Business), not the newer standalone Instagram-Login API — the doc is
// explicit that the client picks a Page, so a Page must exist in the graph.
// Graph API version pinned and centralized here (bump in one place later).

const GRAPH_VERSION = "v21.0";
const AUTH_URL = `https://www.facebook.com/${GRAPH_VERSION}/dialog/oauth`;
const TOKEN_URL = `https://graph.facebook.com/${GRAPH_VERSION}/oauth/access_token`;
const SCOPES = ["instagram_basic", "instagram_manage_messages", "pages_show_list", "pages_messaging"];

function clientCreds() {
  const clientId = process.env.META_CONNECTIONS_APP_ID;
  const clientSecret = process.env.META_CONNECTIONS_APP_SECRET;
  if (!clientId || !clientSecret) throw new Error("META_CONNECTIONS_APP_ID / META_CONNECTIONS_APP_SECRET env missing");
  return { clientId, clientSecret };
}

const adapter: ProviderAdapter = {
  category: "channel",
  method: "meta_oauth",

  buildAuthUrl({ state }) {
    const { clientId } = clientCreds();
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: sharedRedirectUri(),
      response_type: "code",
      scope: SCOPES.join(","),
      state,
    });
    return `${AUTH_URL}?${params.toString()}`;
  },

  async exchangeCode({ code }) {
    const { clientId, clientSecret } = clientCreds();
    const params = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: sharedRedirectUri(),
      code,
    });
    const res = await fetch(`${TOKEN_URL}?${params.toString()}`);
    if (!res.ok) throw new Error(`Meta code exchange failed: ${res.status} ${await res.text()}`);
    const json = (await res.json()) as { access_token: string; expires_in?: number };

    // Short-lived user token -> long-lived (required: Instagram messaging
    // needs a token that survives longer than the ~1-2hr default).
    const longLivedRes = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/oauth/access_token?` +
        new URLSearchParams({
          grant_type: "fb_exchange_token",
          client_id: clientId,
          client_secret: clientSecret,
          fb_exchange_token: json.access_token,
        }).toString()
    );
    if (!longLivedRes.ok) throw new Error(`Meta long-lived token exchange failed: ${longLivedRes.status}`);
    const longLived = (await longLivedRes.json()) as { access_token: string; expires_in: number };

    // Find the Page (and its linked IG business account) this user granted
    // access to -- the doc requires the client to pick a Page whose IG
    // account is a business/professional account.
    const pagesRes = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/me/accounts?fields=id,name,instagram_business_account&access_token=${longLived.access_token}`
    );
    const pages = pagesRes.ok
      ? ((await pagesRes.json()) as { data?: { id: string; name: string; instagram_business_account?: { id: string } }[] })
      : {};
    const withIg = (pages.data ?? []).find((p) => p.instagram_business_account);
    if (!withIg?.instagram_business_account) {
      throw new Error(
        "No Facebook Page with a linked Instagram professional account found — the account must be a business or professional account linked to a Page"
      );
    }

    return {
      access_token: longLived.access_token,
      expires_at: Date.now() + longLived.expires_in * 1000,
      external_account_ref: `@${withIg.name} (Page: ${withIg.name})`,
      scopes: SCOPES,
      // Stashed via instance_url (generic provider-extra field, same seam
      // Salesforce/Pipedrive use) -- the IG business account id every
      // subsequent Graph call needs.
      instance_url: withIg.instagram_business_account.id,
    };
  },

  // No refresh -- long-lived tokens last ~60 days and are refreshed by
  // re-exchanging before expiry via the same fb_exchange_token grant; the
  // health job's job is to detect expiry and prompt Reconnect, not silently
  // refresh (Meta requires the token still be valid to refresh it, so this
  // is a reconnect-driven model, not a refresh-token model like Google/Zoho).

  async revoke(secret: OAuthTokens) {
    await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/me/permissions?access_token=${secret.access_token}`, {
      method: "DELETE",
    });
  },

  async test(secret) {
    const tokens = secret as unknown as OAuthTokens;
    if (!tokens.instance_url) return { healthy: false, reason: "No Instagram business account id stored for this connection" };
    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${tokens.instance_url}?fields=username,name&access_token=${tokens.access_token}`
    );
    if (!res.ok) return { healthy: false, reason: `Instagram read failed: ${res.status}` };
    const json = (await res.json()) as { username?: string; name?: string };
    return { healthy: true, resources: json.username ? [{ id: tokens.instance_url, label: `@${json.username}` }] : [] };
  },
};

registerProvider("channel:instagram", adapter);
export default adapter;
