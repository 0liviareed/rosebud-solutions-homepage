"use client";

import { useEffect, useRef, useState } from "react";

const ROLES = [
  {
    num: "I",
    label: "Candidate Sourcing Engine",
    body: "Targeted search across LinkedIn and sector networks, filtered against your ICP.",
  },
  {
    num: "II",
    label: "CV Screening & Shortlisting",
    body: "Agentic AI reading every profile against your criteria.",
  },
  {
    num: "III",
    label: "Automated Outreach Sequences",
    body: "Multi-touch personalised sequences, sent without manual input.",
  },
  {
    num: "IV",
    label: "CRM Auto-Population",
    body: "Everything written directly into your CRM, nothing typed.",
  },
  {
    num: "V",
    label: "Pipeline Management",
    body: "Warm candidates tracked, re-engaged, ready when the next role opens.",
  },
  {
    num: "VI",
    label: "Behaviour-Triggered Follow-Up",
    body: "Re-engagement handled automatically.",
  },
  {
    num: "VII",
    label: "Operational Audit & Roadmap",
    body: "Where your operation is losing time, and what to fix next.",
  },
];

export default function RecruitmentSplitRoles() {
  const listRef = useRef<HTMLOListElement | null>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const fillRef = useRef<HTMLSpanElement | null>(null);
  const orbRef = useRef<HTMLSpanElement | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    // Scroll-driven: every frame, compute (1) how far through the list we
    // are vs the viewport anchor, and (2) which role's centre is closest to
    // that anchor. IntersectionObserver was unreliable here because it
    // only fires on threshold crossings — once a role is fully inside the
    // active band it stops firing even as the user keeps scrolling, so the
    // "closest" picker would lag behind. Direct measurement on rAF avoids
    // that entirely.
    function update() {
      const list = listRef.current;
      const fill = fillRef.current;
      const orb = orbRef.current;
      if (!list || !fill || !orb) return;

      const items = itemRefs.current.filter(Boolean) as HTMLLIElement[];
      if (items.length === 0) return;

      // Anchor line — 40% from the top of the viewport feels natural
      // when the left column is sticky-pinned near the top.
      const anchor = window.innerHeight * 0.4;
      const listRect = list.getBoundingClientRect();

      // 1. Progress through the list (0 at the top hitting the anchor,
      //    1 at the bottom hitting the anchor). Used to drive both the
      //    lavender track fill and the orb position.
      const traversed = anchor - listRect.top;
      const total = listRect.height;
      const pct = Math.max(0, Math.min(1, traversed / total));
      fill.style.transform = `scaleY(${pct})`;
      orb.style.top = `${pct * 100}%`;

      // 2. Active index — the role whose centre is closest to the anchor.
      //    Clamps to first/last when above/below the list bounds so the
      //    UI never goes dark.
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

      // Only commit state changes on transitions (avoids re-renders every
      // frame; React would short-circuit equal values but cheaper this way).
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
      {/* Vertical progress track — rail behind, lavender fill scaled by
          scroll progress, glowing orb (same visual family as the hiker
          orb in IsThisYou) sliding down to mark current position. */}
      <div className="rb-split-track" aria-hidden="true">
        <span className="rb-split-track-rail" />
        <span ref={fillRef} className="rb-split-track-fill" />
        <span ref={orbRef} className="rb-split-orb">
          <span className="rb-split-orb-core" />
        </span>
      </div>

      <ol
        ref={listRef}
        className="rb-split-right"
        aria-label="Seven roles in every deployment"
      >
        {ROLES.map((role, i) => (
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
