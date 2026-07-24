// SERVER component (no "use client"): the machine-readable half of /pricing.
// Renders a plain-HTML comparison table with the real tier figures, an
// answer-first FAQ, and Offer + FAQPage JSON-LD — all in the initial server
// HTML, because the interactive configurator (PricingV2) is client-only and its
// prices never reach crawlers or AI retrieval. Verify with view-source, not the
// React tree. Passed into PricingV2 via its `seoContent` prop.
import { PLANS, CUR, YEARLY, MOD_FROM } from "./pricingData";

const SERIF = "var(--font-cormorant), 'Cormorant Garamond', serif";

const gbp = (n: number) => "£" + Math.round(n).toLocaleString("en-GB");
const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");
const annual = (m: number) => Math.round(m * YEARLY * 12); // billed yearly, 10% off

// ── FAQ (answer-first: complete answer in the first 40–60 words) ──────────────
const FAQ: { q: string; a: string }[] = [
  {
    q: "What does Rosebud cost?",
    a: "Rosebud runs on four self-serve monthly plans: Start at £660 / $850, Grow at £1,650 / $2,100, Expand at £2,500 / $3,200 and Scale at £4,900 / $6,300 per month. Annual billing takes 10% off. You choose the plan by your monthly lead volume, and every plan runs all six core flows end to end.",
  },
  {
    q: "Is there a setup fee?",
    a: "No. The self-serve plans have no setup fee and no build fee — you pay the monthly or annual subscription and nothing else to get started. Only custom Enterprise engagements are scoped separately on a call.",
  },
  {
    q: "What happens if I exceed my lead volume?",
    a: "Leads above your plan's monthly cap are billed at £0.25 per lead, in blocks of 50. Nothing stops working — the overage keeps the system running past your cap. If you are regularly over, moving up a plan is cheaper than paying the overage.",
  },
  {
    q: "Is there a contract or minimum term?",
    a: "On monthly billing there is no minimum term and no contract — cancel any time. Annual billing is a twelve-month commitment, billed yearly, in exchange for the 10% discount. The monthly plans have no lock-in.",
  },
  {
    q: "How are seats priced?",
    a: "Each plan includes a set number of users — 2 on Start, 5 on Grow, 10 on Expand and 20 on Scale. Extra users are £10 / $13 per user per month above that, up to each plan's cap. Seats are not billed separately from the plan; they are an add-on to it.",
  },
  {
    q: "Do all plans include every capability?",
    a: "Yes. Every plan runs all six core flows — lead capture, qualification, booking, follow-through, retention and CRM sync — end to end. Higher plans add channels, more nurture touches and higher lead volume. Optional modules (from £50 / $65 per month) and closed-loop attribution (+£750 / +$950 per month) are add-ons on any plan.",
  },
];

// ── Schema: Offer per tier (monthly, both currencies) + FAQPage ──────────────
function offersJson() {
  const offers = PLANS.flatMap((p) =>
    (["GBP", "USD"] as const).map((cur) => ({
      "@type": "Offer",
      name: `${p.name} — monthly`,
      price: String(p.price[cur]),
      priceCurrency: cur,
      url: "https://rosebud.global/pricing",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: p.price[cur],
        priceCurrency: cur,
        referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
      },
    })),
  );
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Rosebud Solutions",
    description:
      "The enquiry-handling platform for owner-operated businesses: captures, qualifies, books and follows up every lead, and writes it into the system you already run. Four self-serve monthly plans plus custom Enterprise.",
    brand: { "@type": "Brand", name: "Rosebud Solutions" },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "GBP",
      lowPrice: Math.min(...PLANS.map((p) => p.price.GBP)),
      highPrice: Math.max(...PLANS.map((p) => p.price.GBP)),
      offerCount: PLANS.length,
      offers,
    },
  };
}
const faqJson = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const th: React.CSSProperties = { textAlign: "left", padding: "16px 18px", fontFamily: SERIF, fontWeight: 500, fontSize: 20, color: "#17131F", borderBottom: "1px solid rgba(23,19,31,0.1)" };
const td: React.CSSProperties = { padding: "14px 18px", fontSize: 14.5, color: "rgba(23,19,31,0.78)", borderBottom: "1px solid rgba(23,19,31,0.07)", verticalAlign: "top" };
const rowLabel: React.CSSProperties = { ...td, fontWeight: 600, color: "#17131F", whiteSpace: "nowrap" };

export default function PricingSeo() {
  const rows: [string, (p: (typeof PLANS)[number]) => string][] = [
    ["Monthly price", (p) => `${gbp(p.price.GBP)} / ${usd(p.price.USD)}`],
    ["Annual (billed yearly, 10% off)", (p) => `${gbp(annual(p.price.GBP))} / ${usd(annual(p.price.USD))}`],
    ["Leads / month", (p) => p.leads.replace(" leads / mo", "").replace("Up to ", "Up to ")],
    ["Users included", (p) => `${p.baseSeats}${p.seatCap > p.baseSeats ? ` (up to ${p.seatCap})` : ""}`],
    ["Extra users", () => `${CUR.GBP.sym}${CUR.GBP.seat} / ${CUR.USD.sym}${CUR.USD.seat} per user / mo`],
    ["Closed-loop attribution", (p) => `+${gbp(CUR.GBP.cla)} / +${usd(CUR.USD.cla)} per mo${p.claDefault ? " · on by default" : ""}`],
    ["Optional modules", () => `from ${gbp(MOD_FROM.GBP)} / ${usd(MOD_FROM.USD)} per mo`],
  ];

  return (
    <section id="plans-table" style={{ background: "#F6F3FB", padding: "clamp(64px,8vw,110px) clamp(22px,5vw,48px)" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offersJson()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }} />

      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ fontSize: 12, letterSpacing: ".28em", textTransform: "uppercase", color: "#8B7DD8", marginBottom: 16 }}>Plans &amp; prices</div>
        <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(28px,3.6vw,44px)", lineHeight: 1.06, letterSpacing: "-0.015em", margin: "0 0 10px", color: "#17131F" }}>Four self-serve plans, priced by lead volume</h2>
        <p style={{ fontSize: 16, lineHeight: 1.6, color: "rgba(23,19,31,0.66)", maxWidth: "64ch", margin: "0 0 34px" }}>Every plan runs all six core flows end to end. No setup fee. Monthly billing has no minimum term — cancel any time; annual billing takes 10% off.</p>

        <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch", border: "1px solid rgba(23,19,31,0.08)", borderRadius: 18, background: "#fff", boxShadow: "0 24px 60px -44px rgba(23,19,31,0.4)" }}>
          <table style={{ width: "100%", minWidth: 720, borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ ...th, fontFamily: "inherit", fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(23,19,31,0.5)", fontWeight: 700 }}>Plan</th>
                {PLANS.map((p) => (
                  <th key={p.key} style={th}>{p.name}{p.rec ? <span style={{ display: "block", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: ".04em", textTransform: "uppercase", color: "#6E5FB8", marginTop: 4 }}>Most popular</span> : null}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, val]) => (
                <tr key={label}>
                  <td style={rowLabel}>{label}</td>
                  {PLANS.map((p) => <td key={p.key} style={td}>{val(p)}</td>)}
                </tr>
              ))}
              <tr>
                <td style={rowLabel}>Best for</td>
                {PLANS.map((p) => <td key={p.key} style={{ ...td, color: "rgba(23,19,31,0.6)" }}>{p.desc}</td>)}
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 13, color: "rgba(23,19,31,0.5)", margin: "14px 2px 0" }}>Prices exclude VAT where applicable. Need more than Scale, or a custom build? <a href="https://cal.eu/rosebudsolutions/demo" style={{ color: "#6E5FB8", textDecoration: "underline", textUnderlineOffset: "3px" }}>Talk to us about Enterprise</a>.</p>

        {/* ── FAQ ── */}
        <div style={{ marginTop: "clamp(56px,7vw,88px)" }}>
          <div style={{ fontSize: 12, letterSpacing: ".28em", textTransform: "uppercase", color: "#8B7DD8", marginBottom: 16 }}>Pricing FAQ</div>
          <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(26px,3.2vw,40px)", lineHeight: 1.06, letterSpacing: "-0.015em", margin: "0 0 30px", color: "#17131F" }}>What it costs, answered plainly</h2>
          <div style={{ display: "grid", gap: 4 }}>
            {FAQ.map((f) => (
              <div key={f.q} style={{ padding: "22px 0", borderTop: "1px solid rgba(23,19,31,0.1)" }}>
                <h3 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(19px,2vw,23px)", lineHeight: 1.25, margin: "0 0 10px", color: "#17131F" }}>{f.q}</h3>
                <p style={{ fontSize: 15.5, lineHeight: 1.64, color: "rgba(23,19,31,0.7)", margin: 0, maxWidth: "72ch" }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
