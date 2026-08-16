import type { NextConfig } from "next";
import { withBotId } from "botid/next/config";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Keep build-hashed static assets (with their ?dpl= query noise) out of
        // the index so the GSC coverage report stays readable. Do NOT robots.txt
        // disallow these — Google must be able to crawl them to see the noindex.
        source: "/_next/static/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
      {
        // Sitewide security headers — confirmed missing 2026-08-16 (external
        // scan). HSTS is already set at the platform level (Vercel), not
        // duplicated here.
        source: "/:path*",
        headers: [
          // Blocks framing by any other origin (clickjacking). SAMEORIGIN,
          // not DENY, since nothing on the site needs to self-embed but
          // there's no reason to rule it out either.
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Stops the browser guessing a response's MIME type from content
          // rather than trusting the declared Content-Type.
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Full URL sent same-origin (analytics, internal links); only the
          // origin sent cross-origin over HTTPS; nothing sent on a downgrade
          // to HTTP. Avoids leaking full URLs (any query params included) to
          // third-party sites a visitor clicks through to.
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Explicitly denies browser APIs this site has no use for. Leaves
          // `payment` untouched — Stripe Checkout may rely on it.
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
          // Allowlist built 2026-08-16 by auditing every external
          // script/style/connect/frame the app actually loads (grep across
          // src + public, cross-checked against each usage site):
          //  - 'unsafe-inline' script-src: the JSON-LD schema tags
          //    (layout.tsx, most page.tsx files) are inline <script> with no
          //    nonce plumbing; blocking them kills structured data sitewide.
          //  - 'unsafe-inline' style-src: the codebase uses React inline
          //    `style={{...}}` extensively; blocking it breaks layout
          //    everywhere, not just one page.
          //  - app.cal.eu / cal.eu: the Cal.com booking embed (CalEmbed.tsx,
          //    CalOnboarding.tsx) dynamically injects a <script src> from
          //    app.cal.eu and renders its calendar in an iframe on cal.eu.
          //  - eu.i.posthog.com / eu-assets.i.posthog.com: PostHog capture +
          //    session-recording ingestion and its lazily-loaded recorder
          //    asset.
          //  - 9a0c3ced.sibforms.com: the Brevo waitlist form
          //    (jay-waitlist/JayWaitlist.tsx) posts via fetch(), not a form
          //    submit, so it needs connect-src not form-action.
          //  - fonts.googleapis.com / fonts.gstatic.com: only plan-finder.html
          //    (raw static HTML) loads Google Fonts over the network — the
          //    main app self-hosts its fonts at build time via
          //    next/font/google and never calls out to Google for them.
          //  - Stripe needs NO entry anywhere: checkout is a server-issued
          //    redirect (`window.location.href` to a Stripe-hosted URL) —
          //    confirmed no @stripe/stripe-js or Elements import exists
          //    anywhere in src. CSP doesn't gate script-triggered top-level
          //    navigation, so this is correct, not an oversight.
          //  - Resend has no entry: it's called only from server routes
          //    (src/lib/email.ts), never loaded in the browser.
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://app.cal.eu https://eu.i.posthog.com https://eu-assets.i.posthog.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data:",
              "connect-src 'self' https://eu.i.posthog.com https://eu-assets.i.posthog.com https://app.cal.eu https://cal.eu https://9a0c3ced.sibforms.com",
              "frame-src https://app.cal.eu https://cal.eu",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'",
              "upgrade-insecure-requests",
            ].join("; "),
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // The setter role was renamed to Sales Development Representative and the
      // slug moved from /careers/appointment-setter to /careers/sdr. Keep the
      // old links (and any live LinkedIn posts) alive.
      {
        source: "/careers/appointment-setter",
        destination: "/careers/sdr",
        permanent: true,
      },
      {
        source: "/careers/appointment-setter/apply",
        destination: "/careers/sdr/apply",
        permanent: true,
      },
      // NOTE: the launch redirects (/agents/insurance, /solutions,
      // /industries/healthcare) live in middleware.ts, emitted as literal 301s
      // (next.config `permanent: true` emits 308). Keep them there, not here, so
      // every launch redirect is a uniform 301 for the launch verification step.
    ];
  },
  async rewrites() {
    return [
      // Serve the static plan-finder quiz (public/plan-finder.html) at a clean
      // URL. Linked from the pricing page's "take the 2-minute fit quiz" CTA.
      { source: "/plan-finder", destination: "/plan-finder.html" },
    ];
  },
};

export default withBotId(nextConfig);
