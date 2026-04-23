import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recruitment · Rosebud Solutions",
  description:
    "AI automation built for recruitment operations — sourcing, screening, scheduling, follow-up.",
};

export default function RecruitmentPage() {
  return (
    <main className="rb-industry-page">
      <div className="rb-industry-inner">
        <p className="rb-industry-eyebrow">
          <span className="rb-num">I</span>Industries
        </p>
        <h1 className="rb-industry-h1">
          Recruitment<em>.</em>
        </h1>
        <p className="rb-industry-sub">
          Sourcing, screening, scheduling, follow-up — an AI operations layer
          built for recruitment teams who spend their week doing work software
          should already be doing.
        </p>
        <p className="rb-industry-note">This page is being written.</p>
      </div>
    </main>
  );
}
