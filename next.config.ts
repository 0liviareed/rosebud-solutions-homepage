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
};

export default withBotId(nextConfig);
