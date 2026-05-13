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
    posthog.capture('$pageview', { $current_url: url })
  }, [pathname, search])

  return null
}
