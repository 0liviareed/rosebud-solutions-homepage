import type { Metadata } from "next";
import AboutV2 from "@/components/redesign/AboutV2";

export const metadata: Metadata = {
  title: "About",
  description:
    "Rosebud Solutions is a Demand Capture & Conversion Infrastructure company, providing seven capabilities on one engine that carry every enquiry through to a booked appointment.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <AboutV2 />;
}
