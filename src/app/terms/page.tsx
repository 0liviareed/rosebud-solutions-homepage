import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service · Rosebud Solutions",
  description:
    "Terms of Service governing use of the Rosebud Global Ltd website and services.",
};

export default function TermsPage() {
  return (
    <>
      {/* ========== PAGE HERO ========== */}
      <section className="rb-page-hero">
        <div className="rb-page-hero-inner">
          <p className="rb-page-hero-eyebrow">Rosebud Solutions</p>
          <p className="rb-page-hero-crumb">
            <span className="rb-num">&mdash;</span>Home &middot; Terms of Service
          </p>
          <h1 className="rb-page-hero-h1">
            Terms of <em>Service.</em>
          </h1>
          <p className="rb-page-hero-caption">Last update: April 24, 2026</p>
        </div>
      </section>

      <main className="rb-policy">
        <div className="rb-policy-wrap">
          {/* Intro */}
          <p className="rb-policy-intro">
            These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the
            website located at{" "}
            <a
              href="https://rosebud.global"
              className="rb-policy-link"
            >
              https://rosebud.global
            </a>{" "}
            and any related services provided by Rosebud Global Ltd (trading
            as &ldquo;Rosebud Solutions&rdquo;, &ldquo;Rosebud Global&rdquo;,
            &ldquo;Rosebud,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
            &ldquo;our&rdquo;).
          </p>
          <p className="rb-policy-intro">
            By accessing our website, submitting your information, or engaging
            with our services, you agree to be bound by these Terms.
          </p>

          <section className="rb-policy-section">
            <h2 className="rb-policy-h2">Company Information</h2>
            <div className="rb-policy-contact">
              <p>Rosebud Global Ltd</p>
              <p>Trading as: Rosebud Solutions</p>
              <p>London, United Kingdom</p>
              <p>
                Email:{" "}
                <a
                  href="mailto:contact@rosebud.global"
                  className="rb-policy-link"
                >
                  contact@rosebud.global
                </a>
              </p>
            </div>
          </section>

          <section className="rb-policy-section">
            <h2 className="rb-policy-h2">Use of Our Website and Services</h2>
            <p>
              Rosebud Solutions provides AI systems consultation, automation
              strategy, AI agent implementation, and related advisory services.
            </p>
            <p>
              You agree to use our website and services only for lawful
              purposes and in a manner that does not infringe the rights of,
              restrict, or inhibit anyone else&rsquo;s use of the website.
            </p>
            <p>
              We reserve the right to refuse service where necessary for legal,
              compliance, or operational reasons.
            </p>
          </section>

          <section className="rb-policy-section">
            <h2 className="rb-policy-h2">Consultations and Services</h2>
            <p>
              Consultations are provided for informational and commercial
              planning purposes. Any recommendations made during consultations
              are based on information provided by you and do not constitute
              financial, legal, or regulatory advice.
            </p>
            <p>
              Implementation timelines, system outcomes, and operational impact
              may vary depending on your business structure and participation.
            </p>
            <p>
              No guarantees are made regarding revenue increases, performance
              improvements, or specific business outcomes.
            </p>
          </section>

          <section className="rb-policy-section">
            <h2 className="rb-policy-h2">SMS Communications</h2>
            <p>
              By providing your mobile number and opting in via our website
              form, you consent to receive SMS messages from Rosebud Global Ltd
              (trading as Rosebud Solutions). These messages may include:
            </p>
            <ul className="rb-policy-list">
              <li>Responses to enquiries</li>
              <li>Consultation scheduling and confirmations</li>
              <li>Appointment reminders</li>
              <li>Follow-up communications</li>
              <li>Service-related updates</li>
              <li>Marketing messages (where separately consented)</li>
            </ul>
            <p>Message frequency varies. Message and data rates may apply.</p>
            <p>
              You may opt out at any time by replying STOP to any message
              received.
            </p>
            <p>
              For assistance, reply HELP or contact us at{" "}
              <a
                href="mailto:contact@rosebud.global"
                className="rb-policy-link"
              >
                contact@rosebud.global
              </a>
              .
            </p>
            <p>
              Consent to receive SMS messages is not a condition of purchase.
              Carriers are not liable for delayed or undelivered messages. We
              retain records of SMS opt-in consent in accordance with
              regulatory requirements.
            </p>
          </section>

          <section className="rb-policy-section">
            <h2 className="rb-policy-h2">Eligibility</h2>
            <p>
              You must be at least 18 years old to use our website or services.
            </p>
            <p>
              By using our services or submitting your information, you
              represent and warrant that you are 18 years of age or older.
            </p>
          </section>

          <section className="rb-policy-section">
            <h2 className="rb-policy-h2">Intellectual Property</h2>
            <p>
              All content on this website, including text, graphics, logos,
              systems frameworks, methodologies, and materials, is the
              property of Rosebud Global Ltd unless otherwise stated.
            </p>
            <p>
              You may not reproduce, distribute, modify, or commercially
              exploit any material without prior written consent.
            </p>
          </section>

          <section className="rb-policy-section">
            <h2 className="rb-policy-h2">Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Rosebud shall not be
              liable for:
            </p>
            <ul className="rb-policy-list">
              <li>Indirect or consequential losses</li>
              <li>Loss of revenue or profits</li>
              <li>Business interruption</li>
              <li>Loss of data</li>
              <li>Delays in message delivery</li>
              <li>Technology platform failures outside our control</li>
            </ul>
            <p>
              Our total liability in connection with any claim shall not exceed
              the amount paid to us for services in the preceding 30 days,
              where applicable.
            </p>
          </section>

          <section className="rb-policy-section">
            <h2 className="rb-policy-h2">Third-Party Services</h2>
            <p>
              Our website and services may integrate with third-party providers
              (e.g., analytics platforms, CRM systems, messaging services,
              automation tools).
            </p>
            <p>
              We are not responsible for the policies, practices, or content of
              third-party platforms.
            </p>
          </section>

          <section className="rb-policy-section">
            <h2 className="rb-policy-h2">Data Protection and Privacy</h2>
            <p>
              Your personal data is handled in accordance with our Privacy
              Policy. Please review our Privacy Policy here:
            </p>
            <p>
              <a href="/privacy" className="rb-policy-link">
                rosebud.global/privacy
              </a>
            </p>
          </section>

          <section className="rb-policy-section">
            <h2 className="rb-policy-h2">Modifications</h2>
            <p>
              We may update these Terms at any time to reflect changes in law,
              regulation, or business operations. Updated Terms will be posted
              on this page with a revised effective date. Continued use of the
              website constitutes acceptance of any changes.
            </p>
          </section>

          <section className="rb-policy-section">
            <h2 className="rb-policy-h2">Governing Law</h2>
            <p>
              These Terms shall be governed by and interpreted in accordance
              with the laws of England and Wales. Any disputes arising under
              these Terms shall be subject to the exclusive jurisdiction of the
              courts of England and Wales.
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
                www.ico.org.uk
              </a>
            </p>
          </section>

          <section className="rb-policy-section">
            <h2 className="rb-policy-h2">Contact Us</h2>
            <p>
              If you have any questions or concerns about these Terms, please
              contact:
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
