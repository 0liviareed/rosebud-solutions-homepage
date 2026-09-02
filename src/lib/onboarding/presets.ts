// Preset catalogue for the first-login welcome flow, W2 ("What does your
// business do?"). Spec: Rosebud_Engine_Onboarding_Welcome_Build_Doc_v2.md §3
// (W2) and the profile→config seeding map (§0).
//
// The chips are PRESET SELECTORS, not a fixed product scope — the engine is
// horizontal; W2 only picks which starter defaults load, and this catalogue is
// extensible. "Something else" resolves to the neutral preset (never blocks a
// client who doesn't fit a chip), and requires the W2 free-text field.
//
// Scope boundary (deliberate): applying a preset to a draft config_version —
// seeding qualification, value_tiers, escalation, modules, reminders, nurture —
// is Phase 2 work (config model + preset-apply logic), which doesn't exist
// yet. This file therefore owns only what the welcome flow needs TODAY: the
// catalogue W2 renders and GET /api/presets returns, keyed so Phase 2's
// preset-apply can look each entry up by `key`. See applyPresetToDraft() in
// state.ts for the seam where Phase 2 plugs in.

export type Preset = {
  key: string;
  label: string;
  order: number;
  // One line shown under the handoff ("Your engine is set up for {blurb}").
  blurb: string;
};

// `neutral` always exists and is always last — it's the "Something else"
// landing and the fallback for any unrecognised key.
export const PRESETS: Preset[] = [
  { key: "dental", label: "Dental & aesthetics", order: 1, blurb: "a dental & aesthetics practice" },
  { key: "trades", label: "Trades & home services", order: 2, blurb: "a trades & home-services business" },
  { key: "mortgage", label: "Mortgage & lending", order: 3, blurb: "a mortgage & lending business" },
  { key: "legal", label: "Legal", order: 4, blurb: "a legal practice" },
  { key: "recruitment", label: "Recruitment", order: 5, blurb: "a recruitment business" },
  { key: "insurance", label: "Insurance", order: 6, blurb: "an insurance business" },
  { key: "real_estate", label: "Real estate", order: 7, blurb: "a real-estate business" },
  { key: "neutral", label: "Something else", order: 99, blurb: "your business" },
];

const BY_KEY = new Map(PRESETS.map((p) => [p.key, p]));

export function isValidPresetKey(key: string | null | undefined): boolean {
  return !!key && BY_KEY.has(key);
}

export function presetBlurb(key: string | null | undefined): string {
  return (key && BY_KEY.get(key)?.blurb) || "your business";
}

// Ordered catalogue for W2 and GET /api/presets (neutral always present, last).
export function presetCatalogue(): Preset[] {
  return [...PRESETS].sort((a, b) => a.order - b.order);
}
