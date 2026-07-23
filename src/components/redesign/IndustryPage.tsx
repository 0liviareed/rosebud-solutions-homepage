"use client";
import { useState, type CSSProperties, type ReactNode } from "react";
import RedesignNav from "./RedesignNav";
import RedesignFooter from "./RedesignFooter";
import RedesignReveal from "./RedesignReveal";
import BookDemoCTA from "./BookDemoCTA";
import { INDUSTRY_SIBLINGS, type IndustryData, type IndustryRole } from "./industryData";

const SERIF = "var(--font-cormorant), 'Cormorant Garamond', serif";
const A = "#8B7DD8";

// Generic tinted mock for a role block (bespoke graphics aren't the ranking factor
// across pages carrying ~111 impressions — same call as the capability generics).
function roleMock(accent: string, label: string): ReactNode {
  const pill = (t: string, active: boolean) => (
    <div style={{ background: active ? accent : "#fff", color: active ? "#fff" : "#17131F", borderRadius: "2.2cqw", padding: "1.3cqw 2cqw", boxShadow: "0 1.8cqw 3cqw -1.4cqw rgba(23,19,31,.4)", fontWeight: 700, fontSize: "1.6cqw", whiteSpace: "nowrap" }}>{t}</div>
  );
  const conn = <span style={{ flex: 1, height: 0, borderTop: "0.4cqw dotted rgba(23,19,31,.25)", margin: "0 .7cqw" }} />;
  return (
    <div className="rb-cq" style={{ position: "relative", width: "100%", aspectRatio: "1/1", borderRadius: 22, overflow: "hidden", background: `linear-gradient(155deg, ${accent}26, ${accent}0d)`, boxShadow: "0 34px 70px -30px rgba(23,19,31,0.35)" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(80% 70% at 80% 8%, rgba(255,255,255,0.5), transparent 55%)" }} />
      <div style={{ position: "absolute", left: "9%", right: "9%", top: "16%", background: "#fff", borderRadius: "3cqw", boxShadow: "0 3cqw 5cqw -1.6cqw rgba(23,19,31,.3)", overflow: "hidden" }}>
        <div style={{ background: accent, color: "#fff", padding: "2.2cqw 2.8cqw", display: "flex", alignItems: "center", gap: "1.4cqw" }}>
          <span style={{ width: "3.2cqw", height: "3.2cqw", borderRadius: "1cqw", background: "rgba(255,255,255,0.22)", display: "grid", placeItems: "center", fontFamily: SERIF, fontWeight: 700, fontSize: "1.9cqw" }}>{label[0]}</span>
          <span style={{ fontFamily: SERIF, fontWeight: 600, fontSize: "2.3cqw" }}>{label}</span>
          <span style={{ marginLeft: "auto", width: "1.6cqw", height: "1.6cqw", borderRadius: "50%", background: "#4ADE80" }} />
        </div>
        <div style={{ padding: "1.6cqw 2.8cqw 2.4cqw" }}>
          {[["Status", "Running"], ["Handled by", "Rosebud"], ["Office", "Freed"]].map(([k, v]) => (
            <div key={k} style={{ display: "flex", alignItems: "center", gap: "1.2cqw", padding: "1.6cqw 0", borderBottom: "1px solid #f2f3f5" }}>
              <span style={{ width: "34%", fontSize: "1.35cqw", letterSpacing: ".04em", textTransform: "uppercase", color: "#9aa0a8", fontWeight: 700 }}>{k}</span>
              <span style={{ flex: 1, fontWeight: 700, fontSize: "1.85cqw", color: "#17131F" }}>{v}</span>
              <span style={{ width: "1.4cqw", height: "1.4cqw", borderRadius: "50%", background: accent }} />
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: "absolute", left: "9%", right: "9%", bottom: "9%", display: "flex", alignItems: "center" }}>
        {pill("Enters", false)}{conn}{pill(label.split(" ")[0], true)}{conn}{pill("Done", false)}
      </div>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid rgba(245,241,234,0.12)" }}>
      <button type="button" onClick={() => setOpen((o) => !o)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 18, padding: "24px 4px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left", color: "#F5F1EA", fontFamily: SERIF, fontSize: "clamp(19px,2vw,24px)", lineHeight: 1.25 }}>
        <span>{q}</span>
        <span style={{ flex: "none", width: 30, height: 30, borderRadius: 999, border: "1px solid rgba(245,241,234,0.3)", display: "grid", placeItems: "center", fontSize: 18, color: "#B8AEDB", transform: open ? "rotate(45deg)" : "none", transition: "transform .3s ease" }}>+</span>
      </button>
      <div style={{ maxHeight: open ? 400 : 0, overflow: "hidden", transition: "max-height .4s ease" }}>
        <p style={{ margin: "0 0 26px", maxWidth: "70ch", fontSize: 15.5, lineHeight: 1.62, color: "rgba(245,241,234,0.66)" }}>{a}</p>
      </div>
    </div>
  );
}

export default function IndustryPage({ data }: { data: IndustryData }) {
  const [switchOpen, setSwitchOpen] = useState(false);

  const serviceSchema = {
    "@context": "https://schema.org", "@type": "Service", serviceType: data.schema.serviceType,
    provider: { "@type": "Organization", name: "Rosebud Global Ltd" },
    areaServed: { "@type": "Country", name: data.schema.areaServed },
    description: data.schema.serviceDescription,
    offers: { "@type": "Offer", priceCurrency: data.schema.offerCurrency, description: data.schema.offerDescription },
  };
  const faqSchema = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: data.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://rosebud.global/" },
      { "@type": "ListItem", position: 2, name: "Industries", item: `https://rosebud.global/industries/${data.slug}` },
      { "@type": "ListItem", position: 3, name: data.schema.breadcrumbName, item: `https://rosebud.global/industries/${data.slug}` },
    ],
  };

  const deepCtas = [
    { label: "See plans & pricing", href: "/pricing" },
    { label: "Book a consultation", href: "https://cal.eu/rosebudsolutions/demo" },
    { label: "Get your price", href: "/pricing" },
  ];

  return (
    <div style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#F5F1EA", background: "#ECE7F7", overflowX: "clip" }}>
      <style dangerouslySetInnerHTML={{ __html: `.rb-cq{container-type:inline-size}@media(max-width:900px){.rb-ind-hero-grid,.rb-ind-deep-grid{grid-template-columns:1fr!important;gap:40px!important}.rb-ind-deep-graphic{order:2}.rb-ind-pad{padding-left:20px!important;padding-right:20px!important}}` }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <RedesignNav />

      {/* ===================== HERO ===================== */}
      <section className="rb-ind-pad" style={{ position: "relative", overflow: "hidden", background: "#ECE7F7", color: "#17131F", padding: "172px 48px 120px" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 90% at 84% 0%, rgba(139,125,216,0.1) 0%, transparent 52%), radial-gradient(80% 70% at 0% 100%, rgba(232,129,74,0.06) 0%, transparent 55%)" }} />
        <div className="rb-ind-hero-grid" style={{ position: "relative", zIndex: 1, maxWidth: 1220, margin: "0 auto", display: "grid", gridTemplateColumns: "1.02fr 0.98fr", gap: 60, alignItems: "center" }}>
          <div>
            {/* "Rosebud for [industry]" switcher — the interlinked cluster */}
            <div style={{ position: "relative", display: "inline-block", marginBottom: 30 }}>
              <button type="button" onClick={() => setSwitchOpen((s) => !s)} style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "7px 8px 7px 18px", borderRadius: 999, background: "rgba(255,255,255,0.42)", backdropFilter: "blur(20px) saturate(1.5)", WebkitBackdropFilter: "blur(20px) saturate(1.5)", border: "1px solid rgba(255,255,255,0.6)", boxShadow: "0 10px 30px -16px rgba(23,19,31,0.35), inset 0 1px 0 rgba(255,255,255,0.6)", color: "#17131F", fontSize: 13, cursor: "pointer" }}>
                <span style={{ color: "rgba(23,19,31,0.5)" }}>Rosebud for</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 13px", borderRadius: 999, background: "#fff", boxShadow: "0 4px 12px -5px rgba(23,19,31,0.3)" }}>
                  <span style={{ fontWeight: 700, color: "#17131F", fontSize: 14 }}>{data.name}</span>
                  <span style={{ fontSize: 9, color: A, transition: "transform .3s ease", transform: switchOpen ? "rotate(180deg)" : "none" }}>▼</span>
                </span>
              </button>
              {switchOpen && (
                <div style={{ position: "absolute", top: 54, left: 0, zIndex: 40, width: 320, padding: 8, borderRadius: 18, background: "rgba(40,37,52,0.6)", backdropFilter: "blur(44px) saturate(1.6)", WebkitBackdropFilter: "blur(44px) saturate(1.6)", border: "1px solid rgba(245,241,234,0.14)", boxShadow: "0 18px 44px -26px rgba(0,0,0,0.45)" }}>
                  {INDUSTRY_SIBLINGS.map((s) => {
                    const active = s.slug === data.slug;
                    return (
                      <a key={s.slug} href={`/industries/${s.slug}`} className={active ? "" : "rb-mega-item"} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 14px", borderRadius: 11, textDecoration: "none", fontSize: 14, background: active ? "rgba(139,125,216,0.16)" : "transparent", color: active ? "#F5F1EA" : "rgba(245,241,234,0.82)", fontWeight: active ? 600 : 400 }}>
                        <span>{s.name}</span>{active ? <span style={{ color: "#B8AEDB", fontSize: 13 }}>✓</span> : null}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            <p style={{ fontSize: 12, letterSpacing: ".28em", textTransform: "uppercase", color: A, margin: "0 0 18px" }}>{data.hero.eyebrow}</p>
            <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(38px,4.5vw,64px)", lineHeight: 1.04, letterSpacing: "-0.015em", margin: 0, maxWidth: "20ch", color: "#17131F" }}>{data.hero.headlinePre}<em style={{ fontStyle: "italic", color: "#6B5CC4" }}>{data.hero.headlineEm}</em></h1>
            <p style={{ marginTop: 26, maxWidth: 560, fontSize: "clamp(16px,1.3vw,18px)", lineHeight: 1.62, color: "rgba(23,19,31,0.66)" }}>{data.hero.subhead}</p>
            <div style={{ marginTop: 36 }}><BookDemoCTA label="Get started" href="/pricing" tone="light" /></div>
          </div>
          <div style={{ position: "relative" }}>{roleMock(data.accent, data.name.split(" ")[0])}</div>
        </div>
      </section>

      {/* ===================== EVERY DEPLOYMENT INCLUDES + SEVEN ROLES ===================== */}
      <section className="rb-ind-pad" style={{ position: "relative", background: "#F3EBE1", color: "#17131F", padding: "132px 48px 60px" }}>
        <div data-reveal style={{ maxWidth: 1180, margin: "0 auto 96px", textAlign: "center" }}>
          <div style={{ fontSize: 12, letterSpacing: ".3em", textTransform: "uppercase", color: A, marginBottom: 18 }}>Every deployment includes</div>
          <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(34px,4vw,54px)", lineHeight: 1.03, letterSpacing: "-0.02em", margin: "0 auto", maxWidth: "16ch" }}>{data.deploy.h2Pre}<em style={{ fontStyle: "italic", color: "#6B5CC4" }}>{data.deploy.h2Em}</em></h2>
          <p style={{ margin: "22px auto 0", maxWidth: "60ch", fontSize: 16, lineHeight: 1.62, color: "rgba(23,19,31,0.66)" }}>{data.deploy.body}</p>
          <p style={{ margin: "14px auto 0", maxWidth: "62ch", fontSize: 14.5, lineHeight: 1.6, color: "rgba(23,19,31,0.5)" }}>{data.deploy.bodyQuiet}</p>
        </div>

        <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", flexDirection: "column", gap: 108 }}>
          {data.roles.map((b: IndustryRole, i) => {
            const textFirst = i % 2 === 0;
            const text = (
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 12, letterSpacing: ".24em", textTransform: "uppercase", color: A, marginBottom: 18 }}><span style={{ width: 22, height: 1, background: A }} />{b.num} — Role</div>
                <h3 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(26px,3vw,40px)", lineHeight: 1.05, letterSpacing: "-0.015em", margin: "0 0 18px" }}>{b.label}</h3>
                <p style={{ fontSize: 16, lineHeight: 1.62, color: "rgba(23,19,31,0.66)", maxWidth: "48ch", margin: "0 0 28px" }}>{b.body}</p>
                <BookDemoCTA label={deepCtas[i % deepCtas.length].label} href={deepCtas[i % deepCtas.length].href} tone="light" />
              </div>
            );
            const graphic = <div className="rb-ind-deep-graphic">{roleMock(data.accent, b.label.split(/[ &]/)[0])}</div>;
            return (
              <div key={b.num} data-reveal className="rb-ind-deep-grid" style={{ display: "grid", gridTemplateColumns: textFirst ? "0.92fr 1.08fr" : "1.08fr 0.92fr", gap: 64, alignItems: "center" }}>
                {textFirst ? <>{text}{graphic}</> : <>{graphic}{text}</>}
              </div>
            );
          })}
        </div>

        <div style={{ maxWidth: 1180, margin: "70px auto 0", textAlign: "center" }}>
          {data.deploy.after.map((t, i) => (
            <p key={i} style={{ margin: i ? "8px 0 0" : 0, fontSize: 14, color: i ? "rgba(23,19,31,0.5)" : "rgba(23,19,31,0.72)", fontWeight: i ? 400 : 600 }}>{t}</p>
          ))}
        </div>
      </section>

      {/* ===================== FAQ ===================== */}
      <section className="rb-ind-pad" style={{ position: "relative", overflow: "hidden", background: "#080609", padding: "132px 48px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ fontSize: 12, letterSpacing: ".28em", textTransform: "uppercase", color: "#B8AEDB", marginBottom: 18 }}>FAQs</div>
          <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(34px,4.4vw,58px)", lineHeight: 1.02, letterSpacing: "-0.015em", margin: "0 0 40px", color: "#F5F1EA" }}>The questions we get on <em style={{ fontStyle: "italic", color: "#C7BEE8" }}>every demo call.</em></h2>
          <div>{data.faqs.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}</div>
        </div>
      </section>

      {/* ===================== RELATED ===================== */}
      {data.related && data.related.length > 0 && (
        <section className="rb-ind-pad" style={{ background: "#F6F3FB", color: "#17131F", padding: "110px 48px" }}>
          <div style={{ maxWidth: 1180, margin: "0 auto" }}>
            <div style={{ fontSize: 12, letterSpacing: ".28em", textTransform: "uppercase", color: A, marginBottom: 26 }}>Also in this space</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
              {data.related.map((r) => (
                <a key={r.href} href={r.href} style={{ display: "block", background: "#fff", border: "1px solid rgba(23,19,31,0.08)", borderRadius: 18, padding: "26px 28px", textDecoration: "none", boxShadow: "0 20px 50px -40px rgba(23,19,31,0.4)" }}>
                  <div style={{ fontFamily: SERIF, fontSize: 24, color: "#17131F", marginBottom: 10 }}>{r.title} <span style={{ color: A }}>→</span></div>
                  <div style={{ fontSize: 14.5, lineHeight: 1.55, color: "rgba(23,19,31,0.6)" }}>{r.desc}</div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===================== CLOSE ===================== */}
      <section id="pricing" className="rb-ind-pad" style={{ position: "relative", overflow: "hidden", background: "#F4EAE7", color: "#17131F", padding: "140px 48px", textAlign: "center" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(70% 60% at 50% 118%, rgba(139,125,216,0.22) 0%, transparent 60%)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto" }}>
          <div style={{ fontSize: 12, letterSpacing: ".32em", textTransform: "uppercase", color: A, marginBottom: 22 }}>The offer</div>
          <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(38px,4.8vw,64px)", lineHeight: 1.03, letterSpacing: "-0.015em", margin: 0 }}>{data.close.heading}</h2>
          <p style={{ margin: "24px auto 0", maxWidth: 600, fontSize: 17, lineHeight: 1.62, color: "rgba(23,19,31,0.66)" }}>{data.close.subhead}</p>
          <div style={{ marginTop: 36, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 16 }}>
            <BookDemoCTA label="See pricing & choose your plan" href="/pricing" tone="light" />
            <a href="https://cal.eu/rosebudsolutions/demo" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "15px 26px", borderRadius: 999, border: "1px solid rgba(23,19,31,0.2)", color: "#17131F", fontSize: 15, fontWeight: 500, textDecoration: "none" }}>Book a consultation</a>
          </div>
        </div>
      </section>

      <RedesignReveal />
      <RedesignFooter />
    </div>
  );
}
