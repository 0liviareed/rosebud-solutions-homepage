"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";

export default function CalEmbed() {
  // Mobile gets a tap-to-reveal card instead of the full month-view iframe.
  // The inline embed is ~620px tall and crowds small screens on load, so on
  // mobile we defer mounting the iframe entirely until the visitor taps. Desktop
  // behaviour is unchanged: the embed renders inline exactly as before.
  const [mounted, setMounted] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(max-width: 760px)");
    const set = () => setMobile(mq.matches);
    set();
    mq.addEventListener?.("change", set);
    return () => mq.removeEventListener?.("change", set);
  }, []);

  // Show the inline embed container whenever we're not in collapsed-mobile mode.
  // Pre-mount we render the container (no iframe yet) so SSR/first-paint match
  // and desktop never flashes the reveal card.
  const renderInline = !mounted || !mobile || expanded;
  // Only initialise the iframe once we know we're not on a collapsed mobile view.
  const shouldInit = mounted && (!mobile || expanded);

  useEffect(() => {
    if (!shouldInit) return;
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
      calLink: "rosebudsolutions/30min",
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
  }, [shouldInit]);

  if (!renderInline) {
    return (
      <button
        type="button"
        className="rb-cal-reveal"
        onClick={() => {
          track("cal_reveal_tap");
          setExpanded(true);
        }}
      >
        <span className="rb-cal-reveal-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
            <rect x="3" y="4.5" width="18" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
            <path d="M3 9 H21 M8 2.5 V6 M16 2.5 V6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </span>
        <span className="rb-cal-reveal-text">
          <span className="rb-cal-reveal-label">See available times</span>
          <span className="rb-cal-reveal-sub">30-minute call · tap to pick a slot</span>
        </span>
        <span className="rb-cal-reveal-arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
            <path d="M9 6 L15 12 L9 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
    );
  }

  return <div id="rb-cal-inline" className="rb-cal-inline" />;
}
