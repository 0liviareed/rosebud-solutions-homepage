import type { Metadata } from "next";
import JayWaitlist from "./JayWaitlist";

export const metadata: Metadata = {
  title: { absolute: "Join the Waitlist | Jay Okojie" },
  description:
    "Reserved for founders who are done figuring it out alone. Tell us where you're at and secure your spot before we open the doors in 2026.",
  alternates: { canonical: "/jay-waitlist" },
  openGraph: {
    title: "Join the Waitlist | Jay Okojie",
    description:
      "Reserved for founders who are done figuring it out alone. Tell us where you're at and secure your spot before we open the doors in 2026.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Join the Waitlist | Jay Okojie",
    description:
      "Reserved for founders who are done figuring it out alone. Tell us where you're at and secure your spot before we open the doors in 2026.",
  },
};

export default function Page() {
  return <JayWaitlist />;
}
