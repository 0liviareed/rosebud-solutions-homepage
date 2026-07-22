import { NextResponse } from "next/server";
import { sendWelcomeOnboarding } from "@/lib/email";

export const dynamic = "force-dynamic";

// TEMPORARY diagnostic — calls the REAL welcome-email function and returns its
// result (id on success, Resend error on failure) so we can see why purchase
// emails aren't arriving. Guarded by an obscure token; delete once resolved.
const DIAG = "rb_diag_7Qm2xZ9pLtVc";

export async function GET(request: Request) {
  const url = new URL(request.url);
  if (url.searchParams.get("t") !== DIAG) return NextResponse.json({ error: "not found" }, { status: 404 });
  const to = url.searchParams.get("to") || "delivered@resend.dev";

  const res = await sendWelcomeOnboarding({
    email: to,
    firstName: "Olivia",
    planName: "Scale",
    bookingUrl: "https://rosebud.global/onboarding/diagnostic-token",
  });
  return NextResponse.json({ sentTo: to, ...res });
}
