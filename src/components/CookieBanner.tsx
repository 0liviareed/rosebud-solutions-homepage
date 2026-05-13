'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import {
  readConsent,
  writeConsent,
  DEFAULT_CATEGORIES,
  type ConsentCategories,
} from '@/lib/consent'

/**
 * Top-bar banner + "Manage preferences" modal.
 *
 * Layered consent UI:
 *  Layer 1 (banner)  — Reject all / Customise / Accept all, all visible without scroll
 *  Layer 2 (modal)   — per-category toggles (Necessary locked, others default off),
 *                       Reject all / Accept all / Confirm Choices
 *
 * Compliance posture: Reject All sits on layer 1 with equal prominence to
 * Accept All (ICO's primary complaint about non-compliant banners is buried
 * reject). All toggles default to off. Necessary toggle is locked + visibly
 * disabled. No analytics fires until consent.statistics === true.
 *
 * Re-opens via window event 'rb:cookie-settings-open' (dispatched from the
 * footer link in Footer.tsx and from openCookieSettings()).
 */
export default function CookieBanner() {
  const [hydrated, setHydrated] = useState(false)
  const [bannerOpen, setBannerOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [draft, setDraft] = useState<ConsentCategories>(DEFAULT_CATEGORIES)

  useEffect(() => {
    setHydrated(true)
    const current = readConsent()
    if (!current) setBannerOpen(true)
    else setDraft(current.categories)

    const onReopen = () => {
      const c = readConsent()
      setDraft(c?.categories ?? DEFAULT_CATEGORIES)
      setModalOpen(true)
    }
    window.addEventListener('rb:cookie-settings-open', onReopen)
    return () => window.removeEventListener('rb:cookie-settings-open', onReopen)
  }, [])

  const acceptAll = useCallback(() => {
    writeConsent({ functional: true, statistics: true, marketing: true })
    setBannerOpen(false)
    setModalOpen(false)
  }, [])

  const rejectAll = useCallback(() => {
    writeConsent({ functional: false, statistics: false, marketing: false })
    setBannerOpen(false)
    setModalOpen(false)
  }, [])

  const saveChoices = useCallback(() => {
    writeConsent({
      functional: draft.functional,
      statistics: draft.statistics,
      marketing: draft.marketing,
    })
    setBannerOpen(false)
    setModalOpen(false)
  }, [draft])

  if (!hydrated) return null
  if (!bannerOpen && !modalOpen) return null

  return (
    <>
      {bannerOpen && !modalOpen && (
        <div
          className="rb-cookie-bar"
          role="dialog"
          aria-modal="false"
          aria-label="Cookie consent"
        >
          <div className="rb-cookie-bar-inner">
            <span className="rb-cookie-bar-icon" aria-hidden="true">
              <CookieIcon />
            </span>
            <div className="rb-cookie-bar-text">
              <p className="rb-cookie-bar-title">
                We use cookies to improve your experience
              </p>
              <p className="rb-cookie-bar-body">
                This website uses cookies to enhance site navigation, analyse
                usage, and assist in our marketing efforts. You can manage
                your preferences or accept all cookies. See our{' '}
                <Link href="/privacy" className="rb-cookie-link">
                  Privacy Policy
                </Link>{' '}
                for more details.
              </p>
            </div>
            <div className="rb-cookie-bar-actions">
              <button
                type="button"
                className="rb-cookie-link rb-cookie-customise"
                onClick={() => setModalOpen(true)}
              >
                Customise
              </button>
              <button
                type="button"
                className="rb-cookie-btn rb-cookie-btn-secondary"
                onClick={rejectAll}
              >
                Reject all
              </button>
              <button
                type="button"
                className="rb-cookie-btn rb-cookie-btn-primary"
                onClick={acceptAll}
              >
                Accept all
              </button>
            </div>
            <button
              type="button"
              className="rb-cookie-close"
              onClick={rejectAll}
              aria-label="Close — reject non-essential cookies"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {modalOpen && (
        <div
          className="rb-cookie-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="rb-cookie-modal-title"
          onClick={(e) => {
            // Click outside the panel closes back to banner state.
            if (e.target === e.currentTarget) setModalOpen(false)
          }}
        >
          <div className="rb-cookie-modal">
            <button
              type="button"
              className="rb-cookie-close rb-cookie-modal-close"
              onClick={() => setModalOpen(false)}
              aria-label="Close preferences"
            >
              ×
            </button>

            <div className="rb-cookie-modal-head">
              <h2 id="rb-cookie-modal-title" className="rb-cookie-modal-title">
                Manage Cookie preferences
              </h2>
              <p className="rb-cookie-modal-sub">
                We use cookies to enhance site navigation, analyse usage, and
                assist in our marketing efforts. See our{' '}
                <Link href="/privacy" className="rb-cookie-link">
                  Cookie Policy
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="rb-cookie-link">
                  Privacy Policy
                </Link>{' '}
                for more details.
              </p>
            </div>

            <ul className="rb-cookie-categories">
              <CategoryRow
                title="Strictly necessary cookies"
                body="These cookies are essential for the website to function and cannot be switched off in our systems."
                locked
                value={true}
                onChange={() => {}}
              />
              <CategoryRow
                title="Functional cookies"
                body="Enable enhanced functionality and personalisation, such as remembering your preferences and our Cal.com booking embed."
                value={draft.functional}
                onChange={(v) => setDraft((d) => ({ ...d, functional: v }))}
              />
              <CategoryRow
                title="Analytics cookies"
                body="Help us understand how visitors interact with the website by collecting and reporting information anonymously (PostHog)."
                value={draft.statistics}
                onChange={(v) => setDraft((d) => ({ ...d, statistics: v }))}
              />
              <CategoryRow
                title="Advertising cookies"
                body="Used to deliver advertisements more relevant to you and your interests. Currently unused; reserved for future campaigns."
                value={draft.marketing}
                onChange={(v) => setDraft((d) => ({ ...d, marketing: v }))}
              />
            </ul>

            <div className="rb-cookie-modal-actions">
              <button
                type="button"
                className="rb-cookie-btn rb-cookie-btn-secondary"
                onClick={rejectAll}
              >
                Reject all
              </button>
              <button
                type="button"
                className="rb-cookie-btn rb-cookie-btn-secondary"
                onClick={acceptAll}
              >
                Accept all
              </button>
              <button
                type="button"
                className="rb-cookie-btn rb-cookie-btn-primary"
                onClick={saveChoices}
              >
                Confirm choices
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function CategoryRow({
  title,
  body,
  value,
  locked,
  onChange,
}: {
  title: string
  body: string
  value: boolean
  locked?: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <li className="rb-cookie-cat">
      <div className="rb-cookie-cat-text">
        <p className="rb-cookie-cat-title">{title}</p>
        <p className="rb-cookie-cat-body">{body}</p>
      </div>
      {locked ? (
        <span className="rb-cookie-locked" aria-label="Always on">
          <LockIcon />
        </span>
      ) : (
        <button
          type="button"
          role="switch"
          aria-checked={value}
          aria-label={title}
          className={`rb-cookie-toggle ${value ? 'is-on' : ''}`}
          onClick={() => onChange(!value)}
        >
          <span className="rb-cookie-toggle-knob" />
        </button>
      )}
    </li>
  )
}

function CookieIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21.6 12.7a4.2 4.2 0 0 1-4.3-4.2A3.5 3.5 0 0 1 13.8 5a8.5 8.5 0 1 0 7.8 7.7Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="11" r="1" fill="currentColor" />
      <circle cx="13" cy="15" r="1" fill="currentColor" />
      <circle cx="16" cy="11" r="1" fill="currentColor" />
      <circle cx="8.5" cy="15.5" r="0.8" fill="currentColor" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
