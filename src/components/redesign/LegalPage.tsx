import type { ReactNode } from "react";
import RedesignNav from "./RedesignNav";
import RedesignFooter from "./RedesignFooter";
import RedesignReveal from "./RedesignReveal";

// Shared chrome + typography for the three legal pages (terms, privacy,
// dpa). Same design language as ResourceArticlePage — light "paper" theme,
// narrow column, Cormorant serif headings — chosen over the dark theme
// used elsewhere because it's what the redesign already uses for other
// dense, long-form reading (articles), and legal text is exactly that.
//
// Section/list/link markup below (.rb-legal-*) intentionally mirrors the
// legacy .rb-policy-* classes it replaces one-for-one, so the three page
// files below could be ported by renaming classNames rather than
// rewriting content — no legal text was reworded in the port.

const SERIF = "var(--font-cormorant), 'Cormorant Garamond', serif";
const A = "#8B7DD8";

const CSS = `
.rb-legal-pad { padding-left: 48px; padding-right: 48px; }
@media (max-width: 900px){ .rb-legal-pad { padding-left: 20px !important; padding-right: 20px !important; } }
.rb-legal-intro { font-size: 18px; line-height: 1.68; color: rgba(23,19,31,0.7); margin: 0 0 8px; }
.rb-legal-intro + .rb-legal-intro { margin-top: -4px; }
.rb-legal-section { margin-top: 40px; display: flex; flex-direction: column; gap: 14px; }
.rb-legal-section:first-of-type { margin-top: 8px; }
.rb-legal-h2 { font-family: ${SERIF}; font-weight: 500; font-size: clamp(22px,2.4vw,28px); line-height: 1.2; letter-spacing: -0.01em; color: #17131F; margin: 0; scroll-margin-top: 90px; }
.rb-legal-h3 { font-size: 12.5px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(23,19,31,0.45); margin: 10px 0 0; }
.rb-legal-section p { font-size: 16px; line-height: 1.72; color: rgba(23,19,31,0.7); margin: 0 0 4px; }
.rb-legal-section p:last-child { margin-bottom: 0; }
.rb-legal-section p strong { color: #17131F; font-weight: 700; }
.rb-legal-list { margin: 4px 0 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 12px; }
.rb-legal-list li { position: relative; padding-left: 22px; font-size: 16px; line-height: 1.68; color: rgba(23,19,31,0.7); }
.rb-legal-list li::before { content: ""; position: absolute; left: 0; top: 9px; width: 6px; height: 6px; border-radius: 999px; background: ${A}; }
.rb-legal-list li strong { color: #17131F; font-weight: 700; }
.rb-legal-list-ordered { counter-reset: rb-legal-count; }
.rb-legal-list-ordered li { counter-increment: rb-legal-count; padding-left: 30px; }
.rb-legal-list-ordered li::before { content: counter(rb-legal-count); top: 1px; width: 20px; height: 20px; border-radius: 999px; background: rgba(139,125,216,0.16); color: ${A}; font-size: 11px; font-weight: 700; display: flex; align-items: center; justify-content: center; }
.rb-legal-link { color: ${A}; text-decoration: underline; text-underline-offset: 2px; }
.rb-legal-link:hover, .rb-legal-link:focus-visible { color: #6f61c4; }
.rb-legal-contact { display: flex; flex-direction: column; gap: 4px; background: #fff; border-radius: 16px; padding: 22px 24px; box-shadow: 0 24px 60px -44px rgba(23,19,31,0.35); margin-top: 4px; }
.rb-legal-contact p { margin: 0 !important; font-size: 15px; line-height: 1.6; color: rgba(23,19,31,0.7); }
`;

export default function LegalPage({
  title,
  crumbLabel,
  lastUpdated,
  children,
}: {
  title: ReactNode;
  crumbLabel: string;
  lastUpdated: string;
  children: ReactNode;
}) {
  return (
    <div style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", color: "#17131F", background: "#ECE7F7", overflowX: "clip" }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <RedesignNav />
      <RedesignReveal />

      {/* ===================== HERO ===================== */}
      <section className="rb-legal-pad" style={{ position: "relative", overflow: "hidden", background: "#ECE7F7", padding: "184px 48px 64px" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 90% at 84% 0%, rgba(139,125,216,0.12) 0%, transparent 52%), radial-gradient(80% 70% at 0% 100%, rgba(232,129,74,0.06) 0%, transparent 55%)" }} />
        <div data-reveal style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto" }}>
          <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: "rgba(23,19,31,0.5)", textDecoration: "none", marginBottom: 28 }}>
            <span aria-hidden>←</span> Home
          </a>
          <div style={{ fontSize: 12, letterSpacing: ".3em", textTransform: "uppercase", color: A, marginBottom: 22, fontWeight: 600 }}>
            Rosebud Solutions · {crumbLabel}
          </div>
          <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(32px,4.6vw,50px)", lineHeight: 1.1, letterSpacing: "-0.015em", margin: 0 }}>
            {title}
          </h1>
          <p style={{ fontSize: 14, color: "rgba(23,19,31,0.5)", marginTop: 22 }}>Last update: {lastUpdated}</p>
        </div>
      </section>

      {/* ===================== BODY ===================== */}
      <section className="rb-legal-pad" style={{ background: "#F6F3FB", padding: "48px 48px 120px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>{children}</div>
      </section>

      <RedesignFooter />
    </div>
  );
}
