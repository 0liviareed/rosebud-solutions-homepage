import type { CSSProperties, ReactNode } from "react";

// Bespoke hero + deep-dive graphic mocks per capability, matched to the copy.
// Same visual language as the Capture page: white glass cards on a tinted
// container-query square, per-capability accent. Rendered inside .rb-cq (page CSS).

const SERIF = "var(--font-cormorant), 'Cormorant Garamond', serif";
const CARD: CSSProperties = { background: "#fff", borderRadius: "3cqw", boxShadow: "0 3cqw 5cqw -1.6cqw rgba(23,19,31,.3)", overflow: "hidden" };
const CARD_SM: CSSProperties = { background: "#fff", borderRadius: "2.4cqw", boxShadow: "0 2cqw 3.4cqw -1.4cqw rgba(23,19,31,.4)" };

function sq(accent: string, children: ReactNode): ReactNode {
  return (
    <div className="rb-cq" style={{ position: "relative", width: "100%", aspectRatio: "1/1", borderRadius: 22, overflow: "hidden", background: `linear-gradient(155deg, ${accent}26, ${accent}0d)`, boxShadow: "0 34px 70px -30px rgba(23,19,31,0.35)" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(80% 70% at 80% 8%, rgba(255,255,255,0.5), transparent 55%)" }} />
      {children}
    </div>
  );
}
function hdr(accent: string, label: string, right?: ReactNode): ReactNode {
  return (
    <div style={{ background: accent, color: "#fff", padding: "2cqw 2.6cqw", display: "flex", alignItems: "center", gap: "1.3cqw" }}>
      <span style={{ width: "2.4cqw", height: "2.4cqw", borderRadius: "50%", background: "#4ADE80" }} />
      <span style={{ fontFamily: SERIF, fontWeight: 600, fontSize: "2.3cqw" }}>{label}</span>
      {right ? <span style={{ marginLeft: "auto", fontSize: "1.35cqw", fontWeight: 600, opacity: 0.9 }}>{right}</span> : null}
    </div>
  );
}
function frow(k: string, v: string, accent: string, ok = true): ReactNode {
  return (
    <div key={k} style={{ display: "flex", alignItems: "center", gap: "1.2cqw", padding: "1.5cqw 0", borderBottom: "1px solid #f2f3f5" }}>
      <span style={{ width: "36%", fontSize: "1.3cqw", letterSpacing: ".04em", textTransform: "uppercase", color: "#9aa0a8", fontWeight: 700 }}>{k}</span>
      <span style={{ flex: 1, fontWeight: 700, fontSize: "1.8cqw", color: "#17131F" }}>{v}</span>
      <span style={{ width: "1.5cqw", height: "1.5cqw", borderRadius: "50%", background: ok ? accent : "#d7dae0" }} />
    </div>
  );
}
function pill(text: string, bg: string, fg: string): ReactNode {
  return <span style={{ display: "inline-block", padding: ".7cqw 1.6cqw", borderRadius: 999, fontWeight: 700, fontSize: "1.4cqw", background: bg, color: fg }}>{text}</span>;
}
const GREEN_BG = "#E6F6EC", GREEN = "#2E9E5B", AMBER_BG = "#FBEEDD", AMBER = "#B5761A", GREY_BG = "#EEECF3", GREY = "#8a8496";

// ── QUALIFY ───────────────────────────────────────────────────────────────────
function qualifyHero(a: string): ReactNode {
  return sq(a, <>
    <div style={{ position: "absolute", left: "9%", top: "9%", width: "82%", ...CARD }}>
      {hdr(a, "Evaluating enquiry", "live")}
      <div style={{ padding: "1.4cqw 2.6cqw" }}>
        {frow("Budget", "£8,000", a)}{frow("Location", "In service area", a)}{frow("Timeline", "This month", a)}
      </div>
      <div style={{ padding: "1.6cqw 2.6cqw 2cqw", display: "flex", alignItems: "center", gap: "1.4cqw" }}>
        {pill("Qualified", GREEN_BG, GREEN)}<span style={{ fontFamily: SERIF, fontWeight: 600, fontSize: "3cqw", color: a, marginLeft: "auto" }}>£4,200</span>
      </div>
    </div>
    <div style={{ position: "absolute", left: "18%", right: "9%", bottom: "7%", ...CARD_SM, padding: "1.6cqw 2.2cqw", display: "flex", alignItems: "center", gap: "1.2cqw", opacity: 0.9 }}>
      <span style={{ fontWeight: 700, fontSize: "1.6cqw", color: "#17131F", flex: 1 }}>Second enquiry</span>{pill("Nurture", GREY_BG, GREY)}
    </div>
  </>);
}
function qualifyDeep(i: number, a: string): ReactNode {
  if (i === 0) return sq(a, <>
    <div style={{ position: "absolute", left: "9%", top: "10%", width: "82%", ...CARD }}>
      {hdr(a, "Qualification rules")}
      <div style={{ padding: "1.6cqw 2.6cqw 2cqw", display: "flex", flexDirection: "column", gap: "1.4cqw" }}>
        {[["budget", "≥", "£5,000"], ["location", "in", "your list"], ["fit", "=", "yes"]].map(([f, o, v]) => (
          <div key={f} style={{ display: "flex", alignItems: "center", gap: "1cqw", fontSize: "1.6cqw" }}>
            <span style={{ background: "#f4f5f7", borderRadius: "1cqw", padding: ".9cqw 1.4cqw", fontWeight: 700, color: "#17131F" }}>{f}</span>
            <span style={{ color: a, fontWeight: 700 }}>{o}</span>
            <span style={{ background: `${a}14`, color: a, borderRadius: "1cqw", padding: ".9cqw 1.4cqw", fontWeight: 700 }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
    <div style={{ position: "absolute", left: "9%", right: "9%", bottom: "9%", ...CARD_SM, padding: "1.6cqw 2.2cqw", display: "flex", alignItems: "center", gap: "1.2cqw" }}>
      <span style={{ fontWeight: 700, fontSize: "1.7cqw", color: "#17131F", flex: 1 }}>New enquiry parsing…</span>{pill("Passing ✓", GREEN_BG, GREEN)}
    </div>
  </>);
  if (i === 1) return sq(a, <>
    <div style={{ position: "absolute", left: "9%", top: "12%", width: "82%", ...CARD }}>
      {hdr("#E23D3D", "Escalated to a person")}
      <div style={{ padding: "2cqw 2.6cqw", display: "flex", alignItems: "center", gap: "1.6cqw" }}>
        <span style={{ width: "5.4cqw", height: "5.4cqw", borderRadius: "50%", background: `${a}22`, color: a, display: "grid", placeItems: "center", fontWeight: 700, fontSize: "2cqw" }}>DK</span>
        <div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: "2cqw", color: "#17131F" }}>Dr Kim</div><div style={{ fontSize: "1.4cqw", color: "#8a9099" }}>Clinical lead</div></div>
        {pill("● Urgent", "#FBE6E6", "#E23D3D")}
      </div>
      <div style={{ padding: "1.4cqw 2.6cqw 2cqw", borderTop: "1px solid #f2f3f5", fontSize: "1.45cqw", color: "#8a9099", fontWeight: 600 }}>Handover logged · 21:47 · audit trail kept</div>
    </div>
  </>);
  return sq(a, <>
    <div style={{ position: "absolute", left: "9%", top: "14%", width: "82%", ...CARD }}>
      {hdr(a, "Estimated value")}
      <div style={{ padding: "2.4cqw 2.8cqw", display: "flex", flexDirection: "column", gap: "1.8cqw" }}>
        <div style={{ fontFamily: SERIF, fontWeight: 600, fontSize: "5cqw", color: a }}>£4,200<span style={{ fontSize: "1.8cqw", color: "#b3b8bf" }}> est.</span></div>
        <div style={{ height: "2.2cqw", borderRadius: 999, background: "#eef0f2", overflow: "hidden" }}><div style={{ height: "100%", width: "72%", background: a, borderRadius: 999 }} /></div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.3cqw", color: "#9aa0a8", fontWeight: 700 }}><span>Tier 1</span><span>Tier 2</span><span>Tier 3</span></div>
      </div>
    </div>
  </>);
}

// ── BOOK ──────────────────────────────────────────────────────────────────────
function miniCal(a: string, selected: string): ReactNode {
  const slots = ["09:00", "10:00", "11:30", "14:30", "16:00", "17:00"];
  const booked = new Set(["11:30", "16:00"]);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1cqw" }}>
      {slots.map((s) => {
        const isSel = s === selected, isBk = booked.has(s);
        return <div key={s} style={{ textAlign: "center", padding: "1.3cqw 0", borderRadius: "1.4cqw", fontWeight: 700, fontSize: "1.5cqw", background: isSel ? a : isBk ? "#f0f1f4" : "#fff", color: isSel ? "#fff" : isBk ? "#b3b8bf" : "#17131F", border: isSel ? "none" : "1px solid #eef0f2", textDecoration: isBk ? "line-through" : "none" }}>{s}</div>;
      })}
    </div>
  );
}
function bookHero(a: string): ReactNode {
  return sq(a, <>
    <div style={{ position: "absolute", left: "8%", top: "7%", width: "84%", ...CARD }}>
      {hdr(a, "Thursday · availability", "live diary")}
      <div style={{ padding: "2cqw 2.4cqw" }}>{miniCal(a, "10:00")}</div>
    </div>
    <div style={{ position: "absolute", left: "8%", right: "8%", bottom: "20%", ...CARD_SM, padding: "1.6cqw 2cqw", display: "flex", alignItems: "center", gap: "1.2cqw", background: "#DCF3E3" }}>
      <span style={{ fontWeight: 700, fontSize: "1.6cqw", color: "#17131F", flex: 1 }}>Thursday 10:00 works</span><span style={{ fontSize: "1.3cqw", color: GREEN, fontWeight: 700 }}>auto ✓✓</span>
    </div>
    <div style={{ position: "absolute", left: "8%", bottom: "7%", display: "flex", alignItems: "center", gap: "1.2cqw", ...CARD_SM, padding: "1.4cqw 2.2cqw" }}>
      <span style={{ width: "2.6cqw", height: "2.6cqw", borderRadius: ".8cqw", background: "#4ADE80", color: "#12331f", display: "grid", placeItems: "center", fontSize: "1.6cqw" }}>✓</span><span style={{ fontWeight: 700, fontSize: "1.7cqw", color: "#17131F" }}>Booked · Thu 10:00</span>
    </div>
  </>);
}
function bookDeep(i: number, a: string): ReactNode {
  if (i === 0) return sq(a, <>
    <div style={{ position: "absolute", left: "9%", top: "9%", width: "82%", ...CARD }}>
      {hdr(a, "Booking in the thread")}
      <div style={{ padding: "1.8cqw 2.2cqw", background: "#EAF0FA" }}>
        <div style={{ alignSelf: "flex-start", maxWidth: "82%", ...CARD_SM, padding: "1.3cqw 1.6cqw", fontSize: "1.55cqw", marginBottom: "1.3cqw" }}>I can do Thursday 10:00 or Friday 14:30 — which suits?</div>
        <div style={{ marginTop: "1cqw" }}>{miniCal(a, "10:00")}</div>
      </div>
    </div>
  </>);
  if (i === 1) return sq(a, <>
    <div style={{ position: "absolute", left: "8%", top: "12%", width: "40%", ...CARD }}>
      {hdr(a, "Clinic")}
      <div style={{ padding: "1.6cqw", display: "flex", flexDirection: "column", gap: "1cqw" }}>
        {["09:00", "09:45", "—buffer—", "11:00"].map((s) => <div key={s} style={{ padding: "1.1cqw", borderRadius: "1cqw", background: s.includes("buffer") ? "#f4f5f7" : `${a}12`, color: s.includes("buffer") ? "#b3b8bf" : "#17131F", fontWeight: 700, fontSize: "1.4cqw", textAlign: "center" }}>{s}</div>)}
      </div>
    </div>
    <div style={{ position: "absolute", right: "8%", top: "20%", width: "40%", ...CARD }}>
      {hdr("#17131F", "Site visit")}
      <div style={{ padding: "1.6cqw", display: "flex", flexDirection: "column", gap: "1cqw" }}>
        {["09:00 – 11:00", "—travel—", "13:00 – 15:00"].map((s) => <div key={s} style={{ padding: "1.4cqw", borderRadius: "1cqw", background: s.includes("travel") ? "#f4f5f7" : `${a}12`, color: s.includes("travel") ? "#b3b8bf" : "#17131F", fontWeight: 700, fontSize: "1.4cqw", textAlign: "center" }}>{s}</div>)}
      </div>
    </div>
  </>);
  return sq(a, <>
    <div style={{ position: "absolute", left: "9%", top: "14%", width: "82%", ...CARD }}>
      {hdr(a, "Event log")}
      <div style={{ padding: "1.4cqw 2.6cqw 2cqw" }}>
        {[["Enquiry received", "21:47"], ["Qualified", "21:48"], ["Booked · Thu 10:00", "21:51"]].map(([l, t], j) => (
          <div key={l} style={{ display: "flex", alignItems: "center", gap: "1.4cqw", padding: "1.7cqw 0", borderBottom: "1px solid #f2f3f5" }}>
            <span style={{ width: "3cqw", height: "3cqw", borderRadius: "50%", background: j === 2 ? "#4ADE80" : `${a}22`, color: j === 2 ? "#12331f" : a, display: "grid", placeItems: "center", fontSize: "1.4cqw", fontWeight: 700 }}>✓</span>
            <span style={{ flex: 1, fontWeight: 700, fontSize: "1.75cqw", color: "#17131F" }}>{l}</span><span style={{ fontSize: "1.4cqw", color: "#9aa0a8", fontWeight: 700 }}>{t}</span>
          </div>
        ))}
      </div>
    </div>
  </>);
}

// ── RETAIN ────────────────────────────────────────────────────────────────────
function retainHero(a: string): ReactNode {
  const steps: [string, string, string][] = [["Booked", "Mon", "done"], ["Reminder sent", "Wed", "done"], ["Reschedule → Fri 14:30", "Wed", "done"]];
  return sq(a, <>
    <div style={{ position: "absolute", left: "9%", top: "12%", width: "82%", ...CARD }}>
      {hdr(a, "Appointment kept", "auto")}
      <div style={{ padding: "1.4cqw 2.6cqw 2cqw" }}>
        {steps.map(([l, d]) => (
          <div key={l} style={{ display: "flex", alignItems: "center", gap: "1.4cqw", padding: "1.7cqw 0", borderBottom: "1px solid #f2f3f5" }}>
            <span style={{ width: "3cqw", height: "3cqw", borderRadius: "50%", background: "#4ADE80", color: "#12331f", display: "grid", placeItems: "center", fontSize: "1.4cqw" }}>✓</span>
            <span style={{ flex: 1, fontWeight: 700, fontSize: "1.75cqw", color: "#17131F" }}>{l}</span>{pill(d, `${a}18`, a)}
          </div>
        ))}
      </div>
    </div>
  </>);
}
function retainDeep(i: number, a: string): ReactNode {
  if (i === 0) return sq(a, <>
    <div style={{ position: "absolute", left: "8%", top: "10%", ...CARD_SM, padding: "1.6cqw 2.2cqw", display: "flex", alignItems: "center", gap: "1.2cqw" }}>
      <span style={{ width: "3cqw", height: "3cqw", borderRadius: ".8cqw", background: a, color: "#fff", display: "grid", placeItems: "center", fontSize: "1.5cqw" }}>▤</span><span style={{ fontWeight: 700, fontSize: "1.7cqw", color: "#17131F" }}>Booking created · Thu 10:00</span>
    </div>
    <div style={{ position: "absolute", left: "12%", top: "38%", width: "78%", ...CARD }}>
      {hdr(a, "Cadence running", "no manual trigger")}
      <div style={{ padding: "1.4cqw 2.6cqw 2cqw" }}>
        {[["Confirmation", "Sent"], ["Day-before", "Queued"], ["Hour-before", "Scheduled"]].map(([l, s], j) => (
          <div key={l} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.6cqw 0", borderBottom: "1px solid #f2f3f5" }}>
            <span style={{ fontWeight: 700, fontSize: "1.75cqw", color: "#17131F" }}>{l}</span>{pill(s, j === 0 ? GREEN_BG : GREY_BG, j === 0 ? GREEN : GREY)}
          </div>
        ))}
      </div>
    </div>
  </>);
  if (i === 1) return sq(a, <>
    <div style={{ position: "absolute", left: "10%", top: "20%", width: "80%", ...CARD }}>
      <div style={{ padding: "1.4cqw 2.2cqw", borderBottom: "1px solid #f2f3f5", fontSize: "1.3cqw", letterSpacing: ".1em", textTransform: "uppercase", color: a, fontWeight: 700 }}>Day-before verification</div>
      <div style={{ padding: "2cqw 2.4cqw" }}>
        <div style={{ ...CARD_SM, padding: "1.6cqw 1.8cqw", fontSize: "1.6cqw", lineHeight: 1.4, background: `${a}0d` }}>Hi — a reminder your appointment is tomorrow at 10:00. Reply Y to confirm, or R to reschedule.</div>
        <div style={{ display: "flex", gap: "1.2cqw", marginTop: "1.6cqw" }}>{pill("Y · Confirm", GREEN_BG, GREEN)}{pill("R · Reschedule", `${a}18`, a)}</div>
      </div>
    </div>
  </>);
  return sq(a, <>
    <div style={{ position: "absolute", left: "9%", top: "16%", width: "82%", ...CARD }}>
      {hdr("#E28A3D", "No-show")}
      <div style={{ padding: "2cqw 2.6cqw", display: "flex", flexDirection: "column", gap: "1.6cqw" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1.2cqw" }}><span style={{ fontWeight: 700, fontSize: "1.8cqw", color: "#17131F", flex: 1 }}>Thu 10:00 · missed</span>{pill("Recovery", AMBER_BG, AMBER)}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>{pill("Missed", "#f4f5f7", "#8a9099")}<span style={{ flex: 1, borderTop: "0.4cqw dotted #cfd3da", margin: "0 .8cqw" }} />{pill("New time offered →", GREEN_BG, GREEN)}</div>
      </div>
    </div>
  </>);
}

// ── REACTIVATE ────────────────────────────────────────────────────────────────
function reactivateHero(a: string): ReactNode {
  return sq(a, <>
    <div style={{ position: "absolute", left: "8%", top: "9%", ...CARD_SM, padding: "1.6cqw 2.2cqw", display: "flex", alignItems: "center", gap: "1.2cqw" }}>
      <span style={{ width: "3.4cqw", height: "3.4cqw", borderRadius: "50%", background: "#e7e2f2", color: a, display: "grid", placeItems: "center", fontWeight: 700, fontSize: "1.5cqw" }}>RB</span>
      <div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: "1.7cqw", color: "#17131F" }}>Rachel Byrne</div></div>{pill("Dormant · 214d", GREY_BG, GREY)}
    </div>
    <div style={{ position: "absolute", left: "16%", right: "8%", top: "40%", ...CARD }}>
      {hdr(a, "Back in play")}
      <div style={{ padding: "1.4cqw 2.6cqw 2cqw" }}>
        {frow("Touch sent", "Wk 11 · email", a)}{frow("Reply", "Received", a)}{frow("Status", "Re-qualifying", a)}
      </div>
    </div>
  </>);
}
function reactivateDeep(i: number, a: string): ReactNode {
  if (i === 0) {
    const rows = [["Priya Nair", "8 mo", "Matched"], ["Tom Alvarez", "11 mo", "Matched"], ["Dani Kohl", "3 mo", "Dormant"], ["Léa Mercier", "14 mo", "Matched"]];
    return sq(a, <>
      <div style={{ position: "absolute", left: "8%", top: "10%", width: "84%", ...CARD }}>
        {hdr(a, "Dormant cohort", "2,418 records")}
        <div style={{ padding: "1cqw 2.4cqw 1.8cqw" }}>
          {rows.map(([n, t, s]) => (
            <div key={n} style={{ display: "flex", alignItems: "center", gap: "1.2cqw", padding: "1.4cqw 0", borderBottom: "1px solid #f2f3f5" }}>
              <span style={{ width: "3cqw", height: "3cqw", borderRadius: "50%", background: `${a}22`, color: a, display: "grid", placeItems: "center", fontSize: "1.3cqw", fontWeight: 700 }}>{n.split(" ").map((w) => w[0]).join("")}</span>
              <span style={{ flex: 1, fontWeight: 600, fontSize: "1.65cqw", color: "#17131F" }}>{n}</span>
              <span style={{ fontSize: "1.4cqw", color: "#8a9099" }}>{t}</span>{pill(s, s === "Matched" ? `${a}18` : "#f4f5f7", s === "Matched" ? a : "#8a9099")}
            </div>
          ))}
        </div>
      </div>
    </>);
  }
  if (i === 1) return sq(a, <>
    <div style={{ position: "absolute", left: "9%", top: "13%", width: "82%", ...CARD }}>
      {hdr(a, "One sequence per lead")}
      <div style={{ padding: "1.4cqw 2.6cqw 2cqw" }}>
        {[["Day 0", "@", "Email", GREEN], ["Day 2", "SMS", "SMS", GREEN], ["Day 5", "WA", "WhatsApp", AMBER]].map(([d, ch, l, c]) => (
          <div key={d} style={{ display: "flex", alignItems: "center", gap: "1.4cqw", padding: "1.6cqw 0", borderBottom: "1px solid #f2f3f5" }}>
            <span style={{ width: "6cqw", fontSize: "1.4cqw", color: "#9aa0a8", fontWeight: 700 }}>{d}</span>
            <span style={{ width: "3.6cqw", height: "3.6cqw", borderRadius: "1cqw", background: a, color: "#fff", display: "grid", placeItems: "center", fontWeight: 700, fontSize: "1.3cqw" }}>{ch}</span>
            <span style={{ flex: 1, fontWeight: 600, fontSize: "1.75cqw", color: "#17131F" }}>{l} touch</span>
            <span style={{ width: "1.5cqw", height: "1.5cqw", borderRadius: "50%", background: c as string }} />
          </div>
        ))}
      </div>
    </div>
  </>);
  return sq(a, <>
    <div style={{ position: "absolute", left: "9%", top: "16%", width: "82%", ...CARD }}>
      {hdr(a, "Requalified", "● reply received")}
      <div style={{ padding: "2cqw 2.6cqw", display: "flex", gap: "1.6cqw" }}>
        <div style={{ flex: 1, background: "#f6f7f9", borderRadius: "1.8cqw", padding: "1.8cqw" }}><div style={{ fontSize: "1.3cqw", textTransform: "uppercase", color: "#9aa0a8", fontWeight: 700, marginBottom: ".6cqw" }}>Score</div><div style={{ fontFamily: SERIF, fontSize: "3.4cqw", fontWeight: 600 }}>82<span style={{ fontSize: "1.5cqw", color: "#b3b8bf" }}>/100</span></div></div>
        <div style={{ flex: 1, background: `${a}14`, borderRadius: "1.8cqw", padding: "1.8cqw" }}><div style={{ fontSize: "1.3cqw", textTransform: "uppercase", color: a, fontWeight: 700, marginBottom: ".6cqw" }}>Value</div><div style={{ fontFamily: SERIF, fontSize: "3.4cqw", fontWeight: 600, color: a }}>£14.2k</div></div>
      </div>
    </div>
  </>);
}

// ── FOLLOW THROUGH ────────────────────────────────────────────────────────────
function ftQuad(a: string, label: string, status: string, done: boolean): ReactNode {
  return (
    <div style={{ ...CARD_SM, padding: "1.6cqw 1.8cqw", display: "flex", flexDirection: "column", gap: "1cqw" }}>
      <div style={{ fontSize: "1.4cqw", fontWeight: 700, color: "#17131F" }}>{label}</div>
      {pill(status, done ? GREEN_BG : `${a}18`, done ? GREEN : a)}
    </div>
  );
}
function followThroughHero(a: string): ReactNode {
  return sq(a, <>
    <div style={{ position: "absolute", left: "8%", right: "8%", top: "12%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2cqw" }}>
      {ftQuad(a, "Document", "Received ✓", true)}
      {ftQuad(a, "Status update", "Sent ✓", true)}
      {ftQuad(a, "Quote", "Accepted", false)}
      {ftQuad(a, "Invoice", "Paid ✓", true)}
    </div>
  </>);
}
function followThroughDeep(i: number, a: string): ReactNode {
  if (i === 0) return sq(a, <>
    <div style={{ position: "absolute", left: "8%", top: "16%", width: "40%", ...CARD }}>
      {hdr(a, "Law firm")}
      <div style={{ padding: "1.6cqw", display: "flex", flexDirection: "column", gap: "1.2cqw" }}>
        {[["Documents", true], ["Status", true], ["Invoicing", false]].map(([m, on]) => <div key={m as string} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "1.4cqw", fontWeight: 700, color: on ? "#17131F" : "#b3b8bf" }}>{m}<span style={{ width: "3cqw", height: "1.8cqw", borderRadius: 999, background: on ? a : "#e3e4ea", position: "relative" }}><span style={{ position: "absolute", top: ".3cqw", left: on ? "1.5cqw" : ".3cqw", width: "1.2cqw", height: "1.2cqw", borderRadius: "50%", background: "#fff" }} /></span></div>)}
      </div>
    </div>
    <div style={{ position: "absolute", right: "8%", top: "26%", width: "40%", ...CARD }}>
      {hdr("#17131F", "Trades")}
      <div style={{ padding: "1.6cqw", display: "flex", flexDirection: "column", gap: "1.2cqw" }}>
        {[["Documents", false], ["Quotes", true], ["Invoicing", true]].map(([m, on]) => <div key={m as string} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "1.4cqw", fontWeight: 700, color: on ? "#17131F" : "#b3b8bf" }}>{m}<span style={{ width: "3cqw", height: "1.8cqw", borderRadius: 999, background: on ? a : "#e3e4ea", position: "relative" }}><span style={{ position: "absolute", top: ".3cqw", left: on ? "1.5cqw" : ".3cqw", width: "1.2cqw", height: "1.2cqw", borderRadius: "50%", background: "#fff" }} /></span></div>)}
      </div>
    </div>
  </>);
  if (i === 1) return sq(a, <>
    <div style={{ position: "absolute", left: "9%", top: "14%", width: "82%", ...CARD }}>
      {hdr(a, "Document chase")}
      <div style={{ padding: "1.4cqw 2.6cqw 2cqw" }}>
        {[["Requested", "Sent"], ["Reminder", "Sent"], ["File received", "✓"]].map(([l, s], j) => (
          <div key={l} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.6cqw 0", borderBottom: "1px solid #f2f3f5" }}>
            <span style={{ fontWeight: 700, fontSize: "1.75cqw", color: "#17131F" }}>{l}</span>{pill(s, j === 2 ? GREEN_BG : `${a}14`, j === 2 ? GREEN : a)}
          </div>
        ))}
      </div>
    </div>
  </>);
  return sq(a, <>
    <div style={{ position: "absolute", left: "9%", top: "10%", width: "82%", ...CARD_SM, padding: "1.6cqw 2.2cqw", display: "flex", alignItems: "center", gap: "1.2cqw" }}>
      <span style={{ fontWeight: 700, fontSize: "1.7cqw", color: "#17131F", flex: 1 }}>Quote #4821</span>{pill("Accepted ✓", GREEN_BG, GREEN)}
    </div>
    <div style={{ position: "absolute", left: "9%", right: "9%", top: "40%", ...CARD }}>
      {hdr(a, "Invoice ageing")}
      <div style={{ padding: "2cqw 2.4cqw", display: "flex", gap: "1.2cqw" }}>
        {[["0–30", GREEN_BG, GREEN], ["30–60", AMBER_BG, AMBER], ["60–90", "#FBE6E6", "#E23D3D"]].map(([l, bg, fg], j) => (
          <div key={l} style={{ flex: 1, textAlign: "center", padding: "1.4cqw 0", borderRadius: "1.4cqw", background: bg as string, color: fg as string, fontWeight: 700, fontSize: "1.5cqw", outline: j === 0 ? `0.4cqw solid ${a}` : "none" }}>{l}</div>
        ))}
      </div>
    </div>
  </>);
}

const HEROES: Record<string, (a: string) => ReactNode> = {
  qualify: qualifyHero, book: bookHero, retain: retainHero, reactivate: reactivateHero, "follow-through": followThroughHero,
};
const DEEPS: Record<string, (i: number, a: string) => ReactNode> = {
  qualify: qualifyDeep, book: bookDeep, retain: retainDeep, reactivate: reactivateDeep, "follow-through": followThroughDeep,
};

export function bespokeHero(slug: string, accent: string): ReactNode | null {
  return HEROES[slug] ? HEROES[slug](accent) : null;
}
export function bespokeDeep(slug: string, i: number, accent: string): ReactNode | null {
  return DEEPS[slug] ? DEEPS[slug](i, accent) : null;
}
