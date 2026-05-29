"use client";

import { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

type Form = {
  first_name: string;
  last_name: string;
  email: string;
  location: string;
  linkedin_url: string;
  b2b_experience: string;
  commission_role_before: "yes" | "no" | "";
  commission_role_details: string;
  industry_experience: string[];
  equipment_check: string[];
  hours_per_week: string;
  earliest_start_date: string;
  gdpr_consent: boolean;
  commission_consent: boolean;
  location_consent: boolean;
};

const INITIAL: Form = {
  first_name: "",
  last_name: "",
  email: "",
  location: "",
  linkedin_url: "",
  b2b_experience: "",
  commission_role_before: "",
  commission_role_details: "",
  industry_experience: [],
  equipment_check: [],
  hours_per_week: "",
  earliest_start_date: "",
  gdpr_consent: false,
  commission_consent: false,
  location_consent: false,
};

const B2B_OPTIONS = [
  "None",
  "Under 6 months",
  "6–18 months",
  "18 months – 3 years",
  "3+ years",
];

const INDUSTRY_OPTIONS = [
  "Dental, Aesthetic & Private Healthcare",
  "Mortgage & Lending",
  "Insurance",
  "Real Estate",
  "Recruitment",
  "Enterprise",
  "Other",
];

const EQUIPMENT_OPTIONS = [
  "Computer or laptop",
  "Headset with microphone",
  "Wired or stable Wi-Fi internet",
  "Quiet calling environment",
];

export default function CareersApplicationForm() {
  const [state, setState] = useState<FormState>("idle");
  const [form, setForm] = useState<Form>(INITIAL);
  const [errorMsg, setErrorMsg] = useState<string>("");

  function update<K extends keyof Form>(key: K, value: Form[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function toggleArray(key: "industry_experience" | "equipment_check", value: string) {
    setForm((f) => {
      const current = f[key];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...f, [key]: next };
    });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (!form.b2b_experience) {
      setErrorMsg("Please select your B2B experience.");
      return;
    }
    if (form.industry_experience.length === 0) {
      setErrorMsg("Please select at least one industry.");
      return;
    }
    if (form.equipment_check.length === 0) {
      setErrorMsg("Please tick the equipment items you have.");
      return;
    }
    if (form.commission_role_before === "") {
      setErrorMsg("Please answer the commission-role question.");
      return;
    }
    if (form.commission_role_before === "yes" && !form.commission_role_details.trim()) {
      setErrorMsg("Please describe your previous commission role.");
      return;
    }

    setState("submitting");
    try {
      const res = await fetch("/api/careers/appointment-setter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: form.first_name,
          last_name: form.last_name,
          email: form.email,
          location: form.location,
          linkedin_url: form.linkedin_url || undefined,
          b2b_experience: [form.b2b_experience],
          commission_role_before: form.commission_role_before === "yes",
          commission_role_details: form.commission_role_details || undefined,
          industry_experience: form.industry_experience,
          equipment_check: form.equipment_check,
          hours_per_week: Number(form.hours_per_week),
          earliest_start_date: form.earliest_start_date,
          gdpr_consent: form.gdpr_consent,
          commission_consent: form.commission_consent,
          location_consent: form.location_consent,
        }),
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
      <div className="rb-app-shell rb-app-success" role="status" aria-live="polite">
        <p className="rb-app-eyebrow">Application received</p>
        <h2 className="rb-app-success-h">Thanks for applying.</h2>
        <p className="rb-app-success-body">
          We review applications weekly. If you&rsquo;re a strong fit you&rsquo;ll hear
          from the COO within seven days with an interview slot. If you don&rsquo;t,
          assume we&rsquo;ve passed this cycle — rolling intake means we keep your
          application on file for future windows.
        </p>
      </div>
    );
  }

  return (
    <form className="rb-app-shell" onSubmit={onSubmit} noValidate>
      <fieldset className="rb-app-fs" disabled={state === "submitting"}>
        <legend className="rb-app-legend">Section 1 · About you</legend>

        <div className="rb-app-row">
          <label className="rb-app-field">
            <span className="rb-app-label">First name <span className="rb-app-req">*</span></span>
            <input
              type="text"
              required
              autoComplete="given-name"
              value={form.first_name}
              onChange={(e) => update("first_name", e.target.value)}
              className="rb-app-input"
            />
          </label>
          <label className="rb-app-field">
            <span className="rb-app-label">Last name <span className="rb-app-req">*</span></span>
            <input
              type="text"
              required
              autoComplete="family-name"
              value={form.last_name}
              onChange={(e) => update("last_name", e.target.value)}
              className="rb-app-input"
            />
          </label>
        </div>

        <label className="rb-app-field">
          <span className="rb-app-label">Email address <span className="rb-app-req">*</span></span>
          <input
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="rb-app-input"
          />
        </label>

        <label className="rb-app-field">
          <span className="rb-app-label">Country and city of residence <span className="rb-app-req">*</span></span>
          <input
            type="text"
            required
            autoComplete="address-level2"
            value={form.location}
            onChange={(e) => update("location", e.target.value)}
            className="rb-app-input"
          />
        </label>

        <label className="rb-app-field">
          <span className="rb-app-label">LinkedIn profile URL</span>
          <input
            type="url"
            placeholder="https://linkedin.com/in/…"
            value={form.linkedin_url}
            onChange={(e) => update("linkedin_url", e.target.value)}
            className="rb-app-input"
          />
        </label>
      </fieldset>

      <fieldset className="rb-app-fs" disabled={state === "submitting"}>
        <legend className="rb-app-legend">Section 2 · Experience</legend>

        <div className="rb-app-field">
          <span className="rb-app-label">B2B sales, SDR, or setter experience <span className="rb-app-req">*</span></span>
          <div className="rb-app-checks">
            {B2B_OPTIONS.map((opt) => (
              <label key={opt} className="rb-app-check">
                <input
                  type="radio"
                  name="b2b_experience"
                  checked={form.b2b_experience === opt}
                  onChange={() => update("b2b_experience", opt)}
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="rb-app-field">
          <span className="rb-app-label">Have you worked a 100% commission role before? <span className="rb-app-req">*</span></span>
          <div className="rb-app-radios">
            <label className="rb-app-radio">
              <input
                type="radio"
                name="commission_role_before"
                required
                checked={form.commission_role_before === "yes"}
                onChange={() => update("commission_role_before", "yes")}
              />
              <span>Yes</span>
            </label>
            <label className="rb-app-radio">
              <input
                type="radio"
                name="commission_role_before"
                required
                checked={form.commission_role_before === "no"}
                onChange={() => update("commission_role_before", "no")}
              />
              <span>No</span>
            </label>
          </div>
        </div>

        {form.commission_role_before === "yes" && (
          <label className="rb-app-field">
            <span className="rb-app-label">
              If yes, for how long and what were your average monthly earnings? <span className="rb-app-req">*</span>
            </span>
            <input
              type="text"
              required
              value={form.commission_role_details}
              onChange={(e) => update("commission_role_details", e.target.value)}
              className="rb-app-input"
            />
          </label>
        )}

        <div className="rb-app-field">
          <span className="rb-app-label">Industry experience <span className="rb-app-req">*</span></span>
          <div className="rb-app-checks">
            {INDUSTRY_OPTIONS.map((opt) => (
              <label key={opt} className="rb-app-check">
                <input
                  type="checkbox"
                  checked={form.industry_experience.includes(opt)}
                  onChange={() => toggleArray("industry_experience", opt)}
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>
      </fieldset>

      <fieldset className="rb-app-fs" disabled={state === "submitting"}>
        <legend className="rb-app-legend">Section 3 · Setup</legend>

        <div className="rb-app-field">
          <span className="rb-app-label">Equipment check — tick all that apply <span className="rb-app-req">*</span></span>
          <div className="rb-app-checks">
            {EQUIPMENT_OPTIONS.map((opt) => (
              <label key={opt} className="rb-app-check">
                <input
                  type="checkbox"
                  checked={form.equipment_check.includes(opt)}
                  onChange={() => toggleArray("equipment_check", opt)}
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="rb-app-row">
          <label className="rb-app-field">
            <span className="rb-app-label">Hours per week you can commit Monday to Friday <span className="rb-app-req">*</span></span>
            <input
              type="number"
              min={1}
              max={80}
              required
              value={form.hours_per_week}
              onChange={(e) => update("hours_per_week", e.target.value)}
              className="rb-app-input"
            />
          </label>
          <label className="rb-app-field">
            <span className="rb-app-label">Earliest possible start date <span className="rb-app-req">*</span></span>
            <input
              type="date"
              required
              value={form.earliest_start_date}
              onChange={(e) => update("earliest_start_date", e.target.value)}
              className="rb-app-input"
            />
          </label>
        </div>
      </fieldset>

      <fieldset className="rb-app-fs" disabled={state === "submitting"}>
        <legend className="rb-app-legend">Data protection</legend>
        <p className="rb-app-prose">
          Rosebud Global Ltd (trading as Rosebud Solutions) is the data
          controller for the information you provide. We use it to assess your
          suitability for this role and to contact you about your application.
          Full details on how we handle your data, how long we keep it, and
          your rights are in our{" "}
          <a href="/privacy" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>
          .
        </p>

        <label className="rb-app-consent">
          <input
            type="checkbox"
            required
            checked={form.gdpr_consent}
            onChange={(e) => update("gdpr_consent", e.target.checked)}
          />
          <span>
            I have read and understood how Rosebud Solutions will use my data,
            as set out in the Privacy Policy. <span className="rb-app-req">*</span>
          </span>
        </label>

        <label className="rb-app-consent">
          <input
            type="checkbox"
            required
            checked={form.commission_consent}
            onChange={(e) => update("commission_consent", e.target.checked)}
          />
          <span>
            I understand this is a 100% commission, independent contractor role.
            There is no base salary. I have at least three months of financial
            runway and I&rsquo;m not depending on this role to cover my immediate
            cost of living. <span className="rb-app-req">*</span>
          </span>
        </label>

        <label className="rb-app-consent">
          <input
            type="checkbox"
            required
            checked={form.location_consent}
            onChange={(e) => update("location_consent", e.target.checked)}
          />
          <span>
            I confirm I have the right to work as a self-employed contractor in
            my country of residence. <span className="rb-app-req">*</span>
          </span>
        </label>
      </fieldset>

      {errorMsg && (
        <p className="rb-app-error" role="alert">
          {errorMsg}
        </p>
      )}

      <button type="submit" className="rb-app-submit" disabled={state === "submitting"}>
        {state === "submitting" ? "Submitting…" : "Submit application"}
      </button>
    </form>
  );
}
