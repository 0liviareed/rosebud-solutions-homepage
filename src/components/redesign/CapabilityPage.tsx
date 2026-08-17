"use client";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import BookDemoCTA from "./BookDemoCTA";
import RedesignMobileMenu from "./RedesignMobileMenu";
import { bespokeHero, bespokeDeep, bespokePanel, capImg } from "./capabilityMocks";
import RedesignFooter from "./RedesignFooter";
import RedesignReveal from "./RedesignReveal";
import {
  type CapabilityData,
  type DeepBlock,
  DEEP_CTAS,
  SIBLINGS, SIBLING_SUBLABEL, LIVE_SLUGS,
  NAV_CAPABILITIES, NAV_RESOURCES, INT_LOGOS, CAP_FAQS,
} from "./capabilityData";
import { INDUSTRY_LINKS } from "./industryData";

const SERIF = "var(--font-cormorant), 'Cormorant Garamond', serif";

function CapFaqItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div style={{ borderTop: "1px solid rgba(245,241,234,0.12)" }}>
      <button type="button" onClick={onToggle} aria-expanded={open} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, padding: "26px 0", background: "transparent", border: "none", cursor: "pointer", textAlign: "left", color: "#F5F1EA", fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(19px,2vw,24px)", lineHeight: 1.25 }}>
        <span>{q}</span>
        <span aria-hidden style={{ flex: "none", width: 30, height: 30, borderRadius: 999, border: "1px solid rgba(245,241,234,0.25)", display: "grid", placeItems: "center", fontSize: 15, color: "rgba(245,241,234,0.6)", transform: open ? "rotate(45deg)" : "none", transition: "transform .3s ease" }}>+</span>
      </button>
      <div style={{ maxHeight: open ? 320 : 0, overflow: "hidden", transition: "max-height .4s ease" }}>
        <p style={{ margin: "0 0 26px", maxWidth: "74ch", fontSize: 15.5, lineHeight: 1.64, color: "rgba(245,241,234,0.66)" }}>{a}</p>
      </div>
    </div>
  );
}
const A = "#8B7DD8";

const CSS = `
.rb-cq { container-type: inline-size; }
@keyframes rbMarquee { from{ transform:translateX(0);} to{ transform:translateX(-50%);} }
@keyframes rbMarqueeR { from{ transform:translateX(-50%);} to{ transform:translateX(0);} }
.rb-cap-navlinks a:hover { color: var(--nav-fg-strong); }
.rb-mega-item { transition: background .25s ease; }
.rb-mega-item:hover { background: rgba(245,241,234,0.07); }
@media (max-width: 900px){
  .rb-cap-hero-grid, .rb-cap-deep-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
  .rb-cap-deep-graphic { order: 2; }
  .rb-cap-works-panels { grid-template-columns: 1fr !important; }
  .rb-cap-pad { padding-left: 20px !important; padding-right: 20px !important; }
  /* disable the scroll "frame-out" boxes below the desktop grid → plain stacked sections (no 100vh gaps) */
  .rb-caphero-wrap { height: auto !important; }
  .rb-caphero-pin { position: relative !important; overflow: visible !important; transform: none !important; border-radius: 0 !important; }
  .rb-caphero-sec { min-height: 0 !important; display: block !important; }
  .rb-capclose-sec { height: auto !important; }
  .rb-capclose-pin { position: relative !important; height: auto !important; overflow: visible !important; }
  .rb-capclose-stage { position: relative !important; inset: auto !important; transform: none !important; box-shadow: none !important; border-radius: 0 !important; padding: 64px 18px 84px !important; }
}
@media (max-width: 860px){
  .rb-cap-navlinks { display: none !important; } /* replaced by the global hamburger */
  /* nav flush to the top of the browser, full-width (no floating pill) — matches the live site */
  .rb-cap-nav { padding: 0 !important; }
  .rb-cap-navbar { max-width: none !important; border-radius: 0 !important; padding: 14px 18px !important; }
}
`;

export default function CapabilityPage({ data }: { data: CapabilityData }) {
  const navBar = useRef<HTMLDivElement>(null);
  const [openMenu, setOpenMenu] = useState<null | "product" | "connections" | "resources">(null);
  const [siblingOpen, setSiblingOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const menuTimer = useRef<number | null>(null);
  const [menuAnchor, setMenuAnchor] = useState(0); // hovered trigger's left edge (viewport px)
  const heroWrap = useRef<HTMLDivElement>(null);
  const heroPin = useRef<HTMLDivElement>(null);
  const closeWrap = useRef<HTMLElement>(null);
  const closeStage = useRef<HTMLDivElement>(null);

  const openNow = (m: "product" | "connections" | "resources", el?: HTMLElement) => { if (menuTimer.current) clearTimeout(menuTimer.current); if (el) { const r = el.getBoundingClientRect(); setMenuAnchor(r.left + r.width / 2); } setOpenMenu(m); };
  const panelLeft = (w: number) => { const vw = typeof window !== "undefined" ? window.innerWidth : 1440; const half = Math.min(w, vw - 40) / 2; return Math.max(16 + half, Math.min(menuAnchor, vw - 16 - half)); };
  const cancelClose = () => { if (menuTimer.current) clearTimeout(menuTimer.current); };
  const scheduleClose = () => { if (menuTimer.current) clearTimeout(menuTimer.current); menuTimer.current = window.setTimeout(() => setOpenMenu(null), 140); };

  // Nav solidifies (light → dark glass) once scrolled off the hero top.
  useEffect(() => {
    const onScroll = () => {
      const bar = navBar.current;
      if (!bar) return;
      // Transparent through the whole hero; glass-morph only once past it.
      const heroWrapEl = document.querySelector<HTMLElement>(".rb-caphero-wrap");
      const solid = heroWrapEl ? heroWrapEl.getBoundingClientRect().bottom <= 8 : window.scrollY > window.innerHeight * 0.7;
      bar.style.background = solid ? "rgba(8,7,11,0.12)" : "transparent";
      bar.style.backdropFilter = solid ? "blur(30px) saturate(1.4)" : "none";
      bar.style.setProperty("-webkit-backdrop-filter", solid ? "blur(30px) saturate(1.4)" : "none");
      bar.style.borderColor = solid ? "rgba(245,241,234,0.1)" : "transparent";
      bar.style.boxShadow = solid ? "0 16px 40px -34px rgba(0,0,0,0.3)" : "none";
      bar.style.maxWidth = solid ? "980px" : "1180px";
      // Text adapts to the section behind the nav so it stays readable over both the
      // light sections and the dark ones (voices/deep-dive). Visual is unchanged.
      let fg = "rgba(23,19,31,0.72)", fgs = "#17131F";
      if (solid) {
        const y = bar.getBoundingClientRect().bottom + 6;
        const prevPE = bar.style.pointerEvents;
        bar.style.pointerEvents = "none";
        let el: Element | null = document.elementFromPoint(Math.round(window.innerWidth / 2), Math.round(y));
        bar.style.pointerEvents = prevPE;
        let lum = 240;
        for (let hop = 0; el && hop < 8; hop++, el = el.parentElement) {
          const cs = getComputedStyle(el);
          const gi = cs.backgroundImage;
          if (gi && gi.indexOf("gradient") >= 0) { const gm = gi.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/); if (gm) { lum = 0.299 * +gm[1] + 0.587 * +gm[2] + 0.114 * +gm[3]; break; } }
          const bm = cs.backgroundColor.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?/);
          if (bm && (bm[4] === undefined || parseFloat(bm[4]) > 0.5)) { lum = 0.299 * +bm[1] + 0.587 * +bm[2] + 0.114 * +bm[3]; break; }
        }
        if (lum < 145) { fg = "rgba(245,241,234,0.85)"; fgs = "#F5F1EA"; }
      }
      bar.style.setProperty("--nav-fg", fg);
      bar.style.setProperty("--nav-fg-strong", fgs);
      bar.style.setProperty("--nav-pill-bg", solid ? "rgba(245,241,234,0.1)" : "rgba(23,19,31,0.06)");
      bar.style.setProperty("--nav-pill-border", solid ? "rgba(245,241,234,0.28)" : "rgba(23,19,31,0.18)");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  // Scroll "frame-out" boxes — the hero and the close each scale down + round
  // (and the close casts a growing shadow) as you scroll through, mirroring the
  // homepage hero + pre-footer close.
  useEffect(() => {
    const cl = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
    let ticking = false;
    const compute = () => {
      ticking = false;
      const mobile = window.matchMedia("(max-width: 900px)").matches;
      const vh = window.innerHeight;
      const hw = heroWrap.current, hp = heroPin.current;
      if (hw && hp) {
        if (mobile) { hp.style.transform = ""; hp.style.borderRadius = ""; }
        else {
          const r = hw.getBoundingClientRect();
          const total = Math.max(1, hw.offsetHeight - vh);
          const t = cl((cl(-r.top / total, 0, 1) - 0.82) / 0.18, 0, 1); // frame out in the last ~18%
          hp.style.transform = `scale(${1 - 0.13 * t})`;
          hp.style.borderRadius = `${t * 28}px`;
        }
      }
      const cw = closeWrap.current, cs = closeStage.current;
      if (cw && cs) {
        if (mobile) { cs.style.transform = ""; cs.style.borderRadius = ""; cs.style.boxShadow = ""; }
        else {
          const r = cw.getBoundingClientRect();
          if (!(r.bottom < 0 || r.top > vh)) {
            const total = Math.max(1, cw.offsetHeight - vh);
            const ct = cl((cl(-r.top / total, 0, 1) - 0.4) / 0.55, 0, 1);
            cs.style.transform = `scale(${1 - 0.14 * ct})`;
            cs.style.borderRadius = `${ct * 30}px`;
            cs.style.boxShadow = `0 ${40 + ct * 50}px ${120 + ct * 90}px -40px rgba(0,0,0,0.7), 0 0 ${ct * 80}px ${ct * 34}px rgba(0,0,0,0.5)`;
          }
        }
      }
    };
    const onScroll = () => { if (ticking) return; ticking = true; requestAnimationFrame(compute); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    compute();
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  const capHref = (slug: string) => (LIVE_SLUGS.has(slug) ? `/capabilities/${slug}` : "#");
  const navLink: CSSProperties = { display: "flex", alignItems: "center", gap: 7, color: "var(--nav-fg)", transition: "color .25s ease" };
  const panelBox: CSSProperties = { display: "flex", flexDirection: "column", borderRadius: 20, overflow: "hidden", background: "#fff", border: "1px solid rgba(23,19,31,0.08)", boxShadow: "0 24px 60px -40px rgba(23,19,31,0.35)" };
  const glassPanel: CSSProperties = { position: "absolute", padding: 12, borderRadius: 20, background: "rgba(40,37,52,0.42)", backdropFilter: "blur(44px) saturate(1.5)", WebkitBackdropFilter: "blur(44px) saturate(1.5)", border: "1px solid rgba(245,241,234,0.12)", boxShadow: "0 18px 44px -26px rgba(0,0,0,0.4)" };

  const logosA = INT_LOGOS.slice(0, Math.ceil(INT_LOGOS.length / 2));
  const logosB = INT_LOGOS.slice(Math.ceil(INT_LOGOS.length / 2));

  const faqs = CAP_FAQS[data.slug] ?? [];
  const serviceSchema = {
    "@context": "https://schema.org", "@type": "Service", name: `Rosebud ${data.name}`, serviceType: data.name,
    provider: { "@type": "Organization", name: "Rosebud Global Ltd" },
    areaServed: { "@type": "Country", name: "United States" },
    description: data.hero.subhead,
  };
  const faqSchema = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://rosebud.global/" },
      { "@type": "ListItem", position: 2, name: data.name, item: `https://rosebud.global/capabilities/${data.slug}` },
    ],
  };

  return (
    <div style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#F5F1EA", background: "#ECE7F7", overflowX: "clip" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      {faqs.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* ===================== NAV ===================== */}
      <nav className="rb-cap-nav" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "16px clamp(16px,3vw,40px)", transition: "padding .4s ease" }}>
        <div ref={navBar} className="rb-cap-navbar" style={{ maxWidth: 1180, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px 12px 22px", borderRadius: 999, background: "transparent", border: "1px solid transparent", transition: "background .45s ease, border-color .45s ease, box-shadow .45s ease, max-width .45s ease, padding .45s ease", ["--nav-fg" as string]: "rgba(23,19,31,0.72)", ["--nav-fg-strong" as string]: "#17131F", ["--nav-pill-bg" as string]: "rgba(23,19,31,0.06)", ["--nav-pill-border" as string]: "rgba(23,19,31,0.18)" } as CSSProperties}>
          <a href="/" aria-label="Rosebud Solutions" style={{ display: "flex", alignItems: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/rosebud-logo.png" alt="Rosebud Solutions" width={36} height={36} style={{ display: "block", width: 36, height: 36 }} />
          </a>
          <div className="rb-cap-navlinks" style={{ display: "flex", alignItems: "center", gap: 34, fontSize: 13, letterSpacing: ".14em", textTransform: "uppercase" }}>
            <a className="rb-cap-navdrop" href={capHref("capture")} onMouseEnter={(e) => openNow("product", e.currentTarget)} onMouseLeave={scheduleClose} style={navLink}>Product<span style={{ fontSize: 8, opacity: 0.7 }}>▼</span></a>
            <a className="rb-cap-navdrop" href="/integrations" onMouseEnter={(e) => openNow("connections", e.currentTarget)} onMouseLeave={scheduleClose} style={navLink}>Connections<span style={{ fontSize: 8, opacity: 0.7 }}>▼</span></a>
            <a className="rb-cap-navdrop" href="/about" onMouseEnter={(e) => openNow("resources", e.currentTarget)} onMouseLeave={scheduleClose} style={navLink}>Resources<span style={{ fontSize: 8, opacity: 0.7 }}>▼</span></a>
            <a href="/pricing" style={{ padding: "9px 20px", borderRadius: 999, background: "var(--nav-pill-bg)", backdropFilter: "blur(20px) saturate(1.3)", WebkitBackdropFilter: "blur(20px) saturate(1.3)", border: "1px solid var(--nav-pill-border)", color: "var(--nav-fg-strong)", fontWeight: 600, letterSpacing: ".1em" }}>Get started</a>
          </div>
          <RedesignMobileMenu />
        </div>

        {/* Product mega-panel */}
        {openMenu === "product" && (
          <div onMouseEnter={cancelClose} onMouseLeave={scheduleClose} style={{ ...glassPanel, top: 80, left: panelLeft(940), transform: "translateX(-50%)", width: "min(940px,calc(100vw - 40px))", padding: "26px 28px 28px", borderRadius: 22, display: "flex", gap: 28 }}>
            <div style={{ flex: 1.7, minWidth: 0 }}>
              <div style={{ fontSize: 11, letterSpacing: ".28em", textTransform: "uppercase", color: "rgba(245,241,234,0.55)", marginBottom: 14 }}>Capabilities</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 22px" }}>
                {NAV_CAPABILITIES.map((c) => (
                  <a key={c.head} href={capHref(c.slug)} className="rb-mega-item" onClick={() => setOpenMenu(null)} style={{ display: "flex", flexDirection: "column", gap: 3, padding: 12, borderRadius: 10, borderBottom: "1px solid rgba(245,241,234,0.1)", textDecoration: "none" }}>
                    <span style={{ fontSize: 15, fontWeight: 600, color: "#F5F1EA" }}>{c.head}</span>
                    <span style={{ fontSize: 12.5, color: "rgba(245,241,234,0.72)" }}>{c.desc}</span>
                  </a>
                ))}
              </div>
            </div>
            <a href="/pricing" onClick={() => setOpenMenu(null)} className="rb-mega-item" style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", borderRadius: 16, overflow: "hidden", textDecoration: "none", background: "rgba(245,241,234,0.05)", border: "1px solid rgba(245,241,234,0.1)" }}>
              <div style={{ height: 150, background: "url(/assets/nav-featured.avif) center center / cover no-repeat" }} />
              <div style={{ padding: "16px 18px 18px", display: "flex", flexDirection: "column", gap: 10 }}>
                <span style={{ fontSize: 10.5, letterSpacing: ".24em", textTransform: "uppercase", color: "rgba(245,241,234,0.5)" }}>Ready to get started?</span>
                <span style={{ fontFamily: SERIF, fontSize: 22, lineHeight: 1.2, color: "#F5F1EA" }}>Turn the demand you already pay for into paying customers</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 7, marginTop: 4, fontSize: 12.5, color: "#B8AEDB" }}>See pricing <span style={{ fontSize: 14 }}>→</span></span>
              </div>
            </a>
          </div>
        )}
        {openMenu === "connections" && (
          <div onMouseEnter={cancelClose} onMouseLeave={scheduleClose} style={{ ...glassPanel, top: 80, left: panelLeft(320), transform: "translateX(-50%)", width: "min(320px,calc(100vw - 40px))", borderRadius: 20 }}>
            <a href="/integrations" className="rb-mega-item" onClick={() => setOpenMenu(null)} style={{ display: "flex", flexDirection: "column", gap: 3, padding: "13px 14px", borderRadius: 13, textDecoration: "none" }}>
              <span style={{ fontSize: 15, fontWeight: 600, color: "#F5F1EA" }}>Integrations</span>
              <span style={{ fontSize: 12.5, color: "rgba(245,241,234,0.72)" }}>Connect to your tools effortlessly</span>
            </a>
          </div>
        )}
        {openMenu === "resources" && (
          <div onMouseEnter={cancelClose} onMouseLeave={scheduleClose} style={{ ...glassPanel, top: 80, left: panelLeft(300), transform: "translateX(-50%)", width: "min(300px,calc(100vw - 40px))", borderRadius: 20 }}>
            {NAV_RESOURCES.map((r) => (
              <a key={r.head} href={r.href} className="rb-mega-item" onClick={() => setOpenMenu(null)} style={{ display: "flex", flexDirection: "column", gap: 3, padding: "12px 14px", borderRadius: 13, textDecoration: "none" }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: "#F5F1EA" }}>{r.head}</span>
                <span style={{ fontSize: 12.5, color: "rgba(245,241,234,0.72)" }}>{r.desc}</span>
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ===================== HERO (frames out into a box on scroll) ===================== */}
      <div ref={heroWrap} className="rb-caphero-wrap" style={{ position: "relative", height: "150vh", background: "#ECE7F7" }}>
      <div ref={heroPin} className="rb-caphero-pin" style={{ position: "sticky", top: 0, overflow: "hidden", background: "#ECE7F7", transformOrigin: "center center", willChange: "transform" }}>
      <section className="rb-cap-pad rb-caphero-sec" style={{ position: "relative", overflow: "hidden", background: "#ECE7F7", color: "#17131F", padding: "172px 48px 108px", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 90% at 84% 0%, rgba(139,125,216,0.1) 0%, transparent 52%), radial-gradient(80% 70% at 0% 100%, rgba(232,129,74,0.06) 0%, transparent 55%)" }} />
        <div className="rb-cap-hero-grid" style={{ position: "relative", zIndex: 1, maxWidth: 1220, margin: "0 auto", display: "grid", gridTemplateColumns: "1.02fr 0.98fr", gap: 60, alignItems: "center" }}>
          <div>
            {/* sibling switcher */}
            <div style={{ position: "relative", display: "inline-block", marginBottom: 30 }}>
              <button type="button" onClick={() => setSiblingOpen((s) => !s)} style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "7px 8px 7px 18px", borderRadius: 999, background: "rgba(255,255,255,0.42)", backdropFilter: "blur(20px) saturate(1.5)", WebkitBackdropFilter: "blur(20px) saturate(1.5)", border: "1px solid rgba(255,255,255,0.6)", boxShadow: "0 10px 30px -16px rgba(23,19,31,0.35), inset 0 1px 0 rgba(255,255,255,0.6)", color: "#17131F", fontSize: 13, letterSpacing: ".04em", cursor: "pointer" }}>
                <span style={{ color: "rgba(23,19,31,0.5)" }}>Rosebud for</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 13px", borderRadius: 999, background: "#fff", boxShadow: "0 4px 12px -5px rgba(23,19,31,0.3)" }}>
                  <span style={{ fontWeight: 700, color: "#17131F", fontSize: 14 }}>{data.name}</span>
                  <span style={{ fontSize: 9, color: A, display: "inline-block", transition: "transform .3s ease", transform: siblingOpen ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
                </span>
              </button>
              {siblingOpen && (
                <div style={{ position: "absolute", top: 54, left: 0, zIndex: 40, width: 290, padding: 8, borderRadius: 18, background: "rgba(40,37,52,0.55)", backdropFilter: "blur(44px) saturate(1.6)", WebkitBackdropFilter: "blur(44px) saturate(1.6)", border: "1px solid rgba(245,241,234,0.14)", boxShadow: "0 18px 44px -26px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.12)" }}>
                  {SIBLINGS.map((s) => {
                    const active = s.slug === data.slug;
                    return (
                      <a key={s.slug} href={capHref(s.slug)} className={active ? "" : "rb-mega-item"} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 14px", borderRadius: 11, textDecoration: "none", fontSize: 14, background: active ? "rgba(139,125,216,0.16)" : "transparent", color: active ? "#F5F1EA" : "rgba(245,241,234,0.82)", fontWeight: active ? 600 : 400 }}>
                        <span>{s.name}</span>
                        {active ? <span style={{ color: "#B8AEDB", fontSize: 13 }}>✓</span> : null}
                      </a>
                    );
                  })}
                  <a href={capHref("closed-loop-attribution")} onClick={() => setSiblingOpen(false)} className={data.slug === "closed-loop-attribution" ? "" : "rb-mega-item"} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "6px 0 2px", padding: "11px 14px 8px", borderTop: "1px solid rgba(245,241,234,0.1)", borderRadius: 11, textDecoration: "none", color: data.slug === "closed-loop-attribution" ? "#F5F1EA" : "rgba(245,241,234,0.55)" }}>
                    <span style={{ fontSize: 10.5, letterSpacing: ".18em", textTransform: "uppercase", fontWeight: 700 }}>{SIBLING_SUBLABEL}</span>
                    {data.slug === "closed-loop-attribution" ? <span style={{ color: "#B8AEDB", fontSize: 13 }}>✓</span> : <span style={{ fontSize: 13, opacity: 0.55 }}>→</span>}
                  </a>
                </div>
              )}
            </div>

            <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(38px,4.5vw,66px)", lineHeight: 1.04, letterSpacing: "-0.015em", margin: 0, maxWidth: "18ch", color: "#17131F" }}>{data.hero.headlinePre}{data.hero.headlineEm ? <em style={{ fontStyle: "italic", color: "#6B5CC4" }}>{data.hero.headlineEm}</em> : null}</h1>
            <p style={{ marginTop: 26, maxWidth: 560, fontSize: "clamp(16px,1.3vw,18px)", lineHeight: 1.62, color: "rgba(23,19,31,0.66)" }}>{data.hero.subhead}</p>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 22, marginTop: 36 }}>
              <BookDemoCTA label="Get started" href="/pricing" tone="light" />
            </div>
          </div>

          {/* hero visual — Capture uses its supplied hero scene; others use the generic mock */}
          <div style={{ position: "relative" }}>
            {data.slug === "capture" ? capImg("capture", "hero-banner.png", "Screenshot of inquiries from web, WhatsApp, SMS, email and social arriving in one inbox as a single lead record.") : heroMock(data)}
          </div>
        </div>
      </section>
      </div>
      </div>

      {/* ===================== HOW IT WORKS ===================== */}
      <section className="rb-cap-pad" style={{ position: "relative", overflow: "hidden", background: "#ECE7F7", color: "#17131F", padding: "132px 48px" }}>
        <div data-reveal style={{ position: "relative", zIndex: 1, maxWidth: 1220, margin: "0 auto", background: "rgba(40,37,52,0.5)", backdropFilter: "blur(44px) saturate(1.5)", WebkitBackdropFilter: "blur(44px) saturate(1.5)", border: "1px solid rgba(245,241,234,0.12)", borderRadius: 28, padding: "clamp(34px,4.5vw,60px)", boxShadow: "0 44px 110px -44px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)" }}>
          <div style={{ maxWidth: 660 }}>
            <div style={{ fontSize: 12, letterSpacing: ".3em", textTransform: "uppercase", color: "#B8AEDB", marginBottom: 18 }}>How it works</div>
            <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(34px,4vw,56px)", lineHeight: 1.02, letterSpacing: "-0.02em", margin: 0, color: "#F5F1EA" }}>{data.works.headlinePre}{data.works.headlineEm ? <em style={{ fontStyle: "italic", color: "#C7BEE8" }}>{data.works.headlineEm}</em> : null}</h2>
          </div>
          <div className="rb-cap-works-panels" style={{ marginTop: 52, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {data.works.panels
              ? data.works.panels.map((src, i) => (
                  <div key={i} style={panelBox}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" style={{ display: "block", width: "100%", height: "auto" }} />
                  </div>
                ))
              : (data.works.panelsText ?? []).map((p, i) => {
                  const visual = bespokePanel(data.slug, i, data.accent);
                  if (visual) return (
                    <div key={i} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(245,241,234,0.1)", borderRadius: 20, padding: "30px 28px", minHeight: 230, display: "flex", flexDirection: "column", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}>
                      <div style={{ minHeight: 44, marginBottom: 24, display: "flex", alignItems: "center" }}>{visual}</div>
                      <div style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 500, color: "#F5F1EA", lineHeight: 1.15, marginBottom: 12 }}>{p.head}</div>
                      <div style={{ fontSize: 14.5, lineHeight: 1.6, color: "rgba(245,241,234,0.66)" }}>{p.body}</div>
                    </div>
                  );
                  return (
                    <div key={i} style={{ ...panelBox, padding: "30px 28px", minHeight: 230 }}>
                      <div style={{ width: 30, height: 30, borderRadius: 9, background: `${data.accent}1a`, color: data.accent, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: SERIF, fontWeight: 600, fontSize: 15, marginBottom: 16 }}>{i + 1}</div>
                      <div style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 500, color: "#17131F", lineHeight: 1.15, marginBottom: 12 }}>{p.head}</div>
                      <div style={{ fontSize: 14.5, lineHeight: 1.6, color: "rgba(23,19,31,0.62)" }}>{p.body}</div>
                    </div>
                  );
                })}
          </div>
        </div>
      </section>

      {/* ===================== INTEGRATIONS (light) ===================== */}
      <section style={{ position: "relative", overflow: "hidden", background: "#F6F3FB", color: "#17131F", padding: "132px 0" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(90% 70% at 50% -10%, rgba(139,125,216,0.08) 0%, transparent 55%)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div data-reveal className="rb-cap-pad" style={{ maxWidth: 1180, margin: "0 auto", padding: "0 48px", textAlign: "center" }}>
            <div style={{ fontSize: 12, letterSpacing: ".28em", textTransform: "uppercase", color: A, marginBottom: 18 }}>Integrations</div>
            <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(34px,4.4vw,60px)", lineHeight: 1.02, letterSpacing: "-0.015em", margin: "0 auto", maxWidth: "18ch" }}>Connect to the software you already use every day</h2>
            <p style={{ margin: "22px auto 0", maxWidth: "52ch", fontSize: 16, lineHeight: 1.6, color: "rgba(23,19,31,0.6)" }}>{data.integrationsSub}</p>
          </div>
          <div style={{ marginTop: 60, position: "relative", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 9%, #000 91%, transparent)", maskImage: "linear-gradient(90deg, transparent, #000 9%, #000 91%, transparent)" }}>
            {[{ rows: logosA, anim: "rbMarquee 60s linear infinite" }, { rows: logosB, anim: "rbMarqueeR 52s linear infinite", mt: 16 }].map((r, ri) => (
              <div key={ri} style={{ overflow: "hidden", padding: "4px 0", marginTop: r.mt ?? 0 }}>
                <div style={{ display: "flex", width: "max-content", gap: 16, animation: r.anim }}>
                  {[...r.rows, ...r.rows].map((l, i) => (
                    <div key={i} style={{ flex: "none", width: 180, height: 82, borderRadius: 16, background: "#fff", border: "1px solid rgba(23,19,31,0.06)", boxShadow: "0 16px 36px -26px rgba(23,19,31,0.35)", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 26px" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`/assets/integrations/${l.src}`} alt={l.name} loading="lazy" style={{ height: l.h, width: "auto", maxWidth: 152, objectFit: "contain", display: "block" }} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="rb-cap-pad" style={{ maxWidth: 1180, margin: "52px auto 0", padding: "0 48px", textAlign: "center" }}>
            <div style={{ fontSize: 12, letterSpacing: ".28em", textTransform: "uppercase", color: "#9B93B4", marginBottom: 18 }}>How businesses like yours use Rosebud</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px 28px" }}>
              {INDUSTRY_LINKS.map((ind) => (
                <a key={ind.slug} href={`/industries/${ind.slug}`} style={{ fontSize: 14.5, fontWeight: 500, letterSpacing: ".01em", color: "#4B4363", textDecoration: "underline", textUnderlineOffset: "4px", textDecorationColor: "rgba(139,125,216,0.55)", textDecorationThickness: "1px" }}>
                  {ind.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== DEEP DIVE ===================== */}
      <section className="rb-cap-pad" style={{ position: "relative", background: "#F3EBE1", color: "#17131F", padding: "140px 48px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", flexDirection: "column", gap: 118 }}>
          {data.deep.map((b, i) => {
            const textFirst = i % 2 === 0;
            const text = (
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 12, letterSpacing: ".24em", textTransform: "uppercase", color: A, marginBottom: 18 }}><span style={{ width: 22, height: 1, background: A }} />{b.num} — {b.kicker}</div>
                <h3 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(28px,3.2vw,44px)", lineHeight: 1.04, letterSpacing: "-0.015em", margin: "0 0 18px" }}>{b.title}</h3>
                {b.body.split("\n\n").map((para, j, arr) => (
                  <p key={j} style={{ fontSize: 16, lineHeight: 1.62, color: "rgba(23,19,31,0.66)", maxWidth: "48ch", margin: j === arr.length - 1 ? "0 0 28px" : "0 0 16px" }}>{para}</p>
                ))}
                <BookDemoCTA label={(data.deepCtas ?? DEEP_CTAS)[i].label} href={(data.deepCtas ?? DEEP_CTAS)[i].href} tone="light" />
              </div>
            );
            const graphic = <div className="rb-cap-deep-graphic">{deepMock(data, i, b)}</div>;
            return (
              <div key={b.num} data-reveal className="rb-cap-deep-grid" style={{ display: "grid", gridTemplateColumns: textFirst ? "0.92fr 1.08fr" : "1.08fr 0.92fr", gap: 64, alignItems: "center" }}>
                {textFirst ? <>{text}{graphic}</> : <>{graphic}{text}</>}
              </div>
            );
          })}
        </div>
      </section>

      {/* ===================== FAQ + FAQPage schema ===================== */}
      {faqs.length > 0 && (
        <section className="rb-cap-pad" style={{ position: "relative", background: "#080609", padding: "132px 48px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{ fontSize: 12, letterSpacing: ".28em", textTransform: "uppercase", color: "#B8AEDB", marginBottom: 18 }}>FAQs</div>
            <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(30px,4vw,50px)", lineHeight: 1.04, letterSpacing: "-0.015em", margin: "0 0 40px", color: "#F5F1EA" }}>{data.name}, answered plainly</h2>
            <div>
              {faqs.map((f, i) => (
                <CapFaqItem key={f.q} q={f.q} a={f.a} open={faqOpen === i} onToggle={() => setFaqOpen((o) => (o === i ? null : i))} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===================== CLOSE (frames into a box → footer) ===================== */}
      <section id="pricing" ref={closeWrap} className="rb-capclose-sec" style={{ position: "relative", height: "190vh", background: "#000" }}>
        <div className="rb-capclose-pin" style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", background: "#000" }}>
          <div ref={closeStage} className="rb-capclose-stage rb-cap-pad" style={{ position: "absolute", inset: 0, overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", background: "#F4EAE7", color: "#17131F", padding: "80px 48px", transformOrigin: "center center", willChange: "transform" }}>
            <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(70% 60% at 50% 118%, rgba(139,125,216,0.22) 0%, transparent 60%)" }} />
            <div style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto" }}>
              <div style={{ fontSize: 12, letterSpacing: ".32em", textTransform: "uppercase", color: A, marginBottom: 22 }}>The offer</div>
              <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(38px,4.8vw,68px)", lineHeight: 1.03, letterSpacing: "-0.015em", margin: 0 }}>{data.close.heading}</h2>
              <p style={{ margin: "24px auto 0", maxWidth: 600, fontSize: 17, lineHeight: 1.62, color: "rgba(23,19,31,0.66)" }}>{data.close.subhead}</p>
              <div style={{ marginTop: 36, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 16 }}>
                <BookDemoCTA label="See pricing & choose your plan" href="/pricing" tone="light" />
                <a href="https://cal.eu/rosebudsolutions/demo" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "15px 26px", borderRadius: 999, border: "1px solid rgba(23,19,31,0.2)", color: "#17131F", fontSize: 15, fontWeight: 500, textDecoration: "none" }}>Book a consultation</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FOOTER (global) ===================== */}
      <RedesignReveal />
      <RedesignFooter />
    </div>
  );
}

// Deep-dive / hero graphic dispatcher. Capture has bespoke mocks; other pages
// use a clean generic mock tinted to the capability's accent.
function deepMock(data: CapabilityData, i: number, block: DeepBlock): ReactNode {
  if (data.slug === "capture") return captureDeepMock(i);
  return bespokeDeep(data.slug, i, data.accent) ?? genericMock(data.accent, block.kicker);
}
function heroMock(data: CapabilityData): ReactNode {
  return bespokeHero(data.slug, data.accent) ?? genericMock(data.accent, data.name);
}

// Generic tinted-square mock: a record card + a three-stage flow, keyed to the
// capability accent and the block/capability label.
function genericMock(accent: string, label: string): ReactNode {
  const pill = (text: string, active: boolean) => (
    <div style={{ background: active ? accent : "#fff", color: active ? "#fff" : "#17131F", borderRadius: "2.2cqw", padding: "1.3cqw 2cqw", boxShadow: "0 1.8cqw 3cqw -1.4cqw rgba(23,19,31,.4)", fontWeight: 700, fontSize: "1.6cqw", whiteSpace: "nowrap" }}>{text}</div>
  );
  const conn = <span style={{ flex: 1, height: 0, borderTop: "0.4cqw dotted rgba(23,19,31,.25)", margin: "0 .7cqw" }} />;
  return (
    <div className="rb-cq" style={{ position: "relative", width: "100%", aspectRatio: "1/1", borderRadius: 22, overflow: "hidden", background: `linear-gradient(155deg, ${accent}26, ${accent}0d)`, boxShadow: "0 34px 70px -30px rgba(23,19,31,0.35)" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(80% 70% at 80% 8%, rgba(255,255,255,0.5), transparent 55%)" }} />
      <div style={{ position: "absolute", left: "9%", right: "9%", top: "15%", background: "#fff", borderRadius: "3cqw", boxShadow: "0 3cqw 5cqw -1.6cqw rgba(23,19,31,.3)", overflow: "hidden" }}>
        <div style={{ background: accent, color: "#fff", padding: "2.2cqw 2.8cqw", display: "flex", alignItems: "center", gap: "1.4cqw" }}>
          <span style={{ width: "3.2cqw", height: "3.2cqw", borderRadius: "1cqw", background: "rgba(255,255,255,0.22)", display: "grid", placeItems: "center", fontWeight: 700, fontSize: "1.8cqw" }}>{label[0]}</span>
          <span style={{ fontFamily: SERIF, fontWeight: 600, fontSize: "2.4cqw" }}>{label}</span>
          <span style={{ marginLeft: "auto", width: "1.6cqw", height: "1.6cqw", borderRadius: "50%", background: "#4ADE80" }} />
        </div>
        <div style={{ padding: "1.6cqw 2.8cqw 2.4cqw" }}>
          {[["Record", "Active"], ["Stage", label], ["Value", "Mapped"]].map(([k, v]) => (
            <div key={k} style={{ display: "flex", alignItems: "center", gap: "1.2cqw", padding: "1.6cqw 0", borderBottom: "1px solid #f2f3f5" }}>
              <span style={{ width: "34%", fontSize: "1.35cqw", letterSpacing: ".04em", textTransform: "uppercase", color: "#9aa0a8", fontWeight: 700 }}>{k}</span>
              <span style={{ flex: 1, fontWeight: 700, fontSize: "1.85cqw", color: "#17131F" }}>{v}</span>
              <span style={{ width: "1.4cqw", height: "1.4cqw", borderRadius: "50%", background: accent }} />
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: "absolute", left: "9%", right: "9%", bottom: "9%", display: "flex", alignItems: "center" }}>
        {pill("Enters", false)}{conn}{pill(label, true)}{conn}{pill("Advances", false)}
      </div>
    </div>
  );
}

// Capture deep-dive graphic mocks (per block index). Square tinted containers
// with white cards in the design's visual language.
function captureDeepMock(i: number): ReactNode {
  // Full-square supplied scenes (2× PNGs) — 01 routes, 02 response, 03 record.
  const files = ["capture-01-routes.png", "capture-02-response.png", "capture-03-record.png"];
  const alts = [
    "Screenshot of an inquiry arriving at midnight and getting the same instant answer as one at midday.",
    "Screenshot of an instant branded reply sent the moment an inquiry arrives, with no queue.",
    "Screenshot of a clean lead record created automatically, capturing contact, channel and source.",
  ];
  const idx = i in files ? i : 0;
  return capImg("capture", files[idx], alts[idx]);
}
