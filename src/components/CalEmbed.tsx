"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect } from "react";
import { track } from "@/lib/analytics";

export default function CalEmbed() {
  useEffect(() => {
    track("cal_loaded");
    // Cal.com embed loader — standard snippet, recast to any for brevity.
    (function (C: any, A: string, L: string) {
      const p = function (a: any, ar: any) {
        a.q.push(ar);
      };
      const d = C.document;
      C.Cal =
        C.Cal ||
        function () {
          const cal = C.Cal;
          const ar = arguments as unknown as IArguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api: any = function () {
              p(api, arguments);
            };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else {
              p(cal, ar);
            }
            return;
          }
          p(cal, ar);
        };
    })(window as any, "https://app.cal.eu/embed/embed.js", "init");

    const Cal: any = (window as any).Cal;
    Cal("init", "rb-30min", { origin: "https://cal.eu" });
    Cal.ns["rb-30min"]("inline", {
      elementOrSelector: "#rb-cal-inline",
      calLink: "rosebudsolutions/demo",
      layout: "month_view",
    });
    Cal.ns["rb-30min"]("ui", {
      theme: "dark",
      cssVarsPerTheme: {
        dark: { "cal-brand": "#8B7DD8" },
        light: { "cal-brand": "#8B7DD8" },
      },
      hideEventTypeDetails: false,
      layout: "month_view",
    });

    // Cal.com fires postMessage events on its iframe — listen for the
    // bookingSuccessful action (named "bookingSuccessful" by the embed API,
    // sent as { action: "bookingSuccessful" }). Track each as a conversion
    // so PostHog's funnel can attribute the booking back to the original
    // session/source. Other actions (linkReady, eventTypeViewed, etc.) get
    // captured generically for path analysis.
    const onMessage = (e: MessageEvent) => {
      const data = e?.data;
      if (!data || typeof data !== "object") return;
      const action = (data as any).action as string | undefined;
      if (!action) return;
      if (action === "bookingSuccessful") {
        const payload = (data as any).payload ?? {};
        track("booking_completed", {
          event_type: payload?.eventType?.title ?? null,
          source: "cal_embed",
        });
      } else if (action === "linkReady" || action === "eventTypeViewed") {
        track(`cal_${action}`);
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return <div id="rb-cal-inline" className="rb-cal-inline" />;
}
