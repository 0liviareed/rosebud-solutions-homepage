import type { Metadata } from "next";
import Link from "next/link";
import PricingFAQ from "@/components/PricingFAQ";
import PricingBrevoForm from "@/components/PricingBrevoForm";
import PricingCardsDrawer from "@/components/PricingCardsDrawer";
import BookDemoCTA from "@/components/BookDemoCTA";

export const metadata: Metadata = {
  title: "Pricing — Custom AI Systems Scoped to Your Operation",
  description:
    "You're not licensing software. You're commissioning a build. Custom-scoped to the operation we run for you. No per-seat fees. One setup, one monthly figure.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Pricing — Rosebud Solutions",
    description:
      "Custom-scoped to the operation we run for you. No per-seat fees, no platform charges. One setup, one monthly figure.",
    url: "https://rosebud.global/pricing",
    type: "website",
  },
};

const BREADCRUMBS = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://rosebud.global/" },
    {
      "@type": "ListItem",
      position: 2,
      name: "Pricing",
      item: "https://rosebud.global/pricing",
    },
  ],
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "How is pricing structured?", acceptedAnswer: { "@type": "Answer", text: "Every engagement has two components: a one-time setup fee covering the build, and a monthly retainer covering the team running the system on your behalf. The exact figures are scoped on the demo call against your enquiry volume and workflow complexity." } },
    { "@type": "Question", name: "Why isn't there a price on this page?", acceptedAnswer: { "@type": "Answer", text: "Every operation we build is scoped to the business we're building it for. A two-person dental practice and a fifteen-consultant recruitment agency need different systems, different integrations, and different operational load on our side. Templated pricing would mean templated systems." } },
    { "@type": "Question", name: "What determines the retainer figure?", acceptedAnswer: { "@type": "Answer", text: "Enquiry volume, number of integrations, workflow complexity, and the operational load of running the system on your behalf." } },
    { "@type": "Question", name: "What happens in the five-week build?", acceptedAnswer: { "@type": "Answer", text: "Week one is discovery. Weeks two to four are configuration and integration. Week five is testing and sign-off. On the Monday of week six, the system is live." } },
    { "@type": "Question", name: "Do I own the system?", acceptedAnswer: { "@type": "Answer", text: "Yes. Full access, full credentials, full data. The IP and infrastructure sit in your accounts. We operate it during the engagement; you own it before, during, and after." } },
    { "@type": "Question", name: "Is there a minimum term?", acceptedAnswer: { "@type": "Answer", text: "Twelve months. The system needs time to learn your data, refine its logic, and produce compounding results." } },
  ],
};

const VERTICALS = [
  {
    href: "/industries/recruitment",
    title: "Recruitment",
    desc: "Sourcing. Screening. Scheduling.",
  },
  {
    href: "/industries/insurance",
    title: "Insurance",
    desc: "Quotes. Claims. Renewals.",
  },
  {
    href: "/industries/healthcare",
    title: "Dental, Aesthetic & Private Healthcare",
    desc: "Intake. Scheduling. Recall.",
  },
];

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMBS) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />

      <main className="rb-content rb-pricing-page">
        {/* ===================== TWO-COLUMN HERO + CARDS ===================== */}
        <section
          className="rb-sec rb-pricing-split-sec"
          data-rb-sec
          aria-label="Pricing overview"
        >
          <div className="rb-wrap rb-pricing-split">
            {/* Left column — eyebrow, H1, subhead, body, three cards */}
            <div className="rb-pricing-left">
              <p className="rb-eyebrow" data-rb-fade="0">
                <span className="rb-num">·</span>Plans &amp; Pricing
              </p>
              <h1 className="rb-pricing-h1" data-rb-fade="1">
                You&rsquo;re not licensing software.{" "}
                <em>You&rsquo;re commissioning a build.</em>
              </h1>
              <p className="rb-pricing-subhead" data-rb-fade="2">
                Custom-scoped to the operation we run for you. No per-seat
                fees, no platform charges, no surprises.
              </p>
              <p className="rb-pricing-body" data-rb-fade="3">
                To scope the right system for your business, we need to
                understand what you&rsquo;re running today. Every quote
                includes:
              </p>

              <div data-rb-fade="4">
                <PricingCardsDrawer />
              </div>
            </div>

            {/* Right column — sticky form */}
            <aside className="rb-pricing-right">
              <div className="rb-pricing-right-sticky">
                <div className="rb-pricing-form-head">
                  <p className="rb-eyebrow" data-rb-fade="0">
                    <span className="rb-num">·</span>Get started
                  </p>
                  <h2 className="rb-pricing-form-h2" data-rb-fade="1">
                    Tell us what you&rsquo;re running.{" "}
                    <em>We&rsquo;ll scope the system.</em>
                  </h2>
                  <p className="rb-pricing-form-sub" data-rb-fade="2">
                    A 30-minute call to understand your operation, scope the
                    system, and quote the build. You leave with a clear
                    figure — no follow-ups, no chasing.
                  </p>
                </div>
                <div data-rb-fade="3">
                  <PricingBrevoForm />
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* ===================== DEEP-DIVE ===================== */}
        <section
          className="rb-sec"
          data-rb-sec
          aria-label="See it mapped to your operation"
        >
          <div className="rb-wrap">
            <div className="rb-head">
              <p className="rb-eyebrow" data-rb-fade="0">
                <span className="rb-num">·</span>What gets built
              </p>
              <h2 className="rb-h2" data-rb-fade="1">
                See it mapped to <em>your operation.</em>
              </h2>
              <p className="rb-sub" data-rb-fade="2">
                Every deployment is scoped to the vertical we&rsquo;re
                building for. Each subpage breaks down the seven roles, the
                integrations, and what changes on day one.
              </p>
            </div>

            <div className="rb-pricing-verticals" data-rb-fade="3">
              {VERTICALS.map((v) => (
                <Link
                  key={v.href}
                  href={v.href}
                  className="rb-pricing-vertical"
                >
                  <span className="rb-pricing-vertical-title">{v.title}</span>
                  <span className="rb-pricing-vertical-desc">{v.desc}</span>
                  <span
                    className="rb-pricing-vertical-arrow"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== FAQ ===================== */}
        <section
          className="rb-sec"
          data-rb-sec
          aria-label="Frequently asked pricing questions"
        >
          <div className="rb-wrap">
            <div className="rb-head">
              <p className="rb-eyebrow" data-rb-fade="0">
                <span className="rb-num">·</span>Frequently asked
              </p>
              <h2 className="rb-h2" data-rb-fade="1">
                The pricing questions we get on{" "}
                <em>every demo call.</em>
              </h2>
              <p className="rb-sub" data-rb-fade="2">
                Everything you need to know about how Rosebud pricing works.
              </p>
            </div>

            <div data-rb-fade="3">
              <PricingFAQ />
            </div>
          </div>
        </section>

        {/* ===================== BOOK A CONSULTATION CTA ===================== */}
        <section
          id="rb-book"
          className="rb-sec"
          data-rb-sec
          aria-label="Book a consultation"
        >
          <div className="rb-wrap">
            <div className="rb-head">
              <p className="rb-eyebrow" data-rb-fade="0">
                <span className="rb-num">·</span>Book a call
              </p>
              <h2 className="rb-h2" data-rb-fade="1">
                Skip the form. <em>Book the call.</em>
              </h2>
              <p className="rb-sub" data-rb-fade="2">
                If you already know what you&rsquo;re looking for, grab a
                30-minute slot directly.
              </p>
            </div>

            <div data-rb-fade="3">
              <BookDemoCTA href="https://cal.eu/rosebudsolutions/30min" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
