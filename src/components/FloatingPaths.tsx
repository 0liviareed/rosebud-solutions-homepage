"use client";

import { motion } from "motion/react";

/**
 * FloatingPaths — tuned for Rosebud aesthetic.
 *
 * Adapted from the bundui/21st.dev pattern. 36 Bézier paths, each
 * animating pathLength / opacity / pathOffset on a slow infinite loop.
 * Tuned to read as "the air is slightly moving" rather than "there is
 * an animation playing" — opacity floor 0.08, loop 30–45s.
 *
 * Usage: drop inside a positioned container. z-index 0, pointer-events
 * none. Pair with the existing static corner topos for layered depth.
 */
export default function FloatingPaths({
  position = 1,
  className = "",
}: {
  position?: number;
  className?: string;
}) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.4 + i * 0.025,
  }));

  return (
    <div
      className={`rb-floating-paths ${className}`}
      aria-hidden="true"
    >
      <svg
        className="rb-floating-paths__svg"
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.12 + path.id * 0.012}
            initial={{ pathLength: 0.3, opacity: 0.5 }}
            animate={{
              pathLength: 1,
              opacity: [0.25, 0.55, 0.25],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 32 + Math.random() * 14,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}
