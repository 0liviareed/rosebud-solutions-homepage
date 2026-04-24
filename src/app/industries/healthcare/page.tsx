import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Healthcare — Custom AI System",
  description:
    "AI automation built for healthcare operations — patient intake, appointment scheduling, care follow-up.",
  alternates: { canonical: "/industries/healthcare" },
};

export default function HealthcarePage() {
  return (
    <main className="rb-industry-page">
      <div className="rb-industry-inner">
        <p className="rb-industry-eyebrow">
          <span className="rb-num">III</span>By Industry
        </p>
        <h1 className="rb-industry-h1">
          Healthcare<em>.</em>
        </h1>
        <p className="rb-industry-sub">
          Patient intake, appointment scheduling, care follow-up — an AI
          operations layer built for healthcare teams who want the admin to
          run quietly while the clinical work stays human.
        </p>
        <p className="rb-industry-note">This page is being written.</p>
      </div>
    </main>
  );
}
