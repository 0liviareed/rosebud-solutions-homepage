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

// Vertically-centre a mock's card(s) in the container (balanced space top/bottom)
// rather than anchoring them to the top. Cards keep their natural size.
function center(children: ReactNode): ReactNode {
  return <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", gap: "2.4cqw", padding: "8%" }}>{children}</div>;
}

// ── QUALIFY ───────────────────────────────────────────────────────────────────
function qualifyHero(a: string): ReactNode {
  return sq(a, center(<>
    <div style={{ ...CARD }}>
      {hdr(a, "Evaluating enquiry", "live")}
      <div style={{ padding: "1.4cqw 2.6cqw" }}>
        {frow("Budget", "£8,000", a)}{frow("Location", "In service area", a)}{frow("Timeline", "This month", a)}
      </div>
      <div style={{ padding: "1.6cqw 2.6cqw 2cqw", display: "flex", alignItems: "center", gap: "1.4cqw" }}>
        {pill("Qualified", GREEN_BG, GREEN)}<span style={{ fontFamily: SERIF, fontWeight: 600, fontSize: "3cqw", color: a, marginLeft: "auto" }}>£4,200</span>
      </div>
    </div>
    <div style={{ ...CARD_SM, padding: "1.6cqw 2.2cqw", display: "flex", alignItems: "center", gap: "1.2cqw", opacity: 0.9 }}>
      <span style={{ fontWeight: 700, fontSize: "1.6cqw", color: "#17131F", flex: 1 }}>Second enquiry</span>{pill("Nurture", GREY_BG, GREY)}
    </div>
  </>));
}
function qualifyDeep(i: number, a: string): ReactNode {
  if (i === 0) return sq(a, center(<>
    <div style={{ ...CARD }}>
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
    <div style={{ ...CARD_SM, padding: "1.6cqw 2.2cqw", display: "flex", alignItems: "center", gap: "1.2cqw" }}>
      <span style={{ fontWeight: 700, fontSize: "1.7cqw", color: "#17131F", flex: 1 }}>New enquiry parsing…</span>{pill("Passing ✓", GREEN_BG, GREEN)}
    </div>
  </>));
  if (i === 1) return sq(a, center(
    <div style={{ ...CARD }}>
      {hdr("#E23D3D", "Escalated to a person")}
      <div style={{ padding: "2cqw 2.6cqw", display: "flex", alignItems: "center", gap: "1.6cqw" }}>
        <span style={{ width: "5.4cqw", height: "5.4cqw", borderRadius: "50%", background: `${a}22`, color: a, display: "grid", placeItems: "center", fontWeight: 700, fontSize: "2cqw" }}>DK</span>
        <div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: "2cqw", color: "#17131F" }}>Dr Kim</div><div style={{ fontSize: "1.4cqw", color: "#8a9099" }}>Clinical lead</div></div>
        {pill("● Urgent", "#FBE6E6", "#E23D3D")}
      </div>
      <div style={{ padding: "1.4cqw 2.6cqw 2cqw", borderTop: "1px solid #f2f3f5", fontSize: "1.45cqw", color: "#8a9099", fontWeight: 600 }}>Handover logged · 21:47 · audit trail kept</div>
    </div>
  ));
  return sq(a, center(
    <div style={{ ...CARD }}>
      {hdr(a, "Estimated value")}
      <div style={{ padding: "2.4cqw 2.8cqw", display: "flex", flexDirection: "column", gap: "1.8cqw" }}>
        <div style={{ fontFamily: SERIF, fontWeight: 600, fontSize: "5cqw", color: a }}>£4,200<span style={{ fontSize: "1.8cqw", color: "#b3b8bf" }}> est.</span></div>
        <div style={{ height: "2.2cqw", borderRadius: 999, background: "#eef0f2", overflow: "hidden" }}><div style={{ height: "100%", width: "72%", background: a, borderRadius: 999 }} /></div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.3cqw", color: "#9aa0a8", fontWeight: 700 }}><span>Tier 1</span><span>Tier 2</span><span>Tier 3</span></div>
      </div>
    </div>
  ));
}

// ── BOOK (reference style: provider node-flow + floating card + live table) ────
function bLogo(src: string, w = 13): ReactNode {
  return (
    <div style={{ width: `${w}cqw`, height: `${w * 0.72}cqw`, borderRadius: `${w * 0.16}cqw`, background: "#fff", boxShadow: "0 2cqw 3.4cqw -1.4cqw rgba(23,19,31,.4)", display: "grid", placeItems: "center", padding: `${w * 0.16}cqw`, flexShrink: 0 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/assets/integrations/${src}`} alt="" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
    </div>
  );
}
// Book palette — matches the designed mocks (indigo diary, WhatsApp green).
const BK_INDIGO = "#4F46E5";
const BK_WA = "#25D366";
function softSq(bg: string, children: ReactNode): ReactNode {
  return (
    <div className="rb-cq" style={{ position: "relative", width: "100%", aspectRatio: "1/1", borderRadius: 22, overflow: "hidden", background: bg, boxShadow: "0 34px 70px -30px rgba(23,19,31,0.28)" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(70% 60% at 82% 6%, rgba(255,255,255,0.55), transparent 60%)" }} />
      {children}
    </div>
  );
}
function avatar(initials: string, bg: string, fg: string, size = 3.4): ReactNode {
  return <span style={{ width: `${size}cqw`, height: `${size}cqw`, borderRadius: "50%", background: bg, color: fg, display: "grid", placeItems: "center", fontWeight: 700, fontSize: `${size * 0.42}cqw`, flexShrink: 0 }}>{initials}</span>;
}
function bookHero(a: string): ReactNode {
  return softSq("linear-gradient(158deg,#F5F3FC,#EAF1FE)", <>
    <div style={{ position: "absolute", left: "5%", top: "11%", width: "60%", ...CARD }}>
      <div style={{ background: BK_WA, color: "#fff", padding: "1.5cqw 1.9cqw", display: "flex", alignItems: "center", gap: "1.2cqw" }}>
        <span style={{ width: "3.4cqw", height: "3.4cqw", borderRadius: "50%", background: "rgba(255,255,255,.22)", display: "grid", placeItems: "center", fontSize: "1.8cqw" }}>✆</span>
        <div style={{ lineHeight: 1.15 }}><div style={{ fontWeight: 700, fontSize: "1.75cqw" }}>WhatsApp</div><div style={{ fontSize: "1.25cqw", opacity: 0.85 }}>Sunday · 21:47</div></div>
      </div>
      <div style={{ padding: "1.7cqw 1.6cqw", display: "flex", flexDirection: "column", gap: "1.2cqw", background: "#ECE5DD" }}>
        <div style={{ alignSelf: "flex-start", maxWidth: "88%", background: "#fff", borderRadius: "1.4cqw 1.4cqw 1.4cqw .4cqw", padding: "1.2cqw 1.5cqw", fontSize: "1.5cqw", color: "#17131F", boxShadow: "0 1cqw 2cqw -1.2cqw rgba(0,0,0,.3)" }}>Any 2 leads free to view this week?</div>
        <div style={{ alignSelf: "flex-end", maxWidth: "92%", background: "#DCF8C6", borderRadius: "1.4cqw 1.4cqw .4cqw 1.4cqw", padding: "1.2cqw 1.5cqw", fontSize: "1.5cqw", color: "#17131F", boxShadow: "0 1cqw 2cqw -1.2cqw rgba(0,0,0,.25)" }}>Yes — Thursday 3:30pm is open. Shall I hold it for you?</div>
      </div>
    </div>
    <div style={{ position: "absolute", right: "4.5%", bottom: "8%", width: "66%", ...CARD }}>
      <div style={{ background: BK_INDIGO, color: "#fff", padding: "1.5cqw 2cqw", display: "flex", alignItems: "center", gap: "1cqw" }}>
        <span style={{ fontSize: "1.7cqw" }}>▦</span><span style={{ fontWeight: 700, fontSize: "1.75cqw" }}>Your diary</span><span style={{ marginLeft: "auto", fontSize: "1.3cqw", opacity: 0.85 }}>Thu 19 Jun</span>
      </div>
      <div style={{ padding: "1.2cqw 1.8cqw 1.6cqw" }}>
        {(["12:00", "13:30"]).map((t) => (
          <div key={t} style={{ display: "flex", alignItems: "center", gap: "1.4cqw", padding: "1cqw 0", borderBottom: "1px solid #f2f3f5" }}>
            <span style={{ width: "6cqw", fontSize: "1.35cqw", fontWeight: 700, color: "#b3b8bf" }}>{t}</span><span style={{ flex: 1, height: "0.3cqw", background: "#f0f1f3", borderRadius: 999 }} />
          </div>
        ))}
        <div style={{ display: "flex", alignItems: "stretch", gap: "1.4cqw", padding: "1cqw 0" }}>
          <span style={{ width: "6cqw", fontSize: "1.35cqw", fontWeight: 700, color: BK_INDIGO, alignSelf: "center" }}>14:30</span>
          <div style={{ flex: 1, background: `${BK_INDIGO}12`, borderLeft: `0.6cqw solid ${BK_INDIGO}`, borderRadius: "1cqw", padding: "1.2cqw 1.5cqw", display: "flex", alignItems: "center", gap: "1cqw" }}>
            {avatar("DP", `${BK_INDIGO}22`, BK_INDIGO, 3.4)}
            <div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: "1.6cqw", color: "#17131F" }}>Daniel Pryce</div><div style={{ fontSize: "1.25cqw", color: "#8a8496" }}>2-bed viewing · 30 min</div></div>
            {pill("Booked ✓", "#E6F6EC", GREEN)}
          </div>
        </div>
        {(["15:30", "16:30"]).map((t) => (
          <div key={t} style={{ display: "flex", alignItems: "center", gap: "1.4cqw", padding: "1cqw 0", borderTop: "1px solid #f2f3f5" }}>
            <span style={{ width: "6cqw", fontSize: "1.35cqw", fontWeight: 700, color: "#b3b8bf" }}>{t}</span><span style={{ flex: 1, height: "0.3cqw", background: "#f0f1f3", borderRadius: 999 }} />
          </div>
        ))}
      </div>
    </div>
  </>);
}
function bookDeep(i: number, a: string): ReactNode {
  if (i === 0) return softSq("linear-gradient(158deg,#EEF3FE,#F5F3FC)", center(
    <div style={{ ...CARD }}>
      <div style={{ background: BK_INDIGO, color: "#fff", padding: "1.6cqw 2.2cqw", display: "flex", alignItems: "center", gap: "1cqw" }}>
        <span style={{ width: "2cqw", height: "2cqw", borderRadius: "50%", background: "#4ADE80" }} />
        <span style={{ fontWeight: 700, fontSize: "1.85cqw" }}>Live availability</span>
        <span style={{ marginLeft: "auto", fontSize: "1.3cqw", opacity: 0.85 }}>checked just now</span>
      </div>
      <div style={{ padding: "0.8cqw 2.2cqw 1.8cqw" }}>
        {([["15:00", "Open", "open"], ["15:30", "Holding · 4:58", "hold"], ["16:00", "Booked", "booked"], ["16:30", "Open", "open"]] as [string, string, string][]).map(([t, s, kind]) => {
          const bk = kind === "booked", hold = kind === "hold";
          return (
            <div key={t} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.5cqw 0", borderBottom: "1px solid #f2f3f5" }}>
              <span style={{ fontWeight: 700, fontSize: "1.9cqw", color: bk ? "#b3b8bf" : "#17131F", textDecoration: bk ? "line-through" : "none" }}>{t}</span>
              {pill(s, hold ? "#FBEEDD" : bk ? "#f0f1f4" : "#E6F6EC", hold ? "#B5761A" : bk ? "#b3b8bf" : GREEN)}
            </div>
          );
        })}
        <div style={{ marginTop: "1.3cqw", fontSize: "1.35cqw", fontWeight: 600, color: "#8a8496" }}>Reserved against your real calendar — no double-booking.</div>
      </div>
    </div>
  ));
  if (i === 1) return softSq("linear-gradient(158deg,#F7F3EA,#F1F0FB)", center(
    <div style={{ ...CARD }}>
      <div style={{ background: BK_INDIGO, color: "#fff", padding: "1.6cqw 2.2cqw", display: "flex", alignItems: "center", gap: "1cqw" }}>
        <span style={{ fontWeight: 700, fontSize: "1.85cqw" }}>Appointment types</span>
        <span style={{ marginLeft: "auto" }}>{pill("Property", "rgba(255,255,255,.22)", "#fff")}</span>
      </div>
      <div style={{ padding: "0.8cqw 2.2cqw 1.8cqw" }}>
        {([["Site survey", "60 min"], ["Consultation", "45 min"], ["Prep buffer", "15 min"]] as [string, string][]).map(([k, v]) => (
          <div key={k} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.5cqw 0", borderBottom: "1px solid #f2f3f5" }}>
            <span style={{ fontWeight: 700, fontSize: "1.9cqw", color: "#17131F" }}>{k}</span>{pill(v, `${BK_INDIGO}14`, BK_INDIGO)}
          </div>
        ))}
        <div style={{ marginTop: "1.7cqw", display: "flex", alignItems: "center", gap: "1.2cqw" }}>
          <span style={{ fontSize: "1.4cqw", fontWeight: 700, color: "#8a8496", whiteSpace: "nowrap" }}>6 / 8 booked</span>
          <div style={{ flex: 1, height: "1.6cqw", borderRadius: 999, background: "#ecebf0", overflow: "hidden" }}><div style={{ width: "75%", height: "100%", background: BK_INDIGO, borderRadius: 999 }} /></div>
        </div>
      </div>
    </div>
  ));
  const iconWrap = (glyph: string): ReactNode => <span style={{ width: "3cqw", height: "3cqw", borderRadius: ".8cqw", background: "#f3f2fb", display: "grid", placeItems: "center", color: BK_INDIGO, fontSize: "1.7cqw", flexShrink: 0 }}>{glyph}</span>;
  const nodes: [ReactNode, string, string, string][] = [
    [iconWrap("▤"), "CRM record", "Stage → Booked", "Updated"],
    [bLogo("google-calendar.png", 3), "Calendar", "Event created", "Synced"],
    [iconWrap("◫"), "Source file", "orig_8842", "Stamped"],
  ];
  return softSq("linear-gradient(158deg,#ECEAFB,#F3F2FD)", center(
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1.2cqw", background: BK_INDIGO, color: "#fff", borderRadius: "1.8cqw", padding: "1.5cqw 2cqw", boxShadow: "0 2cqw 3.4cqw -1.4cqw rgba(79,70,229,.5)" }}>
        <span style={{ width: "2.4cqw", height: "2.4cqw", borderRadius: "50%", background: "#4ADE80", color: "#12331f", display: "grid", placeItems: "center", fontSize: "1.4cqw" }}>✓</span>
        <div style={{ lineHeight: 1.2 }}><div style={{ fontWeight: 700, fontSize: "1.75cqw" }}>Booking confirmed</div><div style={{ fontSize: "1.25cqw", opacity: 0.85 }}>Thu 12 Jun · 14:30</div></div>
        <span style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: ".7cqw", padding: ".8cqw 1.5cqw", borderRadius: 999, background: "rgba(255,255,255,.2)", fontWeight: 700, fontSize: "1.3cqw", whiteSpace: "nowrap" }}>writing to 3 systems</span>
      </div>
      <div style={{ position: "relative", height: "8cqw" }}>
        <div style={{ position: "absolute", top: 0, left: "50%", marginLeft: "-0.2cqw", height: "42%", borderLeft: "0.4cqw dotted #c7c3e0" }} />
        <div style={{ position: "absolute", top: "42%", left: "16.6%", right: "16.6%", borderTop: "0.4cqw dotted #c7c3e0" }} />
        {[16.6, 50, 83.4].map((x) => <div key={x} style={{ position: "absolute", top: "42%", left: `${x}%`, marginLeft: "-0.2cqw", height: "58%", borderLeft: "0.4cqw dotted #c7c3e0" }} />)}
        {([[16.6, "#22C55E"], [50, "#2DD4BF"], [83.4, "#F5B94A"]] as [number, string][]).map(([x, c]) => <span key={x} style={{ position: "absolute", top: "42%", left: `${x}%`, transform: "translate(-50%,-50%)", width: "1.5cqw", height: "1.5cqw", borderRadius: "50%", background: c, boxShadow: `0 0 0 0.5cqw ${c}33` }} />)}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.3cqw" }}>
        {nodes.map(([icon, title, sub, status]) => (
          <div key={title} style={{ ...CARD_SM, padding: "1.4cqw 1.3cqw", display: "flex", flexDirection: "column", gap: ".9cqw" }}>
            <div style={{ display: "flex", alignItems: "center", gap: ".8cqw" }}>{icon}<span style={{ fontWeight: 700, fontSize: "1.4cqw", color: "#17131F" }}>{title}</span></div>
            <span style={{ fontSize: "1.3cqw", color: "#8a8496", fontWeight: 600 }}>{sub}</span>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>{pill(`${status} ✓`, "#E6F6EC", GREEN)}<span style={{ fontSize: "1.2cqw", color: "#b3b8bf", fontWeight: 700 }}>21:48</span></div>
          </div>
        ))}
      </div>
    </div>
  ));
}

// ── RETAIN ────────────────────────────────────────────────────────────────────
function retainHero(a: string): ReactNode {
  const steps: [string, string, string][] = [["Booked", "Mon", "done"], ["Reminder sent", "Wed", "done"], ["Reschedule → Fri 14:30", "Wed", "done"]];
  return sq(a, center(
    <div style={{ ...CARD }}>
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
  ));
}
function retainDeep(i: number, a: string): ReactNode {
  if (i === 0) return sq(a, center(<>
    <div style={{ ...CARD_SM, padding: "1.6cqw 2.2cqw", display: "flex", alignItems: "center", gap: "1.2cqw" }}>
      <span style={{ width: "3cqw", height: "3cqw", borderRadius: ".8cqw", background: a, color: "#fff", display: "grid", placeItems: "center", fontSize: "1.5cqw" }}>▤</span><span style={{ fontWeight: 700, fontSize: "1.7cqw", color: "#17131F" }}>Booking created · Thu 10:00</span>
    </div>
    <div style={{ ...CARD }}>
      {hdr(a, "Cadence running", "no manual trigger")}
      <div style={{ padding: "1.4cqw 2.6cqw 2cqw" }}>
        {[["Confirmation", "Sent"], ["Day-before", "Queued"], ["Hour-before", "Scheduled"]].map(([l, s], j) => (
          <div key={l} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.6cqw 0", borderBottom: "1px solid #f2f3f5" }}>
            <span style={{ fontWeight: 700, fontSize: "1.75cqw", color: "#17131F" }}>{l}</span>{pill(s, j === 0 ? GREEN_BG : GREY_BG, j === 0 ? GREEN : GREY)}
          </div>
        ))}
      </div>
    </div>
  </>));
  if (i === 1) return sq(a, center(
    <div style={{ ...CARD }}>
      <div style={{ padding: "1.4cqw 2.2cqw", borderBottom: "1px solid #f2f3f5", fontSize: "1.3cqw", letterSpacing: ".1em", textTransform: "uppercase", color: a, fontWeight: 700 }}>Day-before verification</div>
      <div style={{ padding: "2cqw 2.4cqw" }}>
        <div style={{ ...CARD_SM, padding: "1.6cqw 1.8cqw", fontSize: "1.6cqw", lineHeight: 1.4, background: `${a}0d` }}>Hi — a reminder your appointment is tomorrow at 10:00. Reply Y to confirm, or R to reschedule.</div>
        <div style={{ display: "flex", gap: "1.2cqw", marginTop: "1.6cqw" }}>{pill("Y · Confirm", GREEN_BG, GREEN)}{pill("R · Reschedule", `${a}18`, a)}</div>
      </div>
    </div>
  ));
  return sq(a, center(
    <div style={{ ...CARD }}>
      {hdr("#E28A3D", "No-show")}
      <div style={{ padding: "2cqw 2.6cqw", display: "flex", flexDirection: "column", gap: "1.6cqw" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1.2cqw" }}><span style={{ fontWeight: 700, fontSize: "1.8cqw", color: "#17131F", flex: 1 }}>Thu 10:00 · missed</span>{pill("Recovery", AMBER_BG, AMBER)}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>{pill("Missed", "#f4f5f7", "#8a9099")}<span style={{ flex: 1, borderTop: "0.4cqw dotted #cfd3da", margin: "0 .8cqw" }} />{pill("New time offered →", GREEN_BG, GREEN)}</div>
      </div>
    </div>
  ));
}

// ── REACTIVATE ────────────────────────────────────────────────────────────────
function reactivateHero(a: string): ReactNode {
  return sq(a, center(<>
    <div style={{ ...CARD_SM, padding: "1.6cqw 2.2cqw", display: "flex", alignItems: "center", gap: "1.2cqw" }}>
      <span style={{ width: "3.4cqw", height: "3.4cqw", borderRadius: "50%", background: "#e7e2f2", color: a, display: "grid", placeItems: "center", fontWeight: 700, fontSize: "1.5cqw" }}>RB</span>
      <div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: "1.7cqw", color: "#17131F" }}>Rachel Byrne</div></div>{pill("Dormant · 214d", GREY_BG, GREY)}
    </div>
    <div style={{ ...CARD }}>
      {hdr(a, "Back in play")}
      <div style={{ padding: "1.4cqw 2.6cqw 2cqw" }}>
        {frow("Touch sent", "Wk 11 · email", a)}{frow("Reply", "Received", a)}{frow("Status", "Re-qualifying", a)}
      </div>
    </div>
  </>));
}
function reactivateDeep(i: number, a: string): ReactNode {
  if (i === 0) {
    const rows = [["Priya Nair", "8 mo", "Matched"], ["Tom Alvarez", "11 mo", "Matched"], ["Dani Kohl", "3 mo", "Dormant"], ["Léa Mercier", "14 mo", "Matched"]];
    return sq(a, center(
      <div style={{ ...CARD }}>
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
    ));
  }
  if (i === 1) return sq(a, center(
    <div style={{ ...CARD }}>
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
  ));
  return sq(a, center(
    <div style={{ ...CARD }}>
      {hdr(a, "Requalified", "● reply received")}
      <div style={{ padding: "2cqw 2.6cqw", display: "flex", gap: "1.6cqw" }}>
        <div style={{ flex: 1, background: "#f6f7f9", borderRadius: "1.8cqw", padding: "1.8cqw" }}><div style={{ fontSize: "1.3cqw", textTransform: "uppercase", color: "#9aa0a8", fontWeight: 700, marginBottom: ".6cqw" }}>Score</div><div style={{ fontFamily: SERIF, fontSize: "3.4cqw", fontWeight: 600 }}>82<span style={{ fontSize: "1.5cqw", color: "#b3b8bf" }}>/100</span></div></div>
        <div style={{ flex: 1, background: `${a}14`, borderRadius: "1.8cqw", padding: "1.8cqw" }}><div style={{ fontSize: "1.3cqw", textTransform: "uppercase", color: a, fontWeight: 700, marginBottom: ".6cqw" }}>Value</div><div style={{ fontFamily: SERIF, fontSize: "3.4cqw", fontWeight: 600, color: a }}>£14.2k</div></div>
      </div>
    </div>
  ));
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
  return sq(a, center(
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2cqw" }}>
      {ftQuad(a, "Document", "Received ✓", true)}
      {ftQuad(a, "Status update", "Sent ✓", true)}
      {ftQuad(a, "Quote", "Accepted", false)}
      {ftQuad(a, "Invoice", "Paid ✓", true)}
    </div>
  ));
}
function followThroughDeep(i: number, a: string): ReactNode {
  if (i === 0) return sq(a, center(
    <div style={{ display: "flex", gap: "2.4cqw", alignItems: "flex-start" }}>
      <div style={{ flex: 1, ...CARD }}>
        {hdr(a, "Law firm")}
        <div style={{ padding: "1.6cqw", display: "flex", flexDirection: "column", gap: "1.2cqw" }}>
          {[["Documents", true], ["Status", true], ["Invoicing", false]].map(([m, on]) => <div key={m as string} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "1.4cqw", fontWeight: 700, color: on ? "#17131F" : "#b3b8bf" }}>{m}<span style={{ width: "3cqw", height: "1.8cqw", borderRadius: 999, background: on ? a : "#e3e4ea", position: "relative" }}><span style={{ position: "absolute", top: ".3cqw", left: on ? "1.5cqw" : ".3cqw", width: "1.2cqw", height: "1.2cqw", borderRadius: "50%", background: "#fff" }} /></span></div>)}
        </div>
      </div>
      <div style={{ flex: 1, ...CARD }}>
        {hdr("#17131F", "Trades")}
        <div style={{ padding: "1.6cqw", display: "flex", flexDirection: "column", gap: "1.2cqw" }}>
          {[["Documents", false], ["Quotes", true], ["Invoicing", true]].map(([m, on]) => <div key={m as string} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "1.4cqw", fontWeight: 700, color: on ? "#17131F" : "#b3b8bf" }}>{m}<span style={{ width: "3cqw", height: "1.8cqw", borderRadius: 999, background: on ? a : "#e3e4ea", position: "relative" }}><span style={{ position: "absolute", top: ".3cqw", left: on ? "1.5cqw" : ".3cqw", width: "1.2cqw", height: "1.2cqw", borderRadius: "50%", background: "#fff" }} /></span></div>)}
        </div>
      </div>
    </div>
  ));
  if (i === 1) return sq(a, center(
    <div style={{ ...CARD }}>
      {hdr(a, "Document chase")}
      <div style={{ padding: "1.4cqw 2.6cqw 2cqw" }}>
        {[["Requested", "Sent"], ["Reminder", "Sent"], ["File received", "✓"]].map(([l, s], j) => (
          <div key={l} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.6cqw 0", borderBottom: "1px solid #f2f3f5" }}>
            <span style={{ fontWeight: 700, fontSize: "1.75cqw", color: "#17131F" }}>{l}</span>{pill(s, j === 2 ? GREEN_BG : `${a}14`, j === 2 ? GREEN : a)}
          </div>
        ))}
      </div>
    </div>
  ));
  return sq(a, center(<>
    <div style={{ ...CARD_SM, padding: "1.6cqw 2.2cqw", display: "flex", alignItems: "center", gap: "1.2cqw" }}>
      <span style={{ fontWeight: 700, fontSize: "1.7cqw", color: "#17131F", flex: 1 }}>Quote #4821</span>{pill("Accepted ✓", GREEN_BG, GREEN)}
    </div>
    <div style={{ ...CARD }}>
      {hdr(a, "Invoice ageing")}
      <div style={{ padding: "2cqw 2.4cqw", display: "flex", gap: "1.2cqw" }}>
        {[["0–30", GREEN_BG, GREEN], ["30–60", AMBER_BG, AMBER], ["60–90", "#FBE6E6", "#E23D3D"]].map(([l, bg, fg], j) => (
          <div key={l} style={{ flex: 1, textAlign: "center", padding: "1.4cqw 0", borderRadius: "1.4cqw", background: bg as string, color: fg as string, fontWeight: 700, fontSize: "1.5cqw", outline: j === 0 ? `0.4cqw solid ${a}` : "none" }}>{l}</div>
        ))}
      </div>
    </div>
  </>));
}

// ── CLOSED-LOOP ATTRIBUTION ───────────────────────────────────────────────────
function clRow(k: string, v: ReactNode, mono = false): ReactNode {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1.2cqw", padding: "1.4cqw 0", borderBottom: "1px solid #f2f3f5" }}>
      <span style={{ width: "34%", fontSize: "1.2cqw", letterSpacing: ".06em", textTransform: "uppercase", color: "#9aa0a8", fontWeight: 700 }}>{k}</span>
      <span style={{ flex: 1, fontWeight: 700, fontSize: "1.6cqw", color: "#17131F", fontFamily: mono ? "ui-monospace, monospace" : undefined, display: "flex", alignItems: "center", gap: ".8cqw" }}>{v}</span>
    </div>
  );
}
// Vertically-centred wrapper with no inter-child gap (the dashed connectors provide the spacing).
function clWrap(children: ReactNode): ReactNode {
  return <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: "6%" }}>{children}</div>;
}
// Dashed vertical connector, optional floating pill label, arrowhead at the foot.
function clConn(label?: string): ReactNode {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "0.3cqw 0" }}>
      <div style={{ height: "1.7cqw", borderLeft: "0.35cqw dashed #b3aacf" }} />
      {label ? <span style={{ background: "#fff", border: "1px solid #e7e2f2", borderRadius: 999, padding: ".7cqw 1.5cqw", fontSize: "1.2cqw", fontWeight: 700, color: "#6b6480", boxShadow: "0 1cqw 2cqw -1.2cqw rgba(23,19,31,.25)" }}>{label}</span> : null}
      <div style={{ height: "1.7cqw", borderLeft: "0.35cqw dashed #b3aacf" }} />
      <span style={{ fontSize: "1.4cqw", lineHeight: 0.6, color: "#b3aacf" }}>▾</span>
    </div>
  );
}
// Dashed-border box with an uppercase label (Outside the loop / boundary).
function clDashedBox(label: string, children: ReactNode, labelColor = "#9a94ad"): ReactNode {
  return (
    <div style={{ border: "0.3cqw dashed #b9b2d6", borderRadius: "2.2cqw", padding: "1.4cqw 1.6cqw" }}>
      <div style={{ fontSize: "1.1cqw", letterSpacing: ".16em", textTransform: "uppercase", color: labelColor, fontWeight: 700, marginBottom: "1cqw" }}>{label}</div>
      {children}
    </div>
  );
}
function closedLoopHero(a: string): ReactNode {
  const caps = ["Capture", "Qualify", "Book", "Retain", "Reactivate", "Follow through"];
  const stages: [string, string][] = [["Step 1", "Match"], ["Step 2", "Tag"], ["Step 3", "Deliver"]];
  return sq(a, clWrap(<>
    {clDashedBox("Outside the loop", (
      <div style={{ ...CARD_SM, padding: "1.4cqw 1.6cqw", display: "flex", alignItems: "center", gap: "1.2cqw" }}>
        {bLogo("google-ads.png", 4.6)}
        <div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: "1.6cqw", color: "#17131F" }}>Google Ads</div><div style={{ fontSize: "1.15cqw", color: "#8a9099" }}>Your team uploads · we never log in</div></div>
      </div>
    ))}
    {clConn("outcome file ↑")}
    <div style={{ borderRadius: "2.4cqw", padding: "1.6cqw 1.8cqw", background: "linear-gradient(120deg, #8B7DD8, #4B3F86)", color: "#fff", boxShadow: "0 3cqw 5cqw -2.4cqw rgba(75,63,134,.6)" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "1.2cqw" }}>
        <span style={{ fontSize: "1.1cqw", letterSpacing: ".16em", textTransform: "uppercase", opacity: 0.72, fontWeight: 700 }}>Add-on layer</span>
        <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 600, fontSize: "1.85cqw" }}>Closed-loop attribution</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1cqw" }}>
        {stages.map(([n, l]) => (
          <div key={n} style={{ background: "rgba(255,255,255,0.14)", borderRadius: "1.4cqw", padding: "1.2cqw .8cqw", textAlign: "center" }}>
            <div style={{ fontSize: "1.05cqw", letterSpacing: ".08em", textTransform: "uppercase", opacity: 0.75, fontWeight: 700, marginBottom: ".3cqw" }}>{n}</div>
            <div style={{ fontWeight: 700, fontSize: "1.5cqw" }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
    {clConn("click IDs + qualified outcomes ↑")}
    <div style={{ ...CARD, padding: "1.4cqw 1.8cqw" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1cqw", marginBottom: "1.1cqw" }}>
        <span style={{ width: "2cqw", height: "2cqw", borderRadius: "50%", background: a, display: "grid", placeItems: "center" }}><span style={{ width: ".8cqw", height: ".8cqw", borderRadius: "50%", background: "#fff" }} /></span>
        <span style={{ fontWeight: 700, fontSize: "1.6cqw", color: "#17131F" }}>Rosebud core system</span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.7cqw" }}>
        {caps.map((c) => <span key={c} style={{ background: `${a}14`, color: a, borderRadius: 999, padding: ".7cqw 1.2cqw", fontSize: "1.2cqw", fontWeight: 700 }}>{c}</span>)}
      </div>
    </div>
  </>));
}
function closedLoopDeep(i: number, a: string): ReactNode {
  if (i === 0) return sq(a, clWrap(<>
    <div style={{ alignSelf: "center", ...CARD_SM, padding: "1.3cqw 1.7cqw", display: "flex", alignItems: "center", gap: "1.1cqw" }}>
      {bLogo("google-ads.png", 4.2)}
      <div><div style={{ fontWeight: 700, fontSize: "1.55cqw", color: "#17131F" }}>Ad click</div><div style={{ fontFamily: "ui-monospace, monospace", fontSize: "1.3cqw", color: "#8a9099" }}>gclid = Cj0KaQ…</div></div>
    </div>
    {clConn()}
    <div style={{ ...CARD }}>
      <div style={{ background: "#4B3F86", color: "#fff", padding: "1.5cqw 2cqw", display: "flex", alignItems: "center", gap: "1cqw" }}>
        <span style={{ width: "1.6cqw", height: "1.6cqw", borderRadius: "50%", background: "#4ADE80" }} />
        <span style={{ fontFamily: SERIF, fontWeight: 600, fontSize: "1.9cqw" }}>Lead record</span>
      </div>
      <div style={{ padding: "0.4cqw 2.4cqw 1cqw" }}>
        {clRow("Contact", "Rachel Byrne")}
        {clRow("Source", "Google / paid")}
        {clRow("Click ID", "Cj0KaQ…", true)}
      </div>
      <div style={{ padding: "0 2.4cqw 1.8cqw" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: ".7cqw", background: GREEN_BG, color: GREEN, borderRadius: 999, padding: ".8cqw 1.4cqw", fontSize: "1.3cqw", fontWeight: 700 }}><span style={{ width: "1.1cqw", height: "1.1cqw", borderRadius: "50%", background: GREEN }} />Still attached · 6 weeks later</span>
      </div>
    </div>
  </>));
  if (i === 1) return softSq("linear-gradient(155deg,#F3EBE1,#EFE5D7)", clWrap(<>
    <div style={{ ...CARD }}>
      <div style={{ padding: "1.6cqw 2cqw", borderBottom: "1px solid #f2f3f5", display: "flex", alignItems: "center", gap: "1.3cqw" }}>
        {avatar("RB", a, "#fff", 4)}
        <div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: "1.85cqw", color: "#17131F" }}>Rachel Byrne</div><div style={{ fontSize: "1.3cqw", color: "#8a9099" }}>from Google / paid search</div></div>
        {pill("✓ Qualified", GREEN_BG, GREEN)}
      </div>
      <div style={{ padding: "1.6cqw 2cqw", display: "flex", gap: "1.4cqw" }}>
        <div style={{ flex: 1, background: "#f6f7f9", borderRadius: "1.6cqw", padding: "1.4cqw 1.6cqw" }}>
          <div style={{ fontSize: "1.1cqw", letterSpacing: ".1em", textTransform: "uppercase", color: "#9aa0a8", fontWeight: 700, marginBottom: ".6cqw" }}>Signal sent</div>
          <div style={{ fontFamily: SERIF, fontWeight: 600, fontSize: "2.6cqw", color: "#17131F" }}>Qualified ✔</div>
        </div>
        <div style={{ flex: 1, background: `${a}14`, borderRadius: "1.6cqw", padding: "1.4cqw 1.6cqw" }}>
          <div style={{ fontSize: "1.1cqw", letterSpacing: ".1em", textTransform: "uppercase", color: a, fontWeight: 700, marginBottom: ".6cqw" }}>Value (CRM)</div>
          <div style={{ fontFamily: SERIF, fontWeight: 600, fontSize: "2.6cqw", color: a }}><span style={{ fontSize: "1.4cqw", color: "#b3b8bf", textDecoration: "line-through" }}>est.</span> £14.2k</div>
        </div>
      </div>
    </div>
    <div style={{ marginTop: "1.8cqw", background: "#17131F", color: "#F5F1EA", borderRadius: "1.8cqw", padding: "1.5cqw 2cqw", display: "flex", alignItems: "center", gap: "1cqw", fontSize: "1.4cqw", fontWeight: 600 }}>
      <span style={{ fontSize: "1.5cqw" }}>↻</span> Estimate → real closed value, when your CRM reports back
    </div>
  </>));
  return sq(a, clWrap(<>
    <div style={{ ...CARD }}>
      <div style={{ padding: "1.5cqw 2cqw", display: "flex", alignItems: "center", gap: "1.1cqw", borderBottom: "1px solid #f2f3f5" }}>
        <span style={{ width: "2.6cqw", height: "2.6cqw", borderRadius: ".7cqw", background: GREEN_BG, color: GREEN, display: "grid", placeItems: "center", fontSize: "1.4cqw" }}>▤</span>
        <div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: "1.65cqw", color: "#17131F" }}>outcomes.csv</div><div style={{ fontSize: "1.2cqw", color: "#8a9099" }}>Google spec · hashed</div></div>
        {pill("● Every Monday", `${a}18`, a)}
      </div>
      <div style={{ padding: "1cqw 2cqw 1.4cqw" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 0.7fr", alignItems: "center", columnGap: "1cqw" }}>
          {["Click ID", "Outcome", "Value"].map((h, j) => <span key={h} style={{ fontSize: "1.1cqw", textTransform: "uppercase", letterSpacing: ".06em", color: "#9aa0a8", fontWeight: 700, paddingBottom: ".8cqw", textAlign: j === 2 ? "right" : "left" }}>{h}</span>)}
          {([["Cj0KaQ…", "Qualified", "£14.2k", true], ["EA1a9C…", "No sale", "—", false]] as [string, string, string, boolean][]).flatMap(([id, o, v, ok]) => [
            <span key={id + "i"} style={{ fontFamily: "ui-monospace, monospace", fontWeight: 700, fontSize: "1.4cqw", color: "#17131F", padding: "1cqw 0" }}>{id}</span>,
            <span key={id + "o"} style={{ padding: "1cqw 0" }}>{pill(o, ok ? GREEN_BG : GREY_BG, ok ? GREEN : GREY)}</span>,
            <span key={id + "v"} style={{ fontWeight: 700, fontSize: "1.45cqw", color: ok ? "#17131F" : "#b3b8bf", padding: "1cqw 0", textAlign: "right" }}>{v}</span>,
          ])}
        </div>
      </div>
    </div>
    {clConn("delivered to your team")}
    <div style={{ background: "#0E0C12", color: "#F5F1EA", borderRadius: "2cqw", padding: "1.5cqw 1.8cqw", display: "flex", alignItems: "center", gap: "1.2cqw" }}>
      <span style={{ width: "3cqw", height: "3cqw", borderRadius: ".8cqw", background: "rgba(255,255,255,0.1)", display: "grid", placeItems: "center", fontSize: "1.5cqw" }}>👥</span>
      <div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: "1.6cqw" }}>Your media team</div><div style={{ fontSize: "1.2cqw", opacity: 0.7 }}>reviews & runs the upload</div></div>
      <span style={{ background: a, color: "#fff", borderRadius: 999, padding: ".8cqw 1.5cqw", fontSize: "1.3cqw", fontWeight: 700 }}>Upload ↑</span>
    </div>
    {clConn()}
    {clDashedBox("Outside the boundary", (
      <div style={{ display: "flex", alignItems: "center", gap: "1.1cqw" }}>
        {bLogo("google-ads.png", 4)}
        <div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: "1.55cqw", color: "#17131F" }}>Google Ads account</div><div style={{ fontSize: "1.2cqw", color: "#8a9099" }}>We never log in</div></div>
        <span style={{ fontSize: "1.6cqw" }}>🔒</span>
      </div>
    ), a)}
  </>));
}

const HEROES: Record<string, (a: string) => ReactNode> = {
  qualify: qualifyHero, book: bookHero, retain: retainHero, reactivate: reactivateHero, "follow-through": followThroughHero, "closed-loop-attribution": closedLoopHero,
};
const DEEPS: Record<string, (i: number, a: string) => ReactNode> = {
  qualify: qualifyDeep, book: bookDeep, retain: retainDeep, reactivate: reactivateDeep, "follow-through": followThroughDeep, "closed-loop-attribution": closedLoopDeep,
};

export function bespokeHero(slug: string, accent: string): ReactNode | null {
  return HEROES[slug] ? HEROES[slug](accent) : null;
}
export function bespokeDeep(slug: string, i: number, accent: string): ReactNode | null {
  return DEEPS[slug] ? DEEPS[slug](i, accent) : null;
}

// Mini-mock shown at the top of each "How it works" panel (fixed px, not cqw).
export function bespokePanel(slug: string, i: number, accent: string): ReactNode | null {
  if (slug !== "closed-loop-attribution") return null;
  const chip: React.CSSProperties = { display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", borderRadius: 12, padding: "9px 13px", boxShadow: "0 12px 26px -16px rgba(0,0,0,.55)" };
  if (i === 0) return (
    <div style={chip}>
      <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 12, color: "#8a8496" }}>gclid</span>
      <span style={{ color: accent, fontWeight: 700 }}>→</span>
      <span style={{ fontWeight: 700, fontSize: 13, color: "#17131F" }}>£14.2k won</span>
    </div>
  );
  if (i === 1) return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/assets/integrations/google-ads.png" alt="" width={34} height={34} style={{ display: "block", background: "#fff", borderRadius: 9, padding: 5, boxShadow: "0 12px 26px -16px rgba(0,0,0,.55)" }} />
      <span style={{ background: accent, color: "#fff", borderRadius: 999, padding: "7px 14px", fontSize: 12.5, fontWeight: 700 }}>Qualified ✓</span>
    </div>
  );
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <div style={chip}>
        <span style={{ width: 18, height: 18, borderRadius: 4, background: "#E6F6EC", color: "#2E9E5B", display: "grid", placeItems: "center", fontSize: 11 }}>▤</span>
        <span style={{ fontWeight: 700, fontSize: 13, color: "#17131F" }}>outcomes.csv</span>
      </div>
      <span style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(245,241,234,0.1)", border: "1px solid rgba(245,241,234,0.2)", display: "grid", placeItems: "center", color: "#F5F1EA", fontSize: 13 }}>👤</span>
    </div>
  );
}
