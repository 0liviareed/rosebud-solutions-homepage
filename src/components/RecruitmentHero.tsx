"use client";

// Rosebud Solutions — Recruitment hero (animated workflow).
// Replaces the static rb-page-hero on /industries/recruitment.
// Adapted to the design system: existing fonts (--font-cormorant /
// --font-dm-sans), the site's page background (transparent here), the
// system purple (--rb-purple), and the shared glow CTA (BookDemoCTA) for
// the primary "Get started" action.

import { useState, useEffect, useRef, useCallback } from "react";
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
    tab: "Sourcing",
    inputs: [
      { label: "Role brief + ICP", detail: "Senior RevOps · London · hybrid" },
      { label: "Sourcing channels", detail: "LinkedIn, boards, referrals" },
      { label: "Intent signals", detail: "Open-to-work, recently active, prior applicants" },
    ],
    output: {
      chip: "Candidates sourced",
      q: "Where are the people actually in-market for this role?",
      a: "Matched against your ICP and ranked by intent: open-to-work, recently active on boards, already in your pipeline. Your team works who's likely to move, not a cold list.",
      metric: { value: "< 60s", label: "response to every candidate enquiry" },
    },
  },
  {
    tab: "Screening",
    inputs: [
      { label: "Sourced candidates", detail: "From the sourcing pass" },
      { label: "Screening rubric", detail: "Your criteria, your must-haves" },
      { label: "Candidate replies", detail: "Outreach + inbound responses" },
    ],
    output: {
      chip: "Ranked shortlist",
      q: "Who's worth your team's time this week?",
      a: "Every profile read against your criteria, shortlisted, ranked by fit, and routed to your desk.",
      metric: { value: "24/7", label: "screening across every channel" },
    },
  },
  {
    tab: "Booked",
    inputs: [
      { label: "Shortlist", detail: "Ranked candidates" },
      { label: "Calendars", detail: "Client + candidate availability" },
      { label: "Interview templates", detail: "Confirmations, prep, reminders" },
    ],
    output: {
      chip: "Interviews booked",
      q: "What's on the desk by Friday?",
      a: "Interviews booked, client briefed, and every candidate chased. Nothing slipping.",
      metric: { value: "2–3 hrs / day", label: "admin back to each consultant" },
    },
  },
];

const ADVANCE_MS = 4200;

export default function RecruitmentHero({
  logoSrc = "/rosebud-icon.png",
  agentName = "Rosebud",
}: {
  logoSrc?: string;
  agentName?: string;
}) {
  const [stage, setStage] = useState(0);
  const [reduced, setReduced] = useState(false);
  const pausedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReduced(mq.matches);
    set();
    mq.addEventListener?.("change", set);
    return () => mq.removeEventListener?.("change", set);
  }, []);

  const tick = useCallback(() => {
    if (!pausedRef.current) setStage((s) => (s + 1) % STAGES.length);
  }, []);

  useEffect(() => {
    if (reduced) return;
    timerRef.current = setInterval(tick, ADVANCE_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [reduced, tick]);

  const jump = (i: number) => {
    setStage(i);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      if (!reduced) timerRef.current = setInterval(tick, ADVANCE_MS);
    }
  };

  const s = STAGES[stage];
  const pause = () => {
    pausedRef.current = true;
  };
  const resume = () => {
    pausedRef.current = false;
  };

  return (
    <section className="rbh">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div className="rbh-eyebrow">
        <span className="rbh-over">Rosebud Solutions</span>
        <span className="rbh-loc">
          <i>I</i> By Industry · Recruitment
        </span>
      </div>

      <h1 className="rbh-h1">
        Your recruitment, <em>rebuilt.</em>
      </h1>

      <p className="rbh-sub">
        <span className="rbh-sub-lead">From brief to interview, handled.</span>
        We source against your ICP, screen every applicant, and book the
        interviews straight into your calendar. Your team runs the close.
      </p>

      <div className="rbh-cta-wrap">
        <BookDemoCTA
          href="https://www.cal.eu/rosebudsolutions/30min?overlayCalendar=true"
          label="Get started"
          meta=""
          location="recruitment-hero"
        />
      </div>

      <div
        className="rbw-tabs"
        role="tablist"
        aria-label="Recruitment workflow stages"
        onMouseEnter={pause}
        onMouseLeave={resume}
      >
        {STAGES.map((st, i) => (
          <button
            key={st.tab}
            role="tab"
            aria-selected={i === stage}
            className={"rbw-tab" + (i === stage ? " is-active" : "")}
            onClick={() => jump(i)}
            onFocus={pause}
            onBlur={resume}
          >
            <span className="rbw-tab-num">{String(i + 1).padStart(2, "0")}</span>
            <span>{st.tab}</span>
            {i === stage && !reduced && (
              <span
                key={stage}
                className="rbw-tab-bar"
                style={{ animationDuration: ADVANCE_MS + "ms" }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="rbw-diag" onMouseEnter={pause} onMouseLeave={resume}>
        <svg
          className="rbw-svg"
          viewBox="0 0 1000 420"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path id="rbw-p1" className={"rbw-lane" + (reduced ? " no-flow" : "")} d="M330,80 C380,80 385,195 425,195" />
          <path id="rbw-p2" className={"rbw-lane" + (reduced ? " no-flow" : "")} d="M330,210 L425,210" />
          <path id="rbw-p3" className={"rbw-lane" + (reduced ? " no-flow" : "")} d="M330,340 C380,340 385,225 425,225" />
          <path id="rbw-p4" className={"rbw-lane rbw-lane-out" + (reduced ? " no-flow" : "")} d="M575,210 L640,210" />
          {!reduced &&
            ["#rbw-p1", "#rbw-p2", "#rbw-p3", "#rbw-p4"].map((href, i) => (
              <circle key={href} r="3" className="rbw-packet">
                <animateMotion dur="2.4s" begin={`${i * 0.5}s`} repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                  <mpath href={href} />
                </animateMotion>
              </circle>
            ))}
        </svg>

        <div className="rbw-col rbw-inputs">
          <span className="rbw-edge">Inputs</span>
          {s.inputs.map((inp, i) => (
            <div key={stage + "-" + i} className="rbw-card rbw-in" style={{ animationDelay: i * 70 + "ms" }}>
              <div className="rbw-in-label">{inp.label}</div>
              <div className="rbw-in-detail">{inp.detail}</div>
            </div>
          ))}
        </div>

        <div className="rbw-node">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="rbw-node-logo" src={logoSrc} alt="" onError={(e) => (e.currentTarget.style.display = "none")} />
          <span>{agentName}</span>
        </div>

        <div className="rbw-col rbw-output">
          <span className="rbw-edge">Output</span>
          <div key={stage} className="rbw-card rbw-out">
            <span className="rbw-chip">{s.output.chip}</span>
            <div className="rbw-out-q">{s.output.q}</div>
            <div className="rbw-out-a">{s.output.a}</div>
            <div className="rbw-out-metric">
              <b>{s.output.metric.value}</b> {s.output.metric.label}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const css = `
.rbh{
  --card:rgba(184,174,219,.05); --card-bd:rgba(184,174,219,.16);
  --line:rgba(184,174,219,.26); --accent:var(--rb-purple); --accent-soft:#cfc6ec;
  --text:var(--rb-bone); --muted:var(--rb-bone-dim); --chip:rgba(184,174,219,.13);
  --serif:var(--font-cormorant),Georgia,serif; --sans:var(--font-dm-sans),-apple-system,BlinkMacSystemFont,sans-serif;
  position:relative; padding:clamp(5rem,9vw,7.5rem) clamp(1.5rem,5vw,3rem) clamp(5.5rem,9vw,8rem); color:var(--text); font-family:var(--sans);
  background:transparent; overflow:hidden; text-align:center;
}

.rbh-eyebrow{display:flex; flex-direction:column; align-items:center; gap:8px; margin-bottom:16px;}
.rbh-over{font-size:12px; letter-spacing:.28em; text-transform:uppercase; color:var(--muted);}
.rbh-loc{font-size:12px; letter-spacing:.2em; text-transform:uppercase; color:var(--muted);}
.rbh-loc i{font-family:var(--serif); font-style:italic; color:var(--accent); letter-spacing:0; margin-right:6px; text-transform:none;}

.rbh-h1{font-family:var(--serif); font-weight:500; font-size:clamp(44px,7vw,86px); line-height:1.03; letter-spacing:-.02em; margin:0 auto 20px; max-width:14ch;}
.rbh-h1 em{font-style:italic; color:var(--accent-soft); text-decoration:underline; text-decoration-color:var(--accent); text-decoration-thickness:2px; text-underline-offset:.1em;}

.rbh-sub{max-width:640px; margin:0 auto 22px; font-size:clamp(15px,1.7vw,18px); line-height:1.55; color:var(--rb-bone-dim);}
.rbh-sub-lead{display:block; margin-bottom:8px;}

.rbh-cta-wrap{margin:0 auto clamp(16px,2.5vw,26px);}
/* Tighten the shared glow CTA stage inside the hero — its default
   margin-top + tall padding open a big void above "Get started". The
   radial glow is absolutely positioned, so trimming the box doesn't clip it. */
.rbh .rb-book-stage{padding:clamp(0.5rem,1.5vw,1rem) 0; margin-top:0;}

/* ---- animation ---- */
.rbw-tabs{display:flex; gap:10px; justify-content:center; flex-wrap:wrap; max-width:780px; margin:0 auto 30px;}
.rbw-tab{position:relative; display:flex; align-items:center; gap:11px; padding:11px 20px 12px; border:1px solid var(--card-bd); border-radius:6px; background:transparent; color:var(--muted); font-family:var(--sans); font-size:14px; font-weight:500; cursor:pointer; transition:color .35s, border-color .35s, background .35s; overflow:hidden;}
.rbw-tab:hover{color:var(--text);}
.rbw-tab.is-active{color:var(--text); border-color:rgba(184,174,219,.36); background:rgba(184,174,219,.05);}
.rbw-tab-num{font-family:var(--serif); font-style:italic; font-size:14px; color:var(--accent); opacity:.9;}
.rbw-tab-bar{position:absolute; left:0; bottom:0; height:1.5px; width:100%; transform-origin:left; background:linear-gradient(90deg,var(--accent),var(--accent-soft)); animation:rbw-fill linear forwards;}
@keyframes rbw-fill{from{transform:scaleX(0)}to{transform:scaleX(1)}}
.rbw-tab:focus-visible{outline:2px solid var(--accent); outline-offset:2px;}

.rbw-diag{position:relative; width:100%; max-width:1080px; margin:0 auto; aspect-ratio:1000/400; text-align:left;}
.rbw-svg{position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:1;}
.rbw-lane{fill:none; stroke:var(--line); stroke-width:1.3; stroke-dasharray:2 7; stroke-linecap:round; animation:rbw-march 1.1s linear infinite;}
.rbw-lane-out{stroke:rgba(184,174,219,.46);}
.rbw-lane.no-flow{animation:none;}
@keyframes rbw-march{to{stroke-dashoffset:-18}}
.rbw-packet{fill:var(--accent); filter:drop-shadow(0 0 5px rgba(184,174,219,.85));}

.rbw-col{position:absolute; top:0;}
.rbw-inputs{left:3%; width:30%; height:100%; display:flex; flex-direction:column; justify-content:space-between; padding:1.5% 0;}
.rbw-output{left:64%; width:33%; top:27%;}
.rbw-edge{position:absolute; top:-28px; left:1px; font-size:11px; letter-spacing:.18em; text-transform:uppercase; color:var(--muted);}

.rbw-card{position:relative; z-index:2; background:var(--card); border:1px solid var(--card-bd); border-radius:8px; backdrop-filter:blur(5px);}
.rbw-in{padding:14px 17px; animation:rbw-rise .5s both;}
.rbw-in-label{font-size:14px; font-weight:600; color:var(--text); margin-bottom:3px;}
.rbw-in-detail{font-size:12.5px; color:var(--muted); line-height:1.4;}

.rbw-node{position:absolute; left:42.5%; top:41.7%; width:15%; height:16.7%; z-index:3; display:flex; align-items:center; justify-content:center; gap:9px; border-radius:8px; font-family:var(--serif); font-style:italic; font-size:clamp(15px,1.7vw,20px); color:var(--text); background:linear-gradient(160deg,#1b1430,#110b1e); border:1px solid rgba(184,174,219,.32); box-shadow:0 14px 44px -14px var(--rb-purple-glow);}
.rbw-node-logo{width:22px; height:22px; object-fit:contain; flex:none;}

.rbw-out{padding:20px 22px; animation:rbw-rise .5s both;}
.rbw-chip{display:inline-block; font-size:11px; letter-spacing:.05em; text-transform:uppercase; padding:5px 11px; border-radius:4px; background:var(--chip); color:var(--accent); margin-bottom:14px;}
.rbw-out-q{font-family:var(--serif); font-size:clamp(16px,1.9vw,22px); line-height:1.25; color:var(--text); margin-bottom:10px;}
.rbw-out-a{font-size:13.5px; line-height:1.55; color:var(--muted);}
.rbw-out-metric{margin-top:15px; padding-top:14px; border-top:1px solid var(--card-bd); font-size:12.5px; color:var(--muted); letter-spacing:.01em;}
.rbw-out-metric b{font-family:var(--serif); font-style:italic; font-weight:500; color:var(--accent); font-size:16px; margin-right:8px;}
@keyframes rbw-rise{from{opacity:0; transform:translateY(8px)}to{opacity:1; transform:none}}

@media (max-width:760px){
  .rbw-diag{aspect-ratio:auto; display:flex; flex-direction:column; gap:14px; max-width:430px; text-align:left;}
  .rbw-svg{display:none;}
  .rbw-col,.rbw-node{position:static; width:100%; height:auto;}
  .rbw-inputs{padding:0; gap:10px;}
  .rbw-edge{position:static; display:block; margin-bottom:8px;}
  .rbw-node{margin:6px auto; padding:14px 24px; width:auto;}
  .rbw-node::before{content:"↓"; position:absolute; top:-22px; color:var(--accent); font-size:13px;}
  .rbw-output{order:3;}
}
@media (prefers-reduced-motion:reduce){
  .rbw-lane,.rbw-tab-bar,.rbw-in,.rbw-out{animation:none !important;}
}
`;
