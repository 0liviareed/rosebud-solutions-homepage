import type { Metadata } from "next";
import Link from "next/link";
import CareersApplicationForm from "./CareersApplicationForm";

export const metadata: Metadata = {
  title: { absolute: "Apply — Sales Development Representative — Rosebud Solutions" },
  description:
    "Apply for the Sales Development Representative role at Rosebud Solutions — remote, commission-only, outbound, no base salary.",
  alternates: { canonical: "/careers/sdr/apply" },
  robots: { index: false, follow: true },
};

export default function ApplicationPage() {
  return (
    <main className="rb-job rb-apply-page">
      <header className="rb-job-header rb-apply-page-header">
        <div className="rb-apply-page-container">
          <Link href="/careers/sdr" className="rb-apply-page-back">
            <span aria-hidden="true">&larr;</span> Back to role
          </Link>
          <p className="rb-job-crumb">Application · Rosebud Solutions</p>
          <h1 className="rb-job-title">Sales Development Representative</h1>
          <p className="rb-job-strap">
            Complete the form below. Applications reviewed weekly.
          </p>
        </div>
      </header>

      <div className="rb-job-body">
        <div className="rb-apply-page-container">
          <CareersApplicationForm />
        </div>
      </div>
    </main>
  );
}
