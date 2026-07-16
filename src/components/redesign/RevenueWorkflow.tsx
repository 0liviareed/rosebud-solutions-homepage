import type { CSSProperties } from "react";

/* Revenue Workflow node-graph — fixed 920×580 canvas, scaled to fit by the
   parent. Static markup + CSS marching connectors / breathing nodes + an SMIL
   token travelling the loop. Ported from the design export. */

const node: CSSProperties = {
  position: "absolute", zIndex: 2, borderRadius: 15, border: "1px solid rgba(255,255,255,.075)",
  boxShadow: "0 10px 28px rgba(0,0,0,.55), inset 0 1px 0 rgba(255,255,255,.05)",
};
const mono = "ui-monospace,'SF Mono',Menlo,monospace";
const idx: CSSProperties = { position: "absolute", top: 12, right: 14, color: "#50505a", fontSize: 9.5, fontWeight: 700, fontFamily: mono };
const iconWrap: CSSProperties = { width: 32, height: 32, borderRadius: 9, background: "rgba(255,255,255,.05)", color: "#b2b7c4", display: "flex", alignItems: "center", justifyContent: "center" };
const title: CSSProperties = { color: "#ededf1", fontSize: 13.5, fontWeight: 600 };
const bar = (w: string, o: number): CSSProperties => ({ height: 7, width: w, borderRadius: 4, background: `rgba(255,255,255,${o})` });

export default function RevenueWorkflow() {
  return (
    <div style={{ position: "relative", width: 920, height: 580, background: "transparent", overflow: "hidden", fontFamily: '"Helvetica Neue",Helvetica,Arial,system-ui,sans-serif' }}>
      {/* header */}
      <div style={{ position: "absolute", top: 18, left: 22, display: "flex", alignItems: "center", gap: 9, zIndex: 5 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#8b7ff5", boxShadow: "0 0 10px rgba(139,127,245,.9)" }} />
        <span style={{ color: "#e9e9ec", fontSize: 13, fontWeight: 600, letterSpacing: ".2px" }}>Revenue workflow</span>
        <span style={{ color: "#55555f", fontSize: 10.5, fontFamily: mono }}>continuous loop · live</span>
      </div>

      {/* connective layer */}
      <svg viewBox="0 0 920 580" width="100%" height="100%" style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}>
        <defs>
          <filter id="tokenGlow" x="-160%" y="-160%" width="420%" height="420%"><feGaussianBlur stdDeviation="5" /></filter>
          <path id="tokenLoop" fill="none" stroke="none" d="M260,82 L660,82 L770,82 L770,128 L770,160 L758,172 L727,172 L715,172 L715,186 L715,257 L580,257 L340,257 L205,257 L205,332 L205,360 L193,372 L170,372 L158,372 L158,388 L158,434 L276,434 L342,434 L460,434 L460,480 L460,506 L448,518 L34,518 L22,506 L22,94 L34,82 L40,82 L260,82 Z" />
        </defs>
        <g stroke="#8b7ff5" fill="none" strokeLinecap="round" opacity="0.55">
          <path className="rbwf-marchB" d="M578,434 L644,434" strokeWidth="1.4" />
          <path className="rbwf-marchB" d="M715,328 L715,388" strokeWidth="1.4" />
        </g>
        <g stroke="#9a9aad" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.55">
          <path className="rbwf-march" d="M260,82 L660,82" strokeWidth="1.5" />
          <path className="rbwf-march" d="M770,128 L770,160 Q770,172 758,172 L727,172 Q715,172 715,182 L715,186" strokeWidth="1.5" />
          <path className="rbwf-march" d="M580,257 L340,257" strokeWidth="1.5" />
          <path className="rbwf-march" d="M205,332 L205,360 Q205,372 193,372 L170,372 Q158,372 158,382 L158,388" strokeWidth="1.5" />
          <path className="rbwf-march" d="M276,434 L342,434" strokeWidth="1.5" />
          <path className="rbwf-march" d="M460,480 L460,506 Q460,518 448,518 L34,518 Q22,518 22,506 L22,94 Q22,82 34,82 L40,82" strokeWidth="1.5" opacity="0.85" />
        </g>
        <circle r="13" fill="rgba(139,127,245,.5)" filter="url(#tokenGlow)"><animateMotion dur="16s" repeatCount="indefinite"><mpath href="#tokenLoop" /></animateMotion></circle>
        <circle r="3.5" fill="rgba(199,192,255,.65)"><animateMotion dur="16s" begin="-0.15s" repeatCount="indefinite"><mpath href="#tokenLoop" /></animateMotion></circle>
        <circle r="2.5" fill="rgba(199,192,255,.4)"><animateMotion dur="16s" begin="-0.28s" repeatCount="indefinite"><mpath href="#tokenLoop" /></animateMotion></circle>
        <circle r="5.5" fill="#efeaff"><animateMotion dur="16s" repeatCount="indefinite"><mpath href="#tokenLoop" /></animateMotion></circle>
      </svg>

      <span style={{ position: "absolute", left: 50, top: 528, zIndex: 2, color: "#4c4c56", fontSize: 10, fontFamily: mono, letterSpacing: ".4px" }}>recall → new cycle · writes back to CRM</span>

      {/* 01 Leads enter */}
      <div style={{ ...node, left: 40, top: 36, width: 220, height: 92, background: "linear-gradient(160deg,#171719,#0f0f11)", padding: "14px 16px", animation: "rbwf-breathe 6s ease-in-out 0s infinite" }}>
        <span style={idx}>01</span>
        <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
          <span style={iconWrap}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v10" /><path d="M8 9l4 4 4-4" /><path d="M4 18h16" /></svg></span>
          <span style={title}>Leads enter</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 7, marginTop: 13 }}><span style={bar("72%", 0.09)} /><span style={bar("44%", 0.055)} /></div>
      </div>

      {/* 02 Capture & respond */}
      <div style={{ ...node, left: 660, top: 36, width: 220, height: 92, background: "linear-gradient(160deg,#171719,#0f0f11)", padding: "14px 16px", animation: "rbwf-breathe 6s ease-in-out -1s infinite" }}>
        <span style={idx}>02</span>
        <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
          <span style={iconWrap}><svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" /></svg></span>
          <span style={title}>Capture &amp; respond</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 7, marginTop: 13 }}><span style={bar("66%", 0.09)} /><span style={bar("40%", 0.055)} /></div>
      </div>

      {/* 03 Qualify & triage */}
      <div style={{ ...node, left: 580, top: 186, width: 270, height: 142, background: "linear-gradient(160deg,#1a1a1d,#101012)", padding: "16px 18px", animation: "rbwf-breathe 6s ease-in-out -2s infinite" }}>
        <span style={idx}>03</span>
        <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
          <span style={{ ...iconWrap, background: "rgba(139,127,245,.95)", color: "#fff" }}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"><path d="M4 5h16l-6 7v6l-4 2v-8z" /></svg></span>
          <span style={title}>Qualify &amp; triage</span>
        </div>
        <svg width="234" height="56" viewBox="0 0 234 56" style={{ marginTop: 12 }} fill="none" stroke="rgba(255,255,255,.32)" strokeWidth="1.5">
          <rect x="4" y="18" width="20" height="20" rx="5" /><path d="M28 28h38" strokeLinecap="round" /><path d="M62 24l6 4-6 4" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="88" y="15" width="26" height="26" rx="5" transform="rotate(45 101 28)" /><path d="M124 28h38" strokeLinecap="round" /><path d="M158 24l6 4-6 4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="188" cy="28" r="12" /><rect x="82" y="46" width="40" height="12" rx="6" fill="rgba(139,127,245,.85)" stroke="none" />
        </svg>
      </div>

      {/* 04 Book into diary */}
      <div style={{ ...node, left: 70, top: 182, width: 270, height: 150, background: "linear-gradient(160deg,#1a1a1d,#101012)", padding: "16px 18px", animation: "rbwf-breathe 6s ease-in-out -3s infinite" }}>
        <span style={idx}>04</span>
        <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
          <span style={iconWrap}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M4 9.5h16" /><path d="M8.5 3v4" /><path d="M15.5 3v4" /></svg></span>
          <span style={title}>Book into diary</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 11, marginTop: 15 }}>
          {[true, true, false].map((done, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 11 }}>
              <span style={{ width: 18, height: 18, borderRadius: 5, background: done ? "#8b7ff5" : "transparent", border: done ? "none" : "1.5px solid rgba(255,255,255,.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {done ? <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l4 5 10-11" /></svg> : null}
              </span>
              <span style={{ height: 7, flex: done ? 1 : undefined, width: done ? undefined : "60%", borderRadius: 4, background: `rgba(255,255,255,${done ? 0.08 : 0.05})` }} />
            </div>
          ))}
        </div>
      </div>

      {/* 05 Remind & reschedule */}
      <div style={{ ...node, left: 40, top: 388, width: 236, height: 92, background: "linear-gradient(160deg,#171719,#0f0f11)", padding: "14px 16px", animation: "rbwf-breathe 6s ease-in-out -4s infinite" }}>
        <span style={idx}>05</span>
        <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
          <span style={iconWrap}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M6 16h12l-1.6-3.2V9.5a4.4 4.4 0 0 0-8.8 0v3.3z" /><path d="M10 19a2 2 0 0 0 4 0" /></svg></span>
          <span style={title}>Remind &amp; reschedule</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 7, marginTop: 13 }}><span style={bar("70%", 0.09)} /><span style={bar("42%", 0.055)} /></div>
      </div>

      {/* 06 Recall & nurture */}
      <div style={{ ...node, left: 342, top: 388, width: 236, height: 92, background: "linear-gradient(160deg,#171719,#0f0f11)", padding: "14px 16px", animation: "rbwf-breathe 6s ease-in-out -5s infinite" }}>
        <span style={idx}>06</span>
        <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
          <span style={iconWrap}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10a8 8 0 0 1 13.5-4.5L20 8" /><path d="M20 3.5V8h-4.5" /><path d="M20 14a8 8 0 0 1-13.5 4.5L4 16" /><path d="M4 20.5V16h4.5" /></svg></span>
          <span style={title}>Recall &amp; nurture</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 7, marginTop: 13 }}><span style={bar("64%", 0.09)} /><span style={bar("38%", 0.055)} /></div>
      </div>

      {/* CRM */}
      <div style={{ ...node, left: 644, top: 388, width: 236, height: 92, border: "1px solid rgba(139,127,245,.28)", background: "linear-gradient(160deg,#18171c,#100f13)", padding: "14px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
          <span style={{ width: 32, height: 32, borderRadius: 9, background: "#e7e0cf", color: "#35322c", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><ellipse cx="12" cy="6" rx="7.5" ry="3" /><path d="M4.5 6v12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6" /><path d="M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3" /></svg></span>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <span style={{ color: "#f2f2f5", fontSize: 13.5, fontWeight: 600 }}>CRM</span>
            <span style={{ color: "#7d7d8a", fontSize: 10, fontFamily: mono }}>system of record</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 13 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#8b7ff5", animation: "rbwf-syncdot 1.6s ease-in-out infinite" }} />
          <span style={{ color: "#6a6a76", fontSize: 10, fontFamily: mono, letterSpacing: ".3px" }}>writeback · syncing</span>
        </div>
      </div>
    </div>
  );
}
