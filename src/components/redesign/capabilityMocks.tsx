import type { CSSProperties, ReactNode } from "react";

// Bespoke hero + deep-dive graphic mocks per capability, matched to the copy.
// Same visual language as the Capture page: white glass cards on a tinted
// container-query square, per-capability accent. Rendered inside .rb-cq (page CSS).

const SERIF = "var(--font-cormorant), 'Cormorant Garamond', serif";
const CARD: CSSProperties = { background: "#fff", borderRadius: "3cqw", boxShadow: "0 3cqw 5cqw -1.6cqw rgba(23,19,31,.3)", overflow: "hidden" };
const CARD_SM: CSSProperties = { background: "#fff", borderRadius: "2.4cqw", boxShadow: "0 2cqw 3.4cqw -1.4cqw rgba(23,19,31,.4)" };

// Soft accent-tinted panel background (per-page accent, matches the designed mocks).
const tint = (a: string): string => `linear-gradient(158deg, ${a}1f, ${a}0b)`;
// A single white card that fills the container (inset), so mocks aren't clustered
// at the top with dead space beneath. Content distributes vertically via flex.
function fillCard(children: ReactNode): ReactNode {
  return <div style={{ position: "absolute", inset: "7%", ...CARD, display: "flex", flexDirection: "column", overflow: "hidden" }}>{children}</div>;
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
function pill(text: string, bg: string, fg: string): ReactNode {
  return <span style={{ display: "inline-block", padding: ".7cqw 1.6cqw", borderRadius: 999, fontWeight: 700, fontSize: "1.4cqw", background: bg, color: fg }}>{text}</span>;
}
const GREEN_BG = "#E6F6EC", GREEN = "#2E9E5B", AMBER_BG = "#FBEEDD", AMBER = "#B5761A", GREY_BG = "#EEECF3", GREY = "#8a8496";

// ── QUALIFY ───────────────────────────────────────────────────────────────────
function qualifyHero(a: string): ReactNode {
  return softSq(tint(a), fillCard(<>
    {hdr(a, "Evaluating enquiry", "live")}
    <div style={{ flex: 1, padding: "0 2.8cqw", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      {([["Budget", "£8,000"], ["Location", "In service area"], ["Timeline", "This month"]] as [string, string][]).map(([k, v]) => (
        <div key={k} style={{ display: "flex", alignItems: "center", gap: "1.4cqw", padding: "2.4cqw 0", borderBottom: "1px solid #f2f3f5" }}>
          <span style={{ width: "34%", fontSize: "1.5cqw", letterSpacing: ".04em", textTransform: "uppercase", color: "#9aa0a8", fontWeight: 700 }}>{k}</span>
          <span style={{ flex: 1, fontWeight: 700, fontSize: "2.2cqw", color: "#17131F" }}>{v}</span>
          <span style={{ width: "2.2cqw", height: "2.2cqw", borderRadius: "50%", background: a, color: "#fff", display: "grid", placeItems: "center", fontSize: "1.3cqw" }}>✓</span>
        </div>
      ))}
    </div>
    <div style={{ padding: "2.6cqw 2.8cqw", background: `${a}0d`, display: "flex", alignItems: "center", gap: "1.4cqw" }}>
      {pill("Qualified", GREEN_BG, GREEN)}<span style={{ fontFamily: SERIF, fontWeight: 600, fontSize: "4.2cqw", color: a, marginLeft: "auto", lineHeight: 1 }}>£4,200</span>
    </div>
  </>));
}
function qualifyDeep(i: number, a: string): ReactNode {
  if (i === 0) return softSq(tint(a), fillCard(<>
    {hdr(a, "Qualification rules")}
    <div style={{ flex: 1, padding: "0 2.8cqw", display: "flex", flexDirection: "column", justifyContent: "center", gap: "2.2cqw" }}>
      {([["budget", "≥", "£5,000"], ["location", "in", "your list"], ["fit", "=", "yes"]] as [string, string, string][]).map(([f, o, v]) => (
        <div key={f} style={{ display: "flex", alignItems: "center", gap: "1.2cqw", fontSize: "1.95cqw" }}>
          <span style={{ background: "#f4f5f7", borderRadius: "1.2cqw", padding: "1.2cqw 1.8cqw", fontWeight: 700, color: "#17131F" }}>{f}</span>
          <span style={{ color: a, fontWeight: 700 }}>{o}</span>
          <span style={{ background: `${a}14`, color: a, borderRadius: "1.2cqw", padding: "1.2cqw 1.8cqw", fontWeight: 700 }}>{v}</span>
        </div>
      ))}
    </div>
    <div style={{ padding: "2.2cqw 2.8cqw", borderTop: "1px solid #f2f3f5", display: "flex", alignItems: "center", gap: "1.2cqw" }}>
      <span style={{ fontWeight: 700, fontSize: "1.9cqw", color: "#17131F", flex: 1 }}>New enquiry parsing…</span>{pill("Passing ✓", GREEN_BG, GREEN)}
    </div>
  </>));
  if (i === 1) return softSq(tint(a), fillCard(<>
    {hdr("#E23D3D", "Escalated to a person")}
    <div style={{ flex: 1, padding: "0 2.8cqw", display: "flex", flexDirection: "column", justifyContent: "center", gap: "2.4cqw" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1.8cqw" }}>
        {avatar("DK", `${a}22`, a, 7)}
        <div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: "2.4cqw", color: "#17131F" }}>Dr Kim</div><div style={{ fontSize: "1.6cqw", color: "#8a9099" }}>Clinical lead</div></div>
        {pill("● Urgent", "#FBE6E6", "#E23D3D")}
      </div>
      <div style={{ background: "#f6f7f9", borderRadius: "1.6cqw", padding: "2cqw 2.2cqw", fontSize: "1.7cqw", color: "#5a5566", fontWeight: 600, lineHeight: 1.4 }}>Clinical query — outside auto-qualify policy. Routed to a human.</div>
    </div>
    <div style={{ padding: "2cqw 2.8cqw", borderTop: "1px solid #f2f3f5", fontSize: "1.55cqw", color: "#8a9099", fontWeight: 600 }}>Handover logged · 21:47 · audit trail kept</div>
  </>));
  return softSq(tint(a), fillCard(<>
    {hdr(a, "Estimated value")}
    <div style={{ flex: 1, padding: "0 2.8cqw", display: "flex", flexDirection: "column", justifyContent: "center", gap: "2.6cqw" }}>
      <div style={{ fontFamily: SERIF, fontWeight: 600, fontSize: "6.4cqw", color: a, lineHeight: 1 }}>£4,200<span style={{ fontSize: "2cqw", color: "#b3b8bf" }}> est.</span></div>
      <div style={{ height: "2.6cqw", borderRadius: 999, background: "#eef0f2", overflow: "hidden" }}><div style={{ height: "100%", width: "72%", background: a, borderRadius: 999 }} /></div>
      <div style={{ display: "flex", gap: "1.4cqw" }}>
        {(["Tier 1", "Tier 2", "Tier 3"]).map((t, j) => (
          <div key={t} style={{ flex: 1, textAlign: "center", padding: "1.8cqw 0", borderRadius: "1.4cqw", background: j === 1 ? a : `${a}12`, color: j === 1 ? "#fff" : a, fontWeight: 700, fontSize: "1.7cqw" }}>{t}</div>
        ))}
      </div>
    </div>
  </>));
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
  if (i === 0) return softSq("linear-gradient(158deg,#EEF3FE,#F5F3FC)", (
    <div style={{ position: "absolute", inset: "7%", ...CARD, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ background: BK_INDIGO, color: "#fff", padding: "1.9cqw 2.4cqw", display: "flex", alignItems: "center", gap: "1cqw" }}>
        <span style={{ width: "2cqw", height: "2cqw", borderRadius: "50%", background: "#4ADE80" }} />
        <span style={{ fontWeight: 700, fontSize: "1.95cqw" }}>Live availability</span>
        <span style={{ marginLeft: "auto", fontSize: "1.35cqw", opacity: 0.85 }}>checked just now</span>
      </div>
      <div style={{ flex: 1, padding: "0 2.4cqw", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        {([["15:00", "Open", "open"], ["15:30", "Holding · 4:58", "hold"], ["16:00", "Booked", "booked"], ["16:30", "Open", "open"]] as [string, string, string][]).map(([t, s, kind]) => {
          const bk = kind === "booked", hold = kind === "hold";
          return (
            <div key={t} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "2.1cqw 0", borderBottom: "1px solid #f2f3f5" }}>
              <span style={{ fontWeight: 700, fontSize: "2cqw", color: bk ? "#b3b8bf" : "#17131F", textDecoration: bk ? "line-through" : "none" }}>{t}</span>
              {pill(s, hold ? "#FBEEDD" : bk ? "#f0f1f4" : "#E6F6EC", hold ? "#B5761A" : bk ? "#b3b8bf" : GREEN)}
            </div>
          );
        })}
      </div>
      <div style={{ padding: "1.9cqw 2.4cqw", borderTop: "1px solid #f2f3f5", fontSize: "1.4cqw", fontWeight: 600, color: "#8a8496" }}>Reserved against your real calendar — no double-booking.</div>
    </div>
  ));
  if (i === 1) return softSq("linear-gradient(158deg,#F7F3EA,#F1F0FB)", (
    <div style={{ position: "absolute", inset: "7%", ...CARD, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ background: BK_INDIGO, color: "#fff", padding: "1.9cqw 2.4cqw", display: "flex", alignItems: "center", gap: "1cqw" }}>
        <span style={{ fontWeight: 700, fontSize: "1.95cqw" }}>Appointment types</span>
        <span style={{ marginLeft: "auto" }}>{pill("Property", "rgba(255,255,255,.22)", "#fff")}</span>
      </div>
      <div style={{ flex: 1, padding: "0 2.4cqw", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        {([["Site survey", "60 min"], ["Consultation", "45 min"], ["Prep buffer", "15 min"]] as [string, string][]).map(([k, v]) => (
          <div key={k} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "2.4cqw 0", borderBottom: "1px solid #f2f3f5" }}>
            <span style={{ fontWeight: 700, fontSize: "2cqw", color: "#17131F" }}>{k}</span>{pill(v, `${BK_INDIGO}14`, BK_INDIGO)}
          </div>
        ))}
      </div>
      <div style={{ padding: "1.9cqw 2.4cqw", borderTop: "1px solid #f2f3f5", display: "flex", alignItems: "center", gap: "1.2cqw" }}>
        <span style={{ fontSize: "1.5cqw", fontWeight: 700, color: "#8a8496", whiteSpace: "nowrap" }}>6 / 8 booked</span>
        <div style={{ flex: 1, height: "1.8cqw", borderRadius: 999, background: "#ecebf0", overflow: "hidden" }}><div style={{ width: "75%", height: "100%", background: BK_INDIGO, borderRadius: 999 }} /></div>
      </div>
    </div>
  ));
  const iconWrap = (glyph: string): ReactNode => <span style={{ width: "3cqw", height: "3cqw", borderRadius: ".8cqw", background: "#f3f2fb", display: "grid", placeItems: "center", color: BK_INDIGO, fontSize: "1.7cqw", flexShrink: 0 }}>{glyph}</span>;
  const nodes: [ReactNode, string, string, string][] = [
    [iconWrap("▤"), "CRM record", "Stage → Booked", "Updated"],
    [bLogo("google-calendar.png", 3), "Calendar", "Event created", "Synced"],
    [iconWrap("◫"), "Source file", "orig_8842", "Stamped"],
  ];
  return softSq("linear-gradient(158deg,#ECEAFB,#F3F2FD)", (
    <div style={{ position: "absolute", left: "7%", right: "7%", top: "10%", display: "flex", flexDirection: "column" }}>
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
  const steps: [string, string][] = [["Booked", "Mon 09:02"], ["Reminder sent", "Wed 08:00"], ["Reschedule → Fri 14:30", "Wed 08:12"]];
  return softSq(tint(a), fillCard(<>
    {hdr(a, "Appointment kept", "auto")}
    <div style={{ flex: 1, padding: "1cqw 2.8cqw", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative" }}>
      <div style={{ position: "absolute", left: "4.45cqw", top: "7cqw", bottom: "7cqw", width: "0.3cqw", background: `${a}33` }} />
      {steps.map(([l, d]) => (
        <div key={l} style={{ display: "flex", alignItems: "center", gap: "1.8cqw", padding: "2.6cqw 0", position: "relative", zIndex: 1 }}>
          <span style={{ width: "3.4cqw", height: "3.4cqw", borderRadius: "50%", background: a, color: "#fff", display: "grid", placeItems: "center", fontSize: "1.6cqw", flexShrink: 0 }}>✓</span>
          <span style={{ flex: 1, fontWeight: 700, fontSize: "2cqw", color: "#17131F" }}>{l}</span>{pill(d, `${a}18`, a)}
        </div>
      ))}
    </div>
  </>));
}
function retainDeep(i: number, a: string): ReactNode {
  if (i === 0) return softSq(tint(a), fillCard(<>
    {hdr(a, "Cadence running", "no manual trigger")}
    <div style={{ padding: "2cqw 2.8cqw 0" }}>
      <div style={{ ...CARD_SM, padding: "1.7cqw 2cqw", display: "flex", alignItems: "center", gap: "1.2cqw", background: `${a}0d` }}>
        <span style={{ width: "3cqw", height: "3cqw", borderRadius: ".8cqw", background: a, color: "#fff", display: "grid", placeItems: "center", fontSize: "1.5cqw" }}>▤</span><span style={{ fontWeight: 700, fontSize: "1.8cqw", color: "#17131F" }}>Booking created · Thu 10:00</span>
      </div>
    </div>
    <div style={{ flex: 1, padding: "0 2.8cqw", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      {([["Confirmation", "Sent", 0], ["Day-before", "Queued", 1], ["Hour-before", "Scheduled", 1]] as [string, string, number][]).map(([l, s, g]) => (
        <div key={l} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "2.2cqw 0", borderBottom: "1px solid #f2f3f5" }}>
          <span style={{ fontWeight: 700, fontSize: "2cqw", color: "#17131F" }}>{l}</span>{pill(s, g === 0 ? GREEN_BG : GREY_BG, g === 0 ? GREEN : GREY)}
        </div>
      ))}
    </div>
  </>));
  if (i === 1) return softSq(tint(a), fillCard(<>
    <div style={{ padding: "2.4cqw 2.8cqw", borderBottom: "1px solid #f2f3f5", fontSize: "1.5cqw", letterSpacing: ".1em", textTransform: "uppercase", color: a, fontWeight: 700 }}>Day-before verification</div>
    <div style={{ flex: 1, padding: "0 2.8cqw", display: "flex", flexDirection: "column", justifyContent: "center", gap: "2.6cqw" }}>
      <div style={{ ...CARD_SM, padding: "2.4cqw 2.6cqw", fontSize: "2cqw", lineHeight: 1.45, background: `${a}0d`, color: "#17131F", fontWeight: 500 }}>Hi — a reminder your appointment is tomorrow at 10:00. Reply Y to confirm, or R to reschedule.</div>
      <div style={{ display: "flex", gap: "1.4cqw" }}>{pill("Y · Confirm", GREEN_BG, GREEN)}{pill("R · Reschedule", `${a}18`, a)}</div>
    </div>
  </>));
  return softSq(tint(a), fillCard(<>
    {hdr("#E28A3D", "No-show recovery")}
    <div style={{ flex: 1, padding: "0 2.8cqw", display: "flex", flexDirection: "column", justifyContent: "center", gap: "2.6cqw" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1.2cqw" }}><span style={{ fontWeight: 700, fontSize: "2.1cqw", color: "#17131F", flex: 1 }}>Thu 10:00 · missed</span>{pill("Recovery", AMBER_BG, AMBER)}</div>
      <div style={{ display: "flex", alignItems: "center", gap: "1cqw" }}>{pill("Missed", "#f4f5f7", "#8a9099")}<span style={{ flex: 1, borderTop: "0.4cqw dotted #cfd3da" }} />{pill("New time offered", `${a}18`, a)}</div>
      <div style={{ ...CARD_SM, padding: "2cqw 2.2cqw", display: "flex", alignItems: "center", gap: "1.2cqw", background: GREEN_BG }}><span style={{ color: GREEN, fontWeight: 700, fontSize: "1.8cqw" }}>✓</span><span style={{ fontWeight: 700, fontSize: "1.9cqw", color: "#17131F" }}>Rebooked · Fri 14:30</span></div>
    </div>
  </>));
}

// ── REACTIVATE ────────────────────────────────────────────────────────────────
function reactivateHero(a: string): ReactNode {
  return softSq(tint(a), fillCard(<>
    {hdr(a, "Back in play", "reactivated")}
    <div style={{ flex: 1, padding: "1cqw 2.8cqw", display: "flex", flexDirection: "column", justifyContent: "center", gap: "1.4cqw" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1.6cqw" }}>
        {avatar("RB", `${a}22`, a, 6)}
        <div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: "2.2cqw", color: "#17131F" }}>Rachel Byrne</div><div style={{ fontSize: "1.5cqw", color: "#8a9099" }}>Head of Ops · Meridian Group</div></div>
        {pill("Dormant · 214d", GREY_BG, GREY)}
      </div>
      {([["Touch sent", "Wk 11 · email"], ["Reply", "Received"], ["Status", "Re-qualifying"]] as [string, string][]).map(([k, v], j) => (
        <div key={k} style={{ display: "flex", alignItems: "center", gap: "1.4cqw", padding: "1.9cqw 0", borderTop: "1px solid #f2f3f5" }}>
          <span style={{ width: "30%", fontSize: "1.5cqw", letterSpacing: ".04em", textTransform: "uppercase", color: "#9aa0a8", fontWeight: 700 }}>{k}</span>
          <span style={{ flex: 1, fontWeight: 700, fontSize: "1.95cqw", color: "#17131F" }}>{v}</span>
          <span style={{ width: "2.2cqw", height: "2.2cqw", borderRadius: "50%", background: j < 2 ? a : `${a}33`, color: "#fff", display: "grid", placeItems: "center", fontSize: "1.3cqw" }}>{j < 2 ? "✓" : ""}</span>
        </div>
      ))}
    </div>
  </>));
}
function reactivateDeep(i: number, a: string): ReactNode {
  if (i === 0) {
    const rows: [string, string, string][] = [["Priya Nair", "8 mo", "Matched"], ["Tom Alvarez", "11 mo", "Matched"], ["Dani Kohl", "3 mo", "Dormant"], ["Léa Mercier", "14 mo", "Matched"], ["Owen Frost", "9 mo", "Matched"]];
    return softSq(tint(a), fillCard(<>
      {hdr(a, "Dormant cohort", "2,418 records")}
      <div style={{ flex: 1, padding: "0 2.6cqw", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        {rows.map(([n, t, s]) => (
          <div key={n} style={{ display: "flex", alignItems: "center", gap: "1.4cqw", padding: "1.8cqw 0", borderBottom: "1px solid #f2f3f5" }}>
            {avatar(n.split(" ").map((w) => w[0]).join(""), `${a}22`, a, 3.6)}
            <span style={{ flex: 1, fontWeight: 600, fontSize: "1.9cqw", color: "#17131F" }}>{n}</span>
            <span style={{ fontSize: "1.5cqw", color: "#8a9099" }}>{t}</span>{pill(s, s === "Matched" ? `${a}18` : "#f4f5f7", s === "Matched" ? a : "#8a9099")}
          </div>
        ))}
      </div>
    </>));
  }
  if (i === 1) return softSq(tint(a), fillCard(<>
    {hdr(a, "Cadence running", "no manual trigger")}
    <div style={{ flex: 1, padding: "0 2.6cqw", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      {([["Day 0", "@", "Email touch", "Delivered", GREEN], ["Day 2", "SMS", "SMS touch", "Delivered", GREEN], ["Day 5", "WA", "WhatsApp touch", "Queued", AMBER], ["Day 9", "@", "Final email", "Scheduled", GREY]] as [string, string, string, string, string][]).map(([d, ch, l, st, c]) => (
        <div key={d} style={{ display: "flex", alignItems: "center", gap: "1.4cqw", padding: "1.9cqw 0", borderBottom: "1px solid #f2f3f5" }}>
          <span style={{ width: "5.4cqw", fontSize: "1.45cqw", color: "#9aa0a8", fontWeight: 700 }}>{d}</span>
          <span style={{ width: "3.8cqw", height: "3.8cqw", borderRadius: "1cqw", background: a, color: "#fff", display: "grid", placeItems: "center", fontWeight: 700, fontSize: "1.3cqw", flexShrink: 0 }}>{ch}</span>
          <span style={{ flex: 1, fontWeight: 600, fontSize: "1.9cqw", color: "#17131F" }}>{l}</span>
          {pill(st, c === GREEN ? GREEN_BG : c === AMBER ? AMBER_BG : GREY_BG, c)}
        </div>
      ))}
    </div>
  </>));
  return softSq(tint(a), fillCard(<>
    {hdr(a, "Requalified", "● reply received")}
    <div style={{ flex: 1, padding: "1cqw 2.6cqw", display: "flex", flexDirection: "column", justifyContent: "center", gap: "1.8cqw" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1.4cqw" }}>
        {avatar("RB", `${a}22`, a, 5)}
        <div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: "1.95cqw", color: "#17131F" }}>Rachel Byrne</div><div style={{ fontSize: "1.4cqw", color: "#8a9099" }}>Head of Ops · Meridian Group</div></div>
        {pill("Reply received", GREEN_BG, GREEN)}
      </div>
      <div style={{ display: "flex", gap: "1.6cqw" }}>
        <div style={{ flex: 1, background: "#f6f7f9", borderRadius: "1.8cqw", padding: "2cqw" }}><div style={{ fontSize: "1.35cqw", textTransform: "uppercase", color: "#9aa0a8", fontWeight: 700, marginBottom: ".6cqw" }}>Score</div><div style={{ fontFamily: SERIF, fontSize: "4.2cqw", fontWeight: 600, lineHeight: 1 }}>82<span style={{ fontSize: "1.6cqw", color: "#b3b8bf" }}>/100</span></div></div>
        <div style={{ flex: 1, background: `${a}14`, borderRadius: "1.8cqw", padding: "2cqw" }}><div style={{ fontSize: "1.35cqw", textTransform: "uppercase", color: a, fontWeight: 700, marginBottom: ".6cqw" }}>Value</div><div style={{ fontFamily: SERIF, fontSize: "4.2cqw", fontWeight: 600, color: a, lineHeight: 1 }}>£14.2k</div></div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "1cqw" }}>{pill("Reply", "#f4f5f7", "#8a9099")}<span style={{ flex: 1, borderTop: "0.4cqw dotted #d7d2e0" }} />{pill("Quality", "#f4f5f7", "#8a9099")}<span style={{ flex: 1, borderTop: "0.4cqw dotted #d7d2e0" }} />{pill("Book →", a, "#fff")}</div>
    </div>
  </>));
}

// ── FOLLOW THROUGH ────────────────────────────────────────────────────────────
function followThroughHero(a: string): ReactNode {
  const cards: [string, string, string, boolean][] = [["Document", "▤", "Received", true], ["Status update", "✉", "Sent", true], ["Quote", "£", "Accepted", false], ["Invoice", "◫", "Paid", true]];
  return softSq(tint(a), (
    <div style={{ position: "absolute", inset: "7%", display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: "3cqw" }}>
      {cards.map(([label, icon, status, done]) => (
        <div key={label} style={{ ...CARD, padding: "2.6cqw", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1.3cqw" }}>
            <span style={{ width: "4.4cqw", height: "4.4cqw", borderRadius: "1.3cqw", background: `${a}16`, color: a, display: "grid", placeItems: "center", fontSize: "2.2cqw" }}>{icon}</span>
            <span style={{ fontWeight: 700, fontSize: "2cqw", color: "#17131F" }}>{label}</span>
          </div>
          <div>{pill(`${status} ✓`, done ? GREEN_BG : `${a}18`, done ? GREEN : a)}</div>
        </div>
      ))}
    </div>
  ));
}
function followThroughDeep(i: number, a: string): ReactNode {
  if (i === 0) return softSq(tint(a), (
    <div style={{ position: "absolute", inset: "7%", display: "flex", gap: "3cqw" }}>
      {([["Law firm", a, [["Documents", true], ["Status", true], ["Invoicing", false]]], ["Trades", "#17131F", [["Documents", false], ["Quotes", true], ["Invoicing", true]]]] as [string, string, [string, boolean][]][]).map(([title, hc, mods]) => (
        <div key={title} style={{ flex: 1, ...CARD, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {hdr(hc, title)}
          <div style={{ flex: 1, padding: "0 2.2cqw", display: "flex", flexDirection: "column", justifyContent: "center", gap: "2.8cqw" }}>
            {mods.map(([m, on]) => (
              <div key={m} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "1.9cqw", fontWeight: 700, color: on ? "#17131F" : "#b3b8bf" }}>{m}<span style={{ width: "4.6cqw", height: "2.7cqw", borderRadius: 999, background: on ? a : "#e3e4ea", position: "relative", flexShrink: 0 }}><span style={{ position: "absolute", top: ".35cqw", left: on ? "2.25cqw" : ".35cqw", width: "2cqw", height: "2cqw", borderRadius: "50%", background: "#fff" }} /></span></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ));
  if (i === 1) return softSq(tint(a), fillCard(<>
    {hdr(a, "Document chase")}
    <div style={{ flex: 1, padding: "0 2.8cqw", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      {([["Requested", "Sent", 0], ["Reminder", "Sent", 1], ["File received", "Done ✓", 2]] as [string, string, number][]).map(([l, s, g]) => (
        <div key={l} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "2.4cqw 0", borderBottom: "1px solid #f2f3f5" }}>
          <span style={{ fontWeight: 700, fontSize: "2cqw", color: "#17131F" }}>{l}</span>{pill(s, g === 2 ? GREEN_BG : `${a}14`, g === 2 ? GREEN : a)}
        </div>
      ))}
      <div style={{ marginTop: "2.2cqw", ...CARD_SM, padding: "2cqw 2.2cqw", display: "flex", alignItems: "center", gap: "1.2cqw", background: `${a}0d` }}><span style={{ fontSize: "1.8cqw" }}>🔔</span><span style={{ fontWeight: 700, fontSize: "1.75cqw", color: "#17131F" }}>Milestone reached — proceed to invoice</span></div>
    </div>
  </>));
  return softSq(tint(a), fillCard(<>
    <div style={{ padding: "2.6cqw 2.8cqw", borderBottom: "1px solid #f2f3f5", display: "flex", alignItems: "center", gap: "1.2cqw" }}>
      <span style={{ fontWeight: 700, fontSize: "2.1cqw", color: "#17131F", flex: 1 }}>Quote #4821</span>{pill("Accepted ✓", GREEN_BG, GREEN)}
    </div>
    <div style={{ flex: 1, padding: "0 2.8cqw", display: "flex", flexDirection: "column", justifyContent: "center", gap: "2cqw" }}>
      <div style={{ fontSize: "1.5cqw", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: "#9aa0a8" }}>Invoice ageing</div>
      <div style={{ display: "flex", gap: "1.4cqw" }}>
        {([["0–30", GREEN_BG, GREEN, "£8.4k"], ["30–60", AMBER_BG, AMBER, "£2.1k"], ["60–90", "#FBE6E6", "#E23D3D", "£0"]] as [string, string, string, string][]).map(([l, bg, fg, amt], j) => (
          <div key={l} style={{ flex: 1, textAlign: "center", padding: "2.4cqw 0", borderRadius: "1.6cqw", background: bg, color: fg, fontWeight: 700, fontSize: "1.8cqw", outline: j === 0 ? `0.4cqw solid ${a}` : "none" }}>{l}<div style={{ fontSize: "1.35cqw", fontWeight: 700, marginTop: ".5cqw", opacity: 0.85 }}>{amt}</div></div>
        ))}
      </div>
    </div>
  </>));
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
