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
    "A 30-minute call. We map where your week goes and show you the first job we'd hand back. Book a time with Rosebud Solutions.",
  alternates: { canonical: "/see-it-run" },
  openGraph: {
    title: "Get a demo — See it run for your business | Rosebud Global",
    description:
      "A 30-minute call. We map where your week goes and show you the first job we'd hand back.",
    url: "https://rosebud.global/see-it-run",
    type: "website",
  },
};

export default function Page() {
  return <SeeItRun />;
}
