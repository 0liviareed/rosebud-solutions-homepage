import type { Metadata } from "next";
import RecruitmentFAQ from "@/components/RecruitmentFAQ";

export const metadata: Metadata = {
  title: "Recruitment · Rosebud Solutions",
  description:
    "A custom recruitment system we build and run for you. Deployed in 5 weeks. Not a tool — a service.",
};

export default function RecruitmentPage() {
  return (
    <>
      {/* ========== PAGE HERO ========== */}
      <section className="rb-page-hero">
        <div className="rb-page-hero-inner">
          <p className="rb-page-hero-eyebrow">Rosebud Solutions</p>
          <p className="rb-page-hero-crumb">
            <span className="rb-num">I</span>By Industry &middot; Recruitment
          </p>
          <h1 className="rb-page-hero-h1">
            Your recruitment, <em>rebuilt.</em>
          </h1>
          <p className="rb-page-hero-sub">
            Not a tool. A custom recruitment system we build and run for you.
          </p>
          <p className="rb-page-hero-caption">
            We build it in 5 weeks. We run it. You interview.
          </p>
        </div>
      </section>

      <main className="rb-content">
        {/* ===================== I — SEVEN-STEP LOOP ===================== */}
        <section className="rb-sec" data-rb-sec aria-label="The seven-step loop">
          <div className="rb-wrap">
            <div className="rb-head">
              <p className="rb-eyebrow" data-rb-fade="0">
                <span className="rb-num">I</span>Sound familiar?
              </p>
              <h2 className="rb-h2" data-rb-fade="1">
                Here&apos;s how recruitment runs on your desk <em>right now.</em>
              </h2>
            </div>

            <ol className="rb-step-list" data-rb-fade="2">
              <li className="rb-step">
                <span className="rb-step-num">01</span>
                <span className="rb-step-body">JD lands on your desk</span>
              </li>
              <li className="rb-step">
                <span className="rb-step-num">02</span>
                <span className="rb-step-body">
                  Post to your CRM — synced to free job boards
                </span>
              </li>
              <li className="rb-step">
                <span className="rb-step-num">03</span>
                <span className="rb-step-body">
                  LinkedIn when the boards fail
                </span>
              </li>
              <li className="rb-step">
                <span className="rb-step-num">04</span>
                <span className="rb-step-body">
                  High volume. Low quality. 100 applications. Three worth
                  reading.
                </span>
              </li>
              <li className="rb-step">
                <span className="rb-step-num">05</span>
                <span className="rb-step-body">Every CV. Manual. One by one.</span>
              </li>
              <li className="rb-step">
                <span className="rb-step-num">06</span>
                <span className="rb-step-body">
                  Tag candidates. Shortlist. Directors. Interviews.
                </span>
              </li>
              <li className="rb-step">
                <span className="rb-step-num">07</span>
                <span className="rb-step-body">Wrong hire. Start again.</span>
              </li>
            </ol>

            <p className="rb-aftertext" data-rb-fade="3">
              Every pound fixing a bad hire is a pound not going into
              campaigns, clients, or growth. And it all lands on one person.
            </p>
            <p className="rb-aftertext rb-aftertext-bridge" data-rb-fade="3">
              What if six of those seven steps ran without them?
            </p>
          </div>
        </section>

        {/* ===================== II — WHAT'S INCLUDED ===================== */}
        <section className="rb-sec" data-rb-sec aria-label="What's included">
          <div className="rb-wrap">
            <div className="rb-head">
              <p className="rb-eyebrow" data-rb-fade="0">
                <span className="rb-num">II</span>Every deployment includes
              </p>
              <h2 className="rb-h2" data-rb-fade="1">
                One system. <em>All seven roles.</em>
              </h2>
              <p className="rb-sub" data-rb-fade="2">
                A custom system we build around your desks. One setup. One
                monthly figure. No per-seat pricing. Deployed in 5 weeks.
              </p>
            </div>

            <p className="rb-included-intro" data-rb-fade="3">
              Every deployment is built around your desks, your briefs, and
              your ICP. Seven roles run as one system — operated by us, handed
              to you.
            </p>

            <div data-rb-fade="3">
              {[
                [
                  "Candidate Sourcing Engine",
                  "Targeted search across LinkedIn and sector networks, filtered against your ICP.",
                ],
                [
                  "CV Screening & Shortlisting",
                  "Agentic AI reading every profile against your criteria.",
                ],
                [
                  "Automated Outreach Sequences",
                  "Multi-touch personalised sequences, sent without manual input.",
                ],
                [
                  "CRM Auto-Population",
                  "Everything written directly into your CRM, nothing typed.",
                ],
                [
                  "Pipeline Management",
                  "Warm candidates tracked, re-engaged, ready when the next role opens.",
                ],
                [
                  "Behaviour-Triggered Follow-Up",
                  "Re-engagement handled automatically.",
                ],
                [
                  "Operational Audit & Roadmap",
                  "Where your operation is losing time, and what to fix next.",
                ],
              ].map(([title, body], i) => (
                <div key={i} className="rb-entry rb-entry-numbered" tabIndex={0}>
                  <span className="rb-num-big">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="rb-body-stack">
                    <span className="rb-label">{title}</span>
                    <p className="rb-body-copy">{body}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="rb-aftertext" data-rb-fade="3">
              You own every system we build. Full access. Full credentials.
              Full data. No lock-in. Cancel any time.
            </p>
            <p className="rb-aftertext rb-aftertext-quiet" data-rb-fade="3">
              Pricing shared on the demo call — scoped to the volume and
              seniority of the roles you hire for.
            </p>
          </div>
        </section>

        {/* ===================== III — WHAT CHANGES DAY ONE ===================== */}
        <section
          className="rb-sec"
          data-rb-sec
          aria-label="What changes on day one"
        >
          <div className="rb-wrap">
            <div className="rb-head">
              <p className="rb-eyebrow" data-rb-fade="0">
                <span className="rb-num">III</span>The difference
              </p>
              <h2 className="rb-h2" data-rb-fade="1">
                What changes on <em>day one.</em>
              </h2>
            </div>

            <div className="rb-compare" data-rb-fade="2">
              <div className="rb-compare-head">
                <span className="rb-compare-label rb-compare-label-manual">
                  Manual &middot; the reality now
                </span>
                <span className="rb-compare-label rb-compare-label-rosebud">
                  Rosebud runs it for you
                </span>
              </div>

              {[
                [
                  "Manual LinkedIn and network search",
                  "Candidates sourced automatically against your criteria",
                ],
                [
                  "Manual review and filtering of every application",
                  "Screened before your team sees a single name",
                ],
                [
                  "Manually written and sent follow-up emails",
                  "Personalised outreach sent and sequenced automatically",
                ],
                [
                  "Manual data entry after every candidate interaction",
                  "Every profile filed directly into your CRM — nothing typed",
                ],
                [
                  "Manually tracking where every candidate sits",
                  "Full pipeline visibility in real time",
                ],
                [
                  "Chasing no-shows and dormant candidates by hand",
                  "Re-engagement handled automatically",
                ],
                [
                  "Strategic guesswork on where the operation is losing time",
                  "You already know — and it's already fixed",
                ],
              ].map(([manual, rosebud], i) => (
                <div key={i} className="rb-compare-row">
                  <span className="rb-compare-cell rb-compare-cell-manual">
                    {manual}
                  </span>
                  <span className="rb-compare-cell rb-compare-cell-rosebud">
                    {rosebud}
                  </span>
                </div>
              ))}
            </div>

            <div className="rb-before-after" data-rb-fade="3">
              <p className="rb-before-after-eyebrow">What lands in your CRM</p>
              <p className="rb-before-after-intro">
                By the time a candidate moves forward, they&apos;ve been
                cross-referenced and validated across multiple sources. Every
                profile arrives interview-ready.
              </p>
              <p className="rb-before-after-bridge">
                Of the eight steps between brief and interview, your recruiter
                runs two. We run the <em>other six.</em>
              </p>

              <div className="rb-before-after-cols">
                <div className="rb-before-after-col">
                  <span className="rb-label">Without Rosebud</span>
                  <ul className="rb-before-after-list">
                    <li>LinkedIn only</li>
                    <li>Unverified</li>
                    <li>Unknown availability</li>
                  </ul>
                </div>
                <div className="rb-before-after-col rb-before-after-col-after">
                  <span className="rb-label">With Rosebud</span>
                  <ul className="rb-before-after-list rb-before-after-list-after">
                    <li>Validated across sources</li>
                    <li>Availability confirmed</li>
                    <li>Rate captured</li>
                    <li>Ready to move</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== IV — WHO THIS IS FOR ===================== */}
        <section className="rb-sec" data-rb-sec aria-label="Who this is for">
          <div className="rb-wrap">
            <div className="rb-head">
              <p className="rb-eyebrow" data-rb-fade="0">
                <span className="rb-num">IV</span>The honest filter
              </p>
              <h2 className="rb-h2" data-rb-fade="1">
                This works if you&apos;re <em>already hiring.</em>
              </h2>
            </div>

            <div className="rb-filter-cols" data-rb-fade="2">
              <div className="rb-filter-col rb-filter-col-yes">
                <span className="rb-label">This works for you if</span>
                <ul className="rb-filter-list">
                  <li>You&apos;re running multiple live briefs at once</li>
                  <li>Your biggest bottleneck is CV volume, not client volume</li>
                  <li>You&apos;re already using a CRM or open to one</li>
                  <li>You can commit to an ICP definition session in week one</li>
                  <li>You want candidates sourced, not applicants filtered</li>
                </ul>
              </div>
              <div className="rb-filter-col rb-filter-col-no">
                <span className="rb-label">This isn&apos;t for you if</span>
                <ul className="rb-filter-list">
                  <li>You hire purely through word-of-mouth and relationships</li>
                  <li>
                    You&apos;re looking for a chatbot or a single AI tool, not a
                    system
                  </li>
                  <li>
                    You want software to run yourself — this is a service, not
                    a product
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== V — BOOK A DEMO ===================== */}
        <section
          id="rb-book"
          className="rb-sec"
          data-rb-sec
          aria-label="Request a demo"
        >
          <div className="rb-wrap">
            <div className="rb-head">
              <p className="rb-eyebrow" data-rb-fade="0">
                <span className="rb-num">V</span>See it in action
              </p>
              <h2 className="rb-h2" data-rb-fade="1">
                See how this runs for <em>your desks.</em>
              </h2>
              <p className="rb-sub" data-rb-fade="2">
                A 30-minute walkthrough of the system mapped to the roles you
                actually hire for. You&apos;ll see the sourcing, the screening
                logic, and how candidates land in your calendar.
              </p>
            </div>

            <div className="rb-demo-cards" data-rb-fade="3">
              <div className="rb-demo-card">
                <span className="rb-label">What to expect</span>
                <p>
                  A working system mapped to one of your open briefs. You&apos;ll
                  see the candidate profiles, the screening decisions, and the
                  pipeline view.
                </p>
              </div>
              <div className="rb-demo-card">
                <span className="rb-label">Duration</span>
                <p>30 minutes. Zoom. No prep needed.</p>
              </div>
            </div>

            <p className="rb-demo-reassure" data-rb-fade="3">
              We build it. We run it. You own it. No lock-in. Cancel any time.
            </p>

            <div className="rb-book-cta-wrap" data-rb-fade="3">
              <a
                href="https://cal.eu/rosebudsolutions/30min"
                className="rb-book-cta"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Request a demo</span>
                <span className="rb-book-cta-arrow" aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>

        {/* ===================== VI — FAQ ===================== */}
        <section className="rb-sec" data-rb-sec aria-label="Frequently asked questions">
          <div className="rb-wrap">
            <div className="rb-head">
              <p className="rb-eyebrow" data-rb-fade="0">
                <span className="rb-num">VI</span>Frequently asked
              </p>
              <h2 className="rb-h2" data-rb-fade="1">
                The questions we get on <em>every demo call.</em>
              </h2>
            </div>

            <div data-rb-fade="2">
              <RecruitmentFAQ />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
