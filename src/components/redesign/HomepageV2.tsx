"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import Hero from "@/components/Hero";
import BookDemoCTA from "./BookDemoCTA";
import RedesignMobileMenu from "./RedesignMobileMenu";
import RedesignFooter from "./RedesignFooter";
import Capabilities from "./Capabilities";
import Integrations from "./Integrations";
import RevenueWorkflow from "./RevenueWorkflow";

const A = "#8B7DD8";

/* Rosebud homepage redesign (tool launch). Faithful port of the design export.
   Section 1 of N: nav + scroll-choreographed hero. More sections land next. */

const KEYFRAMES = `
@keyframes scrollpulse { 0%,100%{ transform:translateY(0); opacity:.5;} 50%{ transform:translateY(7px); opacity:1;} }
@keyframes livepulse { 0%,100%{ opacity:.35; } 50%{ opacity:1; } }
@keyframes contourdraw { to { stroke-dashoffset:0; } }
@keyframes contourdrift { 0%{ transform:translate3d(0,0,0);} 100%{ transform:translate3d(-46px,12px,0);} }
@keyframes rbWind { from{ transform:translate3d(0,0,0) scale(1.04);} to{ transform:translate3d(-1.6%,-0.5%,0) scale(1.07);} }
@keyframes rb-glass-sheen { 0%{ transform:translateX(-120%);} 60%,100%{ transform:translateX(220%);} }
.rb-ind-card{ opacity:0; transform:translateY(26px); transition:opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1), box-shadow .4s ease; }
.rb-ind-card.in{ opacity:1; transform:translateY(0); }
.rb-ind-card:hover{ transform:translateY(-8px); box-shadow:0 50px 90px -40px rgba(0,0,0,0.95), inset 0 1px 0 rgba(255,255,255,0.2); }
.rb-ind-img{ transition:transform .7s cubic-bezier(.16,1,.3,1); }
.rb-ind-card:hover .rb-ind-img{ transform:scale(1.06); }
.rbwf-march  { stroke-dasharray:4 7; animation:rbwf-marchA 1.05s linear infinite; }
.rbwf-marchB { stroke-dasharray:3 8; animation:rbwf-marchA 1.4s linear infinite; }
@keyframes rbwf-marchA { to { stroke-dashoffset:-22; } }
@keyframes rbwf-breathe { 0%,100%{ box-shadow:0 10px 28px rgba(0,0,0,.55), inset 0 1px 0 rgba(255,255,255,.05); border-color:rgba(255,255,255,.075); } 50%{ box-shadow:0 10px 32px rgba(0,0,0,.55), 0 0 0 1px rgba(139,127,245,.22), inset 0 1px 0 rgba(255,255,255,.05); border-color:rgba(139,127,245,.30); } }
@keyframes rbwf-syncdot { 0%,100%{ opacity:.25; transform:scale(.85); } 50%{ opacity:1; transform:scale(1); } }
.rb-nav-burger{ display:none; }
.rb-hero-wrap{ background:#EAE6F3 !important; }
.rb-mega-item{ transition:background .25s ease; }
.rb-mega-item:hover{ background:rgba(245,241,234,0.07); }
@media (max-width:860px){
  .rb-nav-links{ display:none !important; }
  .rb-nav-panels{ display:none !important; }
  .rb-nav-burger{ display:flex !important; }
  .rb-pad{ padding-left:18px !important; padding-right:18px !important; padding-top:78px !important; padding-bottom:78px !important; }
  .rb-uc-grid{ grid-template-columns:1fr !important; gap:28px !important; padding:0 18px !important; }
  .rb-uc-left{ min-height:0 !important; }
  .rb-uc-frame-outer{ padding:12px !important; border-radius:18px !important; }
  .rb-uc-frame{ flex-direction:column !important; min-height:0 !important; }
  .rb-uc-record{ display:none !important; }
  .rb-uc-rail{ display:none !important; }
  .rb-ch-grid{ grid-template-columns:1fr !important; gap:30px !important; padding:32px 20px !important; }
  .rb-ind-grid{ grid-template-columns:1fr 1fr !important; gap:14px !important; }
  .rb-sec-grid{ grid-template-columns:1fr !important; }
  .rb-sec-d-grid{ grid-template-columns:1fr !important; }
  .rb-sec-span2{ grid-column:auto !important; }
  .rb-voice-card{ flex:0 0 84% !important; }
  .rb-close-sec{ height:auto !important; }
  .rb-close-pin{ position:relative !important; height:auto !important; overflow:visible !important; }
  .rb-close-stage{ position:relative !important; inset:auto !important; transform:none !important; box-shadow:none !important; padding:64px 18px 84px !important; }
  .rb-foot-grid{ grid-template-columns:1fr !important; gap:28px !important; }
  .rb-foot-legal{ text-align:left !important; }
  .rb-foot-legal-list{ align-items:flex-start !important; }
  .rb-navbar{ background:rgba(12,11,14,0.82) !important; -webkit-backdrop-filter:blur(16px) !important; backdrop-filter:blur(16px) !important; border-color:rgba(255,255,255,0.1) !important; max-width:none !important; }
  .rb-hero-wrap{ background:#EAE6F3 !important; }
  .rb-hero-pin{ border-bottom-left-radius:26px !important; border-bottom-right-radius:26px !important; overflow:hidden !important; }
  .rb-close-stage{ border-bottom-left-radius:26px !important; border-bottom-right-radius:26px !important; }
}
@media (max-width:520px){
  .rb-ind-grid{ grid-template-columns:1fr !important; }
}
`;


// Nav "Product" mega-panel — the 7 capabilities (mirrors the Capabilities section).
// href: live capability pages link out to /capabilities/<slug>; the rest jump
// to the on-page Capabilities section until their pages ship.
const NAV_CAPABILITIES = [
  { head: "Capture", desc: "Speed-to-lead & omnichannel intake", href: "/capabilities/capture" },
  { head: "Qualify", desc: "Lead scoring & routing", href: "#capabilities" },
  { head: "Book", desc: "Calendar automation", href: "#capabilities" },
  { head: "Retain", desc: "Automated reminders & no-show recovery", href: "#capabilities" },
  { head: "Reactivate", desc: "Lead nurture & database reactivation", href: "#capabilities" },
  { head: "Follow through", desc: "Workflow automation & AR chase", href: "#capabilities" },
  { head: "Closed-loop attribution", desc: "Conversion & value-based bidding", href: "#capabilities" },
];
const NAV_RESOURCES = [
  { head: "About", desc: "The company behind the system", href: "/about" },
  { head: "Pricing", desc: "Discussed live on your consultation", href: "/pricing" },
];

const CHANNEL_CHIPS = [
  { name: "CRM", d: ["M4 6h16", "M4 12h16", "M4 18h16"] },
  { name: "Calendar", d: ["M4 6.5h16v13H4z", "M4 10h16", "M8 3.5v4", "M16 3.5v4"] },
  { name: "Email", d: ["M3.5 6h17v12h-17z", "M4 7l8 6 8-6"] },
  { name: "Social", d: ["M5 19l1.3-3.6a7 7 0 1 1 2.6 2.4z"] },
  { name: "SMS", d: ["M4 5h16v10H8l-4 4z"] },
  { name: "Web forms", d: ["M5 4h14v16H5z", "M8 8h8", "M8 12h8", "M8 16h5"] },
];

const STAYS = [
  { num: "01", lead: "Your team closes.", line: "The system works your demand and stops at the booking." },
  { num: "02", lead: "Your CRM stays the system of record.", line: "Your data lives in your system, not inside ours." },
  { num: "03", lead: "Your media team owns the ad account.", line: "We produce the signal. They act on it." },
];

function Toggle({ on }: { on: boolean }) {
  return (
    <span style={{ position: "relative", width: 34, height: 20, borderRadius: 999, background: on ? "#8B7DD8" : "rgba(23,19,31,0.16)", flex: "none", boxShadow: on ? "inset 0 1px 3px rgba(0,0,0,0.18)" : undefined }}>
      <span style={{ position: "absolute", top: 2, left: on ? 16 : 2, width: 16, height: 16, borderRadius: 999, background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.25)" }} />
    </span>
  );
}
function Verdict({ ok }: { ok: boolean }) {
  return <span style={{ fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 999, minWidth: 78, textAlign: "center", background: ok ? "rgba(78,138,104,0.15)" : "rgba(23,19,31,0.06)", color: ok ? "#3F7A57" : "rgba(23,19,31,0.42)" }}>{ok ? "Allowed" : "Not allowed"}</span>;
}

const VOICES = [
  { quote: "When something breaks, I message Anselm and he answers. That doesn't happen with agencies. You pay them and you're dealing with an account manager by week two.", name: "Eleanor Whitman", role: "Principal", ini: "EW" },
  { quote: "This isn't just about automation. It's about creating a better, faster experience that still feels personal and thoughtful.", name: "James Holloway", role: "Multi-Site Operator", ini: "JH" },
  { quote: "I used to do reporting on Sunday nights. I dreaded it. Now I open my laptop Monday morning and the week's already sorted. Honestly, getting my Sundays back was worth the fee on its own.", name: "Henry Caldwell", role: "Partner", ini: "HC" },
  { quote: "I'd been telling myself I'd sort this out for two years. Five weeks with Rosebud and it was done. It's one of the only things I've paid for this year that made my job smaller instead of bigger.", name: "Richard Sinclair", role: "Operations Director", ini: "RS" },
  { quote: "We had hundreds of leads sitting in a spreadsheet, not doing anything. Rosebud scored all of them, told us who was worth a call, and my team only talks to those ones now. It's obvious in hindsight but we'd never have built it ourselves.", name: "Margaret Ellsworth", role: "Founder & CEO", ini: "ME" },
  { quote: "The thing that surprised me was the follow-ups sounded like me. Two people on calls last month mentioned how nice my emails were. I didn't write them — Rosebud did.", name: "Victoria Hastings", role: "Head of Marketing", ini: "VH" },
  { quote: "I thought if I wasn't chasing, deals would die. But we closed two in the last quarter from people I'd given up on months ago. Rosebud was still in touch with them when I wasn't.", name: "Edward Harrington", role: "Managing Director", ini: "EH" },
  { quote: "My phone used to ring before I'd finished my first coffee. Now I open my inbox and three calls are already on my calendar. I just read the notes and show up.", name: "Thomas Ashford", role: "Operations Director", ini: "TA" },
];

const SERVICES = [
  { label: "Capture & respond", d: ["M4 14l2-8h12l2 8", "M4 14h4l1.5 2.5h5L16 14h4v5H4z"] },
  { label: "Qualify & triage", d: ["M4 5h16l-6 7v6l-4 2v-8z"] },
  { label: "Book into diary", d: ["M4 5.5h16v14H4z", "M4 9.5h16", "M8 3.5v4", "M16 3.5v4"] },
  { label: "Remind & reschedule", d: ["M12 4a8 8 0 1 1-5.6 2.3", "M12 8v4l2.5 2", "M6.4 6.3L4.5 4.5", "M4.5 4.5V8h3.5"] },
  { label: "Recall & nurture", d: ["M12 20s-7-4.5-7-9.6A3.9 3.9 0 0 1 12 8a3.9 3.9 0 0 1 7 2.4c0 5.1-7 9.6-7 9.6z"] },
  { label: "Write to CRM", d: ["M12 3.4c3.9 0 7 1.1 7 2.5s-3.1 2.5-7 2.5-7-1.1-7-2.5 3.1-2.5 7-2.5z", "M5 5.9v12.2c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V5.9", "M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5"] },
  { label: "Closed-loop attribution", d: ["M12 4a8 8 0 1 1-5.6 2.3", "M4.5 4.5V8h3.5", "M12 8.5a3.5 3.5 0 1 1-2.5 1"] },
];

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
const SERIF = "var(--font-cormorant), 'Cormorant Garamond', serif";

export default function HomepageV2() {
  const navBar = useRef<HTMLDivElement>(null);
  const wfBox = useRef<HTMLDivElement>(null);
  const wfInner = useRef<HTMLDivElement>(null);
  const voiceTrack = useRef<HTMLDivElement>(null);
  const closeWrap = useRef<HTMLElement>(null);
  const closeStage = useRef<HTMLDivElement>(null);
  const [voiceIdx, setVoiceIdx] = useState(0);
  // Desktop hover menus (Product / Connections / Resources). A short close
  // delay lets the pointer travel from the trigger into the panel.
  const [openMenu, setOpenMenu] = useState<null | "product" | "connections" | "resources">(null);
  const menuTimer = useRef<number | null>(null);
  const openMenuNow = (m: "product" | "connections" | "resources") => { if (menuTimer.current) window.clearTimeout(menuTimer.current); setOpenMenu(m); };
  const cancelClose = () => { if (menuTimer.current) window.clearTimeout(menuTimer.current); };
  const scheduleClose = () => { if (menuTimer.current) window.clearTimeout(menuTimer.current); menuTimer.current = window.setTimeout(() => setOpenMenu(null), 140); };
  const touchX = useRef<number | null>(null);

  // staggered reveal for industry cards
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-ind-card]"));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        const idx = cards.indexOf(el);
        el.style.transitionDelay = `${idx * 90}ms`;
        el.classList.add("in");
        window.setTimeout(() => { el.style.transitionDelay = "0ms"; }, idx * 90 + 800);
        io.unobserve(el);
      });
    }, { threshold: 0.18 });
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  // scale the fixed 920×580 workflow diagram to fit its column
  useEffect(() => {
    const scale = () => {
      const box = wfBox.current, inner = wfInner.current;
      if (box && inner) inner.style.transform = `scale(${box.clientWidth / 920})`;
    };
    const ro = new ResizeObserver(scale);
    if (wfBox.current) ro.observe(wfBox.current);
    scale();
    return () => ro.disconnect();
  }, []);

  // voices carousel — slide the track to the active index
  useEffect(() => {
    const apply = () => {
      const t = voiceTrack.current;
      if (!t || !t.children.length) return;
      const step = (t.children[0] as HTMLElement).getBoundingClientRect().width + 20;
      t.style.transform = `translateX(-${voiceIdx * step}px)`;
    };
    apply();
    const id = window.setTimeout(apply, 300);
    window.addEventListener("resize", apply);
    return () => { window.clearTimeout(id); window.removeEventListener("resize", apply); };
  }, [voiceIdx]);


  // Nav solidifies once you scroll off the hero.
  useEffect(() => {
    const onScroll = () => {
      const bar = navBar.current;
      if (!bar) return;
      // Transparent over the hero; a very light glass-morph once scrolled below it.
      const solid = window.scrollY > window.innerHeight * 0.85;
      bar.style.background = solid ? "rgba(12,11,16,0.16)" : "transparent";
      bar.style.backdropFilter = solid ? "blur(30px) saturate(1.4)" : "none";
      bar.style.setProperty("-webkit-backdrop-filter", solid ? "blur(30px) saturate(1.4)" : "none");
      bar.style.borderColor = solid ? "rgba(184,174,219,0.14)" : "transparent";
      bar.style.boxShadow = solid ? "0 20px 50px -34px rgba(20,14,34,0.6)" : "none";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close section frames out into the footer — DESKTOP only (static on mobile).
  useEffect(() => {
    let ticking = false;
    const compute = () => {
      ticking = false;
      if (window.matchMedia("(max-width: 860px)").matches) return;
      const cw = closeWrap.current, cstage = closeStage.current;
      if (!cw || !cstage) return;
      const vh = window.innerHeight;
      const r = cw.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      const total = Math.max(1, cw.offsetHeight - vh);
      const ct = clamp((clamp(-r.top / total, 0, 1) - 0.4) / 0.55, 0, 1);
      cstage.style.transform = `scale(${1 - 0.14 * ct})`;
      cstage.style.borderRadius = `${ct * 30}px`;
      cstage.style.boxShadow = `0 ${40 + ct * 50}px ${120 + ct * 90}px -40px rgba(0,0,0,0.7), 0 0 ${ct * 80}px ${ct * 34}px rgba(0,0,0,0.5)`;
    };
    const onScroll = () => { if (ticking) return; ticking = true; requestAnimationFrame(compute); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    compute();
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  // Hero frames out into Capabilities on scroll — DESKTOP only (mirrors close).
  useEffect(() => {
    let ticking = false;
    const compute = () => {
      ticking = false;
      const pin = document.querySelector<HTMLElement>(".rb-hero-pin");
      const wrap = document.querySelector<HTMLElement>(".rb-hero-wrap");
      if (!pin || !wrap) return;
      if (window.matchMedia("(max-width: 860px)").matches) { pin.style.transform = ""; pin.style.borderRadius = ""; pin.style.boxShadow = ""; return; }
      const vh = window.innerHeight;
      const r = wrap.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      const total = Math.max(1, wrap.offsetHeight - vh);
      const t = clamp((clamp(-r.top / total, 0, 1) - 0.82) / 0.18, 0, 1); // frame out in the last ~18%
      pin.style.transformOrigin = "center center";
      pin.style.transform = `scale(${1 - 0.13 * t})`;
      pin.style.borderRadius = `${t * 28}px`;
      pin.style.boxShadow = "none";
    };
    const onScroll = () => { if (ticking) return; ticking = true; requestAnimationFrame(compute); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    compute();
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  const navLink: CSSProperties = { display: "flex", alignItems: "center", gap: 7, color: "var(--nav-fg)" };

  return (
    <div className="rb-v2" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#0B0A0C", background: "#0B0A0C", overflowX: "clip" }}>
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      {/* fixed nav */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "16px clamp(16px,3vw,40px)", transition: "padding .4s ease" }}>
        <div ref={navBar} className="rb-navbar" style={{ maxWidth: 1180, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px 12px 22px", borderRadius: 999, background: "transparent", border: "1px solid transparent", transition: "background .45s ease, border-color .45s ease, box-shadow .45s ease, max-width .45s ease, padding .45s ease", ["--nav-fg" as string]: "rgba(245,241,234,0.72)", ["--nav-fg-strong" as string]: "#F5F1EA" } as CSSProperties}>
          <a href="/" aria-label="Rosebud Solutions" style={{ display: "flex", alignItems: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/rosebud-logo.png" alt="Rosebud Solutions" width={36} height={36} style={{ display: "block", width: 36, height: 36 }} />
          </a>
          <div className="rb-nav-links" style={{ display: "flex", alignItems: "center", gap: 34, fontSize: 13, letterSpacing: ".14em", textTransform: "uppercase" }}>
            <a href="#capabilities" onMouseEnter={() => openMenuNow("product")} onMouseLeave={scheduleClose} style={navLink}>Product<span style={{ fontSize: 8, opacity: 0.7 }}>▼</span></a>
            <a href="#integrations" onMouseEnter={() => openMenuNow("connections")} onMouseLeave={scheduleClose} style={navLink}>Connections<span style={{ fontSize: 8, opacity: 0.7 }}>▼</span></a>
            <a href="/about" onMouseEnter={() => openMenuNow("resources")} onMouseLeave={scheduleClose} style={navLink}>Resources<span style={{ fontSize: 8, opacity: 0.7 }}>▼</span></a>
            <a href="/pricing" style={{ padding: "9px 20px", borderRadius: 999, background: "rgba(139,125,216,0.18)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", border: "1px solid rgba(184,174,219,0.42)", color: "var(--nav-fg-strong)", fontWeight: 600, letterSpacing: ".1em", boxShadow: "0 6px 22px -10px rgba(139,125,216,0.5)" }}>Get started</a>
          </div>
          <RedesignMobileMenu />
        </div>

        {/* hover mega-panels (desktop only — hidden <860px) */}
        <div className="rb-nav-panels">
          {openMenu === "product" && (
            <div onMouseEnter={cancelClose} onMouseLeave={scheduleClose} style={{ position: "absolute", top: 80, left: "50%", transform: "translateX(-50%)", width: "min(940px,calc(100vw - 40px))", padding: "26px 28px 28px", borderRadius: 22, background: "rgba(40,37,52,0.55)", backdropFilter: "blur(44px) saturate(1.5)", WebkitBackdropFilter: "blur(44px) saturate(1.5)", border: "1px solid rgba(245,241,234,0.12)", boxShadow: "0 28px 60px -30px rgba(0,0,0,0.6)", display: "flex", gap: 28 }}>
              <div style={{ flex: 1.7, minWidth: 0 }}>
                <div style={{ fontSize: 11, letterSpacing: ".28em", textTransform: "uppercase", color: "rgba(245,241,234,0.55)", marginBottom: 14 }}>Capabilities</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 22px" }}>
                  {NAV_CAPABILITIES.map((c) => (
                    <a key={c.head} href={c.href} className="rb-mega-item" onClick={() => setOpenMenu(null)} style={{ display: "flex", flexDirection: "column", gap: 3, padding: 12, borderRadius: 10, borderBottom: "1px solid rgba(245,241,234,0.1)", textDecoration: "none" }}>
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
                  <span style={{ fontFamily: SERIF, fontSize: 22, lineHeight: 1.2, color: "#F5F1EA" }}>Turn the demand you already pay for into paying customers.</span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 7, marginTop: 4, fontSize: 12.5, color: "#B8AEDB" }}>See pricing <span style={{ fontSize: 14 }}>→</span></span>
                </div>
              </a>
            </div>
          )}
          {openMenu === "connections" && (
            <div onMouseEnter={cancelClose} onMouseLeave={scheduleClose} style={{ position: "absolute", top: 80, left: "50%", transform: "translateX(-50%)", width: "min(320px,calc(100vw - 40px))", padding: 12, borderRadius: 20, background: "rgba(40,37,52,0.55)", backdropFilter: "blur(44px) saturate(1.5)", WebkitBackdropFilter: "blur(44px) saturate(1.5)", border: "1px solid rgba(245,241,234,0.12)", boxShadow: "0 28px 60px -30px rgba(0,0,0,0.6)" }}>
              <a href="#integrations" className="rb-mega-item" onClick={() => setOpenMenu(null)} style={{ display: "flex", flexDirection: "column", gap: 3, padding: "13px 14px", borderRadius: 13, textDecoration: "none" }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: "#F5F1EA" }}>Integrations</span>
                <span style={{ fontSize: 12.5, color: "rgba(245,241,234,0.72)" }}>Connect to your tools effortlessly</span>
              </a>
            </div>
          )}
          {openMenu === "resources" && (
            <div onMouseEnter={cancelClose} onMouseLeave={scheduleClose} style={{ position: "absolute", top: 80, left: "50%", transform: "translateX(-50%)", width: "min(300px,calc(100vw - 40px))", padding: 12, borderRadius: 20, background: "rgba(40,37,52,0.55)", backdropFilter: "blur(44px) saturate(1.5)", WebkitBackdropFilter: "blur(44px) saturate(1.5)", border: "1px solid rgba(245,241,234,0.12)", boxShadow: "0 28px 60px -30px rgba(0,0,0,0.6)" }}>
              {NAV_RESOURCES.map((r) => (
                <a key={r.head} href={r.href} className="rb-mega-item" onClick={() => setOpenMenu(null)} style={{ display: "flex", flexDirection: "column", gap: 3, padding: "12px 14px", borderRadius: 13, textDecoration: "none" }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: "#F5F1EA" }}>{r.head}</span>
                  <span style={{ fontSize: 12.5, color: "rgba(245,241,234,0.72)" }}>{r.desc}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* HERO — live site component, new wording only */}
      <Hero
        headline={<>
          <span className="rb-l1">We close the gap between</span>{" "}
          <span className="rb-l2a">what you spend &amp; what you&nbsp;</span>
          <em className="rb-l2b">keep</em>
        </>}
        sub=""
        caption=""
        actions={<>
          <p className="rb-hero-lead">Rosebud Solutions handles every enquiry from the moment it arrives until it becomes a booking, a conversation with the right person, or a customer worth keeping in touch with.</p>
          <div className="rb-hero-actions">
            <BookDemoCTA label="Get started" href="/pricing" tone="dark" />
            <a className="rb-hero-contact" href="https://cal.eu/rosebudsolutions/demo" target="_blank" rel="noopener noreferrer">Book free consultation</a>
          </div>
        </>}
      />

      <div id="capabilities" style={{ scrollMarginTop: 80 }}><Capabilities /></div>

      {/* WHAT'S YOUR CHALLENGE */}
      <section className="rb-pad" style={{ position: "relative", overflow: "hidden", background: "url('/assets/challenge-bg.avif') center/cover", color: "#F5F1EA", padding: "130px 48px" }}>
        <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", top: 0, left: "-8%", width: "116%", height: "100%", opacity: 0.85 }}>
          <g fill="none" stroke="rgba(42,35,80,0.13)" strokeWidth={1} style={{ animation: "contourdrift 34s ease-in-out infinite alternate" }}>
            <path d="M -60 200 C 200 160, 420 240, 660 200 S 1120 150, 1360 210 S 1660 190, 1720 230" />
            <path d="M -60 300 C 240 260, 460 340, 700 300 S 1140 250, 1380 300 S 1660 290, 1720 320" />
            <path d="M -60 420 C 260 380, 480 460, 720 425 S 1160 360, 1400 420 S 1660 420, 1720 440" />
            <path d="M -60 560 C 280 520, 500 580, 740 550 S 1180 490, 1420 540 S 1660 540, 1720 560" />
            <path d="M -60 700 C 300 660, 520 720, 760 690 S 1200 650, 1440 680 S 1660 680, 1720 700" />
          </g>
        </svg>
        <div className="rb-ch-grid" style={{ position: "relative", zIndex: 2, maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 52, alignItems: "center", background: "rgba(12,9,16,0.55)", backdropFilter: "blur(26px)", WebkitBackdropFilter: "blur(26px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 28, padding: "clamp(34px,4.5vw,60px)", boxShadow: "0 44px 110px -44px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.08)" }}>
          <div>
            <div style={{ fontSize: 12, letterSpacing: ".28em", textTransform: "uppercase", color: "#B8AEDB", marginBottom: 18, textShadow: "0 1px 14px rgba(0,0,0,0.5)" }}>Book your free consultation</div>
            <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(40px,5vw,74px)", lineHeight: 1.0, letterSpacing: "-0.01em", textShadow: "0 2px 34px rgba(0,0,0,0.6)", margin: 0 }}>What&apos;s your<br />challenge?</h2>
            <p style={{ marginTop: 30, fontSize: 17, lineHeight: 1.6, color: "rgba(245,241,234,0.85)", maxWidth: "44ch", textShadow: "0 1px 18px rgba(0,0,0,0.55)" }}>Enquiries nobody answered. Leads gone cold. No idea what happened to either.</p>
            <p style={{ marginTop: 16, fontSize: 17, lineHeight: 1.6, color: "rgba(245,241,234,0.85)", maxWidth: "44ch", textShadow: "0 1px 18px rgba(0,0,0,0.55)" }}>We will map your funnel so your spend stops buying enquiries and starts buying customers.</p>
            <div style={{ marginTop: 34 }}><BookDemoCTA label="Get started" href="/pricing" tone="dark" /></div>
          </div>
          <div ref={wfBox} style={{ position: "relative", width: "100%", aspectRatio: "920 / 580" }}>
            <div ref={wfInner} style={{ position: "absolute", top: 0, left: 0, width: 920, height: 580, transformOrigin: "top left" }}>
              <RevenueWorkflow />
            </div>
          </div>
        </div>
      </section>

      <div id="integrations" style={{ scrollMarginTop: 80 }}><Integrations /></div>

      {/* SECURITY / COMPLIANCE bento */}
      <section className="rb-pad" style={{ position: "relative", overflow: "hidden", background: "#EDEBF3", color: "#17131F", padding: "120px 48px" }}>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ fontSize: 12, letterSpacing: ".28em", textTransform: "uppercase", color: "#8B7DD8", marginBottom: 18 }}>Security</div>
          <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(40px,5vw,74px)", lineHeight: 1.0, letterSpacing: "-0.01em", maxWidth: "20ch", margin: 0 }}>Your data stays yours, and your team stays in control</h2>

          <div className="rb-sec-grid" style={{ marginTop: 44, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {/* A — permissions */}
            <div className="rb-sec-span2" style={{ gridColumn: "span 2", background: "linear-gradient(150deg, rgba(139,125,216,0.2) 0%, rgba(184,174,216,0.08) 100%)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.4)", boxShadow: "0 26px 60px -32px rgba(23,19,31,0.4), inset 0 1px 0 rgba(255,255,255,0.6)", borderRadius: 22, padding: 30, display: "flex", flexDirection: "column" }}>
              <span style={{ width: 42, height: 42, borderRadius: 12, background: "rgba(139,125,216,0.18)", border: "1px solid rgba(139,125,216,0.28)", display: "flex", alignItems: "center", justifyContent: "center", color: "#5B4B9E" }}>
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M12 12.5v3.5" /><path d="M8.5 12a3.5 3.5 0 0 1 7 0v2.5" /><path d="M5.5 12a6.5 6.5 0 0 1 13 0v3.5" /></svg>
              </span>
              <h3 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 29, lineHeight: 1.1, marginTop: 22, color: "#17131F" }}>Your team has full visibility</h3>
              <p style={{ marginTop: 12, fontSize: 14.5, lineHeight: 1.6, color: "rgba(23,19,31,0.62)", maxWidth: "52ch" }}>Rosebud works through the access you grant. Every account it connects to is explicit, reviewable, and controlled by your team — it can do what you can do, and nothing you cannot.</p>
              <div style={{ marginTop: 26, background: "rgba(255,255,255,0.82)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.7)", borderRadius: 14, padding: "16px 18px", boxShadow: "0 22px 44px -28px rgba(23,19,31,0.45), inset 0 1px 0 rgba(255,255,255,0.9)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 12, borderBottom: "1px solid rgba(23,19,31,0.08)", fontSize: 11.5, letterSpacing: ".06em", textTransform: "uppercase", color: "rgba(91,75,158,0.7)" }}><span>Permission check</span><span>Access</span></div>
                {[["CRM access", true], ["Send follow-up", true], ["Export records", false]].map(([label, ok], i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: i === 2 ? "13px 0 3px" : "13px 0", borderBottom: i === 2 ? "none" : "1px solid rgba(23,19,31,0.06)" }}>
                    <span style={{ fontSize: 14, color: "#17131F" }}>{label as string}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}><Toggle on={ok as boolean} /><Verdict ok={ok as boolean} /></div>
                  </div>
                ))}
              </div>
            </div>

            {/* B — compliant by design */}
            <div style={{ position: "relative", overflow: "hidden", background: "linear-gradient(180deg, rgba(8,10,14,0.5) 0%, rgba(8,10,14,0.84) 100%), url('/assets/sec-compliant.avif') center/cover", color: "#F5F1EA", border: "1px solid rgba(255,255,255,0.12)", boxShadow: "0 30px 66px -32px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.14)", borderRadius: 22, padding: 30, display: "flex", flexDirection: "column" }}>
              <span style={{ width: 42, height: 42, borderRadius: 12, background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.14)", display: "flex", alignItems: "center", justifyContent: "center", color: "#F5F1EA" }}>
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"><path d="M12 3l7 3v5c0 4.2-3 7.5-7 8.6C8 18.5 5 15.2 5 11V6l7-3z" /></svg>
              </span>
              <h3 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 26, lineHeight: 1.1, marginTop: 22, textShadow: "0 2px 18px rgba(0,0,0,0.5)" }}>Compliant by design</h3>
              <p style={{ marginTop: 12, fontSize: 14, lineHeight: 1.55, color: "rgba(245,241,234,0.82)", textShadow: "0 1px 10px rgba(0,0,0,0.4)" }}>Built for sensitive revenue workflows and explicit team control — first-party records only.</p>
              <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, flex: 1, alignContent: "end" }}>
                <div style={{ position: "relative", background: "rgba(255,255,255,0.08)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.16)", borderRadius: 12, minHeight: 118, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="46" height="52" viewBox="0 0 46 52" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.1"><path d="M23 4l17 6.5v12c0 10-7.5 16.5-17 19.5C13.5 39 6 32.5 6 22.5v-12L23 4z" /></svg>
                  <span style={{ position: "absolute", fontFamily: SERIF, fontWeight: 600, fontSize: 15, letterSpacing: ".04em", color: "#FFFFFF" }}>GDPR</span>
                </div>
                <div style={{ position: "relative", background: "rgba(255,255,255,0.08)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.16)", borderRadius: 12, minHeight: 118, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="52" height="52" viewBox="0 0 52 52" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.1"><circle cx="26" cy="26" r="21" /><circle cx="26" cy="26" r="16.5" strokeDasharray="1 3.2" /></svg>
                  <span style={{ position: "absolute", display: "flex", flexDirection: "column", alignItems: "center" }}><span style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 14, color: "#FFFFFF" }}>CCPA</span><span style={{ fontSize: 6.5, letterSpacing: ".18em", color: "rgba(245,241,234,0.6)", marginTop: 2 }}>COMPLIANT</span></span>
                </div>
              </div>
            </div>

            {/* C — data stays in your systems */}
            <div style={{ position: "relative", overflow: "hidden", background: "linear-gradient(180deg, rgba(8,10,14,0.46) 0%, rgba(8,10,14,0.82) 100%), url('/assets/sec-data.avif') center/cover", color: "#F5F1EA", border: "1px solid rgba(255,255,255,0.12)", boxShadow: "0 30px 66px -32px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.14)", borderRadius: 22, padding: 30, display: "flex", flexDirection: "column" }}>
              <span style={{ width: 42, height: 42, borderRadius: 12, background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.14)", display: "flex", alignItems: "center", justifyContent: "center", color: "#F5F1EA" }}>
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
              </span>
              <h3 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 26, lineHeight: 1.1, marginTop: 22, textShadow: "0 2px 18px rgba(0,0,0,0.5)" }}>Your data stays in your systems</h3>
              <p style={{ marginTop: 12, fontSize: 14, lineHeight: 1.55, color: "rgba(245,241,234,0.82)", textShadow: "0 1px 10px rgba(0,0,0,0.4)" }}>Your customer records and enquiries live in your own CRM and calendar, exactly where they already are.</p>
              <div style={{ marginTop: "auto", paddingTop: 24 }}>
                <div style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 12, padding: 15, boxShadow: "0 18px 40px -26px rgba(0,0,0,0.7)" }}>
                  <div style={{ height: 7, width: "70%", borderRadius: 4, background: "rgba(255,255,255,0.4)" }} />
                  <div style={{ height: 7, width: "90%", borderRadius: 4, background: "rgba(255,255,255,0.24)", marginTop: 9 }} />
                  <div style={{ height: 7, width: "55%", borderRadius: 4, background: "rgba(255,255,255,0.24)", marginTop: 9 }} />
                  <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
                    <span style={{ fontSize: 11, padding: "4px 11px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.28)", color: "#F5F1EA" }}>CRM</span>
                    <span style={{ fontSize: 11, padding: "4px 11px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.28)", color: "#F5F1EA" }}>Calendar</span>
                  </div>
                </div>
              </div>
            </div>

            {/* D — no model training */}
            <div className="rb-sec-span2" style={{ gridColumn: "span 2", position: "relative", overflow: "hidden", background: "radial-gradient(120% 95% at 88% 0%, rgba(139,125,216,0.24) 0%, transparent 52%), radial-gradient(90% 80% at 5% 105%, rgba(232,129,74,0.14) 0%, transparent 55%), linear-gradient(158deg, rgba(30,23,42,0.9) 0%, rgba(12,9,16,0.92) 100%)", color: "#F5F1EA", border: "1px solid rgba(184,174,219,0.16)", boxShadow: "0 30px 66px -32px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.12)", borderRadius: 22, padding: 30, display: "flex", flexDirection: "column" }}>
              <span style={{ width: 42, height: 42, borderRadius: 12, background: "rgba(139,125,216,0.16)", border: "1px solid rgba(184,174,219,0.24)", display: "flex", alignItems: "center", justifyContent: "center", color: "#B8AEDB" }}>
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"><path d="M12 3l7 3v5c0 4.2-3 7.5-7 8.6C8 18.5 5 15.2 5 11V6l7-3z" /><path d="M9 11.5l2 2 4-4" /></svg>
              </span>
              <h3 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 29, lineHeight: 1.1, marginTop: 22 }}>{"We don't train any model on your data"}</h3>
              <p style={{ marginTop: 12, fontSize: 14.5, lineHeight: 1.6, color: "rgba(245,241,234,0.66)", maxWidth: "60ch" }}>{"Your enquiries, your customers, your records stay private to your business — never used to train any model, ours or anyone else's."}</p>
              <div className="rb-sec-d-grid" style={{ marginTop: "auto", paddingTop: 26, display: "grid", gridTemplateColumns: "1.35fr 1fr", gap: 16, alignItems: "stretch" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 9 }}>
                  {CHANNEL_CHIPS.map((c) => (
                    <span key={c.name} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, padding: "11px 13px", borderRadius: 11, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(184,174,219,0.16)", color: "#EDE9F5" }}>
                      <span style={{ width: 26, height: 26, flex: "none", borderRadius: 8, background: "rgba(139,125,216,0.16)", border: "1px solid rgba(184,174,219,0.22)", display: "flex", alignItems: "center", justifyContent: "center", color: "#B8AEDB" }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{c.d.map((p, k) => <path key={k} d={p} />)}</svg>
                      </span>{c.name}
                    </span>
                  ))}
                </div>
                <div style={{ position: "relative", overflow: "hidden", borderRadius: 14, background: "radial-gradient(120% 100% at 50% 0%, rgba(139,125,216,0.28) 0%, rgba(139,125,216,0.06) 60%, transparent 100%)", border: "1px solid rgba(184,174,219,0.3)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "22px 18px", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)" }}>
                  <span style={{ width: 52, height: 52, borderRadius: 15, background: "rgba(139,125,216,0.22)", border: "1px solid rgba(184,174,219,0.36)", display: "flex", alignItems: "center", justifyContent: "center", color: "#EDE9F5", boxShadow: "0 0 30px rgba(139,125,216,0.4)" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /><path d="M12 15v2" /></svg>
                  </span>
                  <div style={{ fontFamily: SERIF, fontSize: 23, lineHeight: 1.15, marginTop: 14, color: "#F5F1EA" }}>Sealed in your systems</div>
                </div>
              </div>
            </div>
          </div>

          {/* what stays yours */}
          <div style={{ marginTop: 60, paddingTop: 44, borderTop: "1px solid rgba(23,19,31,0.12)" }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 30 }}>
              <div style={{ fontSize: 12, letterSpacing: ".28em", textTransform: "uppercase", color: "#8B7DD8" }}>What stays yours</div>
              <div style={{ fontSize: 14, color: "rgba(23,19,31,0.5)", maxWidth: "34ch" }}>Rosebud runs the work. The outcomes, the records and the relationships remain yours.</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 44 }}>
              {STAYS.map((y) => (
                <div key={y.num} style={{ position: "relative", paddingTop: 22, borderTop: "2px solid rgba(139,125,216,0.4)" }}>
                  <span style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 500, color: "#8B7DD8", letterSpacing: ".04em" }}>{y.num}</span>
                  <div style={{ fontFamily: SERIF, fontSize: 16, fontWeight: 600, lineHeight: 1.4, marginTop: 16, color: "#17131F" }}>{y.lead}</div>
                  <div style={{ fontSize: 14, lineHeight: 1.62, color: "rgba(23,19,31,0.6)", marginTop: 8, maxWidth: "32ch" }}>{y.line}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VOICES */}
      <section className="rb-pad" style={{ position: "relative", overflow: "hidden", background: "#080609", color: "#F5F1EA", padding: "130px 48px" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/topo.jpg" alt="" style={{ position: "absolute", inset: "-4%", width: "108%", height: "108%", objectFit: "cover", filter: "brightness(0.4) saturate(0.85)" }} />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 90% at 50% 40%, rgba(8,6,10,0.55) 0%, rgba(8,6,10,0.82) 65%, #080609 100%)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1220, margin: "0 auto" }}>
          <div style={{ fontSize: 12, letterSpacing: ".28em", textTransform: "uppercase", color: "#B8AEDB", marginBottom: 18 }}>Voices</div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
            <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(40px,5vw,74px)", lineHeight: 1.0, letterSpacing: "-0.01em", margin: 0 }}>In their words, not ours</h2>
            <div style={{ display: "inline-flex", alignItems: "center", borderRadius: 999, background: "rgba(255,255,255,0.06)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.16)", overflow: "hidden" }}>
              <button type="button" onClick={() => setVoiceIdx((i) => Math.max(0, i - 1))} aria-label="Previous" style={{ width: 56, height: 50, background: "transparent", border: "none", color: "#B8AEDB", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", opacity: voiceIdx <= 0 ? 0.3 : 1 }}>
                <svg viewBox="0 0 42 12" width="24" height="10" fill="none" style={{ overflow: "visible" }}><path d="M42 6 L10 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /><path d="M16 1.5 L10 6 L16 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <span style={{ width: 1, height: 26, background: "rgba(255,255,255,0.16)" }} />
              <button type="button" onClick={() => setVoiceIdx((i) => Math.min(VOICES.length - 2, i + 1))} aria-label="Next" style={{ width: 56, height: 50, background: "transparent", border: "none", color: "#B8AEDB", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", opacity: voiceIdx >= VOICES.length - 2 ? 0.3 : 1 }}>
                <svg viewBox="0 0 42 12" width="24" height="10" fill="none" style={{ overflow: "visible" }}><path d="M0 6 L32 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /><path d="M26 1.5 L32 6 L26 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
          </div>
          <div
            style={{ marginTop: 44, overflow: "hidden" }}
            onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              if (touchX.current == null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              touchX.current = null;
              if (dx < -40) setVoiceIdx((i) => Math.min(VOICES.length - 2, i + 1));
              else if (dx > 40) setVoiceIdx((i) => Math.max(0, i - 1));
            }}
          >
            <div ref={voiceTrack} style={{ display: "flex", gap: 20, transition: "transform 0.7s cubic-bezier(.16,1,.3,1)" }}>
              {VOICES.map((v, i) => {
                const focused = i === voiceIdx || i === voiceIdx + 1;
                return (
                  <div key={i} className="rb-voice-card" style={{ flex: "0 0 46%", opacity: focused ? 1 : 0.42, transform: focused ? "none" : "scale(0.94)", transition: "opacity 0.5s ease, transform 0.5s ease", transformOrigin: "center" }}>
                    <div style={{ position: "relative", height: "100%", minHeight: 360, background: "rgba(20,16,26,0.55)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(184,174,219,0.16)", boxShadow: "0 30px 66px -34px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.08)", borderRadius: 22, padding: "36px 34px", display: "flex", flexDirection: "column" }}>
                      <div style={{ fontFamily: SERIF, fontSize: 60, lineHeight: 0.8, color: "rgba(184,174,219,0.5)", height: 34 }}>&ldquo;</div>
                      <div style={{ fontFamily: SERIF, fontSize: 22, lineHeight: 1.4, color: "#EDE9F5", marginTop: 14, flex: 1 }}>{v.quote}</div>
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
            <div style={{ fontFamily: SERIF, fontSize: 20, letterSpacing: ".04em", color: "#B8AEDB" }}>{`${voiceIdx + 1 < 10 ? "0" : ""}${voiceIdx + 1} — 0${VOICES.length}`}</div>
            <div style={{ width: 200, height: 2, background: "rgba(255,255,255,0.14)", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ height: "100%", background: "#B8AEDB", borderRadius: 2, width: `${((voiceIdx + 1) / (VOICES.length - 1)) * 100}%`, transition: "width 0.6s cubic-bezier(.16,1,.3,1)" }} />
            </div>
          </div>
        </div>
      </section>

      {/* CLOSE */}
      <section ref={closeWrap} className="rb-close-sec" style={{ position: "relative", height: "200vh", background: "#000000" }}>
        <div className="rb-close-pin" style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", background: "#000000" }}>
          <div ref={closeStage} className="rb-close-stage" style={{ position: "absolute", inset: 0, overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "80px 48px", background: "linear-gradient(150deg, #EFE7F1 0%, #F3E7DB 52%, #F8E0CE 100%)", color: "#241528", transformOrigin: "center center", willChange: "transform" }}>
            <svg viewBox="0 0 1440 500" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.5 }}>
              <g fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" style={{ animation: "contourdrift 42s ease-in-out infinite alternate" }}>
                <path d="M-40,180 C300,120 560,340 840,300 C1120,260 1260,120 1500,200" /><path d="M-40,360 C300,320 560,480 840,440 C1120,400 1260,320 1500,380" />
              </g>
            </svg>
            <div aria-hidden style={{ position: "absolute", top: "8%", left: "50%", transform: "translateX(-50%)", width: 900, height: 520, background: "radial-gradient(closest-side, rgba(139,125,216,0.28), rgba(139,125,216,0) 72%)", pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 2, maxWidth: 920, margin: "0 auto" }}>
              <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(40px,5vw,74px)", lineHeight: 1.02, letterSpacing: "-0.01em", margin: 0 }}>Stop buying enquiries. Start buying <em style={{ color: A, fontStyle: "italic", fontWeight: 500 }}>customers</em>.</h2>
              <p style={{ marginTop: 26, fontSize: 18, lineHeight: 1.6, color: "rgba(36,21,40,0.66)", maxWidth: "56ch", marginLeft: "auto", marginRight: "auto" }}>See the system run on your own pipeline. Live in five weeks, working every enquiry from first contact to booked appointment.</p>
              <div style={{ marginTop: 44, display: "inline-flex", flexWrap: "wrap", justifyContent: "center", gap: "18px 26px", padding: "26px 34px", borderRadius: 24, background: "rgba(255,255,255,0.4)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,0.6)", boxShadow: "0 30px 70px -40px rgba(36,21,40,0.5), inset 0 1px 0 rgba(255,255,255,0.7)" }}>
                {SERVICES.map((s) => (
                  <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 11, width: 92 }}>
                    <div style={{ width: 46, height: 46, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", color: "#2E2033", background: "#FFFFFF", border: "1px solid rgba(36,21,40,0.08)", boxShadow: "0 10px 24px -14px rgba(36,21,40,0.55), inset 0 1px 0 rgba(255,255,255,0.9)" }}>
                      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{s.d.map((p, k) => <path key={k} d={p} />)}</svg>
                    </div>
                    <div style={{ fontSize: 12, lineHeight: 1.3, color: "rgba(36,21,40,0.62)" }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14, marginTop: 40 }}>
                <BookDemoCTA label="Get started" href="/pricing" tone="light" />
                <a href="https://cal.eu/rosebudsolutions/demo" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", background: "rgba(36,21,40,0.05)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid rgba(36,21,40,0.2)", color: "#241528", padding: "14px 27px", borderRadius: 999, fontSize: 15, fontWeight: 500, textDecoration: "none" }}>Book free consultation</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <RedesignFooter />
    </div>
  );
}
