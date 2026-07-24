import type { NextConfig } from "next";
import { withBotId } from "botid/next/config";

const nextConfig: NextConfig = {
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
      // GSC "Not found (404)" drilldown fixes (2026-07-23). /agents/recruitment
      // and /web3-waitlist are deliberately left (recruitment goes 410 with the
      // rest of recruitment; web3-waitlist stays a 404).
      {
        source: "/agents/insurance",
        destination: "/industries/insurance",
        permanent: true,
      },
      {
        // No capability index route exists (/capabilities is [slug]-only) → homepage.
        source: "/solutions",
        destination: "/",
        permanent: true,
      },
      {
        // Industry slug renamed healthcare → dental-aesthetic (US vertical +
        // primary term "patient intake software"). Keep old links alive.
        source: "/industries/healthcare",
        destination: "/industries/dental-aesthetic",
        permanent: true,
      },
    ];
  },
};

export default withBotId(nextConfig);
