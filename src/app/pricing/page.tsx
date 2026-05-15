import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — Rosebud Solutions",
  description:
    "Pricing for Rosebud Solutions custom AI systems. Scoped to your operation on the demo call.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <main className="rb-industry-page">
      <div className="rb-industry-inner">
        <p className="rb-industry-eyebrow">
          <span className="rb-num">·</span>Resources
        </p>
        <h1 className="rb-industry-h1">
          Pricing<em>.</em>
        </h1>
        <p className="rb-industry-sub">
          One setup. One monthly figure. No per-seat pricing. Scoped to your
          operation on the demo call.
        </p>
        <p className="rb-industry-note">This page is being written.</p>
      </div>
    </main>
  );
}
