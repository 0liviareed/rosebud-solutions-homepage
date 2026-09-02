import { registerProvider, type ProviderAdapter, type OAuthTokens } from "./registry";
import {
  buildGoogleAuthUrl,
  exchangeGoogleCode,
  refreshGoogleToken,
  revokeGoogleToken,
} from "./googleShared";

// Google Workspace mailbox — Method A (OAuth), §5.1: "Sends from their own
// mailbox." Requires the sensitive gmail.send scope, so this adapter can't
// be exercised end-to-end beyond Google's developer test-user allowlist
// until the app-verification review clears (see plan §10's parallel track —
// start that review before building this file, not after).

const SCOPES = [
  "https://www.googleapis.com/auth/gmail.send",
  "https://www.googleapis.com/auth/gmail.settings.basic", // read send-as addresses
  "https://www.googleapis.com/auth/userinfo.email",
  "openid",
];

const adapter: ProviderAdapter = {
  category: "channel",
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

  // Lists the mailbox's send-as addresses — this is exactly the data Phase
  // 2's "which sending address" scoping question (§5.1) needs, so it's
  // returned in `resources` now rather than requiring a second provider call
  // later.
  async test(secret) {
    const tokens = secret as unknown as OAuthTokens;
    const res = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/settings/sendAs", {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });
    if (!res.ok) {
      return { healthy: false, reason: `Gmail sendAs read failed: ${res.status}` };
    }
    const json = (await res.json()) as { sendAs?: { sendAsEmail: string; isDefault?: boolean }[] };
    return {
      healthy: true,
      resources: (json.sendAs ?? []).map((s) => ({
        id: s.sendAsEmail,
        label: s.isDefault ? `${s.sendAsEmail} (default)` : s.sendAsEmail,
      })),
    };
  },
};

// Keyed category:provider — "channel:google" is deliberately distinct from
// googleCalendar.ts's "calendar:google" (same provider, different category).
registerProvider("channel:google", adapter);
export default adapter;
