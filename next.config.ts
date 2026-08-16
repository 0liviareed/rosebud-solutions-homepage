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
        // duplicated here. CSP deliberately not included: needs a careful
        // allowlist (Stripe, PostHog, Google Fonts, Resend, Cal.com embed,
        // etc.) or it breaks the site — treat as its own follow-up, not
        // bundled into this low-risk batch.
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
