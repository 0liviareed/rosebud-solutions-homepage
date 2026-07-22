"use client";

import { useEffect } from "react";

/**
 * Shared scroll-in reveal for the redesign pages. Any element marked
 * `data-reveal` starts at opacity:0 / translateY(26px) and eases in the
 * first time it enters the viewport — same timing + easing as the homepage
 * industry cards (cubic-bezier(.16,1,.3,1)). Optional per-element stagger
 * via `data-reveal-delay="120"` (ms). Respects prefers-reduced-motion.
 *
 * Add `data-reveal-repeat` to animate BOTH ways — in when the block enters the
 * viewport, back out when it leaves — instead of the default one-shot reveal.
 *
 * Render <RedesignReveal /> once per page (it injects its own CSS) and add
 * `data-reveal` to the blocks you want to animate.
 */
export default function RedesignReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!els.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const el = e.target as HTMLElement;
          const repeat = el.dataset.revealRepeat !== undefined;
          if (e.isIntersecting) {
            const delay = Number(el.dataset.revealDelay || 0);
            el.style.transitionDelay = `${delay}ms`;
            el.classList.add("in");
            if (!repeat) {
              window.setTimeout(() => { el.style.transitionDelay = "0ms"; }, delay + 800);
              io.unobserve(el);
            }
          } else if (repeat) {
            el.style.transitionDelay = "0ms";
            el.classList.remove("in");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <style dangerouslySetInnerHTML={{ __html: `
      [data-reveal]{ opacity:0; transform:translateY(26px); transition:opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1); will-change:opacity, transform; }
      [data-reveal].in{ opacity:1; transform:translateY(0); }
      @media (prefers-reduced-motion: reduce){ [data-reveal]{ opacity:1 !important; transform:none !important; transition:none !important; } }
    ` }} />
  );
}
