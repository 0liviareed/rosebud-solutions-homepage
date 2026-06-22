"use client";

import React, { useEffect, useState } from "react";
import CalEmbed from "@/components/CalEmbed";
import { track } from "@/lib/analytics";

/**
 * Re-skinned Rosebud demo / booking landing page (was Downloads/RosebudDemo.jsx).
 * Lives at /see-it-run — unlisted (no nav/menu link), linked only from the cold
 * email sequence (TP2/TP4). Sits on the site's global FloatingPaths animated
 * background + Header/Footer chrome (LayoutChrome), so this component ships NO
 * background of its own. All colour/type pulled from the site tokens in
 * globals.css (Cormorant / DM Sans / JetBrains Mono, bone + purple palette).
 *
 * Booking uses the shared <CalEmbed /> (cal.eu rosebudsolutions/30min) which
 * fires PostHog cal_loaded + booking_completed. UTMs on the inbound link are
 * captured by PostHog's $pageview; we also fire an explicit see_it_run_view
 * event carrying utm_* so it's directly filterable on the /site dashboard.
 *
 * Proof facts trace to Rosebud's anonymised case studies. Swap sector labels
 * for client names + logos once non-anonymised.
 */

const PROOF = [
  { tag: "Edward Harrington", role: "Managing Director", quote: "I thought if I wasn't chasing, deals would die. We closed two last quarter from people I'd given up on months ago. Rosebud was still in touch with them when I wasn't.", stat: "2", unit: "deals closed from leads he'd written off" },
  { tag: "Thomas Ashford", role: "Operations Director", quote: "My phone used to ring before I'd finished my first coffee. Now I open my inbox and three calls are already on my calendar. I just read the notes and show up.", stat: "3", unit: "calls booked before his first coffee" },
  { tag: "Life insurance", role: "Case study", quote: "No outbound, no website, every inbound handled by hand. Now the outreach runs on its own, every month.", stat: "15,000", unit: "touches a month, automatic" },
  { tag: "Recruitment", role: "Case study", quote: "100 applications, 3 worth reading. The owner defines the role once and reviews a pre-screened shortlist. The system does the rest.", stat: "15 hrs", unit: "back a week, per role" },
  { tag: "Richard Sinclair", role: "Operations Director", quote: "Five weeks with Rosebud and it was done. It's one of the only things I've paid for this year that made my job smaller instead of bigger.", stat: "5 wks", unit: "from first call to live" },
];

const SECTORS = ["Life insurance", "Recruitment", "Real estate", "Mortgage & lending", "Dental & healthcare", "Trades", "Family law"];

const BEFORE_AFTER = [
  ["Enquiries replied to when someone got round to it.", "Every enquiry gets an immediate, personalised response. Automatically."],
  ["Follow-ups written by hand. Sent late, if at all.", "Follow-up sequences go out on time, every time. No one has to remember."],
  ["Appointments and jobs confirmed by hand.", "Confirmations, reminders and rescheduling handled automatically."],
  ["Documents and information chased over the phone.", "Chasing sequences run until the information lands."],
  ["No clear view of where anything sits.", "Every enquiry, job and client in one place. In real time."],
];

const PROCESS = ["Enquiry in", "Auto response", "Qualified", "Confirmed", "Follow-up", "Pipeline", "You do the work"];

export default function SeeItRun() {
  const [p, setP] = useState(0);
  const c = PROOF[p];
  const go = (n: number) => setP((x) => (x + n + PROOF.length) % PROOF.length);

  // Fire an explicit, filterable event carrying the inbound UTMs so the
  // landing page is attributable on the /site dashboard even before a booking.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    track("see_it_run_view", {
      utm_source: q.get("utm_source"),
      utm_medium: q.get("utm_medium"),
      utm_campaign: q.get("utm_campaign"),
      utm_content: q.get("utm_content"),
    });
  }, []);

  const bookClick = () => track("cta_click", { cta: "book_call", location: "see_it_run_close" });

  return (
    <div className="rbd" data-rb-sec>
      <style>{`
        .rbd{position:relative;z-index:1;color:var(--rb-bone);font-family:var(--font-dm-sans),system-ui,sans-serif;-webkit-font-smoothing:antialiased;overflow-x:hidden;
          --rbd-line:var(--rb-bone-hair);
          --rbd-glass:rgba(245,241,234,0.045);
          --rbd-glass-bd:rgba(245,241,234,0.12);
          --rbd-card:rgba(245,241,234,0.05);
          --rbd-before:#D89384;--rbd-after:#8FBF9B;}
        .rbd *{box-sizing:border-box;}
        .rbd-glass{background:var(--rbd-glass);-webkit-backdrop-filter:blur(16px) saturate(1.25);backdrop-filter:blur(16px) saturate(1.25);
          border:1px solid var(--rbd-glass-bd);box-shadow:0 10px 44px rgba(0,0,0,0.42),inset 0 1px 0 rgba(245,241,234,0.06);}
        .rbd-eyebrow{font-family:var(--font-jetbrains-mono),monospace;font-size:11px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:var(--rb-purple);}
        .rbd-h{font-family:var(--font-cormorant),Georgia,serif;font-weight:400;line-height:1.04;letter-spacing:-.01em;margin:0;}
        .rbd-h em{font-style:italic;color:var(--rb-purple);}

        /* HERO */
        .rbd-hero{display:grid;grid-template-columns:1fr 1fr;align-items:center;}
        @media(max-width:980px){.rbd-hero{grid-template-columns:1fr;}}
        .rbd-left{padding:clamp(48px,6vw,84px) clamp(24px,4vw,56px);display:flex;flex-direction:column;justify-content:center;}
        .rbd-h1{font-size:clamp(42px,5vw,68px);margin:18px 0 18px;}
        .rbd-sub{font-size:17px;color:var(--rb-bone-dim);line-height:1.55;max-width:42ch;margin:0 0 28px;}
        .rbd-cal-wrap{border-radius:16px;overflow:hidden;}
        .rbd-note{font-size:13px;color:var(--rb-bone-dim);margin:16px 0 0;}

        .rbd-right{padding:clamp(40px,5vw,72px) clamp(24px,4vw,56px);display:flex;flex-direction:column;justify-content:center;border-left:1px solid var(--rbd-line);}
        @media(max-width:980px){.rbd-right{border-left:none;border-top:1px solid var(--rbd-line);}}
        .rbd-right-h{font-size:16px;font-weight:500;color:var(--rb-bone);opacity:.78;margin:0 0 26px;font-family:var(--font-dm-sans),sans-serif;}
        .rbd-pcard{background:var(--rbd-card);border:1px solid var(--rbd-glass-bd);color:var(--rb-bone);border-radius:16px;padding:30px;min-height:320px;display:flex;flex-direction:column;-webkit-backdrop-filter:blur(16px) saturate(1.2);backdrop-filter:blur(16px) saturate(1.2);box-shadow:0 10px 44px rgba(0,0,0,0.42),inset 0 1px 0 rgba(245,241,234,0.06);}
        .rbd-bigq{font-family:var(--font-cormorant),serif;font-size:62px;line-height:0.7;color:var(--rb-purple);display:block;height:30px;}
        .rbd-pquote{font-family:var(--font-cormorant),serif;font-size:21px;line-height:1.4;margin:0 0 auto;color:var(--rb-bone);}
        .rbd-pstat{margin-top:28px;}
        .rbd-pstat-n{font-family:var(--font-cormorant),serif;font-weight:500;font-size:clamp(52px,5.4vw,66px);line-height:0.95;letter-spacing:-0.02em;color:var(--rb-purple);}
        .rbd-pstat-u{font-size:13px;color:var(--rb-bone-dim);margin-top:10px;letter-spacing:.01em;}
        .rbd-pattr{font-size:12.5px;color:var(--rb-bone-dim);margin-top:16px;}
        .rbd-pattr-n{color:var(--rb-bone);font-weight:600;}
        .rbd-pctrl{display:flex;align-items:center;gap:16px;margin-top:24px;}
        .rbd-arrow{width:40px;height:40px;border-radius:50%;border:1px solid var(--rbd-glass-bd);background:transparent;color:var(--rb-bone);font-size:16px;cursor:pointer;transition:border-color .18s var(--rb-ease),color .18s var(--rb-ease);}
        .rbd-arrow:hover{border-color:var(--rb-purple);color:var(--rb-purple);}
        .rbd-arrow:focus-visible{outline:2px solid var(--rb-purple);outline-offset:2px;}
        .rbd-pcount{font-family:var(--font-jetbrains-mono),monospace;font-size:12px;color:var(--rb-bone-dim);letter-spacing:.1em;}
        .rbd-trust{margin-top:34px;border-top:1px solid var(--rbd-line);padding-top:22px;}
        .rbd-trust-l{font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--rb-bone-dim);margin-bottom:12px;font-family:var(--font-jetbrains-mono),monospace;}
        .rbd-sectors{display:flex;flex-wrap:wrap;gap:8px 14px;}
        .rbd-sectors span{font-size:13px;color:var(--rb-bone);opacity:.82;}
        .rbd-sectors span:not(:last-child)::after{content:"·";margin-left:14px;color:var(--rb-bone-faint);}

        .rbd-sec{max-width:1080px;margin:0 auto;padding:clamp(56px,8vw,96px) clamp(22px,4vw,40px);}
        .rbd-band{border-top:1px solid var(--rbd-line);}
        .rbd-h2{font-size:clamp(30px,3.6vw,46px);margin:14px 0 0;}

        .rbd-ba{display:grid;grid-template-columns:1fr 1fr;margin-top:40px;border:1px solid var(--rbd-glass-bd);border-radius:16px;overflow:hidden;background:var(--rbd-glass);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);box-shadow:0 10px 44px rgba(0,0,0,0.4);}
        @media(max-width:680px){.rbd-ba{grid-template-columns:1fr;}}
        .rbd-ba-head{font-family:var(--font-jetbrains-mono),monospace;font-size:12px;font-weight:500;letter-spacing:.06em;padding:14px 20px;border-bottom:1px solid var(--rbd-line);}
        .rbd-ba-b{color:var(--rbd-before);}
        .rbd-ba-a{color:var(--rbd-after);border-left:1px solid var(--rbd-line);}
        @media(max-width:680px){.rbd-ba-a{border-left:none;border-top:1px solid var(--rbd-line);}}
        .rbd-ba-cell{padding:16px 20px;font-size:14px;line-height:1.5;border-bottom:1px dashed var(--rbd-line);color:var(--rb-bone);}
        .rbd-ba-cell.a{border-left:1px solid var(--rbd-line);}
        @media(max-width:680px){.rbd-ba-cell.a{border-left:none;}}
        .rbd-ba-cell:last-child{border-bottom:none;}
        .rbd-mark{font-weight:700;margin-right:8px;}
        .rbd-mark.x{color:var(--rbd-before);}.rbd-mark.c{color:var(--rbd-after);}

        .rbd-out{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:end;margin:14px 0 30px;}
        @media(max-width:680px){.rbd-out{grid-template-columns:1fr;gap:10px;}}
        .rbd-out-big{font-family:var(--font-cormorant),serif;font-size:clamp(30px,3.4vw,42px);margin:0;font-weight:400;line-height:1.05;}
        .rbd-out-sub{font-size:15px;color:var(--rb-bone-dim);margin:8px 0 0;line-height:1.5;}
        .rbd-bar{display:flex;border:1px solid var(--rbd-glass-bd);border-radius:10px;overflow:hidden;background:var(--rbd-glass);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);box-shadow:0 10px 44px rgba(0,0,0,0.4);}
        @media(max-width:680px){.rbd-bar{flex-wrap:wrap;}}
        .rbd-bstep{flex:1;min-width:120px;font-family:var(--font-jetbrains-mono),monospace;font-size:11px;padding:13px 12px;border-right:1px solid var(--rbd-glass-bd);color:var(--rb-bone-dim);background:transparent;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
        .rbd-bstep:last-child{border-right:none;}
        .rbd-bstep.on{background:var(--rb-purple-core);color:#0a0710;font-weight:600;}
        .rbd-bstep .n{color:var(--rb-bone-faint);margin-right:7px;}.rbd-bstep.on .n{color:rgba(10,7,16,0.55);}

        .rbd-close{text-align:center;}
        .rbd-close-sub{font-size:15px;color:var(--rb-bone-dim);max-width:46ch;margin:16px auto 0;line-height:1.55;}
        .rbd-cta{display:inline-block;margin-top:24px;background:var(--rb-purple-core);color:#0a0710;font-weight:600;font-size:15px;text-decoration:none;padding:15px 34px;border-radius:10px;transition:background .18s var(--rb-ease),transform .18s var(--rb-ease);}
        .rbd-cta:hover{background:var(--rb-purple);transform:translateY(-1px);}
        .rbd{scroll-behavior:smooth;}
      `}</style>

      {/* HERO */}
      <section className="rbd-hero">
        <div className="rbd-left">
          <span className="rbd-eyebrow" data-rb-fade="0">Rosebud Solutions</span>
          <h1 className="rbd-h rbd-h1" data-rb-fade="1">You don&rsquo;t want a tool. You want the work <em>done.</em></h1>
          <p className="rbd-sub" data-rb-fade="2">A 30-minute call. We map where your week goes and show you the first job we&rsquo;d hand back. Pick a time below.</p>
          <div className="rbd-cal-wrap" id="rbd-book" data-rb-fade="3"><CalEmbed /></div>
          <p className="rbd-note" data-rb-fade="4">No prep needed. Worth it whether or not we work together.</p>
        </div>

        <div className="rbd-right">
          <p className="rbd-right-h">What owners like you got back with Rosebud Solutions</p>
          <div className="rbd-pcard">
            <span className="rbd-bigq">&ldquo;</span>
            <p className="rbd-pquote">{c.quote}</p>
            <div className="rbd-pstat">
              <div className="rbd-pstat-n">{c.stat}</div>
              <div className="rbd-pstat-u">{c.unit}</div>
            </div>
            <div className="rbd-pattr"><span className="rbd-pattr-n">{c.tag}</span> · {c.role}</div>
          </div>
          <div className="rbd-pctrl">
            <button className="rbd-arrow" onClick={() => go(-1)} aria-label="Previous">&larr;</button>
            <button className="rbd-arrow" onClick={() => go(1)} aria-label="Next">&rarr;</button>
            <span className="rbd-pcount">{String(p + 1).padStart(2, "0")} / {String(PROOF.length).padStart(2, "0")}</span>
          </div>
          <div className="rbd-trust">
            <div className="rbd-trust-l">Built for owner-led firms across</div>
            <div className="rbd-sectors">{SECTORS.map((s) => <span key={s}>{s}</span>)}</div>
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <section className="rbd-band" data-rb-sec>
        <div className="rbd-sec">
          <span className="rbd-eyebrow" data-rb-fade="0">The reality, before and after</span>
          <h2 className="rbd-h rbd-h2" data-rb-fade="1">You didn&rsquo;t start this to chase <em>paperwork.</em></h2>
          <div className="rbd-ba" data-rb-fade="2">
            <div className="rbd-ba-head rbd-ba-b">✕ Before</div>
            <div className="rbd-ba-head rbd-ba-a">✓ After</div>
            {BEFORE_AFTER.map(([b, a]) => (
              <React.Fragment key={b}>
                <div className="rbd-ba-cell b"><span className="rbd-mark x">✕</span>{b}</div>
                <div className="rbd-ba-cell a"><span className="rbd-mark c">✓</span>{a}</div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* OUTCOME + PROCESS */}
      <section className="rbd-band" data-rb-sec>
        <div className="rbd-sec">
          <span className="rbd-eyebrow" data-rb-fade="0">The outcome</span>
          <div className="rbd-out" data-rb-fade="1">
            <div>
              <h2 className="rbd-out-big">One job left.</h2>
              <p className="rbd-out-sub">Run the business. The system handles everything around it, from first enquiry to the moment it&rsquo;s ready for you.</p>
            </div>
            <div>
              <p className="rbd-out-big" style={{ color: "var(--rb-purple)" }}>Hours back a week.</p>
              <p className="rbd-out-sub">Back in the business, back in your hands.</p>
            </div>
          </div>
          <div className="rbd-bar" data-rb-fade="2">
            {PROCESS.map((step, n) => (
              <div key={step} className={`rbd-bstep${n === 0 || n === PROCESS.length - 1 ? " on" : ""}`}>
                <span className="n">{String(n + 1).padStart(2, "0")}</span>{step}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSE */}
      <section className="rbd-band" data-rb-sec>
        <div className="rbd-sec rbd-close">
          <h2 className="rbd-h rbd-h2" style={{ marginTop: 0 }} data-rb-fade="0">See it run for <em>your business.</em></h2>
          <p className="rbd-close-sub" data-rb-fade="1">Thirty minutes. We map where your week goes and show you the first job we&rsquo;d take off your desk, whether or not we work together.</p>
          <a className="rbd-cta" href="#rbd-book" onClick={bookClick} data-rb-fade="2">Book your call</a>
        </div>
      </section>
    </div>
  );
}
