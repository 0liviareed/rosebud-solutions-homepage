import { NextRequest, NextResponse } from "next/server";
import { createAppSupabaseRouteClient } from "@/lib/appSupabaseSession";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ ok: true });
  const supabase = createAppSupabaseRouteClient(request, response);
  await supabase.auth.signOut();
  return response;
}
