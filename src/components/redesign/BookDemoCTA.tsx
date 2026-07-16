"use client";
import { useRef, useState, type CSSProperties } from "react";

/* Magnetic glass CTA — ported from the redesign export (BookDemoCTA.dc).
   Pointer-follow transform on hover, animated arrow, one-shot sheen. */
export default function BookDemoCTA({
  label = "Book free consultation",
  meta = "",
  href = "#",
  tone = "dark",
}: {
  label?: string;
  meta?: string;
  href?: string;
  tone?: "dark" | "light";
}) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [hover, setHover] = useState(false);
  const [d, setD] = useState({ dx: 0, dy: 0 });
  const light = tone === "light";
  const h = hover;

  const onMove = (e: React.MouseEvent) => {
    const el = linkRef.current;
    if (!el || window.matchMedia("(hover: none)").matches) return;
    const r = el.getBoundingClientRect();
    setD({
      dx: (e.clientX - (r.left + r.width / 2)) * 0.16,
      dy: (e.clientY - (r.top + r.height / 2)) * 0.16,
    });
  };

  const btnStyle: CSSProperties = {
    position: "relative", overflow: "hidden", display: "inline-flex", alignItems: "center", gap: 12,
    padding: "15px 30px", borderRadius: 999,
    background: light
      ? h ? "rgba(139,125,216,0.22)" : "rgba(139,125,216,0.12)"
      : h ? "rgba(139,125,216,0.30)" : "rgba(139,125,216,0.16)",
    backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
    border: `1px solid rgba(184,174,219,${h ? 0.6 : 0.4})`,
    boxShadow: h
      ? "0 18px 48px -12px rgba(139,125,216,0.65), inset 0 1px 0 rgba(255,255,255,0.30)"
      : "0 10px 36px -14px rgba(139,125,216,0.5), inset 0 1px 0 rgba(255,255,255,0.2)",
    color: light ? "#2A2350" : "#F5F1EA",
    fontSize: 15, fontWeight: 600, letterSpacing: ".01em", textDecoration: "none",
    transform: `translate(${d.dx}px,${d.dy + (h ? -2 : 0)}px)`,
    transition: h
      ? "background .2s ease, box-shadow .2s ease, border-color .2s ease"
      : "transform .45s cubic-bezier(.2,.8,.2,1), background .3s ease, box-shadow .3s ease, border-color .3s ease",
  };

  return (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <div onMouseMove={onMove} onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false); setD({ dx: 0, dy: 0 }); }} style={{ position: "relative" }}>
        <a ref={linkRef} href={href} style={btnStyle}>
          <span style={{ position: "relative", zIndex: 2 }}>{label}</span>
          <span aria-hidden style={{ position: "relative", zIndex: 2, display: "inline-flex", alignItems: "center" }}>
            <svg viewBox="0 0 42 12" width="38" height="11" style={{ overflow: "visible" }}>
              <path d="M0 6 L32 6" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" fill="none"
                style={{ transition: "transform .35s cubic-bezier(.2,.8,.2,1)", transformOrigin: "left", transform: h ? "scaleX(1.18)" : "scaleX(1)" }} />
              <path d="M26 1.5 L32 6 L26 10.5" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" fill="none"
                style={{ transition: "transform .35s cubic-bezier(.2,.8,.2,1)", transform: h ? "translateX(6px)" : "translateX(0)" }} />
            </svg>
          </span>
          <span aria-hidden style={{
            position: "absolute", top: 0, left: 0, width: "40%", height: "100%", zIndex: 1, pointerEvents: "none",
            background: "linear-gradient(100deg, transparent, rgba(255,255,255,0.35), transparent)",
            transform: "translateX(-120%)", animation: h ? "rb-glass-sheen 0.9s ease forwards" : "none",
          }} />
        </a>
      </div>
      {meta ? (
        <p style={{ margin: 0, fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: light ? "rgba(23,19,31,0.5)" : "rgba(245,241,234,0.5)" }}>{meta}</p>
      ) : null}
    </div>
  );
}
