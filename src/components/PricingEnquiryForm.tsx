"use client";

import { useEffect, useRef, useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

type Form = {
  name: string;
  email: string;
  industry_interest: string[];
  request: string;
  consent: boolean;
};

const INITIAL: Form = {
  name: "",
  email: "",
  industry_interest: [],
  request: "",
  consent: false,
};

const INDUSTRY_OPTIONS = [
  "Dental, Aesthetic & Private Healthcare",
  "Mortgage & Lending",
  "Insurance",
  "Real Estate",
  "Recruitment",
  "Enterprise",
  "Other",
];

export default function PricingEnquiryForm() {
  const [state, setState] = useState<FormState>("idle");
  const [form, setForm] = useState<Form>(INITIAL);
  const [errorMsg, setErrorMsg] = useState<string>("");

  // Industry-dropdown open/close
  const [industryOpen, setIndustryOpen] = useState(false);
  const industryRef = useRef<HTMLDivElement | null>(null);

  // Close on outside click + Escape
  useEffect(() => {
    if (!industryOpen) return;
    function onDown(e: MouseEvent) {
      if (industryRef.current && !industryRef.current.contains(e.target as Node)) {
        setIndustryOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setIndustryOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [industryOpen]);

  function update<K extends keyof Form>(key: K, value: Form[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function toggleIndustry(value: string) {
    setForm((f) => {
      const next = f.industry_interest.includes(value)
        ? f.industry_interest.filter((v) => v !== value)
        : [...f.industry_interest, value];
      return { ...f, industry_interest: next };
    });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (form.industry_interest.length === 0) {
      setErrorMsg("Please select at least one industry.");
      return;
    }

    setState("submitting");
    try {
      const res = await fetch("/api/pricing/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || `Submission failed (${res.status})`);
      }
      setState("success");
    } catch (err) {
      setState("error");
      setErrorMsg(err instanceof Error ? err.message : "Submission failed");
    }
  }

  if (state === "success") {
    return (
      <div className="rb-pricing-form-shell">
        <div className="rb-pricing-success" role="status" aria-live="polite">
          <p className="rb-app-eyebrow">Inquiry received</p>
          <h2 className="rb-app-success-h">Thanks — we&rsquo;ve got it.</h2>
          <p className="rb-app-success-body">
            Expect a reply within one business day with next steps and a call slot.
          </p>
        </div>
      </div>
    );
  }

  const industryLabel =
    form.industry_interest.length === 0
      ? "Select industries…"
      : `${form.industry_interest.length} selected`;

  return (
    <div className="rb-pricing-form-shell">
      <div className="rb-pricing-form-head" data-rb-fade="0">
        <p className="rb-eyebrow">
          <span className="rb-num">·</span>Get started
        </p>
        <h2 className="rb-pricing-form-h2">
          Tell us what you&rsquo;re running.{" "}
          <em>We&rsquo;ll scope the system.</em>
        </h2>
        <p className="rb-pricing-form-sub">
          A 30-minute call to understand your operation, scope the system, and
          quote the build. You leave with a clear figure — no follow-ups, no
          chasing.
        </p>
      </div>

      <form className="rb-app-form" onSubmit={onSubmit} noValidate>
        <fieldset className="rb-app-fs" disabled={state === "submitting"}>
          <label className="rb-app-field">
            <span className="rb-app-label">Name <span className="rb-app-req">*</span></span>
            <input
              type="text"
              required
              autoComplete="name"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="rb-app-input"
            />
          </label>

          <label className="rb-app-field">
            <span className="rb-app-label">Work email <span className="rb-app-req">*</span></span>
            <input
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="rb-app-input"
            />
          </label>

          <div className="rb-app-field rb-app-dropdown-wrap" ref={industryRef}>
            <span className="rb-app-label">
              I would like to learn about <span className="rb-app-req">*</span>
            </span>
            <button
              type="button"
              className="rb-app-dropdown-trigger"
              aria-haspopup="listbox"
              aria-expanded={industryOpen}
              onClick={() => setIndustryOpen((o) => !o)}
            >
              <span>{industryLabel}</span>
              <span className="rb-app-dropdown-caret" aria-hidden="true">▾</span>
            </button>
            {industryOpen && (
              <div className="rb-app-dropdown-panel" role="listbox">
                {INDUSTRY_OPTIONS.map((opt) => (
                  <label key={opt} className="rb-app-dropdown-item">
                    <input
                      type="checkbox"
                      checked={form.industry_interest.includes(opt)}
                      onChange={() => toggleIndustry(opt)}
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <label className="rb-app-field">
            <span className="rb-app-label">Tell us about your needs <span className="rb-app-req">*</span></span>
            <textarea
              required
              rows={4}
              value={form.request}
              onChange={(e) => update("request", e.target.value)}
              className="rb-app-input"
              style={{ resize: "vertical", minHeight: "92px", fontFamily: "inherit" }}
            />
          </label>
        </fieldset>

        <label className="rb-app-consent">
          <input
            type="checkbox"
            required
            checked={form.consent}
            onChange={(e) => update("consent", e.target.checked)}
          />
          <span>
            I would like to receive communications about Rosebud Solutions
            tailored to my interests and preferences. For more information, see
            our{" "}
            <a href="/privacy" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>
            . <span className="rb-app-req">*</span>
          </span>
        </label>

        {errorMsg && (
          <p className="rb-app-error" role="alert">
            {errorMsg}
          </p>
        )}

        <button type="submit" className="rb-app-submit" disabled={state === "submitting"}>
          {state === "submitting" ? "Submitting…" : "Get started"}
        </button>
      </form>
    </div>
  );
}
