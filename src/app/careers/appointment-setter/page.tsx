import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Appointment Setter — Rosebud Solutions",
  description:
    "Remote · Independent contractor · Commission-only · Outbound. You dial prospects across the UK and US, qualify them, and hand to a BDE to close. No base salary.",
  alternates: { canonical: "/careers/appointment-setter" },
  openGraph: {
    title: "Appointment Setter — Rosebud Solutions",
    description:
      "Remote · Commission-only · Outbound dialling. You make the calls and hand qualified prospects to a BDE. UK and US, weekday local hours.",
    type: "website",
    url: "https://rosebud.global/careers/appointment-setter",
  },
  twitter: {
    card: "summary",
    title: "Appointment Setter — Rosebud Solutions",
    description:
      "Remote · Commission-only · Outbound dialling. You make the calls and hand qualified prospects to a BDE. UK and US, weekday local hours.",
  },
};

const JOB_POSTING_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "JobPosting",
  title: "Appointment Setter",
  description:
    "Outbound appointment setter for Rosebud Solutions. Commission-only. You dial prospects from a routed list across the UK and US, run first-touch and discovery calls, and hand qualified prospects to a BDE for the close. You work one market in its local 9am–5pm, weekdays only. No base salary.",
  datePosted: "2026-06-16",
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
    "Commission-only, no base salary. 7% standard rate, 10% from the 11th qualified handover in a calendar month.",
};

export default function AppointmentSetterPage() {
  return (
    <main className="rb-job">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JOB_POSTING_SCHEMA) }}
      />

      <header className="rb-job-header">
        <div className="rb-job-container">
          <p className="rb-job-crumb">Careers · Rosebud Solutions</p>
          <h1 className="rb-job-title">Appointment Setter</h1>
          <p className="rb-job-strap">
            Remote · Independent contractor · Commission-only · Outbound · UK &amp; US
          </p>
          <div className="rb-job-header-cta">
            <Link href="/careers/appointment-setter/apply" className="rb-job-apply-btn">
              Apply for this role
            </Link>
          </div>
        </div>
      </header>

      <div className="rb-job-body">
        <div className="rb-job-container rb-job-cols">
          <article className="rb-job-main">
            <section className="rb-job-notice" aria-label="Before you apply">
              <h2 className="rb-job-notice-title">Before you apply</h2>
              <p className="rb-job-notice-lead">
                Three things catch people out at the final stage. Read them
                now, because they decide whether this role is for you.
              </p>
              <ol>
                <li>
                  <strong>This is outbound. You make the calls.</strong> Every
                  working day you dial prospects from a list we route to you and
                  carry the conversation live. This is not inbound, so nothing
                  waits in a queue for you. Each prospect has already had email,
                  voicemail and SMS from us before the phone rings, so this is
                  not a first touch, but you are the first live person they speak
                  to and the call is yours to run.
                </li>
                <li>
                  <strong>Commission-only. No base salary, no hourly pay.</strong>{" "}
                  You earn a percentage of the setup fee when a deal closes. If
                  nothing closes, you are not paid. Full earning scenarios come
                  before interview.
                </li>
                <li>
                  <strong>
                    You work one market, UK or US, based on the hours you can
                    commit.
                  </strong>{" "}
                  Weekdays only, 9am to 5pm in that market&rsquo;s local time
                  zone. No weekends. You tell us which window you can cover, we
                  assign you to it, and your dial target sits inside it. We ask
                  for at least 20 hours a week.
                </li>
              </ol>
              <p className="rb-job-notice-close">
                If all three work for you, apply. If any one of them is a
                dealbreaker, this is the moment to know.
              </p>
            </section>

            <p className="rb-job-intro">
              Rosebud Solutions is the consultancy arm of Rosebud Global Ltd.
              We build and run custom AI-powered sales and operations systems
              for owner-operated SMEs across Aesthetics, Mortgage, Legal,
              Property, Trades, Recruitment, and independent Hospitality.
            </p>

            <section className="rb-job-sec">
              <h2 className="rb-job-h2">The role</h2>
              <p>
                You sit at the front of our sales pipeline and you do the
                dialling. This is outbound. You work a prospect list we route
                to you against our ICP, make the calls yourself, and book
                discovery calls with the owners who fit. Each prospect has
                already moved through our outreach sequence before you call, so
                you are the first live voice, not the first touch.
              </p>
              <p>
                The flow: a short first-touch call to confirm fit, then a 20 to
                30 minute discovery call to qualify. Qualified prospects go to a
                Business Development Executive who handles the close. You&rsquo;re
                paid when the deal closes.
              </p>
              <p className="rb-job-callout">
                Plan for around <strong>250 dials a week</strong>, roughly a{" "}
                <strong>20-hour weekly minimum</strong>.
              </p>
            </section>

            <section className="rb-job-sec">
              <h2 className="rb-job-h2">What you&rsquo;ll do</h2>
              <ul className="rb-job-list">
                <li>Dial prospects from the list we route to you</li>
                <li>Run first-touch calls to confirm fit and book discovery calls</li>
                <li>Run discovery calls and qualify against our framework</li>
                <li>Hand qualified prospects to a BDE for the close</li>
                <li>Hit the weekly handover target agreed at interview</li>
              </ul>
            </section>

            <section className="rb-job-sec">
              <h2 className="rb-job-h2">Markets and hours</h2>
              <p>
                We sell into the UK and the US. You work one of them, not both.
                You tell us at interview which market&rsquo;s hours you can
                commit to, and you call weekdays only, 9am to 5pm in that
                market&rsquo;s local time. No calling outside those hours, no
                weekends.
              </p>
              <p>
                You give at least 20 hours a week inside that window, on a
                schedule you choose. Your dial target sits within those hours.
              </p>
            </section>

            <section className="rb-job-sec">
              <h2 className="rb-job-h2">Compensation</h2>
              <p>
                Commission-only. There is no base salary and no hourly pay. You
                earn on the setup fee once the client pays. No clawback.
              </p>
              <ul className="rb-job-list">
                <li><strong>7%</strong> standard rate</li>
                <li><strong>10%</strong> once you clear 11 qualified handovers in a calendar month</li>
              </ul>
              <p>
                Setup fees run £5,000 to £35,000+ per deal, so commission runs
                roughly £350 to £3,500+ per close. Full earning scenarios are in
                the commission proposal we send before interview.
              </p>
            </section>

            <section className="rb-job-sec">
              <h2 className="rb-job-h2">What you&rsquo;ll need</h2>
              <ul className="rb-job-list">
                <li>6+ months B2B sales, SDR, or outbound calling/setter experience</li>
                <li>Confident on outbound calls and opening budget conversations with business owners</li>
                <li>Comfortable on commission-only, or with the runway to ramp into it</li>
                <li>Computer, headset, stable internet, and a quiet calling environment</li>
                <li>Able to call inside UK and US local business hours</li>
                <li>Able to operate as a self-employed contractor</li>
              </ul>
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
                <li><strong>Markets:</strong> UK or US. You work one market in its local 9am–5pm, weekdays only</li>
                <li><strong>Type:</strong> Outbound, independent contractor, commission-only, no base salary</li>
                <li><strong>Intake:</strong> Rolling. We onboard when fit is clear.</li>
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
              <Link href="/careers/appointment-setter/apply" className="rb-job-apply-btn rb-job-apply-btn-full">
                Start application
              </Link>
              <dl className="rb-job-aside-facts">
                <dt>Role</dt>
                <dd>Appointment Setter (outbound)</dd>
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
