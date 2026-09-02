import type { SupabaseClient } from "@supabase/supabase-js";
import { isValidPresetKey } from "./presets";

// Onboarding (welcome flow) state + validation, shared by the /api/onboarding/*
// routes and the /app/welcome server component. Spec:
// Rosebud_Engine_Onboarding_Welcome_Build_Doc_v2.md §2 (routing/state), §4
// (data model), and the per-step required-answer rules in §3.

export const STEPS = ["W1", "W2", "W3", "W4", "W5"] as const;
export type Step = (typeof STEPS)[number];

// W3 — the high-level channel intents (NOT the specific S2 email providers).
export const CHANNELS = ["web_form", "email", "sms", "whatsapp", "instagram"] as const;
export type Channel = (typeof CHANNELS)[number];

// W4 — CRM providers offered as chips. "other" = the "Something else" chip;
// has_crm=false is the separate "I don't have a CRM" answer.
export const CRM_PROVIDERS = ["zoho", "hubspot", "salesforce", "pipedrive", "other"] as const;

// W5 — calendar providers. Keys match the Connections catalogue where a real
// card exists (google, microsoft, calcom, calendly) so intents pre-select.
export const CALENDAR_PROVIDERS = ["google", "microsoft", "calcom", "calendly", "other"] as const;

export type TenantProfile = {
  tenant_id: string;
  business_name: string | null;
  website: string | null;
  no_website: boolean;
  logo_url: string | null;
  preset_key: string | null;
  custom_business_desc: string | null;
  timezone: string | null;
  profile_complete: boolean;
  current_step: string | null;
  onboarding_completed_at: string | null;
};

export type ConnectionIntent = {
  tenant_id: string;
  has_crm: boolean | null;
  crm_provider: string | null;
  calendar_provider: string | null;
  channels: string[];
};

export type OnboardingState = {
  profile_complete: boolean;
  current_step: string | null;
  profile: Partial<TenantProfile>;
  intents: Partial<ConnectionIntent>;
};

// Reads both rows for an org. A brand-new org (created at signup, no rows yet)
// resolves to an empty, not-complete state — which the routing gate reads as
// "send to /welcome" (§2: `created and not profile_complete`).
export async function getOnboardingState(
  admin: SupabaseClient,
  orgId: string
): Promise<OnboardingState> {
  const [{ data: profile }, { data: intent }] = await Promise.all([
    admin.from("tenant_profile").select("*").eq("tenant_id", orgId).maybeSingle(),
    admin.from("connection_intent").select("*").eq("tenant_id", orgId).maybeSingle(),
  ]);

  return {
    profile_complete: profile?.profile_complete === true,
    current_step: profile?.current_step ?? null,
    profile: (profile ?? {}) as Partial<TenantProfile>,
    intents: (intent ?? {}) as Partial<ConnectionIntent>,
  };
}

// True only when W1–W5 are all answered — the gate POST /api/onboarding/complete
// enforces before flipping profile_complete (§4, "refuse unless W1–W5 all
// answered"). Kept as one function so client (disable Finish) and server
// (reject complete) agree on the definition.
export function isProfileAnswered(state: OnboardingState): boolean {
  const p = state.profile;
  const i = state.intents;

  const w1 = !!p.business_name?.trim() && (!!p.website?.trim() || p.no_website === true);
  const w2 = isValidPresetKey(p.preset_key) &&
    (p.preset_key !== "neutral" || !!p.custom_business_desc?.trim());
  const w3 = Array.isArray(i.channels) && i.channels.length >= 1;
  // W4 is answered either by a provider OR by the explicit "no CRM" choice.
  const w4 = !!i.crm_provider || i.has_crm === false;
  const w5 = !!i.calendar_provider;

  return w1 && w2 && w3 && w4 && w5;
}

// Maps the declared intents to the Connections catalogue cards to pre-highlight
// (§0: "each selection pre-highlights a card on Connections"). Returns
// "category:provider" keys matching ConnectionsView's byCategoryProvider map.
// web_form is intentionally absent — it's the Capture form (Install), not an
// S2 connection card; and has_crm=false surfaces the included CRM, which has
// no card yet, so it maps to nothing.
export function intentHighlightKeys(intents: Partial<ConnectionIntent>): string[] {
  const keys = new Set<string>();

  if (intents.crm_provider && intents.crm_provider !== "other") {
    keys.add(`crm:${intents.crm_provider}`);
  }
  if (intents.calendar_provider && intents.calendar_provider !== "other") {
    keys.add(`calendar:${intents.calendar_provider}`);
  }
  for (const ch of intents.channels ?? []) {
    if (ch === "email") {
      // "Email" is provider-agnostic — highlight the two hosted-mailbox OAuth
      // cards as the primary path; the ESP credential cards stay available but
      // un-highlighted.
      keys.add("channel:google");
      keys.add("channel:microsoft");
    } else if (ch === "sms") {
      keys.add("channel:twilio");
    } else if (ch === "whatsapp") {
      keys.add("channel:whatsapp");
    } else if (ch === "instagram") {
      keys.add("channel:instagram");
    }
  }
  return [...keys];
}

// SEAM for Phase 2. On completion the welcome flow is meant to create a draft
// config_version and apply the chosen preset (qualification, value_tiers,
// escalation, modules, reminders, nurture) plus the W1 identity and the W3
// channel intents — see the Welcome doc §4 "On complete, in one transaction".
// That config model is Phase 2 and does not exist yet, so this is a no-op
// today. When Phase 2 lands, implement it here (and only here) — nothing else
// in the flow needs to change, because completion already persists preset_key
// and the intents that this function will read. Intentionally does NOT throw:
// a paid client must still reach setup even before Phase 2 ships (§5: "a
// tenant reaching S0 before this flow exists simply has a neutral draft").
export async function applyPresetToDraft(
  admin: SupabaseClient,
  orgId: string,
  presetKey: string
): Promise<void> {
  // Phase 2: create config_version draft from preset + identity + channel
  // intents. Params are referenced (below) purely so the seam signature is the
  // real one Phase 2 fills in, not a placeholder that gets rewritten.
  void admin;
  void orgId;
  void presetKey;
  return;
}
