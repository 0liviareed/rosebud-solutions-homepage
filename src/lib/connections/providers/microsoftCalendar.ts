import { registerProvider, type ProviderAdapter, type OAuthTokens } from "./registry";
import { buildMicrosoftAuthUrl, exchangeMicrosoftCode, refreshMicrosoftToken } from "./microsoftShared";

// Outlook Calendar (Microsoft Graph) — Method A (OAuth). Shares one Azure AD
// app with microsoftMail.ts (see microsoftShared.ts); this adapter only
// requests Calendars scope.

const SCOPES = ["https://graph.microsoft.com/Calendars.ReadWrite"];

const adapter: ProviderAdapter = {
  category: "calendar",
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
    const res = await fetch("https://graph.microsoft.com/v1.0/me/calendars", {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });
    if (!res.ok) return { healthy: false, reason: `Outlook Calendar read failed: ${res.status}` };
    const json = (await res.json()) as { value?: { id: string; name: string }[] };
    return { healthy: true, resources: (json.value ?? []).map((c) => ({ id: c.id, label: c.name })) };
  },
};

registerProvider("calendar:microsoft", adapter);
export default adapter;
