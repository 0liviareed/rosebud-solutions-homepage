import { registerProvider, type ProviderAdapter } from "./registry";

// Brevo — Method B (credential). This org already uses Brevo's own API
// elsewhere (n8n's "Brevo API v2"/"Brevo account" credentials) for Rosebud's
// own sending — this adapter is the client-facing equivalent: the CLIENT's
// own Brevo account, validated the same way (api-key header, v3 endpoints).

type Secret = { api_key?: string };

const adapter: ProviderAdapter = {
  category: "channel",
  method: "credential",

  async test(secret: Secret) {
    if (!secret.api_key) return { healthy: false, reason: "API key is required" };

    const sendersRes = await fetch("https://api.brevo.com/v3/senders", {
      headers: { "api-key": secret.api_key },
    });
    if (!sendersRes.ok) {
      return {
        healthy: false,
        reason: sendersRes.status === 401 ? "Brevo rejected the API key" : `Brevo read failed: ${sendersRes.status}`,
      };
    }
    const json = (await sendersRes.json()) as { senders?: { id: number; email: string; active: boolean }[] };
    const active = (json.senders ?? []).filter((s) => s.active);
    return {
      healthy: true,
      resources: active.map((s) => ({ id: String(s.id), label: s.email })),
      externalAccountRef: active[0]?.email ?? "connected (no active sender yet)",
    };
  },
};

registerProvider("channel:brevo", adapter);
export default adapter;
