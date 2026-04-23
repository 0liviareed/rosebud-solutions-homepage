import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service · Rosebud Solutions",
  description: "Terms of Service for Rosebud Global Ltd.",
};

export default function TermsPage() {
  return (
    <section className="rb-page-hero">
      <div className="rb-page-hero-inner">
        <p className="rb-page-hero-eyebrow">Rosebud Solutions</p>
        <p className="rb-page-hero-crumb">
          <span className="rb-num">&mdash;</span>Legal &middot; Terms of Service
        </p>
        <h1 className="rb-page-hero-h1">
          Terms of <em>Service.</em>
        </h1>
        <p className="rb-page-hero-sub">This page is being written.</p>
      </div>
    </section>
  );
}
