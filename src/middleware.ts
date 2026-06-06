import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ENGINE_HOST = 'engine.rosebud.global';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const path = request.nextUrl.pathname;

  // Old URL on the apex → redirect to the engine subdomain (matches both
  // /demo and /demo/* so any links already shared keep working).
  if ((host === 'rosebud.global' || host === 'www.rosebud.global') && path.startsWith('/demo')) {
    return NextResponse.redirect('https://engine.rosebud.global/', 301);
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
    path === '/favicon.ico'
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
