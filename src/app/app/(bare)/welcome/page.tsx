import { redirect } from "next/navigation";
import { appSupabaseAdmin } from "@/lib/appSupabase";
import { createAppSupabaseServerComponentClient } from "@/lib/appSupabaseSession";
import { getOnboardingState } from "@/lib/onboarding/state";
import WelcomeFlow from "./WelcomeFlow";

export const dynamic = "force-dynamic";

// First-login welcome flow (screen group W). The middleware gate routes a paid
// client here until profile_complete; this page is the last line — if the
// profile is already complete it hands off to setup, so a stale link or a
// double navigation never re-runs the flow.
export default async function WelcomePage() {
  const supabase = await createAppSupabaseServerComponentClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const admin = appSupabaseAdmin();
  const { data: membership } = await admin
    .from("org_members")
    .select("org_id")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (!membership) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p>No account is linked to this login yet.</p>
      </div>
    );
  }

  const state = await getOnboardingState(admin, membership.org_id);
  if (state.profile_complete) redirect("/dashboard");

  // Prefill: first name for the greeting (W0), business name for W1. Signup
  // writes both — profiles.first_name and orgs.name — so the first screen a
  // client sees already knows who they are.
  const [{ data: profile }, { data: org }] = await Promise.all([
    admin.from("profiles").select("first_name").eq("id", user.id).maybeSingle(),
    admin.from("orgs").select("name").eq("id", membership.org_id).maybeSingle(),
  ]);

  // Seed business_name from orgs.name when the client hasn't typed one yet.
  if (!state.profile.business_name && org?.name) {
    state.profile = { ...state.profile, business_name: org.name };
  }

  return <WelcomeFlow firstName={profile?.first_name ?? ""} initialState={state} />;
}
