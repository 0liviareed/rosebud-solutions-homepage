"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Calculator from "./Calculator";

const STEPS = [
  {
    num: "01",
    label: "Week One",
    heading: <>Map your <em>operation.</em></>,
    copy: "A 30-minute call to identify exactly where your business leaks time. No prep needed. We leave with a clear blueprint of what to automate first.",
  },
  {
    num: "02",
    label: "Weeks Two to Five",
    heading: <>Build your digital <em>team.</em></>,
    copy: "Lead engine, voice layer, client follow-up — all deployed and running while you focus on the work only you can do.",
  },
  {
    num: "03",
    label: "From Week Six",
    heading: <>Run without <em>you.</em></>,
    copy: "Once live, your system works around the clock. We monitor, refine, and expand it. You stay out of the weeds.",
  },
];

const DURATION = 4200;

export default function BuildSection() {
  const [active, setActive]     = useState(0);
  const [barKey, setBarKey]     = useState(0);
  const [calcOpen, setCalcOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((idx: number) => {
    setActive(idx);
    setBarKey(k => k + 1);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => goTo((idx + 1) % STEPS.length), DURATION);
  }, []);

  useEffect(() => {
    timerRef.current = setTimeout(() => goTo(1), DURATION);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [goTo]);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = calcOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [calcOpen]);

  return (
    <>
      <section className="rb-sec" data-rb-sec aria-label="Build the future">
        <div className="rb-wrap">
          <div className="rb-head">
            <p className="rb-eyebrow" data-rb-fade="0">Build the future with AI</p>
            <h2 className="rb-h2" data-rb-fade="1">
              The road to running <em>without you.</em>
            </h2>
          </div>

          <div className="rb-build-wrap" data-rb-fade="2">
            {/* Progress bar */}
            <div className="rb-build-bar-track" aria-hidden="true">
              <div key={barKey} className="rb-build-bar-fill" style={{ animationDuration: `${DURATION}ms` }} />
            </div>

            {/* Cycling steps */}
            <div className="rb-build-steps" aria-live="polite">
              {STEPS.map((step, i) => (
                <div
                  key={i}
                  className={`rb-build-step${i === active ? " rb-build-step-active" : ""}`}
                  aria-hidden={i !== active}
                >
                  <p className="rb-build-step-num">
                    {step.num} <span>/ 03</span>
                  </p>
                  <span className="rb-label">{step.label}</span>
                  <h3 className="rb-statement">{step.heading}</h3>
                  <p className="rb-body-copy">{step.copy}</p>
                </div>
              ))}
            </div>

            {/* Dot navigation */}
            <div className="rb-build-dots">
              {STEPS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`rb-build-dot${i === active ? " rb-build-dot-active" : ""}`}
                  aria-label={`Step ${i + 1} of ${STEPS.length}`}
                />
              ))}
            </div>

            {/* Calculator CTA — entry-block style */}
            <button
              onClick={() => setCalcOpen(true)}
              className="rb-build-calc-entry"
              aria-label="Open efficiency calculator"
            >
              <span className="rb-label">Efficiency calculator</span>
              <span className="rb-build-calc-question">
                What&apos;s manual work actually costing you?
                <em className="rb-build-calc-arrow"> →</em>
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Calculator lightbox */}
      {calcOpen && (
        <div className="rb-calc-modal" role="dialog" aria-modal="true" aria-label="Efficiency impact calculator">
          <div
            className="rb-calc-modal-overlay"
            onClick={() => setCalcOpen(false)}
          />
          <div className="rb-calc-modal-inner">
            <button
              className="rb-calc-close"
              onClick={() => setCalcOpen(false)}
              aria-label="Close calculator"
            >
              ✕
            </button>
            <div className="rb-head" style={{ textAlign: "left", margin: "0 0 clamp(2rem,4vw,3rem)" }}>
              <p className="rb-eyebrow" style={{ marginBottom: "1.25rem" }}>
                Efficiency impact calculator
              </p>
              <h2 className="rb-h2">The Cost of <em>Manual.</em></h2>
              <p className="rb-sub" style={{ margin: "1rem 0 0", textAlign: "left" }}>
                See what manual work is costing you each year.
              </p>
            </div>
            <Calculator />
          </div>
        </div>
      )}
    </>
  );
}
