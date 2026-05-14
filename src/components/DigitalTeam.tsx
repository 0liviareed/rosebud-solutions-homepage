"use client";

import { useEffect, useRef } from "react";
import BookCTA from "./BookCTA";

const N = 5;
const CARD_GAP = 20;
const LEFT_PAD_VW = 0.04;

/* ───────────────────────────────────────────────────────────────
   Editorial visuals — typography, no dashboard UI.
   Each card gets a small block of supporting data rendered as
   typography rather than charts, bars, or live-pill widgets.
   Sits below the body copy, above a thin top-divider.
   ─────────────────────────────────────────────────────────────── */

function LeadEditorial() {
  // Hot / Warm / Nurture — three editorial stat callouts.
  // Colour-coded numerals (amber / lavender / white-dim) plus the
  // right-aligned italic footnote that gives the cohort context.
  const TIERS: { label: string; n: string; tone: "hot" | "warm" | "nurture" }[] = [
    { label: "Hot", n: "84", tone: "hot" },
    { label: "Warm", n: "67", tone: "warm" },
    { label: "Nurture", n: "42", tone: "nurture" },
  ];
  return (
    <div className="rb-dt-edit">
      <div className="rb-dt-edit-row">
        {TIERS.map((t) => (
          <div key={t.label} className="rb-dt-edit-stat">
            <span className="rb-dt-edit-stat-label">{t.label}</span>
            <span className={`rb-dt-edit-stat-num rb-dt-edit-stat-num-${t.tone}`}>
              {t.n}
            </span>
          </div>
        ))}
      </div>
      <p className="rb-dt-edit-foot">1,000 leads scored this batch</p>
    </div>
  );
}

function PipelineEditorial() {
  // Pipeline as a stage flow rendered in typography. Active stage
  // emphasised in lavender italic; the rest sit in dim bone.
  const STAGES = ["Lead", "Qualified", "Proposal", "Negotiation", "Closed"];
  const ACTIVE = 2; // Proposal
  return (
    <div className="rb-dt-edit">
      <p className="rb-dt-edit-flow">
        {STAGES.map((s, i) => (
          <span key={s}>
            {i === ACTIVE ? (
              <em className="rb-dt-edit-flow-active">{s}</em>
            ) : (
              <span className="rb-dt-edit-flow-dim">{s}</span>
            )}
            {i < STAGES.length - 1 && (
              <span className="rb-dt-edit-flow-sep" aria-hidden="true">
                {" → "}
              </span>
            )}
          </span>
        ))}
      </p>
      <p className="rb-dt-edit-foot">Active brief · proposal stage</p>
    </div>
  );
}

function ChannelsEditorial() {
  // Channel list as a single editorial pull-quote — serif italic,
  // channels named in sequence, no icons, no live pills.
  return (
    <div className="rb-dt-edit">
      <p className="rb-dt-edit-quote">
        Email. <em>SMS.</em> The voice agent on day eight. One brand, every
        thread.
      </p>
      <p className="rb-dt-edit-foot">Three channels · one cadence</p>
    </div>
  );
}

function CadenceEditorial() {
  // Three-day cadence shown as typographic stat callouts — day label
  // tracked uppercase, day number in serif, supporting line beneath.
  const DAYS = [
    { day: "Day 1", body: "Enquiry replied" },
    { day: "Day 3", body: "Chase delivered" },
    { day: "Day 8", body: "Voice agent calls" },
  ];
  return (
    <div className="rb-dt-edit">
      <div className="rb-dt-edit-row">
        {DAYS.map((d) => (
          <div key={d.day} className="rb-dt-edit-stat">
            <span className="rb-dt-edit-stat-label">{d.day}</span>
            <span className="rb-dt-edit-stat-body">{d.body}</span>
          </div>
        ))}
      </div>
      <p className="rb-dt-edit-foot">Triggered by the enquiry itself</p>
    </div>
  );
}

function DashboardEditorial() {
  // Operations dashboard rendered as a serif-italic list of what gets
  // reported. No KPI tiles, no sparkline. Reads as a sentence the
  // operator could read aloud.
  const ITEMS = ["Pipeline", "Conversion", "Revenue", "Daily summary"];
  return (
    <div className="rb-dt-edit">
      <p className="rb-dt-edit-list">
        {ITEMS.map((item, i) => (
          <span key={item}>
            <em className="rb-dt-edit-list-item">{item}</em>
            {i < ITEMS.length - 1 && (
              <span className="rb-dt-edit-list-sep" aria-hidden="true">
                {" · "}
              </span>
            )}
          </span>
        ))}
      </p>
      <p className="rb-dt-edit-foot">Sent every morning · not pulled</p>
    </div>
  );
}

// ── Role data ─────────────────────────────────────────────────────
const ROLES: {
  num: string;
  label: string;
  heading: React.ReactNode;
  copy: string;
  visual: React.ReactNode;
}[] = [
  {
    num: "I",
    label: "Lead Engine",
    heading: (
      <>
        You send us the JD. We&apos;ll send you back pre-qualified candidates
        booked straight into your <em>calendar.</em>
      </>
    ),
    copy: "Scrapes qualified leads using your target criteria at the volume your pipeline can handle. Cleans, validates, and scores each one on a 0–100 scale.",
    visual: <LeadEditorial />,
  },
  {
    num: "II",
    label: "Know Every Relationship",
    heading: (
      <>
        Every contact, deal, and resource in one source of <em>truth.</em>
      </>
    ),
    copy: "Designed to bring every contact, deal, and resource into one source of truth. No more scattered spreadsheets. No more missed follow-ups.",
    visual: <PipelineEditorial />,
  },
  {
    num: "III",
    label: "Omnichannel Voice",
    heading: (
      <>
        One consistent voice across every channel. Without you{" "}
        <em>managing it.</em>
      </>
    ),
    copy: "Personalised email outreach at scale, SMS follow-up, and a voice agent that calls unresponsive leads on day 8. Your brand, without you.",
    visual: <ChannelsEditorial />,
  },
  {
    num: "IV",
    label: "Client Engagement & Follow-Up",
    heading: (
      <>
        Every follow-up sent. Every deal tracked. None of it done by{" "}
        <em>you.</em>
      </>
    ),
    copy: "Three-stage follow-up sequences on every enquiry. Reminders, chase-ups, reactivation touches — all sent on schedule, all tracked.",
    visual: <CadenceEditorial />,
  },
  {
    num: "V",
    label: "Operations Dashboard",
    heading: (
      <>
        No more Sunday night reporting. It&apos;s already <em>done.</em>
      </>
    ),
    copy: "Get instant insights into your business performance. Pipeline, conversions, salesperson activity — delivered daily without you pulling it.",
    visual: <DashboardEditorial />,
  },
];

// ── Stats row data ────────────────────────────────────────────────
const STATS = [
  { value: "5", label: "Roles off your desk" },
  { value: "24/7", label: "Always-on coverage" },
  { value: "< 60s", label: "Response to every enquiry" },
  { value: "5 weeks", label: "From kickoff to live system" },
];

// ── Component ─────────────────────────────────────────────────────
export default function DigitalTeam() {
  const outerRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const dotsRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const outer = outerRef.current;
    const head = headRef.current;
    if (!outer || !head) return;

    const outerEl = outer;
    const headEl = head;
    const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
    const dots = dotsRef.current;

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
      cachedTotal = outerEl.offsetHeight - window.innerHeight;
      cachedCardW = (cards[0]?.offsetWidth ?? 0) + CARD_GAP;
      cachedLeftPad = window.innerWidth * LEFT_PAD_VW;
      cards.forEach((c) => {
        c.style.backdropFilter = "blur(24px) saturate(1.8)";
        (
          c.style as CSSStyleDeclaration & { webkitBackdropFilter: string }
        ).webkitBackdropFilter = "blur(24px) saturate(1.8)";
      });
    }
    syncLayout();

    function updateUI(p: number) {
      const idx = Math.min(N - 1, Math.round(p * (N - 1)));
      if (idx === lastIdx) return;
      lastIdx = idx;
      if (counterRef.current)
        counterRef.current.textContent = `${String(idx + 1).padStart(2, "0")} / ${String(N).padStart(2, "0")}`;
      dotRefs.current.forEach((d, i) =>
        d?.classList.toggle("rb-dt-dot-active", i === idx),
      );
    }

    function onScroll() {
      const rect = outerEl.getBoundingClientRect();
      const inSection = rect.top <= 0 && rect.bottom >= window.innerHeight;

      const vis = inSection ? "visible" : "hidden";
      if (vis !== lastVis) {
        lastVis = vis;
        cards.forEach((c) => {
          c.style.visibility = vis;
        });
        if (dots) dots.style.visibility = vis;
      }
      if (!inSection || cachedTotal <= 0) return;

      const p = Math.max(0, Math.min(1, -rect.top / cachedTotal));
      const cp = p * (N - 1);
      cards.forEach((card, i) => {
        card.style.transform = `translate3d(${cachedLeftPad + (i - cp) * cachedCardW}px, 0, 0)`;
      });
      updateUI(p);
    }

    let raf: number;
    const handler = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(onScroll);
    };
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener(
      "resize",
      () => {
        syncLayout();
        onScroll();
      },
      { passive: true },
    );
    onScroll();

    return () => {
      window.removeEventListener("scroll", handler);
      cancelAnimationFrame(raf);
      cards.forEach((c) => {
        c.style.visibility = "";
        c.style.transform = "";
      });
      if (dots) dots.style.visibility = "";
      document.documentElement.style.removeProperty("--dt-card-top");
      document.documentElement.style.removeProperty("--dt-card-h");
    };
  }, []);

  return (
    <>
      <section
        ref={outerRef}
        className="rb-dt-outer"
        data-rb-sec
        aria-label="What you'll own by week five"
      >
        {/* Sticky head — eyebrow, H2, sub-paragraph, stats row.
            Stays in viewport as the cards scroll past horizontally. */}
        <div ref={headRef} className="rb-dt-head-sticky">
          <div className="rb-dt-head">
            <div className="rb-dt-head-text">
              <p className="rb-eyebrow" data-rb-fade="0">
                <span className="rb-num">I</span>What you actually get
              </p>
              <h2 className="rb-h2" data-rb-fade="1">
                What you&apos;ll own by <em>week five.</em>
              </h2>
              <p className="rb-dt-sub" data-rb-fade="2">
                Because this isn&apos;t software you operate. It&apos;s a
                custom AI operation we operate for you — from first enquiry to
                closed deal. Built around your business, run by us, owned by
                you.
              </p>
            </div>
            <span
              className="rb-dt-counter"
              ref={counterRef}
              aria-live="polite"
            >
              01 / 05
            </span>
          </div>

          {/* Stats band — four-column row with hairline top + bottom dividers */}
          <ul
            className="rb-dt-stats"
            data-rb-fade="3"
            aria-label="Section headline metrics"
          >
            {STATS.map((s) => (
              <li key={s.label} className="rb-dt-stat">
                <span className="rb-dt-stat-num">{s.value}</span>
                <span className="rb-dt-stat-label">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Fixed glass cards — position:fixed, no parent overflow */}
        {ROLES.map((role, i) => (
          <article
            key={i}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
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
          {ROLES.map((_, i) => (
            <span
              key={i}
              ref={(el) => {
                dotRefs.current[i] = el;
              }}
              className={`rb-dt-dot${i === 0 ? " rb-dt-dot-active" : ""}`}
            />
          ))}
        </div>
      </section>

      <div className="rb-dt-coda">
        <div className="rb-wrap rb-dt-coda-inner">
          <p className="rb-dt-coda-statement">
            All five roles deploy as
            <br />
            one connected system.
          </p>
          <p className="rb-dt-coda-sub">
            You don&apos;t add them one at a time — they go live together at
            the end of week 5.
          </p>
          <BookCTA label="Start your 5-week build" />
        </div>
      </div>
    </>
  );
}
