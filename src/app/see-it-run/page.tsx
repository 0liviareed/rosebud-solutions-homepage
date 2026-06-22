import type { Metadata } from "next";
import SeeItRun from "./SeeItRun";

/**
 * /see-it-run — "Get a demo" booking/demo page. Linked from the primary nav
 * (beside Resources) + footer, and from the cold email sequence (TP2/TP4).
 * Indexable now that it's a public, nav-linked conversion page. Internal links
 * point to the plain path (no UTM); only the email link carries utm_campaign.
 */
export const metadata: Metadata = {
  title: "Get a demo — See it run for your business",
  description:
    "Book a call with Rosebud Solutions and see the first operational job we'd take off your desk — whether or not we work together.",
  alternates: { canonical: "/see-it-run" },
  openGraph: {
    title: "Get a demo — See it run for your business | Rosebud Global",
    description:
      "Book a call with Rosebud Solutions and see the first operational job we'd take off your desk.",
    url: "https://rosebud.global/see-it-run",
    type: "website",
  },
};

export default function Page() {
  return <SeeItRun />;
}
