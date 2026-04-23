import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy · Rosebud Solutions",
  description: "Privacy Policy for Rosebud Global Ltd.",
};

export default function PrivacyPage() {
  return (
    <section className="rb-page-hero">
      <div className="rb-page-hero-inner">
        <p className="rb-page-hero-eyebrow">Rosebud Solutions</p>
        <p className="rb-page-hero-crumb">
          <span className="rb-num">&mdash;</span>Legal &middot; Privacy Policy
        </p>
        <h1 className="rb-page-hero-h1">
          Privacy <em>Policy.</em>
        </h1>
        <p className="rb-page-hero-sub">This page is being written.</p>
      </div>
    </section>
  );
}
