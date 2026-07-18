"use client";
import { useState } from "react";
import { NAV_CAPABILITIES, NAV_RESOURCES, LIVE_SLUGS } from "./capabilityData";

const SERIF = "var(--font-cormorant), 'Cormorant Garamond', serif";

// Global mobile nav — the hamburger + full-screen accordion shared across the
// homepage and every capability page. Top-level Product / Connections /
// Resources expand on tap. All links are absolute so they resolve from any
// route (capability pages have no #capabilities/#integrations anchors).
const capHref = (slug: string) => (LIVE_SLUGS.has(slug) ? `/capabilities/${slug}` : "/#capabilities");

const SECTIONS: { key: string; label: string; items: { label: string; href: string }[] }[] = [
  { key: "product", label: "Product", items: NAV_CAPABILITIES.map((c) => ({ label: c.head, href: capHref(c.slug) })) },
  { key: "connections", label: "Connections", items: [{ label: "Integrations", href: "/#integrations" }] },
  { key: "resources", label: "Resources", items: NAV_RESOURCES.map((r) => ({ label: r.head, href: r.href })) },
];

const CSS = `
.rb-mnav-burger { display: none; }
@media (max-width: 860px){ .rb-mnav-burger { display: inline-flex !important; } }
`;

export default function RedesignMobileMenu() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>("product");
  const close = () => setOpen(false);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <button className="rb-mnav-burger" aria-label="Menu" onClick={() => setOpen(true)} style={{ width: 42, height: 42, borderRadius: 999, background: "transparent", border: "1px solid var(--nav-fg)", color: "var(--nav-fg-strong)", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></svg>
      </button>

      {open && (
        <div style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(11,10,13,0.72)", backdropFilter: "blur(32px) saturate(1.1)", WebkitBackdropFilter: "blur(32px) saturate(1.1)", display: "flex", flexDirection: "column", padding: 24 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/rosebud-logo.png" alt="Rosebud Solutions" width={36} height={36} style={{ display: "block", width: 36, height: 36 }} />
            <button aria-label="Close menu" onClick={close} style={{ width: 42, height: 42, borderRadius: 999, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)", color: "#F5F1EA", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 6l12 12" /><path d="M18 6L6 18" /></svg>
            </button>
          </div>

          <div style={{ flex: 1, overflowY: "auto", marginTop: 30 }}>
            {SECTIONS.map((s) => {
              const isOpen = expanded === s.key;
              return (
                <div key={s.key} style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  <button onClick={() => setExpanded((e) => (e === s.key ? null : s.key))} aria-expanded={isOpen} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0", background: "transparent", border: "none", cursor: "pointer", fontFamily: SERIF, fontSize: 26, fontWeight: 500, color: "#F5F1EA", textAlign: "left" }}>
                    {s.label}
                    <span style={{ fontSize: 12, color: "#8B7DD8", transition: "transform .25s ease", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
                  </button>
                  {isOpen && (
                    <div style={{ paddingBottom: 12, display: "flex", flexDirection: "column" }}>
                      {s.items.map((it) => (
                        <a key={it.label + it.href} href={it.href} onClick={close} style={{ display: "block", fontSize: 16, color: "rgba(245,241,234,0.82)", textDecoration: "none", padding: "9px 0 9px 4px" }}>{it.label}</a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
            <a href="/pricing" onClick={close} style={{ textAlign: "center", padding: 16, borderRadius: 999, background: "#8B7DD8", color: "#0B0A0C", fontWeight: 600, textDecoration: "none" }}>Get started</a>
            <a href="https://cal.eu/rosebudsolutions/demo" target="_blank" rel="noopener noreferrer" style={{ textAlign: "center", padding: 16, borderRadius: 999, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.2)", color: "#F5F1EA", textDecoration: "none" }}>Book free consultation</a>
          </div>
        </div>
      )}
    </>
  );
}
