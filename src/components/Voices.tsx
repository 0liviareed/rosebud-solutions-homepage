"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence, type PanInfo } from "motion/react";

type Voice = { quote: string; name: string; role: string };

const VOICES: Voice[] = [
  {
    quote:
      "I thought if I wasn't chasing, deals would die. But we closed two in the last quarter from people I'd given up on months ago. Rosebud was still in touch with them when I wasn't.",
    name: "Edward Harrington",
    role: "Managing Director",
  },
  {
    quote:
      "My phone used to ring before I'd finished my first coffee. Now I open my inbox and three calls are already on my calendar. I just read the notes and show up.",
    name: "Thomas Ashford",
    role: "Operations Director",
  },
  {
    quote:
      "We had hundreds of leads sitting in a spreadsheet, not doing anything. Rosebud scored all of them, told us who was worth a call, and my team only talks to those ones now. It's obvious in hindsight but we'd never have built it ourselves.",
    name: "Margaret Ellsworth",
    role: "Founder & CEO",
  },
  {
    quote:
      "The thing that surprised me was the follow-ups sounded like me. Two people on calls last month mentioned how nice my emails were. I didn't write them — Rosebud did.",
    name: "Victoria Hastings",
    role: "Head of Marketing",
  },
  {
    quote:
      "I used to do reporting on Sunday nights. I dreaded it. Now I open my laptop Monday morning and the week's already sorted. Honestly, getting my Sundays back was worth the fee on its own.",
    name: "Henry Caldwell",
    role: "Partner",
  },
  {
    quote:
      "I'd been telling myself I'd sort this out for two years. Five weeks with Rosebud and it was done. It's one of the only things I've paid for this year that made my job smaller instead of bigger.",
    name: "Richard Sinclair",
    role: "Operations Director",
  },
  {
    quote:
      "When something breaks, I message Anselm and he answers. That doesn't happen with agencies. You pay them and you're dealing with an account manager by week two.",
    name: "Eleanor Whitman",
    role: "Principal",
  },
  {
    quote:
      "This isn't just about automation. It's about creating a better, faster experience that still feels personal and thoughtful.",
    name: "James Holloway",
    role: "Multi-Site Operator",
  },
];

const AUTO_ADVANCE_MS = 9500;
const SWIPE_THRESHOLD = 60;
const SWIPE_VELOCITY = 380;

export default function Voices() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % VOICES.length);
  }, []);
  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + VOICES.length) % VOICES.length);
  }, []);
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

  const v = VOICES[index];

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
          {String(VOICES.length).padStart(2, "0")}
        </span>
        <div className="rb-voice-dots" role="tablist" aria-label="Client quotes">
          {VOICES.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Quote ${i + 1} of ${VOICES.length}`}
              className={`rb-voice-dot ${i === index ? "rb-voice-dot-active" : ""}`}
              onClick={() => goto(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
