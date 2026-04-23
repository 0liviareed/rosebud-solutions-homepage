"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

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

export default function Voices() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setTimeout(() => {
      setIndex((i) => (i + 1) % VOICES.length);
    }, AUTO_ADVANCE_MS);
    return () => window.clearTimeout(timer);
  }, [index, paused]);

  // Keyboard support: left/right arrows cycle when the slider is focused
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") {
        setIndex((i) => (i + 1) % VOICES.length);
      } else if (e.key === "ArrowLeft") {
        setIndex((i) => (i - 1 + VOICES.length) % VOICES.length);
      }
    }
    const el = document.querySelector(".rb-voices");
    el?.addEventListener("keydown", onKey as EventListener);
    return () => el?.removeEventListener("keydown", onKey as EventListener);
  }, []);

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
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="rb-voice"
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

      <div className="rb-voice-dots" role="tablist" aria-label="Client quotes">
        {VOICES.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Quote ${i + 1} of ${VOICES.length}`}
            className={`rb-voice-dot ${i === index ? "rb-voice-dot-active" : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
