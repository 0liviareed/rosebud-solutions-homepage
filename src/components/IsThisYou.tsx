"use client";

import { useEffect, useRef } from "react";

const POINTS: { text: string; side: "orbright" | "orbleft" }[] = [
  { text: "You're running a business on <em>manual effort</em> that should be automated", side: "orbright" },
  { text: "You know AI can help — but don't know <em>where to start</em>", side: "orbleft" },
  { text: "You're spending hours on tasks that <em>shouldn't need you</em>", side: "orbright" },
  { text: "You want a system in place — <em>not another platform</em> to manage", side: "orbleft" },
  { text: "You need results in <em>weeks</em>, not months of consultancy", side: "orbright" },
  { text: "You want the business to <em>scale</em> without scaling your workload", side: "orbleft" },
];

const N = POINTS.length;

// Orb waypoints [x%, y%] — orb sits just outside each text block boundary
// so the trail leads directly to each word. Desktop only; hidden on mobile.
const ORB_POS = [
  [76, 38], // stage 0: intro
  [58, 33], // stage 1: orbright — right of left text block
  [42, 52], // stage 2: orbleft  — left of right text block
  [59, 41], // stage 3: orbright
  [41, 57], // stage 4: orbleft
  [58, 39], // stage 5: orbright
  [42, 52], // stage 6: orbleft
  [50, 47], // stage 7: outro — centre
  [50, 53], // stage 8: resolution — settle just below centre
];

function smooth(pts: number[][]): string {
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const p = pts[i - 1], c = pts[i];
    const mx = (p[0] + c[0]) / 2, my = (p[1] + c[1]) / 2;
    d += ` Q${p[0]},${p[1]} ${mx},${my}`;
  }
  d += ` L${pts[pts.length - 1][0]},${pts[pts.length - 1][1]}`;
  return d;
}

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function ease(t: number) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }

export default function IsThisYou() {
  const outerRef  = useRef<HTMLDivElement>(null);
  const orbRef    = useRef<HTMLDivElement>(null);
  const trailRef  = useRef<SVGPathElement>(null);
  const ghostRef  = useRef<SVGPathElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pipRefs   = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const outer = outerRef.current;
    const orb   = orbRef.current;
    const trail = trailRef.current;
    const ghost = ghostRef.current;
    if (!outer) return;

    const trailD = smooth(ORB_POS);
    if (trail) trail.setAttribute("d", trailD);
    if (ghost) ghost.setAttribute("d", trailD);

    const pathLen = trail?.getTotalLength() ?? 100;
    if (trail) {
      trail.style.strokeDasharray  = String(pathLen);
      trail.style.strokeDashoffset = String(pathLen);
    }

    let lastStage = 0;

    function setStage(s: number) {
      if (s === lastStage) return;
      // Query all text layers — includes heading (stage 0) and outro (stage N+1)
      outer!.querySelectorAll<HTMLElement>(".rb-nar-txt").forEach((l) => {
        l.classList.toggle("on", parseInt(l.dataset.stage ?? "-1") === s);
      });
      pipRefs.current.forEach((p, i) => {
        if (!p) return;
        p.classList.toggle("on", i === s - 1);
      });
      lastStage = s;
    }

    function onScroll() {
      const rect  = outer!.getBoundingClientRect();
      const total = outer!.offsetHeight - window.innerHeight;
      if (total <= 0) return;

      const p = Math.max(0, Math.min(1, -rect.top / total));
      // Scroll budget: 0–10% intro, 10–80% the N pain points, 80–90% outro
      // ("right place"), 90–100% the resolution slide. Splitting the bottom
      // 22% into two equal-ish bands gives both closing slides enough dwell
      // time without rushing the pain-point progression.
      const stage =
        p < 0.1
          ? 0
          : p > 0.9
          ? N + 2
          : p > 0.8
          ? N + 1
          : Math.min(N, Math.floor((p - 0.1) / (0.7 / N)) + 1);
      setStage(stage);

      // Desktop orb movement
      if (window.innerWidth > 768 && orb) {
        const frac = p * (ORB_POS.length - 1);
        const i0   = Math.min(Math.floor(frac), ORB_POS.length - 2);
        const t    = ease(frac - i0);
        orb.style.left = lerp(ORB_POS[i0][0], ORB_POS[i0 + 1][0], t) + "%";
        orb.style.top  = lerp(ORB_POS[i0][1], ORB_POS[i0 + 1][1], t) + "%";
      }

      if (trail) trail.style.strokeDashoffset = String(pathLen * (1 - p));

      // Label managed entirely by Runtime.tsx via IntersectionObserver.
    }

    let raf: number;
    const handler = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(onScroll); };
    window.addEventListener("scroll", handler, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", handler);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={outerRef} id="rb-nar-outer" className="rb-nar-outer">
      <div className="rb-nar-inner">
        <svg
          className="rb-nar-trail-svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path ref={ghostRef} className="rb-trail-ghost" d="" />
          <path ref={trailRef} className="rb-trail-live"  d="" />
        </svg>

        {/* Stage 0 — heading */}
        <div className="rb-nar-txt rb-nar-stage-head on" data-stage="0">
          <span className="rb-nar-eyebrow-label">· Recognition</span>
          <h2 className="rb-nar-h2">
            Does any of this<br /><em>sound familiar?</em>
          </h2>
        </div>

        {/* Pain points */}
        {POINTS.map((pt, i) => (
          <div
            key={i}
            ref={(el) => { layerRefs.current[i] = el; }}
            className={`rb-nar-txt rb-nar-stage-${pt.side}`}
            data-stage={String(i + 1)}
            dangerouslySetInnerHTML={{ __html: `<p class="rb-nar-point-text">${pt.text}</p>` }}
          />
        ))}

        {/* Outro */}
        <div className="rb-nar-txt rb-nar-stage-outro" data-stage={String(N + 1)}>
          <p className="rb-nar-outro-text">
            If so, you&apos;re in the<br /><em>right place.</em>
          </p>
        </div>

        {/* Resolution — what Rosebud is, in one line */}
        <div className="rb-nar-txt rb-nar-stage-outro" data-stage={String(N + 2)}>
          <p className="rb-nar-resolution-text">
            Because Rosebud isn&apos;t software you operate. It&apos;s a{" "}
            <em>custom AI operation we operate for you</em> — from first
            enquiry to closed deal. Built around your business, run by us.
          </p>
        </div>

        {/* Orb — desktop only, hidden on mobile via CSS */}
        <div
          ref={orbRef}
          className="rb-nar-orb-wrap"
          style={{ left: `${ORB_POS[0][0]}%`, top: `${ORB_POS[0][1]}%` }}
          aria-hidden="true"
        >
          <div className="rb-nar-orb" />
        </div>

        {/* Progress dots */}
        <div className="rb-nar-pips" aria-hidden="true">
          {POINTS.map((_, i) => (
            <div key={i} ref={(el) => { pipRefs.current[i] = el; }} className="rb-nar-pip" />
          ))}
        </div>
      </div>
    </div>
  );
}
