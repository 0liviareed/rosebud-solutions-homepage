import { NextRequest, NextResponse } from "next/server";
import { appSupabaseAdmin } from "@/lib/appSupabase";
import { createAppSupabaseRouteClient } from "@/lib/appSupabaseSession";

// Shared "who's logged in, which org do they belong to" resolution for the
// connections route handlers — same lookup capture/page.tsx does inline for
// its Server Component, factored out here since every connections route
// needs it. response is the caller's in-progress NextResponse (route
// handlers must build their response before reading cookies, same
// requirement as appSupabaseSession.ts's createAppSupabaseRouteClient).
export async function requireOrg(
  request: NextRequest,
  response: NextResponse
): Promise<{ userId: string; orgId: string } | NextResponse> {
  const supabase = createAppSupabaseRouteClient(request, response);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const admin = appSupabaseAdmin();
  const { data: membership } = await admin
    .from("org_members")
    .select("org_id")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (!membership) return NextResponse.json({ error: "No account linked to this login" }, { status: 403 });

  return { userId: user.id, orgId: membership.org_id as string };
}
