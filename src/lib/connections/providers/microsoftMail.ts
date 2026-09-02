import { registerProvider, type ProviderAdapter, type OAuthTokens } from "./registry";
import { buildMicrosoftAuthUrl, exchangeMicrosoftCode, refreshMicrosoftToken } from "./microsoftShared";

// Microsoft 365 mailbox — Method A (OAuth), §5.1 "Email — Google Workspace /
// Microsoft 365: mailbox OAuth ... Sends from their own mailbox." Unlike
// Gmail, Graph doesn't expose a stable public "send-as identities" list —
// /me/sendMail always sends as the authenticated mailbox's own address, so
// `resources` here is just that one address rather than a picker list.

const SCOPES = ["https://graph.microsoft.com/Mail.Send"];

const adapter: ProviderAdapter = {
  category: "channel",
  method: "oauth",

  buildAuthUrl({ state }) {
    return buildMicrosoftAuthUrl(SCOPES, state);
  },

  async exchangeCode({ code }) {
    return exchangeMicrosoftCode(code, SCOPES);
  },

  async refresh(secret: OAuthTokens) {
    if (!secret.refresh_token) throw new Error("No refresh_token stored for this connection");
    const { access_token, expires_at } = await refreshMicrosoftToken(secret.refresh_token, SCOPES);
    return { access_token, refresh_token: secret.refresh_token, expires_at };
  },

  async test(secret) {
    const tokens = secret as unknown as OAuthTokens;
    const res = await fetch("https://graph.microsoft.com/v1.0/me?$select=mail,userPrincipalName", {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });
    if (!res.ok) return { healthy: false, reason: `Microsoft Graph profile read failed: ${res.status}` };
    const profile = (await res.json()) as { mail?: string; userPrincipalName?: string };
    const address = profile.mail ?? profile.userPrincipalName ?? null;
    if (!address) return { healthy: false, reason: "Mailbox has no sendable address" };
    return { healthy: true, resources: [{ id: address, label: address }] };
  },
};

registerProvider("channel:microsoft", adapter);
export default adapter;
