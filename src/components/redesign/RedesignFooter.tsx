"use client";

// Global site footer (redesign). Single source of truth used by the homepage
// and every capability page so the footer stays identical site-wide.

const SERIF = "var(--font-cormorant), 'Cormorant Garamond', serif";

export default function RedesignFooter() {
  return (
    <footer style={{ position: "relative", background: "#000000", color: "#F5F1EA", padding: "70px 48px 44px" }}>
      <div style={{ maxWidth: 1220, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
          <a href="/" aria-label="Rosebud Global" style={{ display: "flex", alignItems: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/rosebud-logo.png" alt="Rosebud Global" width={40} height={40} style={{ display: "block", width: 40, height: 40 }} />
          </a>
          <div style={{ display: "flex", gap: 12 }}>
            <a href="https://www.linkedin.com/company/108013298/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" style={{ width: 44, height: 44, borderRadius: 999, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#F5F1EA" }}><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.25 8.25h4.5V23h-4.5zM8.5 8.25H12.8v2h.06c.6-1.05 2.07-2.16 4.26-2.16 4.56 0 5.4 3 5.4 6.9V23h-4.5v-6.2c0-1.48-.03-3.38-2.06-3.38-2.06 0-2.37 1.6-2.37 3.27V23H8.5z" /></svg></a>
            <a href="https://www.instagram.com/rosebudglobal/" aria-label="Instagram" target="_blank" rel="noopener noreferrer" style={{ width: 44, height: 44, borderRadius: 999, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#F5F1EA" }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" /></svg></a>
          </div>
        </div>
        <div className="rb-foot-grid" style={{ marginTop: 52, display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 40 }}>
          <div>
            <div style={{ fontSize: 12, letterSpacing: ".24em", textTransform: "uppercase", color: "rgba(245,241,234,0.45)", marginBottom: 20, fontFamily: SERIF }}>Contact</div>
            <a href="mailto:contact@rosebud.global" style={{ display: "inline-block", fontSize: 14, color: "#F5F1EA", textDecoration: "none", borderBottom: "1px solid rgba(245,241,234,0.25)", paddingBottom: 3 }}>contact@rosebud.global</a>
            <div style={{ marginTop: 26 }}><a href="/pricing" style={{ display: "inline-flex", alignItems: "center", gap: 9, fontSize: 14, color: "#F5F1EA", textDecoration: "none", borderBottom: "1px solid rgba(245,241,234,0.25)", paddingBottom: 3 }}>Get started <svg viewBox="0 0 42 12" width="20" height="8" fill="none" style={{ overflow: "visible" }}><path d="M0 6 L32 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /><path d="M26 1.5 L32 6 L26 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg></a></div>
          </div>
          <div>
            <div style={{ fontSize: 12, letterSpacing: ".24em", textTransform: "uppercase", color: "rgba(245,241,234,0.45)", marginBottom: 20, fontFamily: SERIF }}>Company</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <a href="/about" style={{ fontSize: 14, color: "rgba(245,241,234,0.85)", textDecoration: "none" }}>About</a>
              <a href="/pricing" style={{ fontSize: 14, color: "rgba(245,241,234,0.85)", textDecoration: "none" }}>Pricing</a>
            </div>
          </div>
          <div className="rb-foot-legal" style={{ textAlign: "right" }}>
            <div style={{ fontSize: 12, letterSpacing: ".24em", textTransform: "uppercase", color: "rgba(245,241,234,0.45)", marginBottom: 20, fontFamily: SERIF }}>Legal</div>
            <div className="rb-foot-legal-list" style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "flex-end" }}>
              <a href="/privacy" style={{ fontSize: 14, color: "rgba(245,241,234,0.85)", textDecoration: "none" }}>Privacy Policy</a>
              <a href="/terms" style={{ fontSize: 14, color: "rgba(245,241,234,0.85)", textDecoration: "none" }}>Terms of Service</a>
              <a href="/privacy#cookies" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event("rb:cookie-settings-open")); }} style={{ fontSize: 14, color: "rgba(245,241,234,0.85)", textDecoration: "none", cursor: "pointer" }}>Cookie settings</a>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 44, textAlign: "center", fontSize: 12, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(245,241,234,0.4)" }}>Copyright © 2026 Rosebud Global. All rights reserved.</div>
      </div>
    </footer>
  );
}
