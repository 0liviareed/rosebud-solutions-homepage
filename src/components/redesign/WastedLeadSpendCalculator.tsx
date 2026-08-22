"use client";

import { useMemo, useState, type CSSProperties } from "react";

// Wasted Lead Spend Calculator — embedded in the /resources/wasted-lead-spend-calculator
// article, directly under the H1. Fields, defaults and formulas ported exactly from the
// source spec (wasted-lead-spend-calculator.html) — restyled to match this site's existing
// resource-article design tokens (SERIF numerals, A accent, white/shadow cards) rather than
// the standalone widget's own palette. Runs entirely client-side; nothing is submitted or
// stored, matching the page's own FAQ answer ("Does this calculator store my data? No.").

const SERIF = "var(--font-cormorant), 'Cormorant Garamond', serif";
const A = "#8B7DD8";

const cardStyle: CSSProperties = {
  background: "#fff",
  border: "1px solid rgba(23,19,31,0.08)",
  borderRadius: 18,
  padding: "20px 22px",
  boxShadow: "0 24px 60px -44px rgba(23,19,31,0.35)",
};

const labelStyle: CSSProperties = { fontSize: 13, fontWeight: 700, color: "#17131F", marginBottom: 4, display: "block" };
const hintStyle: CSSProperties = { fontSize: 11.5, color: "rgba(23,19,31,0.5)", lineHeight: 1.45, marginTop: 4, fontWeight: 400 };
const inputStyle: CSSProperties = { width: "100%", border: "1px solid rgba(23,19,31,0.16)", background: "#fff", borderRadius: 10, padding: "11px 12px", fontSize: 15, color: "#17131F", outline: "none", fontFamily: "inherit", boxSizing: "border-box" };

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
    <div style={{ ...cardStyle, padding: "30px 30px 28px", display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.4px", textTransform: "uppercase", color: A, marginBottom: 10 }}>
          Wasted lead spend calculator
        </div>
        <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: "rgba(23,19,31,0.6)" }}>
          A cost-per-lead figure assumes every inquiry was worked. Most were not. Enter your numbers below —
          defaults come from our 2026 study of 273 US service businesses.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="rb-calc-grid">
        <style>{`@media (max-width: 640px) { .rb-calc-grid { grid-template-columns: 1fr !important; } }`}</style>
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
              <input id="rb-rate" type="range" min={0} max={100} step={1} value={rate} onChange={(e) => setRate(Number(e.target.value))} style={{ flex: 1, accentColor: A }} />
              <span style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 14, fontWeight: 700, color: "#17131F", minWidth: 44, textAlign: "right" }}>{Math.round(rate)}%</span>
            </div>
            <div style={hintStyle}>Move this if you know your own figure. Most businesses guess high.</div>
          </div>
          <div>
            <label style={labelStyle} htmlFor="rb-close">Your close rate on inquiries you do work</label>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <input id="rb-close" type="range" min={0} max={100} step={1} value={closeRate} onChange={(e) => setCloseRate(Number(e.target.value))} style={{ flex: 1, accentColor: A }} />
              <span style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 14, fontWeight: 700, color: "#17131F", minWidth: 44, textAlign: "right" }}>{Math.round(closeRate)}%</span>
            </div>
            <div style={hintStyle}>Optional. Your number, not ours. We do not claim a close rate.</div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(23,19,31,0.1)", paddingTop: 22, display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ background: "#17131F", borderRadius: 16, padding: "22px 24px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.3px", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: 8 }}>
            Monthly spend on inquiries nobody answered
          </div>
          <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 42, lineHeight: 1.05, color: "#fff" }}>{fmt(r.wasted)}</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginTop: 8 }}>{fmt(r.wasted * 12)} a year.</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }} className="rb-calc-cards">
          <style>{`@media (max-width: 640px) { .rb-calc-cards { grid-template-columns: 1fr !important; } }`}</style>
          <div style={{ ...cardStyle, padding: "16px 18px" }}>
            <div style={{ fontSize: 11.5, color: "rgba(23,19,31,0.55)", marginBottom: 6, lineHeight: 1.35 }}>Cost per inquiry generated</div>
            <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 24, color: A }}>${r.cpl.toFixed(2)}</div>
          </div>
          <div style={{ ...cardStyle, padding: "16px 18px", border: `2px solid ${A}` }}>
            <div style={{ fontSize: 11.5, color: "rgba(23,19,31,0.55)", marginBottom: 6, lineHeight: 1.35 }}>True cost per inquiry actually worked</div>
            <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 24, color: A }}>{r.worked > 0 ? `$${r.cplw.toFixed(2)}` : "n/a"}</div>
          </div>
          <div style={{ ...cardStyle, padding: "16px 18px" }}>
            <div style={{ fontSize: 11.5, color: "rgba(23,19,31,0.55)", marginBottom: 6, lineHeight: 1.35 }}>Inquiries unanswered per month</div>
            <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 24, color: A }}>{Math.round(r.lost).toLocaleString("en-US")}</div>
          </div>
        </div>

        {r.showValueRow && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }} className="rb-calc-cards">
            <div style={{ ...cardStyle, padding: "16px 18px" }}>
              <div style={{ fontSize: 11.5, color: "rgba(23,19,31,0.55)", marginBottom: 6, lineHeight: 1.35 }}>Customers those inquiries would have produced at your close rate</div>
              <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 24, color: A }}>{r.customers.toFixed(1)}</div>
            </div>
            <div style={{ ...cardStyle, padding: "16px 18px", border: `2px solid ${A}` }}>
              <div style={{ fontSize: 11.5, color: "rgba(23,19,31,0.55)", marginBottom: 6, lineHeight: 1.35 }}>Revenue represented, at your own figures</div>
              <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 24, color: A }}>{fmt(r.revenue)}</div>
            </div>
            <div style={{ ...cardStyle, padding: "16px 18px" }}>
              <div style={{ fontSize: 11.5, color: "rgba(23,19,31,0.55)", marginBottom: 6, lineHeight: 1.35 }}>Effective cost per customer, unanswered inquiries excluded</div>
              <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 24, color: A }}>{r.effectiveCac > 0 ? fmt(r.effectiveCac) : "n/a"}</div>
            </div>
          </div>
        )}

        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: "rgba(23,19,31,0.5)" }}>
          {r.worked > 0
            ? `Your real cost per worked inquiry is ${r.mult.toFixed(1)} times your headline cost per lead. The difference is not a marketing problem. Those inquiries arrived and nobody replied to them.`
            : "At a 0% response rate every inquiry you pay for is wasted."}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, paddingTop: 4 }}>
          <a href="/pricing" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#17131F", color: "#fff", fontSize: 13.5, fontWeight: 600, padding: "12px 22px", borderRadius: 24, textDecoration: "none" }}>
            See how Rosebud handles this <span aria-hidden>→</span>
          </a>
          <a href="/resources/2026-us-service-business-response-study" style={{ display: "inline-flex", alignItems: "center", background: "transparent", color: "#17131F", border: "1px solid rgba(23,19,31,0.16)", fontSize: 13.5, fontWeight: 600, padding: "12px 22px", borderRadius: 24, textDecoration: "none" }}>
            Read the study
          </a>
        </div>
      </div>
    </div>
  );
}
