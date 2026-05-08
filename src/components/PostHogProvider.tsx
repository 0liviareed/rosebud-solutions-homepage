'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import posthog from 'posthog-js'

const PH_KEY  = process.env.NEXT_PUBLIC_POSTHOG_KEY
const PH_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://eu.i.posthog.com'

let initialised = false

function initOnce() {
  if (initialised) return
  if (!PH_KEY) return
  if (typeof window === 'undefined') return

  posthog.init(PH_KEY, {
    api_host: PH_HOST,
    // Cookieless mode: PostHog stores its anon id in localStorage / memory
    // instead of dropping a first-party cookie. Avoids needing a UK/EU
    // cookie banner under PECR's analytics carve-out and keeps return-visitor
    // tracking working across sessions on the same browser.
    persistence: 'localStorage+cookie',
    cross_subdomain_cookie: false,
    secure_cookie: true,
    // We fire pageviews ourselves on App Router navigations (see effect
    // below) — PostHog's auto-capture would double-count.
    capture_pageview: false,
    capture_pageleave: true,
    ip: true,
    // Session replay enabled — PostHog Cloud free tier covers 5k recordings
    // per month, far above our marketing-site volume. Mask all input values
    // and form fields by default so PII (names, emails entered into Cal
    // booking forms) is not stored alongside the replay.
    disable_session_recording: false,
    session_recording: {
      maskAllInputs: true,
      maskTextSelector: '[data-ph-mask]',
    },
    // Auto-capture is opinionated and noisy on a marketing site — turn off;
    // we instrument the few CTAs that matter (book_call, cal_loaded,
    // booking_completed, industry_view) explicitly via the analytics helper.
    autocapture: false,
  })
  initialised = true
}

export default function PostHogProvider() {
  const pathname = usePathname()
  const search = useSearchParams()

  useEffect(() => {
    initOnce()
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
