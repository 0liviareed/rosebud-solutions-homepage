import type { Metadata } from "next";
import CareersBrevoForm from "./CareersBrevoForm";

export const metadata: Metadata = {
  title: "Appointment Setter — Rosebud Solutions",
  description:
    "Remote · Independent Contractor · 100% Commission · Rolling Intake. Work warm leads from our in-house dialler team and run qualified discovery handovers to BDEs.",
  alternates: { canonical: "/careers/appointment-setter" },
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
    value: { "@type": "QuantitativeValue", value: 0, unitText: "MONTH" },
  },
  jobBenefits:
    "100% commission. 7% standard rate, 10% on the 11th qualified handover in a calendar month. Warm leads provided.",
};

export default function AppointmentSetterPage() {
  return (
    <main className="rb-job">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JOB_POSTING_SCHEMA) }}
      />

      {/* ── HEADER BAR ── flush-left title, key facts row, apply button ── */}
      <header className="rb-job-header">
        <div className="rb-job-container">
          <p className="rb-job-crumb">Careers · Rosebud Solutions</p>
          <h1 className="rb-job-title">Appointment Setter</h1>
          <ul className="rb-job-meta">
            <li>
              <span className="rb-job-meta-k">Type</span>
              <span className="rb-job-meta-v">Independent Contractor</span>
            </li>
            <li>
              <span className="rb-job-meta-k">Location</span>
              <span className="rb-job-meta-v">Remote (UK + US East Coast overlap)</span>
            </li>
            <li>
              <span className="rb-job-meta-k">Compensation</span>
              <span className="rb-job-meta-v">100% commission · 7%→10%</span>
            </li>
            <li>
              <span className="rb-job-meta-k">Intake</span>
              <span className="rb-job-meta-v">Rolling</span>
            </li>
          </ul>
          <div className="rb-job-header-cta">
            <a href="#apply" className="rb-job-apply-btn">Apply for this role</a>
            <a href="#about" className="rb-job-secondary-link">Read full description</a>
          </div>
        </div>
      </header>

      {/* ── TWO-COL BODY ── content left, sticky apply sidebar right ── */}
      <div className="rb-job-body">
        <div className="rb-job-container rb-job-cols">
          {/* MAIN CONTENT */}
          <article className="rb-job-main" id="about">
            <section className="rb-job-sec">
              <h2 className="rb-job-h2">About Rosebud Solutions</h2>
              <p>
                Rosebud Solutions is the consultancy arm of Rosebud Global Ltd.
                We design, build, and run custom AI-powered sales and
                operations systems for owner-operated SMEs across Aesthetics,
                Mortgage, Legal, Property, Trades, Recruitment, and
                independent Hospitality.
              </p>
              <p>
                Engagements range from £5,000 to £35,000+ setup fees plus
                monthly retainers.
              </p>
            </section>

            <section className="rb-job-sec">
              <h2 className="rb-job-h2">The role</h2>
              <p>
                You sit at the front of our sales pipeline. Our in-house
                dialler team produces warm leads against a defined ICP — they
                land in your queue. You run two calls on each: a short
                first-touch to confirm fit, then a 20–30 minute discovery to
                qualify. Prospects who pass go to a Business Development
                Executive for closing. You&rsquo;re paid when the deal closes.
              </p>
              <p className="rb-job-callout">
                You&rsquo;re not closing the deal. You&rsquo;re not pitching
                pricing. Your output is qualified discovery handovers.
              </p>
            </section>

            <section className="rb-job-sec">
              <h2 className="rb-job-h2">What you&rsquo;ll do</h2>
              <ul className="rb-job-list">
                <li>Work warm leads from our in-house dialler queue</li>
                <li>Run first-touch calls to confirm vertical fit, decision-maker status, and operational pain</li>
                <li>Book qualified prospects onto your own discovery calendar</li>
                <li>Run 20–30 minute discovery calls</li>
                <li>Hand qualified prospects to a BDE for the close</li>
                <li>Track activity in our pipeline tools</li>
                <li>Hit weekly handover targets agreed at interview</li>
              </ul>
            </section>

            <section className="rb-job-sec">
              <h2 className="rb-job-h2">The qualification standard</h2>
              <p>
                A discovery handover only counts if you&rsquo;ve confirmed all
                five criteria on the call before placing the prospect on a
                BDE&rsquo;s calendar:
              </p>
              <ol className="rb-job-ol">
                <li>
                  <strong>Decision-maker confirmed</strong> — or commitment to
                  bring them to the close call.
                </li>
                <li>
                  <strong>Serviced vertical</strong> — Aesthetics, Mortgage,
                  Legal, Property, Trades, Recruitment, or independent
                  Hospitality.
                </li>
                <li>
                  <strong>Stated operational pain</strong> we can address.
                </li>
                <li>
                  <strong>Confirmed attendance intent</strong> at the close
                  call — not &ldquo;maybe&rdquo;.
                </li>
                <li>
                  <strong>Budget conversation opened</strong> — they
                  understand this is a paid engagement.
                </li>
              </ol>
            </section>

            <section className="rb-job-sec">
              <h2 className="rb-job-h2">What success looks like</h2>
              <dl className="rb-job-dl">
                <dt>First 30 days</dt>
                <dd>
                  Onboarded onto the dialler, scripts, and qualification
                  framework. Running first-touch calls from week two. First
                  discovery calls on your calendar.
                </dd>
                <dt>First 60 days</dt>
                <dd>
                  Producing 8–12 qualified discovery handovers per month.
                  First closes moving through the pipeline. First commission
                  paid.
                </dd>
                <dt>First 90 days</dt>
                <dd>
                  Consistently clearing 11+ qualified handovers per month and
                  locking the 10% rate. Personal close-call show rate and BDE
                  close rate established as baseline KPIs.
                </dd>
              </dl>
            </section>

            <section className="rb-job-sec">
              <h2 className="rb-job-h2">What you&rsquo;ll need</h2>
              <h3 className="rb-job-h3">Required</h3>
              <ul className="rb-job-list">
                <li>12+ months B2B sales, SDR, or setter experience</li>
                <li>Comfortable holding 25-minute discovery calls with owner-operators</li>
                <li>Comfortable opening budget conversations directly</li>
                <li>Previous commission-only experience, or at least three months of personal financial runway</li>
                <li>Computer, headset with microphone, wired or stable Wi-Fi internet, quiet calling environment</li>
                <li>Workable overlap with UK and US East Coast calling hours</li>
                <li>Able to operate as a self-employed contractor (UK self-assessment or equivalent in your jurisdiction)</li>
              </ul>
              <h3 className="rb-job-h3">Nice to have</h3>
              <ul className="rb-job-list">
                <li>Experience selling or qualifying into one of our verticals</li>
                <li>Background in services or consulting sales rather than SaaS</li>
                <li>Experience with custom diallers or Twilio-based outbound</li>
              </ul>
            </section>

            <section className="rb-job-sec">
              <h2 className="rb-job-h2">Compensation</h2>
              <p>
                100% commission. Paid on the setup fee at close, after the
                client pays. No base. No clawback.
              </p>
              <ul className="rb-job-list">
                <li>
                  <strong>7%</strong> standard rate (10 or fewer qualified
                  handovers in a calendar month)
                </li>
                <li>
                  <strong>10%</strong> rate the moment you hit your 11th
                  handover in a month — applies to every handover from that
                  month, including the first ten
                </li>
              </ul>
              <p>
                Setup fees range £5,000 (Tier 1) to £35,000+ (Enterprise).
                Per-close commission ranges £350 to £3,500+. Full commission
                proposal sent before any interview.
              </p>

              <div className="rb-job-table-wrap">
                <table className="rb-job-table">
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
                      <td>Floor</td>
                      <td>12</td>
                      <td>2</td>
                      <td>£1,000 – £1,500</td>
                    </tr>
                    <tr>
                      <td>Solid</td>
                      <td>16</td>
                      <td>4</td>
                      <td>£3,000 – £4,000</td>
                    </tr>
                    <tr>
                      <td>Strong</td>
                      <td>20</td>
                      <td>6</td>
                      <td>£5,500 – £7,400</td>
                    </tr>
                    <tr>
                      <td>Top</td>
                      <td>25</td>
                      <td>8</td>
                      <td>£10,100 – £13,200</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="rb-job-foot">
                All scenarios assume 11+ handovers cleared, 65% close-call
                show rate, and 25–35% BDE close rate. In months you fall
                short of 11 handovers, every close from that month
                commissions at 7%. First commission typically lands 3–5
                weeks from start.
              </p>
            </section>

            <section className="rb-job-sec">
              <h2 className="rb-job-h2">What we provide</h2>
              <ul className="rb-job-list">
                <li>Custom in-house dialler with warm leads pre-routed against ICP</li>
                <li>Established qualification framework and discovery call script</li>
                <li>Shadow calls with existing BDEs during onboarding week</li>
                <li>Direct access to the COO during your first four weeks</li>
                <li>Pipeline tools, CRM access, and visibility on your own conversion data from week one</li>
              </ul>
            </section>

            <section className="rb-job-sec">
              <h2 className="rb-job-h2">Logistics</h2>
              <ul className="rb-job-list">
                <li>Remote, with calling hours that overlap UK and US East Coast windows</li>
                <li>Independent contractor — not employed</li>
                <li>Rolling intake — we onboard when fit is clear, not on a fixed cycle</li>
                <li>Start date agreed at interview</li>
              </ul>
            </section>

            <section className="rb-job-sec" id="apply">
              <h2 className="rb-job-h2">How to apply</h2>
              <p>
                Complete the application form below. Voice intro required.
                Applications reviewed weekly. Strong applicants invited to a
                30-minute interview with the COO.
              </p>
              <CareersBrevoForm />
            </section>
          </article>

          {/* STICKY APPLY SIDEBAR */}
          <aside className="rb-job-aside">
            <div className="rb-job-aside-card">
              <p className="rb-job-aside-eyebrow">Apply now</p>
              <p className="rb-job-aside-body">
                Voice intro required. Applications reviewed weekly.
              </p>
              <a href="#apply" className="rb-job-apply-btn rb-job-apply-btn-full">
                Start application
              </a>
              <dl className="rb-job-aside-facts">
                <dt>Role</dt>
                <dd>Appointment Setter</dd>
                <dt>Reports to</dt>
                <dd>CEO, Rosebud Solutions</dd>
                <dt>Pay</dt>
                <dd>100% commission · 7% → 10%</dd>
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
