import { registerProvider, type ProviderAdapter, type OAuthTokens } from "./registry";

// WhatsApp — Method C (guided/BSP), §5.1: "The client connects their own
// WhatsApp Business Account and number. The BSP is the technical conduit;
// the WABA and number are the client's, not a Rosebud number."
//
// This does NOT fit the OAuth adapter shape (buildAuthUrl/exchangeCode) —
// Embedded Signup is a client-side JS SDK popup flow (Meta's Facebook Login
// for Business, configured with a WhatsApp Signup config_id), not a server
// redirect. It hands back {code, wabaId, phoneNumberId} via a JS event to
// the window that spawned it, not a URL callback. The actual start/complete
// mechanics live in their own dedicated routes
// (api/connections/channel/whatsapp/{start,complete}) — this adapter only
// implements `test()`, reused by the generic /:id/test and the health job.
//
// ⚠ Graph API note (verified via Meta's own docs, Sept 2026): "Embedded
// Signup v2 will be deprecated on October 15, 2026 — migrate to v4." Built
// against v4 given that timeline; confirm this is still current before
// registering the real app.

const GRAPH_VERSION = "v21.0"; // Graph API version (independent of the v2→v4 Embedded Signup *flow* version above)

const adapter: ProviderAdapter = {
  category: "channel",
  method: "guided",

  // No refresh/revoke -- WhatsApp Business Integration System User tokens
  // are long-lived (don't expire on a fixed schedule the way OAuth access
  // tokens do); a revoked/broken connection is caught by the health job's
  // test() call, not a refresh flow.

  async test(secret) {
    const tokens = secret as unknown as OAuthTokens & { waba_id?: string; phone_number_id?: string };
    if (!tokens.phone_number_id) return { healthy: false, reason: "No WhatsApp phone number id stored for this connection" };

    const res = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${tokens.phone_number_id}?fields=display_phone_number,verified_name,code_verification_status`, {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });
    if (!res.ok) return { healthy: false, reason: `WhatsApp read failed: ${res.status}` };
    const json = (await res.json()) as {
      display_phone_number?: string;
      verified_name?: string;
      code_verification_status?: string;
    };
    if (json.code_verification_status && json.code_verification_status !== "VERIFIED") {
      return {
        healthy: false,
        reason: `Number not yet verified (status: ${json.code_verification_status})`,
      };
    }
    return {
      healthy: true,
      resources: json.display_phone_number ? [{ id: tokens.phone_number_id, label: json.display_phone_number }] : [],
    };
  },
};

registerProvider("channel:whatsapp", adapter);
export default adapter;
