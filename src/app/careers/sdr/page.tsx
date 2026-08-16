import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Sales Development Representative — Rosebud Solutions" },
  description:
    "Remote · Independent contractor · Commission-only · Outbound. High-volume cold calling from a routed ICP list across the UK and US. You qualify prospects and hand sales-ready opportunities to a BDE who closes. No base salary.",
  alternates: { canonical: "/careers/sdr" },
  openGraph: {
    title: "Sales Development Representative — Rosebud Solutions",
    description:
      "Remote · Commission-only · Outbound dialling. Around 250 dials a week; you qualify prospects and hand sales-ready opportunities to a BDE. UK or US, weekday local hours.",
    type: "website",
    url: "https://rosebud.global/careers/sdr",
  },
  twitter: {
    card: "summary",
    title: "Sales Development Representative — Rosebud Solutions",
    description:
      "Remote · Commission-only · Outbound dialling. Around 250 dials a week; you qualify prospects and hand sales-ready opportunities to a BDE. UK or US, weekday local hours.",
  },
};

const JOB_POSTING_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "JobPosting",
  title: "Sales Development Representative",
  description:
    "Outbound Sales Development Representative for Rosebud Solutions. Commission-only. You generate new business through high-volume cold calling from a prospect list routed against our ICP across the UK and US, qualify prospects against our framework, and hand sales-ready opportunities to a Business Development Executive who closes. You work one market in its local 9am–5pm, weekdays only. No base salary.",
  datePosted: "2026-07-11",
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
    "Commission-only, no base salary. 7% standard rate, 10% once you clear 11 qualified handovers in a calendar month. Roughly £350 to £3,500+ per close.",
};

export default function SdrPage() {
  return (
    <main className="rb-job">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JOB_POSTING_SCHEMA) }}
      />

      <header className="rb-job-header">
        <div className="rb-job-container">
          <p className="rb-job-crumb">Careers · Rosebud Solutions</p>
          <h1 className="rb-job-title">Sales Development Representative</h1>
          <p className="rb-job-strap">
            Remote · UK or US market · Independent contractor · Commission-only · Outbound
          </p>
          <div className="rb-job-header-cta">
            <Link href="/careers/sdr/apply" className="rb-job-apply-btn">
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
                This is outbound, and you make the calls. You sit at the front of
                our sales pipeline and generate new business through high-volume
                dialling: every working day you work a prospect list we route to
                you against our ICP, carry the conversations live, qualify
                prospects against our framework, and hand sales-ready
                opportunities to a Business Development Executive who closes. Each
                prospect has already had email, voicemail and SMS from us before
                the phone rings &mdash; so you&rsquo;re not the first touch, but
                you are the first live voice, and the call is yours to run.
                Nothing sits in a queue waiting for you; the pipeline exists
                because you dial.
              </p>
              <p>
                The role is <strong>commission-only</strong>{" "}&mdash; no base
                salary, no hourly pay. You earn a percentage of the setup fee when
                a deal closes; if nothing closes, you&rsquo;re not paid. Full
                earning scenarios are sent before interview.
              </p>
              <p>
                You work <strong>one market, UK or US</strong>, based on the hours
                you can commit &mdash; weekdays only, 9am&ndash;5pm in that
                market&rsquo;s local time, no weekends. Minimum{" "}
                <strong>20 hours a week</strong> on a schedule you choose within
                that window, and plan for around <strong>250 dials a week</strong>{" "}
                inside it.
              </p>
            </section>

            <section className="rb-job-sec">
              <h2 className="rb-job-h2">What you&rsquo;ll do</h2>
              <ul className="rb-job-list">
                <li>
                  Generate new business through proactive outbound prospecting,
                  with high-volume cold calling as the core of the role &mdash;
                  around 250 dials a week &mdash; supported by our existing email,
                  voicemail and SMS sequences, connecting with owner
                  decision-makers and consistently building a healthy sales
                  pipeline.
                </li>
                <li>
                  Qualify prospective clients by understanding their current
                  challenges, business objectives, budgets and decision-making
                  processes, ensuring opportunities meet our qualification
                  framework before progressing them through the sales cycle.
                </li>
                <li>
                  Book high-quality discovery calls and handovers for our Business
                  Development Executives by creating interest, overcoming
                  objections and effectively communicating the value of the AI
                  systems we build and run &mdash; your commission is earned when
                  their deal closes.
                </li>
                <li>
                  Build and nurture relationships with prospects through
                  structured follow-up activity, maintaining regular communication
                  with potential clients and ensuring opportunities continue
                  progressing until they are sales-ready.
                </li>
                <li>
                  Maintain accurate dialler and CRM records and pipeline
                  management, ensuring all prospect activity, conversations and
                  next steps are recorded to provide clear visibility of
                  performance and future opportunities.
                </li>
                <li>
                  Work closely with internal stakeholders to provide market
                  feedback and continuously refine scripts and outreach strategy
                  to improve conversion rates.
                </li>
                <li>
                  Achieve and exceed individual KPIs &mdash; your weekly dial
                  volume and the handover target agreed at interview &mdash;
                  operating inside your market&rsquo;s weekday 9&ndash;5 window in
                  a high-performance environment where results are recognized and
                  rewarded.
                </li>
              </ul>
            </section>

            <section className="rb-job-sec">
              <h2 className="rb-job-h2">Required experience</h2>
              <ul className="rb-job-list">
                <li>
                  <strong>
                    At least 6 months of cold outbound dialling experience &mdash;
                    this is the key requirement.
                  </strong>{" "}
                  You&rsquo;ve held an SDR, appointment setter, telesales or
                  similar outbound calling role where success was measured against
                  commercial targets, and you&rsquo;re confident making
                  high-volume cold calls, engaging prospects and overcoming
                  objections to generate opportunities.
                </li>
                <li>
                  Fluent, clear spoken English with excellent verbal and written
                  communication skills &mdash; you&rsquo;ll be on the phone with UK
                  or US business owners all day, and the ability to quickly build
                  credibility and establish rapport is essential.
                </li>
                <li>
                  Strong working understanding of AI and automation, with the
                  ability to speak credibly about the systems we build and run.
                </li>
                <li>
                  Strong relationship-building abilities with a consultative
                  approach to understanding client needs and identifying
                  commercial opportunities.
                </li>
                <li>
                  Highly organized with excellent time management skills, capable
                  of managing follow-ups, pipeline and priorities simultaneously
                  without being chased.
                </li>
                <li>
                  Self-motivated, resilient and target-driven, with the ability to
                  remain positive and consistent in a high-activity,
                  commission-only environment &mdash; or with the runway to ramp
                  into one.
                </li>
                <li>
                  Commercially minded with a strong desire to develop a long-term
                  career within sales and business development.
                </li>
                <li>
                  Computer, headset, stable internet and a quiet calling
                  environment, with the ability to operate as a self-employed
                  contractor and call inside UK or US local business hours.
                </li>
              </ul>
            </section>

            <section className="rb-job-sec">
              <h2 className="rb-job-h2">Compensation</h2>
              <p>
                Commission-only. You earn on the setup fee once the client pays.
                No clawback.
              </p>
              <ul className="rb-job-list">
                <li><strong>7%</strong> standard rate</li>
                <li><strong>10%</strong> once you clear 11 qualified handovers in a calendar month</li>
              </ul>
              <p>
                Setup fees run £5,000 to £35,000+ per deal, so commission runs
                roughly <strong>£350 to £3,500+ per close</strong>. Full earning
                scenarios are in the commission proposal we send before interview.
              </p>
            </section>

            <section className="rb-job-sec">
              <h2 className="rb-job-h2">What we provide</h2>
              <ul className="rb-job-list">
                <li>A dialler loaded with a prospect list routed against our ICP</li>
                <li>Tested scripts and a qualification framework</li>
                <li>Shadow calls with existing BDEs during onboarding</li>
                <li>Direct access to the CEO in your first four weeks</li>
              </ul>
            </section>

            <section className="rb-job-sec">
              <h2 className="rb-job-h2">Details</h2>
              <ul className="rb-job-list">
                <li><strong>Location:</strong> Remote</li>
                <li><strong>Markets:</strong> UK or US &mdash; you work one, in its local 9am&ndash;5pm, weekdays only</li>
                <li><strong>Type:</strong> Outbound, independent contractor, commission-only, no base salary</li>
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
              <Link href="/careers/sdr/apply" className="rb-job-apply-btn rb-job-apply-btn-full">
                Start application
              </Link>
              <dl className="rb-job-aside-facts">
                <dt>Role</dt>
                <dd>Sales Development Representative (outbound)</dd>
                <dt>Pay</dt>
                <dd>Commission-only, no base · 7% → 10%</dd>
                <dt>Location</dt>
                <dd>Remote</dd>
                <dt>Hours</dt>
                <dd>UK or US local business hours, Mon–Fri 9–5</dd>
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
