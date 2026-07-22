import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Server-only admin client for the rosebud-app project (accounts, billing,
// checkout_leads). Uses the service-role/secret key — bypasses RLS. NEVER import
// this from client code. Env vars are runtime-injected on Vercel (they're
// sensitive, so they don't appear in `vercel env pull`, but they're present at
// runtime).
export function appSupabaseAdmin(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_APP_SUPABASE_URL;
  const key = process.env.APP_SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("rosebud-app Supabase env missing (NEXT_PUBLIC_APP_SUPABASE_URL / APP_SUPABASE_SERVICE_ROLE_KEY)");
  return createClient(url, key, { auth: { persistSession: false } });
}
