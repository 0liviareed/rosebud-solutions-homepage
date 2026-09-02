import type { OAuthTokens } from "./registry";

// Shared mechanics for every Google-backed adapter (Calendar, Workspace
// mail) — one Google Cloud OAuth app/client_id covers both; only the scope
// set and the `test()` read differ per adapter.

const AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const TOKEN_URL = "https://oauth2.googleapis.com/token";

export function googleRedirectUri(): string {
  const site = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://rosebud.global").replace(/\/$/, "");
  return `${site}/api/connections/callback`;
}

export function googleClientCreds() {
  const clientId = process.env.GOOGLE_CONNECTIONS_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CONNECTIONS_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error("GOOGLE_CONNECTIONS_CLIENT_ID / GOOGLE_CONNECTIONS_CLIENT_SECRET env missing");
  }
  return { clientId, clientSecret };
}

export function buildGoogleAuthUrl(scopes: string[], state: string): string {
  const { clientId } = googleClientCreds();
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: googleRedirectUri(),
    response_type: "code",
    scope: scopes.join(" "),
    access_type: "offline", // required to receive a refresh_token
    prompt: "consent", // force re-consent so we always get a fresh refresh_token
    state,
  });
  return `${AUTH_URL}?${params.toString()}`;
}

export async function exchangeGoogleCode(
  code: string,
  scopes: string[]
): Promise<OAuthTokens & { external_account_ref: string; scopes: string[] }> {
  const { clientId, clientSecret } = googleClientCreds();
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      grant_type: "authorization_code",
      redirect_uri: googleRedirectUri(),
    }),
  });
  if (!res.ok) throw new Error(`Google code exchange failed: ${res.status} ${await res.text()}`);
  const json = (await res.json()) as { access_token: string; refresh_token?: string; expires_in: number };
  if (!json.refresh_token) {
    throw new Error(
      "Google did not return a refresh_token — ask the client to remove app access at myaccount.google.com/permissions and reconnect"
    );
  }

  const profileRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: { Authorization: `Bearer ${json.access_token}` },
  });
  const profile = profileRes.ok ? ((await profileRes.json()) as { email?: string }) : {};

  return {
    access_token: json.access_token,
    refresh_token: json.refresh_token,
    expires_at: Date.now() + json.expires_in * 1000,
    external_account_ref: profile.email ?? "connected",
    scopes,
  };
}

export async function refreshGoogleToken(refreshToken: string): Promise<{ access_token: string; expires_at: number }> {
  const { clientId, clientSecret } = googleClientCreds();
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });
  if (!res.ok) throw new Error(`Google token refresh failed: ${res.status} ${await res.text()}`);
  const json = (await res.json()) as { access_token: string; expires_in: number };
  return { access_token: json.access_token, expires_at: Date.now() + json.expires_in * 1000 };
}

export async function revokeGoogleToken(secret: OAuthTokens): Promise<void> {
  const token = secret.refresh_token ?? secret.access_token;
  await fetch(`https://oauth2.googleapis.com/revoke?token=${encodeURIComponent(token)}`, { method: "POST" });
}
