import { registerProvider, type ProviderAdapter } from "./registry";

// Mailgun — Method B (credential). Mailgun's own API auth is HTTP Basic
// with the literal username "api" and the API key as the password.

type Secret = { api_key?: string };

const adapter: ProviderAdapter = {
  category: "channel",
  method: "credential",

  async test(secret: Secret) {
    if (!secret.api_key) return { healthy: false, reason: "API key is required" };

    const auth = `Basic ${Buffer.from(`api:${secret.api_key}`).toString("base64")}`;
    const res = await fetch("https://api.mailgun.net/v3/domains", { headers: { Authorization: auth } });
    if (!res.ok) {
      return { healthy: false, reason: res.status === 401 ? "Mailgun rejected the API key" : `Mailgun read failed: ${res.status}` };
    }
    const json = (await res.json()) as { items?: { name: string; state: string }[] };
    const active = (json.items ?? []).filter((d) => d.state === "active");
    return {
      healthy: true,
      resources: active.map((d) => ({ id: d.name, label: d.name })),
      externalAccountRef: active[0]?.name ?? "connected (no active domain yet)",
    };
  },
};

registerProvider("channel:mailgun", adapter);
export default adapter;
