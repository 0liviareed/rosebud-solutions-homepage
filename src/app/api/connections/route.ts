import { NextRequest, NextResponse } from "next/server";
import { appSupabaseAdmin } from "@/lib/appSupabase";
import { requireOrg } from "@/lib/connections/auth";

export const dynamic = "force-dynamic";

export type ConnectionSummary = {
  id: string;
  category: "crm" | "calendar" | "channel";
  provider: string;
  method: string;
  status: "pending" | "active" | "expired" | "broken" | "disconnected";
  external_account_ref: string | null;
  region: string | null;
  health_reason: string | null;
};

// Backs the S2 page's server-rendered fetch and the client-side poll while a
// connection is `pending` (waiting on an OAuth redirect round-trip).
export async function GET(request: NextRequest) {
  const response = NextResponse.json({ ok: true });
  const auth = await requireOrg(request, response);
  if (auth instanceof NextResponse) return auth;

  const admin = appSupabaseAdmin();
  const { data, error } = await admin
    .from("connections")
    .select("id, category, provider, method, status, external_account_ref, region, health_reason")
    .eq("org_id", auth.orgId)
    .order("category", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ connections: (data ?? []) as ConnectionSummary[] }, { headers: response.headers });
}
