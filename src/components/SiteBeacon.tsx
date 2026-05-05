'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

const VISITOR_KEY = 'rb_visitor_id'
const SESSION_KEY = 'rb_session_id'
const SESSION_TS_KEY = 'rb_session_ts'
const SESSION_IDLE_MS = 30 * 60 * 1000  // 30 min — matches GA4
const BEACON_URL = '/api/beacon'

function uuid(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  // Fallback for older browsers — ID quality matters less than uniqueness.
  return Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
}

function getVisitorId(): string {
  try {
    let v = localStorage.getItem(VISITOR_KEY)
    if (!v) {
      v = uuid()
      localStorage.setItem(VISITOR_KEY, v)
    }
    return v
  } catch {
    return uuid() // private mode / blocked storage — accept that we won't see returners
  }
}

function getSessionId(): string {
  try {
    const now = Date.now()
    const last = Number(sessionStorage.getItem(SESSION_TS_KEY) ?? 0)
    let id = sessionStorage.getItem(SESSION_KEY)
    if (!id || (now - last) > SESSION_IDLE_MS) {
      id = uuid()
      sessionStorage.setItem(SESSION_KEY, id)
    }
    sessionStorage.setItem(SESSION_TS_KEY, String(now))
    return id
  } catch {
    return uuid()
  }
}

type PageViewBody = {
  visitor_id: string
  session_id: string
  url: string
  referrer: string | null
  page_title: string | null
  language: string | null
  screen_w: number | null
  screen_h: number | null
  engagement_time_msec?: number
}

function send(body: PageViewBody, opts: { keepalive?: boolean } = {}) {
  // sendBeacon is preferable for unload handlers (browser guarantees delivery
  // even mid-navigation), but it doesn't let us set a Content-Type explicitly.
  // Supabase's REST inserts don't care; our /api/beacon route does. So we use
  // fetch with keepalive when we need it to survive page transitions.
  if (opts.keepalive && typeof navigator !== 'undefined' && navigator.sendBeacon) {
    const blob = new Blob([JSON.stringify(body)], { type: 'application/json' })
    navigator.sendBeacon(BEACON_URL, blob)
    return
  }
  fetch(BEACON_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    keepalive: !!opts.keepalive,
  }).catch(() => {})
}

export default function SiteBeacon() {
  const pathname = usePathname()
  const search = useSearchParams()

  // Tracks the time the current pageview was first rendered so the
  // visibilitychange / pagehide beacon can report engagement_time_msec.
  const pageStart = useRef<number>(Date.now())
  const accruedMsec = useRef<number>(0)
  const lastFocus = useRef<number>(Date.now())
  const visitorId = useRef<string | null>(null)
  const sessionId = useRef<string | null>(null)

  // Initial page_view + every route change.
  useEffect(() => {
    if (!pathname) return
    if (typeof window === 'undefined') return

    visitorId.current = getVisitorId()
    sessionId.current = getSessionId()

    // Reset engagement counter for the new page.
    pageStart.current = Date.now()
    accruedMsec.current = 0
    lastFocus.current = Date.now()

    const qs = search?.toString()
    const url = window.location.origin + pathname + (qs ? `?${qs}` : '')

    send({
      visitor_id: visitorId.current,
      session_id: sessionId.current,
      url,
      referrer: document.referrer || null,
      page_title: document.title || null,
      language: navigator.language || null,
      screen_w: window.screen?.width ?? null,
      screen_h: window.screen?.height ?? null,
    })
  }, [pathname, search])

  // Engagement time tracking — accrue while tab is visible, send on pagehide.
  useEffect(() => {
    if (typeof window === 'undefined') return

    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        lastFocus.current = Date.now()
      } else {
        accruedMsec.current += Date.now() - lastFocus.current
      }
    }

    const flush = () => {
      // Final tally — include any time since last visibility change.
      if (document.visibilityState === 'visible') {
        accruedMsec.current += Date.now() - lastFocus.current
        lastFocus.current = Date.now()
      }
      const msec = Math.round(accruedMsec.current)
      if (msec <= 0) return
      if (!visitorId.current || !sessionId.current) return
      const qs = search?.toString()
      const url = window.location.origin + (pathname ?? '/') + (qs ? `?${qs}` : '')
      send({
        visitor_id: visitorId.current,
        session_id: sessionId.current,
        url,
        referrer: document.referrer || null,
        page_title: document.title || null,
        language: navigator.language || null,
        screen_w: window.screen?.width ?? null,
        screen_h: window.screen?.height ?? null,
        engagement_time_msec: msec,
      }, { keepalive: true })
      // Reset so a subsequent flush in the same pageview doesn't double-count.
      accruedMsec.current = 0
    }

    document.addEventListener('visibilitychange', onVisibilityChange)
    window.addEventListener('pagehide', flush)
    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange)
      window.removeEventListener('pagehide', flush)
    }
  }, [pathname, search])

  return null
}
