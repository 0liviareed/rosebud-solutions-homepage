"use client";

import { NAV_CAPABILITIES, NAV_RESOURCES, LIVE_SLUGS } from "./capabilityData";

// Global site footer (redesign). Single source of truth used by the homepage
// and every capability page. Column structure mirrors the primary navigation:
// Product · Connections · Resources · Legal.

const SERIF = "var(--font-cormorant), 'Cormorant Garamond', serif";
const capHref = (slug: string) => (LIVE_SLUGS.has(slug) ? `/capabilities/${slug}` : "/#capabilities");

const colHead: React.CSSProperties = { fontSize: 12, letterSpacing: ".24em", textTransform: "uppercase", color: "rgba(245,241,234,0.45)", marginBottom: 20, fontFamily: SERIF };
const colList: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 14 };
const colLink: React.CSSProperties = { fontSize: 14, color: "rgba(245,241,234,0.85)", textDecoration: "none" };

const NAV_COLUMNS: { label: string; items: { title: string; href: string }[] }[] = [
  { label: "Product", items: NAV_CAPABILITIES.map((c) => ({ title: c.head, href: capHref(c.slug) })) },
  { label: "Connections", items: [{ title: "Integrations", href: "/integrations" }] },
  { label: "Resources", items: NAV_RESOURCES.map((r) => ({ title: r.head, href: r.href })) },
];

export default function RedesignFooter() {
  return (
    <footer style={{ position: "relative", background: "#000000", color: "#F5F1EA", padding: "70px 48px 44px" }}>
      <div style={{ maxWidth: 1220, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
          <a href="/" aria-label="Rosebud Global" style={{ display: "flex", alignItems: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/rosebud-logo.png" alt="Rosebud Global" width={40} height={40} style={{ display: "block", width: 40, height: 40 }} />
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <a href="/pricing" style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "11px 21px", borderRadius: 999, background: "#F5F1EA", color: "#0C0B10", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>Get started <svg viewBox="0 0 42 12" width="20" height="8" fill="none" style={{ overflow: "visible" }}><path d="M0 6 L32 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /><path d="M26 1.5 L32 6 L26 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg></a>
            <a href="mailto:contact@rosebud.global" style={{ display: "inline-flex", alignItems: "center", padding: "11px 18px", borderRadius: 999, border: "1px solid rgba(245,241,234,0.22)", color: "#F5F1EA", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>Contact</a>
            <a href="https://www.linkedin.com/company/rosebud-global/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" style={{ width: 44, height: 44, borderRadius: 999, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#F5F1EA" }}><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.25 8.25h4.5V23h-4.5zM8.5 8.25H12.8v2h.06c.6-1.05 2.07-2.16 4.26-2.16 4.56 0 5.4 3 5.4 6.9V23h-4.5v-6.2c0-1.48-.03-3.38-2.06-3.38-2.06 0-2.37 1.6-2.37 3.27V23H8.5z" /></svg></a>
            <a href="https://www.instagram.com/rosebudglobal/" aria-label="Instagram" target="_blank" rel="noopener noreferrer" style={{ width: 44, height: 44, borderRadius: 999, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#F5F1EA" }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" /></svg></a>
            <a href="https://x.com/rosebudsolution" aria-label="X (Twitter)" target="_blank" rel="noopener noreferrer" style={{ width: 44, height: 44, borderRadius: 999, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#F5F1EA" }}><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2h3.68l-8.04 9.19L24 22h-7.4l-5.8-7.58L4.16 22H.47l8.6-9.83L0 2h7.59l5.24 6.93zm-1.3 18h2.04L6.5 3.88H4.3z" /></svg></a>
            <a href="https://www.tiktok.com/@rosebudsolutions" aria-label="TikTok" target="_blank" rel="noopener noreferrer" style={{ width: 44, height: 44, borderRadius: 999, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#F5F1EA" }}><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 5.82c-.9-.98-1.4-2.26-1.4-3.57h-3.09v13.44c0 1.62-1.32 2.94-2.95 2.94a2.95 2.95 0 0 1-2.95-2.94c0-1.95 1.88-3.42 3.82-2.82V9.66c-3.45-.46-6.47 2.22-6.47 5.63a5.95 5.95 0 0 0 5.95 5.94c3.29 0 5.95-2.66 5.95-5.94V9c1.25.9 2.76 1.38 4.3 1.38V7.3c-.88 0-1.75-.26-2.48-.75a4.28 4.28 0 0 1-.68-.73Z" /></svg></a>
          </div>
        </div>
        <div className="rb-foot-grid" style={{ marginTop: 52, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 40 }}>
          {NAV_COLUMNS.map((col) => (
            <div key={col.label}>
              <div style={colHead}>{col.label}</div>
              <div style={colList}>
                {col.items.map((it) => <a key={it.title} href={it.href} style={colLink}>{it.title}</a>)}
              </div>
            </div>
          ))}
          <div className="rb-foot-legal">
            <div style={colHead}>Legal</div>
            <div style={colList}>
              <a href="/privacy" style={colLink}>Privacy Policy</a>
              <a href="/terms" style={colLink}>Terms of Service</a>
              <a href="/dpa" style={colLink}>Data Processing Agreement</a>
              <a href="/privacy#cookies" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event("rb:cookie-settings-open")); }} style={{ ...colLink, cursor: "pointer" }}>Cookie settings</a>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 44, textAlign: "center", fontSize: 12, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(245,241,234,0.4)" }}>Copyright © 2026 Rosebud Global. All rights reserved.</div>
      </div>
    </footer>
  );
}
