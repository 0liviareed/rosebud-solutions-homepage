import crypto from "crypto";
import { appSupabaseAdmin } from "@/lib/appSupabase";

// Envelope encryption for connection tokens/credentials, stored in
// connection_secrets (0005_connections.sql). The connections table only ever
// holds a secret_ref pointer, never the token itself — this file is the only
// place that touches CONNECTIONS_ENCRYPTION_KEY or plaintext secret payloads.
//
// AES-256-GCM, key from a Vercel env var, not Supabase Vault — Vault's
// availability on the rosebud-app project couldn't be confirmed without a DB
// connection string (not available locally, per this repo's own established
// constraint — see CHECKOUT_STRIPE_BUILD.md). These three functions are the
// seam to swap in Vault later without touching any route.

function getKey(): Buffer {
  const raw = process.env.CONNECTIONS_ENCRYPTION_KEY;
  if (!raw) throw new Error("CONNECTIONS_ENCRYPTION_KEY env missing");
  const key = Buffer.from(raw, "base64");
  if (key.length !== 32) throw new Error("CONNECTIONS_ENCRYPTION_KEY must decode to 32 bytes (AES-256)");
  return key;
}

function encrypt(payload: object): { ciphertext: string; iv: string; authTag: string } {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", getKey(), iv);
  const plaintext = Buffer.from(JSON.stringify(payload), "utf8");
  const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  return {
    ciphertext: ciphertext.toString("base64"),
    iv: iv.toString("base64"),
    authTag: cipher.getAuthTag().toString("base64"),
  };
}

function decrypt(ciphertext: string, iv: string, authTag: string): object {
  const decipher = crypto.createDecipheriv("aes-256-gcm", getKey(), Buffer.from(iv, "base64"));
  decipher.setAuthTag(Buffer.from(authTag, "base64"));
  const plaintext = Buffer.concat([
    decipher.update(Buffer.from(ciphertext, "base64")),
    decipher.final(),
  ]);
  return JSON.parse(plaintext.toString("utf8"));
}

// Creates a new secret row and returns its id (the secret_ref to store on the
// connections row). Callers that are replacing an existing secret (e.g. a
// token refresh) should use updateSecret instead, so the ref stays stable.
export async function storeSecret(connectionId: string, payload: object): Promise<string> {
  const { ciphertext, iv, authTag } = encrypt(payload);
  const { data, error } = await appSupabaseAdmin()
    .from("connection_secrets")
    .insert({ connection_id: connectionId, ciphertext, iv, auth_tag: authTag })
    .select("id")
    .single();
  if (error || !data) throw new Error(`storeSecret failed: ${error?.message}`);
  return data.id as string;
}

export async function updateSecret(secretRef: string, payload: object): Promise<void> {
  const { ciphertext, iv, authTag } = encrypt(payload);
  const { error } = await appSupabaseAdmin()
    .from("connection_secrets")
    .update({ ciphertext, iv, auth_tag: authTag, updated_at: new Date().toISOString() })
    .eq("id", secretRef);
  if (error) throw new Error(`updateSecret failed: ${error.message}`);
}

export async function readSecret<T = Record<string, unknown>>(secretRef: string | null): Promise<T | null> {
  if (!secretRef) return null;
  const { data, error } = await appSupabaseAdmin()
    .from("connection_secrets")
    .select("ciphertext, iv, auth_tag")
    .eq("id", secretRef)
    .maybeSingle();
  if (error || !data) return null;
  return decrypt(data.ciphertext, data.iv, data.auth_tag) as T;
}

export async function deleteSecret(secretRef: string | null): Promise<void> {
  if (!secretRef) return;
  const { error } = await appSupabaseAdmin().from("connection_secrets").delete().eq("id", secretRef);
  if (error) throw new Error(`deleteSecret failed: ${error.message}`);
}
