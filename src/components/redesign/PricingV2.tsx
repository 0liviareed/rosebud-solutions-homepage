"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";
import RedesignNav from "./RedesignNav";
import RedesignFooter from "./RedesignFooter";
import BookDemoCTA from "./BookDemoCTA";
import { YEARLY, CUR, PLANS, MOD_FROM, type Cur, type PlanKey, type Plan } from "./pricingData";
import { trackBookingClick } from "@/lib/trackBooking";

// ── Pricing FAQ + JSON-LD ─────────────────────────────────────────────────
// Lives here (not a separate server component) because /pricing is statically
// prerendered — everything in this "use client" component, incl. these
// <script> tags, still lands in the build's server HTML and reaches crawlers
// / AI retrieval same as the rest of the page. Verified via
// .next/server/app/pricing.html, not assumed.
const PRICING_FAQ: { q: string; a: string }[] = [
  { q: "What does Rosebud cost?", a: "Rosebud runs on four self-serve monthly plans: Start at £660, Grow at £1,650, Expand at £2,500 and Scale at £4,900 per month. Annual billing takes 10% off. You choose the plan by your monthly lead volume, and every plan runs all six core flows end to end." },
  { q: "Is there a setup fee?", a: "No. The self-serve plans have no setup fee and no build fee — you pay the monthly or annual subscription and nothing else to get started. Only custom Enterprise engagements are scoped separately on a call." },
  { q: "What happens if I exceed my lead volume?", a: "Leads above your plan's monthly cap are billed at £0.25 per lead, in blocks of 50. Nothing stops working — the overage keeps the system running past your cap. If you are regularly over, moving up a plan is cheaper than paying the overage." },
  { q: "Is there a contract or minimum term?", a: "On monthly billing there is no minimum term and no contract — cancel any time. Annual billing is a twelve-month commitment, billed yearly, in exchange for the 10% discount. The monthly plans have no lock-in." },
  { q: "How are seats priced?", a: "Each plan includes a set number of users — 2 on Start, 5 on Grow, 10 on Expand and 20 on Scale. Extra users are £10 per user per month above that, up to each plan's cap. Seats are not billed separately from the plan; they are an add-on to it." },
  { q: "Do all plans include every capability?", a: "Yes. Every plan runs all six core flows — lead capture, qualification, booking, follow-through, retention and CRM sync — end to end. Higher plans add channels, more nurture touches and higher lead volume. Optional modules (from £50 per month) and closed-loop attribution (+£750 per month) are add-ons on any plan." },
];

function pricingOffersJson() {
  const offers = PLANS.map((p) => ({
    "@type": "Offer", name: `${p.name} — monthly`, price: String(p.price.GBP), priceCurrency: "GBP",
    url: "https://rosebud.global/pricing", availability: "https://schema.org/InStock",
    priceSpecification: { "@type": "UnitPriceSpecification", price: p.price.GBP, priceCurrency: "GBP", referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" } },
  }));
  return {
    "@context": "https://schema.org", "@type": "Product", name: "Rosebud Solutions",
    description: "The inquiry-handling platform for owner-operated businesses: captures, qualifies, books and follows up every lead, and writes it into the system you already run. Four self-serve monthly plans plus custom Enterprise.",
    brand: { "@type": "Brand", name: "Rosebud Solutions" },
    offers: { "@type": "AggregateOffer", priceCurrency: "GBP", lowPrice: Math.min(...PLANS.map((p) => p.price.GBP)), highPrice: Math.max(...PLANS.map((p) => p.price.GBP)), offerCount: PLANS.length, offers },
  };
}
const pricingFaqJson = {
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: PRICING_FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

function PricingFaqItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div style={{ borderTop: "1px solid rgba(23,19,31,0.1)" }}>
      <button type="button" onClick={onToggle} aria-expanded={open} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, padding: "20px 2px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left", color: "#17131F", fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontWeight: 500, fontSize: "clamp(17px,1.7vw,20px)", lineHeight: 1.3 }}>
        <span>{q}</span>
        <span aria-hidden style={{ flex: "none", width: 28, height: 28, borderRadius: 999, border: "1px solid rgba(23,19,31,0.16)", display: "grid", placeItems: "center", fontSize: 14, color: "rgba(23,19,31,0.5)", transform: open ? "rotate(45deg)" : "none", transition: "transform .3s ease" }}>+</span>
      </button>
      <div style={{ maxHeight: open ? 320 : 0, overflow: "hidden", transition: "max-height .4s ease" }}>
        <p style={{ margin: "0 0 22px", maxWidth: "72ch", fontSize: 15, lineHeight: 1.64, color: "rgba(23,19,31,0.66)" }}>{a}</p>
      </div>
    </div>
  );
}

// ── Design tokens ────────────────────────────────────────────────────────────
const SERIF = "var(--font-cormorant), 'Cormorant Garamond', serif";
const A = "#8B7DD8";       // product / accent purple
const AD = "#6E5FB8";      // darker accent
const INK = "#17131F";

const BANDS: { tier: PlanKey; vals: number[] }[] = [
  { tier: "start", vals: [100, 200, 300, 400, 500] },
  { tier: "grow", vals: [600, 1000, 1400, 1800] },
  { tier: "expand", vals: [2000, 2500, 3000, 3500] },
  { tier: "scale", vals: [4000] },
];
const VAL_TIER: Record<number, PlanKey> = {};
BANDS.forEach((b) => b.vals.forEach((v) => (VAL_TIER[v] = b.tier)));

const FLOWS_FULL = ["Omnichannel lead capture", "Qualification rules engine", "Calendar automation", "Follow-through engine", "Retention & reactivation sequences", "CRM synchronisation"];
const specOf = (p: Plan) => {
  const val = (label: string) => { const f = p.feats.find((x) => x.indexOf(label + ":") === 0); return f ? f.slice(label.length + 2) : ""; };
  return { channels: val("Channels"), nurture: val("Nurture"), noshow: val("No-show recovery"), reminders: val("Reminder cadence") };
};
const CAL = "https://cal.eu/rosebudsolutions/demo";

export default function PricingV2() {
  const router = useRouter();
  const [cycle, setCycle] = useState<"monthly" | "yearly">("yearly");
  // Fixed price list per currency (pricingData.ts) — not a live/floating FX
  // conversion, so figures never drift day to day. Persisted in the URL so
  // the choice survives into checkout, which already reads `?currency=`.
  const [currency, setCurrency] = useState<Cur>("USD");
  const [selectedTier, setSelectedTier] = useState<PlanKey | "enterprise" | null>(null);
  const [selectedVal, setSelectedVal] = useState<number | null>(null);
  const [extraSeats, setExtraSeats] = useState<Record<PlanKey, number>>({ start: 0, grow: 0, expand: 0, scale: 0 });
  const [cla, setCla] = useState<Record<PlanKey, boolean>>({ start: false, grow: false, expand: true, scale: true });
  const [modalTier, setModalTier] = useState<PlanKey | null | undefined>(undefined); // undefined = closed
  const [tipOpen, setTipOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

  const cfg = CUR[currency];
  const yearly = cycle === "yearly";
  const fmt = (n: number) => cfg.sym + Math.round(n).toLocaleString(cfg.locale);
  const basePrice = (p: Plan) => (yearly ? Math.round(p.price[currency] * YEARLY) : p.price[currency]);
  const claAmt = (p: Plan) => (cla[p.key] ? cfg.cla : 0);
  const seatCount = (p: Plan) => p.baseSeats + extraSeats[p.key];
  const seatCost = (p: Plan) => extraSeats[p.key] * cfg.seat;
  const atCap = (p: Plan) => seatCount(p) >= p.seatCap;
  const total = (p: Plan) => basePrice(p) + claAmt(p) + seatCost(p);

  const modalOpen = modalTier !== undefined;

  // Preselect from an incoming `?plan=` (e.g. the /plan-finder quiz result
  // CTA links here with the recommended tier) — same effect as picking it
  // from the lead-volume dropdown. Read via window.location, not
  // useSearchParams, so this stays a plain client effect with no Suspense
  // boundary requirement on an otherwise-static page.
  useEffect(() => {
    const plan = new URLSearchParams(window.location.search).get("plan");
    if (!plan) return;
    if (plan === "enterprise") {
      setSelectedTier("enterprise");
      setSelectedVal(null);
    } else {
      const band = BANDS.find((b) => b.tier === plan);
      if (!band) return;
      setSelectedVal(band.vals[band.vals.length - 1]);
      setSelectedTier(band.tier);
    }
    requestAnimationFrame(() => {
      document.getElementById("rb-plans")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  // Modal a11y: ESC close, body lock, focus management.
  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setModalTier(undefined); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      lastTrigger.current?.focus?.();
    };
  }, [modalOpen]);

  const goToPicker = useCallback((e?: { preventDefault: () => void }) => {
    e?.preventDefault();
    const el = document.getElementById("rb-leads");
    if (el) { window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 140, behavior: "smooth" }); setTimeout(() => el.focus(), 380); }
  }, []);
  const goToPlans = useCallback(() => {
    const el = document.getElementById("rb-plans");
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 120, behavior: "smooth" });
  }, []);

  const buy = (p: Plan) => {
    if (!p.selfServe) { window.location.href = CAL; return; }
    // Hand the configuration to checkout (checkout is the next build).
    router.push(`/checkout/configure?plan=${p.key}&cycle=${cycle}&currency=${currency}&seats=${seatCount(p)}&cla=${cla[p.key]}`);
  };
  const openModal = (tier: PlanKey | null) => (e: React.MouseEvent) => { e.preventDefault(); lastTrigger.current = e.currentTarget as HTMLElement; setModalTier(tier); };
  const addClaFromModal = () => {
    const tier = modalTier ?? (selectedTier && selectedTier !== "enterprise" ? selectedTier : null);
    if (!tier) { setModalTier(undefined); setTimeout(goToPlans, 90); return; }
    setCla((s) => ({ ...s, [tier]: true }));
    setModalTier(undefined);
    const p = PLANS.find((x) => x.key === tier)!;
    router.push(`/checkout/configure?plan=${tier}&cycle=${cycle}&currency=${currency}&seats=${seatCount(p)}&cla=true`);
  };

  const onPick = (v: string) => {
    if (v === "enterprise") { setSelectedTier("enterprise"); setSelectedVal(null); return; }
    setSelectedVal(+v); setSelectedTier(VAL_TIER[+v]);
  };

  const segBtn = (active: boolean): CSSProperties => ({ border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: 600, padding: "9px 20px", borderRadius: 999, transition: "all .2s ease", background: active ? "#fff" : "transparent", color: active ? INK : "rgba(23,19,31,0.5)", boxShadow: active ? "0 2px 8px -2px rgba(23,19,31,0.2)" : "none" });
  const stepBtn = (disabled: boolean): CSSProperties => ({ width: 28, height: 28, borderRadius: 9, border: "1px solid rgba(139,125,216,0.5)", background: disabled ? "rgba(139,125,216,0.04)" : "rgba(255,255,255,0.7)", color: AD, fontSize: 16, fontWeight: 700, lineHeight: 1, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.4 : 1, display: "flex", alignItems: "center", justifyContent: "center" });
  const sw = (on: boolean): CSSProperties => ({ position: "relative", width: 42, height: 24, flex: "none", borderRadius: 999, border: "none", cursor: "pointer", padding: 0, transition: "background .2s ease", background: on ? A : "rgba(23,19,31,0.18)" });
  const knob = (on: boolean): CSSProperties => ({ position: "absolute", top: 2, left: on ? 20 : 2, width: 20, height: 20, borderRadius: 999, background: "#fff", transition: "left .2s ease", boxShadow: "0 1px 3px rgba(0,0,0,0.25)" });
  const label: CSSProperties = { fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", fontWeight: 600, color: "rgba(23,19,31,0.42)", marginBottom: 14 };
  const hair: CSSProperties = { height: 1, background: "rgba(23,19,31,0.08)", margin: "20px 0 18px" };

  const anyMatch = selectedTier && selectedTier !== "enterprise";
  const taxNote = cfg.vat === 0 ? "Prices exclude tax. Applicable US sales tax is added at checkout." : "Prices exclude VAT. UK VAT is added at checkout; EU business customers can enter a VAT number for reverse charge.";

  const leadOptions = [...BANDS.flatMap((b) => b.vals.map((v) => ({ value: String(v), label: v.toLocaleString("en-GB") }))), { value: "enterprise", label: "More than 4,000" }];

  // Comparison rows
  type Val = { check?: boolean; text?: string };
  const chk = (): Val => ({ check: true });
  const txt = (v: string): Val => ({ text: v });
  const compRows: { head?: string; label?: string; link?: boolean; tip?: string; values?: Val[] }[] = [
    { head: "Pricing" },
    { label: "Monthly price", values: PLANS.map((p) => txt(fmt(basePrice(p)) + " /mo")) },
    { label: "Lead volume", values: PLANS.map((p) => txt(p.leadNum)) },
    { head: "Core automation flows" },
    ...FLOWS_FULL.map((f) => ({ label: f, values: PLANS.map(() => chk()) })),
    { head: "Configuration" },
    { label: "Channels", values: PLANS.map((p) => txt(specOf(p).channels)) },
    { label: "Sequenced nurture", values: PLANS.map((p) => txt(specOf(p).nurture)) },
    { label: "No-show recovery", values: PLANS.map((p) => txt(specOf(p).noshow)) },
    { label: "Reminder cadence", values: PLANS.map((p) => txt(specOf(p).reminders)) },
    { label: "Team seats", values: PLANS.map((p) => txt(seatCount(p) + (p.seatCap > p.baseSeats ? ` (up to ${p.seatCap})` : ""))) },
    { head: "Add-ons" },
    { label: "Closed-loop attribution", link: true, values: PLANS.map((p) => (p.key === "expand" || p.key === "scale") ? txt(`+${fmt(cfg.cla)} · default on`) : txt(`+${fmt(cfg.cla)}`)) },
    { label: "Optional modules", tip: "Every plan runs the six core capabilities end to end. Modules extend the system beyond that — document & records collection, status updates, quote & proposal follow-up, invoicing & payment chase, and a custom CRM build. Each can be added to any plan for an additional monthly price, at onboarding or any time after.", values: PLANS.map(() => txt(`from ${fmt(MOD_FROM[currency])}/mo`)) },
  ];

  return (
    <div style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: INK, background: "#EDEBF3", minHeight: "100vh", overflowX: "clip" }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <RedesignNav />

      <main style={{ position: "relative", paddingTop: 132 }}>
        <div aria-hidden style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 1200, height: 620, maxWidth: "100%", background: "radial-gradient(60% 60% at 50% 0%, rgba(139,125,216,0.22) 0%, rgba(139,125,216,0) 70%)", pointerEvents: "none" }} />

        {/* HERO */}
        <section style={{ position: "relative", maxWidth: 820, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <div style={{ fontSize: 12, letterSpacing: ".32em", textTransform: "uppercase", color: A, marginBottom: 20 }}>Pricing</div>
          <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(40px,5.4vw,72px)", lineHeight: 1.02, letterSpacing: "-0.015em", margin: 0 }}>Pricing that scales with the <em style={{ fontStyle: "italic", color: AD }}>leads you already pay for</em></h1>
          <p style={{ margin: "26px auto 0", maxWidth: 600, fontSize: 17, lineHeight: 1.62, color: "rgba(23,19,31,0.62)" }}>Every plan runs all six core capabilities end to end. Modules and closed-loop attribution are optional add-ons on any plan — closed-loop is on by default for Expand &amp; Scale.</p>
        </section>

        {/* CYCLE + CURRENCY TOGGLE */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, flexWrap: "wrap", margin: "38px 0 6px" }}>
          <div style={pill}>
            <button type="button" onClick={() => setCycle("monthly")} style={segBtn(!yearly)}>Monthly</button>
            <button type="button" onClick={() => setCycle("yearly")} style={segBtn(yearly)}>Yearly <span style={{ fontSize: 11, fontWeight: 700, color: yearly ? AD : "rgba(23,19,31,0.4)", marginLeft: 4 }}>save 10%</span></button>
          </div>
          <div style={pill} role="group" aria-label="Currency">
            <button type="button" onClick={() => setCurrency("GBP")} style={segBtn(currency === "GBP")}>£ GBP</button>
            <button type="button" onClick={() => setCurrency("USD")} style={segBtn(currency === "USD")}>$ USD</button>
          </div>
        </div>
        <div style={{ textAlign: "center", fontSize: 11.5, color: "rgba(23,19,31,0.42)", marginBottom: 6 }}>Fixed USD pricing — set once, not a daily exchange-rate conversion.</div>

        {/* LEAD PICKER + CURRENCY */}
        <div style={{ maxWidth: 560, margin: "22px auto 42px", padding: "0 24px" }}>
          <div style={{ ...glass, borderRadius: 20, padding: "24px 26px", textAlign: "center" }}>
            <label htmlFor="rb-leads" style={{ display: "block", fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", fontWeight: 600, color: "rgba(23,19,31,0.55)", marginBottom: 14 }}>How many leads a month?</label>
            <select id="rb-leads" value={selectedTier === "enterprise" ? "enterprise" : (selectedVal != null ? String(selectedVal) : "")} onChange={(e) => onPick(e.target.value)} className="rb-pr-select">
              <option value="" disabled>Select your monthly lead volume…</option>
              {leadOptions.map((o) => <option key={o.value} value={o.value}>{o.label} leads / month</option>)}
            </select>
            <div style={{ marginTop: 16, fontSize: 14.5, lineHeight: 1.5, color: "rgba(23,19,31,0.62)", minHeight: 22 }}>
              {!selectedTier ? "Pick your volume and we’ll highlight the right plan." : selectedTier === "enterprise" ? (
                <span>For more than <b style={{ color: AD }}>4,000</b> leads a month, Enterprise is the right shape — let’s talk.</span>
              ) : (() => {
                const p = PLANS.find((x) => x.key === selectedTier)!;
                return <span>For ~<b style={{ color: AD }}>{selectedVal?.toLocaleString("en-GB")}</b> leads a month → the <b style={{ color: AD }}>{p.name}</b> plan at <b style={{ color: AD }}>{fmt(total(p))}/mo</b>{claAmt(p) ? " (incl. closed-loop attribution)." : "."}</span>;
              })()}
            </div>
          </div>
        </div>

        {/* PLAN GRID */}
        <section id="rb-plans" style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px" }}>
          <div className="rb-pr-grid">
            {PLANS.map((p) => {
              const matched = p.key === selectedTier;
              const spotlight = anyMatch ? matched : p.rec;
              const dim = !!anyMatch && !matched;
              const fixed = p.seatCap <= p.baseSeats;
              const capped = atCap(p);
              const spec = specOf(p);
              const included = ["6 core automation flows", `Channels: ${spec.channels}`];
              const billExtra = extraSeats[p.key] > 0 ? `+${extraSeats[p.key]} seat${extraSeats[p.key] > 1 ? "s" : ""} ${fmt(seatCost(p))}` : "";
              return (
                <div key={p.key} style={{ display: "flex" }}>
                  <div style={{ position: "relative", width: "100%", display: "flex", flexDirection: "column", borderRadius: 22, padding: "28px 24px", opacity: dim ? 0.5 : 1, background: "rgba(255,255,255,0.55)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: spotlight ? `1.5px solid ${A}` : "1px solid rgba(255,255,255,0.72)", boxShadow: spotlight ? "0 0 0 4px rgba(139,125,216,0.14), 0 34px 70px -32px rgba(139,125,216,0.5), inset 0 1px 0 rgba(255,255,255,0.7)" : "0 20px 50px -30px rgba(23,19,31,0.25), inset 0 1px 0 rgba(255,255,255,0.6)", transform: spotlight ? "translateY(-6px) scale(1.012)" : "none", transition: "transform .25s ease, box-shadow .25s ease, border-color .25s ease, opacity .25s ease" }}>
                    {p.rec && <div style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", background: A, color: "#fff", fontSize: 11, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", padding: "5px 15px", borderRadius: 999, whiteSpace: "nowrap", boxShadow: "0 8px 22px -8px rgba(139,125,216,0.8)" }}>Most popular</div>}
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ width: 10, height: 10, borderRadius: 3, background: A, flex: "none" }} />
                      <h3 style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 26, lineHeight: 1, margin: 0, color: INK }}>{p.name}</h3>
                    </div>
                    <p style={{ fontSize: 13, lineHeight: 1.5, margin: "12px 0 0", color: "rgba(23,19,31,0.6)", minHeight: 39 }}>{p.desc}</p>
                    <div style={hair} />
                    <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
                      <span style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 46, letterSpacing: "-0.01em", fontVariantNumeric: "tabular-nums", color: INK, lineHeight: 1 }}>{fmt(basePrice(p) + claAmt(p))}</span>
                      <span style={{ fontSize: 14, color: "rgba(23,19,31,0.5)", fontWeight: 500 }}>/mo</span>
                    </div>
                    {yearly && (
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 13, color: "rgba(23,19,31,0.42)", textDecoration: "line-through" }}>{fmt(p.price[currency] + claAmt(p))}/mo</span>
                        <span style={{ fontSize: 11, fontWeight: 700, color: "#2E7D53", background: "rgba(46,125,83,0.1)", border: "1px solid rgba(46,125,83,0.22)", padding: "2px 9px", borderRadius: 999 }}>save {fmt((p.price[currency] - basePrice(p)) * 12)}/yr</span>
                      </div>
                    )}
                    <div style={{ fontSize: 11.5, color: "rgba(23,19,31,0.5)", minHeight: 16, marginTop: 6 }}>{yearly ? "billed annually" : "billed monthly"}{billExtra && <> · <span style={{ fontWeight: 600 }}>{billExtra}</span></>}</div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 9, marginTop: 18 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 11, padding: "12px 14px", borderRadius: 12, background: "rgba(255,255,255,0.5)", border: "1px solid rgba(23,19,31,0.07)" }}>
                        <span style={{ color: "rgba(23,19,31,0.55)", flex: "none", display: "flex" }}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 4h18l-7 8v6l-4 2v-8L3 4z" /></svg></span>
                        <span style={{ fontSize: 13.5, fontWeight: 600, color: INK }}>{p.leadNum} leads / month</span>
                      </div>
                    </div>

                    <button type="button" onClick={() => buy(p)} style={{ marginTop: 18, width: "100%", border: "none", borderRadius: 13, padding: 15, cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 700, transition: "transform .2s ease, box-shadow .2s ease", background: spotlight ? A : "#1B1622", color: "#fff", boxShadow: spotlight ? "0 18px 42px -12px rgba(139,125,216,0.95)" : "0 14px 30px -16px rgba(23,19,31,0.5)" }}>Choose {p.name}</button>
                    <div style={{ fontSize: 11.5, textAlign: "center", color: "rgba(23,19,31,0.5)", marginTop: 11 }}>{p.bestFor}</div>

                    <div style={hair} />
                    <div style={label}>What&apos;s included</div>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                      {included.map((o) => (
                        <li key={o} style={{ display: "flex", gap: 9, alignItems: "flex-start", fontSize: 13, lineHeight: 1.4 }}>
                          <span style={{ color: A, flex: "none", marginTop: 1, display: "flex" }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12.5l5 5L20 6.5" /></svg></span>
                          <span style={{ color: "rgba(23,19,31,0.75)" }}>{o}</span>
                        </li>
                      ))}
                    </ul>

                    <div style={hair} />
                    <div style={label}>Add-ons</div>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={addonTitle}>Team seats</span>
                        <span style={addonSub}>{fixed ? `${seatCount(p)} seats` : `${p.baseSeats} included · ${fmt(cfg.seat)}/seat to add`}</span>
                      </div>
                      {fixed ? <span style={seatCountStyle}>{seatCount(p)}</span> : (
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
                          <button type="button" onClick={() => setExtraSeats((s) => ({ ...s, [p.key]: Math.max(0, s[p.key] - 1) }))} disabled={extraSeats[p.key] <= 0} aria-label="Remove seat" style={stepBtn(extraSeats[p.key] <= 0)}>−</button>
                          <span style={seatCountStyle}>{seatCount(p)}</span>
                          <button type="button" onClick={() => setExtraSeats((s) => (seatCount(p) < p.seatCap ? { ...s, [p.key]: s[p.key] + 1 } : s))} disabled={capped} aria-label="Add seat" style={stepBtn(capped)}>+</button>
                        </div>
                      )}
                    </div>
                    {capped && !fixed && <div style={{ fontSize: 11, color: "#B15A28", fontWeight: 500, marginTop: 4 }}>Seat limit — {p.nextName} includes {p.nextSeats} →</div>}

                    <div style={{ display: "flex", justifyContent: "space-between", gap: 14, alignItems: "center", marginTop: 15 }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                        <span style={addonTitle}>Closed-loop attribution&nbsp;&nbsp;<span style={{ fontSize: 12.5, fontWeight: 600, color: "rgba(23,19,31,0.5)", fontVariantNumeric: "tabular-nums", marginLeft: 2 }}>+{fmt(cfg.cla)}/mo</span></span>
                        <a href="#" onClick={openModal(p.key)} style={{ fontSize: 11.5, fontWeight: 600, color: AD, borderBottom: "1px solid rgba(110,95,184,0.5)", whiteSpace: "nowrap", alignSelf: "flex-start" }}>See how it works →</a>
                      </div>
                      <button type="button" onClick={() => setCla((s) => ({ ...s, [p.key]: !s[p.key] }))} role="switch" aria-checked={cla[p.key]} aria-label="Toggle closed-loop attribution" style={sw(cla[p.key])}><span style={knob(cla[p.key])} /></button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ENTERPRISE BAND */}
          <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 26, flexWrap: "wrap", borderRadius: 22, padding: "30px 34px", background: "#111019", color: "#F5F1EA", border: "1px solid rgba(184,174,219,0.16)", boxShadow: selectedTier === "enterprise" ? "0 0 0 4px rgba(139,125,216,0.2), 0 30px 66px -32px rgba(0,0,0,0.7)" : "0 30px 66px -34px rgba(0,0,0,0.6)", transition: "box-shadow .25s ease" }}>
            <div style={{ flex: 1, minWidth: 260 }}>
              <div style={{ fontSize: 11, letterSpacing: ".28em", textTransform: "uppercase", color: "#B8AEDB", marginBottom: 10 }}>Enterprise</div>
              <h3 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 30, lineHeight: 1.05, margin: 0 }}>Beyond 4,000 leads a month</h3>
              <p style={{ margin: "12px 0 0", fontSize: 14, lineHeight: 1.6, color: "rgba(245,241,234,0.66)", maxWidth: 520 }}>Bespoke requirements, dedicated deployment, region of choice, custom modules &amp; priority SLAs.</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 20px", marginTop: 16, fontSize: 12.5, color: "rgba(245,241,234,0.8)" }}>
                {["Dedicated deployment", "Custom volume", "Priority SLAs", "All add-ons"].map((t) => <span key={t} style={{ display: "flex", gap: 8, alignItems: "center" }}><span style={{ color: "#B8AEDB" }}>✓</span> {t}</span>)}
              </div>
            </div>
            <a href={CAL} target="_blank" rel="noopener noreferrer" onClick={() => trackBookingClick(CAL)} style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "#F5F1EA", color: INK, padding: "15px 28px", borderRadius: 999, fontSize: 15, fontWeight: 600, whiteSpace: "nowrap" }}>Contact sales →</a>
          </div>

          <div style={{ textAlign: "center", fontSize: 12.5, color: "rgba(23,19,31,0.5)", marginTop: 18 }}>{taxNote}</div>
        </section>

        {/* NOT SURE WHICH PLAN FITS */}
        <section style={{ maxWidth: 1180, margin: "64px auto 0", padding: "0 24px", textAlign: "center" }}>
          <div style={{ fontSize: 12, letterSpacing: ".3em", textTransform: "uppercase", color: A, marginBottom: 18 }}>Not sure which plan fits?</div>
          <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(30px,3.6vw,48px)", lineHeight: 1.05, margin: "0 0 30px" }}>We&apos;ll map your funnel and tell you which plan fits — <em style={{ fontStyle: "italic", color: AD }}>or that none of them does</em></h2>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <BookDemoCTA label="Book a free consultation" href={CAL} tone="light" />
            <a href="/plan-finder" style={{ fontSize: 14, fontWeight: 600, color: AD, borderBottom: "1px dashed rgba(110,95,184,0.5)" }}>Or take the 2-minute fit quiz →</a>
          </div>
        </section>

        {/* COMPARISON TABLE */}
        <section style={{ maxWidth: 1180, margin: "70px auto 0", padding: "0 24px 90px" }}>
          <div style={{ textAlign: "center", marginBottom: 30 }}>
            <div style={{ fontSize: 12, letterSpacing: ".3em", textTransform: "uppercase", color: A, marginBottom: 14 }}>Compare</div>
            <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(28px,3.4vw,44px)", lineHeight: 1.05, margin: 0 }}>Every plan, side by side</h2>
            <p style={{ margin: "16px auto 0", maxWidth: 520, fontSize: 15, lineHeight: 1.6, color: "rgba(23,19,31,0.6)" }}>The full detail — flows, channels, cadences and add-ons — for when you want to see exactly what changes as you scale.</p>
          </div>

          <div className="rb-pr-comp-wrap">
            <div style={{ overflow: "hidden", border: "1px solid rgba(23,19,31,0.1)", borderRadius: 22, background: "rgba(255,255,255,0.5)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", boxShadow: "0 24px 60px -40px rgba(23,19,31,0.28)", minWidth: 760 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr" }}>
                <div style={{ padding: "24px 22px", display: "flex", alignItems: "flex-end", fontFamily: SERIF, fontSize: 18, color: "rgba(23,19,31,0.5)" }}>Feature</div>
                {PLANS.map((p) => (
                  <div key={p.key} style={{ padding: "24px 16px 22px", textAlign: "center", borderLeft: "1px solid rgba(23,19,31,0.06)", background: p.key === selectedTier ? "rgba(139,125,216,0.07)" : "transparent" }}>
                    {p.rec && <div style={{ display: "inline-block", background: A, color: "#fff", fontSize: 9.5, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", padding: "3px 10px", borderRadius: 999, marginBottom: 8 }}>Popular</div>}
                    <div style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 20, color: INK }}>{p.name}</div>
                    <div style={{ fontSize: 13, color: "rgba(23,19,31,0.5)", marginTop: 3 }}>{fmt(basePrice(p))} /mo</div>
                    <button type="button" onClick={() => buy(p)} style={{ marginTop: 16, width: "100%", border: "none", borderRadius: 11, padding: 11, cursor: "pointer", fontFamily: "inherit", fontSize: 12.5, fontWeight: 600, background: p.key === selectedTier ? A : "rgba(139,125,216,0.12)", color: p.key === selectedTier ? "#fff" : AD }}>Choose {p.name}</button>
                  </div>
                ))}
              </div>

              {compRows.map((r, i) => r.head ? (
                <div key={i} style={{ padding: "13px 22px", background: "rgba(139,125,216,0.07)", borderTop: "1px solid rgba(23,19,31,0.06)", fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", fontWeight: 700, color: AD }}>{r.head}</div>
              ) : (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr", borderTop: "1px solid rgba(23,19,31,0.06)" }}>
                  <div style={{ padding: "13px 22px", fontSize: 13, color: "rgba(23,19,31,0.7)", display: "flex", alignItems: "center", gap: 7 }}>
                    {r.link ? <a href="#" onClick={openModal(null)} style={{ color: AD, fontWeight: 600, borderBottom: "1px dashed rgba(110,95,184,0.5)", cursor: "pointer" }}>{r.label}</a> : <span>{r.label}</span>}
                    {r.tip && (
                      <span style={{ position: "relative", display: "inline-flex" }} onMouseEnter={() => setTipOpen(true)} onMouseLeave={() => setTipOpen(false)}>
                        <span style={{ display: "inline-flex", width: 16, height: 16, borderRadius: 999, background: "rgba(139,125,216,0.16)", color: AD, fontSize: 10, fontWeight: 700, fontStyle: "italic", alignItems: "center", justifyContent: "center", cursor: "help", flex: "none" }}>i</span>
                        {tipOpen && <span style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)", width: 300, maxWidth: "66vw", background: INK, color: "#F5F1EA", fontSize: 11.5, lineHeight: 1.55, fontWeight: 400, fontStyle: "normal", padding: "13px 15px", borderRadius: 12, boxShadow: "0 20px 44px -16px rgba(0,0,0,0.6)", zIndex: 60, textAlign: "left" }}>{r.tip}</span>}
                      </span>
                    )}
                  </div>
                  {r.values!.map((v, j) => (
                    <div key={j} style={{ padding: "13px 12px", fontSize: 12.5, textAlign: "center", color: INK, fontWeight: 500, borderLeft: "1px solid rgba(23,19,31,0.05)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {v.check ? <span style={{ color: A, display: "flex" }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12.5l5 5L20 6.5" /></svg></span> : <span>{v.text}</span>}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div style={{ maxWidth: 920, margin: "22px auto 0", textAlign: "center", fontSize: 12.5, lineHeight: 1.7, color: "rgba(23,19,31,0.55)" }}>
            <b style={{ color: "rgba(23,19,31,0.72)" }}>Every plan includes all six core capabilities:</b> Capture &amp; Respond · Qualify &amp; Triage · Book into Diary · Remind &amp; Reschedule · Recall &amp; Nurture · Write to CRM.<br />
            <b style={{ color: "rgba(23,19,31,0.72)" }}>Optional modules (added to any plan):</b> status updates · document / records collection · quote / proposal follow-up · invoicing &amp; payment chase · custom CRM build.
          </div>
        </section>
      </main>

      {/* CLA MODAL */}
      {modalOpen && (
        <div onClick={(e) => { if (e.target === e.currentTarget) setModalTier(undefined); }} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(23,19,31,0.5)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", display: "grid", placeItems: "center", padding: 20, animation: "rbScrimIn .18s ease" }}>
          <div role="dialog" aria-modal="true" aria-labelledby="rb-cla-title" style={{ background: "#F7F4FB", border: "1px solid rgba(255,255,255,0.8)", borderRadius: 24, maxWidth: 720, width: "100%", maxHeight: "90vh", overflow: "auto", boxShadow: "0 40px 100px -24px rgba(23,19,31,0.55)", animation: "rbModalIn .2s cubic-bezier(.2,.8,.2,1)" }}>
            <div style={{ position: "relative", padding: "38px 40px 4px", textAlign: "center" }}>
              <button ref={closeBtnRef} type="button" onClick={() => setModalTier(undefined)} aria-label="Close" style={{ position: "absolute", top: 20, right: 20, width: 34, height: 34, borderRadius: 999, border: "none", background: "rgba(23,19,31,0.06)", color: "rgba(23,19,31,0.55)", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
              <div style={{ fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", fontWeight: 700, color: AD, marginBottom: 14 }}>Closed-loop attribution · +{fmt(cfg.cla)}/mo · on by default for Expand &amp; Scale</div>
              <h2 id="rb-cla-title" style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 32, lineHeight: 1.08, letterSpacing: "-0.015em", margin: "0 auto", maxWidth: 540, color: INK }}>Same ad budget — more of the customers who actually book.</h2>
              <p style={{ margin: "16px auto 0", maxWidth: 560, fontSize: 14, lineHeight: 1.62, color: "rgba(23,19,31,0.62)" }}>When Google can see which leads became real, paying customers — not just who filled in a form — it spends your budget finding more people like them. Lower cost per booked job, from the same spend, with nothing extra to run.</p>
              <div style={{ marginTop: 18, display: "inline-flex", alignItems: "center", gap: 9, background: "#fff", border: "1px solid rgba(23,19,31,0.1)", padding: "7px 14px 7px 10px", borderRadius: 999, boxShadow: "0 6px 18px -12px rgba(23,19,31,0.45)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" aria-label="Google Ads"><rect x="4" y="3" width="6" height="15" rx="3" fill="#FBBC05" transform="rotate(-30 7 10.5)" /><rect x="14" y="3" width="6" height="15" rx="3" fill="#4285F4" transform="rotate(30 17 10.5)" /><circle cx="12" cy="19" r="3" fill="#34A853" /></svg>
                <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(23,19,31,0.7)" }}>Feeds straight into your Google Ads account</span>
              </div>
            </div>
            <div style={{ padding: "26px 40px 6px" }}>
              <div className="rb-pr-modal-steps">
                {["Every lead tied back to its real outcome in your CRM", "That outcome fed back to Google Ads as the signal", "Bidding shifts toward booked customers, not clicks"].map((t) => (
                  <div key={t} style={{ background: "rgba(139,125,216,0.07)", border: "1px solid rgba(139,125,216,0.18)", borderRadius: 14, padding: "16px 15px", display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ color: A, flex: "none", marginTop: 1 }}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span>
                    <span style={{ fontSize: 13, lineHeight: 1.42, fontWeight: 600, color: INK }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ padding: "22px 40px 34px", textAlign: "center" }}>
              <button type="button" onClick={addClaFromModal} style={{ width: "100%", maxWidth: 430, background: A, color: "#fff", border: "none", padding: "17px 24px", borderRadius: 14, fontSize: 16, fontWeight: 700, cursor: "pointer", boxShadow: "0 18px 40px -14px rgba(139,125,216,0.9)" }}>Add closed-loop to my plan</button>
              <div style={{ marginTop: 12, fontSize: 12.5, color: "rgba(23,19,31,0.55)" }}>+{fmt(cfg.cla)}/mo · on by default for Expand &amp; Scale</div>
              <div style={{ marginTop: 16, display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
                <a href="#" onClick={(e) => { e.preventDefault(); setModalTier(undefined); setTimeout(() => goToPicker(), 90); }} style={{ fontSize: 13, fontWeight: 600, color: AD, borderBottom: "1px dashed rgba(110,95,184,0.5)" }}>Not sure? See if it moves your numbers →</a>
                <a href={CAL} target="_blank" rel="noopener noreferrer" onClick={() => trackBookingClick(CAL)} style={{ fontSize: 13, fontWeight: 600, color: "rgba(23,19,31,0.55)", borderBottom: "1px solid rgba(23,19,31,0.22)" }}>Contact sales</a>
              </div>
            </div>
          </div>
        </div>
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingOffersJson()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingFaqJson) }} />

      {/* PRICING FAQ */}
      <section style={{ maxWidth: 820, margin: "0 auto", padding: "0 24px 100px" }}>
        <div style={{ fontSize: 12, letterSpacing: ".28em", textTransform: "uppercase", color: A, marginBottom: 16 }}>Pricing FAQ</div>
        <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(26px,3.2vw,40px)", lineHeight: 1.06, letterSpacing: "-0.015em", margin: "0 0 30px", color: INK }}>What it costs, answered plainly</h2>
        <div>
          {PRICING_FAQ.map((f, i) => (
            <PricingFaqItem key={f.q} q={f.q} a={f.a} open={faqOpen === i} onToggle={() => setFaqOpen((o) => (o === i ? null : i))} />
          ))}
        </div>
      </section>

      <RedesignFooter />
    </div>
  );
}

const pill: CSSProperties = { display: "inline-flex", background: "rgba(255,255,255,0.55)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.7)", boxShadow: "0 12px 34px -22px rgba(23,19,31,0.4), inset 0 1px 0 rgba(255,255,255,0.7)", borderRadius: 999, padding: 5, gap: 3 };
const glass: CSSProperties = { background: "rgba(255,255,255,0.55)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.72)", boxShadow: "0 20px 50px -30px rgba(23,19,31,0.25), inset 0 1px 0 rgba(255,255,255,0.65)" };
const addonTitle: CSSProperties = { fontSize: 13, color: "rgba(23,19,31,0.82)", fontWeight: 600 };
const addonSub: CSSProperties = { fontSize: 11.5, color: "rgba(23,19,31,0.5)", marginTop: 3, lineHeight: 1.45 };
const seatCountStyle: CSSProperties = { minWidth: 20, textAlign: "center", fontWeight: 700, fontVariantNumeric: "tabular-nums", fontSize: 13, color: INK };

const CSS = `
  @keyframes rbModalIn { from { opacity:0; transform:translateY(14px) scale(0.985);} to { opacity:1; transform:translateY(0) scale(1);} }
  @keyframes rbScrimIn { from { opacity:0;} to { opacity:1;} }
  .rb-pr-select { width:100%; font-family:inherit; font-size:16px; font-weight:600; padding:16px 50px 16px 20px; border:1px solid rgba(23,19,31,0.12); border-radius:14px; color:${INK}; background-color:rgba(255,255,255,0.7); cursor:pointer; -webkit-appearance:none; appearance:none; outline:none; text-align:left; box-shadow:inset 0 1px 0 rgba(255,255,255,0.6); background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><path d='M3 6l5 5 5-5' stroke='%238B7DD8' stroke-width='1.8' fill='none' stroke-linecap='round' stroke-linejoin='round'/></svg>"); background-repeat:no-repeat; background-position:right 18px center; }
  .rb-pr-select:focus { border-color:${A}; box-shadow:0 0 0 3px rgba(139,125,216,0.16); }
  .rb-pr-grid { display:grid; grid-template-columns:repeat(4, minmax(0,1fr)); gap:18px; align-items:start; }
  .rb-pr-modal-steps { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; }
  .rb-pr-comp-wrap { }
  @media (max-width: 980px){ .rb-pr-grid { grid-template-columns:repeat(2, minmax(0,1fr)); } .rb-pr-comp-wrap { overflow-x:auto; -webkit-overflow-scrolling:touch; } }
  @media (max-width: 620px){ .rb-pr-modal-steps { grid-template-columns:1fr; } }
  @media (max-width: 560px){ .rb-pr-grid { grid-template-columns:1fr; } }
  @media (prefers-reduced-motion: reduce){ *, ::before, ::after { animation-duration:0.001ms !important; transition-duration:0.001ms !important; } }
`;
