import { NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

// TEMPORARY diagnostic — reveals the real Resend send result (domain-not-verified,
// bad key, etc.) so we can fix the confirmation-email pipeline. Guarded by an
// obscure token; delete this route once the email is working.
const DIAG = "rb_diag_7Qm2xZ9pLtVc";

export async function GET(request: Request) {
  const url = new URL(request.url);
  if (url.searchParams.get("t") !== DIAG) return NextResponse.json({ error: "not found" }, { status: 404 });

  const key = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM ?? "Rosebud Solutions <hello@rosebud.global>";
  const to = url.searchParams.get("to") || "delivered@resend.dev"; // Resend's always-accepts test inbox
  if (!key) return NextResponse.json({ ok: false, reason: "RESEND_API_KEY missing", from });

  try {
    const resend = new Resend(key);
    const r = await resend.emails.send({ from, to, subject: "Rosebud email pipeline test", html: "<p>If you can read this, Resend sends are working.</p>" });
    return NextResponse.json({ ok: !r.error, from, to, id: r.data?.id ?? null, error: r.error ?? null });
  } catch (e) {
    return NextResponse.json({ ok: false, from, to, error: e instanceof Error ? e.message : String(e) });
  }
}
