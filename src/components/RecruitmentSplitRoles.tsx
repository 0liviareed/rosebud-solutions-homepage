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
  const [active, setActive] = useState(0);

  useEffect(() => {
    const list = listRef.current;
    const fill = fillRef.current;
    if (!list || !fill) return;

    // IntersectionObserver picks the role nearest the viewport's vertical
    // anchor (around 35% from the top) as "active". Each role hits the
    // anchor as the user scrolls past it; we surface that index to drive
    // the active-state styling (numeral lights up, label/body fade in).
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry with the smallest distance to the anchor line.
        const anchor = window.innerHeight * 0.35;
        let bestIdx = -1;
        let bestDist = Infinity;
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const rect = entry.boundingClientRect;
          const dist = Math.abs(rect.top + rect.height / 2 - anchor);
          if (dist < bestDist) {
            bestDist = dist;
            bestIdx = Number(
              (entry.target as HTMLElement).dataset.idx ?? "-1",
            );
          }
        });
        if (bestIdx >= 0) setActive(bestIdx);
      },
      {
        // Active band runs from ~10% to ~60% of the viewport.
        rootMargin: "-10% 0px -40% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));

    // Drive the progress-fill height based on how far the user has
    // scrolled through the list. 0% at the list's top, 100% at its
    // bottom (relative to the viewport's vertical anchor line).
    function updateFill() {
      const list = listRef.current;
      const fill = fillRef.current;
      if (!list || !fill) return;
      const rect = list.getBoundingClientRect();
      const anchor = window.innerHeight * 0.35;
      const traversed = anchor - rect.top;
      const total = rect.height;
      const pct = Math.max(0, Math.min(1, traversed / total));
      fill.style.transform = `scaleY(${pct})`;
    }

    let raf = 0;
    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateFill);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    updateFill();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="rb-split-right-wrap">
      {/* Vertical progress track — rail behind, lavender fill scaled by
          scroll progress. Sits on the left edge of the right column. */}
      <div className="rb-split-track" aria-hidden="true">
        <span className="rb-split-track-rail" />
        <span ref={fillRef} className="rb-split-track-fill" />
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
