"use client";
import { useEffect, useRef, type CSSProperties } from "react";
import BookDemoCTA from "./BookDemoCTA";

/* Rosebud homepage redesign (tool launch). Faithful port of the design export.
   Section 1 of N: nav + scroll-choreographed hero. More sections land next. */

const KEYFRAMES = `
@keyframes scrollpulse { 0%,100%{ transform:translateY(0); opacity:.5;} 50%{ transform:translateY(7px); opacity:1;} }
@keyframes livepulse { 0%,100%{ opacity:.35; } 50%{ opacity:1; } }
@keyframes contourdraw { to { stroke-dashoffset:0; } }
@keyframes contourdrift { 0%{ transform:translate3d(0,0,0);} 100%{ transform:translate3d(-46px,12px,0);} }
@keyframes rbWind { from{ transform:translate3d(0,0,0) scale(1.04);} to{ transform:translate3d(-1.6%,-0.5%,0) scale(1.07);} }
@keyframes rb-glass-sheen { 0%{ transform:translateX(-120%);} 60%,100%{ transform:translateX(220%);} }
`;

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
const SERIF = "var(--font-cormorant), 'Cormorant Garamond', serif";

export default function HomepageV2() {
  const heroWrap = useRef<HTMLElement>(null);
  const heroPin = useRef<HTMLDivElement>(null);
  const heroStage = useRef<HTMLDivElement>(null);
  const heroTopo = useRef<HTMLDivElement>(null);
  const heroContours = useRef<SVGSVGElement>(null);
  const heroLit = useRef<SVGPathElement>(null);
  const heroDot = useRef<SVGGElement>(null);
  const heroCue = useRef<HTMLDivElement>(null);
  const navBar = useRef<HTMLDivElement>(null);

  const heroLen = useRef(0);
  const heroCurP = useRef(0);
  const heroTargetP = useRef(0);

  useEffect(() => {
    const lit = heroLit.current;
    if (lit) {
      heroLen.current = lit.getTotalLength();
      lit.style.strokeDasharray = String(heroLen.current);
      lit.style.strokeDashoffset = String(heroLen.current);
      const pt = lit.getPointAtLength(0);
      heroDot.current?.setAttribute("transform", `translate(${pt.x},${pt.y})`);
    }
    let raf = 0;
    const tick = () => {
      const l = heroLit.current, wrapEl = heroWrap.current;
      if (l && wrapEl) {
        const wr = wrapEl.getBoundingClientRect();
        const wrange = Math.max(1, wrapEl.offsetHeight - window.innerHeight);
        heroTargetP.current = clamp(-wr.top / wrange, 0, 1);
        heroCurP.current += (heroTargetP.current - heroCurP.current) * 0.14;
        const walked = heroLen.current * heroCurP.current;
        const pt = l.getPointAtLength(walked);
        const dot = heroDot.current;
        if (dot) { dot.setAttribute("transform", `translate(${pt.x},${pt.y})`); dot.style.opacity = heroCurP.current > 0.94 ? "0" : "1"; }
        l.style.strokeDashoffset = String(heroLen.current - walked);
        const P = heroCurP.current;
        if (heroTopo.current) heroTopo.current.style.transform = `translateY(${-150 * P}px) scale(${1 + 0.14 * P})`;
        if (heroContours.current) { heroContours.current.style.transform = `translateY(${-60 * P}px)`; heroContours.current.style.opacity = String(1 - 0.65 * P); }
        const stage = heroStage.current;
        if (stage) {
          const t = clamp((P - 0.8) / 0.2, 0, 1);
          stage.style.transform = `scale(${1 - 0.14 * t})`;
          stage.style.borderRadius = `${t * 28}px`;
          stage.style.boxShadow = `0 ${40 + t * 40}px ${120 + t * 80}px -40px rgba(23,19,31,${0.28 + 0.16 * t}), 0 0 ${t * 90}px ${t * 55}px rgba(234,230,243,${t * 0.6})`;
          if (heroPin.current) heroPin.current.style.background = `rgb(${Math.round(8 + 226 * t)},${Math.round(6 + 224 * t)},${Math.round(9 + 234 * t)})`;
        }
        const bar = navBar.current;
        if (bar) {
          const solid = P > 0.9;
          bar.style.background = solid ? "linear-gradient(180deg, rgba(38,30,54,0.72) 0%, rgba(16,12,24,0.6) 100%)" : "transparent";
          bar.style.backdropFilter = solid ? "blur(26px) saturate(1.4)" : "none";
          bar.style.setProperty("-webkit-backdrop-filter", solid ? "blur(26px) saturate(1.4)" : "none");
          bar.style.borderColor = solid ? "rgba(184,174,219,0.22)" : "transparent";
          bar.style.boxShadow = solid ? "0 24px 60px -28px rgba(20,14,34,0.75), 0 2px 10px -4px rgba(139,125,216,0.28), inset 0 1px 0 rgba(255,255,255,0.16), inset 0 -1px 0 rgba(0,0,0,0.2)" : "none";
          bar.style.maxWidth = solid ? "980px" : "1180px";
          bar.style.padding = solid ? "9px 12px 9px 22px" : "12px 14px 12px 22px";
        }
        if (heroCue.current) heroCue.current.style.opacity = String(1 - clamp((P - 0.1) / 0.15, 0, 1));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const navLink: CSSProperties = { display: "flex", alignItems: "center", gap: 7, color: "var(--nav-fg)" };

  return (
    <div style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#0B0A0C", background: "#0B0A0C" }}>
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      {/* fixed nav */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "16px clamp(16px,3vw,40px)", transition: "padding .4s ease" }}>
        <div ref={navBar} style={{ maxWidth: 1180, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px 12px 22px", borderRadius: 999, background: "transparent", border: "1px solid transparent", transition: "background .45s ease, border-color .45s ease, box-shadow .45s ease, max-width .45s ease, padding .45s ease", ["--nav-fg" as string]: "rgba(245,241,234,0.72)", ["--nav-fg-strong" as string]: "#F5F1EA" } as CSSProperties}>
          <a href="/" aria-label="Rosebud Solutions" style={{ display: "flex", alignItems: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/rosebud-logo.png" alt="Rosebud Solutions" width={36} height={36} style={{ display: "block", width: 36, height: 36 }} />
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 34, fontSize: 13, letterSpacing: ".14em", textTransform: "uppercase" }}>
            <a href="#" style={navLink}>Solutions<span style={{ fontSize: 8, opacity: 0.7 }}>▼</span></a>
            <a href="#" style={navLink}>Resources<span style={{ fontSize: 8, opacity: 0.7 }}>▼</span></a>
            <a href="https://cal.eu/rosebudsolutions/demo" style={{ padding: "9px 20px", borderRadius: 999, background: "rgba(139,125,216,0.18)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", border: "1px solid rgba(184,174,219,0.42)", color: "var(--nav-fg-strong)", fontWeight: 600, letterSpacing: ".1em", boxShadow: "0 6px 22px -10px rgba(139,125,216,0.5)" }}>Book free consultation</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section ref={heroWrap} style={{ position: "relative", height: "300vh", background: "#EAE6F3", color: "#F5F1EA" }}>
        <div ref={heroPin} style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", background: "#080609" }}>
          <div ref={heroStage} style={{ position: "absolute", inset: 0, overflow: "hidden", display: "flex", flexDirection: "column", background: "#080609", transformOrigin: "center center", willChange: "transform", boxShadow: "0 60px 140px -50px rgba(23,19,31,0.45), 0 0 0 1px rgba(23,19,31,0.09)" }}>

            <div ref={heroTopo} aria-hidden style={{ position: "absolute", inset: "-4%", willChange: "transform", animation: "rbWind 45s ease-in-out 2s infinite alternate" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/topo.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.68) saturate(0.92)" }} />
            </div>

            <svg ref={heroContours} viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", mixBlendMode: "screen", willChange: "transform" }}>
              <g fill="none" stroke="rgba(245,241,234,0.18)" strokeWidth={1}>
                {[[180, ".60s", "30s"], [240, ".72s", "32s"], [320, ".82s", "34s"], [420, ".92s", "36s"], [540, "1.02s", "34s"], [650, "1.12s", "32s"], [740, "1.22s", "30s"]].map(([y, dly, drift], i) => (
                  <path key={i} style={{ strokeDasharray: 2400, strokeDashoffset: 2400, animation: `contourdraw 2s ease ${dly} forwards, contourdrift ${drift} ease-in-out 2.8s infinite alternate` }}
                    d={`M -50 ${y} C ${200 + i * 20} ${(y as number) - 40}, ${420 + i * 20} ${(y as number) + 40}, ${640 + i * 20} ${y} S ${1080 + i * 20} ${(y as number) - 50}, ${1300 + i * 20} ${(y as number) + 10} S ${1580 + i * 20} ${(y as number) - 10}, 1680 ${(y as number) + 30}`} />
                ))}
              </g>
            </svg>

            <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
              <defs>
                <linearGradient id="rb-trail" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="rgba(139,125,216,0)" /><stop offset="35%" stopColor="rgba(139,125,216,0.45)" />
                  <stop offset="80%" stopColor="rgba(184,174,219,0.9)" /><stop offset="100%" stopColor="#ffffff" />
                </linearGradient>
                <filter id="rb-glow" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="8" result="b1" /><feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b2" />
                  <feMerge><feMergeNode in="b1" /><feMergeNode in="b2" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              <path d="M 1545 250 C 1250 330, 1120 560, 850 545 C 640 533, 520 430, 430 520 C 330 620, 300 780, 150 700" fill="none" stroke="rgba(245,241,234,0.14)" strokeWidth={1} strokeDasharray="2 5" strokeLinecap="round" />
              <path ref={heroLit} d="M 1545 250 C 1250 330, 1120 560, 850 545 C 640 533, 520 430, 430 520 C 330 620, 300 780, 150 700" fill="none" stroke="url(#rb-trail)" strokeWidth={2.6} strokeLinecap="round" filter="url(#rb-glow)" />
              <g fill="none" stroke="rgba(184,174,219,0.32)" strokeWidth={1}>
                <circle cx={1545} cy={250} r={20} /><circle cx={1545} cy={250} r={3} fill="rgba(184,174,219,0.9)" stroke="none" />
                <circle cx={850} cy={545} r={20} /><circle cx={850} cy={545} r={3} fill="rgba(184,174,219,0.9)" stroke="none" />
                <circle cx={150} cy={700} r={20} /><circle cx={150} cy={700} r={3} fill="rgba(184,174,219,0.9)" stroke="none" />
              </g>
              <g ref={heroDot} style={{ filter: "drop-shadow(0 0 10px rgba(255,255,255,0.95)) drop-shadow(0 0 26px rgba(184,174,219,0.85)) drop-shadow(0 0 50px rgba(139,125,216,0.55))" }}>
                <circle r={44} fill="rgba(139,125,216,0.08)" /><circle r={26} fill="rgba(184,174,219,0.22)" />
                <circle r={8} fill="#F5F1EA" /><circle r={3} fill="#FFFFFF" />
              </g>
            </svg>

            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(75% 60% at 50% 46%, rgba(8,6,10,0.6) 0%, rgba(8,6,10,0.15) 42%, transparent 62%), radial-gradient(125% 95% at 50% 45%, transparent 40%, rgba(0,0,0,0.7) 100%)", pointerEvents: "none" }} />

            <div style={{ position: "relative", zIndex: 10, flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "120px 24px 80px" }}>
              <div style={{ fontSize: 12, letterSpacing: ".34em", textTransform: "uppercase", color: "rgba(245,241,234,0.6)", marginBottom: 34 }}>Rosebud Solutions</div>
              <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(40px,5vw,74px)", lineHeight: 1.06, letterSpacing: "-0.015em", margin: 0, maxWidth: "16ch", textShadow: "0 6px 50px rgba(0,0,0,0.85)" }}>
                We close the gap between what you spend and what you <em style={{ fontStyle: "italic", fontWeight: 400, color: "#B8AEDB" }}>keep</em>.
              </h1>
              <p style={{ marginTop: 26, maxWidth: 640, fontSize: "clamp(16px,1.4vw,19px)", lineHeight: 1.6, color: "rgba(245,241,234,0.72)" }}>
                Rosebud Solutions handles every enquiry from the moment it arrives until it becomes a booking, a conversation with the right person, or a customer worth keeping in touch with.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 28, marginTop: 38 }}>
                <BookDemoCTA label="Book free consultation" href="https://cal.eu/rosebudsolutions/demo" tone="dark" />
                <a href="https://cal.eu/rosebudsolutions/30min" style={{ display: "inline-flex", alignItems: "center", background: "rgba(255,255,255,0.06)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)", color: "#F5F1EA", padding: "14px 26px", borderRadius: 999, fontSize: 15, fontWeight: 500 }}>Contact sales</a>
              </div>
            </div>

            <div ref={heroCue} style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, paddingBottom: 34 }}>
              <div style={{ fontSize: 11, letterSpacing: ".32em", textTransform: "uppercase", color: "rgba(245,241,234,0.45)" }}>Scroll</div>
              <div style={{ width: 1, height: 26, background: "linear-gradient(rgba(245,241,234,0.5), transparent)", animation: "scrollpulse 1.8s ease-in-out infinite" }} />
            </div>
          </div>
        </div>
      </section>

      {/* more sections land next (use-cases, challenge, industries, security, voices, workflow, close) */}
    </div>
  );
}
