"use client";

// Rosebud Solutions — homepage "How we work" flow section. Same animated engine
// as the industry hero components, content kept industry-neutral (Intent data →
// Orchestration → Insight) so it's true for every vertical. Replaces the static
// three-phase list in the homepage Method slot. Adapted to the design system
// (Cormorant / DM Sans, transparent over the page background, system purple,
// shared glow BookDemoCTA for "Get started").

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect,
} from "react";
import BookDemoCTA from "@/components/BookDemoCTA";

type Stage = {
  tab: string;
  inputs: { label: string; detail: string }[];
  output: {
    chip: string;
    q: string;
    a: string;
    metric: { value: string; label: string };
  };
};

const STAGES: Stage[] = [
  {
    tab: "Intent data",
    inputs: [
      { label: "Buying signals", detail: "Who's in-market now" },
      { label: "Compliant sourcing", detail: "Public sources, GDPR, DNC" },
      { label: "Fit scoring", detail: "Hot, Warm, Nurture" },
    ],
    output: {
      chip: "Qualified pipeline",
      q: "What makes a lead worth your team's time?",
      a: "Sourced from compliant, public signals, scored on real intent and fit, and routed to the right person. Hot to a closer, the rest to nurture. No bought lists, no spray.",
      metric: { value: "< 60s", label: "response to every enquiry" },
    },
  },
  {
    tab: "Orchestration",
    inputs: [
      { label: "Every channel", detail: "Call, text, email, social" },
      { label: "Follow-up cadence", detail: "Day 1, day 3, day 8" },
      { label: "Booking", detail: "Into your calendar" },
    ],
    output: {
      chip: "Worked and booked",
      q: "Who works the lead at 9pm on a Sunday?",
      a: "Every lead followed up across calls, texts and email in one consistent voice, nurtured until they're ready, and booked straight into your calendar. Not a one-off voicemail.",
      metric: { value: "24/7", label: "always-on coverage" },
    },
  },
  {
    tab: "Insight",
    inputs: [
      { label: "Pipeline + revenue", detail: "Tracked end to end" },
      { label: "Morning brief", detail: "In your inbox, daily" },
      { label: "Continuous tuning", detail: "Measured, refined" },
    ],
    output: {
      chip: "Decisions, already made",
      q: "Where did the week actually go?",
      a: "Pipeline, conversion and revenue tracked end to end, the morning brief in your inbox before you ask, and the system tuned on what's converting. No Sunday-night reporting.",
      metric: { value: "5 weeks", label: "kickoff to live system" },
    },
  },
];

const ADVANCE_MS = 4200;

function ComplianceStrip() {
  return (
    <div className="rbh-compliance" aria-label="Lead sourcing compliance">
      <span className="rbh-comp-label">Compliant by design</span>
      <span className="rbh-comp-list">
        <span>Public sources only</span>
        <span>GDPR</span>
        <span>CCPA</span>
        <span>DNC</span>
      </span>
    </div>
  );
}

export default function HomepageFlow({
  logoSrc = "/rosebud-icon.png",
  agentName = "Rosebud",
}: {
  logoSrc?: string;
  agentName?: string;
}) {
  const [stage, setStage] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [paused, setPaused] = useState(false);
  const [stacked, setStacked] = useState(false);
  const [dim, setDim] = useState({ w: 1000, h: 360 });
  const [paths, setPaths] = useState<string[]>([]);

  const diagRef = useRef<HTMLDivElement>(null);
  const inRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nodeRef = useRef<HTMLDivElement>(null);
  const outRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReduced(mq.matches);
    set();
    mq.addEventListener?.("change", set);
    return () => mq.removeEventListener?.("change", set);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width:760px)");
    const set = () => setStacked(mq.matches);
    set();
    mq.addEventListener?.("change", set);
    return () => mq.removeEventListener?.("change", set);
  }, []);

  // ---- measure card positions and build the connector paths ----
  const measure = useCallback(() => {
    const diag = diagRef.current;
    const node = nodeRef.current;
    const out = outRef.current;
    if (!diag || !node || !out) return;
    const dr = diag.getBoundingClientRect();
    const ins = inRefs.current.filter(Boolean) as HTMLElement[];

    if (stacked) {
      // Vertical thread down the stack: in → in → in → node → output.
      const seq: HTMLElement[] = [...ins, node, out];
      const v: string[] = [];
      for (let i = 0; i < seq.length - 1; i++) {
        const a = seq[i].getBoundingClientRect();
        const b = seq[i + 1].getBoundingClientRect();
        const ax = a.left + a.width / 2 - dr.left;
        const ay = a.bottom - dr.top;
        const bx = b.left + b.width / 2 - dr.left;
        const by = b.top - dr.top;
        v.push(`M${ax.toFixed(1)},${ay.toFixed(1)} L${bx.toFixed(1)},${by.toFixed(1)}`);
      }
      setPaths(v);
      setDim({ w: dr.width, h: dr.height });
      return;
    }

    const pt = (el: HTMLElement, side: "left" | "right") => {
      const r = el.getBoundingClientRect();
      return {
        x: (side === "right" ? r.right : r.left) - dr.left,
        y: r.top + r.height / 2 - dr.top,
      };
    };
    const nodeL = pt(node, "left");
    const nodeR = pt(node, "right");
    const outL = pt(out, "left");
    const next = ins.map((el) => {
      const s = pt(el, "right");
      const cx = s.x + (nodeL.x - s.x) * 0.5;
      return `M${s.x.toFixed(1)},${s.y.toFixed(1)} C${cx.toFixed(1)},${s.y.toFixed(1)} ${cx.toFixed(1)},${nodeL.y.toFixed(1)} ${nodeL.x.toFixed(1)},${nodeL.y.toFixed(1)}`;
    });
    next.push(
      `M${nodeR.x.toFixed(1)},${nodeR.y.toFixed(1)} L${outL.x.toFixed(1)},${outL.y.toFixed(1)}`
    );
    setPaths(next);
    setDim({ w: dr.width, h: dr.height });
  }, [stacked]);

  useLayoutEffect(() => {
    measure();
  }, [stage, measure]);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (diagRef.current) ro.observe(diagRef.current);
    window.addEventListener("resize", measure);
    if (document.fonts?.ready) document.fonts.ready.then(measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const advance = useCallback(() => setStage((s) => (s + 1) % STAGES.length), []);
  const jump = (i: number) => setStage(i);
  const hold = () => setPaused(true);
  const release = () => setPaused(false);

  const s = STAGES[stage];
  const lastIdx = paths.length - 1;

  return (
    <section className="rbh" aria-label="How we work">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div className="rbh-eyebrow">
        <span className="rbh-over">Rosebud Solutions</span>
        <span className="rbh-loc">
          <i>I</i> How we work
        </span>
      </div>

      <h1 className="rbh-h1">
        Built where your whole pipeline <em>lives.</em>
      </h1>

      <p className="rbh-sub">
        Each phase compounds on the last. Ship, measure, expand.
      </p>

      <div className="rbh-cta-wrap">
        <BookDemoCTA
          href="/pricing"
          label="Get started"
          meta=""
          location="homepage-flow"
        />
      </div>

      <div
        className="rbw-tabs"
        role="tablist"
        aria-label="System stages"
        onMouseEnter={hold}
        onMouseLeave={release}
        onFocus={hold}
        onBlur={release}
      >
        {STAGES.map((st, i) => (
          <button
            key={st.tab}
            role="tab"
            aria-selected={i === stage}
            className={"rbw-tab" + (i === stage ? " is-active" : "")}
            onClick={() => jump(i)}
          >
            <span className="rbw-tab-num">{String(i + 1).padStart(2, "0")}</span>
            <span>{st.tab}</span>
          </button>
        ))}
        <span className="rbw-tab-track" aria-hidden="true" />
        <span
          className="rbw-tab-slot"
          style={{ transform: `translateX(${stage * 100}%)` }}
          aria-hidden="true"
        >
          {reduced ? (
            <span className="rbw-tab-fill is-static" />
          ) : (
            <span
              key={stage}
              className="rbw-tab-fill"
              style={{
                animationDuration: `${ADVANCE_MS}ms`,
                animationPlayState: paused ? "paused" : "running",
              }}
              onAnimationEnd={advance}
            />
          )}
        </span>
      </div>

      <div className="rbw-heads">
        <span className="rbw-head-lbl rbw-head-in">Inputs</span>
        <span className="rbw-head-lbl rbw-head-out">Output</span>
      </div>

      <div className="rbw-diag" ref={diagRef} onMouseEnter={hold} onMouseLeave={release}>
        <svg
          className="rbw-svg"
          viewBox={`0 0 ${dim.w} ${dim.h}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {paths.map((d, i) => (
            <path
              key={"p" + i}
              id={`hfp${i}`}
              className={
                "rbw-lane" +
                (i === lastIdx ? " rbw-lane-out" : "") +
                (reduced ? " no-flow" : "")
              }
              d={d}
            />
          ))}
          {!reduced &&
            paths.map((d, i) => (
              <circle key={"c" + i + "-" + stage} r="3" className="rbw-packet">
                <animateMotion
                  dur="2.4s"
                  begin={`${i * 0.5}s`}
                  repeatCount="indefinite"
                  keyPoints="0;1"
                  keyTimes="0;1"
                  calcMode="linear"
                >
                  <mpath xlinkHref={`#hfp${i}`} />
                </animateMotion>
              </circle>
            ))}
        </svg>

        <div className="rbw-inputs">
          {s.inputs.map((inp, i) => (
            <div
              key={stage + "-" + i}
              ref={(el) => {
                inRefs.current[i] = el;
              }}
              className="rbw-card rbw-in"
              style={{ animationDelay: i * 70 + "ms" }}
            >
              <div className="rbw-in-label">{inp.label}</div>
              <div className="rbw-in-detail">{inp.detail}</div>
            </div>
          ))}
        </div>

        <div className="rbw-node" ref={nodeRef}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="rbw-node-logo" src={logoSrc} alt="" onError={(e) => (e.currentTarget.style.display = "none")} />
          <span>{agentName}</span>
        </div>

        <div className="rbw-output">
          <div key={stage} ref={outRef} className="rbw-card rbw-out">
            <span className="rbw-chip">{s.output.chip}</span>
            <div className="rbw-out-q">{s.output.q}</div>
            <div className="rbw-out-a">{s.output.a}</div>
            <div className="rbw-out-metric">
              <b>{s.output.metric.value}</b> {s.output.metric.label}
            </div>
          </div>
        </div>
      </div>

      <ComplianceStrip />
    </section>
  );
}

const css = `
.rbh{
  --card:rgba(184,174,219,.045); --card-bd:rgba(184,174,219,.16);
  --line:rgba(184,174,219,.26); --accent:var(--rb-purple); --accent-soft:#cfc6ec;
  --text:var(--rb-bone); --muted:var(--rb-bone-dim); --chip:rgba(184,174,219,.13);
  --serif:var(--font-cormorant),Georgia,serif; --sans:var(--font-dm-sans),-apple-system,BlinkMacSystemFont,sans-serif;
  position:relative; padding:clamp(5rem,8vw,7rem) clamp(1.5rem,5vw,3rem); color:var(--text); font-family:var(--sans);
  background:transparent; overflow:hidden; text-align:center;
}

.rbh-eyebrow{display:flex; flex-direction:column; align-items:center; gap:10px; margin-bottom:26px;}
.rbh-over{font-size:12px; letter-spacing:.28em; text-transform:uppercase; color:var(--muted);}
.rbh-loc{font-size:12px; letter-spacing:.2em; text-transform:uppercase; color:var(--muted);}
.rbh-loc i{font-family:var(--serif); font-style:italic; color:var(--accent); letter-spacing:0; margin-right:6px; text-transform:none;}

.rbh-h1{font-family:var(--serif); font-weight:500; font-size:clamp(34px,6vw,72px); line-height:1.05; letter-spacing:-.02em; margin:0 auto 28px; max-width:18ch;}
.rbh-h1 em{font-style:italic; color:var(--accent-soft); text-decoration:underline; text-decoration-color:var(--accent); text-decoration-thickness:2px; text-underline-offset:.1em;}

.rbh-sub{max-width:680px; margin:0 auto 32px; font-size:clamp(16px,2vw,19px); line-height:1.6; color:var(--rb-bone-dim);}

.rbh-cta-wrap{margin:0 auto clamp(28px,4vw,44px);}
/* Size the shared glow CTA to the design spec (~16-18px) rather than its
   default 28-44px hero scale, and shrink the glow pedestal to match. */
.rbh .rb-book-stage{padding:clamp(0.5rem,1.5vw,1rem) 0; margin-top:0;}
.rbh .rb-book-cta{font-size:clamp(15px,1.4vw,18px); padding:0.3rem 0.5rem 0.5rem; gap:0.5rem;}
.rbh .rb-book-cta-arrow{transform:translateY(-0.12em);}
.rbh .rb-book-cta-arrow svg{width:30px; height:11px;}
.rbh .rb-book-glow{height:clamp(6rem,12vw,8.5rem);}
.rbh .rb-book-glow-halo{height:clamp(4rem,8vw,6rem);}

/* ---- tab line (no container; one line that slides + fills over the dwell) ---- */
.rbw-tabs{position:relative; display:flex; max-width:1000px; margin:0 auto 32px;}
.rbw-tab{flex:1 1 0; min-width:0; display:flex; align-items:center; justify-content:center; gap:10px; padding:12px 16px 16px; border:0; background:transparent; color:var(--muted); font-family:var(--sans); font-size:14px; font-weight:500; letter-spacing:.01em; cursor:pointer; transition:color .35s;}
.rbw-tab:hover{color:var(--text);}
.rbw-tab.is-active{color:var(--text);}
.rbw-tab-num{font-family:var(--serif); font-style:italic; font-size:14px; color:var(--accent); opacity:.9;}
.rbw-tab-track{position:absolute; left:0; right:0; bottom:0; height:1px; background:var(--card-bd);}
.rbw-tab-slot{position:absolute; left:0; bottom:0; width:calc(100% / 3); height:2px; overflow:hidden; transition:transform .55s cubic-bezier(.4,0,.2,1); z-index:2;}
.rbw-tab-fill{display:block; width:100%; height:100%; transform-origin:left; transform:scaleX(0); background:linear-gradient(90deg,var(--accent),var(--accent-soft)); animation-name:rbw-fill; animation-timing-function:linear; animation-fill-mode:forwards;}
.rbw-tab-fill.is-static{transform:scaleX(1); animation:none;}
@keyframes rbw-fill{from{transform:scaleX(0)}to{transform:scaleX(1)}}
.rbw-tab:focus-visible{outline:2px solid var(--accent); outline-offset:-2px;}

/* ---- column eyebrows ---- */
.rbw-heads{position:relative; max-width:1000px; margin:0 auto 16px; height:13px;}
.rbw-head-lbl{position:absolute; top:0; font-size:11px; letter-spacing:.2em; text-transform:uppercase; color:var(--muted);}
.rbw-head-in{left:3%;}
.rbw-head-out{left:64%;}

/* ---- diagram ---- */
.rbw-diag{position:relative; width:100%; max-width:1000px; height:360px; margin:0 auto; text-align:left;}
.rbw-svg{position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:1;}
.rbw-lane{fill:none; stroke:var(--line); stroke-width:1.3; stroke-dasharray:2 7; stroke-linecap:round; animation:rbw-march 1.1s linear infinite;}
.rbw-lane-out{stroke:rgba(184,174,219,.46);}
.rbw-lane.no-flow{animation:none;}
@keyframes rbw-march{to{stroke-dashoffset:-18}}
.rbw-packet{fill:var(--accent); filter:drop-shadow(0 0 5px rgba(184,174,219,.85));}

.rbw-inputs{position:absolute; left:3%; top:0; width:30%; height:100%; display:flex; flex-direction:column; justify-content:space-between;}
.rbw-in{padding:14px 17px; opacity:0; animation:rbw-fade .5s ease both;}
.rbw-in-label{font-size:14px; font-weight:600; color:var(--text); margin-bottom:3px;}
.rbw-in-detail{font-size:12.5px; color:var(--muted); line-height:1.4;}

.rbw-output{position:absolute; left:64%; top:50%; width:33%; transform:translateY(-50%);}
.rbw-out{opacity:0; padding:20px 22px; animation:rbw-fade .5s ease both;}

.rbw-node{position:absolute; left:42.5%; top:50%; transform:translateY(-50%); width:15%; height:60px; z-index:3; display:flex; align-items:center; justify-content:center; gap:9px; border-radius:8px; font-family:var(--serif); font-style:italic; font-size:clamp(15px,1.7vw,20px); color:var(--text); background:linear-gradient(160deg,#1b1430,#110b1e); border:1px solid rgba(184,174,219,.32); box-shadow:0 14px 44px -14px var(--rb-purple-glow);}
.rbw-node-logo{width:22px; height:22px; object-fit:contain; flex:none;}

.rbw-card{position:relative; z-index:2; background:var(--card); border:1px solid var(--card-bd); border-radius:8px; backdrop-filter:blur(5px);}
.rbw-chip{display:inline-block; font-size:11px; letter-spacing:.05em; text-transform:uppercase; padding:5px 11px; border-radius:4px; background:var(--chip); color:var(--accent); margin-bottom:14px;}
.rbw-out-q{font-family:var(--serif); font-size:clamp(16px,1.9vw,21px); line-height:1.25; color:var(--text); margin-bottom:10px;}
.rbw-out-a{font-size:13.5px; line-height:1.55; color:var(--muted);}
.rbw-out-metric{margin-top:14px; padding-top:13px; border-top:1px solid var(--card-bd); font-size:12.5px; color:var(--muted);}
.rbw-out-metric b{font-family:var(--serif); font-style:italic; font-weight:500; color:var(--accent); font-size:16px; margin-right:8px;}
@keyframes rbw-fade{from{opacity:0}to{opacity:1}}

/* ---- compliance strip (hairline-divided caps, footer) ---- */
.rbh-compliance{display:flex; flex-wrap:wrap; align-items:center; justify-content:center; gap:10px 0; max-width:1000px; margin:50px auto 0; padding-top:30px; border-top:1px solid var(--card-bd);}
.rbh-comp-label{font-size:11px; letter-spacing:.2em; text-transform:uppercase; color:var(--accent); padding-right:16px; border-right:1px solid var(--card-bd);}
.rbh-comp-list{display:flex; flex-wrap:wrap;}
.rbh-comp-list span{font-size:11px; letter-spacing:.14em; text-transform:uppercase; color:var(--muted); padding:0 14px; border-right:1px solid var(--card-bd);}
.rbh-comp-list span:last-child{border-right:0;}

@media (max-width:760px){
  .rbw-tabs{max-width:none;}
  .rbw-tab{padding:11px 6px 14px; font-size:12.5px; gap:7px;}
  .rbw-tab-num{font-size:13px;}
  .rbw-heads{display:none;}
  /* Stacked column with the connector SVG threading down the gaps. */
  .rbw-diag{height:auto; display:flex; flex-direction:column; gap:26px; max-width:412px; margin:0 auto; text-align:left;}
  .rbw-svg{display:block;}
  .rbw-inputs{position:static; width:100%; height:auto; display:flex; flex-direction:column; gap:26px;}
  .rbw-output{position:static; width:100%; transform:none; order:3;}
  .rbw-node{position:static; align-self:center; transform:none; width:auto; height:auto; margin:0; padding:14px 26px; font-size:18px;}
  .rbh-comp-label{border-right:0; padding-right:0;}
  .rbh-comp-list{gap:6px 0;}
  .rbh-comp-list span{border-right:0; padding:0 10px;}
}
@media (prefers-reduced-motion:reduce){
  .rbw-lane,.rbw-in,.rbw-out{animation:none !important; opacity:1 !important;}
  .rbw-tab-slot{transition:none;}
  .rbw-tab-fill{animation:none !important; transform:scaleX(1) !important;}
}
`;
