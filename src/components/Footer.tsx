import Image from "next/image";
import Link from "next/link";
import CookieSettingsLink from "@/components/CookieSettingsLink";

/**
 * Footer — global, appears below every page via layout.tsx.
 *
 * Top row: Rosebud icon + social links.
 * Disclaimer: legal text, quiet register (bone-dim, 11.5px), paragraph-
 * broken for readability. Read, not skimmed.
 * Bottom: copyright on a hairline divider.
 */
export default function Footer() {
  return (
    <footer className="rb-footer" aria-label="Site footer">
      <div className="rb-footer-inner">
        <div className="rb-footer-top">
          <Link href="/" className="rb-footer-logo" aria-label="Rosebud Solutions — home">
            <Image
              src="/rosebud-icon.png"
              alt=""
              width={36}
              height={36}
              priority={false}
            />
          </Link>

          <ul className="rb-footer-social" aria-label="Social channels">
            <li>
              <a
                href="https://www.linkedin.com/company/rosebud-global/"
                target="_blank"
                rel="noopener noreferrer"
                className="rb-footer-social-link"
                aria-label="Rosebud Global on LinkedIn"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.48v6.26zM5.34 7.44a2.06 2.06 0 11.001-4.12 2.06 2.06 0 01-.001 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/rosebudglobal/"
                target="_blank"
                rel="noopener noreferrer"
                className="rb-footer-social-link"
                aria-label="Rosebud Global on Instagram"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://x.com/rosebudsolution"
                target="_blank"
                rel="noopener noreferrer"
                className="rb-footer-social-link"
                aria-label="Rosebud Solutions on X"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                  <path d="M18.9 2h3.68l-8.04 9.19L24 22h-7.4l-5.8-7.58L4.16 22H.47l8.6-9.83L0 2h7.59l5.24 6.93zm-1.3 18h2.04L6.5 3.88H4.3z" />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://www.tiktok.com/@rosebudglobal"
                target="_blank"
                rel="noopener noreferrer"
                className="rb-footer-social-link"
                aria-label="Rosebud Global on TikTok"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                  <path d="M16.6 5.82c-.9-.98-1.4-2.26-1.4-3.57h-3.09v13.44c0 1.62-1.32 2.94-2.95 2.94a2.95 2.95 0 0 1-2.95-2.94c0-1.95 1.88-3.42 3.82-2.82V9.66c-3.45-.46-6.47 2.22-6.47 5.63a5.95 5.95 0 0 0 5.95 5.94c3.29 0 5.95-2.66 5.95-5.94V9c1.25.9 2.76 1.38 4.3 1.38V7.3c-.88 0-1.75-.26-2.48-.75a4.28 4.28 0 0 1-.68-.73Z" />
                </svg>
              </a>
            </li>
          </ul>
        </div>

        <div className="rb-footer-meta">
          <div className="rb-footer-col">
            <p className="rb-footer-eyebrow">Contact</p>
            <ul className="rb-footer-links">
              <li>
                <a
                  href="mailto:contact@rosebud.global"
                  className="rb-footer-link rb-footer-link-editorial"
                >
                  <span>contact@rosebud.global</span>
                  <span className="rb-footer-link-underline" aria-hidden="true" />
                </a>
              </li>
              <li>
                {/* Internal link to the demo/booking page — plain /see-it-run,
                    no UTM so footer/direct traffic isn't attributed to email. */}
                <Link
                  href="/see-it-run"
                  className="rb-footer-link rb-footer-link-editorial"
                >
                  <span>Book a consultation</span>
                  <span className="rb-footer-link-arrow" aria-hidden="true">
                    <svg viewBox="0 0 32 12" width="32" height="12">
                      <path
                        className="rb-footer-link-shaft"
                        d="M0 6 L22 6"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        fill="none"
                      />
                      <path
                        className="rb-footer-link-head"
                        d="M17 1.5 L22 6 L17 10.5"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  </span>
                  <span className="rb-footer-link-underline" aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </div>

          <div className="rb-footer-col">
            <p className="rb-footer-eyebrow">Company</p>
            <ul className="rb-footer-links">
              <li>
                <Link href="/about" className="rb-footer-link">
                  About
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="rb-footer-link">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div className="rb-footer-col">
            <p className="rb-footer-eyebrow">Legal</p>
            <ul className="rb-footer-links">
              <li>
                <Link href="/privacy" className="rb-footer-link">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="rb-footer-link">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/dpa" className="rb-footer-link">
                  Data Processing Agreement
                </Link>
              </li>
              <li>
                <CookieSettingsLink />
              </li>
            </ul>
          </div>
        </div>

        <div className="rb-footer-divider" aria-hidden="true" />

        <div className="rb-footer-disclaimer">
          <p>
            Rosebud Global Ltd (Company No. 16623472) provides educational
            materials, proprietary frameworks, and AI automation systems
            designed to support a structured and disciplined approach to
            business operations and workforce transformation. Nothing
            contained on this website constitutes, or should be construed as,
            professional advice, legal advice, or a guarantee of outcomes. No
            content is intended to be, or should be relied upon as, a
            recommendation or solicitation to adopt any specific tool,
            system, or solution.
          </p>
          <p>
            Any reference to strategies, frameworks, or systems is provided
            for informational and educational purposes only. Any references
            to results, time savings, or operational improvements are
            illustrative only. Individual outcomes will vary materially based
            on factors including business conditions, implementation quality,
            team adoption, existing infrastructure, and execution. Nothing
            referenced on this website should be relied upon as a promise or
            guarantee of specific results.
          </p>
          <p>
            Any case studies, examples, or experiences referenced by Rosebud
            Global Ltd are not typical and do not represent expected or
            average results. We do not publish or make claims regarding
            average performance. Performance monitoring within internal or
            client frameworks is used solely to refine systems and processes,
            not to predict or promise outcomes.
          </p>
          <p>
            Where third-party platforms or services are referenced, these
            operate independently and Rosebud Global Ltd accepts no
            responsibility for their performance, availability, or
            suitability. Clients remain fully responsible for their own
            business decisions and should seek independent professional
            advice if unsure about the suitability or appropriateness of any
            solution for their individual circumstances.
          </p>
          <p>
            All content on this website, including text, images, systems,
            methodologies, and intellectual property, is the exclusive
            property of Rosebud Global Ltd. No material may be reproduced,
            distributed, or used without prior written consent.
          </p>
        </div>

        <div className="rb-footer-divider" aria-hidden="true" />

        <p className="rb-footer-copyright">
          Copyright &copy; 2026 Rosebud Global. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
