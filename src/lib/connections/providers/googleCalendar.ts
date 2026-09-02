import { registerProvider, type ProviderAdapter, type OAuthTokens } from "./registry";
import {
  buildGoogleAuthUrl,
  exchangeGoogleCode,
  refreshGoogleToken,
  revokeGoogleToken,
} from "./googleShared";

// Google Calendar — Method A (OAuth), Rosebud_Engine_SelfServe_Build_Doc_v3.md
// §5.1. Calendar-only scopes are non-sensitive on Google's review scale, so
// this is testable immediately (no app-verification wait) — built first for
// that reason. Shares one Google Cloud OAuth app/client_id with
// googleWorkspaceMail.ts (see googleShared.ts); the two are separate
// `connections` rows (category: calendar vs channel) with different scopes.

const SCOPES = [
  "https://www.googleapis.com/auth/calendar",
  "https://www.googleapis.com/auth/userinfo.email",
  "openid",
];

const adapter: ProviderAdapter = {
  category: "calendar",
  method: "oauth",

  buildAuthUrl({ state }) {
    return buildGoogleAuthUrl(SCOPES, state);
  },

  async exchangeCode({ code }) {
    return exchangeGoogleCode(code, SCOPES);
  },

  async refresh(secret: OAuthTokens) {
    if (!secret.refresh_token) throw new Error("No refresh_token stored for this connection");
    const { access_token, expires_at } = await refreshGoogleToken(secret.refresh_token);
    return { access_token, refresh_token: secret.refresh_token, expires_at };
  },

  async revoke(secret: OAuthTokens) {
    await revokeGoogleToken(secret);
  },

  async test(secret) {
    const tokens = secret as unknown as OAuthTokens;
    const res = await fetch("https://www.googleapis.com/calendar/v3/users/me/calendarList?maxResults=50", {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });
    if (!res.ok) {
      return { healthy: false, reason: `Google Calendar read failed: ${res.status}` };
    }
    const json = (await res.json()) as { items?: { id: string; summary: string }[] };
    return {
      healthy: true,
      resources: (json.items ?? []).map((c) => ({ id: c.id, label: c.summary })),
    };
  },
};

// Keyed category:provider to match the /api/connections/[category]/[provider]
// route params directly — "google" alone would collide with
// googleWorkspaceMail.ts, which is a different category (channel) of the
// same provider name.
registerProvider("calendar:google", adapter);
export default adapter;
