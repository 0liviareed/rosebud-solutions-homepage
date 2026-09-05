import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createAppSupabaseMiddlewareClient } from '@/lib/appSupabaseSession';
import { appSupabaseAdmin } from '@/lib/appSupabase';

const ENGINE_HOST = 'engine.rosebud.global';
const APP_HOST = 'app.rosebud.global';

// Hotlink protection — blocks other sites from embedding our images directly
// (bandwidth theft, unauthorized reuse) by checking the Referer on image
// requests. Cannot stop someone saving a copy of an image they can already
// see rendered on the page — no server-side control can. This only stops
// the img src="https://rosebud.global/assets/..." case where another site's
// page loads our file straight from our server.
//
// No-Referer requests are allowed through, not blocked: direct URL access,
// most crawlers/bots (including the ones that fetch og:image for link
// previews — LinkedIn, Slack, etc. — which generally don't send a Referer),
// email clients, and privacy-focused browsers that strip it all look
// identical to "no referer" and there is no way to tell them apart from a
// hotlinker with a stripped referer. This is the standard, accepted
// trade-off for Referer-based hotlink protection.
const HOTLINK_IMAGE_RE = /\.(png|jpe?g|gif|webp|avif|svg)$/i;
const OG_IMAGE_ROUTE_RE = /^\/(opengraph-image|resources\/[^/]+\/opengraph-image)$/;

function isAllowedImageReferer(referer: string): boolean {
  try {
    const { hostname } = new URL(referer);
    if (
      hostname === 'rosebud.global' ||
      hostname === 'www.rosebud.global' ||
      hostname === 'engine.rosebud.global' ||
      hostname === 'app.rosebud.global' ||
      hostname === 'localhost' ||
      hostname === '127.0.0.1'
    ) {
      return true;
    }
    // Vercel preview deployments (branch/PR previews the team uses).
    return hostname.endsWith('.vercel.app');
  } catch {
    // Malformed Referer header — fail open rather than risk a false block.
    return true;
  }
}

export async function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const path = request.nextUrl.pathname;

  // www → apex. On Vercel this 301 happened at the platform layer; on
  // Cloudflare the Worker owns www.rosebud.global as a custom domain and the
  // redirect lives here instead. Path + query preserved, permanent.
  if (host === 'www.rosebud.global') {
    const url = new URL(request.url);
    url.hostname = 'rosebud.global';
    return NextResponse.redirect(url, 301);
  }

  // Hotlink check runs first and short-circuits — cheapest possible check,
  // and image requests never intersect with any of the routing logic below.
  if (
    path !== '/favicon.ico' &&
    HOTLINK_IMAGE_RE.test(path) &&
    !OG_IMAGE_ROUTE_RE.test(path)
  ) {
    const referer = request.headers.get('referer');
    if (referer && !isAllowedImageReferer(referer)) {
      return new NextResponse('Hotlinking not permitted. Visit https://rosebud.global', {
        status: 403,
        headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' },
      });
    }
  }

  // Old rosebud.global/app/* URLs → the real app.rosebud.global subdomain,
  // dropping the /app prefix (migrated 2026-09-02 — SaaS convention, clean
  // separation from marketing-site traffic/SEO). Mirrors the /demo →
  // engine.rosebud.global precedent below. Must run ahead of the APP_HOST
  // block so a stale bookmark/shared link still lands somewhere real.
  if (host === 'rosebud.global' && (path === '/app' || path.startsWith('/app/'))) {
    const url = request.nextUrl.clone();
    url.host = APP_HOST;
    url.protocol = 'https:';
    url.port = '';
    url.pathname = path === '/app' ? '/' : path.slice('/app'.length);
    return NextResponse.redirect(url, 301);
  }

  // Real per-client auth for app.rosebud.global — the authenticated area
  // built on the rosebud-app Supabase project (orgs/profiles/org_members/
  // Auth), separate from the engine.rosebud.global demo gate below. Own
  // subdomain; the underlying pages/routes still live under src/app/app/*
  // in this same Next.js app (no file move) — every page path gets an
  // invisible /app prefix rewrite so the folder structure didn't need to
  // change, only how it's reached.
  if (host === APP_HOST) {
    // An authenticated client console is not an SEO target — same
    // restrictive robots.txt treatment as engine.rosebud.global below.
    if (path === '/robots.txt') {
      return new NextResponse('User-agent: *\nDisallow: /\n', {
        status: 200,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      });
    }

    // API routes for this area live at the top-level /api/* (e.g.
    // /api/connections/*, /api/app/login) — NOT nested under /app/ — so
    // they must pass through unprefixed. Only page paths get rewritten.
    if (
      path.startsWith('/api/') ||
      path.startsWith('/_next/') ||
      path === '/favicon.ico' ||
      path.startsWith('/.well-known/') ||
      /\.(png|jpe?g|svg|gif|webp|ico|woff2?|ttf|otf|css|js|map)$/i.test(path)
    ) {
      return NextResponse.next();
    }

    if (path === '/login') {
      return NextResponse.rewrite(new URL('/app/login', request.url));
    }

    const { supabase, getResponse } = createAppSupabaseMiddlewareClient(request);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      url.searchParams.set('next', path);
      return NextResponse.redirect(url);
    }

    // First-login onboarding gate (welcome flow, screen group W —
    // Rosebud_Engine_Onboarding_Welcome_Build_Doc_v2.md §2). A paid client is
    // held in /welcome until their profile is complete; once complete they can
    // never land back on it. Existing orgs were backfilled to complete in
    // migration 0006, so only orgs created after that hit this. Fails OPEN — a
    // lookup hiccup must never lock a client out of the product, only skip the
    // nudge.
    const onWelcome = path === '/welcome' || path.startsWith('/welcome/');
    try {
      const admin = appSupabaseAdmin();
      const { data: membership } = await admin
        .from('org_members')
        .select('org_id')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true })
        .limit(1)
        .maybeSingle();
      if (membership) {
        const { data: tp } = await admin
          .from('tenant_profile')
          .select('profile_complete')
          .eq('tenant_id', membership.org_id)
          .maybeSingle();
        const complete = tp?.profile_complete === true;
        if (!complete && !onWelcome) {
          const url = request.nextUrl.clone();
          url.pathname = '/welcome';
          return NextResponse.redirect(url);
        }
        if (complete && onWelcome) {
          const url = request.nextUrl.clone();
          url.pathname = '/connections';
          return NextResponse.redirect(url);
        }
      }
    } catch {
      // fall through to the normal rewrite — see fail-open note above.
    }

    const rewritten = NextResponse.rewrite(new URL(`/app${path}`, request.url));
    // NextResponse.rewrite() starts a fresh response — carry forward any
    // refreshed session cookies the Supabase client set on getResponse(),
    // or a silent token refresh mid-session would never reach the browser.
    for (const cookie of getResponse().cookies.getAll()) {
      rewritten.cookies.set(cookie);
    }
    return rewritten;
  }

  // www → apex, 301, site-wide. Canonicalise every www request to the bare
  // domain (path + query preserved) so ranking signals consolidate on one host.
  // Runs first so all downstream logic sees the apex.
  if (host === 'www.rosebud.global') {
    const url = request.nextUrl.clone();
    url.host = 'rosebud.global';
    url.protocol = 'https:';
    url.port = '';
    return NextResponse.redirect(url, 301);
  }

  // Old URL on the apex → redirect to the engine subdomain (matches both
  // /demo and /demo/* so any links already shared keep working).
  if (host === 'rosebud.global' && path.startsWith('/demo')) {
    return NextResponse.redirect('https://engine.rosebud.global/', 301);
  }

  // Launch redirects — literal 301 (next.config `permanent` emits 308). Exact
  // path match, query preserved.
  //   /industries/healthcare → /industries/dental-aesthetic  (slug rename)
  //   /agents/insurance      → /industries/insurance         (GSC 404 fix)
  //   /solutions             → /                              (no capability index)
  //   /about-us, /privacy-policy, /utility-pages/privacy-notice → live pages
  //   (Ahrefs Site Audit, 2026-08-10: 404s with inbound links pointing at the
  //   wrong slug for two of the most-linked pages on the site; the privacy
  //   one carries an external referring domain — equity worth keeping)
  const LAUNCH_301: Record<string, string> = {
    '/industries/healthcare': '/industries/dental-aesthetic',
    '/agents/insurance': '/industries/insurance',
    '/solutions': '/',
    '/about-us': '/about',
    '/privacy-policy': '/privacy',
    '/utility-pages/privacy-notice': '/privacy',
  };
  const dest = LAUNCH_301[path];
  if (dest) {
    const url = request.nextUrl.clone();
    url.pathname = dest;
    return NextResponse.redirect(url, 301);
  }

  // The recruitment industry page has been permanently removed. Return 410 Gone
  // (not 404) so search engines drop it from the index rather than keep retrying.
  // Applies on every host, ahead of the engine gate.
  if (path === '/industries/recruitment' || path.startsWith('/industries/recruitment/')) {
    return new NextResponse(
      '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Gone</title></head><body style="font-family:system-ui,-apple-system,sans-serif;max-width:34rem;margin:16vh auto;padding:0 1.5rem;color:#17131F"><h1 style="font-weight:600;font-size:1.6rem;margin:0 0 .6rem">410 — Gone</h1><p style="color:#57506b;line-height:1.6;margin:0 0 1.4rem">This page has been permanently removed.</p><a href="/" style="color:#6B5CC4;text-decoration:none;font-weight:600">← Back to rosebud.global</a></body></html>',
      { status: 410, headers: { 'Content-Type': 'text/html; charset=utf-8' } },
    );
  }

  // Only gate the engine subdomain. Everything else (rosebud.global, previews,
  // localhost) is unaffected — local dev intentionally bypasses the gate.
  if (host !== ENGINE_HOST) {
    return NextResponse.next();
  }

  // engine.rosebud.global is not an SEO target — serve a restrictive robots
  // here regardless of what public/robots.txt says for the apex.
  if (path === '/robots.txt') {
    return new NextResponse('User-agent: *\nDisallow: /\n', {
      status: 200,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }

  // Allow the login flow, Next.js internals, and Let's Encrypt's HTTP-01
  // challenge through unconditionally. The ACME path matters: Vercel hits
  // /.well-known/acme-challenge/<token> on the host to issue/renew the
  // SSL cert; if the gate redirects that to /login the cert never issues.
  if (
    path === '/login' ||
    path === '/api/login' ||
    path.startsWith('/_next/') ||
    path.startsWith('/static/') ||
    path.startsWith('/.well-known/') ||
    path === '/favicon.ico' ||
    // Static assets from /public — the login page pulls the brand orb and
    // any fonts/icons it references. Without this, those requests get
    // 307'd to /login and the browser renders broken images on the
    // unauthenticated screen.
    /\.(png|jpe?g|svg|gif|webp|ico|woff2?|ttf|otf|css|js|map)$/i.test(path)
  ) {
    return NextResponse.next();
  }

  // Cookie + env var contract mirrors the warroom: wr_auth holds the
  // password, middleware compares it back against DASHBOARD_PASSWORD.
  // Set the same values on both projects and a single password + TOTP
  // works across warroom + engine.
  const expectedPassword = (process.env.DASHBOARD_PASSWORD ?? '').replace(/\s+$/g, '');
  if (!expectedPassword) {
    // Fail-secure: env missing locks everyone out (including the operator)
    // rather than silently letting requests through.
    return new NextResponse('Service temporarily unavailable', { status: 503 });
  }

  const cookie = request.cookies.get('wr_auth')?.value;
  if (cookie !== expectedPassword) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Authed users land on engine.rosebud.global/ — rewrite to the dashboard
  // route internally so the URL bar stays clean.
  if (path === '/') {
    return NextResponse.rewrite(new URL('/demo', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
};
