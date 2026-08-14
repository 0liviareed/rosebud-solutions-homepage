import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Processing Agreement",
  description:
    "Data Processing Agreement governing Rosebud Solutions' processing of Contact Data on behalf of its customers.",
  alternates: { canonical: "/dpa" },
};

const BREADCRUMBS = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://rosebud.global/" },
    { "@type": "ListItem", position: 2, name: "Data Processing Agreement", item: "https://rosebud.global/dpa" },
  ],
};

export default function DpaPage() {
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
            <span className="rb-num">&mdash;</span>Home &middot; Data Processing Agreement
          </p>
          <h1 className="rb-page-hero-h1">
            Data Processing <em>Agreement.</em>
          </h1>
          <p className="rb-page-hero-caption">Last update: July 22, 2026</p>
        </div>
      </section>

      <main className="rb-policy">
        <div className="rb-policy-wrap">
          {/* Intro */}
          <p className="rb-policy-intro">
            This Data Processing Agreement (&ldquo;DPA&rdquo;) forms part of, and
            is incorporated into, the{" "}
            <a href="/terms" className="rb-policy-link">
              Terms of Service
            </a>{" "}
            between Rosebud Global Ltd (company number 16623472, trading as
            &ldquo;Rosebud Solutions&rdquo;, &ldquo;we,&rdquo; &ldquo;us,&rdquo;
            or &ldquo;our&rdquo;) and the customer that subscribes to the Service
            (&ldquo;you,&rdquo; the &ldquo;Customer&rdquo;). By subscribing, you
            agree to this DPA in respect of the personal data we process on your
            behalf.
          </p>
          <p className="rb-policy-intro">
            This DPA reflects the requirements of Article 28 of the UK GDPR and
            applies where we process Contact Data as your processor. It does not
            govern data for which we are the controller, which is covered by our{" "}
            <a href="/privacy" className="rb-policy-link">
              Privacy Policy
            </a>
            .
          </p>

          <section className="rb-policy-section">
            <h2 className="rb-policy-h2">1. Definitions</h2>
            <ul className="rb-policy-list">
              <li>
                <strong>&ldquo;Contact Data&rdquo;</strong> means personal data
                about your leads, inquirers, prospects, and customers that the
                Service processes on your behalf.
              </li>
              <li>
                <strong>&ldquo;Controller,&rdquo; &ldquo;Processor,&rdquo;
                &ldquo;Data Subject,&rdquo; &ldquo;Personal Data,&rdquo;
                &ldquo;Processing,&rdquo;</strong> and{" "}
                <strong>&ldquo;Personal Data Breach&rdquo;</strong> have the
                meanings given in the UK GDPR.
              </li>
              <li>
                <strong>&ldquo;UK GDPR&rdquo;</strong> means the retained EU
                General Data Protection Regulation as it forms part of UK law,
                together with the Data Protection Act 2018.
              </li>
              <li>
                <strong>&ldquo;Subprocessor&rdquo;</strong> means any third party
                engaged by us to process Contact Data.
              </li>
            </ul>
          </section>

          <section className="rb-policy-section">
            <h2 className="rb-policy-h2">2. Roles of the Parties</h2>
            <p>
              For Contact Data, you are the Controller and we are your Processor.
              You are responsible for the lawfulness of the Contact Data and for
              having a valid lawful basis and any necessary consents. We process
              Contact Data only on your documented instructions, including as set
              out in this DPA, the Terms, and your configuration of the Service,
              unless required to do otherwise by law (in which case we will inform
              you unless legally prohibited).
            </p>
          </section>

          <section className="rb-policy-section">
            <h2 className="rb-policy-h2">3. Details of the Processing</h2>
            <p>
              <strong>Subject matter and duration.</strong> Provision of the
              Rosebud Solutions Service for the duration of your subscription and
              any agreed export period thereafter.
            </p>
            <p>
              <strong>Nature and purpose.</strong> As Processor, and only to
              provide the Service on your instructions, we:
            </p>
            <ul className="rb-policy-list">
              <li>
                capture inquiries across your active channels &mdash; web form,
                email, SMS, WhatsApp and Instagram &mdash; into a single record;
              </li>
              <li>
                score each record against your own qualification rules and route
                it (continue, escalate to your staff, or apply your not-qualified
                disposition);
              </li>
              <li>
                book appointments into your calendar and send confirmations,
                reminders and reschedule messages;
              </li>
              <li>
                run re-engagement sequences to contacts that have gone cold or are
                due for recall;
              </li>
              <li>
                synchronise the record into your CRM, which remains your system of
                record; and
              </li>
              <li>
                for attribution clients only, produce a consented first-party
                outcome signal.
              </li>
            </ul>
            <p>
              <strong>Categories of data subject.</strong> Your leads, inquirers,
              prospects and customers.
            </p>
            <p>
              <strong>Categories of personal data.</strong> Contact identifiers,
              inquiry content and channel, qualification fields and status,
              appointment and engagement events, and &mdash; where you provide it
              &mdash; an expected or actual value. We do not enrich Contact Data
              with third-party or sourced data as part of the Service. No special
              category data is required by the Service; you should not submit
              special category data unless separately agreed.
            </p>
          </section>

          <section className="rb-policy-section">
            <h2 className="rb-policy-h2">4. Our Obligations</h2>
            <ul className="rb-policy-list">
              <li>
                process Contact Data only on your documented instructions;
              </li>
              <li>
                ensure persons authorised to process Contact Data are bound by
                confidentiality;
              </li>
              <li>
                implement appropriate technical and organizational measures to
                ensure a level of security appropriate to the risk, in accordance
                with Article 32 UK GDPR;
              </li>
              <li>
                respect the conditions in this DPA for engaging Subprocessors;
              </li>
              <li>
                assist you, taking into account the nature of the processing, in
                responding to Data Subject requests and in meeting your
                obligations regarding security, breach notification, data
                protection impact assessments, and prior consultation; and
              </li>
              <li>
                at your choice, delete or return Contact Data at the end of the
                provision of the Service, as set out in section 9.
              </li>
            </ul>
          </section>

          <section className="rb-policy-section">
            <h2 className="rb-policy-h2">5. Subprocessors</h2>
            <p>
              You give general authorisation for us to engage Subprocessors to
              provide the Service, across these categories: hosting and database
              infrastructure; your CRM and calendar; messaging delivery (email,
              SMS, WhatsApp and Instagram); AI model providers; payment
              processing; security and bot detection; and product and website
              analytics. A named Subprocessor register &mdash; provider, purpose,
              data categories and processing region &mdash; is maintained and
              available to you on request.
            </p>
            <p>
              We will impose data protection terms on each Subprocessor no less
              protective than those in this DPA and remain responsible for their
              performance. We will give you [notice period &mdash; to be
              confirmed] notice of any intended addition or replacement of a
              Subprocessor, during which you may reasonably object.
            </p>
          </section>

          <section className="rb-policy-section">
            <h2 className="rb-policy-h2">6. Data Subject Requests</h2>
            <p>
              Taking into account the nature of the processing, we will assist you
              by appropriate technical and organizational measures, insofar as
              possible, to respond to requests from Data Subjects exercising their
              rights. If we receive such a request directly, we will refer the
              Data Subject to you and will not respond except on your
              instructions.
            </p>
          </section>

          <section className="rb-policy-section">
            <h2 className="rb-policy-h2">7. Personal Data Breaches</h2>
            <p>
              We will notify you without undue delay after becoming aware of a
              Personal Data Breach affecting Contact Data, and will provide
              information reasonably available to us to help you meet your
              notification obligations.
            </p>
          </section>

          <section className="rb-policy-section">
            <h2 className="rb-policy-h2">8. International Transfers</h2>
            <p>
              Where processing of Contact Data involves a transfer outside the
              United Kingdom, we will ensure an appropriate transfer mechanism is
              in place (such as the UK International Data Transfer Agreement or the
              UK Addendum to the EU Standard Contractual Clauses), together with
              any supplementary measures required. [Transfer mechanisms and
              regions to be confirmed alongside the Subprocessor register.]
            </p>
          </section>

          <section className="rb-policy-section">
            <h2 className="rb-policy-h2">9. Return and Deletion</h2>
            <p>
              On termination or expiry of the Service, we will make Contact Data
              available to you for export for a period of [export window &mdash;
              to be confirmed], after which we will delete or anonymise Contact
              Data held within the Service, save where retention is required by
              law. Data already written into your own CRM is unaffected and
              remains under your control. Retention periods stated here must match
              those in the Terms and Privacy Policy.
            </p>
          </section>

          <section className="rb-policy-section">
            <h2 className="rb-policy-h2">10. Audits</h2>
            <p>
              We will make available to you information necessary to demonstrate
              compliance with this DPA and allow for and contribute to audits,
              including inspections, conducted by you or an auditor mandated by
              you, subject to reasonable notice, confidentiality, and frequency
              limits to be set out in the final DPA.
            </p>
          </section>

          <section className="rb-policy-section">
            <h2 className="rb-policy-h2">11. Relationship to the Terms</h2>
            <p>
              This DPA supplements the Terms of Service. In the event of a
              conflict between this DPA and the Terms in respect of the processing
              of Contact Data, this DPA prevails. Liability under this DPA is
              subject to the limitations and exclusions set out in the Terms.
            </p>
          </section>

          <section className="rb-policy-section">
            <h2 className="rb-policy-h2">12. Governing Law</h2>
            <p>
              This DPA is governed by the laws of England and Wales, and the
              courts of England and Wales have exclusive jurisdiction, consistent
              with the Terms of Service.
            </p>
          </section>

          <section className="rb-policy-section">
            <h2 className="rb-policy-h2">Contact</h2>
            <div className="rb-policy-contact">
              <p>Rosebud Global Ltd</p>
              <p>Company number: 16623472</p>
              <p>
                Email:{" "}
                <a href="mailto:contact@rosebud.global" className="rb-policy-link">
                  contact@rosebud.global
                </a>
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
