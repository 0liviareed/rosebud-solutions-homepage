import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

// Real per-user session clients for the /app/* authenticated area, using the
// rosebud-app Supabase project's Auth (same one signup/route.ts already
// creates users against). Naming mirrors appSupabaseAdmin() in appSupabase.ts
// — that one is the service-role client for reads/writes; these are the
// anon-key, cookie-scoped clients used purely to establish who's logged in.

function env() {
  const url = process.env.NEXT_PUBLIC_APP_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_APP_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error(
      "rosebud-app Supabase env missing (NEXT_PUBLIC_APP_SUPABASE_URL / NEXT_PUBLIC_APP_SUPABASE_ANON_KEY)"
    );
  }
  return { url, anonKey };
}

// Middleware — reads the incoming request's cookies, and on session refresh
// rebuilds the response so refreshed cookies propagate both downstream (to
// the Server Component that runs next) and back to the browser.
export function createAppSupabaseMiddlewareClient(request: NextRequest) {
  const { url, anonKey } = env();
  let response = NextResponse.next({ request });

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  return {
    supabase,
    getResponse: () => response,
  };
}

// Route Handlers (login/logout) — caller builds the response they intend to
// return first, passes it in; setAll writes cookies onto that same object.
export function createAppSupabaseRouteClient(request: NextRequest, response: NextResponse) {
  const { url, anonKey } = env();
  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });
}

// Server Components — reads cookies via next/headers. Can't write cookies
// from a Server Component render, so setAll is a no-op; the middleware above
// is solely responsible for persisting/refreshing the session.
export async function createAppSupabaseServerComponentClient() {
  const { url, anonKey } = env();
  const cookieStore = await cookies();
  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll() {
        // no-op — see comment above
      },
    },
  });
}
