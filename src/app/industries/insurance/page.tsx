import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insurance · Rosebud Solutions",
  description:
    "AI automation built for insurance operations — quote intake, client follow-up, claims triage.",
};

export default function InsurancePage() {
  return (
    <main className="rb-industry-page">
      <div className="rb-industry-inner">
        <p className="rb-industry-eyebrow">
          <span className="rb-num">II</span>Industries
        </p>
        <h1 className="rb-industry-h1">
          Insurance<em>.</em>
        </h1>
        <p className="rb-industry-sub">
          Quote intake, client follow-up, claims triage — an AI operations
          layer built for insurance teams who need consistency across every
          enquiry and every policy.
        </p>
        <p className="rb-industry-note">This page is being written.</p>
      </div>
    </main>
  );
}
