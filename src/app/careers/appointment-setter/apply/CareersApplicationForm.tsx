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
  b2b_experience: string;
  commission_role_before: "yes" | "no" | "";
  commission_role_details: string;
  industry_experience: string[];
  outbound_experience: string;
  outbound_feeling: string;
  calling_notes: string;
  equipment_check: string[];
  hours_monday: string;
  hours_tuesday: string;
  hours_wednesday: string;
  hours_thursday: string;
  hours_friday: string;
  days_per_week: string;
  timezone: string;
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
  portfolio_url: "",
  b2b_experience: "",
  commission_role_before: "",
  commission_role_details: "",
  industry_experience: [],
  outbound_experience: "",
  outbound_feeling: "",
  calling_notes: "",
  equipment_check: [],
  hours_monday: "",
  hours_tuesday: "",
  hours_wednesday: "",
  hours_thursday: "",
  hours_friday: "",
  days_per_week: "",
  timezone: "",
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

const OUTBOUND_EXPERIENCE_OPTIONS: { value: string; label: string }[] = [
  { value: "None",        label: "None" },
  { value: "Some",        label: "Some (occasional, not a core part of my role)" },
  { value: "Significant", label: "Significant (a core, daily part of a previous role)" },
];

const OUTBOUND_FEELING_OPTIONS = [
  "Love it",
  "Fine with it",
  "Prefer minimal",
  "Avoid if possible",
];

const EQUIPMENT_OPTIONS = [
  "Computer or laptop",
  "Headset with microphone",
  "Wired or stable Wi-Fi internet",
  "Quiet calling environment",
];

const WEEKDAYS = [
  { key: "hours_monday",    label: "Mon" },
  { key: "hours_tuesday",   label: "Tue" },
  { key: "hours_wednesday", label: "Wed" },
  { key: "hours_thursday",  label: "Thu" },
  { key: "hours_friday",    label: "Fri" },
] as const;

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
  "b2b_experience","commission_role_before","commission_role_details",
  "industry_experience","outbound_experience","outbound_feeling","calling_notes",
  "equipment_check","days_per_week","earliest_start_date","timezone",
  "gdpr_consent","commission_consent","location_consent",
] as const;

export default function CareersApplicationForm() {
  const [state, setState] = useState<FormState>("idle");
  const [form, setForm] = useState<Form>(INITIAL);
  // Submission-level error (network/API failures). Per-field validation
  // errors are rendered inline next to each field instead.
  const [submitError, setSubmitError] = useState<string>("");
  // Inline error under the hours block — kept as a separate piece of state
  // because it's group-level (total < 20), not per-cell.
  const [hoursError, setHoursError] = useState<string>("");
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
    setForm((f) => {
      const next = { ...f, [key]: value };
      if (key.toString().startsWith("hours_") && hoursError) {
        const total = WEEKDAYS.reduce((sum, d) => sum + (Number(next[d.key]) || 0), 0);
        if (total >= 20) setHoursError("");
      }
      return next;
    });
  }

  function toggleArray(key: "industry_experience" | "equipment_check", value: string) {
    setForm((f) => {
      const current = f[key];
      const exists = current.includes(value);
      return { ...f, [key]: exists ? current.filter((v) => v !== value) : [...current, value] };
    });
  }

  // What's wrong with a given field, if anything. Returns empty string for
  // valid fields and a short user-facing message for invalid ones. Computed
  // every render off the live form state — no separate errors-cache to
  // keep in sync.
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
      case "b2b_experience":         return form.b2b_experience ? "" : "Please select an option.";
      case "commission_role_before": return form.commission_role_before ? "" : "Please select Yes or No.";
      case "commission_role_details":
        if (form.commission_role_before !== "yes") return "";
        return form.commission_role_details.trim() ? "" : "Required when 'Yes' is selected.";
      case "industry_experience": return form.industry_experience.length > 0 ? "" : "Select at least one industry.";
      case "outbound_experience": return form.outbound_experience ? "" : "Please select an option.";
      case "outbound_feeling":    return form.outbound_feeling ? "" : "Please select an option.";
      case "calling_notes":       return form.calling_notes.trim() ? "" : "Required — write 'N/A' if nothing to add.";
      case "equipment_check":     return form.equipment_check.length > 0 ? "" : "Tick at least one item.";
      case "days_per_week":       return form.days_per_week ? "" : "Please select.";
      case "earliest_start_date": return form.earliest_start_date ? "" : "Required.";
      case "timezone":            return form.timezone ? "" : "Please select your timezone.";
      case "gdpr_consent":        return form.gdpr_consent ? "" : "Required to apply.";
      case "commission_consent":  return form.commission_consent ? "" : "Required to apply.";
      case "location_consent":    return form.location_consent ? "" : "Required to apply.";
    }
    return "";
  }

  function renderFieldError(key: string) {
    if (!touched.has(key)) return null;
    const err = fieldError(key);
    if (!err) return null;
    return (
      <span className="rb-app-field-error" role="alert">{err}</span>
    );
  }

  // For radio / checkbox groups: fires when focus leaves the group container
  // entirely (relatedTarget points outside). Keeps the user from being
  // nagged while they're still navigating between options inside the group.
  function onGroupBlur(key: string, e: React.FocusEvent<HTMLDivElement>) {
    const group = e.currentTarget;
    const moving = e.relatedTarget as Element | null;
    if (group && moving && group.contains(moving)) return;
    markTouched(key);
  }

  function onHoursBlur(e: React.FocusEvent<HTMLInputElement>) {
    const group = e.currentTarget.closest(".rb-app-weekdays");
    const moving = e.relatedTarget as Element | null;
    if (group && moving && group.contains(moving)) return;
    const allFilled = WEEKDAYS.every((d) => form[d.key] !== "");
    if (!allFilled) return;
    const total = WEEKDAYS.reduce((sum, d) => sum + (Number(form[d.key]) || 0), 0);
    setHoursError(total < 20
      ? `Minimum 20 hours per week required across Mon–Fri. You've entered ${total}.`
      : "");
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
    // Hours block has its own validator.
    let hoursMsg = "";
    for (const d of WEEKDAYS) {
      const v = form[d.key];
      if (v === "" || !/^\d+$/.test(v) || Number(v) < 0 || Number(v) > 16) {
        hoursMsg = `Enter hours for ${d.label} (0–16).`;
        break;
      }
    }
    if (!hoursMsg) {
      const total = WEEKDAYS.reduce((sum, d) => sum + Number(form[d.key] || 0), 0);
      if (total < 20) {
        hoursMsg = `Minimum 20 hours per week required across Mon–Fri. You've entered ${total}.`;
      }
    }
    if (hoursMsg) {
      setHoursError(hoursMsg);
      blocking.push("hours_block");
    }
    if (blocking.length > 0) {
      // Scroll to the first failing field. The hours block doesn't have a
      // data-field marker on a single input so we look it up by class.
      const first = blocking[0];
      const node = first === "hours_block"
        ? document.querySelector(".rb-app-weekdays")
        : document.querySelector(`[data-field="${first}"]`);
      node?.scrollIntoView({ behavior: "smooth", block: "center" });
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
          portfolio_url: form.portfolio_url || undefined,
          b2b_experience: [form.b2b_experience],
          commission_role_before: form.commission_role_before === "yes",
          commission_role_details: form.commission_role_details || undefined,
          industry_experience: form.industry_experience,
          outbound_experience: form.outbound_experience,
          outbound_feeling: form.outbound_feeling,
          calling_notes: form.calling_notes || undefined,
          equipment_check: form.equipment_check,
          hours_monday:    Number(form.hours_monday),
          hours_tuesday:   Number(form.hours_tuesday),
          hours_wednesday: Number(form.hours_wednesday),
          hours_thursday:  Number(form.hours_thursday),
          hours_friday:    Number(form.hours_friday),
          days_per_week:   Number(form.days_per_week),
          timezone:        form.timezone,
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
            placeholder="e.g. a Loom video, personal site, or work sample"
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

        <div className="rb-app-field" data-field="b2b_experience">
          <span className="rb-app-label">B2B sales, SDR, or setter experience <span className="rb-app-req">*</span></span>
          <div className="rb-app-checks" onBlur={(e) => onGroupBlur("b2b_experience", e)}>
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
          {renderFieldError("b2b_experience")}
        </div>

        <div className="rb-app-field" data-field="commission_role_before">
          <span className="rb-app-label">Have you worked a 100% commission role before? <span className="rb-app-req">*</span></span>
          <div className="rb-app-radios" onBlur={(e) => onGroupBlur("commission_role_before", e)}>
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
          {renderFieldError("commission_role_before")}
        </div>

        {form.commission_role_before === "yes" && (
          <label className="rb-app-field" data-field="commission_role_details">
            <span className="rb-app-label">
              If yes, for how long and what were your average monthly earnings? <span className="rb-app-req">*</span>
            </span>
            <input
              type="text"
              required
              value={form.commission_role_details}
              onChange={(e) => update("commission_role_details", e.target.value)}
              onBlur={() => markTouched("commission_role_details")}
              className="rb-app-input"
            />
            {renderFieldError("commission_role_details")}
          </label>
        )}

        <div className="rb-app-field" data-field="industry_experience">
          <span className="rb-app-label">Industry experience <span className="rb-app-req">*</span></span>
          <div className="rb-app-checks" onBlur={(e) => onGroupBlur("industry_experience", e)}>
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
          {renderFieldError("industry_experience")}
        </div>

        <div className="rb-app-field" data-field="outbound_experience">
          <span className="rb-app-label">
            How much outbound calling experience do you have? <span className="rb-app-req">*</span>
          </span>
          <div className="rb-app-checks" onBlur={(e) => onGroupBlur("outbound_experience", e)}>
            {OUTBOUND_EXPERIENCE_OPTIONS.map((opt) => (
              <label key={opt.value} className="rb-app-check">
                <input
                  type="radio"
                  name="outbound_experience"
                  checked={form.outbound_experience === opt.value}
                  onChange={() => update("outbound_experience", opt.value)}
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
          {renderFieldError("outbound_experience")}
        </div>

        <div className="rb-app-field" data-field="outbound_feeling">
          <span className="rb-app-label">
            How do you feel about a role that&rsquo;s primarily outbound calling? <span className="rb-app-req">*</span>
          </span>
          <div className="rb-app-checks" onBlur={(e) => onGroupBlur("outbound_feeling", e)}>
            {OUTBOUND_FEELING_OPTIONS.map((opt) => (
              <label key={opt} className="rb-app-check">
                <input
                  type="radio"
                  name="outbound_feeling"
                  checked={form.outbound_feeling === opt}
                  onChange={() => update("outbound_feeling", opt)}
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
          {renderFieldError("outbound_feeling")}
        </div>

        <label className="rb-app-field" data-field="calling_notes">
          <span className="rb-app-label">Anything else about your calling experience? <span className="rb-app-req">*</span></span>
          <textarea
            rows={3}
            required
            value={form.calling_notes}
            onChange={(e) => update("calling_notes", e.target.value)}
            onBlur={() => markTouched("calling_notes")}
            className="rb-app-input"
            style={{ resize: "vertical", minHeight: "78px", fontFamily: "inherit" }}
            placeholder="Share anything that gives us context. Write 'N/A' if nothing to add."
          />
          {renderFieldError("calling_notes")}
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

        <div className="rb-app-field">
          <span className="rb-app-label">
            Hours you can commit per day <span className="rb-app-req">*</span>
          </span>
          <div className="rb-app-weekdays">
            {WEEKDAYS.map((d) => (
              <label key={d.key} className="rb-app-weekday">
                <span className="rb-app-weekday-label">{d.label}</span>
                <input
                  type="number"
                  min={0}
                  max={16}
                  step={1}
                  inputMode="numeric"
                  required
                  value={form[d.key]}
                  onChange={(e) => update(d.key, e.target.value)}
                  onBlur={onHoursBlur}
                  className="rb-app-input rb-app-weekday-input"
                  placeholder="0"
                />
              </label>
            ))}
          </div>
          {hoursError && (
            <div className="rb-app-inline-error" role="alert">{hoursError}</div>
          )}
          <span className="rb-app-hint">Enter 0 for days you can&rsquo;t commit. Range 0–16 per day. <strong>Minimum 20 hours per week required.</strong></span>
        </div>

        <div className="rb-app-row">
          <label className="rb-app-field" data-field="days_per_week">
            <span className="rb-app-label">
              Days per week you can commit <span className="rb-app-req">*</span>
            </span>
            <select
              required
              value={form.days_per_week}
              onChange={(e) => update("days_per_week", e.target.value)}
              onBlur={() => markTouched("days_per_week")}
              className="rb-app-input"
            >
              <option value="" disabled>Select</option>
              <option value="1">1 day</option>
              <option value="2">2 days</option>
              <option value="3">3 days</option>
              <option value="4">4 days</option>
              <option value="5">5 days</option>
            </select>
            {renderFieldError("days_per_week")}
          </label>
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
        </div>

        <label className="rb-app-field" data-field="timezone">
          <span className="rb-app-label">
            Your timezone <span className="rb-app-req">*</span>
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
