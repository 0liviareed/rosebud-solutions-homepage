"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  HERO_PATH_D,
  HERO_VIEWBOX_DESKTOP,
  HERO_PATH_MOBILE_D,
  HERO_VIEWBOX_MOBILE,
} from "@/lib/hiker-path";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const MOBILE_BREAKPOINT = 820;

export default function Hero() {
  const wrapRef = useRef<HTMLElement | null>(null);
  const heroLitRef = useRef<SVGPathElement | null>(null);
  const heroGuideRef = useRef<SVGPathElement | null>(null);
  const heroDotRef = useRef<SVGGElement | null>(null);
  const heroHikerRef = useRef<HTMLDivElement | null>(null);
  const heroSvgRef = useRef<SVGSVGElement | null>(null);
  const heroWpRef = useRef<SVGGElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const wrap = wrapRef.current;
    const lit = heroLitRef.current;
    const guide = heroGuideRef.current;
    const dot = heroDotRef.current;
    const hikerWrap = heroHikerRef.current;
    const svg = heroSvgRef.current;
    const wp = heroWpRef.current;
    if (!wrap || !lit || !guide || !dot || !hikerWrap || !svg) return;

    // Viewport mode is observed via matchMedia — direct DOM updates
    // on the SVG's viewBox + path attributes when the breakpoint
    // crosses. Avoids React re-renders and useEffect re-runs that
    // could disrupt the load-reveal CSS animations.
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    let pathLen = 0;

    function applyPath() {
      const mobile = mql.matches;
      const nextViewBox = mobile ? HERO_VIEWBOX_MOBILE : HERO_VIEWBOX_DESKTOP;
      const nextD = mobile ? HERO_PATH_MOBILE_D : HERO_PATH_D;
      svg!.setAttribute("viewBox", nextViewBox);
      guide!.setAttribute("d", nextD);
      lit!.setAttribute("d", nextD);
      if (wp) wp.style.display = mobile ? "none" : "";
      pathLen = lit!.getTotalLength();
      lit!.style.strokeDasharray = String(pathLen);
      lit!.style.strokeDashoffset = String(pathLen);
      const pt = lit!.getPointAtLength(0);
      dot!.setAttribute("transform", `translate(${pt.x}, ${pt.y})`);
      ScrollTrigger.refresh();
    }
    applyPath();
    mql.addEventListener("change", applyPath);

    const triggers: ScrollTrigger[] = [];
    const tweens: gsap.core.Tween[] = [];

    const topo = wrap.querySelector<HTMLElement>(".rb-hero-topo");
    const contours = wrap.querySelector<HTMLElement>(".rb-hero-contours");
    const stack = wrap.querySelector<HTMLElement>(".rb-hero-stack");
    const cue = wrap.querySelector<HTMLElement>(".rb-hero-scroll-cue");

    if (!prefersReducedMotion) {
      // Topo parallax — amplitude bumped so the motion is clearly
      // visible on mobile too. On mobile this is the primary
      // scroll-driven animation during the hero (the local hiker
      // is hidden, global hiker runs at the right edge).
      if (topo)
        tweens.push(
          gsap.to(topo, {
            y: -150,
            scale: 1.14,
            ease: "none",
            scrollTrigger: {
              trigger: wrap,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.8,
            },
          })
        );
      if (contours)
        tweens.push(
          gsap.to(contours, {
            y: -60,
            opacity: 0.35,
            ease: "none",
            scrollTrigger: {
              trigger: wrap,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.7,
            },
          })
        );
      if (stack)
        tweens.push(
          gsap.to(stack, {
            opacity: 0,
            y: -40,
            ease: "none",
            scrollTrigger: {
              trigger: wrap,
              start: "62% top",
              end: "bottom bottom",
              scrub: 0.4,
            },
          })
        );
      if (cue)
        tweens.push(
          gsap.to(cue, {
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: wrap,
              start: "10% top",
              end: "25% top",
              scrub: 0.2,
            },
          })
        );
    }

    // Hero hiker — driven by the same RAF + lerp pattern as the global
    // hiker below. Reading window.scrollY directly (which Lenis is
    // already smoothing) and lerping a local progress value matches the
    // silky feel of the vertical descent. ScrollTrigger's `scrub` adds
    // its OWN smoothing on top of Lenis, which reads as laggy on mobile
    // where the stretched path amplifies any delay.
    let rafId = 0;
    let targetP = 0;
    let currentP = 0;
    const HERO_LERP = 0.14;

    // Capture non-null refs so TS narrowing persists inside the RAF closure
    const heroWrap = wrap;
    const heroLitEl = lit;
    const heroDotEl = dot;
    const heroHikerEl = hikerWrap;

    function heroTick() {
      const rect = heroWrap.getBoundingClientRect();
      const wrapTop = window.scrollY + rect.top;
      const range = heroWrap.offsetHeight - window.innerHeight;
      if (range > 0) {
        const scrolled = window.scrollY - wrapTop;
        targetP = Math.max(0, Math.min(1, scrolled / range));
      }
      if (prefersReducedMotion) {
        currentP = targetP;
      } else {
        const d = targetP - currentP;
        const absD = Math.abs(d);
        const eff = absD < 0.01 ? Math.min(0.28, HERO_LERP + 0.12) : HERO_LERP;
        currentP += d * eff;
      }
      const walked = pathLen * currentP;
      const pt = heroLitEl.getPointAtLength(walked);
      heroDotEl.setAttribute("transform", `translate(${pt.x}, ${pt.y})`);
      heroLitEl.style.strokeDashoffset = String(pathLen - walked);
      heroHikerEl.style.opacity = currentP > 0.92 ? "0" : "1";
      rafId = requestAnimationFrame(heroTick);
    }
    rafId = requestAnimationFrame(heroTick);

    return () => {
      triggers.forEach((t) => t.kill());
      tweens.forEach((t) => t.kill());
      cancelAnimationFrame(rafId);
      mql.removeEventListener("change", applyPath);
    };
  }, []);

  return (
    <section
      ref={wrapRef}
      className="rb-hero-wrap"
      aria-label="Rosebud Solutions — introduction"
    >
      <div className="rb-hero-pin">
        {/* Single raster topo layer. Mid/far parallax removed — the
            global FloatingPaths layer carries that atmospheric role now
            across the whole page, so duplicating it here created visual
            noise. Contour overlay below still draws in over the raster. */}
        <div className="rb-hero-topo" aria-hidden="true">
          <Image
            src="/topo.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            quality={85}
            style={{
              objectFit: "cover",
              objectPosition: "center",
              filter:
                "brightness(var(--rb-topo-bright)) contrast(1.05) sepia(var(--rb-topo-sep)) hue-rotate(var(--rb-topo-hue))",
            }}
          />
        </div>

        <svg
          className="rb-hero-contours"
          aria-hidden="true"
          viewBox="0 0 1600 900"
          preserveAspectRatio="xMidYMid slice"
        >
          <path style={{ ["--rb-len" as string]: "2400", ["--rb-dly" as string]: "600ms" }} d="M -50 180 C 200 140, 420 220, 640 180 S 1080 130, 1300 190 S 1580 170, 1680 210" />
          <path style={{ ["--rb-len" as string]: "2400", ["--rb-dly" as string]: "720ms" }} d="M -50 240 C 220 200, 440 280, 660 240 S 1100 190, 1320 250 S 1580 230, 1680 270" />
          <path style={{ ["--rb-len" as string]: "2400", ["--rb-dly" as string]: "820ms" }} d="M -50 320 C 240 280, 460 360, 680 325 S 1120 260, 1340 320 S 1580 310, 1680 340" />
          <path style={{ ["--rb-len" as string]: "2400", ["--rb-dly" as string]: "920ms" }} d="M -50 420 C 260 380, 480 450, 700 420 S 1140 360, 1360 410 S 1580 420, 1680 430" />
          <path style={{ ["--rb-len" as string]: "2400", ["--rb-dly" as string]: "1020ms" }} d="M -50 540 C 280 500, 500 560, 720 530 S 1160 480, 1380 520 S 1580 520, 1680 540" />
          <path style={{ ["--rb-len" as string]: "2400", ["--rb-dly" as string]: "1120ms" }} d="M -50 650 C 300 610, 520 660, 740 640 S 1180 600, 1400 620 S 1580 620, 1680 640" />
          <path style={{ ["--rb-len" as string]: "2400", ["--rb-dly" as string]: "1220ms" }} d="M -50 740 C 320 720, 540 760, 760 740 S 1200 720, 1420 730 S 1580 730, 1680 740" />
        </svg>

        <svg className="rb-hero-grain" aria-hidden="true">
          <filter id="rb-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#rb-grain)" />
        </svg>

        <div className="rb-hero-vignette" aria-hidden="true" />

        {/* Hero-local hiker — horizontal sweep. SVG is rendered once
            with the desktop viewBox/path; a matchMedia listener in
            the useEffect below swaps to mobile variants via direct
            DOM manipulation when crossing the 820px breakpoint. No
            React re-render on resize — keeps the load-reveal CSS
            animations undisturbed. */}
        <div className="rb-hero-hiker" aria-hidden="true" ref={heroHikerRef}>
          <svg
            ref={heroSvgRef}
            viewBox={HERO_VIEWBOX_DESKTOP}
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="rb-hero-trail-grad" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="rgba(139,125,216,0)" />
                <stop offset="35%" stopColor="rgba(139,125,216,0.45)" />
                <stop offset="80%" stopColor="rgba(184,174,219,0.9)" />
                <stop offset="100%" stopColor="rgba(255,255,255,1)" />
              </linearGradient>
              <filter id="rb-hero-lit-glow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="8" result="b1" />
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b2" />
                <feMerge>
                  <feMergeNode in="b1" />
                  <feMergeNode in="b2" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <path ref={heroGuideRef} id="rb-hero-path" className="rb-hero-guide" d={HERO_PATH_D} />
            <path ref={heroLitRef} id="rb-hero-path-lit" className="rb-hero-lit" d={HERO_PATH_D} />

            {/* Waypoints — coordinates tied to 1920×1080 viewBox.
                The applyPath() handler hides this group on mobile. */}
            <g ref={heroWpRef}>
              <g className="rb-hero-wp rb-hero-wp-1">
                <circle cx={1500} cy={500} r={22} fill="none" stroke="rgba(184,174,219,0.35)" strokeWidth={1} />
                <circle cx={1500} cy={500} r={3} fill="rgba(184,174,219,0.9)" />
              </g>
              <g className="rb-hero-wp rb-hero-wp-2">
                <circle cx={700} cy={750} r={22} fill="none" stroke="rgba(184,174,219,0.35)" strokeWidth={1} />
                <circle cx={700} cy={750} r={3} fill="rgba(184,174,219,0.9)" />
              </g>
              <g className="rb-hero-wp rb-hero-wp-3">
                <circle cx={180} cy={360} r={22} fill="none" stroke="rgba(184,174,219,0.35)" strokeWidth={1} />
                <circle cx={180} cy={360} r={3} fill="rgba(184,174,219,0.9)" />
              </g>
            </g>

            <g className="rb-hero-dot" ref={heroDotRef}>
              <circle r={44} fill="rgba(139,125,216,0.08)" />
              <circle r={26} fill="rgba(184,174,219,0.22)" />
              <circle r={8} fill="#F5F1EA" />
              <circle r={3} fill="#FFFFFF" />
            </g>
          </svg>
        </div>

        <div className="rb-hero-inner">
          <div className="rb-hero-stack">
            <h1 className="rb-hero-h1">
              <span className="rb-l1">Your business runs</span>
              <br />
              <span className="rb-l2a">on&nbsp;</span>
              <em className="rb-l2b">you.</em>
            </h1>
            <p className="rb-hero-sub">That needs to change.</p>
            <p className="rb-hero-caption">
              Your digital team. Live in 5 weeks. Running for years.
            </p>
          </div>
        </div>

        <div className="rb-hero-scroll-cue" aria-hidden="true">
          Scroll
        </div>
      </div>
    </section>
  );
}
