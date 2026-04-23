"use client";

import { useRef, type MouseEvent } from "react";

type Props = {
  href: string;
  label?: string;
  meta?: string;
};

/**
 * BookDemoCTA — elevated primary call-to-action.
 *
 * - Radial glow pedestal that breathes continuously behind the link
 * - Magnetic cursor pull on desktop (catch-area wider than the link)
 * - Drawn-line arrow: shaft extends and head slides on hover
 * - Shimmer sweep across the underline on hover
 * - Uppercase micro-line beneath summarises expectation in one beat
 */
export default function BookDemoCTA({
  href,
  label = "Request a demo",
  meta = "30 minutes · Zoom · no prep required",
}: Props) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = linkRef.current;
    if (!el) return;
    if (window.matchMedia("(hover: none)").matches) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const strength = 0.18;
    el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
  };

  const onLeave = () => {
    const el = linkRef.current;
    if (el) el.style.transform = "";
  };

  return (
    <div className="rb-book-stage">
      <div className="rb-book-glow" aria-hidden="true" />
      <div className="rb-book-glow rb-book-glow-halo" aria-hidden="true" />

      <div
        className="rb-book-magnet"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        <a
          ref={linkRef}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="rb-book-cta"
        >
          <span className="rb-book-cta-label">{label}</span>
          <span className="rb-book-cta-arrow" aria-hidden="true">
            <svg viewBox="0 0 42 12" width="42" height="12">
              <path
                className="rb-book-cta-shaft"
                d="M0 6 L32 6"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                fill="none"
              />
              <path
                className="rb-book-cta-head"
                d="M26 1.5 L32 6 L26 10.5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </span>
          <span className="rb-book-cta-underline" aria-hidden="true" />
        </a>
      </div>

      <p className="rb-book-meta">{meta}</p>
    </div>
  );
}
