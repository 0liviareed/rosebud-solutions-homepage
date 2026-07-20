import type { CSSProperties } from "react";
import RedesignNav from "./RedesignNav";
import RedesignFooter from "./RedesignFooter";
import BookDemoCTA from "./BookDemoCTA";

const SERIF = "var(--font-cormorant), 'Cormorant Garamond', serif";
const A = "#8B7DD8";

const eyebrow: CSSProperties = { fontSize: 12, letterSpacing: ".3em", textTransform: "uppercase", color: A, marginBottom: 22, fontWeight: 600 };
const bodyText: CSSProperties = { fontSize: 17, lineHeight: 1.66, color: "rgba(23,19,31,0.66)" };

const PRINCIPLES: { num: string; head: string; body: string }[] = [
  { num: "01", head: "Speed is the product", body: "The first business to answer usually wins the work. Everything we built starts from that one fact." },
  { num: "02", head: "People still get people", body: "We take the chasing, scheduling and re-keying. We never take the conversation that decides whether somebody trusts you." },
  { num: "03", head: "It gets sharper every month", body: "The system learns what converts in your business by working it. Every month it runs, it knows more than the month before." },
  { num: "04", head: "Built right, from the first line", body: "Isolation, access control and monitoring were designed into the architecture, not bolted on when somebody asked." },
];

const TEAM: { name: string; role: string; ini: string; linkedin: string }[] = [
  { name: "Anselm Jr. Okojie", role: "Co-founder / CEO", ini: "AO", linkedin: "https://www.linkedin.com/company/108013298/" },
  { name: "Sajni Okojie", role: "Co-founder / COO", ini: "SO", linkedin: "https://www.linkedin.com/company/108013298/" },
];

const LinkedIn = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.25 8.25h4.5V23h-4.5zM8.5 8.25H12.8v2h.06c.6-1.05 2.07-2.16 4.26-2.16 4.56 0 5.4 3 5.4 6.9V23h-4.5v-6.2c0-1.48-.03-3.38-2.06-3.38-2.06 0-2.37 1.6-2.37 3.27V23H8.5z" /></svg>
);

export default function AboutV2() {
  return (
    <div style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#17131F", background: "#ECE7F7", overflowX: "clip" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .rb-ab-pad { padding-left: 48px; padding-right: 48px; }
        .rb-ab-mission-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 44px; }
        .rb-ab-principles { display: grid; grid-template-columns: repeat(4, 1fr); gap: 28px; }
        .rb-ab-team { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        @media (max-width: 900px){
          .rb-ab-pad { padding-left: 20px !important; padding-right: 20px !important; }
          .rb-ab-mission-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
          .rb-ab-principles { grid-template-columns: 1fr 1fr !important; gap: 18px !important; }
          .rb-ab-team { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 560px){ .rb-ab-principles { grid-template-columns: 1fr !important; } }
      ` }} />

      <RedesignNav />

      {/* ===================== HERO ===================== */}
      <section className="rb-ab-pad" style={{ position: "relative", overflow: "hidden", background: "#ECE7F7", padding: "184px 48px 120px" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 90% at 84% 0%, rgba(139,125,216,0.12) 0%, transparent 52%), radial-gradient(80% 70% at 0% 100%, rgba(232,129,74,0.06) 0%, transparent 55%)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1180, margin: "0 auto" }}>
          <div style={eyebrow}>About Rosebud</div>
          <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(40px,5vw,76px)", lineHeight: 1.03, letterSpacing: "-0.015em", margin: 0, maxWidth: "16ch" }}>
            The operating system between demand &amp; <em style={{ fontStyle: "italic", color: A }}>revenue</em>
          </h1>
          <p style={{ ...bodyText, marginTop: 28, maxWidth: 620, fontSize: 19 }}>
            Seven capabilities, one engine, carrying every enquiry from the second it lands to a booked appointment, then run for you, every day.
          </p>
        </div>
      </section>

      {/* ===================== MISSION ===================== */}
      <section className="rb-ab-pad" style={{ position: "relative", background: "#F6F3FB", padding: "132px 48px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={eyebrow}>Our mission</div>
          <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(30px,3.6vw,52px)", lineHeight: 1.1, letterSpacing: "-0.015em", margin: "0 0 44px", maxWidth: "20ch" }}>
            Most businesses don&apos;t have a lead problem. They have a <em style={{ fontStyle: "italic", color: A }}>follow-up</em> problem, &amp; we exist to close it
          </h2>
          <div className="rb-ab-mission-grid">
            <p style={bodyText}>Money goes out to create demand, then the demand sits in an inbox until the intent has gone cold. We built one system that answers every enquiry within seconds, scores it against your own rules, books it into your diary, and works it again when it goes quiet.</p>
            <p style={bodyText}>Then we run that system for you, every day, so your people are free for the work only people can do. The rest of this market sells software and wishes you luck. We took the harder route on purpose. That&apos;s work, not licensing, and it&apos;s why an operator can&apos;t simply be swapped out.</p>
          </div>
        </div>
      </section>

      {/* ===================== VALUES ===================== */}
      <section className="rb-ab-pad" style={{ position: "relative", background: "#ECE7F7", padding: "132px 48px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={eyebrow}>Our values</div>
          <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(30px,3.6vw,52px)", lineHeight: 1.05, letterSpacing: "-0.015em", margin: 0 }}>How we build &amp; operate</h2>
          <p style={{ ...bodyText, marginTop: 18, maxWidth: 560 }}>Four principles that decide every product call and every account we run.</p>
          <div className="rb-ab-principles" style={{ marginTop: 56 }}>
            {PRINCIPLES.map((p) => (
              <div key={p.num} style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontFamily: SERIF, fontSize: 15, fontWeight: 600, color: A, letterSpacing: ".08em", paddingBottom: 18, marginBottom: 20, borderBottom: "1px solid rgba(23,19,31,0.12)" }}>{p.num}</div>
                <div style={{ fontFamily: SERIF, fontSize: 23, fontWeight: 500, lineHeight: 1.14, marginBottom: 12 }}>{p.head}</div>
                <div style={{ fontSize: 14.5, lineHeight: 1.6, color: "rgba(23,19,31,0.62)" }}>{p.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== TEAM ===================== */}
      <section className="rb-ab-pad" style={{ position: "relative", background: "#F6F3FB", padding: "132px 48px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={eyebrow}>Our team</div>
          <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(30px,3.6vw,52px)", lineHeight: 1.08, letterSpacing: "-0.015em", margin: 0, maxWidth: "18ch" }}>The team that owns the space between demand &amp; revenue</h2>
          <p style={{ ...bodyText, marginTop: 24, maxWidth: 640 }}>At Rosebud, we&apos;re building the best team to design and operate the layer between what a business spends to win attention &amp; what it actually keeps. If you want to answer every enquiry in seconds, take the chasing off your desk, and see results every day, we&apos;d love to chat.</p>
          <div style={{ fontSize: 12, letterSpacing: ".24em", textTransform: "uppercase", color: "rgba(23,19,31,0.45)", margin: "52px 0 20px", fontFamily: SERIF }}>Our leadership team</div>
          <div className="rb-ab-team">
            {TEAM.map((m) => (
              <div key={m.name} style={{ display: "flex", alignItems: "center", gap: 18, background: "#fff", border: "1px solid rgba(23,19,31,0.08)", borderRadius: 20, padding: "22px 24px", boxShadow: "0 24px 60px -44px rgba(23,19,31,0.35)" }}>
                <span style={{ width: 56, height: 56, borderRadius: "50%", background: `${A}22`, color: A, display: "grid", placeItems: "center", fontWeight: 700, fontSize: 18, flexShrink: 0 }}>{m.ini}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 17 }}>{m.name}</div>
                  <div style={{ fontSize: 14, color: "rgba(23,19,31,0.6)" }}>{m.role}</div>
                </div>
                <a href={m.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${m.name} on LinkedIn`} style={{ width: 38, height: 38, borderRadius: 999, background: "rgba(23,19,31,0.05)", border: "1px solid rgba(23,19,31,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#17131F" }}><LinkedIn /></a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CLOSE ===================== */}
      <section className="rb-ab-pad" style={{ position: "relative", overflow: "hidden", background: "#080609", color: "#F5F1EA", padding: "150px 48px" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(70% 60% at 50% 0%, rgba(139,125,216,0.22) 0%, transparent 60%)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 12, letterSpacing: ".32em", textTransform: "uppercase", color: "#B8AEDB", marginBottom: 22 }}>The offer</div>
          <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(38px,4.8vw,68px)", lineHeight: 1.03, letterSpacing: "-0.015em", margin: 0 }}>Ready to stabilise your front office?</h2>
          <p style={{ margin: "24px auto 0", maxWidth: 600, fontSize: 17, lineHeight: 1.62, color: "rgba(245,241,234,0.66)" }}>We deploy, manage, and monitor the entire intake layer for you as an operated rental service, connecting directly to your existing CRM and calendars. The system handles the workflow up to the booking using your exact tone; your team closes the sale.</p>
          <div style={{ marginTop: 36, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 16 }}>
            <BookDemoCTA label="See pricing & choose your plan" href="/pricing" tone="dark" />
            <a href="https://cal.eu/rosebudsolutions/demo" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "15px 26px", borderRadius: 999, border: "1px solid rgba(245,241,234,0.22)", color: "#F5F1EA", fontSize: 15, fontWeight: 500, textDecoration: "none" }}>Book a consultation</a>
          </div>
        </div>
      </section>

      <RedesignFooter />
    </div>
  );
}
