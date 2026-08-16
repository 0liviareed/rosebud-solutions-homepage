import type { Metadata } from "next";
import LegalPage from "@/components/redesign/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms governing use of the Rosebud Global Ltd website, the Rosebud Solutions platform, and the inquiry-handling services run on your behalf — acceptable use, service levels, and liability.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms of Service | Rosebud Global",
    description:
      "The terms governing use of the Rosebud Global Ltd website, the Rosebud Solutions platform, and the inquiry-handling services run on your behalf — acceptable use, service levels, and liability.",
    url: "https://rosebud.global/terms",
    type: "website",
  },
};

const BREADCRUMBS = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://rosebud.global/" },
    { "@type": "ListItem", position: 2, name: "Terms of Service", item: "https://rosebud.global/terms" },
  ],
};

export default function TermsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMBS) }}
      />
      <LegalPage
        title={<>Terms of <em>Service.</em></>}
        crumbLabel="Terms of Service"
        lastUpdated="July 22, 2026"
      >
          {/* Intro */}
          <p className="rb-legal-intro">
            These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the
            website located at{" "}
            <a
              href="https://rosebud.global"
              className="rb-legal-link"
            >
              https://rosebud.global
            </a>{" "}
            and any related services provided by Rosebud Global Ltd (company
            number 16623472, trading as &ldquo;Rosebud Solutions&rdquo;,
            &ldquo;Rosebud Global&rdquo;,
            &ldquo;Rosebud,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
            &ldquo;our&rdquo;).
          </p>
          <p className="rb-legal-intro">
            By accessing our website, submitting your information, or engaging
            with our services, you agree to be bound by these Terms.
          </p>

          <section className="rb-legal-section">
            <h2 className="rb-legal-h2">Company Information</h2>
            <div className="rb-legal-contact">
              <p>Rosebud Global Ltd</p>
              <p>Trading as: Rosebud Solutions</p>
              <p>Company number: 16623472</p>
              <p>London, United Kingdom</p>
              <p>
                Email:{" "}
                <a
                  href="mailto:contact@rosebud.global"
                  className="rb-legal-link"
                >
                  contact@rosebud.global
                </a>
              </p>
            </div>
          </section>

          <section className="rb-legal-section">
            <h2 className="rb-legal-h2">Use of Our Website and Services</h2>
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

          <section className="rb-legal-section">
            <h2 className="rb-legal-h2">Consultations and Services</h2>
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

          <section className="rb-legal-section">
            <h2 className="rb-legal-h2">The Rosebud Solutions Platform</h2>
            <p>
              In addition to consultation and advisory services, Rosebud
              Solutions offers a subscription-based demand-capture and
              conversion platform (the &ldquo;Platform&rdquo;) that captures
              inquiries from your channels, qualifies them, and books
              appointments into your calendar and CRM. The specific capabilities
              and any optional modules available to you depend on the plan you
              select at checkout.
            </p>
            <p>
              Access to the Platform is provided on a subscription basis and is
              subject to these Terms. We may improve, modify, or discontinue
              features from time to time; where a change materially reduces core
              functionality of your plan, we will give you reasonable notice.
            </p>
          </section>

          <section className="rb-legal-section">
            <h2 className="rb-legal-h2">Your Account</h2>
            <p>
              To purchase a subscription you must create an account with a valid
              email address, a password, and accurate business details. You are
              responsible for keeping your login credentials secure and for all
              activity that occurs under your account.
            </p>
            <p>
              You agree to provide accurate, current, and complete information
              and to keep it up to date. We may suspend or terminate accounts
              that are used in breach of these Terms, that contain false
              information, or where required for legal, security, or operational
              reasons.
            </p>
          </section>

          <section className="rb-legal-section">
            <h2 className="rb-legal-h2">Plans, Fees and Billing</h2>
            <ul className="rb-legal-list">
              <li>
                Subscriptions are offered on tiered plans, billed either monthly
                or annually, in the currency (GBP or USD) shown at checkout.
                Optional add-ons &mdash; including closed-loop attribution,
                additional seats, and capability modules &mdash; may be added to
                your plan for the fees shown at checkout.
              </li>
              <li>
                Fees are charged at the time of purchase and, for recurring
                subscriptions, automatically at the start of each renewal period
                until you cancel. Annual plans are billed for the full year in
                advance; monthly plans renew each month.
              </li>
              <li>
                Prices are exclusive of applicable taxes (such as VAT), which are
                added at checkout where required by law.
              </li>
              <li>
                We may change our prices. Any change will apply from your next
                renewal, and we will give you reasonable advance notice.
              </li>
              <li>
                Payments are processed by Stripe. By subscribing, you authorise
                us, through Stripe, to charge your chosen payment method for your
                plan and any add-ons on a recurring basis. We do not store your
                full card details &mdash; see our Privacy Policy and the
                Third-Party Services section below.
              </li>
            </ul>
          </section>

          <section className="rb-legal-section">
            <h2 className="rb-legal-h2">Onboarding</h2>
            <p>
              Each subscription includes an onboarding session, which you can
              book using a private link provided to you after purchase. The
              onboarding booking is available only to customers with an active
              subscription. During onboarding we agree how the Platform will
              qualify and handle inquiries for your business and connect your
              tools.
            </p>
          </section>

          <section className="rb-legal-section">
            <h2 className="rb-legal-h2">Cancellation and Refunds</h2>
            <p>
              You may cancel your subscription at any time from your account or
              by contacting us at{" "}
              <a href="mailto:contact@rosebud.global" className="rb-legal-link">
                contact@rosebud.global
              </a>
              . When you cancel, your subscription remains active until the end
              of the current billing period and will not renew after that.
            </p>
            <p>
              <strong>Refunds.</strong> If you cancel before your onboarding
              session has taken place, you are entitled to a full refund of the
              fees paid for the current period. Once your onboarding session has
              taken place, fees are non-refundable, and we do not provide
              refunds for partial or unused periods, except where a refund is
              required by law.
            </p>
          </section>

          <section className="rb-legal-section">
            <h2 className="rb-legal-h2">Consumer Cancellation Rights</h2>
            <p>
              Our services are intended for businesses. If you are a
              &ldquo;consumer&rdquo; under UK law (for example, a sole trader
              purchasing outside your trade), you may have a statutory right
              under the Consumer Contracts (Information, Cancellation and
              Additional Charges) Regulations 2013 to cancel within 14 days of
              purchase.
            </p>
            <p>
              Because our services begin promptly, by purchasing and asking us to
              begin &mdash; including by booking or attending your onboarding
              session &mdash; within that 14-day period, you expressly request
              that we start during the cancellation period and acknowledge that
              you lose the right to cancel once the service has been fully
              performed. This does not affect any other statutory rights you may
              have, and our refund policy above continues to apply.
            </p>
          </section>

          <section className="rb-legal-section">
            <h2 className="rb-legal-h2">
              Your Responsibilities for Data You Process
            </h2>
            <p>
              When you use the Platform to capture and process inquiries, you are
              the controller of that personal data and we act as your processor.
              You are responsible for ensuring you have a lawful basis and any
              necessary consents to collect and process the inquiry data you run
              through the Platform, and for complying with applicable
              data-protection and marketing laws.
            </p>
            <p>
              Our processing of that data on your behalf is governed by our{" "}
              <a href="/dpa" className="rb-legal-link">
                Data Processing Agreement
              </a>
              , which forms part of these Terms.
            </p>
            <p>
              You must not use the Platform to process unlawful content, to
              contact individuals without a lawful basis, or in any way that
              infringes the rights of others.
            </p>
          </section>

          <section className="rb-legal-section">
            <h2 className="rb-legal-h2">SMS Communications</h2>
            <p>
              By providing your mobile number and opting in via our website
              form, you consent to receive SMS messages from Rosebud Global Ltd
              (trading as Rosebud Solutions). These messages may include:
            </p>
            <ul className="rb-legal-list">
              <li>Responses to inquiries</li>
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
                className="rb-legal-link"
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

          <section className="rb-legal-section">
            <h2 className="rb-legal-h2">Eligibility</h2>
            <p>
              You must be at least 18 years old to use our website or services.
            </p>
            <p>
              By using our services or submitting your information, you
              represent and warrant that you are 18 years of age or older.
            </p>
          </section>

          <section className="rb-legal-section">
            <h2 className="rb-legal-h2">Intellectual Property</h2>
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

          <section className="rb-legal-section">
            <h2 className="rb-legal-h2">Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Rosebud shall not be
              liable for:
            </p>
            <ul className="rb-legal-list">
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

          <section className="rb-legal-section">
            <h2 className="rb-legal-h2">Third-Party Services</h2>
            <p>
              Our website and services integrate with third-party providers,
              including Stripe for payment processing, and analytics platforms,
              CRM systems, messaging services, and automation tools. Payments are
              handled by Stripe and are subject to Stripe&rsquo;s own terms; your
              card details are provided directly to Stripe and are not stored by
              us.
            </p>
            <p>
              We are not responsible for the policies, practices, or content of
              third-party platforms. The personal data we share with these
              providers is described in our Privacy Policy.
            </p>
          </section>

          <section className="rb-legal-section">
            <h2 className="rb-legal-h2">Data Protection and Privacy</h2>
            <p>
              Your personal data is handled in accordance with our Privacy
              Policy. Please review our Privacy Policy here:
            </p>
            <p>
              <a href="/privacy" className="rb-legal-link">
                rosebud.global/privacy
              </a>
            </p>
          </section>

          <section className="rb-legal-section">
            <h2 className="rb-legal-h2">Modifications</h2>
            <p>
              We may update these Terms at any time to reflect changes in law,
              regulation, or business operations. Updated Terms will be posted
              on this page with a revised effective date. Continued use of the
              website constitutes acceptance of any changes.
            </p>
          </section>

          <section className="rb-legal-section">
            <h2 className="rb-legal-h2">Governing Law</h2>
            <p>
              These Terms shall be governed by and interpreted in accordance
              with the laws of England and Wales. Any disputes arising under
              these Terms shall be subject to the exclusive jurisdiction of the
              courts of England and Wales.
            </p>
          </section>

          <section className="rb-legal-section">
            <h2 className="rb-legal-h2">Complaints</h2>
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
                className="rb-legal-link"
              >
                www.ico.org.uk
              </a>
            </p>
          </section>

          <section className="rb-legal-section">
            <h2 className="rb-legal-h2">Contact Us</h2>
            <p>
              If you have any questions or concerns about these Terms, please
              contact:
            </p>
            <div className="rb-legal-contact">
              <p>Rosebud Global Ltd</p>
              <p>
                Email:{" "}
                <a
                  href="mailto:contact@rosebud.global"
                  className="rb-legal-link"
                >
                  contact@rosebud.global
                </a>
              </p>
              <p>London, United Kingdom</p>
            </div>
          </section>
      </LegalPage>
    </>
  );
}
