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
    ];
  },
};

export default withBotId(nextConfig);
