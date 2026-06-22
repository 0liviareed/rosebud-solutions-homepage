import type { Metadata } from "next";
import SeeItRun from "./SeeItRun";

/**
 * /see-it-run — unlisted booking/demo landing page for the cold email
 * sequence (TP2/TP4). Not linked from any nav or menu. noindex so it stays
 * out of search and doesn't dilute the indexed marketing pages; it's only
 * meant to be reached via the UTM-tagged link in the email.
 */
export const metadata: Metadata = {
  title: "See it run for your business",
  description:
    "A 30-minute call. We map where your week goes and show you the first job we'd hand back. Book a time with Rosebud Solutions.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/see-it-run" },
};

export default function Page() {
  return <SeeItRun />;
}
