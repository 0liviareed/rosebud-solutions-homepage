import type { Metadata } from "next";
import InsuranceFAQ from "@/components/InsuranceFAQ";
import SevenStepTimeline, {
  type TimelineStep,
} from "@/components/SevenStepTimeline";
import Voices from "@/components/Voices";
import { VOICES } from "@/components/voices-data";
import BookDemoCTA from "@/components/BookDemoCTA";
import BookCTA from "@/components/BookCTA";

export const metadata: Metadata = {
  title: "Insurance · Rosebud Solutions",
  description:
    "A custom insurance operations system we build and run for you. Live in 5 weeks. Not a tool — a service.",
};

const INSURANCE_STEPS: TimelineStep[] = [
  [
    "Enquiry comes in",
    "New business, MTA, or renewal prompt. Every account, same starting line.",
  ],
  [
    "Fact-find",
    "Risk details, claims history, SIC codes, schedules, sum insured.",
  ],
  [
    "Chase the client for documents",
    "The schedules that didn't come with the first reply. Then the second.",
  ],
  [
    "Submit to carriers",
    "Five different portals. Five different formats. The same risk, five times.",
  ],
  [
    "Build the quote comparison",
    "Carrier responses come back structured differently. Excel handles the rest.",
  ],
  [
    "Send. Wait. Send the reminder. Wait.",
    "The follow-up loop that eats half a working day.",
  ],
  [
    "Bind — then diary the renewal",
    "11 months until the loop starts again.",
  ],
];

// Reorder so insurance-adjacent quotes (chasing/warm clients, personalised
// follow-ups, five-week build) lead; operational ones follow.
const INSURANCE_VOICES = [0, 3, 5, 2, 6, 1, 4, 7].map((i) => VOICES[i]);

export default function InsurancePage() {
  return (
    <>
      {/* ========== PAGE HERO ========== */}
      <section className="rb-page-hero">
        <div className="rb-page-hero-inner">
          <p className="rb-page-hero-eyebrow">Rosebud Solutions</p>
          <p className="rb-page-hero-crumb">
            <span className="rb-num">II</span>By Industry &middot; Insurance
          </p>
          <h1 className="rb-page-hero-h1">
            Half the week your team doesn&apos;t write.{" "}
            <em>That&apos;s the half we run.</em>
          </h1>
          <p className="rb-page-hero-sub">
            Your licensed advisors spend as much time on documentation, data
            entry, and follow-up as they do on writing business. We build the
            system that takes the admin half off their desk, so the writing
            half gets its hours back.
          </p>
          <p className="rb-page-hero-caption">
            5-week build. We run it. Your advisors do the work only they can do.
          </p>
        </div>
      </section>

      <main className="rb-content">
        {/* ===================== I — SEVEN-STEP LOOP ===================== */}
        <section className="rb-sec" data-rb-sec aria-label="Where the hours go">
          <div className="rb-wrap">
            <div className="rb-head">
              <p className="rb-eyebrow" data-rb-fade="0">
                <span className="rb-num">I</span>Sound familiar?
              </p>
              <h2 className="rb-h2" data-rb-fade="1">
                Where the <em>hours go.</em>
              </h2>
            </div>

            <div data-rb-fade="2">
              <SevenStepTimeline steps={INSURANCE_STEPS} />
            </div>

            <p className="rb-aftertext" data-rb-fade="3">
              Every account, the same loop. Every renewal, the loop starts
              again. And it all lands on the licensed people who should be
              writing new business, not chasing paperwork.
            </p>
            <p className="rb-aftertext rb-aftertext-bridge" data-rb-fade="3">
              What if five of those seven steps ran without them?
            </p>

            <div data-rb-fade="3">
              <BookCTA label="See what runs itself" />
            </div>
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
                Built around your lines, your carriers, your book. One setup.
                One monthly figure. No per-seat pricing. Live in 5 weeks.
              </p>
            </div>

            <p className="rb-included-intro" data-rb-fade="3">
              Every deployment is built around the lines you write, the
              carriers you place with, and the clients you serve. Seven roles
              run as one system — operated by us, handed to you.
            </p>

            <div data-rb-fade="3">
              {[
                [
                  "Enquiry Intake",
                  "Every new enquiry answered the moment it lands, with the qualifying questions asked before a licensed advisor picks it up.",
                ],
                [
                  "Fact-Find Automation",
                  "Risk details, claims history, and documentation requests captured through structured conversation, not email back-and-forth.",
                ],
                [
                  "Market Submission Support",
                  "Client data prepared in the format each carrier's portal expects, so no-one's retyping the same information five times.",
                ],
                [
                  "Quote Comparison Assembly",
                  "Carrier responses pulled together into client-ready comparisons automatically.",
                ],
                [
                  "CRM Auto-Population",
                  "Every conversation, every document, every decision filed directly into your CRM.",
                ],
                [
                  "Renewal & MTA Management",
                  "Renewal cycles diarised, mid-term adjustments handled without dropping in your advisors' laps.",
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
              Pricing shared on the demo call — scoped to the volume of
              enquiries and the complexity of the lines you write.
            </p>
          </div>
        </section>

        {/* ===================== VOICES — between II & III ===================== */}
        <section className="rb-sec" data-rb-sec aria-label="Voices">
          <div className="rb-wrap">
            <div className="rb-head">
              <p className="rb-eyebrow" data-rb-fade="0">
                <span className="rb-num">II&middot;V</span>Voices
              </p>
            </div>
            <div data-rb-fade="1">
              <Voices voices={INSURANCE_VOICES} />
            </div>
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
                  "Enquiries sit in an inbox until an advisor has time to reply",
                  "Every enquiry answered the moment it lands, qualifying details already captured",
                ],
                [
                  "Emailing clients three times for missing schedules and claims info",
                  "Documentation requested and collected automatically, no chasing required",
                ],
                [
                  "Keying the same risk data into five carrier portals",
                  "Client data prepared in the format each carrier's portal expects",
                ],
                [
                  "Building quote comparisons in Excel for every account",
                  "Carrier responses pulled into client-ready comparisons automatically",
                ],
                [
                  "Manual diary notes for renewals 60 days out",
                  "Renewal cycles diarised and triggered without an advisor remembering",
                ],
                [
                  "Mid-term adjustments landing on your senior people",
                  "MTAs handled through structured intake, advisor signs off the final",
                ],
                [
                  "Strategic guesswork on where the operation is losing time",
                  "You already know — and it's already fixed",
                ],
              ].map(([manual, rosebud], i) => (
                <div key={i} className="rb-compare-row">
                  <span className="rb-compare-cell rb-compare-cell-manual">
                    <span className="rb-compare-mark rb-compare-mark-x" aria-hidden="true">
                      <svg viewBox="0 0 12 12" width="10" height="10">
                        <path d="M2.5 2.5 L9.5 9.5 M9.5 2.5 L2.5 9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                      </svg>
                    </span>
                    <span>{manual}</span>
                  </span>
                  <span className="rb-compare-cell rb-compare-cell-rosebud">
                    <span className="rb-compare-mark rb-compare-mark-check" aria-hidden="true">
                      <svg viewBox="0 0 12 12" width="11" height="11">
                        <path d="M2.25 6.25 L5 9 L9.75 3.25" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      </svg>
                    </span>
                    <span>{rosebud}</span>
                  </span>
                </div>
              ))}
            </div>

            <div className="rb-before-after" data-rb-fade="3">
              <p className="rb-before-after-eyebrow">What lands in your CRM</p>
              <p className="rb-before-after-intro">
                By the time a prospect reaches your licensed advisor, the
                fact-find is complete, the documentation is in, and the risk is
                ready to submit. Every account arrives ready to quote.
              </p>
              <p className="rb-before-after-bridge">
                Of the eight steps between enquiry and bound policy, your team
                runs two. We run the <em>other six.</em>
              </p>

              <div className="rb-before-after-cols">
                <div className="rb-before-after-col">
                  <span className="rb-label">Without Rosebud</span>
                  <ul className="rb-before-after-list">
                    <li>Email thread only</li>
                    <li>Half-captured risk details</li>
                    <li>Missing documentation</li>
                  </ul>
                </div>
                <div className="rb-before-after-col rb-before-after-col-after">
                  <span className="rb-label">With Rosebud</span>
                  <ul className="rb-before-after-list rb-before-after-list-after">
                    <li>Full conversation logged</li>
                    <li>Fact-find complete</li>
                    <li>Documentation collected</li>
                    <li>Ready to submit to market</li>
                  </ul>
                </div>
              </div>
            </div>

            <div data-rb-fade="3">
              <BookCTA label="See how this runs for my desks" />
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
                Built for brokers and agencies <em>already writing.</em>
              </h2>
            </div>

            <div className="rb-filter-cols" data-rb-fade="2">
              <div className="rb-filter-col rb-filter-col-yes">
                <span className="rb-filter-head">
                  <span className="rb-filter-icon" aria-hidden="true">
                    <svg viewBox="0 0 16 16" width="14" height="14">
                      <path d="M3 8.5 L6.5 12 L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                  </span>
                  <span className="rb-label">This works for you if</span>
                </span>
                <ul className="rb-filter-list">
                  <li>You&apos;re handling enquiry volume across multiple lines or products</li>
                  <li>Your advisors spend more time on admin than on quoting or closing</li>
                  <li>You&apos;ve got a book of renewals that keeps the same loop spinning every year</li>
                  <li>You&apos;re already using a CRM, or you&apos;re open to adopting one</li>
                  <li>You want your licensed people doing work that only licensed people can do</li>
                </ul>
              </div>
              <div className="rb-filter-col rb-filter-col-no">
                <span className="rb-filter-head">
                  <span className="rb-filter-icon" aria-hidden="true">
                    <svg viewBox="0 0 16 16" width="14" height="14">
                      <path d="M4 4 L12 12 M12 4 L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                  <span className="rb-label">This isn&apos;t for you if</span>
                </span>
                <ul className="rb-filter-list">
                  <li>You&apos;re writing one or two policies a month, on introducer referrals only</li>
                  <li>
                    You&apos;re looking for a single AI chatbot or a plug-in
                    tool, not a system
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
                A 30-minute walkthrough of the system mapped to the lines you
                actually write. You&apos;ll see the intake, the fact-find, the
                market submission prep, and how accounts land ready to quote.
              </p>
            </div>

            <div className="rb-demo-cards" data-rb-fade="3">
              <div className="rb-demo-card">
                <span className="rb-label">What to expect</span>
                <p>
                  A working system mapped to one of the risks you&apos;re
                  currently placing. You&apos;ll see the conversation, the
                  structured data, the carrier-ready submission, and the
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

            <div data-rb-fade="3">
              <BookDemoCTA href="https://cal.eu/rosebudsolutions/30min" />
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
              <InsuranceFAQ />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
