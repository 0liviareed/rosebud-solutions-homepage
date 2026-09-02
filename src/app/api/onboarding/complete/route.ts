import { NextRequest, NextResponse } from "next/server";
import { appSupabaseAdmin } from "@/lib/appSupabase";
import { requireOrg } from "@/lib/connections/auth";
import {
  getOnboardingState,
  isProfileAnswered,
  applyPresetToDraft,
} from "@/lib/onboarding/state";

export const dynamic = "force-dynamic";

// Closes the welcome flow. Refuses unless W1–W5 are all answered (Welcome doc
// §4, "refuse unless W1–W5 all answered"), then in order: applies the preset to
// a draft config_version (Phase 2 seam — no-op today), sets profile_complete,
// and hands off to setup. The routing gate reads profile_complete on the next
// navigation and stops sending the client to /welcome.
export async function POST(request: NextRequest) {
  const response = NextResponse.json({ ok: true });
  const auth = await requireOrg(request, response);
  if (auth instanceof NextResponse) return auth;
  const { orgId } = auth;

  const admin = appSupabaseAdmin();
  const state = await getOnboardingState(admin, orgId);

  if (state.profile_complete) {
    // Idempotent: a double-submit or a resume after completion just re-hands off.
    return NextResponse.json({ ok: true, redirect: "/connections" }, { headers: response.headers });
  }

  if (!isProfileAnswered(state)) {
    return NextResponse.json(
      { error: "Finish the setup questions first." },
      { status: 400, headers: response.headers }
    );
  }

  // Phase 2 seam — see applyPresetToDraft(). No-op today; never throws, so a
  // paid client reaches setup even before the config model ships.
  await applyPresetToDraft(admin, orgId, state.profile.preset_key as string);

  const now = new Date().toISOString();
  const { error } = await admin.from("tenant_profile").upsert(
    {
      tenant_id: orgId,
      profile_complete: true,
      current_step: null,
      onboarding_completed_at: now,
      updated_at: now,
    },
    { onConflict: "tenant_id" }
  );
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500, headers: response.headers });
  }

  return NextResponse.json({ ok: true, redirect: "/connections" }, { headers: response.headers });
}
