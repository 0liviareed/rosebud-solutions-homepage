import crypto from "crypto";

// Signed OAuth `state` param — binds a provider callback to the tenant and
// connection that started it, so a callback can't be replayed against a
// different tenant (Rosebud_Engine_SelfServe_Build_Doc_v3.md §5.1: "The
// signed state binds the callback to the tenant and connection and carries a
// nonce, so a callback cannot be replayed against another tenant").
//
// HMAC-SHA256 over the payload, not a JWT library — no new dependency, same
// posture as this repo's existing custom HOTP/TOTP implementation for the
// engine.rosebud.global demo gate (src/app/api/login/route.ts).

const STATE_TTL_MS = 15 * 60 * 1000; // 15 min — typical provider consent-screen dwell time

export type OAuthStatePayload = {
  connectionId: string;
  orgId: string;
  nonce: string;
  iat: number;
};

function getSecret(): string {
  const secret = process.env.CONNECTIONS_STATE_SECRET;
  if (!secret) throw new Error("CONNECTIONS_STATE_SECRET env missing");
  return secret;
}

function sign(data: string): string {
  return crypto.createHmac("sha256", getSecret()).update(data).digest("base64url");
}

export function signState(payload: OAuthStatePayload): string {
  const data = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  return `${data}.${sign(data)}`;
}

export function verifyState(state: string): OAuthStatePayload | null {
  const [data, signature] = state.split(".");
  if (!data || !signature) return null;

  const expected = sign(data);
  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) return null;

  let payload: OAuthStatePayload;
  try {
    payload = JSON.parse(Buffer.from(data, "base64url").toString("utf8"));
  } catch {
    return null;
  }

  if (Date.now() - payload.iat > STATE_TTL_MS) return null;
  return payload;
}

export function newNonce(): string {
  return crypto.randomBytes(16).toString("hex");
}
