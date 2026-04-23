"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Sticky site navigation.
 *
 * Desktop (>820px): logo left, Solutions dropdown right (editorial
 * popup with staggered link reveal).
 *
 * Mobile (≤820px): logo left, asymmetric hamburger right that morphs
 * into an X on open; tap opens a full-screen overlay with the same
 * Industries content in editorial scale.
 *
 * Transparent over the hero, blurred semi-opaque once past it.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // desktop dropdown
  const [mobileOpen, setMobileOpen] = useState(false); // mobile overlay
  const itemRef = useRef<HTMLDivElement | null>(null);

  // Scrolled state
  useEffect(() => {
    function onScroll() {
      const hero = document.querySelector<HTMLElement>(".rb-hero-wrap");
      if (!hero) {
        setScrolled(true);
        return;
      }
      const heroBottom = hero.getBoundingClientRect().bottom;
      setScrolled(heroBottom < 0);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Close desktop dropdown on outside click / Escape
  useEffect(() => {
    if (!menuOpen) return;
    function onDocClick(e: MouseEvent) {
      const target = e.target as Node;
      if (itemRef.current && !itemRef.current.contains(target)) {
        setMenuOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  // Mobile menu: body scroll lock + Escape to close
  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  // Close mobile menu if viewport grows past breakpoint (orientation change etc.)
  useEffect(() => {
    function onResize() {
      if (window.innerWidth > 820) setMobileOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  function closeMobile() {
    setMobileOpen(false);
  }

  return (
    <>
      <header className={`rb-nav ${scrolled ? "rb-nav-scrolled" : ""} ${mobileOpen ? "rb-nav-mobile-active" : ""}`}>
        <div className="rb-nav-inner">
          <Link
            href="/"
            className="rb-nav-logo"
            aria-label="Rosebud Global — home"
            onClick={closeMobile}
          >
            <Image
              src="/rosebud-icon.png"
              alt="Rosebud Global"
              width={256}
              height={256}
              priority
              quality={95}
            />
          </Link>

          {/* Desktop menu */}
          <nav className="rb-nav-menu" aria-label="Primary">
            <div
              ref={itemRef}
              className={`rb-nav-item ${menuOpen ? "rb-nav-item-open" : ""}`}
              onMouseEnter={() => setMenuOpen(true)}
              onMouseLeave={() => setMenuOpen(false)}
            >
              <button
                type="button"
                className="rb-nav-trigger"
                onClick={() => setMenuOpen((v) => !v)}
                aria-expanded={menuOpen}
                aria-haspopup="true"
              >
                <span>Solutions</span>
                <svg
                  className="rb-nav-chevron"
                  aria-hidden="true"
                  viewBox="0 0 10 6"
                  width="10"
                  height="6"
                >
                  <path
                    d="M1 1 L5 5 L9 1"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div
                className="rb-nav-dropdown"
                role="menu"
                aria-hidden={!menuOpen}
              >
                <div className="rb-nav-group">
                  <span className="rb-nav-group-label">
                    <span className="rb-nav-group-count" aria-hidden="true">I–III</span>
                    <span>Industries</span>
                  </span>

                  <Link
                    href="/industries/recruitment"
                    className="rb-nav-link"
                    role="menuitem"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="rb-nav-link-title">Recruitment</span>
                    <span className="rb-nav-link-desc">Sourcing. Screening. Scheduling.</span>
                    <span className="rb-nav-link-arrow" aria-hidden="true">→</span>
                  </Link>

                  <Link
                    href="/industries/insurance"
                    className="rb-nav-link"
                    role="menuitem"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="rb-nav-link-title">Insurance</span>
                    <span className="rb-nav-link-desc">Quotes. Claims. Renewals.</span>
                    <span className="rb-nav-link-arrow" aria-hidden="true">→</span>
                  </Link>

                  <Link
                    href="/industries/healthcare"
                    className="rb-nav-link"
                    role="menuitem"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="rb-nav-link-title">Healthcare</span>
                    <span className="rb-nav-link-desc">Intake. Scheduling. Follow-up.</span>
                    <span className="rb-nav-link-arrow" aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          {/* Mobile hamburger trigger */}
          <button
            type="button"
            className={`rb-nav-burger ${mobileOpen ? "rb-nav-burger-open" : ""}`}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="rb-mobile-menu"
          >
            <span className="rb-nav-burger-line" />
            <span className="rb-nav-burger-line" />
          </button>
        </div>
      </header>

      {/* Mobile overlay menu */}
      <div
        id="rb-mobile-menu"
        className={`rb-mobile-menu ${mobileOpen ? "rb-mobile-menu-open" : ""}`}
        aria-hidden={!mobileOpen}
      >
        <div className="rb-mobile-menu-inner">
          <div className="rb-mobile-group">
            <span className="rb-mobile-group-label">
              <span className="rb-mobile-group-count" aria-hidden="true">I–III</span>
              <span>Industries</span>
            </span>

            <Link
              href="/industries/recruitment"
              className="rb-mobile-link"
              onClick={closeMobile}
            >
              <span className="rb-mobile-link-title">Recruitment</span>
              <span className="rb-mobile-link-desc">Sourcing. Screening. Scheduling.</span>
              <span className="rb-mobile-link-arrow" aria-hidden="true">→</span>
            </Link>

            <Link
              href="/industries/insurance"
              className="rb-mobile-link"
              onClick={closeMobile}
            >
              <span className="rb-mobile-link-title">Insurance</span>
              <span className="rb-mobile-link-desc">Quotes. Claims. Renewals.</span>
              <span className="rb-mobile-link-arrow" aria-hidden="true">→</span>
            </Link>

            <Link
              href="/industries/healthcare"
              className="rb-mobile-link"
              onClick={closeMobile}
            >
              <span className="rb-mobile-link-title">Healthcare</span>
              <span className="rb-mobile-link-desc">Intake. Scheduling. Follow-up.</span>
              <span className="rb-mobile-link-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
