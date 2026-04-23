"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type TouchEvent as ReactTouchEvent,
} from "react";

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
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  const go = useCallback((i: number) => {
    setActive(() => Math.max(0, Math.min(STEPS.length - 1, i)));
  }, []);

  const next = useCallback(() => go(active + 1), [active, go]);
  const prev = useCallback(() => go(active - 1), [active, go]);

  const atStart = active === 0;
  const atEnd = active === STEPS.length - 1;
  const progress = (active / (STEPS.length - 1)) * 100;

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const root = rootRef.current;
      if (!root) return;
      const rect = root.getBoundingClientRect();
      const onScreen = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
      if (!onScreen) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setActive((a) => Math.min(STEPS.length - 1, a + 1));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setActive((a) => Math.max(0, a - 1));
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const onTouchStart = (e: ReactTouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: ReactTouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) {
      if (dx < 0) next();
      else prev();
    }
    touchStartX.current = null;
  };

  return (
    <div
      ref={rootRef}
      className="rb-tl-carousel"
      style={{ "--rb-tl-active": active } as CSSProperties}
    >
      <div
        className="rb-tl-stage"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="rb-tl-track">
          {STEPS.map(([title, body], i) => {
            const diff = i - active;
            const state =
              diff === 0 ? "active" : diff < 0 ? "past" : "upcoming";
            return (
              <article
                key={i}
                className={`rb-tl-slide rb-tl-slide-${state}`}
                aria-hidden={state !== "active"}
                onClick={() => state !== "active" && go(i)}
              >
                <span className="rb-tl-slide-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="rb-tl-slide-title">{title}</h3>
                <p className="rb-tl-slide-body">{body}</p>
              </article>
            );
          })}
        </div>

        <button
          type="button"
          className="rb-tl-arrow rb-tl-arrow-prev"
          onClick={prev}
          disabled={atStart}
          aria-label="Previous step"
        >
          <svg viewBox="0 0 24 24" width="18" height="18">
            <path
              d="M15 5 L9 12 L15 19"
              stroke="currentColor"
              strokeWidth="1.4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          className="rb-tl-arrow rb-tl-arrow-next"
          onClick={next}
          disabled={atEnd}
          aria-label="Next step"
        >
          <svg viewBox="0 0 24 24" width="18" height="18">
            <path
              d="M9 5 L15 12 L9 19"
              stroke="currentColor"
              strokeWidth="1.4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="rb-tl-rail" role="tablist" aria-label="Recruitment steps">
        <div className="rb-tl-rail-line" aria-hidden="true">
          <div
            className="rb-tl-rail-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        {STEPS.map((_, i) => {
          const state =
            i < active ? "past" : i === active ? "active" : "upcoming";
          return (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Step ${i + 1}`}
              className={`rb-tl-rail-station rb-tl-rail-station-${state}`}
              onClick={() => go(i)}
            >
              <span className="rb-tl-rail-label">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="rb-tl-rail-node" aria-hidden="true" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
