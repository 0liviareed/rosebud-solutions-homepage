import { googleRedirectUri } from "./googleShared";

// Shared mechanics for the two Microsoft-backed adapters (Outlook calendar,
// Microsoft 365 mail) — one Azure AD app/client_id covers both, mirroring
// googleShared.ts. "common" tenant so both work/school and personal
// Microsoft accounts can authorize (we don't know the client's tenant type
// upfront). https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-auth-code-flow

const AUTH_URL = "https://login.microsoftonline.com/common/oauth2/v2.0/authorize";
const TOKEN_URL = "https://login.microsoftonline.com/common/oauth2/v2.0/token";

export function microsoftClientCreds() {
  const clientId = process.env.MICROSOFT_CONNECTIONS_CLIENT_ID;
  const clientSecret = process.env.MICROSOFT_CONNECTIONS_CLIENT_SECRET;
  if (!clientId || !clientSecret) throw new Error("MICROSOFT_CONNECTIONS_CLIENT_ID / MICROSOFT_CONNECTIONS_CLIENT_SECRET env missing");
  return { clientId, clientSecret };
}

export function buildMicrosoftAuthUrl(scopes: string[], state: string): string {
  const { clientId } = microsoftClientCreds();
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: googleRedirectUri(), // one shared callback for every provider — see callback/route.ts
    response_type: "code",
    response_mode: "query",
    scope: ["offline_access", ...scopes].join(" "),
    state,
  });
  return `${AUTH_URL}?${params.toString()}`;
}

export async function exchangeMicrosoftCode(
  code: string,
  scopes: string[]
): Promise<{ access_token: string; refresh_token: string; expires_at: number; external_account_ref: string; scopes: string[] }> {
  const { clientId, clientSecret } = microsoftClientCreds();
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      grant_type: "authorization_code",
      redirect_uri: googleRedirectUri(),
      scope: ["offline_access", ...scopes].join(" "),
    }),
  });
  if (!res.ok) throw new Error(`Microsoft code exchange failed: ${res.status} ${await res.text()}`);
  const json = (await res.json()) as { access_token: string; refresh_token?: string; expires_in: number };
  if (!json.refresh_token) {
    throw new Error("Microsoft did not return a refresh_token — offline_access scope may not have been granted; ask the client to reconnect");
  }

  const profileRes = await fetch("https://graph.microsoft.com/v1.0/me", {
    headers: { Authorization: `Bearer ${json.access_token}` },
  });
  const profile = profileRes.ok ? ((await profileRes.json()) as { mail?: string; userPrincipalName?: string }) : {};

  return {
    access_token: json.access_token,
    refresh_token: json.refresh_token,
    expires_at: Date.now() + json.expires_in * 1000,
    external_account_ref: profile.mail ?? profile.userPrincipalName ?? "connected",
    scopes,
  };
}

export async function refreshMicrosoftToken(refreshToken: string, scopes: string[]): Promise<{ access_token: string; expires_at: number }> {
  const { clientId, clientSecret } = microsoftClientCreds();
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
      scope: ["offline_access", ...scopes].join(" "),
    }),
  });
  if (!res.ok) throw new Error(`Microsoft token refresh failed: ${res.status} ${await res.text()}`);
  const json = (await res.json()) as { access_token: string; expires_in: number };
  return { access_token: json.access_token, expires_at: Date.now() + json.expires_in * 1000 };
}

// No documented endpoint for an app to revoke its own issued refresh token
// server-side — Microsoft's guidance is the user removes access via
// myapps.microsoft.com / account.live.com. Left unimplemented, same
// limitation as hubspot.ts; disconnect() already treats revoke as optional.
