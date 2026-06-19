import type { ReactNode } from "react";

// Rosebud Solutions — homepage "What you actually get / What's running by week
// five" section. Industry-neutral; states in tangible terms exactly what the
// client has running after deployment, as five concrete pillars. Static section
// (the animated flow lives in HomepageFlow). Adapted to the design system:
// Cormorant / DM Sans, bone-tinted hairlines + system purple, transparent over
// the page background, and the site's native quiet "Get started" link.

const STATS = [
  { value: "5", label: "Roles off your desk" },
  { value: "24/7", label: "Always-on coverage" },
  { value: "< 60s", label: "Response to every enquiry" },
  { value: "5 weeks", label: "From kickoff to live system" },
];

type Pillar = { n: string; head: ReactNode; tag: string; body: string };

const PILLARS: Pillar[] = [
  {
    n: "01",
    head: <>Your whole pipeline, sourced and <em>qualified.</em></>,
    tag: "Sourcing & enrichment",
    body: "AI-led research finds the right people to reach, every inbound enquiry gets caught, all of it enriched, scored on intent, and routed to your team.",
  },
  {
    n: "02",
    head: <>One source of truth, always <em>current.</em></>,
    tag: "Unified CRM",
    body: "Every conversation synced to one record that stays clean and current, so you always know exactly where things stand.",
  },
  {
    n: "03",
    head: <>Answered everywhere, in one <em>voice.</em></>,
    tag: "Omnichannel orchestration",
    body: "Voice, SMS, email, and DMs answered in one consistent voice, around the clock, in under a minute.",
  },
  {
    n: "04",
    head: <>Booked, confirmed, nothing <em>missed.</em></>,
    tag: "Automated nurture",
    body: "Reminders, confirmations, and follow-ups handled for you, so nothing slips and no-one has to chase.",
  },
  {
    n: "05",
    head: <>The whole picture, in one <em>view.</em></>,
    tag: "Attribution & reporting",
    body: "Pipeline, conversion, and revenue in one live view, with a brief in your inbox each morning.",
  },
];

export default function HomepageOwn({
  marker = "III",
  ctaHref = "https://www.cal.eu/rosebudsolutions/30min?overlayCalendar=true",
}: {
  marker?: string;
  ctaHref?: string;
}) {
  return (
    <section className="rbo" aria-label="What you actually get">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div className="rbo-eyebrow">
        <span className="rbo-over">Rosebud Solutions</span>
        <span className="rbo-loc">
          <i>{marker}</i> What you actually get
        </span>
      </div>

      <h2 className="rbo-h1">
        What&apos;s running by <em>week five.</em>
      </h2>

      <p className="rbo-sub">
        This isn&apos;t software you operate. It&apos;s a custom AI operation,
        built around your business and run for you, that takes every enquiry
        from first contact to booked appointment. You stay on the work only you
        can do.
      </p>

      <div className="rbo-stats">
        {STATS.map((st) => (
          <div className="rbo-stat" key={st.label}>
            <b>{st.value}</b>
            <span>{st.label}</span>
          </div>
        ))}
      </div>

      <div className="rbo-list">
        {PILLARS.map((p) => (
          <div className="rbo-row" key={p.n}>
            <div className="rbo-row-head">
              <span className="rbo-num">{p.n}</span>
              <h3 className="rbo-head">{p.head}</h3>
            </div>
            <div className="rbo-detail">
              <span className="rbo-tag">{p.tag}</span>
              <p className="rbo-body">{p.body}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="rbo-close">
        Five roles, one connected system. They go live together at the end of
        week five, not one at a time.
      </p>

      <div className="rbo-ctas">
        <a href={ctaHref} target="_blank" rel="noopener noreferrer" className="rb-book-link">
          <span className="rb-book-link-label">Get started</span>
          <span className="rb-book-link-arrow" aria-hidden="true">
            <svg viewBox="0 0 36 12" width="36" height="12">
              <path className="rb-book-link-shaft" d="M0 6 L28 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none" />
              <path className="rb-book-link-head" d="M22 1.5 L28 6 L22 10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </span>
          <span className="rb-book-link-underline" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

const css = `
.rbo{
  /* Site design-system tokens (globals.css :root) — bone-tinted hairlines +
     system purple, matching the native rb-entry / Voices cards. */
  --card-bd:var(--rb-bone-faint); --accent:var(--rb-purple); --accent-soft:var(--rb-purple);
  --text:var(--rb-bone); --muted:var(--rb-bone-dim);
  --serif:var(--font-cormorant),Georgia,serif; --sans:var(--font-dm-sans),-apple-system,BlinkMacSystemFont,sans-serif;
  position:relative; padding:clamp(5rem,8vw,7rem) clamp(1.5rem,5vw,3rem); color:var(--text); font-family:var(--sans);
  background:transparent; overflow:hidden; text-align:center;
}

.rbo-eyebrow{display:flex; flex-direction:column; align-items:center; gap:10px; margin-bottom:26px;}
.rbo-over{font-size:12px; letter-spacing:.28em; text-transform:uppercase; color:var(--muted);}
.rbo-loc{font-size:12px; letter-spacing:.2em; text-transform:uppercase; color:var(--muted);}
.rbo-loc i{font-family:var(--serif); font-style:italic; color:var(--accent); letter-spacing:0; margin-right:6px; text-transform:none;}

.rbo-h1{font-family:var(--serif); font-weight:500; font-size:clamp(34px,6vw,72px); line-height:1.05; letter-spacing:-.02em; margin:0 auto 26px; max-width:16ch;}
.rbo-h1 em{font-style:italic; color:var(--accent-soft); text-decoration:underline; text-decoration-color:var(--accent); text-decoration-thickness:2px; text-underline-offset:.1em;}

.rbo-sub{max-width:680px; margin:0 auto 48px; font-size:clamp(16px,2vw,19px); line-height:1.6; color:var(--rb-bone-dim);}

/* stat strip — no container, hairline-divided */
.rbo-stats{display:flex; flex-wrap:wrap; justify-content:center; max-width:920px; margin:0 auto 64px;}
.rbo-stat{padding:4px 34px; display:flex; flex-direction:column; gap:7px; align-items:center; text-align:center; border-right:1px solid var(--card-bd);}
.rbo-stat:last-child{border-right:0;}
.rbo-stat b{font-family:var(--serif); font-style:italic; font-weight:500; font-size:clamp(26px,3.4vw,40px); color:var(--accent-soft); line-height:1;}
.rbo-stat span{font-size:11.5px; letter-spacing:.04em; color:var(--muted); line-height:1.35;}

/* the five things — no containers, hairline-divided editorial rows */
.rbo-list{max-width:1000px; margin:0 auto; text-align:left; border-top:1px solid var(--card-bd);}
.rbo-row{display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1fr); gap:28px 48px; padding:32px 4px; border-bottom:1px solid var(--card-bd); align-items:start;}
.rbo-row-head{display:flex; gap:16px; align-items:baseline;}
.rbo-num{font-family:var(--serif); font-style:italic; font-size:15px; color:var(--accent); opacity:.85; flex:none;}
.rbo-head{font-family:var(--serif); font-weight:500; font-size:clamp(21px,2.3vw,28px); line-height:1.18; letter-spacing:-.01em; color:var(--text); margin:0;}
.rbo-head em{font-style:italic; color:var(--accent-soft);}
.rbo-tag{display:block; font-size:11px; letter-spacing:.16em; text-transform:uppercase; color:var(--accent); margin-bottom:11px;}
.rbo-body{font-size:14.5px; line-height:1.6; color:var(--muted); margin:0;}

.rbo-close{max-width:600px; margin:54px auto 26px; font-size:15px; line-height:1.55; color:var(--rb-bone-dim);}

.rbo-ctas{display:flex; justify-content:center; margin:0 auto;}

@media (max-width:760px){
  .rbo-stats{gap:20px 0;}
  .rbo-stat{flex:1 1 42%; border-right:0; padding:4px 12px;}
  .rbo-row{grid-template-columns:1fr; gap:12px; padding:26px 0;}
}
`;
