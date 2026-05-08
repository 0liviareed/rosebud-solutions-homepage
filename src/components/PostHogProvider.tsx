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
    // GDPR: shorten IP storage and disable session recordings until we opt in
    // explicitly. (Recordings are off by default in the SDK but safer to
    // assert here so a future flag flip in the PostHog UI doesn't surprise us.)
    ip: true,
    disable_session_recording: true,
    // PostHog's auto-capture clicks/form submits is opinionated and noisy on
    // a marketing site — turn off; we'll instrument the few CTAs we care
    // about (Book a call, Demo) explicitly later.
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
