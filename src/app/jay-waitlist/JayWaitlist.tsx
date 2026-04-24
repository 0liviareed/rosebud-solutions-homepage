"use client";

import { useEffect, useRef, useState } from "react";

const AVATAR_SRC =
  "data:image/jpeg;base64,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";

const BREVO_ENDPOINT =
  "https://9a0c3ced.sibforms.com/serve/MUIFANcqNrLslaPEoGHqktGuFfF1DG9Wp9Ni-LC5nsiHvELadMqF7h120Yvq64tc5k_zmDFB7OLoh1_0xWRhOjHKMblZI70fApbbrwKRObuJsqrTJ7SU4s1gL_qaP9gxeZVGZwnu7QNGwaLHSAwaQuetqp6hhuYo3IJkbxJCus4KSG9w58hPToX65Kidr4SjCRWevSgbSS9TsHWaKg==";

type FormState = "idle" | "submitting" | "success";

export default function JayWaitlist() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const tiltRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 }); // normalised cursor in wrap
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", ig: "", goal: "" });

  const filledCount = Object.values(form).filter(
    (v) => v.trim().length > 0
  ).length;
  const progressPct = (filledCount / 4) * 100;

  /* Canvas atmosphere — soft drifting blue blobs with subtle cursor parallax */
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;

    function resize() {
      if (!canvas || !wrap) return;
      W = canvas.width = wrap.offsetWidth;
      H = canvas.height = Math.max(
        wrap.offsetHeight,
        wrap.scrollHeight,
        600
      );
    }
    resize();
    window.addEventListener("resize", resize);

    function trackMouse(e: MouseEvent) {
      if (!wrap) return;
      const rect = wrap.getBoundingClientRect();
      mouseRef.current.x = Math.max(
        0,
        Math.min(1, (e.clientX - rect.left) / rect.width)
      );
      mouseRef.current.y = Math.max(
        0,
        Math.min(1, (e.clientY - rect.top) / rect.height)
      );
    }
    wrap.addEventListener("mousemove", trackMouse);

    /* Orbs drift on multi-frequency Lissajous-like paths — smoother,
       more organic than linear+bounce. Each has its own frequencies,
       amplitudes and phases so they never move in lockstep. */
    type Orb = {
      bx: number; by: number;             // base position (0-1)
      ax1: number; ax2: number;           // x amplitudes
      ay1: number; ay2: number;           // y amplitudes
      fx1: number; fx2: number;           // x frequencies
      fy1: number; fy2: number;           // y frequencies
      px1: number; px2: number;           // x phases
      py1: number; py2: number;           // y phases
      r: number;                          // radius fraction of min(W,H)
      rgb: [number, number, number];
      a: number;                          // peak alpha
      kind: "sun" | "orb" | "glint";
    };

    const orbs: Orb[] = [
      // The sun — oversized specular anchor. Slow, subtle drift;
      // warm-tinted near-white so it reads as off-screen light source.
      { bx: 0.80, by: 0.16, ax1: 0.04, ax2: 0.02, ay1: 0.03, ay2: 0.02,
        fx1: 0.55, fx2: 1.1, fy1: 0.75, fy2: 1.35,
        px1: 0.0, px2: 1.2, py1: 0.4, py2: 2.1,
        r: 0.62, rgb: [255, 248, 230], a: 0.30, kind: "sun" },
      // Deep navy wash — anchors the bottom-left with atmospheric depth
      { bx: 0.14, by: 0.78, ax1: 0.09, ax2: 0.04, ay1: 0.06, ay2: 0.03,
        fx1: 0.50, fx2: 1.25, fy1: 0.65, fy2: 1.15,
        px1: 0.8, px2: 2.4, py1: 1.6, py2: 3.2,
        r: 0.46, rgb: [60, 120, 225], a: 0.52, kind: "orb" },
      // Mid sky-blue — warms the composition's midground
      { bx: 0.68, by: 0.60, ax1: 0.08, ax2: 0.04, ay1: 0.06, ay2: 0.03,
        fx1: 0.60, fx2: 1.4, fy1: 0.80, fy2: 1.1,
        px1: 2.2, px2: 1.5, py1: 0.9, py2: 2.8,
        r: 0.34, rgb: [130, 188, 250], a: 0.62, kind: "orb" },
      // Soft atmospheric wash — top-left depth
      { bx: 0.18, by: 0.20, ax1: 0.07, ax2: 0.03, ay1: 0.06, ay2: 0.03,
        fx1: 0.70, fx2: 1.5, fy1: 0.55, fy2: 1.8,
        px1: 0.4, px2: 3.1, py1: 2.1, py2: 0.7,
        r: 0.30, rgb: [100, 160, 240], a: 0.55, kind: "orb" },
      // Pastel haze — bottom-right
      { bx: 0.82, by: 0.84, ax1: 0.06, ax2: 0.03, ay1: 0.05, ay2: 0.03,
        fx1: 0.45, fx2: 1.2, fy1: 0.70, fy2: 1.5,
        px1: 1.5, px2: 0.8, py1: 1.3, py2: 2.6,
        r: 0.36, rgb: [180, 218, 255], a: 0.48, kind: "orb" },
      // Bright highlight glint — mid-upper area, smaller and brighter
      { bx: 0.42, by: 0.34, ax1: 0.05, ax2: 0.03, ay1: 0.04, ay2: 0.02,
        fx1: 0.85, fx2: 1.6, fy1: 0.95, fy2: 1.4,
        px1: 1.8, px2: 0.3, py1: 2.5, py2: 1.1,
        r: 0.17, rgb: [230, 242, 255], a: 0.75, kind: "glint" },
      // Small pure-white sparkle — upper-middle specular accent
      { bx: 0.54, by: 0.22, ax1: 0.04, ax2: 0.02, ay1: 0.04, ay2: 0.02,
        fx1: 1.15, fx2: 1.8, fy1: 0.90, fy2: 1.6,
        px1: 2.8, px2: 1.0, py1: 0.5, py2: 2.3,
        r: 0.11, rgb: [252, 253, 255], a: 0.82, kind: "glint" },
    ];

    let rafId = 0;
    let t = 0;
    function draw() {
      if (!ctx) return;
      t += 0.0012;

      /* Layered base — radial cool-blue anchor top-left + warm accent
         bottom-right over a richer linear base gradient. Higher value
         range than a single linear gives the field real depth. */
      ctx.clearRect(0, 0, W, H);
      const base = ctx.createLinearGradient(0, 0, W, H);
      base.addColorStop(0.0, "#e4efff");
      base.addColorStop(0.5, "#d2e2fa");
      base.addColorStop(1.0, "#bbd0f0");
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, W, H);

      // Warm accent — a breath of sunset-adjacent colour creates
      // temperature contrast against the cool blues.
      const warm = ctx.createRadialGradient(W * 0.88, H * 0.92, 0, W * 0.88, H * 0.92, Math.max(W, H) * 0.65);
      warm.addColorStop(0, "rgba(255, 228, 200, 0.18)");
      warm.addColorStop(1, "rgba(255, 228, 200, 0)");
      ctx.fillStyle = warm;
      ctx.fillRect(0, 0, W, H);

      // Cool deep anchor — top-left
      const cool = ctx.createRadialGradient(W * 0.1, H * 0.08, 0, W * 0.1, H * 0.08, Math.max(W, H) * 0.6);
      cool.addColorStop(0, "rgba(130, 180, 240, 0.28)");
      cool.addColorStop(1, "rgba(130, 180, 240, 0)");
      ctx.fillStyle = cool;
      ctx.fillRect(0, 0, W, H);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const minDim = Math.min(W, H);

      // Use additive blending for the orbs so bright highlights
      // genuinely brighten where they overlap, like real light.
      const prevOp = ctx.globalCompositeOperation;
      ctx.globalCompositeOperation = "screen";

      for (const o of orbs) {
        // Lissajous-like organic drift — two frequencies per axis.
        const x = o.bx
          + Math.sin(t * o.fx1 + o.px1) * o.ax1
          + Math.cos(t * o.fx2 + o.px2) * o.ax2;
        const y = o.by
          + Math.cos(t * o.fy1 + o.py1) * o.ay1
          + Math.sin(t * o.fy2 + o.py2) * o.ay2;

        // Cursor parallax — close orbs respond more than distant ones.
        const dx = mx - x;
        const dy = my - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        // Sun barely responds; glints respond most (feel like catching
        // highlights on the cursor's motion).
        const base =
          o.kind === "sun" ? 0.006
          : o.kind === "glint" ? 0.028
          : 0.014;
        const influence = Math.max(0, 1 - dist / 0.95) * base;

        const rad = o.r * minDim;
        const px = (x + dx * influence) * W;
        const py = (y + dy * influence) * H;

        const grad = ctx.createRadialGradient(px, py, 0, px, py, rad);
        const [r, g, bl] = o.rgb;
        grad.addColorStop(0,    `rgba(${r},${g},${bl},${o.a})`);
        grad.addColorStop(0.35, `rgba(${r},${g},${bl},${o.a * 0.55})`);
        grad.addColorStop(0.7,  `rgba(${r},${g},${bl},${o.a * 0.18})`);
        grad.addColorStop(1,    `rgba(${r},${g},${bl},0)`);

        ctx.beginPath();
        ctx.arc(px, py, rad, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      ctx.globalCompositeOperation = prevOp;
      rafId = requestAnimationFrame(draw);
    }
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      wrap.removeEventListener("mousemove", trackMouse);
    };
  }, []);

  /* Card 3D tilt parallax — gentle rotateX/rotateY toward cursor, lerped.
     Wraps the card in .jw-card-tilt so the card's own jwCardIn enter
     animation doesn't fight this transform. Disabled on touch devices. */
  useEffect(() => {
    const wrap = wrapRef.current;
    const tilt = tiltRef.current;
    if (!wrap || !tilt) return;
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    const LERP = 0.08;
    const MAX_DEG = 3;

    function onMove(e: MouseEvent) {
      if (!tilt) return;
      const rect = tilt.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const nx = (e.clientX - cx) / rect.width;
      const ny = (e.clientY - cy) / rect.height;
      targetY = Math.max(-1, Math.min(1, nx)) * MAX_DEG;
      targetX = Math.max(-1, Math.min(1, ny)) * -MAX_DEG;
    }
    function onLeave() {
      targetX = 0;
      targetY = 0;
    }
    function tick() {
      currentX += (targetX - currentX) * LERP;
      currentY += (targetY - currentY) * LERP;
      if (tilt) {
        tilt.style.transform =
          `perspective(1100px) rotateX(${currentX.toFixed(3)}deg) rotateY(${currentY.toFixed(3)}deg)`;
      }
      raf = requestAnimationFrame(tick);
    }
    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  async function submit() {
    setError("");
    const name = form.name.trim();
    const email = form.email.trim();
    const ig = form.ig.trim();
    const goal = form.goal.trim();
    if (!name || !email || !ig || !goal) {
      setError("Please fill in all fields before submitting.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setState("submitting");
    const body = new URLSearchParams({
      FIRSTNAME: name,
      EMAIL: email,
      INSTAGRAM_HANDLE: ig,
      GOAL: goal,
      email_address_check: "",
      locale: "en",
    });
    try {
      await fetch(BREVO_ENDPOINT, { method: "POST", mode: "no-cors", body });
      setState("success");
    } catch {
      setState("idle");
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <div id="jw-wrap" ref={wrapRef}>
      <canvas id="jw-canvas" ref={canvasRef} />
      <div className="jw-circle-deco jw-c1" />
      <div className="jw-circle-deco jw-c2" />
      <div className="jw-circle-deco jw-c3" />
      <div className="jw-plus jw-p1" />
      <div className="jw-plus jw-p2" />
      <div className="jw-plus jw-p3" />

      <div className="jw-card-tilt" ref={tiltRef}>
      <div className="jw-card">
        <div className="jw-avatar">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={AVATAR_SRC} alt="Founder" />
        </div>
        <div className="jw-badge">
          <div className="jw-badge-dot" />
          <span>Welcome to the waitlist</span>
        </div>
        <h2 className="jw-h1">
          POV: You&rsquo;re a founder who&rsquo;s ready to stop figuring it out
          alone and start growing your business &amp; making more money in
          2026.
        </h2>
        <p className="jw-copy">
          This list is reserved for people who are serious about building
          something real. If that&rsquo;s you — drop your name below.
        </p>
        <p className="jw-ps">
          PS. We cannot guarantee spaces but we&rsquo;d love to understand
          where you&rsquo;re at.
        </p>
        <a href="/founders-stack" className="jw-pre-cta">
          Already ready to go? Grab the Founder&rsquo;s Financial Stack &rarr;
        </a>

        <div className="jw-form-panel">
          <div
            className="jw-form-progress"
            style={{ width: `${progressPct}%` }}
            aria-hidden="true"
          />
          {error && <div className="jw-error">{error}</div>}
          {state !== "success" ? (
            <div>
              <div className="jw-field">
                <label htmlFor="jw-name">Name</label>
                <input
                  id="jw-name"
                  type="text"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div className="jw-field">
                <label htmlFor="jw-email">Email</label>
                <input
                  id="jw-email"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div className="jw-field">
                <label htmlFor="jw-ig">Instagram Handle</label>
                <input
                  id="jw-ig"
                  type="text"
                  placeholder="@yourhandle"
                  value={form.ig}
                  onChange={(e) => setForm({ ...form, ig: e.target.value })}
                  required
                />
              </div>
              <div className="jw-field">
                <label htmlFor="jw-goal">
                  What&rsquo;s one thing you want to achieve in the next 3
                  months?
                </label>
                <input
                  id="jw-goal"
                  type="text"
                  placeholder="Be specific — we read every one."
                  value={form.goal}
                  onChange={(e) => setForm({ ...form, goal: e.target.value })}
                  required
                />
              </div>
              <div
                className="jw-btn-magnet"
                onMouseMove={(e) => {
                  const btn = btnRef.current;
                  if (!btn) return;
                  if (window.matchMedia("(hover: none)").matches) return;
                  const rect = btn.getBoundingClientRect();
                  const dx =
                    e.clientX - (rect.left + rect.width / 2);
                  const dy =
                    e.clientY - (rect.top + rect.height / 2);
                  btn.style.transform = `translate(${dx * 0.14}px, ${dy * 0.18}px)`;
                }}
                onMouseLeave={() => {
                  if (btnRef.current) btnRef.current.style.transform = "";
                }}
              >
                <button
                  ref={btnRef}
                  type="button"
                  className="jw-btn"
                  onClick={submit}
                  disabled={state === "submitting"}
                >
                  <span className="jw-btn-label">
                    {state === "submitting" ? "Submitting..." : "Submit"}
                  </span>
                  <span className="jw-btn-arrow" aria-hidden="true">
                    <svg viewBox="0 0 32 12" width="32" height="12">
                      <path
                        className="jw-btn-shaft"
                        d="M0 6 L22 6"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        fill="none"
                      />
                      <path
                        className="jw-btn-head"
                        d="M17 1.5 L22 6 L17 10.5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <div className="jw-success">
              <div className="jw-success-icon">&#10003;</div>
              <h3>You&rsquo;re on the list.</h3>
              <p>We&rsquo;ll be in touch soon. Keep building.</p>
            </div>
          )}
        </div>
      </div>
      </div>

      <div className="jw-social">
        <span className="jw-social-label">Follow</span>
        <a
          className="jw-social-link"
          href="https://www.instagram.com/jayokojie/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="#3a5a9a" strokeWidth="1.7" />
            <circle cx="12" cy="12" r="4.2" stroke="#3a5a9a" strokeWidth="1.7" />
            <circle cx="17.2" cy="6.8" r="1.1" fill="#3a5a9a" />
          </svg>
        </a>
        <a
          className="jw-social-link"
          href="https://www.tiktok.com/@jayokojie"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="TikTok"
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9 12.5a4 4 0 1 0 4 4V4.5a5.5 5.5 0 0 0 5.5 5.5"
              stroke="#3a5a9a"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>

      {/* Page-local styles. Prefix "jw-" and #jw-wrap scoping keeps it
          from colliding with the editorial "rb-" system. */}
      <style>{`
        #jw-wrap {
          position: relative;
          width: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 20px 80px;
          overflow: hidden;
          font-family: var(--font-dm-sans), 'DM Sans', sans-serif;
          background: #c8dfff;
          color: #0a1b40;
        }
        /* Edge vignette — subtle inward darkening on the corners so
           the glass card reads as the focal point, not just another
           bright region. Sits above the canvas, below the card. */
        #jw-wrap::after {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 3;
          background:
            radial-gradient(
              ellipse at center,
              transparent 42%,
              rgba(20, 55, 120, 0.15) 100%
            );
        }
        #jw-canvas { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 1; }

        /* Orbital rings — dashed, barely visible, rotating at different
           rates and directions. Feels like a slow orrery rather than
           decorative geometry. */
        .jw-circle-deco {
          position: absolute;
          border-radius: 50%;
          border: 1px dashed rgba(80, 130, 220, 0.16);
          pointer-events: none;
          z-index: 2;
          will-change: transform;
        }
        .jw-c1 {
          width: 520px; height: 520px; top: 50%; left: 50%;
          transform: translate(-50%, -50%) rotate(0deg);
          animation: jwOrbit1 180s linear infinite;
        }
        .jw-c2 {
          width: 760px; height: 760px; top: 50%; left: 50%;
          transform: translate(-50%, -50%) rotate(0deg);
          animation: jwOrbit2 240s linear infinite reverse;
        }
        .jw-c3 {
          width: 1040px; height: 1040px; top: 50%; left: 50%;
          transform: translate(-50%, -50%) rotate(0deg);
          animation: jwOrbit3 320s linear infinite;
          border-color: rgba(80, 130, 220, 0.1);
        }
        @keyframes jwOrbit1 { to { transform: translate(-50%, -50%) rotate(360deg); } }
        @keyframes jwOrbit2 { to { transform: translate(-50%, -50%) rotate(360deg); } }
        @keyframes jwOrbit3 { to { transform: translate(-50%, -50%) rotate(360deg); } }

        /* Luminous specks replace the + glyphs — tiny pulsing stars
           scattered at the composition's corners. Each has its own
           breathing cadence so they don't feel synchronous. */
        .jw-plus {
          position: absolute;
          z-index: 2;
          pointer-events: none;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 1) 0%,
            rgba(210, 230, 255, 0.8) 38%,
            rgba(184, 210, 255, 0) 80%
          );
          box-shadow:
            0 0 10px rgba(220, 235, 255, 0.75),
            0 0 24px rgba(160, 200, 255, 0.45);
          animation: jwSparkle 5.2s ease-in-out infinite;
        }
        .jw-p1 { top: 18%; left: 14%;                     animation-delay: 0s;   }
        .jw-p2 { top: 26%; right: 16%;                    animation-delay: 1.7s; }
        .jw-p3 { bottom: 18%; left: 50%; transform: translateX(-50%); animation-delay: 3.4s; }
        @keyframes jwSparkle {
          0%, 100% { opacity: 0.35; transform: scale(0.8);  }
          50%      { opacity: 1;    transform: scale(1.15); }
        }
        .jw-p3 {
          animation-name: jwSparkleCentred;
        }
        @keyframes jwSparkleCentred {
          0%, 100% { opacity: 0.35; transform: translateX(-50%) scale(0.8);  }
          50%      { opacity: 1;    transform: translateX(-50%) scale(1.15); }
        }

        /* Tilt wrapper owns the 3D transform so the card's enter
           animation (jwCardIn) can run undisturbed on the inner .jw-card. */
        .jw-card-tilt {
          position: relative;
          z-index: 10;
          max-width: 600px;
          width: 100%;
          transform-style: preserve-3d;
          will-change: transform;
          transition: transform 140ms linear;
        }

        .jw-card {
          position: relative;
          background: rgba(255,255,255,0.52);
          backdrop-filter: blur(48px) saturate(180%);
          -webkit-backdrop-filter: blur(48px) saturate(180%);
          border: 1.5px solid rgba(255,255,255,0.9);
          border-radius: 28px;
          padding: 52px 52px 48px;
          box-shadow:
            0 4px 6px rgba(50,100,220,0.06),
            0 12px 40px rgba(50,100,220,0.14),
            0 32px 80px rgba(50,100,220,0.1),
            0 1px 0 rgba(255,255,255,1) inset;
          text-align: center;
          animation: jwCardIn 0.9s cubic-bezier(0.16,1,0.3,1) both;
        }
        /* Subtle aurora sheen on the card — single slow rotation.
           Clipped to a 1.5px border via mask trick so it reads as a
           living edge, not a background wash. */
        .jw-card::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          padding: 1.5px;
          background: conic-gradient(
            from 90deg,
            rgba(79, 134, 247, 0.45),
            rgba(184, 210, 255, 0.0) 25%,
            rgba(160, 210, 255, 0.55) 50%,
            rgba(184, 210, 255, 0.0) 75%,
            rgba(79, 134, 247, 0.45)
          );
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: jwAurora 14s linear infinite;
          pointer-events: none;
          opacity: 0.85;
        }
        @keyframes jwAurora { to { transform: rotate(360deg); } }
        @keyframes jwCardIn {
          from { opacity: 0; transform: translateY(30px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }

        .jw-avatar {
          position: relative;
          width: 72px; height: 72px;
          border-radius: 50%; overflow: visible;
          margin: 0 auto 20px;
          animation: jwUp 0.6s 0.15s cubic-bezier(0.16,1,0.3,1) both;
        }
        .jw-avatar img {
          position: relative; z-index: 2;
          width: 100%; height: 100%;
          object-fit: cover; object-position: center top;
          display: block;
          border-radius: 50%;
          border: 2.5px solid rgba(255,255,255,0.95);
          box-shadow: 0 4px 18px rgba(79,130,247,0.28), 0 0 0 1px rgba(79,130,247,0.12);
        }
        /* Sonar ring pulse — outward halo on a 2.8s loop, drawing the
           eye to the founder's face without ever becoming loud. */
        .jw-avatar::before,
        .jw-avatar::after {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 1.5px solid rgba(79,134,247,0.35);
          pointer-events: none;
          animation: jwAvatarRing 2.8s cubic-bezier(0.25,0.85,0.4,1) infinite;
        }
        .jw-avatar::after { animation-delay: 1.4s; }
        @keyframes jwAvatarRing {
          0%   { transform: scale(1);    opacity: 0.7; }
          80%  { transform: scale(1.42); opacity: 0;   }
          100% { transform: scale(1.42); opacity: 0;   }
        }

        .jw-badge {
          display: inline-flex; align-items: center; gap: 7px;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.7) 0%,
            rgba(230, 242, 255, 0.48) 100%
          );
          backdrop-filter: blur(12px) saturate(150%);
          -webkit-backdrop-filter: blur(12px) saturate(150%);
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 100px;
          padding: 5px 16px 5px 10px;
          margin-bottom: 22px;
          box-shadow:
            0 2px 10px rgba(79, 134, 247, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
          animation: jwUp 0.6s 0.22s cubic-bezier(0.16,1,0.3,1) both;
        }
        .jw-badge-dot {
          width: 7px; height: 7px; background: #4f86f7; border-radius: 50%;
          animation: jwPulse 2.4s ease-in-out infinite;
        }
        .jw-badge span {
          font-size: 11px; font-weight: 600; color: #1a4fd6;
          letter-spacing: 0.08em; text-transform: uppercase;
        }
        @keyframes jwPulse {
          0%, 100% { opacity: 1;    transform: scale(1); }
          50%      { opacity: 0.38; transform: scale(0.72); }
        }

        .jw-h1 {
          font-family: var(--font-sora), 'Sora', sans-serif;
          font-size: clamp(20px, 3vw, 30px);
          font-weight: 700;
          color: #0a1b40;
          line-height: 1.22;
          letter-spacing: -0.03em;
          margin: 0 0 16px;
          animation: jwUp 0.6s 0.28s cubic-bezier(0.16,1,0.3,1) both;
        }
        .jw-copy {
          font-size: 14.5px; color: #3d5a80;
          line-height: 1.72; margin: 0 0 10px;
          animation: jwUp 0.6s 0.34s cubic-bezier(0.16,1,0.3,1) both;
        }
        .jw-ps {
          font-size: 13px; font-style: italic; color: #7a9bc8;
          line-height: 1.6; margin: 0 0 32px;
          animation: jwUp 0.6s 0.38s cubic-bezier(0.16,1,0.3,1) both;
        }

        .jw-pre-cta {
          position: relative;
          display: block; text-align: center;
          font-size: 13px; font-weight: 500;
          color: #1a4fd6;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.55) 0%,
            rgba(230, 242, 255, 0.32) 100%
          );
          backdrop-filter: blur(16px) saturate(150%);
          -webkit-backdrop-filter: blur(16px) saturate(150%);
          border: 1px solid rgba(255, 255, 255, 0.65);
          border-radius: 11px;
          padding: 11px 16px;
          margin-bottom: 14px;
          text-decoration: none;
          box-shadow:
            0 4px 14px rgba(79, 134, 247, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
          transition:
            background 0.3s cubic-bezier(0.16,1,0.3,1),
            color 0.3s cubic-bezier(0.16,1,0.3,1),
            transform 0.3s cubic-bezier(0.16,1,0.3,1),
            box-shadow 0.3s cubic-bezier(0.16,1,0.3,1),
            border-color 0.3s cubic-bezier(0.16,1,0.3,1);
          animation: jwUp 0.6s 0.40s cubic-bezier(0.16,1,0.3,1) both;
        }
        .jw-pre-cta:hover {
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.78) 0%,
            rgba(230, 242, 255, 0.52) 100%
          );
          border-color: rgba(79, 134, 247, 0.4);
          color: #0a1b40;
          transform: translateY(-1px);
          box-shadow:
            0 8px 24px rgba(79, 134, 247, 0.18),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
        }

        /* True glass morph — translucent with its own backdrop-filter so
           it reads as a distinct pane of clear glass floating on top of
           the heavily frosted card. Gradient fill simulates how glass
           catches ambient light (brighter at the top, cooler at the
           bottom); the ::before rim renders the sheen of a 1px bezel
           that picks up light from above-left and a hint of sky-colour
           reflection from below-right. */
        .jw-form-panel {
          position: relative;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.48) 0%,
            rgba(230, 242, 255, 0.28) 100%
          );
          backdrop-filter: blur(20px) saturate(160%) brightness(1.04);
          -webkit-backdrop-filter: blur(20px) saturate(160%) brightness(1.04);
          border-radius: 20px;
          padding: 30px 28px;
          text-align: left;
          animation: jwUp 0.6s 0.42s cubic-bezier(0.16,1,0.3,1) both;
          width: 100%;
          box-sizing: border-box;
          overflow: hidden;
          box-shadow:
            0 10px 36px rgba(50, 100, 220, 0.14),
            0 24px 56px rgba(50, 100, 220, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.78),
            inset 0 -1px 0 rgba(79, 134, 247, 0.12);
        }
        /* Rim light — 1px gradient border that simulates refraction.
           Top-left catches the brightest highlight; bottom-right picks
           up a cool sky-toned reflection. */
        .jw-form-panel::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.95) 0%,
            rgba(255, 255, 255, 0.32) 38%,
            rgba(255, 255, 255, 0.14) 66%,
            rgba(184, 210, 255, 0.6) 100%
          );
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          z-index: 1;
        }
        /* Completion hairline sits above the rim so it reads clearly. */
        .jw-form-progress {
          position: absolute;
          top: 0; left: 0;
          height: 2px;
          width: 0%;
          background: linear-gradient(90deg, #4f86f7, #1a4fd6);
          box-shadow: 0 0 14px rgba(79,134,247,0.55);
          border-radius: 0 2px 2px 0;
          transition: width 500ms cubic-bezier(0.16,1,0.3,1);
          pointer-events: none;
          z-index: 2;
        }
        .jw-field { margin-bottom: 14px; }
        .jw-field label {
          display: block; font-size: 11px; font-weight: 600;
          color: #5a7aaa; letter-spacing: 0.06em;
          text-transform: uppercase; margin-bottom: 5px;
        }
        /* Inputs styled as a third glass tier — clearer than the form
           panel so they read as distinct pill-shaped viewports you can
           write into. A subtle inner top highlight + blue-tinted inner
           shadow at the bottom gives them 3D dimension. */
        .jw-field input {
          width: 100%;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.62) 0%,
            rgba(240, 247, 255, 0.48) 100%
          );
          backdrop-filter: blur(10px) saturate(140%);
          -webkit-backdrop-filter: blur(10px) saturate(140%);
          border: 1px solid rgba(255, 255, 255, 0.7);
          border-radius: 11px;
          padding: 12px 14px;
          font-size: 13.5px;
          color: #0a1b40;
          font-family: var(--font-dm-sans), 'DM Sans', sans-serif;
          outline: none;
          transition:
            border-color 0.25s cubic-bezier(0.16,1,0.3,1),
            box-shadow 0.25s cubic-bezier(0.16,1,0.3,1),
            background 0.25s cubic-bezier(0.16,1,0.3,1);
          box-sizing: border-box;
          box-shadow:
            0 2px 8px rgba(79, 134, 247, 0.06),
            inset 0 1px 0 rgba(255, 255, 255, 0.8),
            inset 0 -1px 0 rgba(79, 134, 247, 0.08);
        }
        .jw-field input::placeholder { color: #95b0d0; }
        .jw-field input:focus {
          border-color: rgba(79, 134, 247, 0.65);
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.9) 0%,
            rgba(245, 250, 255, 0.78) 100%
          );
          box-shadow:
            0 0 0 4px rgba(79, 134, 247, 0.16),
            0 0 36px rgba(79, 134, 247, 0.28),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
        }
        /* Magnet catch area — invisibly extends the hover region beyond
           the button so the cursor pulls the button toward it before
           reaching the actual edge. Same interaction family as the
           editorial site's primary CTA. */
        .jw-btn-magnet {
          display: block;
          margin-top: 8px;
          padding: 10px 14px;
          margin-left: -14px;
          margin-right: -14px;
        }
        .jw-btn {
          width: 100%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          background: linear-gradient(180deg, #142658 0%, #0a1b40 100%);
          color: #fff;
          border: 1px solid rgba(79,134,247,0.3);
          border-radius: 12px;
          padding: 14px 26px;
          font-size: 14px;
          font-weight: 600;
          font-family: var(--font-dm-sans), 'DM Sans', sans-serif;
          cursor: pointer;
          letter-spacing: 0.015em;
          box-shadow:
            0 6px 22px rgba(10,27,64,0.3),
            0 12px 40px rgba(79,134,247,0.18),
            inset 0 1px 0 rgba(255,255,255,0.08);
          transition:
            background 400ms cubic-bezier(0.16,1,0.3,1),
            box-shadow 400ms cubic-bezier(0.16,1,0.3,1),
            transform 650ms cubic-bezier(0.16,1,0.3,1),
            border-color 400ms cubic-bezier(0.16,1,0.3,1);
          will-change: transform;
        }
        .jw-btn:hover {
          background: linear-gradient(180deg, #1a3168 0%, #0f2552 100%);
          border-color: rgba(79,134,247,0.55);
          box-shadow:
            0 10px 32px rgba(10,27,64,0.42),
            0 18px 56px rgba(79,134,247,0.32),
            inset 0 1px 0 rgba(255,255,255,0.14);
        }
        .jw-btn:disabled { opacity: 0.55; cursor: not-allowed; }
        .jw-btn-label { position: relative; }
        .jw-btn-arrow {
          display: inline-flex;
          align-items: center;
          color: rgba(255,255,255,0.92);
        }
        .jw-btn-arrow svg { display: block; overflow: visible; }
        /* Drawn-line shaft: starts as a 6px stub, extends to full length
           on hover. Matches the editorial BookDemoCTA so the interaction
           vocabulary is consistent across both sides of the brand. */
        .jw-btn-shaft {
          stroke-dasharray: 22;
          stroke-dashoffset: 16;
          transition: stroke-dashoffset 550ms cubic-bezier(0.16,1,0.3,1);
        }
        .jw-btn-head {
          transition: transform 500ms cubic-bezier(0.16,1,0.3,1);
        }
        .jw-btn:hover:not(:disabled) .jw-btn-shaft { stroke-dashoffset: 0; }
        .jw-btn:hover:not(:disabled) .jw-btn-head { transform: translateX(5px); }

        .jw-error {
          background: #ffeded;
          border: 1px solid #ff4949;
          border-radius: 10px;
          padding: 10px 14px;
          margin-bottom: 14px;
          font-size: 13px; color: #661d1d;
        }

        .jw-success { text-align: center; padding: 24px 0 8px; }
        .jw-success-icon {
          width: 48px; height: 48px; border-radius: 50%;
          background: #e7faf0; border: 1px solid #13ce66;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 14px;
          font-size: 22px; color: #13ce66;
        }
        .jw-success h3 {
          font-family: var(--font-sora), 'Sora', sans-serif;
          font-size: 18px; font-weight: 700; color: #0a1b40;
          margin: 0 0 8px;
        }
        .jw-success p { font-size: 13.5px; color: #3d5a80; line-height: 1.6; margin: 0; }

        .jw-social {
          position: relative; z-index: 10;
          display: flex; align-items: center; gap: 10px;
          margin-top: 20px;
          animation: jwUp 0.6s 0.55s cubic-bezier(0.16,1,0.3,1) both;
        }
        .jw-social-label {
          font-size: 12px; font-weight: 500;
          color: rgba(50,90,160,0.6);
          letter-spacing: 0.04em; text-transform: uppercase;
          margin-right: 4px;
        }
        .jw-social-link {
          display: flex; align-items: center; justify-content: center;
          width: 38px; height: 38px; border-radius: 50%;
          background: rgba(255,255,255,0.55);
          border: 1px solid rgba(255,255,255,0.82);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 2px 12px rgba(50,100,220,0.1);
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          text-decoration: none;
        }
        .jw-social-link:hover {
          background: rgba(255,255,255,0.8);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(50,100,220,0.16);
        }
        .jw-social-link svg { width: 17px; height: 17px; display: block; }

        @keyframes jwUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @media (max-width: 540px) {
          .jw-card { padding: 36px 22px 32px; }
          .jw-form-panel { padding: 20px; }
          .jw-c1, .jw-c2, .jw-c3 { display: none; }
        }
      `}</style>
    </div>
  );
}
