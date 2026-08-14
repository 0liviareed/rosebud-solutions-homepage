import SevenStepTimeline, {
  type TimelineStep,
} from "./SevenStepTimeline";

// Section I uses the SevenStepTimeline pattern (same component the
// industry pages use for the "Where the hours go" / "Sound familiar?"
// loops). Each step carries an optional label that renders as a small
// tracked-uppercase eyebrow above the numeral.
const SECTION_I_STEPS: TimelineStep[] = [
  [
    <>
      You send us the JD. We&apos;ll send you back pre-qualified candidates
      booked straight into your <em>calendar.</em>
    </>,
    "Scrapes qualified leads using your target criteria at the volume your pipeline can handle. Cleans, validates, and scores each one on a 0–100 scale — Hot, Warm, or Nurture — so your team only spends time on the ones worth a call.",
    "Lead Engine",
  ],
  [
    <>
      Every contact, deal, and resource in one source of <em>truth.</em>
    </>,
    "Designed to bring every contact, deal, and resource into one source of truth. No more scattered spreadsheets. No more missed follow-ups. Lead → Qualified → Proposal → Negotiation → Closed, tracked end to end.",
    "Know Every Relationship",
  ],
  [
    <>
      One consistent voice across every channel. Without you{" "}
      <em>managing it.</em>
    </>,
    "Personalised email outreach at scale, SMS follow-up, and a voice agent that calls unresponsive leads on day 8. Three channels, one cadence, one brand — without you in the middle of every thread.",
    "Omnichannel Voice",
  ],
  [
    <>
      Every follow-up sent. Every deal tracked. None of it done by{" "}
      <em>you.</em>
    </>,
    "Three-stage follow-up sequences on every inquiry. Day one reply, day three chase, day eight voice agent. Reminders, chase-ups, reactivation touches — all sent on schedule, all tracked.",
    "Client Engagement & Follow-Up",
  ],
  [
    <>
      No more Sunday night reporting. It&apos;s already <em>done.</em>
    </>,
    "Pipeline, conversion, revenue, daily summary — every number you need to run the business, delivered every morning without you pulling it.",
    "Operations Dashboard",
  ],
];

// Stats band — sits between the head sub-paragraph and the carousel.
const STATS = [
  { value: "5", label: "Roles off your desk" },
  { value: "24/7", label: "Always-on coverage" },
  { value: "< 60s", label: "Response to every inquiry" },
  { value: "5 weeks", label: "From kickoff to live system" },
];

export default function DigitalTeam() {
  return (
    <>
      <section
        className="rb-sec rb-dt-sec"
        data-rb-sec
        aria-label="What you actually get"
      >
        <div className="rb-wrap">
          <div className="rb-head rb-head-left">
            <p className="rb-eyebrow" data-rb-fade="0">
              <span className="rb-num">III</span>What you actually get
            </p>
            <p className="rb-sub" data-rb-fade="2">
              Because this isn&apos;t software you operate. It&apos;s a custom
              AI operation we operate for you — from first inquiry to closed
              deal. Built around your business, run by us.
            </p>
          </div>

          {/* Stats band — four-column row, hairline top + bottom dividers */}
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

          <div data-rb-fade="4">
            <SevenStepTimeline steps={SECTION_I_STEPS} />
          </div>
        </div>
      </section>
    </>
  );
}
