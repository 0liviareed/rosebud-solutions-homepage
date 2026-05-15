import type { Metadata } from "next";
import Link from "next/link";
import PricingFAQ from "@/components/PricingFAQ";
import PricingBrevoForm from "@/components/PricingBrevoForm";

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

const CARDS = [
  {
    num: "I",
    label: "The Build",
    body: "A live, operational system in five weeks. Discovered, configured, deployed, and integrated with the tools you already run. Your team is five Mondays away from running it.",
  },
  {
    num: "II",
    label: "The Team",
    body: "A team running the system on your behalf. Day-to-day operation, refinement as you grow, and the work the system produces handled for you — so the only thing your team touches is the work that needs them.",
  },
  {
    num: "III",
    label: "The Scope",
    body: "Five to seven roles, custom-built around your operation, working as one system. Not a tool you configure. A team you don't have to hire.",
  },
];

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

      {/* ========== PAGE HERO ========== */}
      <section className="rb-page-hero">
        <div className="rb-page-hero-inner">
          <p className="rb-page-hero-eyebrow">Rosebud Solutions</p>
          <p className="rb-page-hero-crumb">
            <span className="rb-num">·</span>Plans &amp; Pricing
          </p>
          <h1 className="rb-page-hero-h1">
            You&rsquo;re not licensing software.{" "}
            <em>You&rsquo;re commissioning a build.</em>
          </h1>
          <p className="rb-page-hero-sub">
            Custom-scoped to the operation we run for you. No per-seat fees,
            no platform charges, no surprises. To scope the right system for
            your business, we need to understand what you&rsquo;re running
            today. Every quote includes the build, the team, and the scope —
            mapped to your operation.
          </p>
        </div>
      </section>

      <main className="rb-content">
        {/* ===================== I — THREE CARDS ===================== */}
        <section
          className="rb-sec"
          data-rb-sec
          aria-label="What every engagement includes"
        >
          <div className="rb-wrap">
            <div className="rb-head">
              <p className="rb-eyebrow" data-rb-fade="0">
                <span className="rb-num">I</span>Every engagement includes
              </p>
              <h2 className="rb-h2" data-rb-fade="1">
                Three things. <em>One quote.</em>
              </h2>
            </div>

            <div className="rb-pricing-cards" data-rb-fade="2">
              {CARDS.map((card) => (
                <article key={card.num} className="rb-pricing-card">
                  <span className="rb-pricing-card-num">{card.num}</span>
                  <span className="rb-pricing-card-label">{card.label}</span>
                  <p className="rb-pricing-card-body">{card.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== II — DEEP-DIVE ===================== */}
        <section
          className="rb-sec"
          data-rb-sec
          aria-label="See it mapped to your operation"
        >
          <div className="rb-wrap">
            <div className="rb-head">
              <p className="rb-eyebrow" data-rb-fade="0">
                <span className="rb-num">II</span>What gets built
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

        {/* ===================== III — ENQUIRY FORM ===================== */}
        <section
          id="get-started"
          className="rb-sec"
          data-rb-sec
          aria-label="Tell us what you're running"
        >
          <div className="rb-wrap">
            <div className="rb-head">
              <p className="rb-eyebrow" data-rb-fade="0">
                <span className="rb-num">III</span>Get started
              </p>
              <h2 className="rb-h2" data-rb-fade="1">
                Tell us what you&rsquo;re running.{" "}
                <em>We&rsquo;ll scope the system.</em>
              </h2>
              <p className="rb-sub" data-rb-fade="2">
                A 30-minute call to understand your operation, scope the
                system, and quote the build. You leave with a clear figure —
                no follow-ups, no chasing.
              </p>
            </div>

            <div data-rb-fade="3">
              <PricingBrevoForm />
            </div>
          </div>
        </section>

        {/* ===================== IV — FAQ ===================== */}
        <section
          className="rb-sec"
          data-rb-sec
          aria-label="Frequently asked pricing questions"
        >
          <div className="rb-wrap">
            <div className="rb-head">
              <p className="rb-eyebrow" data-rb-fade="0">
                <span className="rb-num">IV</span>Frequently asked
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
      </main>
    </>
  );
}
