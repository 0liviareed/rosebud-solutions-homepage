"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Sticky site navigation — transparent over the hero, semi-opaque
 * with backdrop blur once the hero has scrolled past. Logo on the
 * left links home; Solutions dropdown on the right lists industry
 * sub-pages. On pages without a hero, the nav stays opaque from the
 * start. Dropdown opens on hover (desktop) and on tap (all devices).
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const itemRef = useRef<HTMLDivElement | null>(null);

  // Scrolled state — toggles when the hero's bottom edge crosses the
  // top of the viewport. If no hero is present (industry pages etc.),
  // start scrolled from the beginning.
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

  // Close dropdown on outside click and Escape key
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

  return (
    <header className={`rb-nav ${scrolled ? "rb-nav-scrolled" : ""}`}>
      <div className="rb-nav-inner">
        <Link
          href="/"
          className="rb-nav-logo"
          aria-label="Rosebud Global — home"
        >
          <Image
            src="/rosebud-logo.png"
            alt="Rosebud Global"
            width={2500}
            height={1000}
            priority
            quality={90}
          />
        </Link>

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
      </div>
    </header>
  );
}
