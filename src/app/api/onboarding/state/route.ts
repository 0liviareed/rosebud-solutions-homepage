import { NextRequest, NextResponse } from "next/server";
import { appSupabaseAdmin } from "@/lib/appSupabase";
import { requireOrg } from "@/lib/connections/auth";
import { getOnboardingState } from "@/lib/onboarding/state";

export const dynamic = "force-dynamic";

// Backs the welcome flow's resume — the client component reads this on mount to
// pick up at current_step with any saved answers. Spec: Welcome doc §4,
// GET /api/onboarding/state → { profile_complete, current_step, profile, intents }.
export async function GET(request: NextRequest) {
  const response = NextResponse.json({ ok: true });
  const auth = await requireOrg(request, response);
  if (auth instanceof NextResponse) return auth;

  const admin = appSupabaseAdmin();
  const state = await getOnboardingState(admin, auth.orgId);
  return NextResponse.json(state, { headers: response.headers });
}
