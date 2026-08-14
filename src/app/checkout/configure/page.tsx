"use client";

import { Suspense, useEffect, useState, type CSSProperties } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  PLANS, CUR, MODULES, MODULE_BUNDLE, planByKey, monthlyTotal, fmt,
  type Cur, type Cycle, type ModuleKey, type Config,
} from "@/lib/pricing";

const SERIF = "var(--font-cormorant), 'Cormorant Garamond', serif";
const A = "#8B7DD8";
const AD = "#6E5FB8";
const INK = "#17131F";
const CAL = "https://cal.eu/rosebudsolutions/demo";

function ConfigureInner() {
  const router = useRouter();
  const q = useSearchParams();
  const plan = planByKey(q.get("plan") ?? "grow") ?? PLANS[1];
  const [cycle] = useState<Cycle>(q.get("cycle") === "monthly" ? "monthly" : "yearly");
  const [currency] = useState<Cur>(q.get("currency") === "GBP" ? "GBP" : "USD");
  const [seats, setSeats] = useState<number>(() => {
    const s = parseInt(q.get("seats") ?? "", 10);
    return Number.isFinite(s) ? Math.min(Math.max(s, plan.baseSeats), plan.seatCap) : plan.baseSeats;
  });
  const [claOn, setClaOn] = useState<boolean>(q.get("cla") === "true" || (q.get("cla") == null && plan.claDefault));
  const [mods, setMods] = useState<ModuleKey[]>(() => (q.get("modules") ?? "").split(",").filter(Boolean) as ModuleKey[]);
  const [modalOpen, setModalOpen] = useState(false);

  const cfg: Config = { plan, cycle, currency, seats, claOn, modules: mods };
  const total = monthlyTotal(cfg);
  const cur = CUR[currency];
  const fixed = plan.seatCap <= plan.baseSeats;
  const capped = seats >= plan.seatCap;
  const allMods = mods.length >= MODULES.length;
  const extra = Math.max(0, seats - plan.baseSeats);

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setModalOpen(false); };
    document.addEventListener("keydown", onKey); document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [modalOpen]);

  const toggleMod = (k: ModuleKey) => setMods((m) => (m.includes(k) ? m.filter((x) => x !== k) : [...m, k]));
  const toggleAllMods = () => setMods((m) => (m.length >= MODULES.length ? [] : MODULES.map((x) => x.key)));

  const cont = () => {
    const params = new URLSearchParams({ plan: plan.key, cycle, currency, seats: String(seats), cla: String(claOn) });
    if (mods.length) params.set("modules", mods.join(","));
    router.push(`/checkout?${params}`);
  };

  const taxNote = currency === "GBP"
    ? "Prices exclude VAT. UK VAT is added at checkout; EU business customers can enter a VAT number for reverse charge."
    : "Prices exclude tax. Applicable US sales tax is added at checkout.";

  return (
    <div style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: INK, background: "#EDEBF3", minHeight: "100vh" }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <main style={{ maxWidth: 660, margin: "0 auto", padding: "72px 24px 90px" }}>
        <a href="/pricing" style={backLink}>← Back to plans</a>
        <div style={{ display: "flex", gap: 10, margin: "0 0 26px", flexWrap: "wrap" }}>
          <span style={pill(true)}><span style={dot(true)}>1</span> Configure</span>
          <span style={pill(false)}><span style={dot(false)}>2</span> Account</span>
          <span style={pill(false)}><span style={dot(false)}>3</span> Payment</span>
        </div>

        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 6 }}>
          <h1 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(30px,4vw,42px)", lineHeight: 1.05, letterSpacing: "-0.015em", margin: 0 }}>Make <em style={{ fontStyle: "italic", color: AD }}>{plan.name}</em> yours</h1>
          <span style={{ fontSize: 12.5, color: "rgba(23,19,31,0.55)" }}>{plan.leadCap.toLocaleString()} leads/mo · {cycle} billing</span>
        </div>
        <p style={{ fontSize: 14.5, color: "rgba(23,19,31,0.6)", margin: "0 0 26px", lineHeight: 1.55, maxWidth: 520 }}>The core system is ready. These add-ons are optional — tune them now, or leave them and adjust before you pay.</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* seats */}
          <div style={glassCard}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14 }}>
              <div><div style={cardTitle}>Team seats</div><div style={cardSub}>{fixed ? `${seats} seats` : `${plan.baseSeats} included · ${fmt(cur.seat, currency)}/seat to add`}</div></div>
              {!fixed ? (
                <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                  <button type="button" onClick={() => setSeats((s) => Math.max(plan.baseSeats, s - 1))} disabled={seats <= plan.baseSeats} aria-label="Remove seat" style={stepBtn(seats <= plan.baseSeats)}>−</button>
                  <span style={{ minWidth: 22, textAlign: "center", fontWeight: 700, fontVariantNumeric: "tabular-nums", fontSize: 16 }}>{seats}</span>
                  <button type="button" onClick={() => setSeats((s) => Math.min(plan.seatCap, s + 1))} disabled={capped} aria-label="Add seat" style={stepBtn(capped)}>+</button>
                </div>
              ) : <span style={{ fontWeight: 700, fontSize: 16 }}>{seats}</span>}
            </div>
            {capped && !fixed && <div style={{ fontSize: 11.5, color: "#B15A28", fontWeight: 500, marginTop: 10 }}>You&apos;re at the seat limit for {plan.name}.</div>}
          </div>

          {/* closed-loop (highlighted) */}
          <div style={{ position: "relative", background: "linear-gradient(135deg, rgba(139,125,216,0.12), rgba(139,125,216,0.05))", border: "1px solid rgba(139,125,216,0.32)", boxShadow: "0 18px 48px -32px rgba(139,125,216,0.6), inset 0 1px 0 rgba(255,255,255,0.5)", borderRadius: 18, padding: "20px 22px", display: "flex", justifyContent: "space-between", gap: 16, alignItems: "flex-start" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 9, flexWrap: "wrap" }}>
                <span style={cardTitle}>Closed-loop attribution</span>
                {plan.claDefault && <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#fff", background: A, padding: "3px 9px", borderRadius: 999 }}>Recommended</span>}
                <span style={{ fontSize: 12.5, fontWeight: 700, color: AD, fontVariantNumeric: "tabular-nums" }}>+{fmt(cur.cla, currency)}/mo</span>
              </div>
              <div style={{ fontSize: 13, color: "rgba(23,19,31,0.62)", marginTop: 6, lineHeight: 1.5, maxWidth: 380 }}>Feeds real booked-customer outcomes back to Google Ads — same budget, more of the customers who actually book. <a href="#" onClick={(e) => { e.preventDefault(); setModalOpen(true); }} style={{ color: AD, fontWeight: 600, borderBottom: "1px solid rgba(110,95,184,0.5)", whiteSpace: "nowrap" }}>See how it works →</a></div>
            </div>
            <button type="button" onClick={() => setClaOn((v) => !v)} role="switch" aria-checked={claOn} style={sw(claOn)}><span style={knob(claOn)} /></button>
          </div>

          {/* modules */}
          <div style={glassCard}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 4 }}>
              <span style={cardTitle}>Optional modules</span>
              <button type="button" onClick={toggleAllMods} style={{ background: "none", border: "none", color: AD, fontWeight: 700, fontSize: 12, cursor: "pointer" }}>{allMods ? "Clear all" : `Add all 5 · save ${fmt(MODULES.reduce((s, m) => s + m.price[currency], 0) - MODULE_BUNDLE[currency], currency)}/mo`}</button>
            </div>
            <p style={{ fontSize: 12.5, color: "rgba(23,19,31,0.55)", margin: "0 0 14px", lineHeight: 1.5 }}>Extend the system beyond the six core capabilities. Tap to add — the 5-module bundle saves you money.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
              {MODULES.map((m) => {
                const on = mods.includes(m.key);
                return (
                  <button key={m.key} type="button" onClick={() => toggleMod(m.key)} role="checkbox" aria-checked={on} style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "9px 13px", borderRadius: 999, cursor: "pointer", fontSize: 12.5, fontWeight: 600, background: on ? "rgba(139,125,216,0.12)" : "rgba(255,255,255,0.7)", border: `1px solid ${on ? A : "rgba(23,19,31,0.14)"}`, color: INK }}>
                    {on && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={AD} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12.5l5 5L20 6.5" /></svg>}
                    <span>{m.name}</span>
                    <span style={{ fontVariantNumeric: "tabular-nums", color: on ? AD : "rgba(23,19,31,0.5)", fontWeight: 700 }}>+{fmt(m.price[currency], currency)}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* total + continue */}
        <div style={{ marginTop: 20, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "18px 22px", borderRadius: 18, background: INK, color: "#F5F1EA", boxShadow: "0 22px 54px -30px rgba(23,19,31,0.7)" }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(245,241,234,0.55)", fontWeight: 600 }}>Your total{cycle === "yearly" ? " (per month, billed annually)" : " per month"}{extra || claOn || mods.length ? " · incl. add-ons" : ""}</div>
            <div style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 34, lineHeight: 1.05, marginTop: 3, fontVariantNumeric: "tabular-nums" }}>{fmt(total, currency)}<span style={{ fontSize: 15, color: "rgba(245,241,234,0.6)" }}>/mo</span></div>
          </div>
          <button type="button" onClick={cont} style={{ background: A, color: "#fff", border: "none", padding: "15px 26px", borderRadius: 13, fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: "0 16px 38px -16px rgba(139,125,216,0.9)", whiteSpace: "nowrap" }}>Continue →</button>
        </div>
        <div style={{ fontSize: 12, color: "rgba(23,19,31,0.5)", textAlign: "center", marginTop: 14 }}>{taxNote}</div>
      </main>

      {modalOpen && (
        <div onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(23,19,31,0.5)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", display: "grid", placeItems: "center", padding: 20 }}>
          <div role="dialog" aria-modal="true" aria-label="How closed-loop attribution works" style={{ background: "#F7F4FB", border: "1px solid rgba(255,255,255,0.8)", borderRadius: 24, maxWidth: 640, width: "100%", maxHeight: "90vh", overflow: "auto", boxShadow: "0 40px 100px -24px rgba(23,19,31,0.55)" }}>
            <div style={{ position: "relative", padding: "36px 38px 4px", textAlign: "center" }}>
              <button type="button" onClick={() => setModalOpen(false)} aria-label="Close" style={{ position: "absolute", top: 18, right: 18, width: 34, height: 34, borderRadius: 999, border: "none", background: "rgba(23,19,31,0.06)", color: "rgba(23,19,31,0.55)", fontSize: 16, cursor: "pointer" }}>✕</button>
              <div style={{ fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", fontWeight: 700, color: AD, marginBottom: 14 }}>Closed-loop attribution · +{fmt(cur.cla, currency)}/mo · on by default for Expand &amp; Scale</div>
              <h2 style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 30, lineHeight: 1.08, letterSpacing: "-0.015em", margin: "0 auto", maxWidth: 520, color: INK }}>Same ad budget — more of the customers who actually book.</h2>
              <p style={{ margin: "16px auto 0", maxWidth: 540, fontSize: 14, lineHeight: 1.62, color: "rgba(23,19,31,0.62)" }}>When Google can see which leads became real, paying customers — not just who filled in a form — it spends your budget finding more people like them. Lower cost per booked job, from the same spend, with nothing extra to run.</p>
            </div>
            <div style={{ padding: "24px 38px 6px" }}>
              <div className="cfg-modal-steps">
                {["Every lead tied back to its real outcome in your CRM", "That outcome fed back to Google Ads as the signal", "Bidding shifts toward booked customers, not clicks"].map((t) => (
                  <div key={t} style={{ background: "rgba(139,125,216,0.07)", border: "1px solid rgba(139,125,216,0.18)", borderRadius: 14, padding: "15px 14px", display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ color: A, flex: "none", marginTop: 1 }}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span>
                    <span style={{ fontSize: 13, lineHeight: 1.42, fontWeight: 600, color: INK }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ padding: "22px 38px 32px", textAlign: "center" }}>
              <button type="button" onClick={() => { setClaOn(true); setModalOpen(false); }} style={{ width: "100%", maxWidth: 420, background: A, color: "#fff", border: "none", padding: "16px 24px", borderRadius: 14, fontSize: 16, fontWeight: 700, cursor: "pointer", boxShadow: "0 18px 40px -14px rgba(139,125,216,0.9)" }}>Add closed-loop to my plan</button>
              <div style={{ marginTop: 14, display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
                <a href={CAL} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, fontWeight: 600, color: "rgba(23,19,31,0.55)", borderBottom: "1px solid rgba(23,19,31,0.22)" }}>Contact sales</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const backLink: CSSProperties = { display: "inline-block", fontSize: 13, fontWeight: 600, color: "rgba(23,19,31,0.55)", textDecoration: "none", marginBottom: 24 };
const pill = (active: boolean): CSSProperties => ({ display: "inline-flex", alignItems: "center", gap: 9, fontSize: 13, fontWeight: 600, padding: "8px 15px", borderRadius: 999, background: active ? "rgba(139,125,216,0.14)" : "rgba(23,19,31,0.05)", color: active ? AD : "rgba(23,19,31,0.5)" });
const dot = (active: boolean): CSSProperties => ({ width: 20, height: 20, borderRadius: 999, display: "grid", placeItems: "center", fontSize: 11.5, color: "#fff", background: active ? A : "rgba(23,19,31,0.25)" });
const glassCard: CSSProperties = { background: "rgba(255,255,255,0.62)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,0.75)", boxShadow: "0 16px 44px -34px rgba(23,19,31,0.35), inset 0 1px 0 rgba(255,255,255,0.6)", borderRadius: 18, padding: "20px 22px" };
const cardTitle: CSSProperties = { fontSize: 15.5, fontWeight: 700, color: INK };
const cardSub: CSSProperties = { fontSize: 12.5, color: "rgba(23,19,31,0.55)", marginTop: 3 };
const stepBtn = (d: boolean): CSSProperties => ({ width: 30, height: 30, borderRadius: 9, border: "1px solid rgba(139,125,216,0.5)", background: d ? "rgba(139,125,216,0.04)" : "rgba(255,255,255,0.7)", color: AD, fontSize: 17, fontWeight: 700, cursor: d ? "not-allowed" : "pointer", opacity: d ? 0.4 : 1 });
const sw = (on: boolean): CSSProperties => ({ position: "relative", width: 46, height: 26, flex: "none", borderRadius: 999, border: "none", cursor: "pointer", padding: 0, background: on ? A : "rgba(23,19,31,0.18)" });
const knob = (on: boolean): CSSProperties => ({ position: "absolute", top: 2, left: on ? 22 : 2, width: 22, height: 22, borderRadius: 999, background: "#fff", transition: "left .2s ease", boxShadow: "0 1px 3px rgba(0,0,0,0.25)" });

const CSS = `
  .cfg-modal-steps { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; }
  @media (max-width: 600px){ .cfg-modal-steps { grid-template-columns:1fr; } }
`;

export default function ConfigurePage() {
  return <Suspense fallback={null}><ConfigureInner /></Suspense>;
}
