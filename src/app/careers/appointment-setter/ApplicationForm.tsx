"use client";

import { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

type FormShape = {
  name: string;
  email: string;
  phone: string;
  location: string;
  experience: string;
  vertical: string;
  commission_only: string;
  hours_overlap: string;
  voice_intro_url: string;
  why: string;
  linkedin: string;
  consent: boolean;
};

const INITIAL: FormShape = {
  name: "",
  email: "",
  phone: "",
  location: "",
  experience: "",
  vertical: "",
  commission_only: "",
  hours_overlap: "",
  voice_intro_url: "",
  why: "",
  linkedin: "",
  consent: false,
};

const VERTICALS = [
  "Aesthetics",
  "Mortgage",
  "Legal",
  "Property",
  "Trades",
  "Recruitment",
  "Hospitality (independent)",
  "Other / multiple",
  "None of the above",
];

export default function ApplicationForm() {
  const [state, setState] = useState<FormState>("idle");
  const [form, setForm] = useState<FormShape>(INITIAL);
  const [error, setError] = useState<string>("");

  function update<K extends keyof FormShape>(key: K, value: FormShape[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.consent) {
      setError("Please confirm you've read the privacy policy.");
      return;
    }
    setError("");
    setState("submitting");
    try {
      const res = await fetch("/api/careers/appointment-setter", {
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
      setError(err instanceof Error ? err.message : "Submission failed.");
    }
  }

  if (state === "success") {
    return (
      <div className="rb-apply-shell rb-apply-success" role="status" aria-live="polite">
        <p className="rb-eyebrow">
          <span className="rb-num">·</span>Received
        </p>
        <h3 className="rb-apply-success-h">Thanks — application in.</h3>
        <p className="rb-apply-success-body">
          We review applications weekly. If you&rsquo;re a strong fit you&rsquo;ll
          hear from the COO within seven days with an interview slot. If you
          don&rsquo;t, assume we&rsquo;ve passed this cycle — rolling intake means
          we keep your application on file for future windows.
        </p>
      </div>
    );
  }

  return (
    <form className="rb-apply-shell" onSubmit={onSubmit} noValidate>
      <fieldset className="rb-apply-fs" disabled={state === "submitting"}>
        <legend className="rb-apply-legend">About you</legend>

        <div className="rb-apply-row">
          <label className="rb-apply-field">
            <span className="rb-apply-label">Full name</span>
            <input
              type="text"
              required
              autoComplete="name"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="rb-apply-input"
            />
          </label>
          <label className="rb-apply-field">
            <span className="rb-apply-label">Email</span>
            <input
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="rb-apply-input"
            />
          </label>
        </div>

        <div className="rb-apply-row">
          <label className="rb-apply-field">
            <span className="rb-apply-label">Phone (with country code)</span>
            <input
              type="tel"
              required
              autoComplete="tel"
              placeholder="+44 7…"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className="rb-apply-input"
            />
          </label>
          <label className="rb-apply-field">
            <span className="rb-apply-label">Location (city, country)</span>
            <input
              type="text"
              required
              value={form.location}
              onChange={(e) => update("location", e.target.value)}
              className="rb-apply-input"
            />
          </label>
        </div>

        <label className="rb-apply-field">
          <span className="rb-apply-label">LinkedIn (optional)</span>
          <input
            type="url"
            placeholder="https://linkedin.com/in/…"
            value={form.linkedin}
            onChange={(e) => update("linkedin", e.target.value)}
            className="rb-apply-input"
          />
        </label>
      </fieldset>

      <fieldset className="rb-apply-fs" disabled={state === "submitting"}>
        <legend className="rb-apply-legend">Experience</legend>

        <label className="rb-apply-field">
          <span className="rb-apply-label">
            B2B sales, SDR, or setter experience — describe briefly
          </span>
          <textarea
            required
            rows={4}
            value={form.experience}
            onChange={(e) => update("experience", e.target.value)}
            className="rb-apply-input rb-apply-textarea"
            placeholder="Roles, length, average call volume, qualification framework you ran to."
          />
        </label>

        <label className="rb-apply-field">
          <span className="rb-apply-label">Closest serviced vertical to your experience</span>
          <select
            required
            value={form.vertical}
            onChange={(e) => update("vertical", e.target.value)}
            className="rb-apply-input rb-apply-select"
          >
            <option value="">Select one…</option>
            {VERTICALS.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </label>

        <div className="rb-apply-row">
          <label className="rb-apply-field">
            <span className="rb-apply-label">Commission-only history</span>
            <select
              required
              value={form.commission_only}
              onChange={(e) => update("commission_only", e.target.value)}
              className="rb-apply-input rb-apply-select"
            >
              <option value="">Select one…</option>
              <option value="yes">Yes — previous commission-only role</option>
              <option value="runway">No, but I have 3+ months of runway</option>
              <option value="no">Neither</option>
            </select>
          </label>
          <label className="rb-apply-field">
            <span className="rb-apply-label">Hours overlap with UK + US East Coast</span>
            <select
              required
              value={form.hours_overlap}
              onChange={(e) => update("hours_overlap", e.target.value)}
              className="rb-apply-input rb-apply-select"
            >
              <option value="">Select one…</option>
              <option value="full">Workable overlap with both</option>
              <option value="partial">Partial overlap — UK only</option>
              <option value="partial_us">Partial overlap — US only</option>
              <option value="none">Neither</option>
            </select>
          </label>
        </div>
      </fieldset>

      <fieldset className="rb-apply-fs" disabled={state === "submitting"}>
        <legend className="rb-apply-legend">Voice intro</legend>

        <label className="rb-apply-field">
          <span className="rb-apply-label">
            Voice intro URL — required
          </span>
          <input
            type="url"
            required
            placeholder="https://… (Loom, Vocaroo, Google Drive, Dropbox)"
            value={form.voice_intro_url}
            onChange={(e) => update("voice_intro_url", e.target.value)}
            className="rb-apply-input"
          />
          <span className="rb-apply-hint">
            A 60–90 second voice clip. Tell us who you are, what you&rsquo;ve
            done, and what draws you to a setter role over closing.
            Loom or Vocaroo are easiest. Make sure the link is publicly
            accessible.
          </span>
        </label>

        <label className="rb-apply-field">
          <span className="rb-apply-label">Why this role, for you</span>
          <textarea
            required
            rows={4}
            value={form.why}
            onChange={(e) => update("why", e.target.value)}
            className="rb-apply-input rb-apply-textarea"
            placeholder="Short. Honest."
          />
        </label>
      </fieldset>

      <label className="rb-apply-consent">
        <input
          type="checkbox"
          required
          checked={form.consent}
          onChange={(e) => update("consent", e.target.checked)}
        />
        <span>
          I&rsquo;ve read the{" "}
          <a href="/privacy" target="_blank" rel="noopener noreferrer">
            privacy policy
          </a>{" "}
          and consent to Rosebud Solutions processing this application.
        </span>
      </label>

      {error && (
        <p className="rb-apply-error" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="rb-apply-submit"
        disabled={state === "submitting"}
      >
        {state === "submitting" ? "Submitting…" : "Submit application"}
      </button>
    </form>
  );
}
