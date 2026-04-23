"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence, type PanInfo } from "motion/react";
import { VOICES, type Voice } from "./voices-data";

const AUTO_ADVANCE_MS = 9500;
const SWIPE_THRESHOLD = 60;
const SWIPE_VELOCITY = 380;

export default function Voices({ voices = VOICES }: { voices?: Voice[] } = {}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = voices.length;

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % count);
  }, [count]);
  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + count) % count);
  }, [count]);
  const goto = useCallback((i: number) => setIndex(i), []);

  useEffect(() => {
    if (paused) return;
    const timer = window.setTimeout(next, AUTO_ADVANCE_MS);
    return () => window.clearTimeout(timer);
  }, [index, paused, next]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    }
    const el = document.querySelector(".rb-voices");
    el?.addEventListener("keydown", onKey as EventListener);
    return () => el?.removeEventListener("keydown", onKey as EventListener);
  }, [next, prev]);

  function handleDragEnd(_e: unknown, info: PanInfo) {
    if (info.offset.x < -SWIPE_THRESHOLD || info.velocity.x < -SWIPE_VELOCITY) {
      next();
    } else if (
      info.offset.x > SWIPE_THRESHOLD ||
      info.velocity.x > SWIPE_VELOCITY
    ) {
      prev();
    }
  }

  const v = voices[Math.min(index, count - 1)];

  return (
    <div
      className="rb-voices"
      tabIndex={0}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <button
        type="button"
        className="rb-voice-arrow rb-voice-arrow-prev"
        onClick={prev}
        aria-label="Previous quote"
      >
        <span aria-hidden="true">&larr;</span>
      </button>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="rb-voice"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.18}
          onDragEnd={handleDragEnd}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="rb-voice-quote">{v.quote}</p>
          <p className="rb-voice-cite">
            <span className="rb-voice-name">{v.name}</span>
            <span className="rb-voice-role">{v.role}</span>
          </p>
        </motion.div>
      </AnimatePresence>

      <button
        type="button"
        className="rb-voice-arrow rb-voice-arrow-next"
        onClick={next}
        aria-label="Next quote"
      >
        <span aria-hidden="true">&rarr;</span>
      </button>

      <div className="rb-voice-nav">
        <span className="rb-voice-counter" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}{" "}
          <span className="rb-voice-counter-sep">/</span>{" "}
          {String(count).padStart(2, "0")}
        </span>
        <div className="rb-voice-dots" role="tablist" aria-label="Client quotes">
          {voices.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Quote ${i + 1} of ${count}`}
              className={`rb-voice-dot ${i === index ? "rb-voice-dot-active" : ""}`}
              onClick={() => goto(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
