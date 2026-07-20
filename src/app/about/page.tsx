import type { Metadata } from "next";
import AboutV2 from "@/components/redesign/AboutV2";

export const metadata: Metadata = {
  title: "About — Rosebud Global",
  description:
    "The operating system between demand and revenue. Seven capabilities, one engine, carrying every enquiry from the second it lands to a booked appointment, then run for you, every day.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <AboutV2 />;
}
