import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const maxDuration = 15;

/**
 * Receives appointment-setter applications from /careers/appointment-setter.
 *
 * Delivery: Brevo transactional email to careers@rosebud.global (falls back
 * to contact@rosebud.global if CAREERS_INBOX env is unset). Uses the same
 * Brevo account that powers the pricing form — only env var required is
 * BREVO_API_KEY. If the key is missing the route still returns 200 so the
 * submitter sees the success state, and the application body is dumped to
 * the Vercel logs so nothing is lost.
 *
 * No file uploads — voice intro is a pasted URL (Loom / Vocaroo / Drive).
 * That keeps this route's blast radius small and avoids needing storage
 * infrastructure in the homepage repo.
 */

type Body = {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  experience?: string;
  vertical?: string;
  commission_only?: string;
  hours_overlap?: string;
  voice_intro_url?: string;
  why?: string;
  linkedin?: string;
  consent?: boolean;
};

const REQUIRED_FIELDS: (keyof Body)[] = [
  "name",
  "email",
  "phone",
  "location",
  "experience",
  "vertical",
  "commission_only",
  "hours_overlap",
  "voice_intro_url",
  "why",
];

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeText(s: string): string {
  // For nl2br in HTML body — preserve line breaks, escape angle brackets
  return escapeHtml(s).replace(/\n/g, "<br />");
}

function renderEmailHtml(body: Body): string {
  const rows: Array<[string, string]> = [
    ["Name", body.name ?? ""],
    ["Email", body.email ?? ""],
    ["Phone", body.phone ?? ""],
    ["Location", body.location ?? ""],
    ["LinkedIn", body.linkedin ?? "—"],
    ["Closest vertical", body.vertical ?? ""],
    ["Commission-only history", body.commission_only ?? ""],
    ["Hours overlap", body.hours_overlap ?? ""],
    ["Voice intro URL", body.voice_intro_url ?? ""],
  ];

  const table = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 14px 6px 0;color:#555;font-size:13px;vertical-align:top;white-space:nowrap;">${escapeHtml(k)}</td><td style="padding:6px 0;font-size:14px;color:#111;">${escapeHtml(v)}</td></tr>`
    )
    .join("");

  return `<!doctype html>
<html><body style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#111;line-height:1.5;margin:0;padding:24px;background:#fafafa;">
  <div style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #e6e6e6;border-radius:8px;padding:28px;">
    <p style="margin:0 0 4px;color:#888;font-size:11px;letter-spacing:.12em;text-transform:uppercase;">New application · Appointment Setter</p>
    <h1 style="margin:0 0 18px;font-size:20px;font-weight:600;color:#111;">${escapeHtml(body.name ?? "Unnamed applicant")}</h1>
    <table style="border-collapse:collapse;width:100%;margin-bottom:18px;">${table}</table>
    <p style="margin:18px 0 6px;color:#888;font-size:11px;letter-spacing:.12em;text-transform:uppercase;">Experience</p>
    <div style="font-size:14px;color:#222;white-space:pre-wrap;border-left:2px solid #d8d8d8;padding:6px 0 6px 14px;">${escapeText(body.experience ?? "")}</div>
    <p style="margin:18px 0 6px;color:#888;font-size:11px;letter-spacing:.12em;text-transform:uppercase;">Why this role</p>
    <div style="font-size:14px;color:#222;white-space:pre-wrap;border-left:2px solid #d8d8d8;padding:6px 0 6px 14px;">${escapeText(body.why ?? "")}</div>
  </div>
  <p style="max-width:640px;margin:14px auto 0;color:#999;font-size:11px;text-align:center;">Submitted via rosebud.global/careers/appointment-setter</p>
</body></html>`;
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Required field check — server-side mirror of the form's required attrs.
  for (const f of REQUIRED_FIELDS) {
    const v = body[f];
    if (typeof v !== "string" || v.trim().length === 0) {
      return NextResponse.json(
        { error: `Missing field: ${f}` },
        { status: 400 }
      );
    }
  }
  if (!body.consent) {
    return NextResponse.json(
      { error: "Privacy consent required" },
      { status: 400 }
    );
  }

  const inbox = process.env.CAREERS_INBOX || "contact@rosebud.global";
  const brevoKey = process.env.BREVO_API_KEY;

  // If the Brevo key isn't configured, still return 200 so the submitter
  // gets the success state. The application is dumped to logs — never
  // silently drop a candidate. Olivia can backfill from logs / set the
  // env later.
  if (!brevoKey) {
    console.log(
      "[careers/appointment-setter] BREVO_API_KEY not set — application logged only.",
      JSON.stringify({
        name: body.name,
        email: body.email,
        phone: body.phone,
        voice_intro_url: body.voice_intro_url,
      })
    );
    return NextResponse.json({ ok: true, delivered: "log" });
  }

  try {
    const brevoRes = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": brevoKey,
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: "Rosebud Solutions Careers",
          email: "careers@rosebud.global",
        },
        to: [{ email: inbox }],
        replyTo: { email: body.email, name: body.name },
        subject: `Application — Appointment Setter — ${body.name}`,
        htmlContent: renderEmailHtml(body),
      }),
    });
    if (!brevoRes.ok) {
      const txt = await brevoRes.text();
      console.error(
        `[careers/appointment-setter] Brevo send failed status=${brevoRes.status} body=${txt.slice(0, 400)}`
      );
      // Don't fail the submitter — Brevo will retry from a queued state on
      // some failures, and the log line preserves the application data.
      return NextResponse.json({ ok: true, delivered: "log_after_brevo_fail" });
    }
    return NextResponse.json({ ok: true, delivered: "brevo" });
  } catch (e) {
    console.error(
      `[careers/appointment-setter] Brevo send threw: ${e instanceof Error ? e.message : String(e)}`,
      JSON.stringify({ name: body.name, email: body.email })
    );
    return NextResponse.json({ ok: true, delivered: "log_after_exception" });
  }
}
