"use client";

import { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

type Form = {
  first_name: string;
  last_name: string;
  email: string;
  location: string;
  linkedin_url: string;
  portfolio_url: string;
  closing_experience: string;
  commission_role_before: "yes" | "no" | "";
  demo_experience: string;
  deal_value: string;
  close_rate: string;
  managed_accounts: "yes" | "no" | "";
  revenue_target: string;
  businesses_sold_to: string;
  crm_experience: string;
  own_network: string;
  experience_notes: string;
  equipment_check: string[];
  availability: string;
  earliest_start_date: string;
  timezone: string;
  gdpr_consent: boolean;
  commission_consent: boolean;
  attribution_consent: boolean;
  location_consent: boolean;
};

const INITIAL: Form = {
  first_name: "",
  last_name: "",
  email: "",
  location: "",
  linkedin_url: "",
  portfolio_url: "",
  closing_experience: "",
  commission_role_before: "",
  demo_experience: "",
  deal_value: "",
  close_rate: "",
  managed_accounts: "",
  revenue_target: "",
  businesses_sold_to: "",
  crm_experience: "",
  own_network: "",
  experience_notes: "",
  equipment_check: [],
  availability: "",
  earliest_start_date: "",
  timezone: "",
  gdpr_consent: false,
  commission_consent: false,
  attribution_consent: false,
  location_consent: false,
};

const CLOSING_EXPERIENCE_OPTIONS = [
  "None",
  "Under 6 months",
  "6–18 months",
  "18 months – 3 years",
  "3+ years",
];

const DEMO_EXPERIENCE_OPTIONS: { value: string; label: string }[] = [
  { value: "None",        label: "None" },
  { value: "Some",        label: "Some (occasional)" },
  { value: "Significant", label: "Significant (a core, daily part of a previous role)" },
];

const DEAL_VALUE_OPTIONS = [
  "Under £5k",
  "£5k–£20k",
  "£20k–£50k",
  "£50k+",
  "Varies",
];

const CLOSE_RATE_OPTIONS = [
  "Under 15%",
  "15–25%",
  "25–40%",
  "40%+",
  "Not sure",
];

const EQUIPMENT_OPTIONS = [
  "Computer or laptop",
  "Headset with microphone",
  "Webcam",
  "Wired or stable Wi-Fi internet",
  "Quiet, professional environment for video calls",
];

const TIMEZONE_OPTIONS: { value: string; label: string }[] = [
  { value: "Europe/London",       label: "London (UK)" },
  { value: "Europe/Dublin",       label: "Dublin (Ireland)" },
  { value: "Europe/Paris",        label: "Paris (CET)" },
  { value: "Europe/Berlin",       label: "Berlin (CET)" },
  { value: "Europe/Madrid",       label: "Madrid (CET)" },
  { value: "Europe/Athens",       label: "Athens (EET)" },
  { value: "Africa/Lagos",        label: "Lagos (WAT)" },
  { value: "Africa/Johannesburg", label: "Johannesburg (SAST)" },
  { value: "Asia/Dubai",          label: "Dubai (GST)" },
  { value: "Asia/Karachi",        label: "Karachi (PKT)" },
  { value: "Asia/Kolkata",        label: "Kolkata / Mumbai (IST)" },
  { value: "Asia/Bangkok",        label: "Bangkok (ICT)" },
  { value: "Asia/Manila",         label: "Manila (PHT)" },
  { value: "Asia/Singapore",      label: "Singapore (SGT)" },
  { value: "America/New_York",    label: "New York (US Eastern)" },
  { value: "America/Chicago",     label: "Chicago (US Central)" },
  { value: "America/Denver",      label: "Denver (US Mountain)" },
  { value: "America/Los_Angeles", label: "Los Angeles (US Pacific)" },
  { value: "America/Toronto",     label: "Toronto (Canada Eastern)" },
  { value: "America/Mexico_City", label: "Mexico City (CST)" },
  { value: "America/Sao_Paulo",   label: "São Paulo (BRT)" },
  { value: "Australia/Sydney",    label: "Sydney (AEST/AEDT)" },
  { value: "Pacific/Auckland",    label: "Auckland (NZST/NZDT)" },
  { value: "UTC",                 label: "UTC" },
];

// Every required field, in render order. Used to mark-all-touched on submit
// and to walk the form in sequence when scrolling to the first error.
const REQUIRED_FIELDS = [
  "first_name","last_name","email","location","linkedin_url",
  "closing_experience","commission_role_before","demo_experience","deal_value",
  "close_rate","managed_accounts","revenue_target","crm_experience","experience_notes",
  "equipment_check","availability","earliest_start_date","timezone",
  "gdpr_consent","commission_consent","attribution_consent","location_consent",
] as const;

export default function CareersApplicationForm() {
  const [state, setState] = useState<FormState>("idle");
  const [form, setForm] = useState<Form>(INITIAL);
  // Submission-level error (network/API failures). Per-field validation
  // errors are rendered inline next to each field instead.
  const [submitError, setSubmitError] = useState<string>("");
  // Which fields the user has interacted with (blurred or attempted submit).
  // Errors only render once a field is in this set, so the form is quiet
  // until the user moves past a question without answering it.
  const [touched, setTouched] = useState<Set<string>>(new Set());

  function markTouched(key: string) {
    setTouched((prev) => {
      if (prev.has(key)) return prev;
      const next = new Set(prev);
      next.add(key);
      return next;
    });
  }

  function update<K extends keyof Form>(key: K, value: Form[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function toggleArray(key: "equipment_check", value: string) {
    setForm((f) => {
      const current = f[key];
      const exists = current.includes(value);
      return { ...f, [key]: exists ? current.filter((v) => v !== value) : [...current, value] };
    });
  }

  // What's wrong with a given field, if anything. Returns empty string for
  // valid fields and a short user-facing message for invalid ones.
  function fieldError(key: string): string {
    switch (key) {
      case "first_name":  return form.first_name.trim() ? "" : "Required.";
      case "last_name":   return form.last_name.trim() ? "" : "Required.";
      case "email":
        if (!form.email.trim()) return "Required.";
        if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) return "Enter a valid email address.";
        return "";
      case "location":    return form.location.trim() ? "" : "Required.";
      case "linkedin_url":return form.linkedin_url.trim() ? "" : "Required — write 'N/A' if you don't have one.";
      case "portfolio_url":
        if (!form.portfolio_url.trim()) return "";
        return /^https?:\/\//i.test(form.portfolio_url.trim()) ? "" : "Enter a valid URL starting with http.";
      case "closing_experience":      return form.closing_experience ? "" : "Please select an option.";
      case "commission_role_before":  return form.commission_role_before ? "" : "Please select Yes or No.";
      case "demo_experience":         return form.demo_experience ? "" : "Please select an option.";
      case "deal_value":              return form.deal_value ? "" : "Please select an option.";
      case "close_rate":              return form.close_rate ? "" : "Please select an option.";
      case "managed_accounts":        return form.managed_accounts ? "" : "Please select Yes or No.";
      case "revenue_target":          return form.revenue_target.trim() ? "" : "Required.";
      case "crm_experience":          return form.crm_experience.trim() ? "" : "Required.";
      case "experience_notes":        return form.experience_notes.trim() ? "" : "Required — write 'N/A' if nothing to add.";
      case "equipment_check":         return form.equipment_check.length > 0 ? "" : "Tick at least one item.";
      case "availability":            return form.availability.trim() ? "" : "Required.";
      case "earliest_start_date":     return form.earliest_start_date ? "" : "Required.";
      case "timezone":                return form.timezone ? "" : "Please select your timezone.";
      case "gdpr_consent":            return form.gdpr_consent ? "" : "Required to apply.";
      case "commission_consent":      return form.commission_consent ? "" : "Required to apply.";
      case "attribution_consent":     return form.attribution_consent ? "" : "Required to apply.";
      case "location_consent":        return form.location_consent ? "" : "Required to apply.";
    }
    return "";
  }

  function renderFieldError(key: string) {
    if (!touched.has(key)) return null;
    const err = fieldError(key);
    if (!err) return null;
    return <span className="rb-app-field-error" role="alert">{err}</span>;
  }

  // For radio / checkbox groups: fires when focus leaves the group container
  // entirely (relatedTarget points outside).
  function onGroupBlur(key: string, e: React.FocusEvent<HTMLDivElement>) {
    const group = e.currentTarget;
    const moving = e.relatedTarget as Element | null;
    if (group && moving && group.contains(moving)) return;
    markTouched(key);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError("");

    // Mark every required field as touched so all inline errors flip on.
    setTouched(new Set(REQUIRED_FIELDS));

    // Collect every blocking issue. Scroll to the first one and bail.
    const blocking: string[] = [];
    for (const key of REQUIRED_FIELDS) {
      if (fieldError(key)) blocking.push(key);
    }
    if (blocking.length > 0) {
      const first = blocking[0];
      const node = document.querySelector(`[data-field="${first}"]`);
      node?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setState("submitting");
    try {
      const res = await fetch("/api/careers/ae", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: form.first_name,
          last_name: form.last_name,
          email: form.email,
          location: form.location,
          linkedin_url: form.linkedin_url || undefined,
          portfolio_url: form.portfolio_url || undefined,
          closing_experience: form.closing_experience,
          commission_role_before: form.commission_role_before === "yes",
          demo_experience: form.demo_experience,
          deal_value: form.deal_value,
          close_rate: form.close_rate,
          managed_accounts: form.managed_accounts === "yes",
          revenue_target: form.revenue_target,
          businesses_sold_to: form.businesses_sold_to || undefined,
          crm_experience: form.crm_experience,
          own_network: form.own_network || undefined,
          experience_notes: form.experience_notes || undefined,
          equipment_check: form.equipment_check,
          availability: form.availability,
          earliest_start_date: form.earliest_start_date,
          timezone: form.timezone,
          gdpr_consent: form.gdpr_consent,
          commission_consent: form.commission_consent,
          attribution_consent: form.attribution_consent,
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
      setSubmitError(err instanceof Error ? err.message : "Submission failed");
    }
  }

  if (state === "success") {
    return (
      <div className="rb-app-shell rb-app-success" role="status" aria-live="polite">
        <p className="rb-app-eyebrow">Application received</p>
        <h2 className="rb-app-success-h">Thanks for applying.</h2>
        <p className="rb-app-success-body">
          We review applications on an ongoing basis. If you&rsquo;re a strong fit
          you&rsquo;ll hear from the Rosebud Global team within three days with an
          interview slot. If you don&rsquo;t, assume we&rsquo;ve passed this cycle
          — rolling intake means we keep your application on file for future windows.
        </p>
      </div>
    );
  }

  return (
    <form className="rb-app-shell" onSubmit={onSubmit} noValidate>
      <fieldset className="rb-app-fs" disabled={state === "submitting"}>
        <legend className="rb-app-legend">Section 1 · About you</legend>

        <div className="rb-app-row">
          <label className="rb-app-field" data-field="first_name">
            <span className="rb-app-label">First name <span className="rb-app-req">*</span></span>
            <input
              type="text"
              required
              autoComplete="given-name"
              value={form.first_name}
              onChange={(e) => update("first_name", e.target.value)}
              onBlur={() => markTouched("first_name")}
              className="rb-app-input"
            />
            {renderFieldError("first_name")}
          </label>
          <label className="rb-app-field" data-field="last_name">
            <span className="rb-app-label">Last name <span className="rb-app-req">*</span></span>
            <input
              type="text"
              required
              autoComplete="family-name"
              value={form.last_name}
              onChange={(e) => update("last_name", e.target.value)}
              onBlur={() => markTouched("last_name")}
              className="rb-app-input"
            />
            {renderFieldError("last_name")}
          </label>
        </div>

        <label className="rb-app-field" data-field="email">
          <span className="rb-app-label">Email address <span className="rb-app-req">*</span></span>
          <input
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            onBlur={() => markTouched("email")}
            className="rb-app-input"
          />
          {renderFieldError("email")}
        </label>

        <label className="rb-app-field" data-field="location">
          <span className="rb-app-label">Country and city of residence <span className="rb-app-req">*</span></span>
          <input
            type="text"
            required
            autoComplete="address-level2"
            value={form.location}
            onChange={(e) => update("location", e.target.value)}
            onBlur={() => markTouched("location")}
            className="rb-app-input"
          />
          {renderFieldError("location")}
        </label>

        <label className="rb-app-field" data-field="linkedin_url">
          <span className="rb-app-label">LinkedIn profile URL <span className="rb-app-req">*</span></span>
          <input
            type="text"
            required
            placeholder="https://linkedin.com/in/… (or 'N/A')"
            value={form.linkedin_url}
            onChange={(e) => update("linkedin_url", e.target.value)}
            onBlur={() => markTouched("linkedin_url")}
            className="rb-app-input"
          />
          {renderFieldError("linkedin_url")}
        </label>

        <label className="rb-app-field" data-field="portfolio_url">
          <span className="rb-app-label">
            Portfolio URL{" "}
            <span style={{ opacity: 0.55, fontWeight: 400 }}>(optional)</span>
          </span>
          <input
            type="text"
            placeholder="e.g. a call recording, personal site, or work sample"
            value={form.portfolio_url}
            onChange={(e) => update("portfolio_url", e.target.value)}
            onBlur={() => markTouched("portfolio_url")}
            className="rb-app-input"
          />
          {renderFieldError("portfolio_url")}
        </label>
      </fieldset>

      <fieldset className="rb-app-fs" disabled={state === "submitting"}>
        <legend className="rb-app-legend">Section 2 · Experience</legend>

        <div className="rb-app-field" data-field="closing_experience">
          <span className="rb-app-label">Closing / Account Executive / B2B sales experience <span className="rb-app-req">*</span></span>
          <div className="rb-app-checks" onBlur={(e) => onGroupBlur("closing_experience", e)}>
            {CLOSING_EXPERIENCE_OPTIONS.map((opt) => (
              <label key={opt} className="rb-app-check">
                <input
                  type="radio"
                  name="closing_experience"
                  checked={form.closing_experience === opt}
                  onChange={() => update("closing_experience", opt)}
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
          {renderFieldError("closing_experience")}
        </div>

        <div className="rb-app-field" data-field="commission_role_before">
          <span className="rb-app-label">Have you worked a 100% commission role before? <span className="rb-app-req">*</span></span>
          <div className="rb-app-radios" onBlur={(e) => onGroupBlur("commission_role_before", e)}>
            <label className="rb-app-radio">
              <input
                type="radio"
                name="commission_role_before"
                checked={form.commission_role_before === "yes"}
                onChange={() => update("commission_role_before", "yes")}
              />
              <span>Yes</span>
            </label>
            <label className="rb-app-radio">
              <input
                type="radio"
                name="commission_role_before"
                checked={form.commission_role_before === "no"}
                onChange={() => update("commission_role_before", "no")}
              />
              <span>No</span>
            </label>
          </div>
          {renderFieldError("commission_role_before")}
        </div>

        <div className="rb-app-field" data-field="demo_experience">
          <span className="rb-app-label">
            How much closing experience do you have — running your own demos or sales calls and closing them? <span className="rb-app-req">*</span>
          </span>
          <div className="rb-app-checks" onBlur={(e) => onGroupBlur("demo_experience", e)}>
            {DEMO_EXPERIENCE_OPTIONS.map((opt) => (
              <label key={opt.value} className="rb-app-check">
                <input
                  type="radio"
                  name="demo_experience"
                  checked={form.demo_experience === opt.value}
                  onChange={() => update("demo_experience", opt.value)}
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
          {renderFieldError("demo_experience")}
        </div>

        <div className="rb-app-field" data-field="deal_value">
          <span className="rb-app-label">
            Typical value of the deals you&rsquo;ve closed (annual or total contract value)? <span className="rb-app-req">*</span>
          </span>
          <div className="rb-app-checks" onBlur={(e) => onGroupBlur("deal_value", e)}>
            {DEAL_VALUE_OPTIONS.map((opt) => (
              <label key={opt} className="rb-app-check">
                <input
                  type="radio"
                  name="deal_value"
                  checked={form.deal_value === opt}
                  onChange={() => update("deal_value", opt)}
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
          {renderFieldError("deal_value")}
        </div>

        <div className="rb-app-field" data-field="close_rate">
          <span className="rb-app-label">
            Your typical close rate (qualified opportunities or demos → closed deals)? <span className="rb-app-req">*</span>
          </span>
          <div className="rb-app-checks" onBlur={(e) => onGroupBlur("close_rate", e)}>
            {CLOSE_RATE_OPTIONS.map((opt) => (
              <label key={opt} className="rb-app-check">
                <input
                  type="radio"
                  name="close_rate"
                  checked={form.close_rate === opt}
                  onChange={() => update("close_rate", opt)}
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
          {renderFieldError("close_rate")}
        </div>

        <div className="rb-app-field" data-field="managed_accounts">
          <span className="rb-app-label">Have you managed clients or accounts after the sale — onboarding, retention, upsell? <span className="rb-app-req">*</span></span>
          <div className="rb-app-radios" onBlur={(e) => onGroupBlur("managed_accounts", e)}>
            <label className="rb-app-radio">
              <input
                type="radio"
                name="managed_accounts"
                checked={form.managed_accounts === "yes"}
                onChange={() => update("managed_accounts", "yes")}
              />
              <span>Yes</span>
            </label>
            <label className="rb-app-radio">
              <input
                type="radio"
                name="managed_accounts"
                checked={form.managed_accounts === "no"}
                onChange={() => update("managed_accounts", "no")}
              />
              <span>No</span>
            </label>
          </div>
          {renderFieldError("managed_accounts")}
        </div>

        <label className="rb-app-field" data-field="revenue_target">
          <span className="rb-app-label">Have you carried a monthly or quarterly revenue target, and how did you perform against it? <span className="rb-app-req">*</span></span>
          <textarea
            rows={3}
            required
            value={form.revenue_target}
            onChange={(e) => update("revenue_target", e.target.value)}
            onBlur={() => markTouched("revenue_target")}
            className="rb-app-input"
            style={{ resize: "vertical", minHeight: "78px", fontFamily: "inherit" }}
            placeholder="e.g. £20k/month new MRR target — hit or beat it in 4 of my last 6 months."
          />
          {renderFieldError("revenue_target")}
        </label>

        <label className="rb-app-field" data-field="businesses_sold_to">
          <span className="rb-app-label">
            What kinds of businesses have you sold to?{" "}
            <span style={{ opacity: 0.55, fontWeight: 400 }}>(optional)</span>
          </span>
          <input
            type="text"
            value={form.businesses_sold_to}
            onChange={(e) => update("businesses_sold_to", e.target.value)}
            onBlur={() => markTouched("businesses_sold_to")}
            className="rb-app-input"
            placeholder="e.g. owner-operated SMEs, SaaS mid-market, agencies…"
          />
        </label>

        <label className="rb-app-field" data-field="crm_experience">
          <span className="rb-app-label">Which CRMs have you used, and how did you keep your pipeline logged? <span className="rb-app-req">*</span></span>
          <textarea
            rows={3}
            required
            value={form.crm_experience}
            onChange={(e) => update("crm_experience", e.target.value)}
            onBlur={() => markTouched("crm_experience")}
            className="rb-app-input"
            style={{ resize: "vertical", minHeight: "78px", fontFamily: "inherit" }}
            placeholder="e.g. HubSpot and Pipedrive — logged every opportunity, stage and next step daily."
          />
          {renderFieldError("crm_experience")}
        </label>

        <label className="rb-app-field" data-field="own_network">
          <span className="rb-app-label">
            Do you have your own network, or a track record of sourcing your own deals?{" "}
            <span style={{ opacity: 0.55, fontWeight: 400 }}>(optional)</span>
          </span>
          <textarea
            rows={2}
            value={form.own_network}
            onChange={(e) => update("own_network", e.target.value)}
            onBlur={() => markTouched("own_network")}
            className="rb-app-input"
            style={{ resize: "vertical", minHeight: "60px", fontFamily: "inherit" }}
          />
        </label>

        <label className="rb-app-field" data-field="experience_notes">
          <span className="rb-app-label">Anything else about your closing or account-management experience? <span className="rb-app-req">*</span></span>
          <textarea
            rows={3}
            required
            value={form.experience_notes}
            onChange={(e) => update("experience_notes", e.target.value)}
            onBlur={() => markTouched("experience_notes")}
            className="rb-app-input"
            style={{ resize: "vertical", minHeight: "78px", fontFamily: "inherit" }}
            placeholder="Share anything that gives us context. Write 'N/A' if nothing to add."
          />
          {renderFieldError("experience_notes")}
        </label>
      </fieldset>

      <fieldset className="rb-app-fs" disabled={state === "submitting"}>
        <legend className="rb-app-legend">Section 3 · Setup</legend>

        <div className="rb-app-field" data-field="equipment_check">
          <span className="rb-app-label">Equipment check — tick all that apply <span className="rb-app-req">*</span></span>
          <div className="rb-app-checks" onBlur={(e) => onGroupBlur("equipment_check", e)}>
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
          {renderFieldError("equipment_check")}
        </div>

        <label className="rb-app-field" data-field="availability">
          <span className="rb-app-label">
            Availability to run scheduled demos <span className="rb-app-req">*</span>
          </span>
          <textarea
            rows={3}
            required
            value={form.availability}
            onChange={(e) => update("availability", e.target.value)}
            onBlur={() => markTouched("availability")}
            className="rb-app-input"
            style={{ resize: "vertical", minHeight: "78px", fontFamily: "inherit" }}
            placeholder="The days and hours (Mon–Fri) you can be available to take booked demos, and in which market's local time."
          />
          {renderFieldError("availability")}
          <span className="rb-app-hint">Demos are booked into your calendar, so tell us the windows you can reliably run them.</span>
        </label>

        <div className="rb-app-row">
          <label className="rb-app-field" data-field="earliest_start_date">
            <span className="rb-app-label">Earliest possible start date <span className="rb-app-req">*</span></span>
            <input
              type="date"
              required
              value={form.earliest_start_date}
              onChange={(e) => update("earliest_start_date", e.target.value)}
              onBlur={() => markTouched("earliest_start_date")}
              className="rb-app-input"
            />
            {renderFieldError("earliest_start_date")}
          </label>
          <label className="rb-app-field" data-field="timezone">
            <span className="rb-app-label">
              Your time zone <span className="rb-app-req">*</span>
            </span>
            <select
              required
              value={form.timezone}
              onChange={(e) => update("timezone", e.target.value)}
              onBlur={() => markTouched("timezone")}
              className="rb-app-input"
            >
              <option value="" disabled>Select your timezone</option>
              {TIMEZONE_OPTIONS.map((tz) => (
                <option key={tz.value} value={tz.value}>{tz.label}</option>
              ))}
            </select>
            {renderFieldError("timezone")}
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

        <label className="rb-app-consent" data-field="gdpr_consent">
          <input
            type="checkbox"
            required
            checked={form.gdpr_consent}
            onChange={(e) => update("gdpr_consent", e.target.checked)}
            onBlur={() => markTouched("gdpr_consent")}
          />
          <span>
            I have read and understood how Rosebud Solutions will use my data,
            as set out in the Privacy Policy. <span className="rb-app-req">*</span>
          </span>
        </label>
        {renderFieldError("gdpr_consent")}

        <label className="rb-app-consent" data-field="commission_consent">
          <input
            type="checkbox"
            required
            checked={form.commission_consent}
            onChange={(e) => update("commission_consent", e.target.checked)}
            onBlur={() => markTouched("commission_consent")}
          />
          <span>
            I understand this is a 100% commission, independent contractor role.
            There is no base salary. I have at least three months of financial
            runway and I&rsquo;m not depending on this role to cover my immediate
            cost of living. <span className="rb-app-req">*</span>
          </span>
        </label>
        {renderFieldError("commission_consent")}

        <label className="rb-app-consent" data-field="attribution_consent">
          <input
            type="checkbox"
            required
            checked={form.attribution_consent}
            onChange={(e) => update("attribution_consent", e.target.checked)}
            onBlur={() => markTouched("attribution_consent")}
          />
          <span>
            I understand commission is paid only on deals that close and that are
            logged and attributed to me in the CRM. <span className="rb-app-req">*</span>
          </span>
        </label>
        {renderFieldError("attribution_consent")}

        <label className="rb-app-consent" data-field="location_consent">
          <input
            type="checkbox"
            required
            checked={form.location_consent}
            onChange={(e) => update("location_consent", e.target.checked)}
            onBlur={() => markTouched("location_consent")}
          />
          <span>
            I confirm I have the right to work as a self-employed contractor in
            my country of residence. <span className="rb-app-req">*</span>
          </span>
        </label>
        {renderFieldError("location_consent")}
      </fieldset>

      {submitError && (
        <p className="rb-app-error" role="alert">
          {submitError}
        </p>
      )}

      <button type="submit" className="rb-app-submit" disabled={state === "submitting"}>
        {state === "submitting" ? "Submitting…" : "Submit application"}
      </button>
    </form>
  );
}
