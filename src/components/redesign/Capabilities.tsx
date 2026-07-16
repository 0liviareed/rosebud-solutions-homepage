"use client";
import { useEffect, useRef, useState } from "react";

const A = "#8B7DD8";
const SERIF = "var(--font-cormorant), 'Cormorant Garamond', serif";
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

type Field = { k: string; v: string; good?: boolean };
type Bubble = { from: "in" | "out"; text: string; time: string };
type UseCase = { icon: string; name: string; line: string; channel: string; thread: Bubble[]; fields: Field[]; footer?: string };

const CASES: UseCase[] = [
  { icon: "◇", name: "Multi-channel intake", line: "Every enquiry, on every channel, answered and recorded in seconds.", channel: "WhatsApp",
    thread: [{ from: "in", text: "Hi — do you have any availability this week?", time: "21:47" }, { from: "out", text: "Yes, happy to help. Can I take your name and postcode?", time: "21:47" }],
    fields: [{ k: "Contact", v: "New enquiry" }, { k: "Channel", v: "WhatsApp" }, { k: "Source", v: "Meta / paid" }, { k: "Click ID", v: "fb.1.87f3…" }], footer: "Record written 21:47 — the same second." },
  { icon: "◈", name: "Qualification rules engine", line: "Every lead scored against your definition of a good one.", channel: "WhatsApp",
    thread: [{ from: "in", text: "SW7. Looking to start next month.", time: "21:48" }, { from: "out", text: "Great — that fits. Let me check the diary for you.", time: "21:48" }],
    fields: [{ k: "Rule fired", v: "Budget + location" }, { k: "Verdict", v: "Continue", good: true }, { k: "Expected value", v: "£4,200" }, { k: "Second enquiry", v: "Closed — out of area" }] },
  { icon: "▤", name: "Real-time calendar management", line: "Booked into your diary at the moment of intent.", channel: "WhatsApp",
    thread: [{ from: "out", text: "I can offer Thu 10:00 or Fri 14:30 — which suits?", time: "21:50" }, { from: "in", text: "Thursday works.", time: "21:51" }, { from: "out", text: "Booked. Thu 10:00 — confirmation on its way.", time: "21:51" }],
    fields: [{ k: "Availability", v: "Live diary" }, { k: "Slot taken", v: "Thu 10:00" }, { k: "Calendar", v: "Entry written", good: true }, { k: "Elapsed", v: "3m 48s" }] },
  { icon: "✓", name: "Multi-touch retention sequences", line: "Every booking confirmed, reminded, and kept.", channel: "WhatsApp",
    thread: [{ from: "out", text: "Confirmed for Thu 10:00. See you then.", time: "Mon" }, { from: "out", text: "Reminder — your appointment is tomorrow at 10:00.", time: "Wed" }, { from: "in", text: "Can we move to Friday?", time: "Wed" }, { from: "out", text: "Done — Fri 14:30. Confirmed.", time: "Wed" }],
    fields: [{ k: "Confirmation", v: "Sent" }, { k: "Day-before", v: "Sent" }, { k: "Reschedule", v: "Absorbed" }, { k: "Status", v: "Kept", good: true }] },
  { icon: "↻", name: "Sequenced nurture and reactivation", line: "Dormant demand re-engaged until it acts.", channel: "Email",
    thread: [{ from: "out", text: "Still thinking it over? Happy to hold a slot for you.", time: "Wk 11" }, { from: "in", text: "Actually — yes. What have you got?", time: "Wk 11" }],
    fields: [{ k: "Dormant", v: "11 weeks" }, { k: "Sequence", v: "Reactivation" }, { k: "Reply", v: "Received" }, { k: "Status", v: "Re-qualifying", good: true }] },
  { icon: "⊞", name: "Follow-through engine", line: "Documents, updates, quotes and invoices, chased to completion.", channel: "Email",
    thread: [{ from: "out", text: "Just need the signed form to proceed.", time: "09:12" }, { from: "in", text: "Sent over.", time: "11:40" }, { from: "out", text: "Received — quote attached, invoice to follow.", time: "11:41" }],
    fields: [{ k: "Document", v: "Collected" }, { k: "Quote", v: "Accepted" }, { k: "Invoice", v: "Chased → Paid", good: true }] },
  { icon: "⊙", name: "Two-way CRM synchronisation", line: "Every step mirrored into your CRM. It stays the system of record.", channel: "System",
    thread: [{ from: "out", text: "All set — everything logged and synced.", time: "Done" }],
    fields: [{ k: "Origin", v: "WhatsApp / paid" }, { k: "Qualification", v: "Passed" }, { k: "Value", v: "£4,200" }, { k: "Booked", v: "Thu 10:00" }, { k: "Kept", v: "Yes", good: true }], footer: "Mirroring into your CRM — it stays the system of record." },
  { icon: "◎", name: "Closed-loop attribution", line: "Every qualified outcome matched back to the ad click that created it.", channel: "Signal",
    thread: [{ from: "out", text: "Outcome matched to the original ad click.", time: "Done" }],
    fields: [{ k: "Enquiry", v: "#4821" }, { k: "Qualification", v: "Marker set" }, { k: "Click ID", v: "fb.1.87f3…" }, { k: "Signal file", v: "Handed over", good: true }], footer: "We produce the signal. You own the ad account." },
];
const UC_BG = ["#EAE6F3", "#E4EEE8", "#F3EBE1", "#E7EDF5", "#F0E9F3", "#EBF0E2", "#F4EAE7", "#E6EDEB"];

export default function Capabilities() {
  const ucRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const jumpTo = (i: number) => {
    const el = ucRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pageTop = rect.top + window.scrollY;
    const total = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: pageTop + ((i + 0.5) / CASES.length) * total, behavior: "smooth" });
  };

  useEffect(() => {
    let ticking = false;
    const compute = () => {
      ticking = false;
      const el = ucRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const total = el.offsetHeight - window.innerHeight;
      const p = clamp(total > 0 ? -rect.top / total : 0, 0, 0.9999);
      const a = Math.min(CASES.length - 1, Math.max(0, Math.floor(p * CASES.length)));
      setActive((prev) => (prev !== a ? a : prev));
    };
    const onScroll = () => { if (ticking) return; ticking = true; requestAnimationFrame(compute); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    compute();
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  return (
    <>
      {/* USE CASES (pinned, 8 stages cycle with scroll) */}
      <section ref={ucRef} style={{ position: "relative", background: "#F1EDE6", color: "#1A1720", height: "720vh" }}>
        <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
          <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 0, background: UC_BG[active % 8], transition: "background 0.7s ease" }} />
          <div className="rb-uc-grid" style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 1220, margin: "0 auto", padding: "0 48px", display: "grid", gridTemplateColumns: "0.92fr 1.08fr", gap: 64, alignItems: "center" }}>

            {/* LEFT */}
            <div className="rb-uc-left" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 460 }}>
              <div>
                <div style={{ marginBottom: 26 }}><span style={{ fontSize: 12, letterSpacing: ".3em", textTransform: "uppercase", color: A }}>Capabilities</span></div>
                <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(40px,5vw,74px)", lineHeight: 0.98, letterSpacing: "-0.02em", maxWidth: "12ch", margin: 0 }}>{CASES[active].name}</h2>
                <div style={{ marginTop: 30, position: "relative", width: 62, height: 62, flex: "none" }}>
                  <svg width={62} height={62} viewBox="0 0 54 54" style={{ position: "relative", transform: "rotate(-90deg)" }}>
                    <defs><linearGradient id="ucRingGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#C7BEE8" /><stop offset="100%" stopColor="#8B7DD8" /></linearGradient></defs>
                    <circle cx={27} cy={27} r={22} fill="none" stroke="rgba(23,19,31,0.12)" strokeWidth={4} />
                    <circle cx={27} cy={27} r={22} fill="none" stroke="url(#ucRingGrad)" strokeWidth={4} strokeLinecap="round" strokeDasharray="144.51" style={{ strokeDashoffset: 144.51 * (1 - (active + 1) / 8), transition: "stroke-dashoffset .45s ease" }} />
                  </svg>
                  <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 600, color: "#33323A", fontVariantNumeric: "tabular-nums" }}>{active + 1}/8</span>
                </div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.72)", boxShadow: "0 20px 50px -26px rgba(23,19,31,0.2), inset 0 1px 0 rgba(255,255,255,0.6)", borderRadius: 16, padding: "20px 24px", maxWidth: 520, display: "flex", alignItems: "flex-start", gap: 14 }}>
                <span style={{ color: A, fontSize: 18, lineHeight: 1.4 }}>{CASES[active].icon}</span>
                <span style={{ fontSize: 16, lineHeight: 1.5, color: "rgba(23,19,31,0.7)" }}>{CASES[active].line}</span>
              </div>
            </div>

            {/* RIGHT: FRAME */}
            <div style={{ position: "relative" }}>
              <div className="rb-uc-frame-outer" style={{ background: "url(/assets/usecase-frame-v2.avif) center center/cover no-repeat", borderRadius: 28, padding: 40 }}>
                <div className="rb-uc-frame" style={{ background: "linear-gradient(180deg,#1B1A24 0%,#121118 100%)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, display: "flex", minHeight: 408, overflow: "hidden", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}>
                  {/* thread */}
                  <div style={{ flex: 1.2, display: "flex", flexDirection: "column", minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 11, padding: "14px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                      <span style={{ width: 34, height: 34, flex: "none", borderRadius: 999, background: "linear-gradient(150deg,#9a8ce4,#4b3f86)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 600, color: "#fff", boxShadow: "0 4px 12px -4px rgba(139,125,216,0.7)" }}>N</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#F5F1EA" }}>New enquiry</div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                          <span style={{ width: 6, height: 6, borderRadius: 999, background: "#4ADE80", animation: "livepulse 2s ease-in-out infinite" }} />
                          <span style={{ fontSize: 11, color: "rgba(245,241,234,0.5)" }}>{CASES[active].channel} · online</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                      {CASES[active].thread.map((b, i) => {
                        const out = b.from === "out";
                        return (
                          <div key={i} style={{ display: "flex", justifyContent: out ? "flex-end" : "flex-start" }}>
                            <div style={{ maxWidth: "84%", padding: "10px 13px", borderRadius: 14, fontSize: 13.5, lineHeight: 1.4, display: "flex", flexDirection: "column", background: out ? A : "#2A2836", color: out ? "#fff" : "#E8E6EE", borderBottomRightRadius: out ? 4 : 14, borderBottomLeftRadius: out ? 14 : 4, boxShadow: out ? "0 4px 14px -4px rgba(139,125,216,0.5)" : "0 3px 10px -4px rgba(0,0,0,0.4)" }}>
                              <span>{b.text}</span>
                              <span style={{ fontSize: 10, opacity: 0.5, marginTop: 5, alignSelf: "flex-end" }}>{b.time}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {/* record */}
                  <div className="rb-uc-record" style={{ flex: 0.92, minWidth: 0, borderLeft: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)", display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ width: 22, height: 22, borderRadius: 6, background: "rgba(139,125,216,0.22)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#B8AEDB" }}>▤</span>
                        <span style={{ fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(245,241,234,0.6)" }}>Lead record</span>
                      </div>
                      <span style={{ width: 6, height: 6, borderRadius: 999, background: A, animation: "livepulse 1.6s ease-in-out infinite" }} />
                    </div>
                    <div style={{ padding: "6px 16px 16px", display: "flex", flexDirection: "column" }}>
                      {CASES[active].fields.map((f, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "11px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                          <span style={{ fontSize: 12, color: "rgba(245,241,234,0.45)" }}>{f.k}</span>
                          <span style={{ fontSize: 13, textAlign: "right", color: f.good ? A : "#F5F1EA", fontWeight: f.good ? 600 : 500 }}>{f.v}</span>
                        </div>
                      ))}
                      {CASES[active].footer ? <div style={{ marginTop: 14, fontSize: 11.5, lineHeight: 1.5, color: "rgba(184,174,219,0.85)" }}>{CASES[active].footer}</div> : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* progress rail */}
          <div className="rb-uc-rail" style={{ position: "absolute", right: 34, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 11, zIndex: 5 }}>
            {CASES.map((_, i) => (
              <button key={i} onClick={() => jumpTo(i)} aria-label={`Use case ${i + 1}`} style={{ width: 6, height: i === active ? 26 : 6, borderRadius: 999, border: "none", padding: 0, cursor: "pointer", display: "block", background: i === active ? A : "rgba(245,241,234,0.25)", transition: "all .3s ease" }} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
