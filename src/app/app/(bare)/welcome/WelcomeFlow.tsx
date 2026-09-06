"use client";

import { useCallback, useMemo, useState } from "react";
import { presetBlurb, presetCatalogue } from "@/lib/onboarding/presets";
import type { OnboardingState, Step } from "@/lib/onboarding/state";
import styles from "./welcome.module.css";

// Assisted-setup path (W0 "Book a call") — the real Rosebud booking link. An
// operator completes the same profile with the client; onboarding pauses. Not
// a skip (§2).
const BOOK_A_CALL = "https://cal.eu/rosebudsolutions/demo?context=setup_assist";

type Screen = "W0" | Step | "done";
const ORDER: Screen[] = ["W0", "W1", "W2", "W3", "W4", "W5", "done"];

const CHANNEL_OPTIONS: { key: string; label: string }[] = [
  { key: "web_form", label: "Web form" },
  { key: "email", label: "Email" },
  { key: "sms", label: "SMS" },
  { key: "whatsapp", label: "WhatsApp" },
  { key: "instagram", label: "Instagram" },
];

const CRM_OPTIONS: { key: string; label: string }[] = [
  { key: "zoho", label: "Zoho" },
  { key: "hubspot", label: "HubSpot" },
  { key: "salesforce", label: "Salesforce" },
  { key: "pipedrive", label: "Pipedrive" },
  { key: "other", label: "Something else" },
];

const CALENDAR_OPTIONS: { key: string; label: string }[] = [
  { key: "google", label: "Google Calendar" },
  { key: "microsoft", label: "Outlook" },
  { key: "calcom", label: "Cal.com" },
  { key: "calendly", label: "Calendly" },
  { key: "other", label: "Something else" },
];

export default function WelcomeFlow({
  firstName,
  initialState,
}: {
  firstName: string;
  initialState: OnboardingState;
}) {
  const p = initialState.profile;
  const i = initialState.intents;

  // Resume at the saved step if the client already started; otherwise the splash.
  const startScreen: Screen =
    initialState.current_step && (ORDER as string[]).includes(initialState.current_step)
      ? (initialState.current_step as Screen)
      : "W0";
  const [screen, setScreen] = useState<Screen>(startScreen);

  // W1
  const [businessName, setBusinessName] = useState(p.business_name ?? "");
  const [website, setWebsite] = useState(p.website ?? "");
  const [noWebsite, setNoWebsite] = useState(p.no_website === true);
  // W2
  const [presetKey, setPresetKey] = useState(p.preset_key ?? "");
  const [customDesc, setCustomDesc] = useState(p.custom_business_desc ?? "");
  // W3
  const [channels, setChannels] = useState<string[]>(
    i.channels && i.channels.length ? i.channels : ["web_form", "email"]
  );
  // W4
  const [crmProvider, setCrmProvider] = useState(i.crm_provider ?? "");
  const [noCrm, setNoCrm] = useState(i.has_crm === false);
  // W5
  const [calendarProvider, setCalendarProvider] = useState(i.calendar_provider ?? "");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const presets = useMemo(() => presetCatalogue(), []);

  // web_form isn't a valid channel without a site — mirror the server (§3, W3).
  const channelDisabled = useCallback((key: string) => key === "web_form" && noWebsite, [noWebsite]);
  const effectiveChannels = channels.filter((c) => !channelDisabled(c));

  const stepNumber: Record<Step, number> = { W1: 1, W2: 2, W3: 3, W4: 4, W5: 5 };

  const valid = (() => {
    switch (screen) {
      case "W1":
        return businessName.trim().length > 0 && (website.trim().length > 0 || noWebsite);
      case "W2":
        return presetKey.length > 0 && (presetKey !== "neutral" || customDesc.trim().length > 0);
      case "W3":
        return effectiveChannels.length >= 1;
      case "W4":
        return noCrm || crmProvider.length > 0;
      case "W5":
        return calendarProvider.length > 0;
      default:
        return true;
    }
  })();

  const payloadFor = (step: Step) => {
    switch (step) {
      case "W1":
        return {
          step,
          business_name: businessName.trim(),
          website: website.trim(),
          no_website: noWebsite,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || null,
        };
      case "W2":
        return { step, preset_key: presetKey, custom_business_desc: customDesc.trim() };
      case "W3":
        return { step, channels: effectiveChannels };
      case "W4":
        return { step, has_crm: !noCrm, crm_provider: noCrm ? null : crmProvider };
      case "W5":
        return { step, calendar_provider: calendarProvider };
    }
  };

  const saveStep = async (step: Step): Promise<boolean> => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/onboarding/step", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadFor(step)),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setError(j.error ?? "Something went wrong — try again.");
        return false;
      }
      return true;
    } catch {
      setError("Connection problem — try again.");
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const advance = async () => {
    if (screen === "W0") {
      setScreen("W1");
      return;
    }
    if (screen === "W1" || screen === "W2" || screen === "W3" || screen === "W4") {
      const ok = await saveStep(screen);
      if (!ok) return;
      const next = ORDER[ORDER.indexOf(screen) + 1] as Screen;
      setScreen(next);
      return;
    }
    if (screen === "W5") {
      const ok = await saveStep("W5");
      if (!ok) return;
      // Close the flow. On success the gate stops routing to /welcome.
      setSubmitting(true);
      try {
        const res = await fetch("/api/onboarding/complete", { method: "POST" });
        const j = await res.json().catch(() => ({}));
        if (!res.ok) {
          setError(j.error ?? "Couldn't finish — try again.");
          return;
        }
        setScreen("done");
      } catch {
        setError("Connection problem — try again.");
      } finally {
        setSubmitting(false);
      }
    }
  };

  const goBack = () => {
    setError(null);
    const prev = ORDER[ORDER.indexOf(screen) - 1] as Screen;
    if (prev) setScreen(prev);
  };

  const toggleChannel = (key: string) => {
    if (channelDisabled(key)) return;
    setChannels((cur) => (cur.includes(key) ? cur.filter((c) => c !== key) : [...cur, key]));
  };

  // ── Splash ──────────────────────────────────────────────────────────────
  if (screen === "W0") {
    return (
      <div className={styles.stage}>
        <div className={styles.splash}>
          <div className={styles.rose}>🌹</div>
          <h1 className={styles.splashTitle}>
            Welcome{firstName ? `, ${firstName}` : ""}.
          </h1>
          <p className={styles.splashLede}>Let&rsquo;s set up your engine.</p>
          <p className={styles.splashBody}>
            Five quick questions so your engine is set up for your business. About two minutes.
            Then you&rsquo;ll connect your tools and go live.
          </p>
          <button type="button" className={styles.primary} onClick={advance}>
            Start →
          </button>
          <p className={styles.assist}>
            Prefer we set it up with you?{" "}
            <a href={BOOK_A_CALL} className={styles.assistLink}>
              Book a call
            </a>
          </p>
        </div>
      </div>
    );
  }

  // ── Handoff ─────────────────────────────────────────────────────────────
  if (screen === "done") {
    return (
      <div className={styles.stage}>
        <div className={styles.splash}>
          <div className={styles.check}>✓</div>
          <h1 className={styles.splashTitle}>Your engine is set up for {presetBlurb(presetKey)}.</h1>
          <p className={styles.splashBody}>
            Next, connect your tools. Most take a couple of minutes. WhatsApp can take longer to
            approve, so you can start it now and finish the rest without waiting.
          </p>
          <a href="/settings/connections" className={styles.primaryLink}>
            Connect my tools →
          </a>
        </div>
      </div>
    );
  }

  // ── Question steps (W1–W5) ────────────────────────────────────────────────
  const step = screen as Step;
  return (
    <div className={styles.stage}>
      <div className={styles.card}>
        <div className={styles.topBar}>
          <button type="button" className={styles.back} onClick={goBack} aria-label="Back">
            ←
          </button>
          <span className={styles.counter}>Step {stepNumber[step]} of 5</span>
        </div>

        {step === "W1" && (
          <div className={styles.stepBody}>
            <h2 className={styles.stepTitle}>About your business</h2>
            <p className={styles.stepHint}>We use this to set up your engine and your replies.</p>
            <label className={styles.field}>
              <span className={styles.label}>Business name</span>
              <input
                className={styles.input}
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Ridgeline Dental Care"
                autoFocus
              />
            </label>
            <label className={styles.field}>
              <span className={styles.label}>Website</span>
              <input
                className={styles.input}
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://"
                disabled={noWebsite}
              />
            </label>
            <label className={styles.checkRow}>
              <input
                type="checkbox"
                checked={noWebsite}
                onChange={(e) => setNoWebsite(e.target.checked)}
              />
              <span>I don&rsquo;t have a website yet</span>
            </label>
          </div>
        )}

        {step === "W2" && (
          <div className={styles.stepBody}>
            <h2 className={styles.stepTitle}>What does your business do?</h2>
            <p className={styles.stepHint}>This sets up sensible defaults you can change later.</p>
            <div className={styles.chips}>
              {presets.map((preset) => (
                <button
                  key={preset.key}
                  type="button"
                  className={`${styles.chip} ${presetKey === preset.key ? styles.chipOn : ""}`}
                  onClick={() => setPresetKey(preset.key)}
                >
                  {preset.label}
                </button>
              ))}
            </div>
            {presetKey === "neutral" && (
              <label className={styles.field}>
                <span className={styles.label}>Describe it in a few words</span>
                <input
                  className={styles.input}
                  value={customDesc}
                  onChange={(e) => setCustomDesc(e.target.value)}
                  placeholder="e.g. commercial solar installation"
                  autoFocus
                />
              </label>
            )}
          </div>
        )}

        {step === "W3" && (
          <div className={styles.stepBody}>
            <h2 className={styles.stepTitle}>How do enquiries reach you?</h2>
            <p className={styles.stepHint}>Pick all that apply. You can add more later.</p>
            <div className={styles.chips}>
              {CHANNEL_OPTIONS.map((opt) => {
                const disabled = channelDisabled(opt.key);
                const on = channels.includes(opt.key) && !disabled;
                return (
                  <button
                    key={opt.key}
                    type="button"
                    disabled={disabled}
                    className={`${styles.chip} ${on ? styles.chipOn : ""} ${disabled ? styles.chipDisabled : ""}`}
                    onClick={() => toggleChannel(opt.key)}
                  >
                    {on ? "✓ " : ""}
                    {opt.label}
                  </button>
                );
              })}
            </div>
            {noWebsite && (
              <p className={styles.note}>Web form is off because you don&rsquo;t have a website yet.</p>
            )}
          </div>
        )}

        {step === "W4" && (
          <div className={styles.stepBody}>
            <h2 className={styles.stepTitle}>Which CRM do you use?</h2>
            <p className={styles.stepHint}>We connect to your own CRM. Your data stays yours.</p>
            <div className={styles.chips}>
              {CRM_OPTIONS.map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  className={`${styles.chip} ${!noCrm && crmProvider === opt.key ? styles.chipOn : ""}`}
                  onClick={() => {
                    setNoCrm(false);
                    setCrmProvider(opt.key);
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              className={`${styles.wideOption} ${noCrm ? styles.wideOptionOn : ""}`}
              onClick={() => {
                setNoCrm(true);
                setCrmProvider("");
              }}
            >
              I don&rsquo;t have a CRM
            </button>
          </div>
        )}

        {step === "W5" && (
          <div className={styles.stepBody}>
            <h2 className={styles.stepTitle}>Which calendar do you use?</h2>
            <p className={styles.stepHint}>Bookings land straight into your own calendar.</p>
            <div className={styles.chips}>
              {CALENDAR_OPTIONS.map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  className={`${styles.chip} ${calendarProvider === opt.key ? styles.chipOn : ""}`}
                  onClick={() => setCalendarProvider(opt.key)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {error && <p className={styles.error}>{error}</p>}

        <button
          type="button"
          className={styles.primary}
          onClick={advance}
          disabled={!valid || submitting}
        >
          {submitting ? "Saving…" : step === "W5" ? "Finish →" : "Continue →"}
        </button>
      </div>
    </div>
  );
}
