import { registerProvider, type ProviderAdapter } from "./registry";

// Twilio — Method B (credential), §5.1: "1. Client enters the credential for
// their own SMS provider (Twilio Account SID + Auth Token). 2. Server
// validates with a live call, stores the credential. 3. Client selects one
// of their own numbers on that account." Steps 1-2 are this adapter's job;
// step 3 is Phase 2's picker, fed by the `resources` list below (same
// pattern as googleCalendar's calendar list / zoho's module list).

type Secret = { account_sid?: string; auth_token?: string };

function basicAuthHeader(sid: string, token: string): string {
  return `Basic ${Buffer.from(`${sid}:${token}`).toString("base64")}`;
}

const adapter: ProviderAdapter = {
  category: "channel",
  method: "credential",

  async test(secret: Secret) {
    if (!secret.account_sid || !secret.auth_token) {
      return { healthy: false, reason: "Account SID and Auth Token are required" };
    }

    const auth = basicAuthHeader(secret.account_sid, secret.auth_token);
    const accountRes = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${secret.account_sid}.json`, {
      headers: { Authorization: auth },
    });
    if (!accountRes.ok) {
      return {
        healthy: false,
        reason: accountRes.status === 401 ? "Twilio rejected the Account SID / Auth Token" : `Twilio read failed: ${accountRes.status}`,
      };
    }
    const account = (await accountRes.json()) as { friendly_name?: string; status?: string };
    if (account.status !== "active") {
      return { healthy: false, reason: `Twilio account status is "${account.status}", not active` };
    }

    const numbersRes = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${secret.account_sid}/IncomingPhoneNumbers.json?PageSize=50`,
      { headers: { Authorization: auth } }
    );
    const numbers = numbersRes.ok
      ? ((await numbersRes.json()) as { incoming_phone_numbers?: { sid: string; phone_number: string }[] })
      : {};

    return {
      healthy: true,
      resources: (numbers.incoming_phone_numbers ?? []).map((n) => ({ id: n.sid, label: n.phone_number })),
      externalAccountRef: account.friendly_name ?? `Twilio ${secret.account_sid.slice(-6)}`,
    };
  },
};

registerProvider("channel:twilio", adapter);
export default adapter;
