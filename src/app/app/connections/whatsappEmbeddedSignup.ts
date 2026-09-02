"use client";

// WhatsApp Embedded Signup — client-side trigger, per Meta's documented
// flow (developers.facebook.com/documentation/business-messaging/whatsapp/embedded-signup).
// ⚠ Not live-tested against a real Meta app/config_id — verify end-to-end
// before shipping to a real client. Two things this depends on that can't
// be confirmed from code alone: (1) the exact postMessage event shape Meta
// sends (documented, but Meta has changed this before without a version
// bump), (2) that the `config_id` registered in the Meta App dashboard is
// actually configured for WhatsApp Signup (a distinct step from creating
// the app itself).

declare global {
  interface Window {
    FB?: {
      init: (opts: { appId: string; autoLogAppEvents: boolean; xfbml: boolean; version: string }) => void;
      login: (
        callback: (response: { authResponse?: { code?: string } }) => void,
        opts: Record<string, unknown>
      ) => void;
    };
    fbAsyncInit?: () => void;
  }
}

let sdkLoadPromise: Promise<void> | null = null;

function loadFacebookSdk(appId: string): Promise<void> {
  if (sdkLoadPromise) return sdkLoadPromise;
  sdkLoadPromise = new Promise((resolve) => {
    window.fbAsyncInit = () => {
      window.FB?.init({ appId, autoLogAppEvents: true, xfbml: true, version: "v21.0" });
      resolve();
    };
    if (document.getElementById("facebook-jssdk")) return;
    const script = document.createElement("script");
    script.id = "facebook-jssdk";
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  });
  return sdkLoadPromise;
}

type SignupResult = { code: string; wabaId: string; phoneNumberId: string };

// Resolves once BOTH the FB.login code (via callback) and the WABA/phone
// number ids (via a separate postMessage event Meta fires mid-flow) have
// arrived -- the two don't come back together, so this listens for the
// message event first and races it against the login callback.
export function startWhatsAppEmbeddedSignup(appId: string, configId: string): Promise<SignupResult> {
  return new Promise((resolve, reject) => {
    let wabaId: string | null = null;
    let phoneNumberId: string | null = null;
    let code: string | null = null;
    let settled = false;

    function tryResolve() {
      if (settled || !code || !wabaId || !phoneNumberId) return;
      settled = true;
      window.removeEventListener("message", onMessage);
      resolve({ code, wabaId, phoneNumberId });
    }

    function onMessage(event: MessageEvent) {
      if (event.origin !== "https://www.facebook.com") return;
      try {
        const data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
        if (data?.type !== "WA_EMBEDDED_SIGNUP") return;
        if (data.event === "FINISH" || data.event === "FINISH_ONLY_WABA") {
          wabaId = data.data?.waba_id ?? null;
          phoneNumberId = data.data?.phone_number_id ?? null;
          tryResolve();
        } else if (data.event === "CANCEL" || data.event === "ERROR") {
          settled = true;
          window.removeEventListener("message", onMessage);
          reject(new Error(data.data?.error_message ?? "WhatsApp signup was cancelled"));
        }
      } catch {
        // not a JSON message we care about
      }
    }

    window.addEventListener("message", onMessage);

    loadFacebookSdk(appId).then(() => {
      window.FB?.login(
        (response) => {
          if (!response.authResponse?.code) {
            if (!settled) {
              settled = true;
              window.removeEventListener("message", onMessage);
              reject(new Error("No authorization code returned from Facebook Login"));
            }
            return;
          }
          code = response.authResponse.code;
          tryResolve();
        },
        {
          config_id: configId,
          response_type: "code",
          override_default_response_type: true,
          extras: { setup: {}, featureType: "", sessionInfoVersion: "3" },
        }
      );
    });
  });
}
