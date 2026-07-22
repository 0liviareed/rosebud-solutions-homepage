"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { useSearchParams } from "next/navigation";
import {
  PLANS, CUR, MODULES, MODULE_BUNDLE, planByKey, basePrice, computeTotals, fmt,
  type Cur, type Cycle, type ModuleKey, type Config,
} from "@/lib/pricing";

const SERIF = "var(--font-cormorant), 'Cormorant Garamond', serif";
const A = "#8B7DD8";
const AD = "#6E5FB8";
const INK = "#17131F";

function CheckoutInner() {
  const q = useSearchParams();
  const plan = planByKey(q.get("plan") ?? "grow") ?? PLANS[1];
  const [cycle, setCycle] = useState<Cycle>(q.get("cycle") === "monthly" ? "monthly" : "yearly");
  const [currency] = useState<Cur>(q.get("currency") === "USD" ? "USD" : "GBP");
  const [seats, setSeats] = useState<number>(() => {
    const s = parseInt(q.get("seats") ?? "", 10);
    return Number.isFinite(s) ? Math.min(Math.max(s, plan.baseSeats), plan.seatCap) : plan.baseSeats;
  });
  const [claOn, setClaOn] = useState<boolean>(q.get("cla") === "true" || (q.get("cla") == null && plan.claDefault));
  const [mods, setMods] = useState<ModuleKey[]>(() => (q.get("modules") ?? "").split(",").filter(Boolean) as ModuleKey[]);

  const [form, setForm] = useState({ first_name: "", last_name: "", email: "", phone: "", password: "", company: "" });
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cfg: Config = { plan, cycle, currency, seats, claOn, modules: mods };
  const totals = computeTotals(cfg, { vatApplicable: currency === "GBP" });
  const fixed = plan.seatCap <= plan.baseSeats;
  const capped = seats >= plan.seatCap;
  const allMods = mods.length >= MODULES.length;

  // ── abandoned-checkout capture (on blur, once there's an email) ──────────────
  const captured = useRef("");
  const capture = useCallback((stage: string) => {
    const email = form.email.trim().toLowerCase();
    if (!email || !email.includes("@")) return;
    const sig = JSON.stringify({ ...form, email, plan: plan.key, cycle, currency, seats, claOn, mods, stage });
    if (sig === captured.current) return;
    captured.current = sig;
    fetch("/api/checkout/capture", {
      method: "POST", headers: { "Content-Type": "application/json" },
      // Never send the password to the lead buffer — only the contact + config.
      body: JSON.stringify({ first_name: form.first_name, last_name: form.last_name, email, phone: form.phone, plan: plan.key, cycle, currency, seats, cla: claOn, modules: mods, stage }),
      keepalive: true,
    }).catch(() => {});
  }, [form, plan.key, cycle, currency, seats, claOn, mods]);

  // Re-capture when config changes after we already have an email.
  useEffect(() => { if (captured.current) capture("config_changed"); /* eslint-disable-next-line */ }, [cycle, seats, claOn, mods]);

  const toggleMod = (k: ModuleKey) => setMods((m) => (m.includes(k) ? m.filter((x) => x !== k) : [...m, k]));
  const toggleAllMods = () => setMods((m) => (m.length >= MODULES.length ? [] : MODULES.map((x) => x.key)));

  async function submit() {
    setError(null);
    if (!form.first_name.trim() || !form.last_name.trim()) return setError("We need your name.");
    if (!form.email.includes("@")) return setError("Enter a valid work email.");
    if (form.password.length < 10) return setError("A little longer — 10 characters minimum.");
    if (!form.company.trim()) return setError("We need a company name.");
    setSubmitting(true);
    // Parse a response body even when the server returns a non-JSON error page (a
    // crashed route → 500 with no JSON). Never let that surface as a blind message.
    const readJson = async (r: Response) => { try { return await r.json(); } catch { return {}; } };
    try {
      const su = await fetch("/api/signup", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: form.first_name, last_name: form.last_name, email: form.email.trim().toLowerCase(),
          phone: form.phone, password: form.password, company: form.company, country: currency === "GBP" ? "GB" : "US",
        }),
      });
      const sud = await readJson(su);
      if (!su.ok) {
        // Already registered → guide them to sign in rather than a generic error.
        if (su.status === 409 || sud.code === "exists") setError("You already have an account with this email — please sign in instead.");
        else setError(sud.error ?? `Couldn't create your account.${su.status ? ` (${su.status})` : ""}`);
        setSubmitting(false); return;
      }

      const ss = await fetch("/api/checkout/session", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ org_id: sud.org_id, email: form.email.trim().toLowerCase(), plan: plan.key, cycle, currency, seats, cla: claOn, modules: mods }),
      });
      const ssd = await readJson(ss);
      if (!ss.ok || !ssd.url) { setError(ssd.error ?? `Couldn't start payment. Please retry.${ss.status ? ` (${ss.status})` : ""}`); setSubmitting(false); return; }
      window.location.href = ssd.url; // → Stripe hosted checkout
    } catch {
      setError("Couldn't reach the server. Check your connection and retry.");
      setSubmitting(false);
    }
  }

  const cfgCur = CUR[currency];
  const field = (label: string, key: keyof typeof form, type = "text", ph = "", auto = "") => (
    <label style={{ display: "block" }}>
      <span style={lblStyle}>{label}<span style={{ color: "#c0392b", marginLeft: 2 }}>*</span></span>
      <input type={type} autoComplete={auto} placeholder={ph} value={form[key]} className="ck-in"
        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))} onBlur={() => capture("step1_partial")} />
    </label>
  );

  return (
    <div style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: INK, background: "#EDEBF3", minHeight: "100vh" }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <header style={{ maxWidth: 1000, margin: "0 auto", padding: "26px 24px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="/pricing" style={{ fontSize: 13, fontWeight: 600, color: "rgba(23,19,31,0.55)", textDecoration: "none" }}>← Back to plans</a>
        <span style={{ fontSize: 12, color: "rgba(23,19,31,0.5)", display: "inline-flex", gap: 6, alignItems: "center" }}>🔒 Secured by Stripe</span>
      </header>

      <main style={{ maxWidth: 1000, margin: "0 auto", padding: "24px 24px 90px", display: "grid", gridTemplateColumns: "1fr 372px", gap: 26, alignItems: "start" }} className="ck-grid">
        {/* ACCOUNT STEP */}
        <div style={card}>
          <h1 style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 28, margin: "0 0 4px" }}>Create your account</h1>
          <p style={{ fontSize: 13.5, color: "rgba(23,19,31,0.55)", margin: "0 0 24px" }}>Then you&apos;ll pay securely on Stripe. Nothing else to set up now.</p>
          <div style={{ display: "grid", gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="ck-names">
              {field("First name", "first_name", "text", "Alex", "given-name")}
              {field("Last name", "last_name", "text", "Doyle", "family-name")}
            </div>
            {field("Work email", "email", "email", "alex@doyle-partners.co.uk", "email")}
            {field("Phone", "phone", "tel", "+44 7700 900123", "tel")}
            <label style={{ display: "block" }}>
              <span style={lblStyle}>Password<span style={{ color: "#c0392b", marginLeft: 2 }}>*</span></span>
              <div style={{ position: "relative" }}>
                <input type={showPw ? "text" : "password"} autoComplete="new-password" placeholder="At least 10 characters" value={form.password} className="ck-in"
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} />
                <button type="button" onClick={() => setShowPw((s) => !s)} style={{ position: "absolute", top: "50%", right: 10, transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, color: AD }}>{showPw ? "Hide" : "Show"}</button>
              </div>
            </label>
            {field("Company name", "company", "text", "Doyle & Partners Ltd", "organization")}
          </div>
          {error && <div style={{ marginTop: 16, padding: "10px 13px", borderRadius: 8, background: "rgba(192,57,43,0.08)", border: "1px solid rgba(192,57,43,0.35)", color: "#a5342a", fontSize: 13 }}>{error}</div>}
          <button type="button" onClick={submit} disabled={submitting} style={{ width: "100%", marginTop: 24, background: A, color: "#fff", border: "none", padding: 16, borderRadius: 13, fontSize: 15, fontWeight: 700, cursor: submitting ? "default" : "pointer", opacity: submitting ? 0.6 : 1, boxShadow: "0 16px 38px -16px rgba(139,125,216,0.8)" }}>
            {submitting ? "Taking you to payment…" : "Continue to payment"}
          </button>
          <div style={{ fontSize: 12, color: "rgba(23,19,31,0.5)", textAlign: "center", marginTop: 14 }}>By creating an account you agree to the <a href="/terms" style={{ color: AD, fontWeight: 600 }}>Terms</a> and <a href="/privacy" style={{ color: AD, fontWeight: 600 }}>Privacy Policy</a>.</div>
        </div>

        {/* ORDER SUMMARY */}
        <aside style={{ ...card, padding: 0, position: "sticky", top: 24, overflow: "hidden" }}>
          <div style={{ padding: "20px 22px 16px", borderBottom: "1px solid rgba(23,19,31,0.1)" }}>
            <h4 style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 21, margin: 0 }}>{plan.name} plan</h4>
            <div style={{ fontSize: 12.5, color: "rgba(23,19,31,0.5)", marginTop: 3 }}>{plan.leadCap.toLocaleString()} leads/mo · {seats} seats · {cycle} billing</div>
          </div>
          <div style={{ padding: "18px 22px" }}>
            {sumRow(`${plan.name} base`, cycle === "yearly" ? "discounted monthly rate" : "billed monthly", fmt(basePrice(plan, cycle, currency), currency))}
            {claOn && sumRow("Closed-loop attribution", "flat — no annual discount", fmt(cfgCur.cla, currency))}
            {totals.extraSeatCount > 0 && sumRow(`${totals.extraSeatCount} extra seat${totals.extraSeatCount > 1 ? "s" : ""}`, `${fmt(cfgCur.seat, currency)}/seat, flat`, fmt(totals.seats, currency))}
            {totals.modules > 0 && sumRow(allMods ? "All modules (bundle)" : `${mods.length} module${mods.length > 1 ? "s" : ""}`, "flat — no annual discount", fmt(totals.modules, currency))}
            {sumRow("Subtotal", "per month" + (cycle === "yearly" ? " × 12" : ""), fmt(totals.monthlySubtotal, currency))}
            {totals.annualSubtotal != null && sumRow("Annual subtotal", "", fmt(totals.annualSubtotal, currency))}
            {sumRow(currency === "GBP" ? "VAT (20%)" : "Sales tax", currency === "GBP" ? "" : "at checkout", fmt(totals.vat, currency))}
            <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid rgba(23,19,31,0.12)", marginTop: 8, paddingTop: 13, fontSize: 16, fontWeight: 800 }}>
              <span>Due today</span><span style={{ fontSize: 19, fontVariantNumeric: "tabular-nums" }}>{fmt(totals.dueToday, currency)}</span>
            </div>

            {/* editable controls */}
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px dashed rgba(23,19,31,0.16)", display: "grid", gap: 12 }}>
              <div style={ctrlRow}><span>Billing</span>
                <div style={miniToggle}>
                  <button type="button" onClick={() => setCycle("monthly")} style={miniBtn(cycle === "monthly")}>Monthly</button>
                  <button type="button" onClick={() => setCycle("yearly")} style={miniBtn(cycle === "yearly")}>Yearly</button>
                </div>
              </div>
              {!fixed ? (
                <div style={ctrlRow}><span>Seats</span>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                    <button type="button" onClick={() => setSeats((s) => Math.max(plan.baseSeats, s - 1))} disabled={seats <= plan.baseSeats} aria-label="Remove seat" style={stepBtn(seats <= plan.baseSeats)}>−</button>
                    <span style={{ minWidth: 22, textAlign: "center", fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{seats}</span>
                    <button type="button" onClick={() => setSeats((s) => Math.min(plan.seatCap, s + 1))} disabled={capped} aria-label="Add seat" style={stepBtn(capped)}>+</button>
                  </div>
                </div>
              ) : <div style={ctrlRow}><span>Seats</span><span style={{ fontWeight: 700 }}>{seats}</span></div>}
              {capped && !fixed && <div style={{ fontSize: 11.5, color: "#B15A28" }}>You&apos;re at the seat limit for {plan.name}.</div>}
              <div style={ctrlRow}><span>Closed-loop attribution</span>
                <button type="button" onClick={() => setClaOn((v) => !v)} role="switch" aria-checked={claOn} style={sw(claOn)}><span style={knob(claOn)} /></button>
              </div>
            </div>

            {/* modules picker */}
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px dashed rgba(23,19,31,0.16)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 700 }}>Optional modules</span>
                <button type="button" onClick={toggleAllMods} style={{ background: "none", border: "none", color: AD, fontWeight: 700, fontSize: 11.5, cursor: "pointer" }}>
                  {allMods ? "Clear all" : `Add all 5 · save ${fmt(MODULES.reduce((s, m) => s + m.price[currency], 0) - MODULE_BUNDLE[currency], currency)}/mo`}
                </button>
              </div>
              <p style={{ fontSize: 11.5, color: "rgba(23,19,31,0.5)", margin: "0 0 10px", lineHeight: 1.45 }}>Extend the system beyond the six core capabilities. The 5-module bundle saves you money.</p>
              <div style={{ display: "grid", gap: 6 }}>
                {MODULES.map((m) => {
                  const on = mods.includes(m.key);
                  return (
                    <button key={m.key} type="button" onClick={() => toggleMod(m.key)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, padding: "9px 11px", borderRadius: 10, cursor: "pointer", textAlign: "left", background: on ? "rgba(139,125,216,0.1)" : "rgba(255,255,255,0.5)", border: `1px solid ${on ? A : "rgba(23,19,31,0.1)"}` }}>
                      <span style={{ fontSize: 12.5, fontWeight: 600, color: INK }}>{m.name}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: on ? AD : "rgba(23,19,31,0.5)", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>{on ? "✓ " : "+"}{fmt(m.price[currency], currency)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div style={{ padding: "13px 22px 16px", background: "rgba(139,125,216,0.06)", borderTop: "1px solid rgba(23,19,31,0.1)", fontSize: 12, color: "rgba(23,19,31,0.62)" }}>
            <b style={{ color: INK }}>Charged today.</b> Full refund if you cancel before your onboarding session. Renews {cycle} · cancel anytime.
          </div>
        </aside>
      </main>
    </div>
  );
}

function sumRow(label: string, sub: string, value: string) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 14, fontSize: 13.5, padding: "7px 0", color: "rgba(23,19,31,0.72)" }}>
      <div style={{ display: "flex", flexDirection: "column" }}><span>{label}</span>{sub && <span style={{ fontSize: 11.5, color: "rgba(23,19,31,0.45)" }}>{sub}</span>}</div>
      <span style={{ fontWeight: 700, fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>{value}</span>
    </div>
  );
}

const card: CSSProperties = { background: "rgba(255,255,255,0.6)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.72)", boxShadow: "0 24px 60px -34px rgba(23,19,31,0.28), inset 0 1px 0 rgba(255,255,255,0.7)", borderRadius: 22, padding: 30 };
const lblStyle: CSSProperties = { display: "block", fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 600, color: "rgba(23,19,31,0.55)", marginBottom: 7 };
const ctrlRow: CSSProperties = { display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 13, fontWeight: 600, color: "rgba(23,19,31,0.72)" };
const miniToggle: CSSProperties = { display: "inline-flex", background: "rgba(23,19,31,0.05)", borderRadius: 999, padding: 3 };
const miniBtn = (a: boolean): CSSProperties => ({ border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 11.5, fontWeight: 700, padding: "6px 12px", borderRadius: 999, background: a ? "#fff" : "transparent", color: a ? INK : "rgba(23,19,31,0.5)", boxShadow: a ? "0 1px 3px rgba(23,19,31,0.15)" : "none" });
const stepBtn = (d: boolean): CSSProperties => ({ width: 28, height: 28, borderRadius: 9, border: "1px solid rgba(139,125,216,0.5)", background: d ? "rgba(139,125,216,0.04)" : "rgba(255,255,255,0.7)", color: AD, fontSize: 16, fontWeight: 700, cursor: d ? "not-allowed" : "pointer", opacity: d ? 0.4 : 1 });
const sw = (on: boolean): CSSProperties => ({ position: "relative", width: 42, height: 24, flex: "none", borderRadius: 999, border: "none", cursor: "pointer", padding: 0, background: on ? A : "rgba(23,19,31,0.18)" });
const knob = (on: boolean): CSSProperties => ({ position: "absolute", top: 2, left: on ? 20 : 2, width: 20, height: 20, borderRadius: 999, background: "#fff", transition: "left .2s ease", boxShadow: "0 1px 3px rgba(0,0,0,0.25)" });

const CSS = `
  .ck-in { width:100%; font-family:inherit; font-size:15px; padding:13px 15px; border:1px solid rgba(23,19,31,0.16); border-radius:12px; background:rgba(255,255,255,0.75); color:#17131F; outline:none; box-sizing:border-box; }
  .ck-in:focus { border-color:#8B7DD8; box-shadow:0 0 0 3px rgba(139,125,216,0.16); }
  @media (max-width: 900px){ .ck-grid { grid-template-columns:1fr !important; } aside { position:static !important; order:-1; } }
  @media (max-width: 560px){ .ck-names { grid-template-columns:1fr !important; } }
`;

export default function CheckoutPage() {
  return <Suspense fallback={null}><CheckoutInner /></Suspense>;
}
