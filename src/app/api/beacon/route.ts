import { NextRequest, NextResponse } from 'next/server'
import { parseUA } from '@/lib/site-analytics/ua'
import { classifyChannel } from '@/lib/site-analytics/channel'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

type BeaconBody = {
  visitor_id?: string
  session_id?: string
  url?: string
  referrer?: string | null
  page_title?: string | null
  language?: string | null
  screen_w?: number | null
  screen_h?: number | null
  // engagement_time_msec is sent on the last beacon for a pageview
  // (visibilitychange / pagehide), not on the initial page_view ping.
  engagement_time_msec?: number | null
}

const ALLOW_ORIGIN = 'https://rosebud.global'

function corsHeaders(origin: string | null): HeadersInit {
  // Only allow our own origin; we don't want random sites pinging this and
  // poisoning the dataset. www.rosebud.global is the alias.
  const ok = origin && (origin === ALLOW_ORIGIN || origin === 'https://www.rosebud.global')
  return {
    'Access-Control-Allow-Origin': ok ? origin! : ALLOW_ORIGIN,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  }
}

export function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(req.headers.get('origin')) })
}

function parseUtm(rawUrl: string | undefined): {
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  utm_content: string | null
  utm_term: string | null
  hostname: string | null
  path: string | null
  full_url: string | null
} {
  if (!rawUrl) return {
    utm_source: null, utm_medium: null, utm_campaign: null, utm_content: null, utm_term: null,
    hostname: null, path: null, full_url: null,
  }
  try {
    const u = new URL(rawUrl)
    return {
      utm_source:   u.searchParams.get('utm_source'),
      utm_medium:   u.searchParams.get('utm_medium'),
      utm_campaign: u.searchParams.get('utm_campaign'),
      utm_content:  u.searchParams.get('utm_content'),
      utm_term:     u.searchParams.get('utm_term'),
      hostname:     u.hostname,
      path:         u.pathname,
      full_url:     u.toString(),
    }
  } catch {
    return {
      utm_source: null, utm_medium: null, utm_campaign: null, utm_content: null, utm_term: null,
      hostname: null, path: null, full_url: rawUrl,
    }
  }
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin')
  const headers = corsHeaders(origin)

  let body: BeaconBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400, headers })
  }

  if (!body.visitor_id || !body.session_id || !body.url) {
    return NextResponse.json({ ok: false, error: 'missing_fields' }, { status: 400, headers })
  }

  const SUPABASE_URL = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    // Hard 500 — something is misconfigured. The client doesn't retry on 5xx
    // so we don't trap users in a beacon loop, but logs surface the bug fast.
    return NextResponse.json({ ok: false, error: 'server_misconfigured' }, { status: 500, headers })
  }

  const ua = req.headers.get('user-agent')
  const uaInfo = parseUA(ua)

  // Vercel edge passes geo as headers automatically. No GeoIP service needed.
  const country = req.headers.get('x-vercel-ip-country')
  const region  = req.headers.get('x-vercel-ip-country-region')
  const city    = (() => {
    const c = req.headers.get('x-vercel-ip-city')
    try { return c ? decodeURIComponent(c) : null } catch { return c }
  })()

  const utm = parseUtm(body.url)
  const channel_group = classifyChannel({
    referrer: body.referrer ?? null,
    utm_source: utm.utm_source,
    utm_medium: utm.utm_medium,
    utm_campaign: utm.utm_campaign,
  })

  const row = {
    visitor_id: body.visitor_id,
    session_id: body.session_id,
    hostname: utm.hostname,
    path: utm.path,
    full_url: utm.full_url,
    referrer: body.referrer ?? null,
    page_title: body.page_title ?? null,
    utm_source: utm.utm_source,
    utm_medium: utm.utm_medium,
    utm_campaign: utm.utm_campaign,
    utm_content: utm.utm_content,
    utm_term: utm.utm_term,
    country,
    region,
    city,
    device_category: uaInfo.device_category,
    browser: uaInfo.browser,
    browser_version: uaInfo.browser_version,
    os: uaInfo.os,
    os_version: uaInfo.os_version,
    language: body.language ?? req.headers.get('accept-language')?.split(',')[0] ?? null,
    screen_w: body.screen_w ?? null,
    screen_h: body.screen_h ?? null,
    engagement_time_msec: body.engagement_time_msec ?? 0,
    channel_group,
    is_bot: uaInfo.is_bot,
  }

  const res = await fetch(`${SUPABASE_URL}/rest/v1/site_events`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal',
    },
    body: JSON.stringify(row),
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    console.error('beacon insert failed', res.status, detail.slice(0, 200))
    return NextResponse.json({ ok: false, error: 'insert_failed' }, { status: 502, headers })
  }

  return NextResponse.json({ ok: true }, { status: 200, headers })
}
