import type { Metadata } from "next";
import AboutV2 from "@/components/redesign/AboutV2";

export const metadata: Metadata = {
  title: "About",
  description:
    "Rosebud Solutions — Demand Capture & Conversion Infrastructure. Seven capabilities on one engine carry every inquiry through to a booked appointment.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <AboutV2 />;
}
