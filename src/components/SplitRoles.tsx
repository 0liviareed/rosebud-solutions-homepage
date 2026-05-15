"use client";

import { useEffect, useRef, useState } from "react";

export type SplitRole = {
  num: string;
  label: string;
  body: string;
};

type Props = {
  roles: SplitRole[];
  ariaLabel?: string;
};

/**
 * Right-column scroll-tracking roles list used in Section II of each
 * industry page (recruitment / insurance / healthcare).
 *
 * Renders the vertical progress track (rail + lavender fill + glowing
 * orb in the bone-on-lavender hiker-orb family) on the left edge, and
 * the editorial role list to the right of that. As the user scrolls
 * through the section, every frame:
 *   1. The fill height + orb position update to mark scroll progress.
 *   2. The role whose centre is closest to a 40%-from-top anchor line
 *      gets the .rb-split-role-active class — numeral lights up
 *      lavender + grows, label brightens, body copy lifts.
 *
 * Direct rAF measurement (rather than IntersectionObserver) so the
 * active state updates on every scroll frame, not just on threshold
 * crossings.
 */
export default function SplitRoles({
  roles,
  ariaLabel = "Seven roles in every deployment",
}: Props) {
  const listRef = useRef<HTMLOListElement | null>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const fillRef = useRef<HTMLSpanElement | null>(null);
  const orbRef = useRef<HTMLSpanElement | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    function update() {
      const list = listRef.current;
      const fill = fillRef.current;
      const orb = orbRef.current;
      if (!list || !fill || !orb) return;

      const items = itemRefs.current.filter(Boolean) as HTMLLIElement[];
      if (items.length === 0) return;

      const anchor = window.innerHeight * 0.4;
      const listRect = list.getBoundingClientRect();
      const traversed = anchor - listRect.top;
      const total = listRect.height;
      const pct = Math.max(0, Math.min(1, traversed / total));
      fill.style.transform = `scaleY(${pct})`;
      orb.style.top = `${pct * 100}%`;

      let bestIdx = 0;
      let bestDist = Infinity;
      items.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        const centre = r.top + r.height / 2;
        const dist = Math.abs(centre - anchor);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      });

      setActive((prev) => (prev === bestIdx ? prev : bestIdx));
    }

    let raf = 0;
    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="rb-split-right-wrap">
      <div className="rb-split-track" aria-hidden="true">
        <span className="rb-split-track-rail" />
        <span ref={fillRef} className="rb-split-track-fill" />
        <span ref={orbRef} className="rb-split-orb">
          <span className="rb-split-orb-core" />
        </span>
      </div>

      <ol ref={listRef} className="rb-split-right" aria-label={ariaLabel}>
        {roles.map((role, i) => (
          <li
            key={role.num}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            data-idx={i}
            className={`rb-split-role ${
              i === active ? "rb-split-role-active" : ""
            }`}
          >
            <div className="rb-split-role-head">
              <span className="rb-split-role-num">{role.num}</span>
              <span className="rb-split-role-label">{role.label}</span>
            </div>
            <p className="rb-split-role-body">{role.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
