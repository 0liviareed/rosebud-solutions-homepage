"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const STEPS: [string, string][] = [
  ["JD lands on your desk", "Every role. Same format. Same clock starts ticking."],
  ["Post to your CRM", "Synced to free job boards. Same templates, same noise."],
  ["LinkedIn when the boards fail", "Which is every time. Manual search. Manual outreach."],
  ["High volume. Low quality.", "100 applications. Three worth reading. The rest: your week."],
  ["Every CV. Manual.", "One by one. Scrolling, reading, discarding."],
  ["Tag. Shortlist. Directors. Interviews.", "Two days of admin per role. Every role."],
  ["Wrong hire. Start again.", "Three months, burnt. The loop resets."],
];

export default function SevenStepTimeline() {
  const [active, setActive] = useState(-1);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.step);
            setActive((prev) => (idx > prev ? idx : prev));
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );
    refs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const progress = active < 0 ? 0 : ((active + 1) / STEPS.length) * 100;

  return (
    <ol
      className="rb-timeline"
      style={{ "--rb-tl-progress": `${progress}%` } as CSSProperties}
    >
      <div className="rb-timeline-rail" aria-hidden="true">
        <div className="rb-timeline-fill" />
      </div>
      {STEPS.map(([title, body], i) => (
        <li
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          data-step={i}
          className={`rb-tl-step ${i <= active ? "rb-tl-step-active" : ""}`}
        >
          <span className="rb-tl-node" aria-hidden="true" />
          <span className="rb-tl-num">{String(i + 1).padStart(2, "0")}</span>
          <div className="rb-tl-text">
            <span className="rb-tl-title">{title}</span>
            <span className="rb-tl-body">{body}</span>
          </div>
          <span className="rb-tl-tick" aria-hidden="true">
            {i === STEPS.length - 1 ? "∞" : "→"}
          </span>
        </li>
      ))}
    </ol>
  );
}
