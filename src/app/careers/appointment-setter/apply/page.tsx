import type { Metadata } from "next";
import Link from "next/link";
import CareersApplicationForm from "./CareersApplicationForm";

export const metadata: Metadata = {
  title: "Apply — Appointment Setter — Rosebud Solutions",
  description:
    "Submit your application for the Appointment Setter role at Rosebud Solutions.",
  alternates: { canonical: "/careers/appointment-setter/apply" },
  robots: { index: false, follow: true },
};

export default function ApplicationPage() {
  return (
    <main className="rb-job rb-apply-page">
      <header className="rb-job-header rb-apply-page-header">
        <div className="rb-apply-page-container">
          <Link href="/careers/appointment-setter" className="rb-apply-page-back">
            <span aria-hidden="true">&larr;</span> Back to role
          </Link>
          <p className="rb-job-crumb">Application · Rosebud Solutions</p>
          <h1 className="rb-job-title">Appointment Setter</h1>
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
