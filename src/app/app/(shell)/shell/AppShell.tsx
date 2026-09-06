"use client";

import { useCallback, useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import NavRail, { type NavRailProps } from "./NavRail";
import styles from "./shell.module.css";

// The v9 console shell: sticky glass nav (collapsible to a 64px icon rail on
// desktop, off-canvas drawer on mobile) + the main column. Collapse state
// lives on <html data-rail="min"> and in localStorage["rb.rail.min"]; the
// (shell) layout sets the attribute before hydration so there is no flash.

export const RAIL_STORAGE_KEY = "rb.rail.min";

// The html attribute is the source of truth (set pre-hydration); subscribe to
// it rather than mirroring it into state from an effect.
function subscribeRail(onChange: () => void) {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-rail"] });
  return () => mo.disconnect();
}
const readRail = () => document.documentElement.getAttribute("data-rail") === "min";
const readRailServer = () => false;

export default function AppShell({ nav, children }: { nav: NavRailProps; children: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const collapsed = useSyncExternalStore(subscribeRail, readRail, readRailServer);

  const toggleCollapsed = useCallback(() => {
    const next = !readRail();
    if (next) document.documentElement.setAttribute("data-rail", "min");
    else document.documentElement.removeAttribute("data-rail");
    try {
      localStorage.setItem(RAIL_STORAGE_KEY, next ? "1" : "0");
    } catch {
      /* private mode etc. — collapse still works for this page */
    }
  }, []);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen]);

  return (
    <div className={`${styles.shell} ${drawerOpen ? styles.drawerOpen : ""}`}>
      <NavRail {...nav} collapsed={collapsed} onToggleCollapsed={toggleCollapsed} onNavigate={closeDrawer} />
      <div className={styles.scrim} onClick={closeDrawer} aria-hidden="true" />
      <div className={styles.main}>
        <div className={styles.mobileBar}>
          <button
            type="button"
            className={styles.menuBtn}
            aria-label="Open menu"
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen(true)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/rosebud-logo.png" alt="" width={24} height={24} style={{ borderRadius: "50%" }} />
          Rosebud Solutions
        </div>
        {children}
      </div>
    </div>
  );
}
