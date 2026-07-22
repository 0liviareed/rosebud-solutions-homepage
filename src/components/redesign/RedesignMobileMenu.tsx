"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { NAV_CAPABILITIES, NAV_RESOURCES, LIVE_SLUGS } from "./capabilityData";

// Global mobile nav — hamburger + full-screen accordion, reusing the SAME
// styling that's live in production (.rb-mobile-menu-inner + .rb-macc-* in
// globals.css): opaque overlay, single-open sections, Cormorant italic rows.
// The overlay is portalled to <body> so the redesign nav's backdrop-filter
// (which would otherwise trap a position:fixed child) can't break it.
const capHref = (slug: string) => (LIVE_SLUGS.has(slug) ? `/capabilities/${slug}` : "/#capabilities");

type Section = { key: string; label: string; items: { title: string; desc?: string; href: string }[] };
const SECTIONS: Section[] = [
  { key: "product", label: "Product", items: NAV_CAPABILITIES.map((c) => ({ title: c.head, desc: c.desc, href: capHref(c.slug) })) },
  { key: "connections", label: "Connections", items: [{ title: "Integrations", desc: "Connect to your tools effortlessly", href: "/#integrations" }] },
  { key: "resources", label: "Resources", items: NAV_RESOURCES.map((r) => ({ title: r.head, desc: r.desc, href: r.href })) },
];

const CSS = `
.rb-mnav-burger { display: none; }
@media (max-width: 860px){ .rb-mnav-burger { display: inline-flex !important; } }
.rb-rmenu { position: fixed; inset: 0; z-index: 1000; background: rgba(0,0,0,0.96); -webkit-backdrop-filter: blur(24px) saturate(130%); backdrop-filter: blur(24px) saturate(130%); overflow-y: auto; display: flex; flex-direction: column; }
/* mobile-menu typography → match the desktop nav (DM Sans, CTA-button size), not the big Cormorant editorial style */
.rb-rmenu .rb-macc-trigger { font-family: var(--font-dm-sans), system-ui, sans-serif !important; font-style: normal !important; text-transform: uppercase !important; letter-spacing: .14em !important; font-weight: 600 !important; font-size: 15px !important; padding-top: 20px !important; padding-bottom: 20px !important; }
.rb-rmenu .rb-macc-sublink-title { font-family: var(--font-dm-sans), system-ui, sans-serif !important; font-style: normal !important; font-weight: 600 !important; font-size: 15px !important; letter-spacing: 0 !important; }
.rb-rmenu .rb-macc-sublink-desc { text-transform: none !important; letter-spacing: 0 !important; font-size: 12.5px !important; margin-top: 4px !important; }
`;

const ctaBase: React.CSSProperties = { display: "flex", alignItems: "center", justifyContent: "center", width: "100%", boxSizing: "border-box", padding: "16px 26px", borderRadius: 999, fontSize: 15, fontWeight: 600, textDecoration: "none", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" };

const chevron = (
  <svg className="rb-macc-chevron" viewBox="0 0 10 6" width="14" height="14" aria-hidden="true">
    <path d="M1 1 L5 5 L9 1" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function RedesignMobileMenu() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<string | null>(null);
  useEffect(() => setMounted(true), []);

  // Body scroll-lock + Escape to close while open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [open]);

  const close = () => { setOpen(false); setSection(null); };

  const overlay = (
    <div className="rb-rmenu" role="dialog" aria-modal="true">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/rosebud-logo.png" alt="Rosebud Solutions" width={36} height={36} style={{ display: "block", width: 36, height: 36 }} />
        <button aria-label="Close menu" onClick={close} style={{ width: 42, height: 42, borderRadius: 999, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)", color: "#F5F1EA", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 6l12 12" /><path d="M18 6L6 18" /></svg>
        </button>
      </div>

      <div className="rb-mobile-menu-inner" style={{ flex: 1 }}>
        {SECTIONS.map((s) => {
          const isOpen = section === s.key;
          return (
            <div key={s.key} className="rb-macc-section">
              <button type="button" className="rb-macc-trigger" aria-expanded={isOpen} onClick={() => setSection((c) => (c === s.key ? null : s.key))}>
                <span>{s.label}</span>
                {chevron}
              </button>
              <div className="rb-macc-panel" data-open={isOpen}>
                <div className="rb-macc-panel-inner">
                  {s.items.map((it) => (
                    <a key={it.title + it.href} href={it.href} className="rb-macc-sublink" onClick={close}>
                      <span className="rb-macc-sublink-text">
                        <span className="rb-macc-sublink-title">{it.title}</span>
                        {it.desc ? <span className="rb-macc-sublink-desc">{it.desc}</span> : null}
                      </span>
                      <span className="rb-macc-sublink-arrow" aria-hidden="true">→</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stacked CTAs — identical size, same sans family */}
      <div style={{ padding: "20px 24px 32px", display: "flex", flexDirection: "column", gap: 12, alignItems: "stretch" }}>
        <a href="/pricing" onClick={close} style={{ ...ctaBase, background: "rgba(139,125,216,0.18)", border: "1px solid rgba(184,174,219,0.42)", color: "#F5F1EA" }}>Get started</a>
        <a href="https://cal.eu/rosebudsolutions/demo" target="_blank" rel="noopener noreferrer" onClick={close} style={{ ...ctaBase, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.2)", color: "#F5F1EA" }}>Book free consultation</a>
      </div>
    </div>
  );

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <button className="rb-mnav-burger" aria-label="Menu" onClick={() => setOpen(true)} style={{ width: 42, height: 42, background: "transparent", border: "none", padding: 0, color: "var(--nav-fg-strong)", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></svg>
      </button>
      {mounted && open ? createPortal(overlay, document.body) : null}
    </>
  );
}
