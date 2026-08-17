import type { Metadata } from "next";
import FoundersStack from "./FoundersStack";

export const metadata: Metadata = {
  title: { absolute: "The Founder's Financial Stack | Jay Okojie" },
  description:
    "Stop guessing where your money went. A Google Sheets tracker for founders managing personal and business finances — income, wealth allocation, net worth.",
  alternates: { canonical: "/founders-stack" },
  openGraph: {
    title: "The Founder's Financial Stack | Jay Okojie",
    description:
      "Stop guessing where your money went. A Google Sheets tracker for founders managing personal and business finances — income, wealth allocation, net worth.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "The Founder's Financial Stack | Jay Okojie",
    description:
      "Stop guessing where your money went. A Google Sheets tracker for founders managing personal and business finances — income, wealth allocation, net worth.",
  },
};

export default function Page() {
  return <FoundersStack />;
}
