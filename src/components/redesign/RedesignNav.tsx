"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import RedesignMobileMenu from "./RedesignMobileMenu";
import { NAV_CAPABILITIES, NAV_RESOURCES, LIVE_SLUGS } from "./capabilityData";

// Shared redesign top nav (light-themed pages): logo · Product/Connections/Resources
// hover mega-panels · Get started. Transparent over the hero, glass-morph past it,
// with adaptive text so it stays readable over both light and dark sections.

const SERIF = "var(--font-cormorant), 'Cormorant Garamond', serif";
const CSS = `
.rb-cap-navlinks a:hover { color: var(--nav-fg-strong); }
.rb-mega-item { transition: background .25s ease; }
.rb-mega-item:hover { background: rgba(245,241,234,0.07); }
@media (max-width: 860px){
  .rb-cap-navlinks { display: none !important; }
  .rb-cap-nav { padding: 0 !important; }
  .rb-cap-navbar { max-width: none !important; border-radius: 0 !important; padding: 14px 18px !important; }
}
`;

export default function RedesignNav() {
  const navBar = useRef<HTMLDivElement>(null);
  const [openMenu, setOpenMenu] = useState<null | "product" | "connections" | "resources">(null);
  const [menuAnchor, setMenuAnchor] = useState(0);
  const menuTimer = useRef<number | null>(null);
  const openNow = (m: "product" | "connections" | "resources", el?: HTMLElement) => { if (menuTimer.current) clearTimeout(menuTimer.current); if (el) { const r = el.getBoundingClientRect(); setMenuAnchor(r.left + r.width / 2); } setOpenMenu(m); };
  const panelLeft = (w: number) => { const vw = typeof window !== "undefined" ? window.innerWidth : 1440; const half = Math.min(w, vw - 40) / 2; return Math.max(16 + half, Math.min(menuAnchor, vw - 16 - half)); };
  const cancelClose = () => { if (menuTimer.current) clearTimeout(menuTimer.current); };
  const scheduleClose = () => { if (menuTimer.current) clearTimeout(menuTimer.current); menuTimer.current = window.setTimeout(() => setOpenMenu(null), 140); };

  useEffect(() => {
    const onScroll = () => {
      const bar = navBar.current;
      if (!bar) return;
      const solid = window.scrollY > window.innerHeight * 0.7;
      bar.style.background = solid ? "rgba(8,7,11,0.12)" : "transparent";
      bar.style.backdropFilter = solid ? "blur(30px) saturate(1.4)" : "none";
      bar.style.setProperty("-webkit-backdrop-filter", solid ? "blur(30px) saturate(1.4)" : "none");
      bar.style.borderColor = solid ? "rgba(245,241,234,0.1)" : "transparent";
      bar.style.boxShadow = solid ? "0 16px 40px -34px rgba(0,0,0,0.3)" : "none";
      bar.style.maxWidth = solid ? "980px" : "1180px";
      // text adapts to the section behind the nav (readable over light & dark)
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
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  const capHref = (slug: string) => (LIVE_SLUGS.has(slug) ? `/capabilities/${slug}` : "#");
  const navLink: CSSProperties = { display: "flex", alignItems: "center", gap: 7, color: "var(--nav-fg)", transition: "color .25s ease" };
  const glassPanel: CSSProperties = { position: "absolute", padding: 12, borderRadius: 20, background: "rgba(40,37,52,0.42)", backdropFilter: "blur(44px) saturate(1.5)", WebkitBackdropFilter: "blur(44px) saturate(1.5)", border: "1px solid rgba(245,241,234,0.12)", boxShadow: "0 18px 44px -26px rgba(0,0,0,0.4)" };

  return (
    <nav className="rb-cap-nav" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "16px clamp(16px,3vw,40px)", transition: "padding .4s ease" }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
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
  );
}
