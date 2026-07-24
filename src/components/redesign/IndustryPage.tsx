"use client";
import { useState } from "react";
import RedesignNav from "./RedesignNav";
import RedesignFooter from "./RedesignFooter";
import RedesignReveal from "./RedesignReveal";
import BookDemoCTA from "./BookDemoCTA";
import { INDUSTRY_SIBLINGS, type IndustryData } from "./industryData";

const SERIF = "var(--font-cormorant), 'Cormorant Garamond', serif";
const A = "#8B7DD8";

// Per build-brief §1.11: every CTA on every industry page routes to /pricing.
const CTA = "/pricing";

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid rgba(245,241,234,0.12)" }}>
      <button type="button" onClick={() => setOpen((o) => !o)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 18, padding: "24px 4px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left", color: "#F5F1EA", fontFamily: SERIF, fontSize: "clamp(19px,2vw,24px)", lineHeight: 1.25 }}>
        <span>{q}</span>
        <span style={{ flex: "none", width: 30, height: 30, borderRadius: 999, border: "1px solid rgba(245,241,234,0.3)", display: "grid", placeItems: "center", fontSize: 18, color: "#B8AEDB", transform: open ? "rotate(45deg)" : "none", transition: "transform .3s ease" }}>+</span>
      </button>
      <div style={{ maxHeight: open ? 500 : 0, overflow: "hidden", transition: "max-height .4s ease" }}>
        <p style={{ margin: "0 0 26px", maxWidth: "72ch", fontSize: 15.5, lineHeight: 1.62, color: "rgba(245,241,234,0.66)" }}>{a}</p>
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
    offers: { "@type": "Offer", description: data.schema.offerDescription },
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

  return (
    <div style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#17131F", background: "#ECE7F7", overflowX: "clip" }}>
      <style dangerouslySetInnerHTML={{ __html: `@media(max-width:900px){.rb-ind-pad{padding-left:20px!important;padding-right:20px!important}}` }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <RedesignNav />

      {/* ===================== HERO — H1 + 40–60-word direct answer ===================== */}
      <section className="rb-ind-pad" style={{ position: "relative", overflow: "hidden", background: "#ECE7F7", padding: "168px 48px 96px" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 90% at 84% 0%, rgba(139,125,216,0.1) 0%, transparent 52%), radial-gradient(80% 70% at 0% 100%, rgba(232,129,74,0.06) 0%, transparent 55%)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto" }}>
          {/* "Rosebud for [industry]" switcher — the interlinked cluster */}
          <div style={{ position: "relative", display: "inline-block", marginBottom: 28 }}>
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
          <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(34px,4.4vw,58px)", lineHeight: 1.05, letterSpacing: "-0.015em", margin: 0, color: "#17131F" }}>{data.hero.h1}</h1>
          {/* The 40–60-word direct answer — highest-leverage extract on the page */}
          <p style={{ marginTop: 26, maxWidth: "62ch", fontSize: "clamp(16px,1.35vw,19px)", lineHeight: 1.62, color: "rgba(23,19,31,0.72)" }}>{data.hero.intro}</p>
          <div style={{ marginTop: 34 }}><BookDemoCTA label="See plans & pricing" href={CTA} tone="light" /></div>
        </div>
      </section>

      {/* ===================== QUESTION-SHAPED H2 SECTIONS (answer-first) ===================== */}
      <section className="rb-ind-pad" style={{ background: "#F6F3FB", padding: "40px 48px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          {data.sections.map((sec, i) => (
            <div key={i} data-reveal style={{ padding: "48px 0", borderBottom: i < data.sections.length - 1 ? "1px solid rgba(23,19,31,0.08)" : "none" }}>
              <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(24px,2.8vw,36px)", lineHeight: 1.1, letterSpacing: "-0.015em", margin: "0 0 18px", color: "#17131F" }}>{sec.h2}</h2>
              <p style={{ fontSize: 16.5, lineHeight: 1.68, color: "rgba(23,19,31,0.72)", margin: 0, maxWidth: "68ch" }}>{sec.body}</p>
              {sec.bullets && sec.bullets.length > 0 && (
                <ul style={{ margin: "18px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                  {sec.bullets.map((b, j) => (
                    <li key={j} style={{ display: "flex", gap: 12, fontSize: 15.5, lineHeight: 1.55, color: "rgba(23,19,31,0.66)" }}>
                      <span aria-hidden="true" style={{ color: A, flex: "none", marginTop: 2 }}>—</span>{b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ===================== "WHAT STAYS WITH YOU" BOUNDARY BLOCK ===================== */}
      {data.boundary && (
        <section className="rb-ind-pad" style={{ background: "#F3EBE1", padding: "110px 48px" }}>
          <div data-reveal style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{ fontSize: 12, letterSpacing: ".28em", textTransform: "uppercase", color: A, marginBottom: 16 }}>{data.boundary.eyebrow}</div>
            <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(30px,3.6vw,48px)", lineHeight: 1.04, letterSpacing: "-0.015em", margin: "0 0 34px" }}>{data.boundary.heading}</h2>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: "14px 40px" }}>
              {data.boundary.items.map((it, i) => (
                <li key={i} style={{ display: "flex", gap: 12, fontSize: 16, lineHeight: 1.55, color: "rgba(23,19,31,0.72)", paddingBottom: 14, borderBottom: "1px solid rgba(23,19,31,0.08)" }}>
                  <span aria-hidden="true" style={{ color: "#6B5CC4", flex: "none", marginTop: 1 }}>✓</span>{it}
                </li>
              ))}
            </ul>
            {data.boundary.note && <p style={{ margin: "30px 0 0", maxWidth: "70ch", fontSize: 16, lineHeight: 1.62, color: "rgba(23,19,31,0.6)", fontStyle: "italic" }}>{data.boundary.note}</p>}
          </div>
        </section>
      )}

      {/* ===================== FAQ + FAQPage schema ===================== */}
      <section className="rb-ind-pad" style={{ background: "#080609", padding: "132px 48px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ fontSize: 12, letterSpacing: ".28em", textTransform: "uppercase", color: "#B8AEDB", marginBottom: 18 }}>FAQs</div>
          <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(34px,4.4vw,58px)", lineHeight: 1.02, letterSpacing: "-0.015em", margin: "0 0 40px", color: "#F5F1EA" }}>The questions we get on <em style={{ fontStyle: "italic", color: "#C7BEE8" }}>every demo call.</em></h2>
          <div>{data.faqs.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}</div>
        </div>
      </section>

      {/* ===================== RELATED ===================== */}
      {data.related && data.related.length > 0 && (
        <section className="rb-ind-pad" style={{ background: "#F6F3FB", padding: "110px 48px" }}>
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

      {/* ===================== CLOSE — CTA to /pricing (§1.11) ===================== */}
      <section id="pricing" className="rb-ind-pad" style={{ position: "relative", overflow: "hidden", background: "#F4EAE7", padding: "140px 48px", textAlign: "center" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(70% 60% at 50% 118%, rgba(139,125,216,0.22) 0%, transparent 60%)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto" }}>
          <div style={{ fontSize: 12, letterSpacing: ".32em", textTransform: "uppercase", color: A, marginBottom: 22 }}>The offer</div>
          <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(38px,4.8vw,64px)", lineHeight: 1.03, letterSpacing: "-0.015em", margin: 0 }}>{data.close.heading}</h2>
          <p style={{ margin: "24px auto 0", maxWidth: 600, fontSize: 17, lineHeight: 1.62, color: "rgba(23,19,31,0.66)" }}>{data.close.subhead}</p>
          <div style={{ marginTop: 36, display: "flex", justifyContent: "center" }}>
            <BookDemoCTA label="See plans & pricing" href={CTA} tone="light" />
          </div>
        </div>
      </section>

      <RedesignReveal />
      <RedesignFooter />
    </div>
  );
}
