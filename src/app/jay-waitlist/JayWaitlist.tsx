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
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", ig: "", goal: "" });

  /* Canvas atmosphere — soft drifting blue blobs */
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

    const blobs = [
      { x: 0.10, y: 0.10, vx:  0.0036, vy:  0.0020, r: 0.30, rgb: [100, 170, 255], a: 0.85 },
      { x: 0.80, y: 0.20, vx: -0.0024, vy:  0.0030, r: 0.26, rgb: [160, 210, 255], a: 0.80 },
      { x: 0.50, y: 0.80, vx:  0.0040, vy: -0.0026, r: 0.22, rgb: [200, 230, 255], a: 0.75 },
      { x: 0.18, y: 0.65, vx: -0.0028, vy: -0.0032, r: 0.20, rgb: [ 80, 150, 255], a: 0.70 },
      { x: 0.72, y: 0.50, vx:  0.0022, vy:  0.0036, r: 0.18, rgb: [220, 238, 255], a: 0.72 },
      { x: 0.38, y: 0.26, vx: -0.0036, vy:  0.0024, r: 0.24, rgb: [130, 190, 255], a: 0.78 },
    ];

    let rafId = 0;
    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, "#e8f3ff");
      bg.addColorStop(0.5, "#f4f9ff");
      bg.addColorStop(1, "#daeaff");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      for (const b of blobs) {
        b.x += b.vx;
        b.y += b.vy;
        const rad = b.r * Math.min(W, H);
        if (b.x * W - rad < 0) { b.x = rad / W;        b.vx *= -1; }
        if (b.x * W + rad > W) { b.x = (W - rad) / W;  b.vx *= -1; }
        if (b.y * H - rad < 0) { b.y = rad / H;        b.vy *= -1; }
        if (b.y * H + rad > H) { b.y = (H - rad) / H;  b.vy *= -1; }
        const px = b.x * W;
        const py = b.y * H;
        const grad = ctx.createRadialGradient(px, py, 0, px, py, rad);
        const [r, g, bl] = b.rgb;
        grad.addColorStop(0,   `rgba(${r},${g},${bl},${b.a})`);
        grad.addColorStop(0.4, `rgba(${r},${g},${bl},${b.a * 0.6})`);
        grad.addColorStop(1,   `rgba(${r},${g},${bl},0)`);
        ctx.beginPath();
        ctx.arc(px, py, rad, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }
      rafId = requestAnimationFrame(draw);
    }
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
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
              <button
                type="button"
                className="jw-btn"
                onClick={submit}
                disabled={state === "submitting"}
              >
                {state === "submitting" ? "Submitting..." : "Submit \u2192"}
              </button>
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
        #jw-canvas { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 1; }
        .jw-circle-deco { position: absolute; border-radius: 50%; border: 1px dashed rgba(80,130,220,0.18); pointer-events: none; z-index: 2; }
        .jw-c1 { width: 520px; height: 520px; top: 50%; left: 50%; transform: translate(-50%,-50%); }
        .jw-c2 { width: 760px; height: 760px; top: 50%; left: 50%; transform: translate(-50%,-50%); }
        .jw-c3 { width: 1040px; height: 1040px; top: 50%; left: 50%; transform: translate(-50%,-50%); }
        .jw-plus { position: absolute; z-index: 2; color: rgba(80,130,220,0.22); font-size: 20px; font-weight: 300; pointer-events: none; }
        .jw-plus::before { content: '+'; }
        .jw-p1 { top: 22%; left: 12%; }
        .jw-p2 { top: 22%; right: 12%; }
        .jw-p3 { bottom: 20%; left: 50%; transform: translateX(-50%); }

        .jw-card {
          position: relative; z-index: 10;
          background: rgba(255,255,255,0.52);
          backdrop-filter: blur(48px) saturate(180%);
          -webkit-backdrop-filter: blur(48px) saturate(180%);
          border: 1.5px solid rgba(255,255,255,0.9);
          border-radius: 28px;
          max-width: 600px; width: 100%;
          padding: 52px 52px 48px;
          box-shadow:
            0 4px 6px rgba(50,100,220,0.06),
            0 12px 40px rgba(50,100,220,0.14),
            0 32px 80px rgba(50,100,220,0.1),
            0 1px 0 rgba(255,255,255,1) inset;
          text-align: center;
          animation: jwCardIn 0.9s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes jwCardIn {
          from { opacity: 0; transform: translateY(30px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }

        .jw-avatar {
          width: 72px; height: 72px;
          border-radius: 50%; overflow: hidden;
          margin: 0 auto 20px;
          border: 2.5px solid rgba(255,255,255,0.95);
          box-shadow: 0 4px 18px rgba(79,130,247,0.25), 0 0 0 1px rgba(79,130,247,0.12);
          animation: jwUp 0.6s 0.15s cubic-bezier(0.16,1,0.3,1) both;
        }
        .jw-avatar img { width: 100%; height: 100%; object-fit: cover; object-position: center top; display: block; }

        .jw-badge {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(240,246,255,0.88);
          border: 1px solid rgba(79,134,247,0.22);
          border-radius: 100px;
          padding: 5px 16px 5px 10px;
          margin-bottom: 22px;
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
          display: block; text-align: center;
          font-size: 13px; font-weight: 500;
          color: #1a4fd6;
          background: rgba(240,246,255,0.7);
          border: 1px solid rgba(79,134,247,0.2);
          border-radius: 10px;
          padding: 10px 16px; margin-bottom: 14px;
          text-decoration: none;
          transition: background 0.2s, color 0.2s, transform 0.15s;
          animation: jwUp 0.6s 0.40s cubic-bezier(0.16,1,0.3,1) both;
        }
        .jw-pre-cta:hover { background: rgba(240,246,255,0.95); color: #0a1b40; transform: translateY(-1px); }

        .jw-form-panel {
          background: rgba(248,251,255,0.65);
          border: 1px solid rgba(79,134,247,0.12);
          border-radius: 20px;
          padding: 28px;
          text-align: left;
          animation: jwUp 0.6s 0.42s cubic-bezier(0.16,1,0.3,1) both;
          width: 100%; box-sizing: border-box;
        }
        .jw-field { margin-bottom: 14px; }
        .jw-field label {
          display: block; font-size: 11px; font-weight: 600;
          color: #5a7aaa; letter-spacing: 0.06em;
          text-transform: uppercase; margin-bottom: 5px;
        }
        .jw-field input {
          width: 100%; background: rgba(255,255,255,0.82);
          border: 1px solid rgba(79,134,247,0.18);
          border-radius: 10px;
          padding: 11px 14px; font-size: 13.5px; color: #0a1b40;
          font-family: var(--font-dm-sans), 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          box-sizing: border-box;
        }
        .jw-field input::placeholder { color: #a8c0d8; }
        .jw-field input:focus {
          border-color: rgba(79,134,247,0.45);
          box-shadow: 0 0 0 3px rgba(79,134,247,0.09);
          background: rgba(255,255,255,0.98);
        }
        .jw-btn {
          width: 100%; margin-top: 8px;
          background: #0a1b40; color: #fff;
          border: none; border-radius: 10px;
          padding: 13px 24px; font-size: 14px; font-weight: 600;
          font-family: var(--font-dm-sans), 'DM Sans', sans-serif;
          cursor: pointer; letter-spacing: 0.01em;
          box-shadow: 0 4px 18px rgba(10,27,64,0.25);
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
        }
        .jw-btn:hover { background: #1a3060; transform: translateY(-1px); box-shadow: 0 7px 24px rgba(10,27,64,0.32); }
        .jw-btn:active { transform: translateY(0); }
        .jw-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

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
