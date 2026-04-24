import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description:
    "How Rosebud Global Ltd collects, uses, and safeguards personal information under UK GDPR.",
  alternates: { canonical: "/privacy" },
};

const BREADCRUMBS = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://rosebud.global/" },
    { "@type": "ListItem", position: 2, name: "Privacy Notice", item: "https://rosebud.global/privacy" },
  ],
};

export default function PrivacyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMBS) }}
      />
      {/* ========== PAGE HERO ========== */}
      <section className="rb-page-hero">
        <div className="rb-page-hero-inner">
          <p className="rb-page-hero-eyebrow">Rosebud Solutions</p>
          <p className="rb-page-hero-crumb">
            <span className="rb-num">&mdash;</span>Home &middot; Privacy Notice
          </p>
          <h1 className="rb-page-hero-h1">
            Privacy <em>Notice.</em>
          </h1>
          <p className="rb-page-hero-caption">Last update: April 24, 2026</p>
        </div>
      </section>

      <main className="rb-policy">
        <div className="rb-policy-wrap">
          {/* Intro */}
          <p className="rb-policy-intro">
            Rosebud Global Ltd (trading as &ldquo;Rosebud Solutions&rdquo;,
            &ldquo;Rosebud Global&rdquo;, &ldquo;Rosebud&rdquo;, &ldquo;we,&rdquo;
            &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your privacy and is
            committed to protecting the personal information of individuals
            (&ldquo;you,&rdquo; &ldquo;your,&rdquo; or &ldquo;user&rdquo;) who
            interact with us. This Privacy Policy (&ldquo;Policy&rdquo;) applies
            to information we collect on our website (rosebud.global), our
            digital platforms, and other channels owned or controlled by
            Rosebud (collectively, the &ldquo;Website&rdquo;).
          </p>
          <p className="rb-policy-intro">
            This Policy describes the categories of personal information we
            obtain, the ways in which we use such information, the legal bases
            on which we rely, the circumstances under which we may share it,
            and the rights available to you under applicable law.
          </p>

          <section className="rb-policy-section">
            <h2 className="rb-policy-h2">Information We Collect</h2>
            <p>
              Rosebud may collect personal information in the following
              categories:
            </p>
            <ul className="rb-policy-list">
              <li>
                <strong>Contact information</strong> &mdash; name, postal
                address, email address, and telephone number.
              </li>
              <li>
                <strong>Account and login information</strong> &mdash;
                usernames, passwords, and settings to access Rosebud platforms.
              </li>
              <li>
                <strong>Financial and trading activity data</strong> &mdash;
                information relating to trading activity, allocation
                frameworks, or performance data shared voluntarily through our
                educational tools.
              </li>
              <li>
                <strong>Professional information</strong> &mdash; CVs,
                employment history, partnership applications, or other
                professional interactions.
              </li>
              <li>
                <strong>Demographic and preference information</strong> &mdash;
                data you provide through forms, surveys, or communications.
              </li>
              <li>
                <strong>Technical and device data</strong> &mdash; IP address,
                device identifiers, browser type, operating system, location
                data, and browsing behaviour.
              </li>
              <li>
                <strong>Usage and interaction data</strong> &mdash; number and
                frequency of visits, content viewed, referral sites, links
                clicked, email open rates.
              </li>
              <li>
                <strong>Recruitment and employment data</strong> &mdash; if you
                apply for a role, we may collect details about your education,
                work eligibility, and references.
              </li>
              <li>
                <strong>Other information</strong> &mdash; any data you
                voluntarily provide when engaging with us.
              </li>
            </ul>
            <p>
              We may also obtain data from third-party sources such as
              analytics providers, trading platforms, business partners, and
              public records, and combine it with the information we collect
              directly.
            </p>
          </section>

          <section className="rb-policy-section">
            <h2 className="rb-policy-h2">How We Use Personal Information</h2>
            <p>We may process personal information for the following purposes:</p>
            <ul className="rb-policy-list">
              <li>To provide educational resources, tools, and services.</li>
              <li>
                To deliver and improve our systems, platforms, and internal
                processes.
              </li>
              <li>
                To communicate with you regarding updates, consultations,
                services, and (where consent has been provided) SMS
                communications.
              </li>
              <li>To personalise your Website experience.</li>
              <li>
                To monitor performance within our community and refine our
                frameworks.
              </li>
              <li>
                To conduct analytics, research, and anonymised reporting.
              </li>
              <li>
                To maintain Website integrity, prevent misuse, and detect fraud.
              </li>
              <li>
                To comply with UK legal and regulatory obligations.
              </li>
              <li>
                To manage recruitment, applications, and partnerships.
              </li>
            </ul>
          </section>

          <section className="rb-policy-section">
            <h2 className="rb-policy-h2">Cookies, Tracking, and Analytics</h2>
            <p>
              We use cookies, tracking pixels, and analytics tools to collect
              technical and usage data. This helps us:
            </p>
            <ol className="rb-policy-list rb-policy-list-ordered">
              <li>Recognise your device and remember preferences.</li>
              <li>Analyse traffic and user interaction with our Website.</li>
              <li>Improve usability and optimise communications.</li>
              <li>Measure Website performance and develop new features.</li>
            </ol>
            <p>
              We use both first-party and third-party cookies. Third-party
              providers include (but are not limited to): Google Analytics,
              Klaviyo, ManyChat, FX Blue, MyFXBook, Telegram, and Vantage.
            </p>
            <h3 className="rb-policy-h3">
              Cookie Banner (GDPR + PECR Compliance)
            </h3>
            <p>
              On your first visit to our Website, you will be presented with a
              cookie consent banner. This allows you to accept or reject
              non-essential cookies in accordance with the UK GDPR and the
              Privacy and Electronic Communications Regulations (PECR). You can
              update your preferences at any time.
            </p>
            <p>
              If you disable cookies, some Website features may not function
              properly.
            </p>
          </section>

          <section className="rb-policy-section">
            <h2 className="rb-policy-h2">Lawful Basis for Processing</h2>
            <p>Under the UK GDPR, our lawful bases for processing include:</p>
            <ul className="rb-policy-list">
              <li>
                <strong>Contract</strong> &mdash; to deliver services or
                resources you request.
              </li>
              <li>
                <strong>Legitimate interests</strong> &mdash; to operate,
                evaluate, and improve our business while balancing your rights.
              </li>
              <li>
                <strong>Legal obligations</strong> &mdash; to comply with
                applicable laws and regulations.
              </li>
              <li>
                <strong>Consent</strong> &mdash; for direct marketing or
                non-essential cookies, where required.
              </li>
            </ul>
          </section>

          <section className="rb-policy-section">
            <h2 className="rb-policy-h2">SMS Communication</h2>
            <p>
              If you provide your mobile number and opt in to receive SMS
              communications from Rosebud Global Ltd (trading as Rosebud
              Solutions), we may send you text messages relating to your
              enquiry, consultations, appointment reminders, service-related
              updates, and (where separately consented) marketing
              communications. Message frequency varies depending on your
              interaction with us. Message and data rates may apply. You may
              opt out of SMS communications at any time by replying STOP to any
              message received. For assistance, reply HELP or contact us at{" "}
              <a
                href="mailto:contact@rosebud.global"
                className="rb-policy-link"
              >
                contact@rosebud.global
              </a>
              .
            </p>
            <p>
              Consent to receive SMS communications is not a condition of
              purchase or service. Mobile information will not be shared with
              third parties or affiliates for marketing or promotional
              purposes. All other categories exclude text messaging originator
              opt-in data and consent; this information will not be shared with
              any third parties. We retain records of SMS opt-in consent as
              required for compliance and audit purposes.
            </p>
          </section>

          <section className="rb-policy-section">
            <h2 className="rb-policy-h2">International Data Transfers</h2>
            <p>
              Some of our partners and service providers (e.g., Google,
              Klaviyo, Telegram, Vantage) are based outside the UK/EEA. Where
              personal data is transferred internationally, we ensure
              appropriate safeguards are in place, including adequacy decisions
              or the UK International Data Transfer Agreement (IDTA) / Standard
              Contractual Clauses (SCCs), as applicable.
            </p>
          </section>

          <section className="rb-policy-section">
            <h2 className="rb-policy-h2">
              Automated Decision-Making and Profiling
            </h2>
            <p>
              We may use performance monitoring and analytics tools to assess
              trading behaviour and engagement within our community. These
              processes are used for research, education, and system
              development only. We do not rely on automated decision-making
              that produces legal or similarly significant effects on
              individuals.
            </p>
          </section>

          <section className="rb-policy-section">
            <h2 className="rb-policy-h2">Sharing of Information</h2>
            <p>
              We do not sell personal data. We may disclose it in the following
              circumstances:
            </p>
            <ul className="rb-policy-list">
              <li>
                To affiliates, service providers, and partners who support our
                operations (including Vantage, Klaviyo, FX Blue, MyFXBook,
                ManyChat, Google, and Telegram).
              </li>
              <li>
                To regulators, courts, or authorities when legally required.
              </li>
              <li>
                To protect the rights, safety, or integrity of Rosebud, our
                users, or others.
              </li>
              <li>
                In connection with corporate transactions (e.g., merger,
                acquisition, restructuring).
              </li>
              <li>With your explicit consent.</li>
            </ul>
            <p>
              Third parties are contractually required to process data in
              compliance with applicable law.
            </p>
          </section>

          <section className="rb-policy-section">
            <h2 className="rb-policy-h2">Data Retention</h2>
            <p>
              We retain personal information only for as long as necessary to
              fulfil the purposes outlined in this Policy, or as required by
              law. When no longer needed, information will be securely deleted
              or anonymised.
            </p>
          </section>

          <section className="rb-policy-section">
            <h2 className="rb-policy-h2">Security</h2>
            <p>
              We maintain appropriate administrative, technical, and physical
              safeguards to protect personal data against unauthorised access,
              disclosure, alteration, or destruction.
            </p>
          </section>

          <section className="rb-policy-section">
            <h2 className="rb-policy-h2">Children&rsquo;s Data</h2>
            <p>
              Our services are not directed to, and are not intended for,
              individuals under the age of 18. We do not knowingly collect
              personal information from children.
            </p>
          </section>

          <section className="rb-policy-section">
            <h2 className="rb-policy-h2">Your Rights Under UK GDPR</h2>
            <p>You have the right to:</p>
            <ul className="rb-policy-list">
              <li>
                <strong>Access</strong> &mdash; request a copy of your personal
                data.
              </li>
              <li>
                <strong>Rectify</strong> &mdash; correct inaccurate or
                incomplete data.
              </li>
              <li>
                <strong>Erase</strong> &mdash; request deletion of your data,
                subject to legal exemptions.
              </li>
              <li>
                <strong>Restrict</strong> &mdash; limit the processing of your
                data in certain circumstances.
              </li>
              <li>
                <strong>Portability</strong> &mdash; request your data in a
                structured, machine-readable format.
              </li>
              <li>
                <strong>Object</strong> &mdash; object to processing based on
                legitimate interests or direct marketing.
              </li>
              <li>
                <strong>Withdraw consent</strong> &mdash; where processing
                relies on consent.
              </li>
            </ul>
            <p>
              To exercise these rights, please contact us at{" "}
              <a
                href="mailto:contact@rosebud.global"
                className="rb-policy-link"
              >
                contact@rosebud.global
              </a>
              . We may need to verify your identity before fulfilling your
              request.
            </p>
          </section>

          <section className="rb-policy-section">
            <h2 className="rb-policy-h2">Complaints</h2>
            <p>
              We encourage you to contact us first so we can address your
              concerns but if you are dissatisfied with how your data has been
              handled, you have the right to lodge a complaint with the UK
              Information Commissioner&rsquo;s Office (ICO):
            </p>
            <p>
              <a
                href="https://ico.org.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="rb-policy-link"
              >
                ico.org.uk
              </a>
            </p>
          </section>

          <section className="rb-policy-section">
            <h2 className="rb-policy-h2">Third-Party Links and Services</h2>
            <p>
              Our Website may include links to third-party websites, apps, or
              plug-ins. These are operated independently and governed by their
              own privacy policies. Rosebud is not responsible for the content
              or practices of third-party providers.
            </p>
          </section>

          <section className="rb-policy-section">
            <h2 className="rb-policy-h2">Updates to This Policy</h2>
            <p>
              We may update this Policy from time to time to reflect changes in
              practices, law, or technology. Updates will be posted here with a
              revised effective date.
            </p>
          </section>

          <section className="rb-policy-section">
            <h2 className="rb-policy-h2">Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy,
              please contact:
            </p>
            <div className="rb-policy-contact">
              <p>Rosebud Global Ltd</p>
              <p>
                Email:{" "}
                <a
                  href="mailto:contact@rosebud.global"
                  className="rb-policy-link"
                >
                  contact@rosebud.global
                </a>
              </p>
              <p>London, United Kingdom</p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
