"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";

// Wasted Lead Spend Calculator — embedded in the /resources/wasted-lead-spend-calculator
// article, directly under the H1. Logic, controls and copy ported from v3 of the source
// spec (wasted-lead-spend-calculator-v3.html): currency toggle, reply-rate and close-rate
// as 1-10 button groups instead of continuous sliders, progressive disclosure for the
// optional fields, a dynamic single CTA, shareable-link URL state, and an "email it to me"
// capture that POSTs to /api/calculator-result. Visual treatment stays this site's own dark
// palette (#080609 / #F5F1EA / #8B7DD8), not the reference file's light theme — only the
// interaction logic and copy came from that file.
//
// Glass treatment (blur + translucent fill + inset highlight) mirrors the site's own
// established recipe — see the `glass` token in PricingV2.tsx and the dark-context purple
// glass button in BookDemoCTA.tsx — adapted to dark/cream instead of their light/white.
// Primary CTA and the accent number stay fully opaque on purpose: everything else gets the
// frosted treatment, the one thing you actually click stays unambiguous.
//
// The source copy says "enquiries" throughout (UK spelling); normalized to "inquiries"
// here to match the US spelling used everywhere else on this page and site.

const SERIF = "var(--font-cormorant), 'Cormorant Garamond', serif";
const A = "#8B7DD8";
const A_LIGHT = "#B8AEDB";
const CREAM = "#F5F1EA";
const LINE = "rgba(245,241,234,0.16)";
const MUTE = "rgba(245,241,234,0.58)";
const BLUR = "blur(20px) saturate(160%)";
const BLUR_WEBKIT = "blur(20px) saturate(160%)";

const labelStyle: CSSProperties = { fontSize: 15, fontWeight: 600, color: CREAM, marginBottom: 8, display: "block", lineHeight: 1.35 };
const hintStyle: CSSProperties = { fontSize: 11.5, color: MUTE, lineHeight: 1.45, marginTop: 6, fontWeight: 400 };
const inputStyle: CSSProperties = { width: "100%", border: "1px solid rgba(23,19,31,0.1)", background: "rgba(245,241,234,0.94)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", borderRadius: 10, padding: "12px 13px", fontSize: 15, color: "#17131F", outline: "none", fontFamily: "inherit", boxSizing: "border-box", boxShadow: "inset 0 1px 2px rgba(23,19,31,0.05)" };
const cardStyle: CSSProperties = {
  background: "rgba(245,241,234,0.07)",
  backdropFilter: BLUR,
  WebkitBackdropFilter: BLUR_WEBKIT,
  border: `1px solid ${LINE}`,
  borderRadius: 14,
  padding: "16px 18px",
  boxShadow: "0 20px 44px -30px rgba(0,0,0,0.6), inset 0 1px 0 rgba(245,241,234,0.08)",
};
const cardHiStyle: CSSProperties = {
  ...cardStyle,
  border: "1.5px solid rgba(184,174,219,0.55)",
  background: "rgba(139,125,216,0.16)",
  boxShadow: "0 20px 44px -26px rgba(139,125,216,0.4), inset 0 1px 0 rgba(255,255,255,0.14)",
};
const glassPanel: CSSProperties = {
  background: "rgba(245,241,234,0.06)",
  backdropFilter: BLUR,
  WebkitBackdropFilter: BLUR_WEBKIT,
  border: `1px solid ${LINE}`,
  borderRadius: 14,
  boxShadow: "0 20px 44px -32px rgba(0,0,0,0.55), inset 0 1px 0 rgba(245,241,234,0.07)",
};

const money = (cur: string, n: number) => `${cur}${Math.round(n).toLocaleString("en-US")}`;
const money2 = (cur: string, n: number) => `${cur}${n.toFixed(2)}`;

function DotGroup({
  value,
  onPick,
  allowClear,
  ariaLabel,
}: {
  value: number | null;
  onPick: (n: number) => void;
  allowClear?: boolean;
  ariaLabel: string;
}) {
  return (
    <div role="group" aria-label={ariaLabel} style={{ display: "flex", width: "100%" }}>
      {Array.from({ length: 10 }, (_, i) => i + 1).map((n, i) => {
        const on = value !== null && n <= value;
        return (
          <button
            key={n}
            type="button"
            onClick={() => onPick(allowClear && value === n ? -1 : n)}
            aria-label={`${n} out of 10`}
            style={{
              flex: 1,
              minWidth: 0,
              height: 42,
              border: `1.5px solid ${LINE}`,
              borderLeftWidth: i === 0 ? 1.5 : 0,
              borderRadius: i === 0 ? "10px 0 0 10px" : n === 10 ? "0 10px 10px 0" : 0,
              background: on ? A : "rgba(245,241,234,0.05)",
              backdropFilter: on ? undefined : "blur(12px)",
              WebkitBackdropFilter: on ? undefined : "blur(12px)",
              color: on ? "#17131F" : MUTE,
              fontFamily: "inherit",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              padding: 0,
              boxShadow: on ? "0 8px 20px -10px rgba(139,125,216,0.7)" : "none",
              transition: "background .12s, color .12s, box-shadow .12s",
            }}
          >
            {n}
          </button>
        );
      })}
    </div>
  );
}

export default function WastedLeadSpendCalculator() {
  const [currency, setCurrency] = useState<"$" | "£">("$");
  const [spend, setSpend] = useState(5000);
  const [leads, setLeads] = useState(120);
  const [reply, setReply] = useState(3);
  const [value, setValue] = useState(0);
  const [close, setClose] = useState<number | null>(null);
  const [optionalOpen, setOptionalOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [sendStatus, setSendStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [sendError, setSendError] = useState<string | null>(null);

  // Restore state from the URL so a shared link reopens the same figures.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (p.get("s")) setSpend(Math.max(0, Number(p.get("s")) || 0));
    if (p.get("l")) setLeads(Math.max(1, Number(p.get("l")) || 1));
    if (p.get("r")) setReply(Math.min(10, Math.max(1, Number(p.get("r")) || 3)));
    if (p.get("v")) setValue(Math.max(0, Number(p.get("v")) || 0));
    if (p.get("c")) setClose(Math.min(10, Math.max(1, Number(p.get("c")) || 0)));
  }, []);

  const r = useMemo(() => {
    const s = Math.max(0, spend || 0);
    const n = Math.max(1, leads || 1);
    const rate = reply / 10;
    const v = Math.max(0, value || 0);

    const worked = n * rate;
    const lost = n - worked;
    const cpl = s / n;
    const cplw = worked > 0 ? s / worked : 0;
    const wasted = s * (1 - rate);
    const mult = cpl > 0 ? cplw / cpl : 0;

    const showValueRow = close !== null && close > 0 && v > 0;
    const closeRate = (close ?? 0) / 10;
    const customers = lost * closeRate;
    const annualRevenue = customers * v * 12;
    const effectiveCac = worked * closeRate > 0 ? s / (worked * closeRate) : 0;

    return { worked, lost, cpl, cplw, wasted, mult, showValueRow, customers, annualRevenue, effectiveCac };
  }, [spend, leads, reply, value, close]);

  const submitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendStatus("loading");
    setSendError(null);
    try {
      const res = await fetch("/api/calculator-result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          currency,
          spend,
          leads,
          replyOutOfTen: reply,
          customerValue: value || null,
          closeOutOfTen: close,
          source: "wasted-lead-spend-calculator",
        }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) { setSendStatus("error"); setSendError(j.error || "Something went wrong. Please try again."); return; }
      setSendStatus("done");
    } catch {
      setSendStatus("error");
      setSendError("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      style={{
        background: `radial-gradient(130% 90% at 12% 0%, rgba(139,125,216,0.24) 0%, transparent 55%), radial-gradient(100% 80% at 100% 100%, rgba(139,125,216,0.12) 0%, transparent 60%), rgba(8,6,9,0.94)`,
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        border: "1px solid rgba(245,241,234,0.12)",
        borderRadius: 26,
        padding: "32px 32px 30px",
        boxShadow: "0 50px 110px -40px rgba(8,6,9,0.65), inset 0 1px 0 rgba(245,241,234,0.07)",
        display: "flex",
        flexDirection: "column",
        gap: 22,
      }}
    >
      <style>{`
        @media (max-width: 640px) { .rb-calc-cards { grid-template-columns: 1fr !important; } }
        .rb-calc-field input[type=number]:focus { outline: 2px solid ${A}; border-color: ${A}; }
      `}</style>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: 6 }}>
        {(["$", "£"] as const).map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCurrency(c)}
            aria-pressed={currency === c}
            style={{
              border: currency === c ? "1px solid rgba(184,174,219,0.6)" : `1px solid ${LINE}`,
              background: currency === c ? A : "rgba(245,241,234,0.05)",
              backdropFilter: currency === c ? undefined : "blur(12px)",
              WebkitBackdropFilter: currency === c ? undefined : "blur(12px)",
              color: currency === c ? "#17131F" : MUTE,
              fontFamily: "inherit",
              fontSize: 12.5,
              fontWeight: 700,
              padding: "6px 13px",
              borderRadius: 8,
              cursor: "pointer",
              boxShadow: currency === c ? "0 8px 20px -10px rgba(139,125,216,0.7)" : "none",
            }}
          >
            {c === "$" ? "$ USD" : "£ GBP"}
          </button>
        ))}
      </div>

      <div className="rb-calc-field">
        <label style={labelStyle} htmlFor="rb-spend">How much do you spend a month to get inquiries?</label>
        <div style={{ position: "relative" }}>
          <span style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: "rgba(23,19,31,0.5)" }}>{currency}</span>
          <input id="rb-spend" type="number" min={0} step={100} value={spend} onChange={(e) => setSpend(Number(e.target.value))} style={{ ...inputStyle, paddingLeft: 30 }} />
        </div>
        <div style={hintStyle}>Ads, agency fees, listings. Anything you pay so people find you.</div>
      </div>

      <div className="rb-calc-field">
        <label style={labelStyle} htmlFor="rb-leads">How many people get in touch in a month?</label>
        <input id="rb-leads" type="number" min={1} step={1} value={leads} onChange={(e) => setLeads(Number(e.target.value))} style={inputStyle} />
        <div style={hintStyle}>Every form, call and message. Not just the good ones.</div>
      </div>

      <div className="rb-calc-field">
        <label style={labelStyle}>Out of every 10 people who get in touch, how many get a reply?</label>
        <DotGroup value={reply} onPick={(n) => setReply(n)} ariaLabel="Replies out of ten" />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, gap: 12 }}>
          <span style={{ fontSize: 12.5, fontWeight: 700, color: A_LIGHT }}>{reply} in 10 get a reply</span>
          <span style={{ fontSize: 12.5, fontWeight: 700, color: "#C98A78" }}>{10 - reply} in 10 hear nothing</span>
        </div>
        <div style={hintStyle}>
          Not how many buy. How many hear back at all, within three days.
          <span style={{ display: "block", marginTop: 3, opacity: 0.78 }}>Unsure? Three in ten is the average we measured across 273 businesses.</span>
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${LINE}`, paddingTop: 4 }}>
        <button
          type="button"
          onClick={() => setOptionalOpen((o) => !o)}
          style={{ background: "transparent", border: 0, color: A_LIGHT, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 13.5, fontWeight: 600, cursor: "pointer", padding: "10px 0", textAlign: "left" }}
        >
          {optionalOpen ? "− " : "+ "}Optional: add your own numbers to see what those inquiries were worth
        </button>
        {optionalOpen && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 8 }}>
            <div className="rb-calc-field">
              <label style={labelStyle} htmlFor="rb-value">What is a customer worth to you, on average?</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: "rgba(23,19,31,0.5)" }}>{currency}</span>
                <input id="rb-value" type="number" min={0} step={100} value={value} onChange={(e) => setValue(Number(e.target.value))} style={{ ...inputStyle, paddingLeft: 30 }} />
              </div>
              <div style={hintStyle}>Roughly, over the whole time they stay with you.</div>
            </div>
            <div className="rb-calc-field">
              <label style={labelStyle}>Out of every 10 people you do reply to, how many become customers?</label>
              <DotGroup value={close} onPick={(n) => setClose(n === -1 ? null : n)} allowClear ariaLabel="Customers out of ten" />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, gap: 12 }}>
                <span style={{ fontSize: 12.5, fontWeight: 700, color: A_LIGHT }}>{close === null ? "Not set" : `${close} in 10 become customers`}</span>
                <span style={{ fontSize: 12.5, fontWeight: 700, color: MUTE }}>Tap the same number again to clear</span>
              </div>
              <div style={hintStyle}>Your number, not ours.</div>
            </div>
          </div>
        )}
      </div>

      <div style={{ borderTop: `1px solid ${LINE}`, paddingTop: 22, display: "flex", flexDirection: "column", gap: 16 }}>
        <div
          style={{
            background: "rgba(139,125,216,0.26)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            border: "1px solid rgba(184,174,219,0.45)",
            borderRadius: 18,
            padding: "24px 26px",
            boxShadow: "0 30px 70px -24px rgba(139,125,216,0.45), inset 0 1px 0 rgba(255,255,255,0.16)",
          }}
        >
          <div style={{ fontSize: 14, color: "rgba(245,241,234,0.75)", marginBottom: 8, lineHeight: 1.4 }}>
            You spend this much a month on inquiries nobody replies to
          </div>
          <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 46, lineHeight: 1.05, color: CREAM }}>{money(currency, r.wasted)}</div>
          <div style={{ fontSize: 13, color: "rgba(245,241,234,0.7)", marginTop: 8 }}>That is {money(currency, r.wasted * 12)} a year.</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }} className="rb-calc-cards">
          <div style={cardStyle}>
            <div style={{ fontSize: 11.5, color: MUTE, marginBottom: 6, lineHeight: 1.35 }}>What each inquiry costs you</div>
            <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 25, color: CREAM }}>{money2(currency, r.cpl)}</div>
          </div>
          <div style={cardHiStyle}>
            <div style={{ fontSize: 11.5, color: "rgba(245,241,234,0.75)", marginBottom: 6, lineHeight: 1.35 }}>What each inquiry you actually reply to costs you</div>
            <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 25, color: A_LIGHT }}>{r.worked > 0 ? money2(currency, r.cplw) : "n/a"}</div>
          </div>
          <div style={cardStyle}>
            <div style={{ fontSize: 11.5, color: MUTE, marginBottom: 6, lineHeight: 1.35 }}>Inquiries a month nobody replies to</div>
            <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 25, color: CREAM }}>{Math.round(r.lost).toLocaleString("en-US")}</div>
          </div>
        </div>

        {r.showValueRow && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }} className="rb-calc-cards">
            <div style={cardStyle}>
              <div style={{ fontSize: 11.5, color: MUTE, marginBottom: 6, lineHeight: 1.35 }}>Customers those inquiries would have become</div>
              <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 25, color: CREAM }}>{r.customers.toFixed(1)} a month</div>
            </div>
            <div style={cardHiStyle}>
              <div style={{ fontSize: 11.5, color: "rgba(245,241,234,0.75)", marginBottom: 6, lineHeight: 1.35 }}>What that is worth a year, at your figures</div>
              <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 25, color: A_LIGHT }}>{money(currency, r.annualRevenue)}</div>
            </div>
            <div style={cardStyle}>
              <div style={{ fontSize: 11.5, color: MUTE, marginBottom: 6, lineHeight: 1.35 }}>What each customer currently costs you</div>
              <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 25, color: CREAM }}>{r.effectiveCac > 0 ? money(currency, r.effectiveCac) : "n/a"}</div>
            </div>
          </div>
        )}

        <p style={{ ...glassPanel, margin: 0, fontSize: 14, lineHeight: 1.65, color: "rgba(245,241,234,0.8)", padding: 16 }}>
          {r.worked > 0 ? (
            <>
              You pay <strong style={{ color: CREAM }}>{money2(currency, r.cpl)}</strong> for an inquiry. Because {10 - reply} in every 10 never get a reply,
              each inquiry someone actually answers costs you <strong style={{ color: CREAM }}>{money2(currency, r.cplw)}</strong>, which is {r.mult.toFixed(1)} times
              more. That gap is not a marketing problem. Those people contacted you, and nobody got back to them.
            </>
          ) : (
            "If nobody replies, everything you spend on inquiries is wasted."
          )}
        </p>

        <div style={{ ...glassPanel, padding: 16 }}>
          {sendStatus === "done" ? (
            <>
              <div style={{ fontSize: 14.5, fontWeight: 600, color: CREAM, marginBottom: 6 }}>On its way.</div>
              <p style={{ margin: 0, fontSize: 11.5, color: MUTE, lineHeight: 1.5 }}>Check your inbox. If it does not arrive in a few minutes, look in spam, which is itself worth knowing.</p>
            </>
          ) : (
            <form onSubmit={submitEmail}>
              <div style={{ fontSize: 14.5, fontWeight: 600, color: CREAM, marginBottom: 10 }}>Send this breakdown to yourself</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  aria-label="Email address"
                  style={{ ...inputStyle, flex: "1 1 200px" }}
                />
                <button
                  type="submit"
                  disabled={sendStatus === "loading"}
                  style={{ background: A, color: "#17131F", border: 0, borderRadius: 9, padding: "12px 20px", fontSize: 14.5, fontWeight: 700, fontFamily: "inherit", cursor: sendStatus === "loading" ? "default" : "pointer", opacity: sendStatus === "loading" ? 0.6 : 1 }}
                >
                  {sendStatus === "loading" ? "Sending…" : "Email it to me"}
                </button>
              </div>
              <p style={{ margin: "8px 0 0", fontSize: 11.5, color: sendStatus === "error" ? "#C98A78" : MUTE, lineHeight: 1.5 }}>
                {sendStatus === "error" && sendError ? sendError : "One email with your figures. No sequence, no calls unless you ask."}
              </p>
            </form>
          )}
        </div>

        <a
          href="/pricing"
          style={{ display: "inline-flex", alignItems: "center", gap: 8, background: CREAM, color: "#17131F", fontSize: 13.5, fontWeight: 700, padding: "12px 22px", borderRadius: 24, textDecoration: "none", alignSelf: "flex-start" }}
        >
          {r.wasted > 0 ? `See how to stop losing ${money(currency, r.wasted * 12)} a year` : "See how Rosebud handles inquiries"} <span aria-hidden>→</span>
        </a>

        <p style={{ margin: 0, fontSize: 11.5, lineHeight: 1.65, color: "rgba(245,241,234,0.42)", borderTop: `1px solid ${LINE}`, paddingTop: 16 }}>
          <strong style={{ color: "rgba(245,241,234,0.6)" }}>For general information only.</strong> This calculator gives estimates based on the figures
          you enter and on benchmark averages. It is not financial, accounting, marketing or legal advice. The default reply rate is an average across a
          sample of 273 businesses and is not a measurement of your business. Where you enter a customer value and a conversion figure, those are your
          numbers: Rosebud Solutions does not claim a conversion rate, and nothing here is a forecast, a projection, or a representation of what Rosebud
          or any other provider would achieve. Take professional advice before acting on any figure. Rosebud Global Ltd accepts no liability for reliance
          placed on this calculator or for any loss arising from its use. Calculations run in your browser. If you choose to email yourself a copy, your
          email address and the figures you entered are sent to us to deliver that email — nothing else is submitted or stored.
        </p>
      </div>
    </div>
  );
}
