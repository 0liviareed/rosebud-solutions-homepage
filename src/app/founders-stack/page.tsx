import type { Metadata } from "next";
import FoundersStack from "./FoundersStack";

export const metadata: Metadata = {
  title: "The Founder's Financial Stack | Jay Okojie",
  description:
    "Stop guessing where your money went. A Google Sheets tracker built for founders managing personal and business finances in one place — income, wealth allocation, net worth, and more. £27, instant access.",
  openGraph: {
    title: "The Founder's Financial Stack | Jay Okojie",
    description:
      "Stop guessing where your money went. A Google Sheets tracker built for founders managing personal and business finances in one place — income, wealth allocation, net worth, and more. £27, instant access.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "The Founder's Financial Stack | Jay Okojie",
    description:
      "Stop guessing where your money went. A Google Sheets tracker built for founders managing personal and business finances in one place — income, wealth allocation, net worth, and more. £27, instant access.",
  },
};

export default function Page() {
  return <FoundersStack />;
}
