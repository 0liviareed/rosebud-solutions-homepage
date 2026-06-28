'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import posthog from 'posthog-js'
import { readConsent } from '@/lib/consent'

const PH_KEY  = process.env.NEXT_PUBLIC_POSTHOG_KEY
const PH_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://eu.i.posthog.com'

let initialised = false

function hasStatisticsConsent(): boolean {
  const c = readConsent()
  return !!c && c.categories.statistics === true
}

// First-touch UTM capture. The moment a visitor lands with UTMs (e.g. an email
// CTA → /see-it-run), persist them so they survive navigation and attach to a
// later conversion. register_once = first-touch wins (never overwritten by a
// later visit); the localStorage copy is for any non-PostHog use (forms etc.).
function persistFirstTouchUtm() {
  if (typeof window === 'undefined') return
  const p = new URLSearchParams(window.location.search)
  const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const
  const utm: Record<string, string> = {}
  for (const k of keys) { const v = p.get(k); if (v) utm[k] = v }
  if (!utm.utm_source && !utm.utm_campaign) return // no campaign params → nothing to capture

  // first-touch super properties on every subsequent event (ft_ prefix)
  const ft: Record<string, string> = {}
  for (const k of keys) { if (utm[k]) ft[`ft_${k}`] = utm[k] }
  try { posthog.register_once(ft) } catch { /* posthog not ready */ }

  // first-touch localStorage record (set-once)
  try {
    if (!window.localStorage.getItem('rb_ft_utm')) {
      window.localStorage.setItem('rb_ft_utm', JSON.stringify({
        ...utm, landing_path: window.location.pathname, captured_at: new Date().toISOString(),
      }))
    }
  } catch { /* storage blocked */ }
}

function initOnce() {
  if (initialised) return
  if (!PH_KEY) return
  if (typeof window === 'undefined') return
  if (!hasStatisticsConsent()) return

  posthog.init(PH_KEY, {
    api_host: PH_HOST,
    persistence: 'localStorage+cookie',
    cross_subdomain_cookie: false,
    secure_cookie: true,
    capture_pageview: false,
    capture_pageleave: true,
    ip: true,
    disable_session_recording: false,
    session_recording: {
      maskAllInputs: true,
      maskTextSelector: '[data-ph-mask]',
    },
    autocapture: false,
  })
  initialised = true
  persistFirstTouchUtm() // landing UTMs, in case consent was granted after arrival
}

function teardown() {
  if (!initialised) return
  try {
    posthog.opt_out_capturing()
    posthog.reset()
  } catch {
    /* posthog not yet ready — nothing to tear down */
  }
}

export default function PostHogProvider() {
  const pathname = usePathname()
  const search = useSearchParams()

  // Init only when consent is already present; otherwise wait for
  // 'rb:consent-updated' from the banner.
  useEffect(() => {
    initOnce()
    const onConsent = () => {
      if (hasStatisticsConsent()) initOnce()
      else teardown()
    }
    window.addEventListener('rb:consent-updated', onConsent)
    return () => window.removeEventListener('rb:consent-updated', onConsent)
  }, [])

  useEffect(() => {
    if (!initialised) return
    if (!pathname) return
    const qs = search?.toString()
    const url = window.location.origin + pathname + (qs ? `?${qs}` : '')
    persistFirstTouchUtm() // capture first-touch UTMs from the landing URL before the pageview
    posthog.capture('$pageview', { $current_url: url })
  }, [pathname, search])

  return null
}
