import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description:
    "How Rosebud Global Ltd collects, uses, stores, and safeguards personal information under UK GDPR — for site visitors, platform users, and the contact data processed on our clients' behalf.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Notice | Rosebud Global",
    description:
      "How Rosebud Global Ltd collects, uses, stores, and safeguards personal information under UK GDPR — for site visitors, platform users, and the contact data processed on our clients' behalf.",
    url: "https://rosebud.global/privacy",
    type: "website",
  },
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
          <p className="rb-page-hero-caption">Last update: July 22, 2026</p>
        </div>
      </section>

      <main className="rb-policy">
        <div className="rb-policy-wrap">
          {/* Intro */}
          <p className="rb-policy-intro">
            Rosebud Global Ltd (company number 16623472, trading as
            &ldquo;Rosebud Solutions&rdquo;, &ldquo;Rosebud Global&rdquo;,
            &ldquo;Rosebud&rdquo;, &ldquo;we,&rdquo;
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
                <strong>Payment and billing information</strong> &mdash; when you
                subscribe, your billing name and address, any VAT or tax ID, your
                chosen plan and add-ons, and transaction records. Your card
                details are provided directly to our payment processor, Stripe,
                and are not stored by us; we receive only limited information such
                as the card brand, the last four digits, billing country, and
                payment status.
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
                data, and browsing behavior.
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
                To create and manage your account, take payment, and administer
                your subscription and billing (including renewals, cancellations,
                and refunds).
              </li>
              <li>
                To send you service and transactional messages &mdash; such as
                your welcome and onboarding email, receipts, and important
                account notices.
              </li>
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
            <h2 className="rb-policy-h2">
              The Rosebud Solutions Service &mdash; Our Two Roles
            </h2>
            <p>
              <strong>Controller &mdash; our own account, site and payment
              data.</strong> We are the controller of personal data about our
              account holders, their users, our website visitors, and people who
              inquire about Rosebud. The rest of this Privacy Policy governs that
              data.
            </p>
            <p>
              <strong>Processor &mdash; data the operated service handles.</strong>{" "}
              When you are a client, the Service processes personal data about
              your leads, inquirers and customers (&ldquo;Contact Data&rdquo;) on
              your behalf and on your documented instructions. For that data you
              are the controller and we are your processor, under a data
              processing agreement. An individual whose data sits in a
              client&rsquo;s system should exercise their rights with that client
              as controller; we assist the client as that agreement requires.
            </p>

            <h3 className="rb-policy-h3">
              What the Service does with Contact Data
            </h3>
            <p>
              As processor, and only to provide the Service on the
              client&rsquo;s instructions, we:
            </p>
            <ul className="rb-policy-list">
              <li>
                capture inquiries across the client&rsquo;s active channels
                &mdash; web form, email, SMS, WhatsApp and Instagram &mdash; into
                a single record;
              </li>
              <li>
                score each record against the client&rsquo;s own qualification
                rules and route it (continue, escalate to the client&rsquo;s
                staff, or apply the client&rsquo;s not-qualified disposition);
              </li>
              <li>
                book appointments into the client&rsquo;s calendar and send
                confirmations, reminders and reschedule messages;
              </li>
              <li>
                run re-engagement sequences to contacts that have gone cold or
                are due for recall;
              </li>
              <li>
                synchronise the record into the client&rsquo;s CRM, which remains
                the client&rsquo;s system of record; and
              </li>
              <li>
                for attribution clients only, produce a consented first-party
                outcome signal (see below).
              </li>
            </ul>
            <p>
              Categories of data subject: the client&rsquo;s leads, inquirers,
              prospects and customers. Categories of data: contact identifiers,
              inquiry content and channel, qualification fields and status,
              appointment and engagement events, and &mdash; where the client
              provides it &mdash; an expected or actual value. We do not enrich
              Contact Data with third-party or sourced data as part of the
              Service.
            </p>

            <h3 className="rb-policy-h3">Online payment data</h3>
            <p>
              Payments are processed by Stripe as our payment processor. We do
              not receive or store full card numbers; we receive confirmation of
              payment and limited transaction metadata to manage billing. Stripe
              processes payment data as its own controller under its terms.
            </p>

            <h3 className="rb-policy-h3">
              Advertising outcome signal (attribution add-on)
            </h3>
            <p>
              For clients on the attribution add-on, we produce a lead-outcome
              signal from Contact Data the Service already holds and deliver it to
              the client&rsquo;s media team for the client to upload to its
              advertising platform. Only first-party records carrying a valid
              consent to advertising-platform use are ever included; third-party,
              sourced, purchased or enriched data is never used for this purpose
              or uploaded to an advertising platform. We deliver a file only; we
              do not access or operate any advertising account, and the controller
              relationship with the advertising platform sits with the client.
            </p>

            <h3 className="rb-policy-h3">AI processing</h3>
            <p>
              To provide the Service we use third-party AI model providers as
              subprocessors to qualify records and generate response and
              follow-up content. Contact Data and account data may be processed by
              these providers for that purpose, under contract and on our
              instructions.
            </p>

            <h3 className="rb-policy-h3">Subprocessors</h3>
            <p>
              We use subprocessors across these categories to operate the Service:
              hosting and database infrastructure; the client&rsquo;s CRM and
              calendar; messaging delivery (email, SMS, WhatsApp and Instagram);
              AI model providers; payment processing; security and bot detection;
              and product and website analytics. A named subprocessor register
              &mdash; provider, purpose, data categories and processing region
              &mdash; is maintained and available to clients on request.
            </p>

            <h3 className="rb-policy-h3">Retention of operated data</h3>
            <p>
              Contact Data held within the Service is retained for as long as
              needed to provide the Service and in line with the client&rsquo;s
              instructions and the data processing agreement. On termination,
              records are made available for export within the export window and
              then deleted or anonymised, save where retention is required by
              law. Data already written into the client&rsquo;s own CRM is
              unaffected and remains under the client&rsquo;s control.
            </p>
          </section>

          <section className="rb-policy-section">
            <h2 className="rb-policy-h2">Job Applicants and Recruitment Data</h2>
            <p>
              When you apply for a role at Rosebud Solutions via our website
              (including the Sales Development Representative application form), we collect
              and process the personal information you submit for the purpose
              of assessing your application and contacting you about it.
            </p>
            <p>
              <strong>What we collect.</strong> Information you provide through
              the application form, including your name, email address,
              country and city of residence, LinkedIn profile (if shared),
              relevant sales / SDR / setter experience, industry experience,
              commission-role history, equipment confirmation, available hours,
              earliest start date, and the consents you provide on the form.
              We also automatically log the browser user-agent string at
              submission for support and abuse-prevention purposes.
            </p>
            <p>
              <strong>How we use it.</strong> To review your application
              against the requirements of the role, to compare candidates
              fairly, to contact you with interview slots or follow-up
              questions, and to keep your details on file for future relevant
              openings during the retention period. We do not use applicant
              information for marketing without separate consent.
            </p>
            <p>
              <strong>Where it is stored.</strong> Applications are stored in a
              private Supabase database hosted in the European Union, with
              access restricted to authorised members of the Rosebud Solutions
              team via our internal dashboard. A short notification containing
              only the applicant&rsquo;s name is sent to an internal team
              channel on submission so we know to review the application — the
              full application body is never sent over that channel.
            </p>
            <p>
              <strong>Lawful basis.</strong> We process applicant data on the
              basis of your consent (given when you submit the form) and our
              legitimate interest in assessing candidates for open roles.
              Where we rely on consent, you may withdraw it at any time by
              emailing the contact below — withdrawing consent will not
              affect any processing that has already taken place but will
              result in your application being deleted from our systems.
            </p>
            <p>
              <strong>Retention.</strong> Unsuccessful applications are kept
              for up to 12 months from submission so we can consider you for
              future openings, after which they are deleted. If you ask us to
              delete your application sooner, we will do so promptly.
              Successful applicants&rsquo; data may be retained for longer
              as part of standard onboarding and employment records.
            </p>
            <p>
              <strong>Your rights.</strong> You retain all of the rights set
              out in the &ldquo;Your Rights Under UK GDPR&rdquo; section
              below over your application data, including the right to
              access, correct, or delete it. To exercise any of these,
              contact us at{" "}
              <a href="mailto:contact@rosebud.global">contact@rosebud.global</a>.
            </p>
          </section>

          <section className="rb-policy-section">
            <h2 id="cookies" className="rb-policy-h2" style={{ scrollMarginTop: "90px" }}>Cookies, Tracking, and Analytics</h2>
            <p>
              We use cookies, tracking pixels, and analytics tools to collect
              technical and usage data. This helps us:
            </p>
            <ol className="rb-policy-list rb-policy-list-ordered">
              <li>Recognise your device and remember preferences.</li>
              <li>Analyse traffic and user interaction with our Website.</li>
              <li>Improve usability and optimize communications.</li>
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

            <h3 className="rb-policy-h3">Product Analytics (PostHog)</h3>
            <p>
              We use PostHog, a product analytics platform, to understand how
              visitors interact with our Website and improve our services.
              PostHog acts as a data processor on our behalf and is operated
              by PostHog Inc. (United States) and its subsidiaries, including
              PostHog GmbH in Germany.
            </p>
            <p>
              We use PostHog&rsquo;s EU Cloud, meaning the personal data
              PostHog processes on our behalf &mdash; including IP address,
              device and browser data, pages viewed, click and navigation
              events, and session metadata &mdash; is stored on infrastructure
              located in Germany, within the EU.
            </p>
            <p>
              We also use PostHog&rsquo;s session replay feature, which records
              interactions with our Website such as mouse movements, clicks,
              scrolls, and page navigation, so we can diagnose usability issues
              and improve the experience. Input fields, payment details, and
              other sensitive information are masked by default and are not
              captured.
            </p>
            <p>
              PostHog uses first-party cookies only and does not run
              third-party tracking or retargeting through our Website.
              Analytics and session replay are loaded only after you accept
              non-essential cookies through our cookie banner.
            </p>
            <p>
              PostHog&rsquo;s privacy notice is available at{" "}
              <a
                href="https://posthog.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="rb-policy-link"
              >
                https://posthog.com/privacy
              </a>
              .
            </p>

            <h3 className="rb-policy-h3">Booking and Scheduling (Cal.com)</h3>
            <p>
              When you book a consultation with us, scheduling is handled
              through Cal.com &mdash; specifically the EU-hosted instance at
              cal.eu &mdash; operated by Cal.com, Inc. To process your
              booking, Cal.com collects the information you provide on the
              booking form, including your name, email address, time zone,
              scheduling preferences, and any responses to questions we ask
              before the meeting.
            </p>
            <p>
              Cal.com acts as a data controller in respect of its own platform
              and as a service provider to us for the purpose of facilitating
              your booking. Bookings made through cal.eu are processed and
              stored within the European Union.
            </p>
            <p>
              Cal.com&rsquo;s privacy notice is available at{" "}
              <a
                href="https://cal.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="rb-policy-link"
              >
                https://cal.com/privacy
              </a>
              .
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
              inquiry, consultations, appointment reminders, service-related
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
              trading behavior and engagement within our community. These
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
                To service providers and partners who support our operations
                &mdash; including our payment processor (Stripe) and providers of
                hosting and database infrastructure, transactional email,
                scheduling, security, and analytics, and, for our other
                activities, Vantage, Klaviyo, FX Blue, MyFXBook, ManyChat,
                Google, and Telegram. A named subprocessor register for the
                Rosebud Solutions service is available to clients on request.
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
