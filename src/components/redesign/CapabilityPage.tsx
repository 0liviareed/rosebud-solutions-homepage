"use client";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import BookDemoCTA from "./BookDemoCTA";
import RedesignMobileMenu from "./RedesignMobileMenu";
import {
  type CapabilityData,
  type DeepBlock,
  DEEP_CTAS,
  SIBLINGS, SIBLING_SUBLABEL, LIVE_SLUGS,
  NAV_CAPABILITIES, NAV_RESOURCES, INT_LOGOS, INT_INDUSTRIES, VOICES,
} from "./capabilityData";

const SERIF = "var(--font-cormorant), 'Cormorant Garamond', serif";
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
  .rb-cap-voicecard { flex: 0 0 84% !important; }
  .rb-cap-pad { padding-left: 20px !important; padding-right: 20px !important; }
}
@media (max-width: 860px){
  .rb-cap-navlinks { display: none !important; } /* replaced by the global hamburger */
}
`;

export default function CapabilityPage({ data }: { data: CapabilityData }) {
  const navBar = useRef<HTMLDivElement>(null);
  const voiceTrack = useRef<HTMLDivElement>(null);
  const [openMenu, setOpenMenu] = useState<null | "product" | "connections" | "resources">(null);
  const [siblingOpen, setSiblingOpen] = useState(false);
  const [voiceIdx, setVoiceIdx] = useState(0);
  const menuTimer = useRef<number | null>(null);

  const openNow = (m: "product" | "connections" | "resources") => { if (menuTimer.current) clearTimeout(menuTimer.current); setOpenMenu(m); };
  const cancelClose = () => { if (menuTimer.current) clearTimeout(menuTimer.current); };
  const scheduleClose = () => { if (menuTimer.current) clearTimeout(menuTimer.current); menuTimer.current = window.setTimeout(() => setOpenMenu(null), 140); };

  // Nav solidifies (light → dark glass) once scrolled off the hero top.
  useEffect(() => {
    const onScroll = () => {
      const bar = navBar.current;
      if (!bar) return;
      // Transparent over the hero; a very light glass-morph once scrolled below it.
      const solid = window.scrollY > window.innerHeight * 0.7;
      bar.style.background = solid ? "rgba(8,7,11,0.12)" : "transparent";
      bar.style.backdropFilter = solid ? "blur(30px) saturate(1.4)" : "none";
      bar.style.setProperty("-webkit-backdrop-filter", solid ? "blur(30px) saturate(1.4)" : "none");
      bar.style.borderColor = solid ? "rgba(245,241,234,0.1)" : "transparent";
      bar.style.boxShadow = solid ? "0 16px 40px -34px rgba(0,0,0,0.3)" : "none";
      bar.style.maxWidth = solid ? "980px" : "1180px";
      bar.style.setProperty("--nav-fg", solid ? "rgba(245,241,234,0.9)" : "rgba(23,19,31,0.72)");
      bar.style.setProperty("--nav-fg-strong", solid ? "#F5F1EA" : "#17131F");
      bar.style.setProperty("--nav-pill-bg", solid ? "rgba(245,241,234,0.1)" : "rgba(23,19,31,0.06)");
      bar.style.setProperty("--nav-pill-border", solid ? "rgba(245,241,234,0.28)" : "rgba(23,19,31,0.18)");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Voices carousel — translate track by focused-card width + gap.
  useEffect(() => {
    const t = voiceTrack.current;
    if (!t || !t.children.length) return;
    const step = (t.children[0] as HTMLElement).getBoundingClientRect().width + 20;
    t.style.transform = `translateX(-${voiceIdx * step}px)`;
  }, [voiceIdx]);

  const capHref = (slug: string) => (LIVE_SLUGS.has(slug) ? `/capabilities/${slug}` : "#");
  const navLink: CSSProperties = { display: "flex", alignItems: "center", gap: 7, color: "var(--nav-fg)", transition: "color .25s ease" };
  const panelBox: CSSProperties = { display: "flex", flexDirection: "column", borderRadius: 20, overflow: "hidden", background: "#fff", border: "1px solid rgba(23,19,31,0.08)", boxShadow: "0 24px 60px -40px rgba(23,19,31,0.35)" };
  const glassPanel: CSSProperties = { position: "absolute", padding: 12, borderRadius: 20, background: "rgba(40,37,52,0.42)", backdropFilter: "blur(44px) saturate(1.5)", WebkitBackdropFilter: "blur(44px) saturate(1.5)", border: "1px solid rgba(245,241,234,0.12)", boxShadow: "0 18px 44px -26px rgba(0,0,0,0.4)" };

  const logosA = INT_LOGOS.slice(0, Math.ceil(INT_LOGOS.length / 2));
  const logosB = INT_LOGOS.slice(Math.ceil(INT_LOGOS.length / 2));

  const maxIdx = VOICES.length - 2;

  return (
    <div style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#F5F1EA", background: "#ECE7F7", overflowX: "clip" }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* ===================== NAV ===================== */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "16px clamp(16px,3vw,40px)", transition: "padding .4s ease" }}>
        <div ref={navBar} style={{ maxWidth: 1180, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px 12px 22px", borderRadius: 999, background: "transparent", border: "1px solid transparent", transition: "background .45s ease, border-color .45s ease, box-shadow .45s ease, max-width .45s ease, padding .45s ease", ["--nav-fg" as string]: "rgba(23,19,31,0.72)", ["--nav-fg-strong" as string]: "#17131F", ["--nav-pill-bg" as string]: "rgba(23,19,31,0.06)", ["--nav-pill-border" as string]: "rgba(23,19,31,0.18)" } as CSSProperties}>
          <a href="/" aria-label="Rosebud Solutions" style={{ display: "flex", alignItems: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/rosebud-logo.png" alt="Rosebud Solutions" width={36} height={36} style={{ display: "block", width: 36, height: 36 }} />
          </a>
          <div className="rb-cap-navlinks" style={{ display: "flex", alignItems: "center", gap: 34, fontSize: 13, letterSpacing: ".14em", textTransform: "uppercase" }}>
            <a className="rb-cap-navdrop" href={capHref("capture")} onMouseEnter={() => openNow("product")} onMouseLeave={scheduleClose} style={navLink}>Product<span style={{ fontSize: 8, opacity: 0.7 }}>▼</span></a>
            <a className="rb-cap-navdrop" href="/#integrations" onMouseEnter={() => openNow("connections")} onMouseLeave={scheduleClose} style={navLink}>Connections<span style={{ fontSize: 8, opacity: 0.7 }}>▼</span></a>
            <a className="rb-cap-navdrop" href="/about" onMouseEnter={() => openNow("resources")} onMouseLeave={scheduleClose} style={navLink}>Resources<span style={{ fontSize: 8, opacity: 0.7 }}>▼</span></a>
            <a href="/pricing" style={{ padding: "9px 20px", borderRadius: 999, background: "var(--nav-pill-bg)", backdropFilter: "blur(20px) saturate(1.3)", WebkitBackdropFilter: "blur(20px) saturate(1.3)", border: "1px solid var(--nav-pill-border)", color: "var(--nav-fg-strong)", fontWeight: 600, letterSpacing: ".1em" }}>Get started</a>
          </div>
          <RedesignMobileMenu />
        </div>

        {/* Product mega-panel */}
        {openMenu === "product" && (
          <div onMouseEnter={cancelClose} onMouseLeave={scheduleClose} style={{ ...glassPanel, top: 80, left: "50%", transform: "translateX(-50%)", width: "min(940px,calc(100vw - 40px))", padding: "26px 28px 28px", borderRadius: 22, display: "flex", gap: 28 }}>
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
          <div onMouseEnter={cancelClose} onMouseLeave={scheduleClose} style={{ ...glassPanel, top: 80, left: "50%", transform: "translateX(-50%)", width: "min(320px,calc(100vw - 40px))", borderRadius: 20 }}>
            <a href="/#integrations" className="rb-mega-item" onClick={() => setOpenMenu(null)} style={{ display: "flex", flexDirection: "column", gap: 3, padding: "13px 14px", borderRadius: 13, textDecoration: "none" }}>
              <span style={{ fontSize: 15, fontWeight: 600, color: "#F5F1EA" }}>Integrations</span>
              <span style={{ fontSize: 12.5, color: "rgba(245,241,234,0.72)" }}>Connect to your tools effortlessly</span>
            </a>
          </div>
        )}
        {openMenu === "resources" && (
          <div onMouseEnter={cancelClose} onMouseLeave={scheduleClose} style={{ ...glassPanel, top: 80, left: "50%", transform: "translateX(-50%)", width: "min(300px,calc(100vw - 40px))", borderRadius: 20 }}>
            {NAV_RESOURCES.map((r) => (
              <a key={r.head} href={r.href} className="rb-mega-item" onClick={() => setOpenMenu(null)} style={{ display: "flex", flexDirection: "column", gap: 3, padding: "12px 14px", borderRadius: 13, textDecoration: "none" }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: "#F5F1EA" }}>{r.head}</span>
                <span style={{ fontSize: 12.5, color: "rgba(245,241,234,0.72)" }}>{r.desc}</span>
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ===================== HERO ===================== */}
      <section className="rb-cap-pad" style={{ position: "relative", overflow: "hidden", background: "#ECE7F7", color: "#17131F", padding: "172px 48px 108px" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 90% at 84% 0%, rgba(139,125,216,0.1) 0%, transparent 52%), radial-gradient(80% 70% at 0% 100%, rgba(232,129,74,0.06) 0%, transparent 55%)" }} />
        <div className="rb-cap-hero-grid" style={{ position: "relative", zIndex: 1, maxWidth: 1220, margin: "0 auto", display: "grid", gridTemplateColumns: "1.02fr 0.98fr", gap: 60, alignItems: "center" }}>
          <div>
            {/* sibling switcher */}
            <div style={{ position: "relative", display: "inline-block", marginBottom: 30 }}>
              <button type="button" onClick={() => setSiblingOpen((s) => !s)} style={{ display: "inline-flex", alignItems: "center", gap: 11, padding: "10px 16px 10px 19px", borderRadius: 999, background: "rgba(255,255,255,0.42)", backdropFilter: "blur(20px) saturate(1.5)", WebkitBackdropFilter: "blur(20px) saturate(1.5)", border: "1px solid rgba(255,255,255,0.6)", boxShadow: "0 10px 30px -16px rgba(23,19,31,0.35), inset 0 1px 0 rgba(255,255,255,0.6)", color: "#17131F", fontSize: 13, letterSpacing: ".04em", cursor: "pointer" }}>
                <span style={{ color: "rgba(23,19,31,0.5)" }}>Rosebud for</span>
                <span style={{ fontWeight: 600, color: "#17131F" }}>{data.name}</span>
                <span style={{ fontSize: 9, color: A, display: "inline-block", transition: "transform .3s ease", transform: siblingOpen ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
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
                  <div style={{ margin: "6px 8px 4px", paddingTop: 11, borderTop: "1px solid rgba(245,241,234,0.1)", fontSize: 10.5, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(245,241,234,0.42)" }}>{SIBLING_SUBLABEL}</div>
                </div>
              )}
            </div>

            <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(38px,4.5vw,66px)", lineHeight: 1.04, letterSpacing: "-0.015em", margin: 0, maxWidth: "15ch", color: "#17131F" }}>{data.hero.headlinePre}{data.hero.headlineEm ? <em style={{ fontStyle: "italic", color: "#6B5CC4" }}>{data.hero.headlineEm}</em> : null}</h1>
            <p style={{ marginTop: 26, maxWidth: 560, fontSize: "clamp(16px,1.3vw,18px)", lineHeight: 1.62, color: "rgba(23,19,31,0.66)" }}>{data.hero.subhead}</p>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 22, marginTop: 36 }}>
              <BookDemoCTA label="Get started" href="/pricing" tone="light" />
            </div>
          </div>

          {/* hero visual — Capture keeps the bespoke intake mock; others use the generic mock */}
          <div style={{ position: "relative" }}>
            {data.slug === "capture" ? (
            <div className="rb-cq" style={{ position: "relative", width: "100%", aspectRatio: "1/1", borderRadius: 24, overflow: "hidden", background: "linear-gradient(155deg,#DEDAF0,#C6CFEC)", boxShadow: "0 42px 84px -40px rgba(30,25,60,0.55)" }}>
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(80% 70% at 82% 6%, rgba(255,255,255,0.5), transparent 55%)" }} />
              {/* web form */}
              <div style={{ position: "absolute", left: "4%", top: "5%", width: "50%", background: "#fff", borderRadius: "2.4cqw", boxShadow: "0 2.4cqw 4cqw -1.6cqw rgba(30,25,60,.4)", overflow: "hidden" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1cqw", padding: "1.3cqw 1.8cqw", borderBottom: "1px solid #f2f3f5" }}>
                  {["#4ADE80", "#F5B94A", "#F06A5B"].map((c) => <span key={c} style={{ width: "1.3cqw", height: "1.3cqw", borderRadius: "50%", background: c }} />)}
                  <span style={{ marginLeft: "auto", fontSize: "1.3cqw", fontWeight: 700, color: "#9aa0a8" }}>Web form · 21:47</span>
                </div>
                <div style={{ padding: "1.8cqw", display: "flex", flexDirection: "column", gap: "1.2cqw" }}>
                  <div style={{ fontSize: "1.3cqw", color: "#9aa0a8", fontWeight: 700 }}>Full name</div>
                  <div style={{ background: "#f4f5f7", borderRadius: "1cqw", padding: "1.2cqw 1.4cqw", fontSize: "1.7cqw", fontWeight: 700 }}>Daniel Pryce</div>
                  <div style={{ fontSize: "1.3cqw", color: "#9aa0a8", fontWeight: 700 }}>Enquiry</div>
                  <div style={{ background: "#f4f5f7", borderRadius: "1cqw", padding: "1.2cqw 1.4cqw", fontSize: "1.7cqw", fontWeight: 700 }}>2-bed · viewing this week</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1cqw", background: "#6B5CC4", color: "#fff", fontWeight: 700, fontSize: "1.7cqw", padding: "1.4cqw", borderRadius: "1.1cqw", marginTop: ".4cqw" }}>Submit ✓</div>
                </div>
              </div>
              {/* WhatsApp */}
              <div style={{ position: "absolute", left: "3%", top: "47%", width: "53%", background: "#fff", borderRadius: "2.4cqw", boxShadow: "0 2.4cqw 4cqw -1.6cqw rgba(30,25,60,.4)", overflow: "hidden" }}>
                <div style={{ background: "#1EA85C", color: "#fff", padding: "1.4cqw 1.8cqw", display: "flex", alignItems: "center", gap: "1.2cqw" }}>
                  <span style={{ width: "3.2cqw", height: "3.2cqw", borderRadius: "50%", background: "rgba(255,255,255,.25)", display: "grid", placeItems: "center", fontWeight: 700, fontSize: "1.5cqw" }}>DP</span>
                  <div style={{ lineHeight: 1.15 }}><div style={{ fontWeight: 700, fontSize: "1.7cqw" }}>WhatsApp</div><div style={{ fontSize: "1.25cqw", opacity: .85 }}>Sunday · 21:47</div></div>
                </div>
                <div style={{ padding: "1.8cqw", background: "#EAF6EE", display: "flex", flexDirection: "column", gap: "1.3cqw" }}>
                  <div style={{ alignSelf: "flex-start", maxWidth: "86%", background: "#fff", borderRadius: "1.4cqw 1.4cqw 1.4cqw .3cqw", padding: "1.3cqw 1.5cqw", boxShadow: "0 .6cqw 1.2cqw -.6cqw rgba(0,0,0,.18)", fontSize: "1.6cqw", lineHeight: 1.35 }}>Any 2-beds free to view this week?<div style={{ textAlign: "right", fontSize: "1.15cqw", color: "#9aa0a8", marginTop: ".4cqw" }}>21:47</div></div>
                  <div style={{ alignSelf: "flex-end", maxWidth: "88%", background: "#DCF3E3", borderRadius: "1.4cqw 1.4cqw .3cqw 1.4cqw", padding: "1.3cqw 1.5cqw", fontSize: "1.6cqw", lineHeight: 1.35 }}>Yes — two are open. I can hold a viewing slot now. What day suits?<div style={{ textAlign: "right", fontSize: "1.15cqw", color: "#2E9E5B", marginTop: ".4cqw" }}>21:47 · auto ✓✓</div></div>
                </div>
              </div>
              {/* CRM record */}
              <div style={{ position: "absolute", right: "2%", top: "28%", width: "52%", background: "#fff", borderRadius: "2.6cqw", boxShadow: "0 3cqw 5.4cqw -1.6cqw rgba(30,25,60,.5)", overflow: "hidden" }}>
                <div style={{ background: "#4B3F86", color: "#fff", padding: "1.8cqw 2.2cqw", display: "flex", alignItems: "center", gap: "1.3cqw" }}>
                  <span style={{ width: "3cqw", height: "3cqw", borderRadius: ".9cqw", background: "#4ADE80", color: "#12331f", display: "grid", placeItems: "center", fontSize: "1.7cqw" }}>✓</span>
                  <span style={{ fontFamily: SERIF, fontWeight: 600, fontSize: "2.3cqw" }}>Written to CRM</span>
                  <span style={{ marginLeft: "auto", fontSize: "1.3cqw", fontWeight: 600, opacity: .85 }}>live</span>
                </div>
                <div style={{ padding: "1.6cqw 2.2cqw 2cqw" }}>
                  {[["Name", "Daniel Pryce"], ["Channel", "Form + WhatsApp"], ["Enquiry", "2-bed · viewing"], ["Response", "Sent · brand voice"], ["Stage", "New — to qualify"]].map(([k, v]) => (
                    <div key={k} style={{ display: "flex", alignItems: "center", gap: "1.2cqw", padding: "1.2cqw 0", borderBottom: "1px solid #f2f3f5" }}>
                      <span style={{ width: "32%", fontSize: "1.25cqw", letterSpacing: ".04em", textTransform: "uppercase", color: "#9aa0a8", fontWeight: 700 }}>{k}</span>
                      <span style={{ flex: 1, fontWeight: 700, fontSize: "1.65cqw" }}>{v}</span>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: ".5cqw", fontSize: "1.2cqw", fontWeight: 700, color: "#2E9E5B" }}><span style={{ width: "1.2cqw", height: "1.2cqw", borderRadius: "50%", background: "#4ADE80" }} />21:47</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* powered by */}
              <div style={{ position: "absolute", left: "5%", bottom: "6%", display: "flex", alignItems: "center", gap: "1.2cqw", background: "#fff", borderRadius: "2.4cqw", padding: "1.6cqw 2.6cqw", boxShadow: "0 2cqw 3.4cqw -1.4cqw rgba(30,25,60,.45)" }}>
                <span style={{ color: "#9aa0a8", fontWeight: 600, fontSize: "1.7cqw" }}>powered by</span><span style={{ fontFamily: SERIF, fontWeight: 600, fontSize: "2.4cqw", letterSpacing: "-.01em", color: "#17131F" }}>Rosebud</span>
              </div>
            </div>
            ) : heroMock(data)}
          </div>
        </div>
      </section>

      {/* ===================== HOW IT WORKS ===================== */}
      <section className="rb-cap-pad" style={{ position: "relative", overflow: "hidden", background: "#ECE7F7", color: "#17131F", padding: "132px 48px" }}>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1220, margin: "0 auto", background: "rgba(40,37,52,0.5)", backdropFilter: "blur(44px) saturate(1.5)", WebkitBackdropFilter: "blur(44px) saturate(1.5)", border: "1px solid rgba(245,241,234,0.12)", borderRadius: 28, padding: "clamp(34px,4.5vw,60px)", boxShadow: "0 44px 110px -44px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)" }}>
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
              : (data.works.panelsText ?? []).map((p, i) => (
                  <div key={i} style={{ ...panelBox, padding: "30px 28px", minHeight: 230 }}>
                    <div style={{ width: 30, height: 30, borderRadius: 9, background: `${data.accent}1a`, color: data.accent, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: SERIF, fontWeight: 600, fontSize: 15, marginBottom: 16 }}>{i + 1}</div>
                    <div style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 500, color: "#17131F", lineHeight: 1.15, marginBottom: 12 }}>{p.head}</div>
                    <div style={{ fontSize: 14.5, lineHeight: 1.6, color: "rgba(23,19,31,0.62)" }}>{p.body}</div>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* ===================== INTEGRATIONS (light) ===================== */}
      <section style={{ position: "relative", overflow: "hidden", background: "#F6F3FB", color: "#17131F", padding: "132px 0" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(90% 70% at 50% -10%, rgba(139,125,216,0.08) 0%, transparent 55%)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="rb-cap-pad" style={{ maxWidth: 1180, margin: "0 auto", padding: "0 48px", textAlign: "center" }}>
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
          <div className="rb-cap-pad" style={{ maxWidth: 1180, margin: "52px auto 0", padding: "0 48px" }}>
            <div style={{ fontSize: 12, letterSpacing: ".28em", textTransform: "uppercase", color: "#9B93B4", marginBottom: 14 }}>How businesses like yours use Rosebud</div>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "8px 18px" }}>
              {INT_INDUSTRIES.map((p) => <span key={p} style={{ fontSize: 14, letterSpacing: ".01em", color: "#6E6784" }}>{p}</span>)}
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
                <p style={{ fontSize: 16, lineHeight: 1.62, color: "rgba(23,19,31,0.66)", maxWidth: "48ch", margin: "0 0 28px" }}>{b.body}</p>
                <BookDemoCTA label={DEEP_CTAS[i].label} href={DEEP_CTAS[i].href} tone="light" />
              </div>
            );
            const graphic = <div className="rb-cap-deep-graphic">{deepMock(data, i, b)}</div>;
            return (
              <div key={b.num} className="rb-cap-deep-grid" style={{ display: "grid", gridTemplateColumns: textFirst ? "0.92fr 1.08fr" : "1.08fr 0.92fr", gap: 64, alignItems: "center" }}>
                {textFirst ? <>{text}{graphic}</> : <>{graphic}{text}</>}
              </div>
            );
          })}
        </div>
      </section>

      {/* ===================== VOICES ===================== */}
      <section className="rb-cap-pad" style={{ position: "relative", overflow: "hidden", background: "#080609", padding: "140px 48px" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/topo.jpg" alt="" style={{ position: "absolute", inset: "-4%", width: "108%", height: "108%", objectFit: "cover", filter: "brightness(0.4) saturate(0.85)" }} />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 90% at 50% 40%, rgba(8,6,10,0.55) 0%, rgba(8,6,10,0.82) 65%, #080609 100%)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1220, margin: "0 auto" }}>
          <div style={{ fontSize: 12, letterSpacing: ".28em", textTransform: "uppercase", color: "#B8AEDB", marginBottom: 18 }}>Voices</div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
            <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(40px,5vw,74px)", lineHeight: 1.0, letterSpacing: "-0.01em", margin: 0, color: "#F5F1EA" }}>In their words, not ours</h2>
            <div style={{ display: "inline-flex", alignItems: "center", borderRadius: 999, background: "rgba(255,255,255,0.06)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.16)", overflow: "hidden" }}>
              <button type="button" onClick={() => setVoiceIdx((i) => Math.max(0, i - 1))} aria-label="Previous" style={{ width: 56, height: 50, background: "transparent", border: "none", color: "#B8AEDB", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", opacity: voiceIdx <= 0 ? 0.3 : 1 }}>←</button>
              <span style={{ width: 1, height: 26, background: "rgba(255,255,255,0.16)" }} />
              <button type="button" onClick={() => setVoiceIdx((i) => Math.min(maxIdx, i + 1))} aria-label="Next" style={{ width: 56, height: 50, background: "transparent", border: "none", color: "#B8AEDB", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", opacity: voiceIdx >= maxIdx ? 0.3 : 1 }}>→</button>
            </div>
          </div>
          <div style={{ marginTop: 28, overflow: "hidden" }}>
            <div ref={voiceTrack} style={{ display: "flex", gap: 20, transition: "transform 0.7s cubic-bezier(.16,1,.3,1)" }}>
              {VOICES.map((v, i) => {
                const focused = i === voiceIdx || i === voiceIdx + 1;
                return (
                  <div key={i} className="rb-cap-voicecard" style={{ flex: "0 0 46%", opacity: focused ? 1 : 0.42, transform: focused ? "none" : "scale(0.94)", transition: "opacity 0.5s ease, transform 0.5s ease" }}>
                    <div style={{ position: "relative", height: "100%", minHeight: 360, background: "rgba(20,16,26,0.55)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(184,174,219,0.16)", boxShadow: "0 30px 66px -34px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.08)", borderRadius: 22, padding: "36px 34px", display: "flex", flexDirection: "column" }}>
                      <div style={{ fontFamily: SERIF, fontSize: 60, lineHeight: 0.8, color: "rgba(184,174,219,0.5)", height: 34 }}>“</div>
                      <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 22, lineHeight: 1.4, color: "#EDE9F5", marginTop: 14, flex: 1 }}>{v.quote}</div>
                      <div style={{ marginTop: 30, paddingTop: 22, borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", gap: 14 }}>
                        <span style={{ width: 44, height: 44, flex: "none", borderRadius: 999, background: "rgba(139,125,216,0.16)", border: "1px solid rgba(184,174,219,0.28)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: SERIF, fontStyle: "italic", fontSize: 15, color: "#C7BEE8" }}>{v.ini}</span>
                        <div>
                          <div style={{ fontSize: 12.5, letterSpacing: ".12em", textTransform: "uppercase", color: "#F5F1EA" }}>{v.name}</div>
                          <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 14, color: "rgba(245,241,234,0.55)", marginTop: 3 }}>{v.role}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{ marginTop: 34, display: "flex", alignItems: "center", gap: 18, justifyContent: "center" }}>
            <div style={{ fontFamily: SERIF, fontSize: 20, letterSpacing: ".04em", color: "#B8AEDB" }}>{String(voiceIdx + 1).padStart(2, "0")} — {String(VOICES.length).padStart(2, "0")}</div>
            <div style={{ width: 200, height: 2, background: "rgba(255,255,255,0.14)", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ height: "100%", background: "#B8AEDB", borderRadius: 2, width: `${((voiceIdx + 1) / maxIdx) * 100}%`, transition: "width 0.6s cubic-bezier(.16,1,.3,1)" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ===================== CLOSE ===================== */}
      <section id="pricing" className="rb-cap-pad" style={{ position: "relative", overflow: "hidden", background: "#F4EAE7", color: "#17131F", padding: "150px 48px" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(70% 60% at 50% 118%, rgba(139,125,216,0.22) 0%, transparent 60%)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 12, letterSpacing: ".32em", textTransform: "uppercase", color: A, marginBottom: 22 }}>The offer</div>
          <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(38px,4.8vw,68px)", lineHeight: 1.03, letterSpacing: "-0.015em", margin: 0 }}>{data.close.heading}</h2>
          <p style={{ margin: "24px auto 0", maxWidth: 600, fontSize: 17, lineHeight: 1.62, color: "rgba(23,19,31,0.66)" }}>{data.close.subhead}</p>
          <div style={{ marginTop: 36, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 16 }}>
            <BookDemoCTA label="See pricing & choose your plan" href="/pricing" tone="light" />
            <a href="https://cal.eu/rosebudsolutions/demo" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "15px 26px", borderRadius: 999, border: "1px solid rgba(23,19,31,0.2)", color: "#17131F", fontSize: 15, fontWeight: 500, textDecoration: "none" }}>Book a consultation</a>
          </div>
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer className="rb-cap-pad" style={{ position: "relative", background: "#000", color: "#F5F1EA", padding: "64px 48px 44px" }}>
        <div style={{ maxWidth: 1220, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
            <a href="/" style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/rosebud-logo.png" alt="" width={30} height={30} style={{ display: "block" }} />
              <span style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 600, color: "#F5F1EA" }}>Rosebud</span>
            </a>
            <div style={{ display: "flex", gap: 28, fontSize: 13 }}>
              <a href="/" style={{ color: "rgba(245,241,234,0.6)" }}>Home</a>
              <a href="/pricing" style={{ color: "rgba(245,241,234,0.6)" }}>Pricing</a>
              <a href="/about" style={{ color: "rgba(245,241,234,0.6)" }}>About</a>
            </div>
          </div>
          <div style={{ marginTop: 40, paddingTop: 22, borderTop: "1px solid rgba(245,241,234,0.1)", textAlign: "center", fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(245,241,234,0.4)" }}>Copyright © 2026 Rosebud Global. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}

// Deep-dive / hero graphic dispatcher. Capture has bespoke mocks; other pages
// use a clean generic mock tinted to the capability's accent.
function deepMock(data: CapabilityData, i: number, block: DeepBlock): ReactNode {
  if (data.slug === "capture") return captureDeepMock(i);
  return genericMock(data.accent, block.kicker);
}
function heroMock(data: CapabilityData): ReactNode {
  return genericMock(data.accent, data.name);
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
  const sq = (bg: string, shadow: string, children: ReactNode) => (
    <div className="rb-cq" style={{ position: "relative", width: "100%", aspectRatio: "1/1", borderRadius: 22, overflow: "hidden", background: bg, boxShadow: shadow }}>{children}</div>
  );
  const card: CSSProperties = { background: "#fff", borderRadius: "3cqw", boxShadow: "0 3cqw 5cqw -1.6cqw rgba(23,19,31,.32)", overflow: "hidden" };
  const cardHead: CSSProperties = { background: "#4B3F86", color: "#fff", padding: "2cqw 2.6cqw", display: "flex", alignItems: "center", gap: "1.3cqw", fontFamily: SERIF, fontWeight: 600, fontSize: "2.3cqw" };

  if (i === 0) {
    // 01 LISTEN — out-of-hours workflow executing at 21:47, office offline.
    return sq("#DED8EF", "0 34px 70px -30px rgba(23,19,31,0.4)", <>
      <div style={{ position: "absolute", left: "7%", top: "8%", display: "flex", alignItems: "center", gap: "1.3cqw", background: "#26282e", color: "#c7cad0", borderRadius: "2.6cqw", padding: "1.6cqw 2.2cqw", boxShadow: "0 2cqw 3.4cqw -1.4cqw rgba(20,10,40,.5)", fontWeight: 600, fontSize: "1.7cqw" }}>
        <span style={{ width: "1.6cqw", height: "1.6cqw", borderRadius: "50%", background: "#565a63" }} />Office closed · Sun 21:47
      </div>
      <div style={{ position: "absolute", left: "10%", top: "27%", width: "80%", ...card }}>
        <div style={cardHead}><span style={{ width: "2.4cqw", height: "2.4cqw", borderRadius: "50%", background: "#4ADE80" }} />Continuous listener · live</div>
        <div style={{ padding: "1.4cqw 2.6cqw 2.4cqw" }}>
          {[["Enquiry received", "21:47", "#2E9E5B"], ["Auto-response sent", "21:47", "#2E9E5B"], ["Written to CRM", "21:47", "#2E9E5B"]].map(([l, t, c]) => (
            <div key={l} style={{ display: "flex", alignItems: "center", gap: "1.6cqw", padding: "1.9cqw 0", borderBottom: "1px solid #f2f3f5" }}>
              <span style={{ width: "3.4cqw", height: "3.4cqw", borderRadius: "1cqw", background: "#EDE9F7", color: "#6B5CC4", display: "grid", placeItems: "center", fontWeight: 700, fontSize: "1.7cqw" }}>✓</span>
              <span style={{ flex: 1, fontWeight: 600, fontSize: "1.95cqw", color: "#17131F" }}>{l}</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: ".7cqw", padding: ".7cqw 1.5cqw", borderRadius: 999, fontWeight: 700, fontSize: "1.4cqw", background: "#E6F6EC", color: c as string }}>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </>);
  }
  if (i === 1) {
    // 02 BIND — two timelines: manual triage vs sub-second.
    const bar = (label: string, val: string, fill: string, w: string, bg: string, fg: string) => (
      <div style={{ ...card, padding: "2.2cqw 2.6cqw", boxShadow: "0 2.4cqw 4cqw -1.6cqw rgba(23,19,31,.3)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.4cqw" }}>
          <span style={{ fontWeight: 700, fontSize: "1.8cqw", color: "#17131F" }}>{label}</span>
          <span style={{ padding: ".6cqw 1.5cqw", borderRadius: 999, fontWeight: 700, fontSize: "1.5cqw", background: bg, color: fg }}>{val}</span>
        </div>
        <div style={{ height: "2.4cqw", borderRadius: 999, background: "#eef0f2", overflow: "hidden" }}><div style={{ height: "100%", width: w, background: fill, borderRadius: 999 }} /></div>
      </div>
    );
    return sq("#EEE9E0", "0 34px 70px -30px rgba(23,19,31,0.3)", <>
      <div style={{ position: "absolute", left: "9%", right: "9%", top: "20%", display: "flex", flexDirection: "column", gap: "3cqw" }}>
        {bar("Manual triage", "3h 12m", "#E8A24A", "88%", "#FBEEDD", "#B5761A")}
        {bar("Rosebud · bound", "0.4s", "#4ADE80", "6%", "#E6F6EC", "#2E9E5B")}
      </div>
    </>);
  }
  // 03 RECORD — structured record parsing parameters.
  return sq("#6B5CC4", "0 34px 70px -30px rgba(40,20,80,0.55)", <>
    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(90% 80% at 20% 10%, rgba(255,255,255,0.14), transparent 60%)" }} />
    <div style={{ position: "absolute", left: "10%", top: "16%", width: "80%", ...card }}>
      <div style={cardHead}><span style={{ width: "2.4cqw", height: "2.4cqw", borderRadius: "50%", background: "#4ADE80" }} />Structured record</div>
      <div style={{ padding: "1.6cqw 2.6cqw 2.2cqw" }}>
        {[["Contact", "Daniel Pryce"], ["Channel origin", "WhatsApp"], ["Source", "Meta / paid"], ["Ad click ID", "fb.1.87f3…"], ["Timestamp", "21:47"]].map(([k, v]) => (
          <div key={k} style={{ display: "flex", alignItems: "center", gap: "1.2cqw", padding: "1.4cqw 0", borderBottom: "1px solid #f2f3f5" }}>
            <span style={{ width: "38%", fontSize: "1.3cqw", letterSpacing: ".04em", textTransform: "uppercase", color: "#9aa0a8", fontWeight: 700 }}>{k}</span>
            <span style={{ flex: 1, fontWeight: 700, fontSize: "1.75cqw", color: "#17131F" }}>{v}</span>
            <span style={{ width: "1.4cqw", height: "1.4cqw", borderRadius: "50%", background: "#4ADE80" }} />
          </div>
        ))}
      </div>
    </div>
  </>);
}
