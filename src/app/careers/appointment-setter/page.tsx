import type { Metadata } from "next";
import ApplicationForm from "./ApplicationForm";

export const metadata: Metadata = {
  title: "Appointment Setter — Rosebud Solutions",
  description:
    "Remote · Independent Contractor · 100% Commission · Rolling Intake. Work warm leads from our in-house dialler team and run qualified discovery handovers to BDEs.",
  alternates: { canonical: "/careers/appointment-setter" },
  // Not linked from nav or footer — but indexable so the right candidates can find it via search.
  openGraph: {
    title: "Appointment Setter — Rosebud Solutions",
    description:
      "Remote · 100% commission. Warm leads from our in-house dialler team. Discovery handovers to BDEs.",
    type: "website",
    url: "https://rosebud.global/careers/appointment-setter",
  },
  twitter: {
    card: "summary",
    title: "Appointment Setter — Rosebud Solutions",
    description:
      "Remote · 100% commission. Warm leads from our in-house dialler team. Discovery handovers to BDEs.",
  },
};

const JOB_POSTING_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "JobPosting",
  title: "Appointment Setter",
  description:
    "Appointment setter for Rosebud Solutions, a UK business systems consultancy. You work warm leads from the in-house dialler team, run qualification calls, and hand qualified discovery prospects to a Business Development Executive for closing. 100% commission, rolling intake.",
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
    value: {
      "@type": "QuantitativeValue",
      value: 0,
      unitText: "MONTH",
    },
  },
  jobBenefits:
    "100% commission. 7% standard rate, 10% on the 11th qualified handover in a calendar month. Warm leads provided.",
};

export default function AppointmentSetterPage() {
  return (
    <main className="rb-content rb-career">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JOB_POSTING_SCHEMA) }}
      />

      {/* ───────────────────── Hero / role header ───────────────────── */}
      <section className="rb-sec rb-career-hero" data-rb-sec aria-label="Role overview">
        <div className="rb-topo rb-topo-6" aria-hidden="true">
          <svg viewBox="0 0 360 260" preserveAspectRatio="none">
            <path className="rb-bright" d="M 0 210 C 40 160, 90 90, 124 128 C 144 150, 156 114, 178 112 C 200 110, 218 146, 242 128 C 264 112, 296 160, 360 200" />
            <path d="M 0 224 C 42 176, 94 106, 128 140 C 146 158, 160 124, 180 122 C 204 120, 220 154, 246 138 C 268 124, 300 172, 360 214" />
            <path d="M 0 238 C 46 196, 98 124, 132 154 C 150 170, 164 134, 184 132 C 206 130, 222 162, 250 146 C 272 134, 304 184, 360 226" />
            <path className="rb-bright" d="M 0 250 C 50 214, 102 140, 136 168 C 154 182, 168 146, 188 144 C 208 142, 226 170, 254 154 C 278 142, 308 194, 360 236" />
          </svg>
        </div>
        <div className="rb-wrap">
          <div className="rb-head">
            <p className="rb-eyebrow" data-rb-fade="0">Careers · Rosebud Solutions</p>
            <h1 className="rb-h2" data-rb-fade="1">
              Appointment Setter, <em>Rosebud Solutions.</em>
            </h1>
            <p className="rb-sub" data-rb-fade="2">
              Remote · Independent Contractor · 100% Commission · Rolling Intake.
            </p>
          </div>

          <ul className="rb-career-tags" data-rb-fade="3">
            <li>Warm leads from our in-house dialler</li>
            <li>Discovery qualification, not closing</li>
            <li>UK + US East Coast overlap</li>
            <li>Self-employed contractor</li>
          </ul>

          <div className="rb-career-apply-link" data-rb-fade="3">
            <a href="#apply" className="rb-book-link">
              <span className="rb-book-link-label">Apply</span>
              <span className="rb-book-link-arrow" aria-hidden="true">
                <svg viewBox="0 0 36 12" width="36" height="12">
                  <path className="rb-book-link-shaft" d="M0 6 L28 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none" />
                  <path className="rb-book-link-head" d="M22 1.5 L28 6 L22 10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </span>
              <span className="rb-book-link-underline" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* ───────────────────── About Rosebud Solutions ───────────────────── */}
      <section className="rb-sec" data-rb-sec aria-label="About Rosebud Solutions">
        <div className="rb-wrap">
          <div className="rb-head">
            <p className="rb-eyebrow" data-rb-fade="0">
              <span className="rb-num">I</span>About Rosebud Solutions
            </p>
            <h2 className="rb-h2" data-rb-fade="1">
              The consultancy arm of <em>Rosebud Global Ltd.</em>
            </h2>
          </div>
          <div className="rb-career-body" data-rb-fade="2">
            <p>
              We design, build, and run custom AI-powered sales and operations
              systems for owner-operated SMEs across Aesthetics, Mortgage,
              Legal, Property, Trades, Recruitment, and independent Hospitality.
            </p>
            <p>
              Engagements range from £5,000 to £35,000+ setup fees plus monthly
              retainers.
            </p>
          </div>
        </div>
      </section>

      {/* ───────────────────── The Role ───────────────────── */}
      <section className="rb-sec" data-rb-sec aria-label="The role">
        <div className="rb-wrap">
          <div className="rb-head">
            <p className="rb-eyebrow" data-rb-fade="0">
              <span className="rb-num">II</span>The role
            </p>
            <h2 className="rb-h2" data-rb-fade="1">
              You sit at the front of <em>our sales pipeline.</em>
            </h2>
          </div>
          <div className="rb-career-body" data-rb-fade="2">
            <p>
              Our in-house dialler team produces warm leads against a defined
              ICP — they land in your queue. You run two calls on each: a short
              first-touch to confirm fit, then a 20–30 minute discovery to
              qualify. Prospects who pass go to a Business Development
              Executive for closing.
            </p>
            <p>
              <em>You&apos;re paid when the deal closes.</em>
            </p>
            <p className="rb-career-callout">
              You&apos;re not closing the deal. You&apos;re not pitching pricing.
              Your output is qualified discovery handovers.
            </p>
          </div>
        </div>
      </section>

      {/* ───────────────────── What You'll Do ───────────────────── */}
      <section className="rb-sec" data-rb-sec aria-label="What you'll do">
        <div className="rb-wrap">
          <div className="rb-head">
            <p className="rb-eyebrow" data-rb-fade="0">
              <span className="rb-num">III</span>What you&rsquo;ll do
            </p>
            <h2 className="rb-h2" data-rb-fade="1">
              Run the front of the funnel <em>end-to-end.</em>
            </h2>
          </div>
          <ul className="rb-career-list" data-rb-fade="2">
            <li>Work warm leads from our in-house dialler queue</li>
            <li>Run first-touch calls to confirm vertical fit, decision-maker status, and operational pain</li>
            <li>Book qualified prospects onto your own discovery calendar</li>
            <li>Run 20–30 minute discovery calls</li>
            <li>Hand qualified prospects to a BDE for the close</li>
            <li>Track activity in our pipeline tools</li>
            <li>Hit weekly handover targets agreed at interview</li>
          </ul>
        </div>
      </section>

      {/* ───────────────────── Qualification standard ───────────────────── */}
      <section className="rb-sec" data-rb-sec aria-label="The qualification standard">
        <div className="rb-wrap">
          <div className="rb-head">
            <p className="rb-eyebrow" data-rb-fade="0">
              <span className="rb-num">IV</span>The qualification standard
            </p>
            <h2 className="rb-h2" data-rb-fade="1">
              A handover only counts if <em>all five</em> are confirmed on the call.
            </h2>
            <p className="rb-sub" data-rb-fade="2">
              Before you place a prospect on a BDE&rsquo;s calendar.
            </p>
          </div>
          <ol className="rb-criteria" data-rb-fade="3">
            <li>
              <span className="rb-criteria-num">01</span>
              <div>
                <h3>Decision-maker confirmed</h3>
                <p>Or commitment to bring them to the close call.</p>
              </div>
            </li>
            <li>
              <span className="rb-criteria-num">02</span>
              <div>
                <h3>Serviced vertical</h3>
                <p>
                  Aesthetics, Mortgage, Legal, Property, Trades, Recruitment,
                  or independent Hospitality.
                </p>
              </div>
            </li>
            <li>
              <span className="rb-criteria-num">03</span>
              <div>
                <h3>Stated operational pain</h3>
                <p>Clearly articulated — something we can address.</p>
              </div>
            </li>
            <li>
              <span className="rb-criteria-num">04</span>
              <div>
                <h3>Confirmed attendance intent</h3>
                <p>At the close call. Not &ldquo;maybe&rdquo;.</p>
              </div>
            </li>
            <li>
              <span className="rb-criteria-num">05</span>
              <div>
                <h3>Budget conversation opened</h3>
                <p>They understand this is a paid engagement.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* ───────────────────── What success looks like ───────────────────── */}
      <section className="rb-sec" data-rb-sec aria-label="What success looks like">
        <div className="rb-wrap">
          <div className="rb-head">
            <p className="rb-eyebrow" data-rb-fade="0">
              <span className="rb-num">V</span>What success looks like
            </p>
            <h2 className="rb-h2" data-rb-fade="1">
              Ramp over <em>ninety days.</em>
            </h2>
          </div>
          <div className="rb-ramp" data-rb-fade="2">
            <article className="rb-ramp-card">
              <p className="rb-ramp-window">First 30 days</p>
              <p>
                Onboarded onto the dialler, scripts, and qualification framework.
                Running first-touch calls from week two. First discovery calls
                on your calendar.
              </p>
            </article>
            <article className="rb-ramp-card">
              <p className="rb-ramp-window">First 60 days</p>
              <p>
                Producing 8–12 qualified discovery handovers per month. First
                closes moving through the pipeline. First commission paid.
              </p>
            </article>
            <article className="rb-ramp-card">
              <p className="rb-ramp-window">First 90 days</p>
              <p>
                Consistently clearing 11+ qualified handovers per month and
                locking the 10% rate. Personal close-call show rate and BDE
                close rate established as baseline KPIs.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ───────────────────── What you'll need ───────────────────── */}
      <section className="rb-sec" data-rb-sec aria-label="What you'll need">
        <div className="rb-wrap">
          <div className="rb-head">
            <p className="rb-eyebrow" data-rb-fade="0">
              <span className="rb-num">VI</span>What you&rsquo;ll need
            </p>
            <h2 className="rb-h2" data-rb-fade="1">
              Who this works for, <em>and who it doesn&rsquo;t.</em>
            </h2>
          </div>
          <div className="rb-need" data-rb-fade="2">
            <div className="rb-need-col">
              <h3 className="rb-need-h">Required</h3>
              <ul className="rb-career-list">
                <li>12+ months B2B sales, SDR, or setter experience</li>
                <li>Comfortable holding 25-minute discovery calls with owner-operators</li>
                <li>Comfortable opening budget conversations directly</li>
                <li>Previous commission-only experience, or at least three months of personal financial runway</li>
                <li>Computer, headset with microphone, wired or stable Wi-Fi, quiet calling environment</li>
                <li>Workable overlap with UK and US East Coast calling hours</li>
                <li>Able to operate as a self-employed contractor (UK self-assessment or equivalent in your jurisdiction)</li>
              </ul>
            </div>
            <div className="rb-need-col">
              <h3 className="rb-need-h">Nice to have</h3>
              <ul className="rb-career-list">
                <li>Experience selling or qualifying into one of our verticals</li>
                <li>Background in services or consulting sales rather than SaaS</li>
                <li>Experience with custom diallers or Twilio-based outbound</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────── Compensation ───────────────────── */}
      <section className="rb-sec" data-rb-sec aria-label="Compensation">
        <div className="rb-wrap">
          <div className="rb-head">
            <p className="rb-eyebrow" data-rb-fade="0">
              <span className="rb-num">VII</span>Compensation
            </p>
            <h2 className="rb-h2" data-rb-fade="1">
              100% commission. <em>Paid on close.</em>
            </h2>
            <p className="rb-sub" data-rb-fade="2">
              On the setup fee, after the client pays. No base. No clawback.
            </p>
          </div>

          <div className="rb-comp-rates" data-rb-fade="3">
            <article className="rb-comp-card">
              <p className="rb-comp-card-rate">7%</p>
              <p className="rb-comp-card-label">Standard rate</p>
              <p className="rb-comp-card-body">
                10 or fewer qualified handovers in a calendar month.
              </p>
            </article>
            <article className="rb-comp-card rb-comp-card-on">
              <p className="rb-comp-card-rate">10%</p>
              <p className="rb-comp-card-label">From the 11th handover</p>
              <p className="rb-comp-card-body">
                Applies to every handover in that month — including the first ten.
              </p>
            </article>
          </div>

          <p className="rb-career-body rb-career-body-tight" data-rb-fade="3">
            Setup fees range £5,000 (Tier 1) to £35,000+ (Enterprise). Per-close
            commission ranges £350 to £3,500+. Full commission proposal sent
            before any interview.
          </p>

          <div className="rb-earnings" data-rb-fade="3">
            <div className="rb-earnings-table-wrap">
              <table className="rb-earnings-table">
                <thead>
                  <tr>
                    <th>Month type</th>
                    <th>Qualified handovers</th>
                    <th>Closes</th>
                    <th>Your earnings</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><em>Floor</em></td>
                    <td>12</td>
                    <td>2</td>
                    <td>£1,000 – £1,500</td>
                  </tr>
                  <tr>
                    <td><em>Solid</em></td>
                    <td>16</td>
                    <td>4</td>
                    <td>£3,000 – £4,000</td>
                  </tr>
                  <tr>
                    <td><em>Strong</em></td>
                    <td>20</td>
                    <td>6</td>
                    <td>£5,500 – £7,400</td>
                  </tr>
                  <tr>
                    <td><em>Top</em></td>
                    <td>25</td>
                    <td>8</td>
                    <td>£10,100 – £13,200</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="rb-earnings-foot">
              All scenarios assume 11+ handovers cleared, 65% close-call show
              rate, and 25–35% BDE close rate. In months you fall short of 11
              handovers, every close from that month commissions at 7%.
            </p>
            <p className="rb-earnings-foot">
              First commission typically lands 3–5 weeks from start.
            </p>
          </div>
        </div>
      </section>

      {/* ───────────────────── What we provide ───────────────────── */}
      <section className="rb-sec" data-rb-sec aria-label="What we provide">
        <div className="rb-wrap">
          <div className="rb-head">
            <p className="rb-eyebrow" data-rb-fade="0">
              <span className="rb-num">VIII</span>What we provide
            </p>
            <h2 className="rb-h2" data-rb-fade="1">
              Onboarded to <em>day one.</em>
            </h2>
          </div>
          <ul className="rb-career-list" data-rb-fade="2">
            <li>Custom in-house dialler with warm leads pre-routed against ICP</li>
            <li>Established qualification framework and discovery call script</li>
            <li>Shadow calls with existing BDEs during onboarding week</li>
            <li>Direct access to the COO during your first four weeks</li>
            <li>Pipeline tools, CRM access, and visibility on your own conversion data from week one</li>
          </ul>
        </div>
      </section>

      {/* ───────────────────── Logistics ───────────────────── */}
      <section className="rb-sec" data-rb-sec aria-label="Logistics">
        <div className="rb-wrap">
          <div className="rb-head">
            <p className="rb-eyebrow" data-rb-fade="0">
              <span className="rb-num">IX</span>Logistics
            </p>
            <h2 className="rb-h2" data-rb-fade="1">
              The shape of <em>the engagement.</em>
            </h2>
          </div>
          <ul className="rb-career-list" data-rb-fade="2">
            <li>Remote, with calling hours that overlap UK and US East Coast windows</li>
            <li>Independent contractor — not employed</li>
            <li>Rolling intake — we onboard when fit is clear, not on a fixed cycle</li>
            <li>Start date agreed at interview</li>
          </ul>
        </div>
      </section>

      {/* ───────────────────── Apply ───────────────────── */}
      <section className="rb-sec" data-rb-sec aria-label="Apply" id="apply">
        <div className="rb-wrap">
          <div className="rb-head">
            <p className="rb-eyebrow" data-rb-fade="0">
              <span className="rb-num">X</span>How to apply
            </p>
            <h2 className="rb-h2" data-rb-fade="1">
              Complete the form below. <em>Voice intro required.</em>
            </h2>
            <p className="rb-sub" data-rb-fade="2">
              Applications reviewed weekly. Strong applicants invited to a
              30-minute interview with the COO.
            </p>
          </div>
          <div data-rb-fade="3">
            <ApplicationForm />
          </div>
        </div>
      </section>
    </main>
  );
}
