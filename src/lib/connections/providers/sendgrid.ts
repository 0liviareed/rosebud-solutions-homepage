import { registerProvider, type ProviderAdapter } from "./registry";

// SendGrid — Method B (credential), §5.1: "client enters the API key for
// their own ESP account. Server validates with a live call, stores it, and
// sends through their ESP and their verified domain." No OAuth, no refresh —
// an API key is the whole credential. `test()` doubles as the pre-storage
// live-validate call the credential route runs before ever persisting
// anything (§5.1: "the field is write-only... never returns to the
// browser" — nothing to return on failure, since it was never stored).

type Secret = { api_key?: string };

const adapter: ProviderAdapter = {
  category: "channel",
  method: "credential",

  async test(secret: Secret) {
    if (!secret.api_key) return { healthy: false, reason: "API key is required" };

    const res = await fetch("https://api.sendgrid.com/v3/verified_senders", {
      headers: { Authorization: `Bearer ${secret.api_key}` },
    });
    if (!res.ok) {
      return {
        healthy: false,
        reason: res.status === 401 ? "SendGrid rejected the API key" : `SendGrid read failed: ${res.status}`,
      };
    }
    const json = (await res.json()) as { results?: { id: number; from_email: string; verified: boolean }[] };
    const verified = (json.results ?? []).filter((s) => s.verified);
    return {
      healthy: true,
      resources: verified.map((s) => ({ id: String(s.id), label: s.from_email })),
      externalAccountRef: verified[0]?.from_email ?? "connected (no verified sender yet)",
    };
  },
};

registerProvider("channel:sendgrid", adapter);
export default adapter;
