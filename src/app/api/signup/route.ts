import { NextResponse } from "next/server";
import { appSupabaseAdmin } from "@/lib/appSupabase";

export const dynamic = "force-dynamic";

// Create account: Supabase Auth user + org + owner membership + profile, in one
// pass. Auto-confirmed (payment verifies the person; no email-verification gate).
// Idempotent-ish: an existing email is rejected so the UI can say "sign in instead"
// (brief §5.1). Marks the checkout_lead converted so it exits the lead pipeline.

type Body = {
  email?: string; password?: string; first_name?: string; last_name?: string;
  phone?: string; company?: string; country?: string; marketing_optin?: boolean;
};
const clean = (v: unknown) => { const s = typeof v === "string" ? v.trim() : ""; return s.length ? s : null; };

export async function POST(request: Request) {
  let body: Body;
  try { body = (await request.json()) as Body; } catch { return NextResponse.json({ error: "Invalid request" }, { status: 400 }); }

  const email = clean(body.email)?.toLowerCase();
  const password = clean(body.password);
  const company = clean(body.company);
  if (!email) return NextResponse.json({ error: "We need a work email." }, { status: 400 });
  if (!password || password.length < 10) return NextResponse.json({ error: "A little longer — 10 characters minimum." }, { status: 400 });
  if (!company) return NextResponse.json({ error: "We need a company name." }, { status: 400 });

  const sb = appSupabaseAdmin();

  // 1. Create the auth user (auto-confirmed).
  const { data: created, error: authErr } = await sb.auth.admin.createUser({
    email, password, email_confirm: true,
    user_metadata: { first_name: clean(body.first_name), last_name: clean(body.last_name) },
  });
  if (authErr || !created?.user) {
    const dup = /already|exists|registered/i.test(authErr?.message ?? "");
    return NextResponse.json(
      { error: dup ? "That email already has an account — sign in instead." : "Couldn't create the account — please retry.", code: dup ? "exists" : "error" },
      { status: dup ? 409 : 500 }
    );
  }
  const userId = created.user.id;

  // 2. Org + profile + owner membership. On any failure, roll back the auth user
  //    so a retry with the same email isn't blocked.
  try {
    const { data: org, error: orgErr } = await sb.from("orgs")
      .insert({ name: company, country: clean(body.country) }).select("id").single();
    if (orgErr || !org) throw new Error(orgErr?.message ?? "org insert failed");

    const { error: profErr } = await sb.from("profiles").insert({
      id: userId, email, first_name: clean(body.first_name), last_name: clean(body.last_name), phone: clean(body.phone),
    });
    if (profErr) throw new Error(profErr.message);

    const { error: memErr } = await sb.from("org_members").insert({ org_id: org.id, user_id: userId, role: "owner" });
    if (memErr) throw new Error(memErr.message);

    // Mark the abandoned-checkout lead converted (best-effort).
    await sb.from("checkout_leads").update({ converted_org_id: org.id, stage_reached: "converted", updated_at: new Date().toISOString() }).eq("email", email);

    return NextResponse.json({ ok: true, user_id: userId, org_id: org.id });
  } catch (err) {
    await sb.auth.admin.deleteUser(userId).catch(() => {});
    console.error("signup rollback:", err instanceof Error ? err.message : String(err));
    return NextResponse.json({ error: "Couldn't finish setting up your account — please retry." }, { status: 500 });
  }
}
