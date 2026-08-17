import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Account Executive — Rosebud Solutions" },
  description:
    "Remote · Independent contractor · Commission-only · Closing. Run the demo, close in the same session, and manage the client after they sign. No base salary.",
  alternates: { canonical: "/careers/ae" },
  openGraph: {
    title: "Account Executive — Rosebud Solutions",
    description:
      "Remote · Commission-only · Full-cycle closing. Demos are fed to you by SDRs. You close, you retain, and you earn 15–20% of every client's monthly retainer, every month.",
    type: "website",
    url: "https://rosebud.global/careers/ae",
  },
  twitter: {
    card: "summary",
    title: "Account Executive — Rosebud Solutions",
    description:
      "Remote · Commission-only · Full-cycle closing. Demos are fed to you by SDRs. You close, you retain, and you earn 15–20% of every client's monthly retainer, every month.",
  },
};

const JOB_POSTING_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "JobPosting",
  title: "Account Executive",
  description:
    "Full-cycle Account Executive for Rosebud Solutions. Commission-only. You run demos as working sessions, soft-qualify live, pitch and close in the same session, then account-manage every client you sign for the life of the relationship. Demos reach you booked by SDRs or sourced from your own network. You work one market, UK or US, in its local business hours, weekdays only. No base salary; you earn a recurring percentage of each client's monthly retainer.",
  datePosted: "2026-07-25",
  employmentType: "CONTRACTOR",
  hiringOrganization: {
    "@type": "Organization",
    name: "Rosebud Solutions",
    sameAs: "https://rosebud.global",
    logo: "https://rosebud.global/rosebud-icon.png",
  },
  jobLocationType: "TELECOMMUTE",
  applicantLocationRequirements: [
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "United States" },
  ],
  baseSalary: {
    "@type": "MonetaryAmount",
    currency: "GBP",
    value: { "@type": "QuantitativeValue", value: 0, unitText: "MONTH" },
  },
  jobBenefits:
    "Commission-only, no base salary. 15% standard rate on each client's monthly retainer, rising to 20% once monthly new MRR crosses £15,000, plus a +5% self-sourced trail and 5–10% retention commission from month seven. Roughly £99 to £980 per client, per month, for up to six months.",
};

export default function AePage() {
  return (
    <main className="rb-job">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JOB_POSTING_SCHEMA) }}
      />

      <header className="rb-job-header">
        <div className="rb-job-container">
          <p className="rb-job-crumb">Careers · Rosebud Solutions</p>
          <h1 className="rb-job-title">Account Executive</h1>
          <p className="rb-job-strap">
            Remote · UK or US market · Independent contractor · Commission-only · Full-cycle closing
          </p>
          <div className="rb-job-header-cta">
            <Link href="/careers/ae/apply" className="rb-job-apply-btn">
              Apply for this role
            </Link>
          </div>
        </div>
      </header>

      <div className="rb-job-body">
        <div className="rb-job-container rb-job-cols">
          <article className="rb-job-main">
            <section className="rb-job-sec">
              <h2 className="rb-job-h2">About Rosebud Solutions</h2>
              <p>
                Rosebud Solutions owns the space between demand and revenue. We
                build one system that answers every inquiry in seconds, scores it
                against a business&rsquo;s own rules, books it into their diary,
                and works it again when it goes quiet, then run that system for
                them every day, connected to the CRM and calendars they already
                use. The rest of the market sells software and wishes you luck; we
                took the harder route on purpose and operate the whole intake
                layer ourselves, so an owner&rsquo;s team is free for the work
                only people can do. Our clients are owner-operated SMEs across
                Insurance, Dental, Aesthetic &amp; Private Healthcare, Real Estate,
                Mortgage &amp; Lending, Trades &amp; Home Services, and Family Law
                &amp; Consumer Legal.
              </p>
            </section>

            <section className="rb-job-sec">
              <h2 className="rb-job-h2">The role</h2>
              <p>
                You sit at the close end of the pipeline. Demos reach you two ways
                &mdash; booked for you by an SDR, or sourced by you from your own
                network &mdash; and you run the demo: soft-qualify the
                prospect live, surface where their team is
                bottlenecked, show how Rosebud fits or doesn&rsquo;t, then pitch
                and close in the same session. There is no separate discovery
                call. You own the pricing conversation, the close and the
                contract.
              </p>
              <p>
                After a client signs, you keep them. You nurture and
                account-manage the client for the life of the relationship, which
                is where the second half of the job sits &mdash; your commission
                is paid only for the months a client stays, so retention
                isn&rsquo;t someone else&rsquo;s problem downstream. You close, and
                you retain.
              </p>
              <p>
                The role is <strong>commission-only</strong>{" "}&mdash; no base
                salary, no hourly pay. You earn a percentage of each
                client&rsquo;s <strong>monthly subscription</strong>, paid every
                month for up to six months per client, on the deals you close.
                Because it recurs and stacks as your book builds, it does the job
                a base would once you&rsquo;re a few months in. If nothing closes,
                you&rsquo;re not paid. Full earning scenarios are in the commission
                proposal we send before interview.
              </p>
              <p>
                You work <strong>one market, UK or US</strong>, in that
                market&rsquo;s local business hours, weekdays only. Plan for a
                minimum of <strong>25 hours a week</strong>{" "}&mdash; reachable
                across the working day so the demos SDRs book actually land
                &mdash; running around <strong>15&ndash;20 demos a week</strong>{" "}
                once you&rsquo;re ramped.
              </p>
            </section>

            <section className="rb-job-sec">
              <h2 className="rb-job-h2">What you&rsquo;ll do</h2>
              <ul className="rb-job-list">
                <li>
                  Run demos as working sessions &mdash; soft-qualify live,
                  diagnose where the prospect&rsquo;s team is losing time and
                  leads, and show how the system we&rsquo;d build fits their
                  operation or doesn&rsquo;t.
                </li>
                <li>
                  Pitch and close inside the same session, owning the pricing
                  conversation end to end across our published tiers and add-ons,
                  without a separate discovery call.
                </li>
                <li>
                  Source your own demos alongside the SDR-booked pipeline, working
                  your network for opportunities that pay an additional trail on
                  top of your close commission.
                </li>
                <li>
                  Own the contract through to signature, escalating anything above
                  Scale&rsquo;s capacity to the team as an enterprise-scale account
                  rather than quoting it yourself.
                </li>
                <li>
                  Account-manage every client you close &mdash; onboarding,
                  check-ins, structured follow-up and problem-solving &mdash; so
                  the client stays and your commission keeps paying.
                </li>
                <li>
                  Maintain accurate CRM records and pipeline management. Commission
                  is paid only on clients logged and attributed to you; our pricing
                  is public, so an unlogged lead that self-subscribes has no record
                  connecting it to you.
                </li>
                <li>
                  Feed market intelligence back to the team &mdash; objections,
                  pricing friction, tier fit &mdash; so we can refine the pitch,
                  the tiers and the qualification framework.
                </li>
                <li>
                  Achieve and exceed individual targets, including the
                  £15,000 monthly new-MRR threshold that moves your rate from 15%
                  to 20%.
                </li>
              </ul>
            </section>

            <section className="rb-job-sec">
              <h2 className="rb-job-h2">Required experience</h2>
              <ul className="rb-job-list">
                <li>
                  <strong>
                    At least 12 months of B2B closing experience &mdash; this is
                    the key requirement.
                  </strong>{" "}
                  You&rsquo;ve run your own demos or sales calls and closed them,
                  owning deals from pitch to signature against commercial targets
                  &mdash; not just booked meetings for someone else &mdash; with
                  closed deals worth at least <strong>£5,000</strong> in annual or
                  total contract value. Two-plus years and recurring or
                  subscription deals preferred.
                </li>
                <li>
                  Comfortable running a consultative demo live: diagnosing a
                  business&rsquo;s problem on the call, handling pricing objections,
                  and asking for the close in the same session.
                </li>
                <li>
                  Fluent, clear spoken English with excellent verbal and written
                  communication &mdash; you&rsquo;ll be in front of UK or US
                  business owners every day and need to build credibility fast.
                </li>
                <li>
                  Strong working understanding of AI and automation, with the
                  ability to speak credibly and specifically about the systems we
                  build and run.
                </li>
                <li>
                  Account-management instincts. You&rsquo;ll be judged on whether
                  clients stay, not just whether they sign.
                </li>
                <li>
                  Highly organized, capable of running a live pipeline and an
                  existing book of clients at the same time without being chased.
                </li>
                <li>
                  Self-motivated, resilient and target-driven, with the ability to
                  stay consistent in a commission-only environment &mdash; or the
                  runway to ramp into one.
                </li>
                <li>
                  Computer, headset, stable internet and a quiet, presentable
                  environment for video demos, with the ability to operate as a
                  self-employed contractor.
                </li>
              </ul>
            </section>

            <section className="rb-job-sec">
              <h2 className="rb-job-h2">Compensation</h2>
              <p>
                Commission-only. You earn a percentage of each client&rsquo;s{" "}
                <strong>monthly retainer</strong>, paid every month the client
                pays, for up to six months per client. No penalty if a deal
                doesn&rsquo;t close.
              </p>
              <ul className="rb-job-list">
                <li><strong>15%</strong> standard rate</li>
                <li>
                  <strong>20%</strong> on every deal you closed that month, once
                  your new MRR for the month crosses <strong>£15,000</strong>{" "}
                  &mdash; including the deals that took you there. Once unlocked,
                  that rate is fixed for each of those clients&rsquo; full
                  six-month window. Counters reset on the first of the month.
                </li>
                <li>
                  <strong>+5%</strong> per month for twelve months on any client
                  you sourced yourself, stacked on top of your close commission.
                </li>
                <li>
                  <strong>5%</strong> per month from month seven onward, for as
                  long as you keep managing the account and the client stays. On a
                  self-sourced client, months seven to twelve pay <strong>10%</strong>.
                </li>
                <li>
                  <strong>Annual upfront deals</strong>{" "}pay as a single lump sum at
                  signing: 20&ndash;25% of the full annual contract value, plus the
                  self-sourced trail on the annual value where it applies.
                </li>
              </ul>
              <p>
                Retainers run £660 to £4,900+ a month, so a single client pays you
                roughly <strong>£99 to £980 every month</strong>{" "}for up to six
                months. Close a Grow client at 20% and that&rsquo;s £330 a month; a
                Scale client is £980 a month, while every other active client on
                your book is paying you at the same time. Full earning scenarios,
                tier tables and worked examples are in the commission proposal we
                send before interview.
              </p>
            </section>

            <section className="rb-job-sec">
              <h2 className="rb-job-h2">What we provide</h2>
              <ul className="rb-job-list">
                <li>
                  Demos booked for you by multiple SDRs, so you close from a much
                  larger pool than any single setter generates
                </li>
                <li>
                  A tested demo-to-close framework, pricing structure and public
                  tier pricing you don&rsquo;t have to negotiate from scratch
                </li>
                <li>Shadow demos during onboarding</li>
                <li>Direct access to the CEO in your first four weeks</li>
              </ul>
            </section>

            <section className="rb-job-sec">
              <h2 className="rb-job-h2">Details</h2>
              <ul className="rb-job-list">
                <li><strong>Location:</strong> Remote</li>
                <li><strong>Markets:</strong> UK or US &mdash; you work one, in its local business hours, weekdays only</li>
                <li><strong>Type:</strong> Full-cycle closing, independent contractor, commission-only, no base salary</li>
                <li><strong>Intake:</strong> Rolling &mdash; we onboard when fit is clear</li>
                <li><strong>Apply:</strong> Submit the application form. Applications reviewed weekly.</li>
              </ul>
            </section>
          </article>

          <aside className="rb-job-aside">
            <div className="rb-job-aside-card">
              <p className="rb-job-aside-eyebrow">Apply now</p>
              <p className="rb-job-aside-body">
                Applications reviewed weekly.
              </p>
              <Link href="/careers/ae/apply" className="rb-job-apply-btn rb-job-apply-btn-full">
                Start application
              </Link>
              <dl className="rb-job-aside-facts">
                <dt>Role</dt>
                <dd>Account Executive (full-cycle close and retain)</dd>
                <dt>Pay</dt>
                <dd>Commission-only, no base · 15% → 20% recurring, plus 5% trails</dd>
                <dt>Location</dt>
                <dd>Remote</dd>
                <dt>Hours</dt>
                <dd>UK or US local business hours, Mon–Fri</dd>
                <dt>Status</dt>
                <dd>Self-employed contractor</dd>
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
