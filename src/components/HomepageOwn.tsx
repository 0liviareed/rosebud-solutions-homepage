import SplitRoles, { type SplitRole } from "@/components/SplitRoles";

// Rosebud Solutions — homepage "What you actually get" section, built in the
// same split layout as the industry pages' "Every deployment includes / One
// system. All seven roles." section: a sticky left column (heading + body +
// CTAs) beside the scroll-tracking SplitRoles list (vertical rail + glowing
// orb). Copy is the homepage's five pillars; all styling is the site's native
// rb-split / rb-book-* / SplitRoles design system.

const PILLARS: SplitRole[] = [
  {
    num: "I",
    label: "Sourcing & enrichment",
    body: "AI-led research finds the right people to reach, every inbound enquiry gets caught, all of it enriched, scored on intent, and routed to your team.",
  },
  {
    num: "II",
    label: "Unified CRM",
    body: "Every conversation synced to one record that stays clean and current, so you always know exactly where things stand.",
  },
  {
    num: "III",
    label: "Omnichannel orchestration",
    body: "Voice, SMS, email, and DMs answered in one consistent voice, around the clock, in under a minute.",
  },
  {
    num: "IV",
    label: "Automated nurture",
    body: "Reminders, confirmations, and follow-ups handled for you, so nothing slips and no-one has to chase.",
  },
  {
    num: "V",
    label: "Attribution & reporting",
    body: "Pipeline, conversion, and revenue in one live view, with a brief in your inbox each morning.",
  },
];

export default function HomepageOwn({ marker = "III" }: { marker?: string }) {
  return (
    <section
      className="rb-sec rb-sec-split"
      data-rb-sec
      aria-label="What you actually get"
    >
      <div className="rb-wrap rb-split">
        {/* Left column — sticky-pinned heading + CTAs */}
        <div className="rb-split-left">
          <div className="rb-split-left-inner">
            <p className="rb-eyebrow" data-rb-fade="0">
              <span className="rb-num">{marker}</span>What you actually get
            </p>
            <h2 className="rb-h2" data-rb-fade="1">
              What&apos;s running by <em>week five.</em>
            </h2>
            <p className="rb-split-body" data-rb-fade="2">
              This isn&apos;t software you operate. It&apos;s a custom AI
              operation, built around your business and run for you, that takes
              every enquiry from first contact to booked appointment. You stay
              on the work only you can do.
            </p>
            <p className="rb-split-body rb-split-body-quiet" data-rb-fade="3">
              Five roles, one connected system. They go live together at the end
              of week five, not one at a time.
            </p>

            <div className="rb-split-ctas" data-rb-fade="3">
              <a href="/pricing" className="rb-book-link">
                <span className="rb-book-link-label">Get started</span>
                <span className="rb-book-link-arrow" aria-hidden="true">
                  <svg viewBox="0 0 36 12" width="36" height="12">
                    <path
                      className="rb-book-link-shaft"
                      d="M0 6 L28 6"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <path
                      className="rb-book-link-head"
                      d="M22 1.5 L28 6 L22 10.5"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </span>
                <span className="rb-book-link-underline" aria-hidden="true" />
              </a>
              <span className="rb-split-cta-glow-wrap">
                <span
                  className="rb-split-cta-glow rb-split-cta-glow-pedestal"
                  aria-hidden="true"
                />
                <span
                  className="rb-split-cta-glow rb-split-cta-glow-halo"
                  aria-hidden="true"
                />
                <a
                  href="https://www.cal.eu/rosebudsolutions/30min?overlayCalendar=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rb-book-cta rb-book-cta-inline"
                >
                  <span className="rb-book-cta-label">Schedule demo</span>
                  <span className="rb-book-cta-arrow" aria-hidden="true">
                    <svg viewBox="0 0 42 12" width="42" height="12">
                      <path
                        className="rb-book-cta-shaft"
                        d="M0 6 L32 6"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        fill="none"
                      />
                      <path
                        className="rb-book-cta-head"
                        d="M26 1.5 L32 6 L26 10.5"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  </span>
                  <span className="rb-book-cta-underline" aria-hidden="true" />
                </a>
              </span>
            </div>
          </div>
        </div>

        <SplitRoles
          ariaLabel="Five roles in every Rosebud deployment"
          roles={PILLARS}
        />
      </div>

      <div className="rb-wrap">
        <p className="rb-aftertext rb-aftertext-quiet" data-rb-fade="3">
          Pricing shared on the demo call — scoped to your volume and the work
          you put through it.
        </p>
      </div>
    </section>
  );
}
