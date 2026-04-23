"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { buildGlobalPath } from "@/lib/hiker-path";

/**
 * Runtime — client-side behavior for the entire homepage.
 *
 * - Lenis smooth scroll (tuned heavy, not glassy)
 * - Time-of-day hue filter on hero topo (London-local clock)
 * - Global hiker overlay injected body-level, lerp'd RAF tick
 * - Section + per-entry IntersectionObservers for reveals
 *
 * Runs once on mount. Cleans up on unmount.
 */
export default function Runtime() {
  const pathname = usePathname();

  /* Shared flag: true while the booking section (#rb-book) is in view.
     Drives the "here." phrase so it fires at the Cal embed / demo
     pedestal regardless of scroll progress percentages. Set by the
     per-route IntersectionObserver below, read by the phrase picker
     in the mount-once tick loop. */
  const bookInViewRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // ========== TIME-OF-DAY HUE ON TOPO ==========
    try {
      const nowLondon = new Date(
        new Date().toLocaleString("en-US", { timeZone: "Europe/London" })
      );
      const h = nowLondon.getHours() + nowLondon.getMinutes() / 60;
      const phase = 0.5 * (1 - Math.cos((2 * Math.PI * (h - 4)) / 24));
      let hue: number;
      if (h >= 17 && h <= 21) {
        hue = 18 * (1 - Math.abs(h - 19) / 2.5);
      } else if (h < 6 || h >= 22) {
        hue = -20;
      } else {
        hue = -10 + 10 * phase;
      }
      const bright = 0.4 + 0.25 * phase;
      const sep = 0.04 + 0.08 * phase;
      const root = document.documentElement;
      root.style.setProperty("--rb-topo-hue", hue.toFixed(1) + "deg");
      root.style.setProperty("--rb-topo-bright", bright.toFixed(2));
      root.style.setProperty("--rb-topo-sep", sep.toFixed(2));
    } catch { /* defaults stay */ }

    // ========== LENIS ==========
    let lenis: Lenis | null = null;
    let lenisRaf = 0;
    if (!prefersReducedMotion) {
      lenis = new Lenis({
        duration: 1.35,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -11 * t)),
        smoothWheel: true,
      });
      const raf = (time: number) => {
        lenis?.raf(time);
        lenisRaf = requestAnimationFrame(raf);
      };
      lenisRaf = requestAnimationFrame(raf);
    }
    // Expose on window so CTA components can trigger smooth anchor
    // scrolls without being coupled to this component's useEffect.
    (window as unknown as { __rbLenis?: Lenis | null }).__rbLenis = lenis;

    // ========== GLOBAL HIKER OVERLAY ==========
    const SVG_NS = "http://www.w3.org/2000/svg";
    const overlay = document.createElementNS(SVG_NS, "svg");
    overlay.setAttribute("id", "rb-hiker-overlay");
    overlay.setAttribute("aria-hidden", "true");
    overlay.style.cssText = [
      "position:fixed",
      "inset:0",
      "width:100vw",
      "height:100vh",
      "pointer-events:none",
      "z-index:10",
      "opacity:0",
      "transition:opacity 900ms var(--rb-ease)",
    ].join(";");
    overlay.innerHTML = `
      <defs>
        <filter id="rb-g-trail" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.6" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="rb-g-fresh" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="2.2" result="b1"/>
          <feGaussianBlur stdDeviation="6" result="b2"/>
          <feMerge><feMergeNode in="b2"/><feMergeNode in="b1"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <!-- Off-center radial: highlight biased to upper-left gives the
             dot an implied light direction — reads as lit sphere, not
             flat disc. Small but material-feel premium. -->
        <radialGradient id="rb-g-core" cx="38%" cy="36%" r="62%">
          <stop offset="0%"  stop-color="#FFFFFF" stop-opacity="1"/>
          <stop offset="35%" stop-color="#FAF6EF" stop-opacity="1"/>
          <stop offset="75%" stop-color="#F1ECDF" stop-opacity="0.98"/>
          <stop offset="100%" stop-color="#D9CFC0" stop-opacity="0.85"/>
        </radialGradient>
      </defs>
      <path id="rb-g-guide" fill="none" stroke="rgba(245,241,234,0.09)" stroke-width="1" stroke-dasharray="1.5 4" stroke-linecap="round"/>
      <path id="rb-g-lit"   fill="none" stroke="rgba(184,174,219,0.32)" stroke-width="1.2" stroke-linecap="round" style="filter:url(#rb-g-trail)"/>
      <path id="rb-g-fresh-path" fill="none" stroke="rgba(245,241,234,0.78)" stroke-width="1.7" stroke-linecap="round" style="filter:url(#rb-g-fresh)"/>
      <g id="rb-g-dot" style="filter:drop-shadow(0 0 8px rgba(255,255,255,0.95)) drop-shadow(0 0 20px rgba(184,174,219,0.9)) drop-shadow(0 0 40px rgba(139,125,216,0.6))">
        <circle r="30" fill="rgba(139,125,216,0.08)" style="transform-origin:center;transform-box:fill-box;animation:rbHaloOuter 2.6s ease-in-out 0.3s infinite"/>
        <circle r="16" fill="rgba(184,174,219,0.22)" style="transform-origin:center;transform-box:fill-box;animation:rbHaloInner 1.8s ease-in-out infinite"/>
        <circle r="5"  fill="url(#rb-g-core)" style="transform-origin:center;transform-box:fill-box;animation:rbCoreIn 1400ms var(--rb-ease) 0ms both"/>
        <circle r="1.4" fill="#FFFFFF" style="transform-origin:center;transform-box:fill-box;animation:rbGlintPulse 2.8s ease-in-out infinite"/>
      </g>`;
    document.body.appendChild(overlay);

    // Trailing label — "follow me." in Cormorant italic, drifts behind
    // the hiker with its own slower lerp so it physically follows.
    const label = document.createElement("div");
    label.id = "rb-hiker-label";
    label.setAttribute("aria-hidden", "true");
    label.textContent = "follow me.";
    document.body.appendChild(label);

    // Page progress hairline — 1px bone line on the right edge.
    // Fills from 0 → 1 as the whole document is scrolled, so the
    // hiker's descent is mirrored by a quiet filling line alongside it.
    const progress = document.createElement("div");
    progress.className = "rb-progress";
    progress.setAttribute("aria-hidden", "true");
    document.body.appendChild(progress);
    // Reveal after initial paint so the fill doesn't flash
    window.setTimeout(() => progress.classList.add("rb-progress-ready"), 300);

    const style = document.createElement("style");
    style.id = "rb-hiker-style";
    style.textContent = `
      html { scroll-behavior: auto !important; }
      #rb-hiker-label {
        position: fixed;
        top: 0;
        left: 0;
        font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
        font-style: italic;
        font-weight: 500;
        font-size: clamp(20px, 1.6vw, 26px);
        letter-spacing: 0.005em;
        color: rgba(245, 241, 234, 0.88);
        white-space: nowrap;
        pointer-events: none;
        z-index: 10;
        opacity: 0;
        transition: opacity 1400ms var(--rb-ease);
        text-shadow:
          0 0 16px rgba(184, 174, 219, 0.7),
          0 0 32px rgba(139, 125, 216, 0.5),
          0 0 64px rgba(139, 125, 216, 0.25);
        transform: translate(0, 0);
        will-change: transform, opacity;
      }
      #rb-hiker-label.rb-label-visible { opacity: 1; animation: rbLabelBreathe 3.2s ease-in-out infinite; }
      @keyframes rbLabelBreathe {
        0%, 100% { filter: brightness(1); }
        50%      { filter: brightness(1.25); }
      }
      /* Mobile: label is decoupled from the dot-tracking transform and
         pinned to the bottom-right of the viewport — near where the
         mobile global hiker path descends. Smaller register, right-
         aligned, slightly quieter glow so it doesn't crowd content.
         !important is needed to beat the inline transform/top/left the
         RAF loop writes for desktop tracking; the JS also guards but
         this is a belt-and-braces override. */
      @media (max-width: 820px) {
        #rb-hiker-label {
          top: auto !important;
          left: auto !important;
          right: clamp(14px, 4vw, 22px);
          bottom: clamp(20px, 4.5vw, 34px);
          transform: none !important;
          font-size: clamp(14px, 3.6vw, 17px);
          font-weight: 400;
          text-align: right;
          color: rgba(245, 241, 234, 0.78);
          text-shadow:
            0 0 10px rgba(184, 174, 219, 0.6),
            0 0 20px rgba(139, 125, 216, 0.35);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        #rb-hiker-overlay #rb-g-dot circle { animation: none !important; }
        #rb-hiker-overlay, #rb-hiker-label { transition: opacity 250ms linear; }
      }`;
    document.head.appendChild(style);

    const gGuide = overlay.querySelector<SVGPathElement>("#rb-g-guide")!;
    const gLit   = overlay.querySelector<SVGPathElement>("#rb-g-lit")!;
    const gFresh = overlay.querySelector<SVGPathElement>("#rb-g-fresh-path")!;
    const gDot   = overlay.querySelector<SVGGElement>("#rb-g-dot")!;
    let vw = 0, vh = 0, totalLen = 0;
    let targetP = 0, currentP = 0;
    const BASE_LERP = 0.14;

    // Fresh-tracks fraction varies with scroll velocity.
    // At rest: 0.04 (tight, composed). Fast scroll: up to 0.16 (elongated).
    // Eases the hiker toward/away from effort.
    let freshFraction = 0.04;

    // Label tracks the hiker's screen position with a slower lerp
    // (0.065 vs hiker's 0.14) — the lag *is* the "following" feel.
    let labelX = 0, labelY = 0;
    // Larger, more directive copy needs more horizontal clearance from
    // the dot so the text doesn't crowd the hiker.
    const LABEL_OFFSET_X = -180;
    const LABEL_OFFSET_Y = 4;
    const LABEL_LERP = 0.065;

    // Voice moments — phrases the hiker says as you descend.
    // Progress bands are based on content scroll (0..1, post-hero).
    // First phrase is directive (invites scroll), second confirms the
    // motion, third arrives. Keeps the editorial voice but reads as an
    // instruction the moment the hiker enters the content.
    // Phrases 0 + 1 are progress-band driven; phrase 2 ("here.") is
    // gated by bookInViewRef — it fires the moment the #rb-book section
    // is prominently in view, independent of page length.
    const PHRASES = [
      { text: "scroll to follow.",  from: 0.02, to: 0.52 },
      { text: "keep scrolling.",    from: 0.52, to: 0.99 },
      { text: "here.",              from: 0,    to: 1    }, // gated externally
    ];
    let currentPhraseIdx = -1;
    let phraseTransitioning = false;
    let phraseTimeout = 0;

    function layoutGlobal() {
      vw = window.innerWidth;
      vh = window.innerHeight;
      const d = buildGlobalPath(vw, vh);
      gGuide.setAttribute("d", d);
      gLit.setAttribute("d", d);
      gFresh.setAttribute("d", d);
      totalLen = gLit.getTotalLength();
      if (totalLen <= 0) return;
      gLit.style.strokeDasharray = String(totalLen);
      gLit.style.strokeDashoffset = String(totalLen);
      gFresh.style.strokeDasharray = `0 ${totalLen} 0 0`;
      gFresh.style.strokeDashoffset = "0";
      const p = getContentProgress();
      currentP = p;
      targetP = p;
      setGlobal(p);
    }

    function setGlobal(progress: number) {
      if (totalLen <= 0) return;
      const walked = totalLen * progress;
      const pt = gLit.getPointAtLength(walked);
      gDot.setAttribute(
        "transform",
        `translate(${pt.x.toFixed(2)}, ${pt.y.toFixed(2)})`
      );
      gLit.style.strokeDashoffset = String(totalLen - walked);
      const freshLen = Math.min(walked, totalLen * freshFraction);
      const behind = Math.max(0, walked - freshLen);
      const ahead  = Math.max(0, totalLen - walked);
      gFresh.style.strokeDasharray =
        `0 ${behind.toFixed(2)} ${freshLen.toFixed(2)} ${ahead.toFixed(2)}`;

      // Update trailing label position with its own slower lerp —
      // the label "follows" the hiker with visible lag.
      // On mobile the label is pinned to the viewport corner via CSS,
      // so skip the dot-tracking transform entirely.
      if (vw > 820) {
        const targetLx = pt.x + LABEL_OFFSET_X;
        const targetLy = pt.y + LABEL_OFFSET_Y;
        labelX += (targetLx - labelX) * LABEL_LERP;
        labelY += (targetLy - labelY) * LABEL_LERP;
        label.style.transform = `translate(${labelX.toFixed(2)}px, ${labelY.toFixed(2)}px)`;
      }
    }

    function getHeroEnd(): number {
      const wrap = document.querySelector<HTMLElement>(".rb-hero-wrap");
      if (!wrap) return 0;
      const r = wrap.getBoundingClientRect();
      return window.scrollY + r.top + r.height - window.innerHeight;
    }

    function getContentProgress(): number {
      // Content-only on all viewports — the hero-local hiker handles
      // the hero portion on both desktop and mobile (each with its
      // own viewBox + path), so the global hiker always starts fresh
      // at content entry.
      const heroEnd = getHeroEnd();
      const docMax = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const contentRange = Math.max(1, docMax - heroEnd);
      const sy = window.scrollY - heroEnd;
      return Math.max(0, Math.min(1, sy / contentRange));
    }

    // Scroll-based show/hide of the global overlay + voice moments.
    // Global hiker is hidden during the hero on all viewports — the
    // hero-local hiker (desktop and mobile variants) handles that
    // portion. Cross-fade happens at hero end via the hero-local's
    // opacity fall-off at progress > 0.92.
    function updateOverlayVisibility() {
      const heroEnd = getHeroEnd();
      const inHero = window.scrollY < heroEnd - 40;
      overlay.style.opacity = inHero ? "0" : "1";

      const p = getContentProgress();
      let targetIdx = -1;
      if (!inHero) {
        // "here." wins whenever the booking section is on-screen —
        // regardless of scroll progress. Otherwise fall back to the
        // progress-band driven phrases for the two earlier beats.
        if (bookInViewRef.current) {
          targetIdx = 2;
        } else {
          for (let i = 0; i < 2; i++) {
            if (p >= PHRASES[i].from && p <= PHRASES[i].to) {
              targetIdx = i;
              break;
            }
          }
        }
      }

      if (targetIdx === currentPhraseIdx || phraseTransitioning) return;

      if (targetIdx < 0) {
        // Hide — fade out, stay gone
        label.classList.remove("rb-label-visible");
        phraseTransitioning = true;
        phraseTimeout = window.setTimeout(() => {
          phraseTransitioning = false;
          currentPhraseIdx = -1;
        }, 1400);
      } else if (currentPhraseIdx < 0) {
        // Appear fresh — swap text first, then fade in
        label.textContent = PHRASES[targetIdx].text;
        requestAnimationFrame(() => {
          label.classList.add("rb-label-visible");
        });
        currentPhraseIdx = targetIdx;
      } else {
        // Phrase change — fade out, swap, fade back in
        phraseTransitioning = true;
        label.classList.remove("rb-label-visible");
        phraseTimeout = window.setTimeout(() => {
          label.textContent = PHRASES[targetIdx].text;
          requestAnimationFrame(() => {
            label.classList.add("rb-label-visible");
          });
          currentPhraseIdx = targetIdx;
          phraseTransitioning = false;
        }, 1400);
      }
    }

    let rafId = 0;
    let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;
    let scrollVelocity = 0;
    const FRESH_MIN = 0.04;
    const FRESH_MAX = 0.16;

    // Atmosphere layers — each has a scroll-progress center and width.
    // Opacity is a tent function: peak at center, linear fade to zero
    // at distance == width. Three layers with differing 'position'
    // prop values give the flow direction a slow evolution.
    const ATMO_LAYERS: { el: HTMLElement | null; center: number; width: number; peak: number }[] = [
      { el: document.getElementById("rb-atmo-1"), center: 0.15, width: 0.45, peak: 0.50 },
      { el: document.getElementById("rb-atmo-2"), center: 0.50, width: 0.45, peak: 0.50 },
      { el: document.getElementById("rb-atmo-3"), center: 0.85, width: 0.45, peak: 0.50 },
    ];

    function tick() {
      if (totalLen > 0) {
        // Scroll velocity → fresh-tracks length. Smoothed so the trail
        // doesn't pop; decays to FRESH_MIN when scrolling stops.
        const sy = window.scrollY;
        const instantVel = Math.abs(sy - lastScrollY);
        lastScrollY = sy;
        scrollVelocity += (instantVel - scrollVelocity) * 0.18;
        const velNorm = Math.min(1, scrollVelocity / 45);
        const targetFresh = FRESH_MIN + (FRESH_MAX - FRESH_MIN) * velNorm;
        freshFraction += (targetFresh - freshFraction) * 0.12;

        // Fresh-tracks stroke width also responds to velocity — brighter
        // and bolder under motion, quiet and thin at rest.
        gFresh.style.strokeWidth = String(1.35 + velNorm * 0.9);

        targetP = getContentProgress();
        if (prefersReducedMotion) {
          currentP = targetP;
        } else {
          const d = targetP - currentP;
          const absD = Math.abs(d);
          const eff = absD < 0.01 ? Math.min(0.28, BASE_LERP + 0.12) : BASE_LERP;
          currentP += d * eff;
        }
        setGlobal(currentP);
        updateOverlayVisibility();
      }

      // Page progress hairline — fills against the full document scroll,
      // so the hero's scroll contributes too (unlike content progress).
      const docMax = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const docProg = Math.max(0, Math.min(1, window.scrollY / docMax));
      progress.style.setProperty("--rb-prog", docProg.toFixed(4));

      // Atmosphere layer cross-fade — each layer's opacity is a tent
      // function of its distance from its center. Total visible
      // atmosphere stays ≈ constant; character of the flow evolves.
      // Reduced motion: skip updates so CSS static value stands.
      if (!prefersReducedMotion) {
        const viewportScale = vw <= 820 ? 0.55 : 1;
        for (let i = 0; i < ATMO_LAYERS.length; i++) {
          const layer = ATMO_LAYERS[i];
          if (!layer.el) continue;
          const distance = Math.abs(docProg - layer.center);
          const t = Math.max(0, 1 - distance / layer.width);
          layer.el.style.opacity = (t * layer.peak * viewportScale).toFixed(3);
        }
      }

      rafId = requestAnimationFrame(tick);
    }

    // ========== BOOT ==========
    layoutGlobal();
    rafId = requestAnimationFrame(tick);

    const onResize = () => {
      clearTimeout((window as unknown as { _rb_resizeT?: number })._rb_resizeT);
      (window as unknown as { _rb_resizeT?: number })._rb_resizeT = window.setTimeout(
        layoutGlobal,
        80
      );
    };
    window.addEventListener("resize", onResize);

    // Expose layoutGlobal so the per-route effect can re-measure
    // the hiker path when the page geometry changes (new hero, new
    // content length on client-side navigation).
    (window as unknown as { __rbRelayout?: () => void }).__rbRelayout =
      layoutGlobal;

    return () => {
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(lenisRaf);
      clearTimeout(phraseTimeout);
      window.removeEventListener("resize", onResize);
      overlay.remove();
      label.remove();
      progress.remove();
      style.remove();
      lenis?.destroy();
      delete (window as unknown as { __rbRelayout?: () => void }).__rbRelayout;
    };
  }, []);

  /* ===================== REVEAL OBSERVERS (per route) =====================
     Runs on mount AND on every client-side navigation. Without this split,
     the first Runtime mount's observers only ever saw the first page's
     sections — subsequent pages rendered with data-rb-fade stuck at
     opacity:0 because their [data-rb-sec] parents never got .rb-in.
  */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const sections = document.querySelectorAll<HTMLElement>("[data-rb-sec]");
    const entries = document.querySelectorAll<HTMLElement>(
      ".rb-entry, .rb-founder"
    );
    const observers: IntersectionObserver[] = [];

    if ("IntersectionObserver" in window) {
      const ioSec = new IntersectionObserver(
        (evts) => {
          evts.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("rb-in");
              ioSec.unobserve(e.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
      );
      sections.forEach((s) => ioSec.observe(s));
      observers.push(ioSec);

      const ioEntry = new IntersectionObserver(
        (evts) => {
          evts.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("rb-entry-in");
              ioEntry.unobserve(e.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -22% 0px" }
      );
      entries.forEach((el) => ioEntry.observe(el));
      observers.push(ioEntry);

      const ioArrive = new IntersectionObserver(
        (evts) => {
          evts.forEach((e) => {
            if (!e.isIntersecting) return;
            const section = e.target as HTMLElement;
            const eyebrow = section.querySelector<HTMLElement>(".rb-eyebrow");
            if (eyebrow) {
              eyebrow.classList.remove("rb-eyebrow-arrive");
              void eyebrow.offsetWidth;
              eyebrow.classList.add("rb-eyebrow-arrive");
              window.setTimeout(() => {
                eyebrow.classList.remove("rb-eyebrow-arrive");
              }, 1500);
            }
            const nums = section.querySelectorAll<HTMLElement>(".rb-num-big");
            nums.forEach((num, i) => {
              window.setTimeout(() => {
                num.classList.remove("rb-num-pulse");
                void num.offsetWidth;
                num.classList.add("rb-num-pulse");
                window.setTimeout(() => {
                  num.classList.remove("rb-num-pulse");
                }, 1000);
              }, 400 + i * 140);
            });
            ioArrive.unobserve(section);
          });
        },
        { threshold: 0, rootMargin: "-35% 0px -50% 0px" }
      );
      sections.forEach((s) => ioArrive.observe(s));
      observers.push(ioArrive);

      /* Booking-section observer — drives the "here." phrase on both
         desktop and mobile. Fires when #rb-book is prominently on
         screen (cal embed on the homepage; BookDemoCTA pedestal on the
         industry pages). rootMargin trims the top + bottom so the
         phrase doesn't flicker on the edges of view. */
      const bookEl = document.getElementById("rb-book");
      if (bookEl) {
        const ioBook = new IntersectionObserver(
          (evts) => {
            evts.forEach((e) => {
              bookInViewRef.current = e.isIntersecting;
            });
          },
          { rootMargin: "-18% 0px -18% 0px", threshold: 0 }
        );
        ioBook.observe(bookEl);
        observers.push(ioBook);
      } else {
        bookInViewRef.current = false;
      }
    } else {
      sections.forEach((s) => s.classList.add("rb-in"));
      entries.forEach((el) => el.classList.add("rb-entry-in"));
    }

    // Failsafe: after 3s force-reveal anything still hidden.
    const failsafe = window.setTimeout(() => {
      sections.forEach((s) => s.classList.add("rb-in"));
      entries.forEach((el) => el.classList.add("rb-entry-in"));
    }, 3000);

    // Re-measure hiker path for this page's geometry (hero presence,
    // content length). The boot effect exposed __rbRelayout.
    (window as unknown as { __rbRelayout?: () => void }).__rbRelayout?.();

    return () => {
      clearTimeout(failsafe);
      observers.forEach((o) => o.disconnect());
    };
  }, [pathname]);

  return null;
}
