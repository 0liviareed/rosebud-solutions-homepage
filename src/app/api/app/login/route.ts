import { NextRequest, NextResponse } from "next/server";
import { checkBotId } from "@/lib/botid-shim";
import { createAppSupabaseRouteClient } from "@/lib/appSupabaseSession";

export const dynamic = "force-dynamic";

type Body = { email?: string; password?: string };
const clean = (v: unknown) => {
  const s = typeof v === "string" ? v.trim() : "";
  return s.length ? s : null;
};

export async function POST(request: NextRequest) {
  const bot = await checkBotId();
  if (bot.isBot) return NextResponse.json({ error: "Request blocked." }, { status: 403 });

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const email = clean(body.email)?.toLowerCase();
  const password = clean(body.password);
  if (!email || !password) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  const supabase = createAppSupabaseRouteClient(request, response);
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    // Generic message regardless of cause — never confirm which emails have
    // accounts (matches the client's own copy).
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  return response;
}
