"use client";

import { useMemo, useState, type CSSProperties } from "react";

// Wasted Lead Spend Calculator — embedded in the /resources/wasted-lead-spend-calculator
// article, directly under the H1. Fields, defaults and formulas ported exactly from the
// source spec (wasted-lead-spend-calculator.html). Dark treatment uses the site's own
// palette rather than inventing new hues: #080609 is the exact dark this same template
// already uses for its closing CTA section (below), #F5F1EA is the cream that pairs with
// it there, and #8B7DD8 is the site's one accent purple ("A" throughout this file). Field
// inputs are cream, not translucent-dark, so they read clearly against the dark card. Runs
// entirely client-side; nothing is submitted or stored, matching the page's own FAQ answer
// ("Does this calculator store my data? No.").

const SERIF = "var(--font-cormorant), 'Cormorant Garamond', serif";
const A = "#8B7DD8";
const A_LIGHT = "#B8AEDB";
const DARK = "#080609";
const CREAM = "#F5F1EA";
const LINE = "rgba(245,241,234,0.16)";
const MUTE = "rgba(245,241,234,0.58)";

const labelStyle: CSSProperties = { fontSize: 13, fontWeight: 600, color: CREAM, marginBottom: 6, display: "block" };
const hintStyle: CSSProperties = { fontSize: 11.5, color: MUTE, lineHeight: 1.45, marginTop: 4, fontWeight: 400 };
const inputStyle: CSSProperties = { width: "100%", border: "1px solid rgba(23,19,31,0.12)", background: CREAM, borderRadius: 9, padding: "11px 12px", fontSize: 15, color: "#17131F", outline: "none", fontFamily: "inherit", boxSizing: "border-box" };
const cardStyle: CSSProperties = { background: "rgba(245,241,234,0.06)", border: `1px solid ${LINE}`, borderRadius: 12, padding: "16px 18px" };
const cardHiStyle: CSSProperties = { ...cardStyle, border: `2px solid ${A}`, background: "rgba(139,125,216,0.14)" };

const SECTORS = [
  { key: "all", label: "All sectors (29.9% answered)", rate: 29.9 },
  { key: "cleaning", label: "Commercial cleaning (41.3%)", rate: 41.3 },
  { key: "dental", label: "Dental & aesthetics", rate: 29.9 },
  { key: "mortgage", label: "Mortgage & lending", rate: 29.9 },
  { key: "trades", label: "Trades", rate: 29.9 },
  { key: "law", label: "Family law", rate: 29.9 },
];

const fmt = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

export default function WastedLeadSpendCalculator() {
  const [spend, setSpend] = useState(5000);
  const [inquiries, setInquiries] = useState(120);
  const [avgValue, setAvgValue] = useState(0);
  const [rate, setRate] = useState(30);
  const [closeRate, setCloseRate] = useState(0);

  const r = useMemo(() => {
    const s = Math.max(0, spend || 0);
    const n = Math.max(1, inquiries || 1);
    const rr = Math.max(0, Math.min(100, rate)) / 100;
    const cr = Math.max(0, Math.min(100, closeRate)) / 100;
    const v = Math.max(0, avgValue || 0);

    const worked = n * rr;
    const lost = n - worked;
    const cpl = s / n;
    const cplw = worked > 0 ? s / worked : 0;
    const wasted = s * (1 - rr);
    const showValueRow = cr > 0 && v > 0;
    const customers = lost * cr;
    const revenue = customers * v;
    const effectiveCac = worked * cr > 0 ? s / (worked * cr) : 0;
    const mult = cpl > 0 ? cplw / cpl : 0;

    return { worked, lost, cpl, cplw, wasted, showValueRow, customers, revenue, effectiveCac, mult };
  }, [spend, inquiries, rate, closeRate, avgValue]);

  return (
    <div
      style={{
        background: `radial-gradient(120% 90% at 50% 0%, rgba(139,125,216,0.14) 0%, transparent 55%), ${DARK}`,
        border: "1px solid rgba(245,241,234,0.1)",
        borderRadius: 22,
        padding: "32px 32px 30px",
        boxShadow: "0 40px 90px -40px rgba(8,6,9,0.6)",
        display: "flex",
        flexDirection: "column",
        gap: 26,
      }}
    >
      <div>
        <div style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 11, fontWeight: 700, letterSpacing: "1.6px", textTransform: "uppercase", color: A_LIGHT, marginBottom: 10 }}>
          Wasted lead spend calculator
        </div>
        <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: "rgba(245,241,234,0.78)" }}>
          A cost-per-lead figure assumes every inquiry was worked. Most were not. Enter your numbers below —
          defaults come from our 2026 study of 273 US service businesses.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="rb-calc-grid">
        <style>{`
          @media (max-width: 640px) { .rb-calc-grid { grid-template-columns: 1fr !important; } .rb-calc-cards { grid-template-columns: 1fr !important; } }
          .rb-calc-grid input[type=number]:focus, .rb-calc-grid select:focus { outline: 2px solid ${A}; border-color: ${A}; }
          .rb-calc-grid input[type=range] { accent-color: ${A}; }
        `}</style>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={labelStyle} htmlFor="rb-spend">Monthly marketing &amp; ad spend</label>
            <input id="rb-spend" type="number" min={0} step={100} value={spend} onChange={(e) => setSpend(Number(e.target.value))} style={inputStyle} />
            <div style={hintStyle}>Everything you spend to create demand: ads, agency fees, listings, content.</div>
          </div>
          <div>
            <label style={labelStyle} htmlFor="rb-inquiries">Inquiries generated per month</label>
            <input id="rb-inquiries" type="number" min={1} step={1} value={inquiries} onChange={(e) => setInquiries(Number(e.target.value))} style={inputStyle} />
            <div style={hintStyle}>Form fills, calls, messages. Everyone who got in touch.</div>
          </div>
          <div>
            <label style={labelStyle} htmlFor="rb-value">Average value of a customer</label>
            <input id="rb-value" type="number" min={0} step={100} value={avgValue} onChange={(e) => setAvgValue(Number(e.target.value))} style={inputStyle} />
            <div style={hintStyle}>Optional. Used to show what the unanswered inquiries were worth at your own close rate.</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={labelStyle} htmlFor="rb-sector">Your sector</label>
            <select
              id="rb-sector"
              defaultValue="all"
              onChange={(e) => {
                const s = SECTORS.find((x) => x.key === e.target.value);
                if (s) setRate(s.rate);
              }}
              style={{ ...inputStyle, cursor: "pointer" }}
            >
              {SECTORS.map((s) => (
                <option key={s.key} value={s.key}>{s.label}</option>
              ))}
            </select>
            <div style={hintStyle}>Sets the benchmark response rate if you do not know your own.</div>
          </div>
          <div>
            <label style={labelStyle} htmlFor="rb-rate">Share of inquiries you reply to within 72 hours</label>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <input id="rb-rate" type="range" min={0} max={100} step={1} value={rate} onChange={(e) => setRate(Number(e.target.value))} style={{ flex: 1 }} />
              <span style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 14, fontWeight: 700, color: A_LIGHT, minWidth: 44, textAlign: "right" }}>{Math.round(rate)}%</span>
            </div>
            <div style={hintStyle}>Move this if you know your own figure. Most businesses guess high.</div>
          </div>
          <div>
            <label style={labelStyle} htmlFor="rb-close">Your close rate on inquiries you do work</label>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <input id="rb-close" type="range" min={0} max={100} step={1} value={closeRate} onChange={(e) => setCloseRate(Number(e.target.value))} style={{ flex: 1 }} />
              <span style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 14, fontWeight: 700, color: A_LIGHT, minWidth: 44, textAlign: "right" }}>{Math.round(closeRate)}%</span>
            </div>
            <div style={hintStyle}>Optional. Your number, not ours. We do not claim a close rate.</div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${LINE}`, paddingTop: 24, display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ background: A, borderRadius: 16, padding: "24px 26px" }}>
          <div style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 11, fontWeight: 700, letterSpacing: "1.3px", textTransform: "uppercase", color: "rgba(23,19,31,0.6)", marginBottom: 8 }}>
            Monthly spend on inquiries nobody answered
          </div>
          <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 46, lineHeight: 1.05, color: "#17131F" }}>{fmt(r.wasted)}</div>
          <div style={{ fontSize: 13, color: "rgba(23,19,31,0.65)", marginTop: 8 }}>{fmt(r.wasted * 12)} a year.</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }} className="rb-calc-cards">
          <div style={cardStyle}>
            <div style={{ fontSize: 11.5, color: MUTE, marginBottom: 6, lineHeight: 1.35 }}>Cost per inquiry generated</div>
            <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 25, color: CREAM }}>${r.cpl.toFixed(2)}</div>
          </div>
          <div style={cardHiStyle}>
            <div style={{ fontSize: 11.5, color: "rgba(245,241,234,0.75)", marginBottom: 6, lineHeight: 1.35 }}>True cost per inquiry actually worked</div>
            <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 25, color: A_LIGHT }}>{r.worked > 0 ? `$${r.cplw.toFixed(2)}` : "n/a"}</div>
          </div>
          <div style={cardStyle}>
            <div style={{ fontSize: 11.5, color: MUTE, marginBottom: 6, lineHeight: 1.35 }}>Inquiries unanswered per month</div>
            <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 25, color: CREAM }}>{Math.round(r.lost).toLocaleString("en-US")}</div>
          </div>
        </div>

        {r.showValueRow && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }} className="rb-calc-cards">
            <div style={cardStyle}>
              <div style={{ fontSize: 11.5, color: MUTE, marginBottom: 6, lineHeight: 1.35 }}>Customers those inquiries would have produced at your close rate</div>
              <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 25, color: CREAM }}>{r.customers.toFixed(1)}</div>
            </div>
            <div style={cardHiStyle}>
              <div style={{ fontSize: 11.5, color: "rgba(245,241,234,0.75)", marginBottom: 6, lineHeight: 1.35 }}>Revenue represented, at your own figures</div>
              <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 25, color: A_LIGHT }}>{fmt(r.revenue)}</div>
            </div>
            <div style={cardStyle}>
              <div style={{ fontSize: 11.5, color: MUTE, marginBottom: 6, lineHeight: 1.35 }}>Effective cost per customer, unanswered inquiries excluded</div>
              <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 25, color: CREAM }}>{r.effectiveCac > 0 ? fmt(r.effectiveCac) : "n/a"}</div>
            </div>
          </div>
        )}

        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: MUTE }}>
          {r.worked > 0
            ? `Your real cost per worked inquiry is ${r.mult.toFixed(1)} times your headline cost per lead. The difference is not a marketing problem. Those inquiries arrived and nobody replied to them.`
            : "At a 0% response rate every inquiry you pay for is wasted."}
        </p>

        <p style={{ margin: 0, fontSize: 11.5, lineHeight: 1.65, color: "rgba(245,241,234,0.42)", borderTop: `1px solid ${LINE}`, paddingTop: 16 }}>
          <strong style={{ color: "rgba(245,241,234,0.6)" }}>For general information only.</strong> This calculator produces estimates from
          figures you enter and from benchmark averages, and it is not financial, accounting, marketing or legal advice. The default response
          rate is a sector average from a sample of 273 businesses and is not a measurement of your business. Outputs depend entirely on the
          accuracy of your inputs. No result here is a forecast, a projection, or a representation of what Rosebud Solutions or any other
          provider would achieve. Take professional advice before acting on any figure. Rosebud Global Ltd accepts no liability for reliance
          placed on this calculator or for any loss arising from its use. Calculations run in your browser; nothing is submitted or stored.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, paddingTop: 4 }}>
          <a href="/pricing" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: CREAM, color: "#17131F", fontSize: 13.5, fontWeight: 700, padding: "12px 22px", borderRadius: 24, textDecoration: "none" }}>
            See how Rosebud handles this <span aria-hidden>→</span>
          </a>
          <a href="/resources/2026-us-service-business-response-study" style={{ display: "inline-flex", alignItems: "center", background: "transparent", color: CREAM, border: `1px solid ${LINE}`, fontSize: 13.5, fontWeight: 600, padding: "12px 22px", borderRadius: 24, textDecoration: "none" }}>
            Read the study
          </a>
        </div>
      </div>
    </div>
  );
}
