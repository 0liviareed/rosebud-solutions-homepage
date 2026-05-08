"use client";

import { useEffect, useRef } from "react";
import BookCTA from "./BookCTA";

const N = 6;
const CARD_GAP = 20;
const LEFT_PAD_VW = 0.04;

// ── Visual panels ────────────────────────────────────────────────
function LeadVisual() {
  return (
    <div className="rb-dt-vis">
      <div className="rb-dt-vis-scores">
        {[{t:"Hot",c:"hot",v:"84",w:"88%"},{t:"Warm",c:"warm",v:"67",w:"62%"},{t:"Nurture",c:"nur",v:"42",w:"35%"}].map(s=>(
          <div key={s.t} className="rb-dt-vis-srow">
            <div className="rb-dt-vis-smeta"><span className={`rb-dt-vis-tier ${s.c}`}>{s.t}</span><span className="rb-dt-vis-sval">{s.v}</span></div>
            <div className="rb-dt-vis-btrack"><div className={`rb-dt-vis-bfill ${s.c}`} style={{width:s.w}}/></div>
          </div>
        ))}
      </div>
      <p className="rb-dt-vis-foot">1,000 leads scored this batch</p>
    </div>
  );
}
function PipelineVisual() {
  return (
    <div className="rb-dt-vis">
      {[{l:"Lead",w:"92%",n:"45"},{l:"Qualified",w:"70%",n:"32"},{l:"Proposal",w:"39%",n:"18"},{l:"Negotiation",w:"15%",n:"7"},{l:"Closed",w:"7%",n:"3",amber:true}].map(s=>(
        <div key={s.l} className="rb-dt-vis-prow">
          <span className="rb-dt-vis-pstage">{s.l}</span>
          <div className="rb-dt-vis-ptrack"><div className={`rb-dt-vis-pfill${s.amber?" amber":""}`} style={{width:s.w}}/></div>
          <span className="rb-dt-vis-pcount">{s.n}</span>
        </div>
      ))}
    </div>
  );
}
function ChannelsVisual() {
  return (
    <div className="rb-dt-vis">
      {[{icon:<EIcon/>,label:"Email outreach",pill:"30 / day"},{icon:<MIcon/>,label:"SMS follow-up",pill:"Auto"},{icon:<PIcon/>,label:"Voice agent — day 8",pill:"Live",live:true}].map(r=>(
        <div key={r.label} className="rb-dt-vis-ch">
          <div className="rb-dt-vis-chico">{r.icon}</div>
          <span className="rb-dt-vis-chlabel">{r.label}</span>
          <span className={`rb-dt-vis-chpill${r.live?" live":""}`}>{r.pill}</span>
        </div>
      ))}
    </div>
  );
}
function TimelineVisual() {
  const items=[{day:"Day 1",act:"Enquiry received → email sent",done:true},{day:"Day 3",act:"Chase SMS delivered",done:true},{day:"Day 8",act:"Voice agent called",done:true},{day:"Day 14",act:"Reactivation touch — pending",done:false}];
  return (
    <div className="rb-dt-vis">
      {items.map((item,i)=>(
        <div key={i} className={`rb-dt-vis-titem${i<items.length-1?" line":""}`}>
          <div className={`rb-dt-vis-tdot${item.done?" done":""}`}>
            {item.done?<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>:<svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/></svg>}
          </div>
          <div><div className="rb-dt-vis-tday">{item.day}</div><div className={`rb-dt-vis-tact${item.done?"":" dim"}`}>{item.act}</div></div>
        </div>
      ))}
    </div>
  );
}
function DashboardVisual() {
  return (
    <div className="rb-dt-vis">
      <div className="rb-dt-vis-kpis">
        <div className="rb-dt-vis-kpi"><div className="rb-dt-vis-kpilbl">Pipeline</div><div className="rb-dt-vis-kpival">£48.2k</div><div className="rb-dt-vis-kpidelta">↑ 34% this week</div></div>
        <div className="rb-dt-vis-kpi"><div className="rb-dt-vis-kpilbl">Converted</div><div className="rb-dt-vis-kpival">12</div><div className="rb-dt-vis-kpidelta">↑ 3 vs last week</div></div>
      </div>
      <div className="rb-dt-vis-chart">
        <svg viewBox="0 0 280 52" preserveAspectRatio="none" style={{width:"100%",height:"100%"}}>
          <defs><linearGradient id="dtcg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#B8AEDB" stopOpacity="0.25"/><stop offset="100%" stopColor="#B8AEDB" stopOpacity="0"/></linearGradient></defs>
          <path d="M0 42 C40 38,60 30,90 28 C120 26,140 34,170 22 C200 10,220 18,250 12 C265 9,272 10,280 8" fill="none" stroke="#B8AEDB" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M0 42 C40 38,60 30,90 28 C120 26,140 34,170 22 C200 10,220 18,250 12 C265 9,272 10,280 8 L280 52 L0 52Z" fill="url(#dtcg)"/>
        </svg>
      </div>
    </div>
  );
}
function ReceptionistVisual() {
  return (
    <div className="rb-dt-vis">
      <div className="rb-dt-vis-inbound">
        {["Call","Email","Web","DM"].map(ch=>(
          <div key={ch} className="rb-dt-vis-irow">
            <div className="rb-dt-vis-idot"/><span className="rb-dt-vis-ilabel">{ch}</span><div className="rb-dt-vis-iline"/>
          </div>
        ))}
      </div>
      <div className="rb-dt-vis-ical">
        <div><div className="rb-dt-vis-ical-lbl">Booked</div><div className="rb-dt-vis-ical-time">Tuesday, 3:00 pm</div></div>
        <div className="rb-dt-vis-ical-badge">✓ Confirmed</div>
      </div>
    </div>
  );
}
function EIcon(){return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>}
function MIcon(){return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>}
function PIcon(){return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>}

// ── Role data ─────────────────────────────────────────────────────
const ROLES: {num:string;label:string;heading:React.ReactNode;copy:string;visual:React.ReactNode}[] = [
  { num:"I",   label:"Lead Engine",                     heading:<>You send us the JD. We&apos;ll send you back pre-qualified candidates booked straight into your <em>calendar.</em></>, copy:"Scrapes qualified leads using your target criteria at the volume your pipeline can handle. Cleans, validates, and scores each one on a 0–100 scale.", visual:<LeadVisual/> },
  { num:"II",  label:"Know Every Relationship",         heading:<>Every contact, deal, and resource in one source of <em>truth.</em></>, copy:"Designed to bring every contact, deal, and resource into one source of truth. No more scattered spreadsheets. No more missed follow-ups.", visual:<PipelineVisual/> },
  { num:"III", label:"Omnichannel Voice",               heading:<>One consistent voice across every channel. Without you <em>managing it.</em></>, copy:"Personalised email outreach at scale, SMS follow-up, and a voice agent that calls unresponsive leads on day 8. Your brand, without you.", visual:<ChannelsVisual/> },
  { num:"IV",  label:"Client Engagement & Follow-Up",   heading:<>Every follow-up sent. Every deal tracked. None of it done by <em>you.</em></>, copy:"Three-stage follow-up sequences on every enquiry. Reminders, chase-ups, reactivation touches — all sent on schedule, all tracked.", visual:<TimelineVisual/> },
  { num:"V",   label:"Operations Dashboard",            heading:<>No more Sunday night reporting. It&apos;s already <em>done.</em></>, copy:"Get instant insights into your business performance. Pipeline, conversions, salesperson activity — delivered daily without you pulling it.", visual:<DashboardVisual/> },
  { num:"VI",  label:"Receptionist & Appointment Setter", heading:<>Stop being the first person every enquiry has to <em>reach.</em></>, copy:"Takes first contact from every channel — calls, emails, web forms, DMs. Qualifies, books directly into your calendar, and routes high-value leads to you.", visual:<ReceptionistVisual/> },
];

// ── Component ─────────────────────────────────────────────────────
export default function DigitalTeam() {
  const outerRef   = useRef<HTMLElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const cardRefs   = useRef<(HTMLElement|null)[]>([]);
  const dotsRef    = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const dotRefs    = useRef<(HTMLSpanElement|null)[]>([]);

  useEffect(() => {
    const outer = outerRef.current;
    const head  = headRef.current;
    if (!outer || !head) return;

    const outerEl = outer;
    const headEl  = head;
    const cards   = cardRefs.current.filter(Boolean) as HTMLElement[];
    const dots    = dotsRef.current;

    // Declare before syncLayout() so they're in scope when it runs
    let cachedCardW = 0;
    let cachedTotal = 0;
    let cachedLeftPad = 0;
    let lastVis = "";
    let lastIdx = -1;

    function syncLayout() {
      outerEl.style.height = `${N * window.innerHeight}px`;
      const headH = headEl.offsetHeight;
      const cardH = window.innerHeight - headH - 64;
      const cardTop = headH + 16;
      document.documentElement.style.setProperty("--dt-card-top", `${cardTop}px`);
      document.documentElement.style.setProperty("--dt-card-h", `${cardH}px`);
      if (dots) dots.style.top = `${cardTop + cardH + 12}px`;
      cachedTotal   = outerEl.offsetHeight - window.innerHeight;
      cachedCardW   = (cards[0]?.offsetWidth ?? 0) + CARD_GAP;
      cachedLeftPad = window.innerWidth * LEFT_PAD_VW;
      cards.forEach(c => {
        c.style.backdropFilter = "blur(24px) saturate(1.8)";
        (c.style as CSSStyleDeclaration & { webkitBackdropFilter: string }).webkitBackdropFilter = "blur(24px) saturate(1.8)";
      });
    }
    syncLayout();

    function updateUI(p: number) {
      const idx = Math.min(N-1, Math.round(p*(N-1)));
      if (idx === lastIdx) return;
      lastIdx = idx;
      if (counterRef.current)
        counterRef.current.textContent = `${String(idx+1).padStart(2,"0")} / ${String(N).padStart(2,"0")}`;
      dotRefs.current.forEach((d,i) => d?.classList.toggle("rb-dt-dot-active", i===idx));
    }

    function onScroll() {
      const rect = outerEl.getBoundingClientRect();
      const inSection = rect.top <= 0 && rect.bottom >= window.innerHeight;

      // Only update visibility when it actually changes
      const vis = inSection ? "visible" : "hidden";
      if (vis !== lastVis) {
        lastVis = vis;
        cards.forEach(c => { c.style.visibility = vis; });
        if (dots) dots.style.visibility = vis;
      }
      if (!inSection || cachedTotal <= 0) return;

      const p = Math.max(0, Math.min(1, -rect.top / cachedTotal));
      const cp = p * (N-1);
      cards.forEach((card, i) => {
        card.style.transform = `translate3d(${cachedLeftPad + (i - cp) * cachedCardW}px, 0, 0)`;
      });
      updateUI(p);
    }

    let raf: number;
    const handler = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(onScroll); };
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", () => { syncLayout(); onScroll(); }, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", handler);
      cancelAnimationFrame(raf);
      cards.forEach(c => { c.style.visibility = ""; c.style.transform = ""; });
      if (dots) dots.style.visibility = "";
      document.documentElement.style.removeProperty("--dt-card-top");
      document.documentElement.style.removeProperty("--dt-card-h");
    };
  }, []);

  return (
    <>
      <section ref={outerRef} className="rb-dt-outer" data-rb-sec aria-label="Your Digital Team">
        {/* Sticky heading — no overflow, no clipping */}
        <div ref={headRef} className="rb-dt-head-sticky">
          <div className="rb-dt-head">
            <div>
              <p className="rb-eyebrow" data-rb-fade="0"><span className="rb-num">I</span>What you actually get</p>
              <h2 className="rb-h2" data-rb-fade="1">Inside your digital <em>team.</em></h2>
            </div>
            <span className="rb-dt-counter" ref={counterRef} aria-live="polite">01 / 06</span>
          </div>
        </div>

        {/* Fixed glass cards — position:fixed, no parent overflow, backdrop-filter works */}
        {ROLES.map((role, i) => (
          <article
            key={i}
            ref={el => { cardRefs.current[i] = el; }}
            className="rb-dt-card"
            aria-label={role.label}
          >
            <span className="rb-dt-card-num">{role.num}</span>
            <span className="rb-label rb-dt-card-label">{role.label}</span>
            <h3 className="rb-dt-card-heading">{role.heading}</h3>
            <p className="rb-dt-card-copy">{role.copy}</p>
            {role.visual}
          </article>
        ))}

        {/* Fixed progress dots */}
        <div ref={dotsRef} className="rb-dt-dots-fixed" aria-hidden="true">
          {ROLES.map((_,i) => (
            <span key={i} ref={el=>{dotRefs.current[i]=el;}} className={`rb-dt-dot${i===0?" rb-dt-dot-active":""}`}/>
          ))}
        </div>
      </section>

      <div className="rb-dt-coda">
        <div className="rb-wrap rb-dt-coda-inner">
          <p className="rb-dt-coda-statement">All five roles deploy as<br/>one connected system.</p>
          <p className="rb-dt-coda-sub">You don&apos;t add them one at a time — they go live together at the end of week 5.</p>
          <BookCTA label="Start your 5-week build" />
        </div>
      </div>
    </>
  );
}
