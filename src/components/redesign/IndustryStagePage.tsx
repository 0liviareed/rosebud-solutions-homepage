"use client";
import { useState } from "react";
import RedesignNav from "./RedesignNav";
import RedesignFooter from "./RedesignFooter";
import RedesignReveal from "./RedesignReveal";
import { INDUSTRY_SIBLINGS } from "./industryData";
import { industryScene, sceneImg } from "./industryScenes";
import type { IndustryStageData, StageCardTone, StageScene, StageSplit } from "./industryStageData";

const SERIF = "var(--font-cormorant), 'Cormorant Garamond', serif";
const CTA = "/pricing"; // §1.11 — every industry-page CTA routes to /pricing

const CARD_TONE: Record<StageCardTone, { bg: string; fg: string }> = {
  indigo: { bg: "#eef1fb", fg: "#5877e8" },
  green: { bg: "#e5f3ec", fg: "#2f9e63" },
  amber: { bg: "#fbeee6", fg: "#c07a3f" },
  teal: { bg: "#e4f4f6", fg: "#3a9aa8" },
};

function PricingCTA() {
  return (
    <a href={CTA} style={{ display: "inline-flex", alignItems: "center", gap: 12, background: "#2c2f4a", color: "#fff", fontSize: 14, fontWeight: 600, padding: "14px 26px", borderRadius: 26, boxShadow: "0 14px 30px -14px rgba(44,47,74,.8)", textDecoration: "none" }}>
      See plans &amp; pricing <span style={{ fontSize: 16 }}>→</span>
    </a>
  );
}

function Scene({ slug, scene }: { slug: string; scene: StageScene }) {
  return scene.img ? sceneImg(slug, scene.img) : industryScene(scene.id);
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
      <button type="button" onClick={() => setOpen((o) => !o)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, padding: "20px 2px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left", color: "rgba(255,255,255,0.85)", fontFamily: SERIF, fontSize: "clamp(17px,1.7vw,20px)", lineHeight: 1.3 }}>
        <span>{q}</span>
        <span style={{ flex: "none", width: 28, height: 28, borderRadius: 999, border: "1px solid rgba(255,255,255,0.25)", display: "grid", placeItems: "center", fontSize: 14, color: "rgba(255,255,255,0.6)", transform: open ? "rotate(45deg)" : "none", transition: "transform .3s ease" }}>+</span>
      </button>
      <div style={{ maxHeight: open ? 520 : 0, overflow: "hidden", transition: "max-height .4s ease" }}>
        <p style={{ margin: "0 0 22px", maxWidth: "74ch", fontSize: 14.5, lineHeight: 1.66, color: "rgba(255,255,255,0.62)" }}>{a}</p>
      </div>
    </div>
  );
}

function StageEyebrow({ index, label }: { index: string; label: string }) {
  return (
    <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "2px", color: "#a7a1c0", textTransform: "uppercase" }}>
      {index} — {label}
    </span>
  );
}

function StageH2({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(26px,3.4vw,36px)", lineHeight: 1.12, letterSpacing: "-0.01em", color: "#22243c", margin: "14px 0 26px" }}>{children}</h2>;
}

function ItemList({ items }: { items: StageSplit["items"] }) {
  return (
    <div style={{ borderTop: "1px solid rgba(60,66,120,.14)" }}>
      {items.map((it) => (
        <div key={it.title} style={{ padding: "18px 2px", borderBottom: "1px solid rgba(60,66,120,.14)" }}>
          <div style={{ fontFamily: SERIF, fontSize: 20, color: "#22243c", marginBottom: 6 }}>{it.title}</div>
          <p style={{ fontSize: 14, lineHeight: 1.62, color: "#6b6e8a", margin: 0 }}>{it.body}</p>
        </div>
      ))}
    </div>
  );
}

export default function IndustryStagePage({ data }: { data: IndustryStageData }) {
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
    <div style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#2c2f4a", overflowX: "clip" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .rb-scene{container-type:inline-size;}
        .rb-ind-wrap{max-width:1080px;margin:0 auto;padding:0 40px;}
        .rb-split{display:grid;grid-template-columns:1fr 1.12fr;gap:56px;align-items:center;}
        .rb-split-rev{display:grid;grid-template-columns:1.12fr 1fr;gap:56px;align-items:center;}
        .rb-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;}
        .rb-bound{display:grid;grid-template-columns:1fr 1fr;gap:0 44px;}
        @media(max-width:900px){
          .rb-ind-wrap{padding:0 22px;}
          .rb-split,.rb-split-rev{grid-template-columns:1fr;gap:34px;}
          .rb-split-rev .rb-scene-cell{order:2;}
          .rb-cards{grid-template-columns:1fr;}
          .rb-bound{grid-template-columns:1fr;}
        }
      ` }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <RedesignNav />

      {/* ===================== HERO ===================== */}
      <section style={{ position: "relative", background: "radial-gradient(120% 90% at 78% 8%,#eeeafb 0%,#e6e2f4 45%,#dcd8ef 100%)", padding: "150px 0 84px" }}>
        <div className="rb-ind-wrap">
          {/* "Rosebud for [industry]" switcher — the interlinked cluster */}
          <div style={{ position: "relative", display: "inline-block", marginBottom: 24 }}>
            <button type="button" onClick={() => setSwitchOpen((s) => !s)} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", padding: "6px 6px 6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 500, color: "#585b78", boxShadow: "0 4px 14px -8px rgba(60,66,120,.5)", border: "none", cursor: "pointer" }}>
              Rosebud for
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#eceafa", color: "#3a3d5c", fontWeight: 600, padding: "3px 10px", borderRadius: 14 }}>
                {data.name}
                <span style={{ fontSize: 9, transition: "transform .3s ease", transform: switchOpen ? "rotate(180deg)" : "none" }}>▾</span>
              </span>
            </button>
            {switchOpen && (
              <div style={{ position: "absolute", top: 44, left: 0, zIndex: 40, width: 320, padding: 8, borderRadius: 16, background: "rgba(40,37,52,0.72)", backdropFilter: "blur(40px) saturate(1.6)", WebkitBackdropFilter: "blur(40px) saturate(1.6)", border: "1px solid rgba(245,241,234,0.14)", boxShadow: "0 18px 44px -26px rgba(0,0,0,0.45)" }}>
                {INDUSTRY_SIBLINGS.map((s) => {
                  const active = s.slug === data.slug;
                  return (
                    <a key={s.slug} href={`/industries/${s.slug}`} className={active ? "" : "rb-mega-item"} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 14px", borderRadius: 11, textDecoration: "none", fontSize: 14, background: active ? "rgba(88,119,232,0.22)" : "transparent", color: active ? "#F5F1EA" : "rgba(245,241,234,0.82)", fontWeight: active ? 600 : 400 }}>
                      <span>{s.name}</span>{active ? <span style={{ color: "#a9baf5", fontSize: 13 }}>✓</span> : null}
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(34px,4.6vw,52px)", lineHeight: 1.07, letterSpacing: "-0.01em", color: "#22243c", margin: "0 0 20px", maxWidth: 680 }}>{data.hero.h1}</h1>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: "#6b6e8a", maxWidth: 540, margin: "0 0 30px" }}>{data.hero.intro}</p>
          <PricingCTA />
        </div>
      </section>

      {/* ===================== STAGE 01 (split · scene right) ===================== */}
      <section style={{ background: "linear-gradient(180deg,#e6e2f4,#eef0f9)", padding: "84px 0 70px" }}>
        <div className="rb-ind-wrap rb-split">
          <div data-reveal>
            <StageEyebrow index={data.stage1.index} label={data.stage1.eyebrow} />
            <StageH2>{data.stage1.h2}</StageH2>
            <ItemList items={data.stage1.items} />
          </div>
          <div className="rb-scene-cell" data-reveal><Scene slug={data.slug} scene={data.stage1.scene} /></div>
        </div>
      </section>

      {/* ===================== STAGE 02 (cards) ===================== */}
      <section style={{ background: "linear-gradient(180deg,#eef0f9,#f4f1ea)", padding: "70px 0 30px" }}>
        <div className="rb-ind-wrap">
          <div data-reveal>
            <StageEyebrow index={data.stage2.index} label={data.stage2.eyebrow} />
            <StageH2>{data.stage2.h2}</StageH2>
          </div>
          <div className="rb-cards">
            {data.stage2.cards.map((c) => {
              const t = CARD_TONE[c.tone];
              return (
                <div key={c.h3} data-reveal style={{ background: "#fff", borderRadius: 18, padding: "26px 24px 28px", boxShadow: "0 20px 40px -26px rgba(60,66,120,.5)" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: t.bg, color: t.fg, fontSize: 11, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", padding: "5px 12px", borderRadius: 14 }}>{c.tag}</span>
                  <h3 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 20, color: "#26283f", margin: "16px 0 10px" }}>{c.h3}</h3>
                  <p style={{ fontSize: 13, lineHeight: 1.65, color: "#787b95", margin: 0 }}>{c.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== PULL STAT ===================== */}
      <section style={{ background: "#f4f1ea", padding: "64px 0" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 clamp(22px,5vw,40px)", textAlign: "center" }}>
          <div style={{ height: 1, background: "rgba(60,66,120,.16)", marginBottom: 44 }} />
          <p style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(26px,3.4vw,34px)", lineHeight: 1.3, color: "#22243c", margin: 0 }}>{data.pullStat.pre}<em style={{ fontStyle: "italic", color: "#5877e8" }}>{data.pullStat.accent}</em></p>
          <div style={{ height: 1, background: "rgba(60,66,120,.16)", marginTop: 44 }} />
        </div>
      </section>

      {/* ===================== STAGE 03 (split · scene left) ===================== */}
      <section style={{ background: "#f4f1ea", padding: "30px 0 90px" }}>
        <div className="rb-ind-wrap rb-split-rev">
          <div className="rb-scene-cell" data-reveal><Scene slug={data.slug} scene={data.stage3.scene} /></div>
          <div data-reveal>
            <StageEyebrow index={data.stage3.index} label={data.stage3.eyebrow} />
            <StageH2>{data.stage3.h2}</StageH2>
            <ItemList items={data.stage3.items} />
          </div>
        </div>
      </section>

      {/* ===================== WHAT STAYS WITH YOU (optional) ===================== */}
      {data.boundary && (
        <section style={{ background: "#ece7de", padding: "84px 0 90px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 clamp(22px,5vw,40px)" }} data-reveal>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "2px", color: "#a7a1c0", textTransform: "uppercase" }}>{data.boundary.eyebrow}</span>
            <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(28px,3.4vw,34px)", color: "#22243c", margin: "14px 0 32px" }}>{data.boundary.heading}</h2>
            <div className="rb-bound" style={{ borderTop: "1px solid rgba(60,66,120,.16)" }}>
              {data.boundary.items.map((it) => (
                <div key={it.label} style={{ display: "flex", gap: 12, padding: "16px 2px", borderBottom: "1px solid rgba(60,66,120,.16)", fontSize: 13.5, lineHeight: 1.6, color: "#4a4d68" }}>
                  <span style={{ color: "#2f9e63", fontWeight: 700 }}>✓</span>
                  <span><strong style={{ color: "#22243c" }}>{it.label}</strong> — {it.body}</span>
                </div>
              ))}
            </div>
            {data.boundary.note && <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 15, lineHeight: 1.7, color: "#6b6e8a", margin: "26px 0 0", maxWidth: 640 }}>{data.boundary.note}</p>}
          </div>
        </section>
      )}

      {/* ===================== FAQ + FAQPage schema ===================== */}
      <section style={{ position: "relative", background: "#0a0a0d", padding: "84px 0 90px", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(80% 60% at 90% 20%,rgba(120,110,180,.14),transparent 60%),radial-gradient(60% 50% at 5% 90%,rgba(90,110,200,.1),transparent 60%)" }} />
        <div style={{ position: "relative", maxWidth: 900, margin: "0 auto", padding: "0 clamp(22px,5vw,40px)" }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "2.5px", color: "rgba(255,255,255,.4)", textTransform: "uppercase" }}>FAQs</span>
          <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(30px,4vw,38px)", color: "#fff", margin: "16px 0 34px" }}>The questions we get on <em style={{ fontStyle: "italic", color: "#c9c3e8" }}>every demo call.</em></h2>
          <div>{data.faqs.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}</div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }} />
        </div>
      </section>

      {/* ===================== ALSO IN THIS SPACE ===================== */}
      <section style={{ background: "#eef0f9", padding: "70px 0" }}>
        <div className="rb-ind-wrap">
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "2px", color: "#a7a1c0", textTransform: "uppercase" }}>Also in this space</span>
          <div className="rb-cards" style={{ marginTop: 24 }}>
            {data.related.map((r) => (
              <a key={r.href} href={r.href} style={{ background: "#fff", borderRadius: 18, padding: "24px 24px 26px", boxShadow: "0 16px 34px -22px rgba(60,66,120,.5)", color: "inherit", textDecoration: "none" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: SERIF, fontSize: 20, color: "#22243c" }}>{r.title} <span style={{ color: "#a7a1c0", fontSize: 15 }}>→</span></div>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: "#787b95", margin: "10px 0 0" }}>{r.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== OFFER CTA ===================== */}
      <section id="pricing" style={{ background: "#ece7de", padding: "90px 0 100px", textAlign: "center" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 clamp(22px,5vw,40px)" }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "2.5px", color: "#a7a1c0", textTransform: "uppercase" }}>The offer</span>
          <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(32px,4.4vw,42px)", lineHeight: 1.12, color: "#22243c", margin: "18px 0 18px" }}>{data.close.heading}</h2>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: "#6b6e8a", maxWidth: 480, margin: "0 auto 34px" }}>{data.close.subhead}</p>
          <PricingCTA />
        </div>
      </section>

      <RedesignReveal />
      <RedesignFooter />
    </div>
  );
}
