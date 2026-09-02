import { NextRequest, NextResponse } from "next/server";
import { appSupabaseAdmin } from "@/lib/appSupabase";
import { requireOrg } from "@/lib/connections/auth";
import { getOnboardingState } from "@/lib/onboarding/state";
import {
  STEPS,
  CHANNELS,
  CRM_PROVIDERS,
  CALENDAR_PROVIDERS,
  type Step,
} from "@/lib/onboarding/state";
import { isValidPresetKey } from "@/lib/onboarding/presets";

export const dynamic = "force-dynamic";

// Save one welcome-flow step. Validates the step's required answer server-side
// (Continue is disabled client-side to match, but the server is the authority —
// §2, "rejects an empty required step"), upserts the answer, and advances
// current_step so a later resume opens at the right screen. Spec: Welcome doc
// §3 per-step rules, §4 POST /api/onboarding/step.

const NEXT_STEP: Record<Step, string> = {
  W1: "W2",
  W2: "W3",
  W3: "W4",
  W4: "W5",
  W5: "W5", // stays; the separate /complete call closes the flow
};

type Body = {
  step?: string;
  business_name?: string;
  website?: string;
  no_website?: boolean;
  timezone?: string;
  preset_key?: string;
  custom_business_desc?: string;
  channels?: string[];
  crm_provider?: string;
  has_crm?: boolean;
  calendar_provider?: string;
};

const clean = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ ok: true });
  const auth = await requireOrg(request, response);
  if (auth instanceof NextResponse) return auth;
  const { orgId } = auth;

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const step = body.step as Step | undefined;
  if (!step || !STEPS.includes(step)) {
    return NextResponse.json({ error: "Unknown step" }, { status: 400 });
  }

  const admin = appSupabaseAdmin();
  const now = new Date().toISOString();
  const bad = (msg: string) => NextResponse.json({ error: msg }, { status: 400 });

  // Each branch validates then writes to the right table. tenant_id is always
  // included so the upsert (onConflict tenant_id) updates only the columns
  // this step owns and leaves the rest of the row intact.
  if (step === "W1") {
    const businessName = clean(body.business_name);
    const website = clean(body.website);
    const noWebsite = body.no_website === true;
    if (!businessName) return bad("Add your business name.");
    if (!website && !noWebsite) return bad("Add your website, or tick that you don't have one yet.");
    const { error } = await admin.from("tenant_profile").upsert(
      {
        tenant_id: orgId,
        business_name: businessName,
        website: noWebsite ? null : website,
        no_website: noWebsite,
        timezone: clean(body.timezone) || null,
        current_step: NEXT_STEP.W1,
        updated_at: now,
      },
      { onConflict: "tenant_id" }
    );
    if (error) return bad(error.message);
  } else if (step === "W2") {
    const presetKey = clean(body.preset_key);
    if (!isValidPresetKey(presetKey)) return bad("Pick what your business does.");
    const desc = clean(body.custom_business_desc);
    if (presetKey === "neutral" && !desc) return bad("Tell us in a few words what your business does.");
    const { error } = await admin.from("tenant_profile").upsert(
      {
        tenant_id: orgId,
        preset_key: presetKey,
        custom_business_desc: presetKey === "neutral" ? desc : null,
        current_step: NEXT_STEP.W2,
        updated_at: now,
      },
      { onConflict: "tenant_id" }
    );
    if (error) return bad(error.message);
  } else if (step === "W3") {
    const channels = Array.isArray(body.channels)
      ? [...new Set(body.channels.filter((c) => (CHANNELS as readonly string[]).includes(c)))]
      : [];
    if (channels.length < 1) return bad("Pick at least one way enquiries reach you.");
    const { error } = await admin.from("connection_intent").upsert(
      { tenant_id: orgId, channels, updated_at: now },
      { onConflict: "tenant_id" }
    );
    if (error) return bad(error.message);
    // advance the resume pointer on the profile row
    await admin.from("tenant_profile").upsert(
      { tenant_id: orgId, current_step: NEXT_STEP.W3, updated_at: now },
      { onConflict: "tenant_id" }
    );
  } else if (step === "W4") {
    const noCrm = body.has_crm === false;
    const provider = clean(body.crm_provider);
    if (!noCrm && !(CRM_PROVIDERS as readonly string[]).includes(provider)) {
      return bad("Pick your CRM, or choose “I don't have a CRM”.");
    }
    const { error } = await admin.from("connection_intent").upsert(
      {
        tenant_id: orgId,
        has_crm: !noCrm,
        crm_provider: noCrm ? null : provider,
        updated_at: now,
      },
      { onConflict: "tenant_id" }
    );
    if (error) return bad(error.message);
    await admin.from("tenant_profile").upsert(
      { tenant_id: orgId, current_step: NEXT_STEP.W4, updated_at: now },
      { onConflict: "tenant_id" }
    );
  } else if (step === "W5") {
    const provider = clean(body.calendar_provider);
    if (!(CALENDAR_PROVIDERS as readonly string[]).includes(provider)) {
      return bad("Pick your calendar.");
    }
    const { error } = await admin.from("connection_intent").upsert(
      { tenant_id: orgId, calendar_provider: provider, updated_at: now },
      { onConflict: "tenant_id" }
    );
    if (error) return bad(error.message);
    await admin.from("tenant_profile").upsert(
      { tenant_id: orgId, current_step: NEXT_STEP.W5, updated_at: now },
      { onConflict: "tenant_id" }
    );
  }

  const state = await getOnboardingState(admin, orgId);
  return NextResponse.json(
    { next: NEXT_STEP[step], state },
    { headers: response.headers }
  );
}
