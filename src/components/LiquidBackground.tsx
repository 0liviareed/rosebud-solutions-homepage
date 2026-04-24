"use client";

import { useEffect, useRef } from "react";

/**
 * LiquidBackground — the blue liquid-morph canvas used across Jay's
 * standalone pages (waitlist, founders stack). Fixed-position so it
 * always fills the viewport and content scrolls over it.
 *
 * Three tiers of motion:
 *   1. Base + warm/cool radial accents painted each frame
 *   2. Five flow anchors (soft, oversized, sine-drifting) layered on top
 *   3. Nine orbs with Lissajous drift + radius/alpha breathing + lobed
 *      morphing (three offset sub-circles per orb whose centres rotate)
 *
 * Mobile multiplies amplitudes, radii, and time step so movement stays
 * visible in the narrow strips around a full-width glass card.
 */
export default function LiquidBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;

    function resize() {
      if (!canvas) return;
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function trackMouse(e: MouseEvent) {
      mouseRef.current.x = Math.max(
        0,
        Math.min(1, e.clientX / window.innerWidth)
      );
      mouseRef.current.y = Math.max(
        0,
        Math.min(1, e.clientY / window.innerHeight)
      );
    }
    window.addEventListener("mousemove", trackMouse);

    type Orb = {
      bx: number; by: number;
      ax1: number; ax2: number;
      ay1: number; ay2: number;
      fx1: number; fx2: number;
      fy1: number; fy2: number;
      px1: number; px2: number;
      py1: number; py2: number;
      r: number;
      rBreath: number; fBreath: number; pBreath: number; aBreath: number;
      rgb: [number, number, number];
      a: number;
      kind: "sun" | "orb" | "glint";
    };

    const orbs: Orb[] = [
      { bx: 0.72, by: 0.22, ax1: 0.18, ax2: 0.08, ay1: 0.12, ay2: 0.06,
        fx1: 0.55, fx2: 1.1, fy1: 0.75, fy2: 1.35,
        px1: 0.0, px2: 1.2, py1: 0.4, py2: 2.1,
        r: 0.55, rBreath: 0.16, fBreath: 0.55, pBreath: 0.0, aBreath: 0.28,
        rgb: [255, 248, 230], a: 0.42, kind: "sun" },
      { bx: 0.22, by: 0.72, ax1: 0.24, ax2: 0.10, ay1: 0.18, ay2: 0.08,
        fx1: 0.50, fx2: 1.25, fy1: 0.65, fy2: 1.15,
        px1: 0.8, px2: 2.4, py1: 1.6, py2: 3.2,
        r: 0.42, rBreath: 0.20, fBreath: 0.85, pBreath: 1.0, aBreath: 0.22,
        rgb: [48, 108, 215], a: 0.72, kind: "orb" },
      { bx: 0.66, by: 0.58, ax1: 0.22, ax2: 0.09, ay1: 0.18, ay2: 0.08,
        fx1: 0.60, fx2: 1.4, fy1: 0.80, fy2: 1.1,
        px1: 2.2, px2: 1.5, py1: 0.9, py2: 2.8,
        r: 0.32, rBreath: 0.22, fBreath: 1.05, pBreath: 2.3, aBreath: 0.25,
        rgb: [110, 175, 248], a: 0.82, kind: "orb" },
      { bx: 0.24, by: 0.26, ax1: 0.22, ax2: 0.10, ay1: 0.18, ay2: 0.08,
        fx1: 0.70, fx2: 1.5, fy1: 0.55, fy2: 1.8,
        px1: 0.4, px2: 3.1, py1: 2.1, py2: 0.7,
        r: 0.28, rBreath: 0.24, fBreath: 0.95, pBreath: 0.4, aBreath: 0.28,
        rgb: [85, 150, 240], a: 0.75, kind: "orb" },
      { bx: 0.76, by: 0.80, ax1: 0.20, ax2: 0.09, ay1: 0.16, ay2: 0.07,
        fx1: 0.45, fx2: 1.2, fy1: 0.70, fy2: 1.5,
        px1: 1.5, px2: 0.8, py1: 1.3, py2: 2.6,
        r: 0.34, rBreath: 0.18, fBreath: 0.75, pBreath: 2.8, aBreath: 0.20,
        rgb: [170, 210, 255], a: 0.65, kind: "orb" },
      { bx: 0.42, by: 0.34, ax1: 0.07, ax2: 0.04, ay1: 0.05, ay2: 0.03,
        fx1: 0.85, fx2: 1.6, fy1: 0.95, fy2: 1.4,
        px1: 1.8, px2: 0.3, py1: 2.5, py2: 1.1,
        r: 0.17, rBreath: 0.32, fBreath: 1.45, pBreath: 0.9, aBreath: 0.38,
        rgb: [230, 242, 255], a: 0.78, kind: "glint" },
      { bx: 0.54, by: 0.22, ax1: 0.06, ax2: 0.03, ay1: 0.05, ay2: 0.03,
        fx1: 1.15, fx2: 1.8, fy1: 0.90, fy2: 1.6,
        px1: 2.8, px2: 1.0, py1: 0.5, py2: 2.3,
        r: 0.11, rBreath: 0.40, fBreath: 1.75, pBreath: 2.2, aBreath: 0.45,
        rgb: [252, 253, 255], a: 0.85, kind: "glint" },
      { bx: 0.38, by: 0.56, ax1: 0.26, ax2: 0.11, ay1: 0.20, ay2: 0.09,
        fx1: 0.55, fx2: 1.3, fy1: 0.70, fy2: 1.25,
        px1: 1.2, px2: 2.8, py1: 0.7, py2: 3.4,
        r: 0.26, rBreath: 0.24, fBreath: 0.92, pBreath: 1.7, aBreath: 0.26,
        rgb: [140, 160, 230], a: 0.68, kind: "orb" },
      { bx: 0.55, by: 0.16, ax1: 0.18, ax2: 0.08, ay1: 0.12, ay2: 0.06,
        fx1: 0.80, fx2: 1.5, fy1: 0.95, fy2: 1.3,
        px1: 2.6, px2: 0.5, py1: 1.4, py2: 2.9,
        r: 0.18, rBreath: 0.30, fBreath: 1.25, pBreath: 0.2, aBreath: 0.30,
        rgb: [255, 238, 210], a: 0.72, kind: "orb" },
      { bx: 0.12, by: 0.46, ax1: 0.16, ax2: 0.07, ay1: 0.24, ay2: 0.10,
        fx1: 0.50, fx2: 1.2, fy1: 0.60, fy2: 1.4,
        px1: 2.0, px2: 1.1, py1: 0.3, py2: 2.2,
        r: 0.22, rBreath: 0.22, fBreath: 0.82, pBreath: 2.5, aBreath: 0.24,
        rgb: [185, 215, 255], a: 0.70, kind: "orb" },
      { bx: 0.28, by: 0.88, ax1: 0.05, ax2: 0.03, ay1: 0.04, ay2: 0.02,
        fx1: 1.10, fx2: 1.7, fy1: 1.05, fy2: 1.55,
        px1: 0.6, px2: 2.4, py1: 3.0, py2: 0.9,
        r: 0.09, rBreath: 0.38, fBreath: 1.55, pBreath: 1.4, aBreath: 0.42,
        rgb: [248, 252, 255], a: 0.78, kind: "glint" },
    ];

    let rafId = 0;
    let t = 0;
    function draw() {
      if (!ctx) return;

      const isMobile = W < 640;
      const ampScale = isMobile ? 1.5 : 1.0;
      const radScale = isMobile ? 1.25 : 1.0;
      t += isMobile ? 0.009 : 0.006;

      ctx.clearRect(0, 0, W, H);
      const base = ctx.createLinearGradient(0, 0, W, H);
      base.addColorStop(0.0, "#d1e2fb");
      base.addColorStop(0.5, "#b5cdf2");
      base.addColorStop(1.0, "#97b8e8");
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, W, H);

      const maxDim = Math.max(W, H);
      const anchors = [
        { bx: 0.82, by: 0.88, ax: 0.10, ay: 0.08, fx: 0.32, fy: 0.27, ph: 0.0,
          r: 0.68, color: "rgba(255, 220, 190, 0.22)" },
        { bx: 0.74, by: 0.40, ax: 0.09, ay: 0.12, fx: 0.26, fy: 0.35, ph: 1.6,
          r: 0.46, color: "rgba(255, 200, 210, 0.14)" },
        { bx: 0.14, by: 0.12, ax: 0.12, ay: 0.09, fx: 0.38, fy: 0.30, ph: 2.2,
          r: 0.60, color: "rgba(80, 145, 225, 0.30)" },
        { bx: 0.18, by: 0.78, ax: 0.14, ay: 0.10, fx: 0.29, fy: 0.41, ph: 3.4,
          r: 0.52, color: "rgba(130, 155, 230, 0.22)" },
        { bx: 0.50, by: 0.20, ax: 0.20, ay: 0.08, fx: 0.22, fy: 0.44, ph: 0.9,
          r: 0.40, color: "rgba(250, 250, 255, 0.20)" },
      ];
      for (const a of anchors) {
        const cx = W * (a.bx + Math.sin(t * a.fx + a.ph) * a.ax * ampScale);
        const cy = H * (a.by + Math.cos(t * a.fy + a.ph * 0.8) * a.ay * ampScale);
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxDim * a.r);
        const transparent = a.color.replace(/0\.\d+\)/, "0)");
        grad.addColorStop(0, a.color);
        grad.addColorStop(1, transparent);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);
      }

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const minDim = Math.min(W, H);

      for (const o of orbs) {
        const x = o.bx
          + (Math.sin(t * o.fx1 + o.px1) * o.ax1 +
             Math.cos(t * o.fx2 + o.px2) * o.ax2) * ampScale;
        const y = o.by
          + (Math.cos(t * o.fy1 + o.py1) * o.ay1 +
             Math.sin(t * o.fy2 + o.py2) * o.ay2) * ampScale;

        const breathR = 1 + Math.sin(t * o.fBreath + o.pBreath) * o.rBreath;
        const breathA =
          1 + Math.sin(t * o.fBreath * 0.85 + o.pBreath + 1.2) * o.aBreath;

        const dx = mx - x;
        const dy = my - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const baseInf =
          o.kind === "sun" ? 0.006
          : o.kind === "glint" ? 0.028
          : 0.014;
        const influence = Math.max(0, 1 - dist / 0.95) * baseInf;

        const rad = o.r * minDim * breathR * radScale;
        const alpha = o.a * breathA;
        const px = (x + dx * influence) * W;
        const py = (y + dy * influence) * H;

        const [r, g, bl] = o.rgb;

        if (o.kind === "glint") {
          const grad = ctx.createRadialGradient(px, py, 0, px, py, rad);
          grad.addColorStop(0,    `rgba(${r},${g},${bl},${alpha})`);
          grad.addColorStop(0.35, `rgba(${r},${g},${bl},${alpha * 0.55})`);
          grad.addColorStop(0.7,  `rgba(${r},${g},${bl},${alpha * 0.18})`);
          grad.addColorStop(1,    `rgba(${r},${g},${bl},0)`);
          ctx.beginPath();
          ctx.arc(px, py, rad, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        } else {
          const lobes = 3;
          const lobeOffset = rad * 0.34;
          const lobeAlpha = alpha * 0.6;
          for (let i = 0; i < lobes; i++) {
            const ang =
              t * (0.9 + i * 0.5) +
              o.pBreath * 0.8 +
              i * ((Math.PI * 2) / lobes);
            const lx = px + Math.cos(ang) * lobeOffset;
            const ly = py + Math.sin(ang) * lobeOffset;
            const lr = rad * (0.92 - i * 0.05);
            const grad = ctx.createRadialGradient(lx, ly, 0, lx, ly, lr);
            grad.addColorStop(0,    `rgba(${r},${g},${bl},${lobeAlpha})`);
            grad.addColorStop(0.35, `rgba(${r},${g},${bl},${lobeAlpha * 0.55})`);
            grad.addColorStop(0.7,  `rgba(${r},${g},${bl},${lobeAlpha * 0.18})`);
            grad.addColorStop(1,    `rgba(${r},${g},${bl},0)`);
            ctx.beginPath();
            ctx.arc(lx, ly, lr, 0, Math.PI * 2);
            ctx.fillStyle = grad;
            ctx.fill();
          }
        }
      }
      rafId = requestAnimationFrame(draw);
    }
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", trackMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
