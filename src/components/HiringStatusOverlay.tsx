'use client'

import { useEffect, useState } from 'react'

/**
 * Full-screen "we're not actively hiring" notice that lands on the
 * appointment-setter role overview. Dismissed via the close button
 * (top-right of the card); dismissal persists for the session only,
 * so a fresh visit re-shows the message.
 */
const STORAGE_KEY = 'rb_hiring_overlay_dismissed_v1'

export default function HiringStatusOverlay() {
  const [hydrated, setHydrated] = useState(false)
  const [open, setOpen] = useState(true)

  useEffect(() => {
    setHydrated(true)
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === '1') setOpen(false)
    } catch {
      // sessionStorage unavailable (private mode, etc.) — fine, overlay just stays open
    }
  }, [])

  // Lock body scroll while the overlay is visible.
  useEffect(() => {
    if (!hydrated || !open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [hydrated, open])

  // Close on Esc.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') dismiss() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const dismiss = () => {
    setOpen(false)
    try { sessionStorage.setItem(STORAGE_KEY, '1') } catch { /* ignore */ }
  }

  if (!hydrated || !open) return null

  return (
    <div
      className="rb-hiring-overlay-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="rb-hiring-overlay-title"
    >
      <div className="rb-hiring-overlay-card">
        <button
          type="button"
          className="rb-hiring-overlay-close"
          aria-label="Close"
          onClick={dismiss}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>

        <h2 id="rb-hiring-overlay-title" className="rb-hiring-overlay-title">
          We&rsquo;re not actively hiring right now &mdash; but we&rsquo;d still like to hear from you.
        </h2>

        <p className="rb-hiring-overlay-body">
          We don&rsquo;t have any open positions at the moment. However, we review candidates on a rolling basis, so when this role reopens, we want strong applicants ready to go.
        </p>
        <p className="rb-hiring-overlay-body">
          If you&rsquo;d like to be considered when hiring resumes, submit your details using the form below. We&rsquo;ll keep your application on file and reach out directly once the role is live.
        </p>
      </div>
    </div>
  )
}
