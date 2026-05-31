import type { Metadata } from "next";
import Link from "next/link";
import HiringStatusOverlay from "@/components/HiringStatusOverlay";

export const metadata: Metadata = {
  title: "Appointment Setter — Rosebud Solutions",
  description:
    "Remote · Independent Contractor · Commission-Only · Rolling Intake. Work warm leads from our in-house dialler team and hand qualified prospects to a BDE for the close.",
  alternates: { canonical: "/careers/appointment-setter" },
  openGraph: {
    title: "Appointment Setter — Rosebud Solutions",
    description:
      "Remote · Commission-only. Warm leads from our in-house dialler team. Hand qualified prospects to a BDE for the close.",
    type: "website",
    url: "https://rosebud.global/careers/appointment-setter",
  },
  twitter: {
    card: "summary",
    title: "Appointment Setter — Rosebud Solutions",
    description:
      "Remote · Commission-only. Warm leads from our in-house dialler team. Hand qualified prospects to a BDE for the close.",
  },
};

const JOB_POSTING_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "JobPosting",
  title: "Appointment Setter",
  description:
    "Appointment setter for Rosebud Solutions. You work warm leads from the in-house dialler team, run first-touch and discovery calls, and hand qualified prospects to a BDE for the close. Commission-only, rolling intake.",
  datePosted: "2026-05-28",
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
    "Commission-only. 7% standard rate, 10% from the 11th qualified handover in a calendar month. Warm leads provided.",
};

export default function AppointmentSetterPage() {
  return (
    <main className="rb-job">
      <HiringStatusOverlay />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JOB_POSTING_SCHEMA) }}
      />

      <header className="rb-job-header">
        <div className="rb-job-container">
          <p className="rb-job-crumb">Careers · Rosebud Solutions</p>
          <h1 className="rb-job-title">Appointment Setter</h1>
          <p className="rb-job-strap">
            Remote · Independent Contractor · Commission-Only · Rolling Intake.
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
            <p className="rb-job-intro">
              Rosebud Solutions is the consultancy arm of Rosebud Global Ltd.
              We build and run custom AI-powered sales and operations systems
              for owner-operated SMEs across Aesthetics, Mortgage, Legal,
              Property, Trades, Recruitment, and independent Hospitality.
            </p>

            <section className="rb-job-sec">
              <h2 className="rb-job-h2">The role</h2>
              <p>
                You sit at the front of our sales pipeline. Our in-house
                dialler team produces warm leads. They land in your queue.
                You run a short first-touch call to confirm fit, then a 20
                to 30 minute discovery call to qualify. Qualified prospects
                go to a Business Development Executive who handles the
                close. You&rsquo;re paid when the deal closes.
              </p>
              <p className="rb-job-callout">
                This role expects <strong>250 calls per week</strong>, which
                is a minimum <strong>20-hour weekly commitment</strong>.
              </p>
            </section>

            <section className="rb-job-sec">
              <h2 className="rb-job-h2">What you&rsquo;ll do</h2>
              <ul className="rb-job-list">
                <li>Work warm leads from our in-house dialler queue</li>
                <li>Run first-touch calls to confirm fit and book discovery calls</li>
                <li>Run discovery calls and qualify prospects against our framework</li>
                <li>Hand qualified prospects to a BDE for the close</li>
                <li>Hit weekly handover targets agreed at interview</li>
              </ul>
            </section>

            <section className="rb-job-sec">
              <h2 className="rb-job-h2">What you&rsquo;ll need</h2>
              <ul className="rb-job-list">
                <li>12+ months B2B sales, SDR, or setter experience</li>
                <li>Confident running 25-minute calls with business owners and opening budget conversations</li>
                <li>Comfortable in a commission-only structure, or with the runway to ramp into one</li>
                <li>Computer, headset, stable internet, and a quiet calling environment</li>
                <li>Workable overlap with UK and US East Coast calling hours</li>
                <li>Able to operate as a self-employed contractor</li>
              </ul>
            </section>

            <section className="rb-job-sec">
              <h2 className="rb-job-h2">Compensation</h2>
              <p>
                Commission-only, paid on the setup fee once the client pays.
                No clawback.
              </p>
              <ul className="rb-job-list">
                <li><strong>7%</strong> standard rate</li>
                <li><strong>10%</strong> once you clear 11 qualified handovers in a calendar month</li>
              </ul>
              <p>
                Setup fees run £5,000 to £35,000+ per deal, so commission
                runs roughly £350 to £3,500+ per close. Full earning
                scenarios are in the commission proposal we send before
                interview.
              </p>
            </section>

            <section className="rb-job-sec">
              <h2 className="rb-job-h2">What we provide</h2>
              <ul className="rb-job-list">
                <li>A custom dialler with warm leads pre-routed against our ICP</li>
                <li>Tested scripts and a qualification framework</li>
                <li>Shadow calls with existing BDEs during onboarding</li>
                <li>Direct access to the CEO in your first four weeks</li>
              </ul>
            </section>

            <section className="rb-job-sec">
              <h2 className="rb-job-h2">Details</h2>
              <ul className="rb-job-list">
                <li><strong>Location:</strong> Remote, with UK and US East Coast calling overlap</li>
                <li><strong>Type:</strong> Independent contractor, commission-only</li>
                <li><strong>Intake:</strong> Rolling — we onboard when fit is clear</li>
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
                <dd>Appointment Setter</dd>
                <dt>Pay</dt>
                <dd>Commission-only · 7% → 10%</dd>
                <dt>Location</dt>
                <dd>Remote</dd>
                <dt>Hours</dt>
                <dd>UK + US East Coast overlap</dd>
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
