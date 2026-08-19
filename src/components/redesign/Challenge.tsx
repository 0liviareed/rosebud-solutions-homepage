"use client";
import { useEffect, useRef, useState } from "react";
import BookDemoCTA from "./BookDemoCTA";

const SERIF = "var(--font-cormorant), 'Cormorant Garamond', serif";
const A = "#B8AEDB";

// Tuning constants — these four must stay in step or the connector line
// stops meeting the active tab label (see rosebud-process-section.txt).
const TAB_ROW_HEIGHT = 76;
const SLIDE_OFFSET = 22;
const CONNECTOR_TOP = 54;
const CARD_PADDING_TOP = 84;

type Step = { num: string; label: string; title: string; body: string; note: string };

const STEPS: Step[] = [
  { num: "01", label: "Connect", title: "Fits directly into your existing stack", body: "Maps to your website, social channels, and CRM in clicks. Adopts your brand tone and qualification rules instantly.", note: "Zero platform switching for your team." },
  { num: "02", label: "Nurture", title: "Stays on every prospect until they respond", body: "Answers inquiries in seconds, qualifies intent, and automatically re-engages prospects who go quiet.", note: "No lead is ever left unread." },
  { num: "03", label: "Convert", title: "Turns interest into confirmed appointments", body: "Schedules qualified buyers directly onto your calendar and handles reminders to reduce no-shows.", note: "Your team steps in only to take the call." },
];

export default function Challenge() {
  const secRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const jumpTo = (i: number) => {
    const el = secRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pageTop = rect.top + window.scrollY;
    const total = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: pageTop + ((i + 0.42) / STEPS.length) * total, behavior: "smooth" });
  };

  useEffect(() => {
    let ticking = false;
    const compute = () => {
      ticking = false;
      const el = secRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const p = Math.min(0.9999, Math.max(0, -rect.top / total));
      const i = Math.min(STEPS.length - 1, Math.floor(p * STEPS.length));
      setActive((prev) => (prev !== i ? i : prev));
    };
    const onScroll = () => { if (ticking) return; ticking = true; requestAnimationFrame(compute); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    compute();
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  const step = STEPS[active];

  return (
    <section ref={secRef} data-navtheme="dark" style={{ position: "relative", height: "300vh", background: "#0A070E", color: "#F5F1EA" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .rb-ch-grid2 { display: grid; grid-template-columns: 0.78fr 1.22fr; gap: clamp(26px,3.6vw,56px); align-items: stretch; }
        @media (max-width: 900px) {
          /* The connector line and the card's 84px top padding exist purely
             to align with the tab label across the desktop two-column row.
             Once the layout stacks to one column there's nothing for the
             line to connect to, so both just eat space — drop the line and
             let the card use normal padding instead of the reserved gap. */
          .rb-ch-grid2 { grid-template-columns: 1fr !important; gap: 40px !important; }
          .rb-ch-pad2 { padding-left: 20px !important; padding-right: 20px !important; }
          .rb-ch-left2 { gap: 28px !important; }
          .rb-ch-connector2 { display: none !important; }
          .rb-ch-card2 { padding: 32px clamp(22px,5vw,32px) 28px !important; }
          .rb-ch-card-rule2 { display: none !important; }
        }
      ` }} />
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", display: "flex", alignItems: "center", background: "url('/assets/challenge-bg.avif') center/cover" }}>
        <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.85 }}>
          <g fill="none" stroke="rgba(42,35,80,0.13)" strokeWidth={1} style={{ animation: "contourdrift 34s ease-in-out infinite alternate" }}>
            <path d="M -60 200 C 200 160, 420 240, 660 200 S 1120 150, 1360 210 S 1660 190, 1720 230" />
            <path d="M -60 300 C 240 260, 460 340, 700 300 S 1140 250, 1380 300 S 1660 290, 1720 320" />
            <path d="M -60 420 C 260 380, 480 460, 720 425 S 1160 360, 1400 420 S 1660 420, 1720 440" />
            <path d="M -60 560 C 280 520, 500 580, 740 550 S 1180 490, 1420 540 S 1660 540, 1720 560" />
            <path d="M -60 700 C 300 660, 520 720, 760 690 S 1200 650, 1440 680 S 1660 680, 1720 700" />
          </g>
        </svg>

        <div className="rb-ch-pad2" style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 1180, margin: "0 auto", padding: "0 48px" }}>
          <div style={{ fontSize: 12, letterSpacing: ".28em", textTransform: "uppercase", color: "#DDD5F5", textShadow: "0 2px 16px rgba(10,7,14,0.85), 0 1px 3px rgba(10,7,14,0.8)" }}>From inquiry to calendar</div>
          <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(30px,3.5vw,50px)", lineHeight: 1.06, letterSpacing: "-0.01em", margin: "14px 0 0", textShadow: "0 3px 26px rgba(10,7,14,0.9), 0 1px 4px rgba(10,7,14,0.75)" }}>Your inbound pipeline, managed to the booking.</h2>
          <p style={{ margin: "14px 0 0", fontSize: 16, lineHeight: 1.55, color: "rgba(245,241,234,0.92)", maxWidth: "60ch", textShadow: "0 2px 18px rgba(10,7,14,0.9), 0 1px 3px rgba(10,7,14,0.8)", textWrap: "pretty" }}>Rosebud turns raw inbound demand into qualified, confirmed meetings on your team&apos;s calendar.</p>

          <div className="rb-ch-grid2" style={{ marginTop: "clamp(20px,2.4vw,38px)" }}>
            {/* LEFT — vertical tab list, connector, CTA */}
            <div className="rb-ch-left2" style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "clamp(20px,2.4vw,32px)" }}>
              <div style={{ position: "relative", height: 186, overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, display: "flex", flexDirection: "column", transition: "transform .6s cubic-bezier(.4,0,.2,1)", transform: `translateY(-${active * TAB_ROW_HEIGHT + SLIDE_OFFSET}px)` }}>
                  {STEPS.map((t, i) => {
                    const on = i === active;
                    return (
                      <button key={t.num} onClick={() => jumpTo(i)} style={{
                        display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "stretch",
                        height: TAB_ROW_HEIGHT, boxSizing: "border-box", padding: "0 0 16px", margin: 0, border: "none",
                        background: "none", cursor: "pointer", textAlign: "left",
                        transition: "color .5s ease, opacity .5s ease, filter .5s ease",
                        textShadow: "0 2px 16px rgba(10,7,14,0.9), 0 1px 3px rgba(10,7,14,0.8)",
                        color: on ? "#E9E3FA" : "rgba(245,241,234,0.42)",
                        opacity: on ? 1 : 0.42,
                        filter: on ? "none" : "saturate(0.45)",
                      }}>
                        <span style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
                          <span style={{ fontSize: 11.5, letterSpacing: ".2em", fontVariantNumeric: "tabular-nums", opacity: 0.7 }}>{t.num}</span>
                          <span style={{ fontFamily: SERIF, fontSize: "clamp(25px,2.7vw,34px)", lineHeight: 1, letterSpacing: "-0.01em" }}>{t.label}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
              {/* connector: runs from under the active label into the card */}
              <div aria-hidden className="rb-ch-connector2" style={{ position: "absolute", top: CONNECTOR_TOP, left: 0, width: "calc(100% + clamp(26px,3.6vw,56px))", height: 1, background: "linear-gradient(90deg, rgba(184,174,219,0.9) 0%, rgba(184,174,219,0.9) 62%, rgba(184,174,219,0.45) 100%)", zIndex: 3 }} />
              <div><BookDemoCTA label="Start running Rosebud" href="https://cal.eu/rosebudsolutions/demo" tone="dark" /></div>
            </div>

            {/* RIGHT — glass card */}
            <div className="rb-ch-card2" style={{ position: "relative", borderRadius: 22, border: "1px solid rgba(255,255,255,0.13)", background: "rgba(12,9,16,0.52)", backdropFilter: "blur(26px)", WebkitBackdropFilter: "blur(24px)", boxShadow: "0 44px 100px -44px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08)", padding: `${CARD_PADDING_TOP}px clamp(26px,3vw,40px) clamp(24px,2.8vw,36px)`, minHeight: "min(300px,34vh)", overflow: "hidden" }}>
              <div aria-hidden className="rb-ch-card-rule2" style={{ position: "absolute", top: CONNECTOR_TOP, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, rgba(184,174,219,0.45) 0%, rgba(184,174,219,0.16) 55%, rgba(184,174,219,0) 100%)" }} />
              <div style={{ transition: "opacity .45s ease, transform .45s ease", opacity: 1 }}>
                <h3 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(25px,2.8vw,36px)", lineHeight: 1.12, letterSpacing: "-0.01em", margin: 0, maxWidth: "26ch", color: "#F5F1EA", textShadow: "0 2px 24px rgba(0,0,0,0.5)" }}>{step.title}</h3>
                <p style={{ margin: "16px 0 0", fontSize: 16.5, lineHeight: 1.64, color: "rgba(245,241,234,0.8)", maxWidth: "56ch", textWrap: "pretty" }}>{step.body}</p>
                <p style={{ margin: "18px 0 0", paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.14)", fontSize: 15, lineHeight: 1.5, color: "rgba(184,174,219,0.92)", maxWidth: "50ch" }}>{step.note}</p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 26, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 8, zIndex: 3 }}>
          {STEPS.map((t, i) => (
            <button key={t.num} onClick={() => jumpTo(i)} aria-label={`Step ${i + 1}: ${t.label}`} style={{
              width: i === active ? 26 : 8, height: 8, borderRadius: 999, border: "none", cursor: "pointer", padding: 0,
              transition: "all .45s ease", background: i === active ? A : "rgba(255,255,255,0.28)",
            }} />
          ))}
        </div>
      </div>
    </section>
  );
}
