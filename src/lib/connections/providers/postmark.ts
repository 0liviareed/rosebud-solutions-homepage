import { registerProvider, type ProviderAdapter } from "./registry";

// Postmark — Method B (credential). Server-level API token, sent as
// X-Postmark-Server-Token (not Bearer/Basic — Postmark's own convention).

type Secret = { api_key?: string };

const adapter: ProviderAdapter = {
  category: "channel",
  method: "credential",

  async test(secret: Secret) {
    if (!secret.api_key) return { healthy: false, reason: "Server API token is required" };

    const res = await fetch("https://api.postmarkapp.com/senders", {
      headers: { Accept: "application/json", "X-Postmark-Server-Token": secret.api_key },
    });
    if (!res.ok) {
      return {
        healthy: false,
        reason: res.status === 401 ? "Postmark rejected the server token" : `Postmark read failed: ${res.status}`,
      };
    }
    const json = (await res.json()) as { SenderSignatures?: { ID: number; EmailAddress: string; Confirmed: boolean }[] };
    const confirmed = (json.SenderSignatures ?? []).filter((s) => s.Confirmed);
    return {
      healthy: true,
      resources: confirmed.map((s) => ({ id: String(s.ID), label: s.EmailAddress })),
      externalAccountRef: confirmed[0]?.EmailAddress ?? "connected (no confirmed sender yet)",
    };
  },
};

registerProvider("channel:postmark", adapter);
export default adapter;
