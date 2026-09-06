'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './login.module.css';

function LoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    if (!email.trim() || !password) {
      setError('Enter your email and password.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/app/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      if (res.ok) {
        window.location.href = next;
        return;
      }
      // Generic message regardless of cause — never confirm which emails
      // have accounts.
      setError('Invalid email or password.');
      setLoading(false);
    } catch {
      setError('Something went wrong. Try again.');
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <a
        href="https://rosebud.global"
        className={styles.pageLogo}
        aria-label="Rosebud — back to homepage"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/rosebud-brand-orb.png" alt="" width={30} height={30} />
        <span>Rosebud</span>
      </a>

      <div className={styles.formPane}>
        <div className={styles.atmosphere} />
        <form className={styles.card} onSubmit={handleSubmit}>
          <h1 className={styles.title}>
            Welcome <em>back!</em>
          </h1>

          <p className={styles.subtitle}>
            Use Rosebud to turn every enquiry into booked work — automatically.
          </p>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
              autoComplete="email"
              className={styles.input}
              disabled={loading}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className={styles.input}
              disabled={loading}
            />
          </div>

          <div className={styles.errorSlot}>
            {error && <span className={styles.error}>{error}</span>}
          </div>

          <button type="submit" disabled={loading} className={styles.button}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>

          <div className={styles.footer}>
            Don&rsquo;t have an account? <a href="https://rosebud.global/pricing">Sign up</a>
          </div>

          <div className={styles.legal}>
            <a href="https://rosebud.global/terms">Terms of Service</a>
            <a href="https://rosebud.global/privacy">Privacy Policy</a>
          </div>
        </form>
      </div>

      {/* Product showcase — a stylised cut of the Qualify capability view
          with floating qualification outcomes layered over it. Pure CSS,
          no image assets: crisper on retina, always matches the console
          theme tokens, nothing to keep in sync with a design export. */}
      <div className={styles.showcase} aria-hidden="true">
        <div className={styles.showcaseInner}>
          <div className={styles.canvasPanel}>
            <div className={styles.canvasBar}>
              <span className={styles.canvasTitle}>Qualify</span>
              <span className={styles.canvasSub}>Lead scoring &amp; routing</span>
              <span className={styles.periodSeg}>
                <span>Today</span>
                <span className={styles.periodOn}>This week</span>
                <span>This month</span>
              </span>
            </div>

            <div className={styles.canvasBody}>
              <div className={styles.flowNode}>
                <div className={styles.nodeHead}>
                  <span className={styles.nodeIcon}>
                    <svg viewBox="0 0 16 16" width="10" height="10"><path d="M8 2v9M4.5 7.5 8 11l3.5-3.5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <div>
                    <div className={styles.nodeName}>Record Intake</div>
                    <div className={styles.nodeDesc}>Receiving from Capture</div>
                  </div>
                </div>
                <div className={styles.nodeFoot}>75 to check</div>
              </div>

              <div className={styles.flowChipRow}><span className={styles.flowChip}>queued</span></div>

              <div className={`${styles.flowNode} ${styles.nodeAccent}`}>
                <div className={styles.nodeHead}>
                  <span className={`${styles.nodeIcon} ${styles.iconPurple}`}>
                    <svg viewBox="0 0 16 16" width="10" height="10"><path d="M2 4h12M4.5 8h7M7 12h2" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round"/></svg>
                  </span>
                  <div>
                    <div className={styles.nodeName}>Rule Evaluation</div>
                    <div className={styles.nodeDesc}>Scoring against your filters</div>
                  </div>
                </div>
                <div className={styles.ruleChips}>
                  <span>treatment value ≥ £750</span>
                  <span>in your service area</span>
                  <span>available within 3 weeks</span>
                  <span>insurance accepted</span>
                </div>
                <div className={styles.nodeFoot}>64 passed&ensp;·&ensp;84.7% pass rate</div>
              </div>

              <div className={styles.flowChipRow}>
                <span className={`${styles.flowChip} ${styles.chipGreen}`}>passed</span>
                <span className={`${styles.flowChip} ${styles.chipAmber}`}>your call</span>
                <span className={styles.flowChipGhost}>not a fit</span>
              </div>

              <div className={styles.branchRow}>
                <div className={styles.flowNode}>
                  <div className={styles.nodeName}>Booking Route</div>
                  <div className={styles.nodeDesc}>Advancing the record</div>
                  <div className={styles.nodeFoot}>60 routed</div>
                </div>
                <div className={styles.flowNode}>
                  <div className={styles.nodeName}>Priority Route</div>
                  <div className={styles.nodeDesc}>Routing to a named owner</div>
                  <div className={styles.nodeFoot}>3 escalated&ensp;·&ensp;90s to pick up</div>
                </div>
                <div className={styles.flowNode}>
                  <div className={styles.nodeName}>Disposition</div>
                  <div className={styles.nodeDesc}>Dropping · Nurturing · Suppressing</div>
                  <div className={styles.nodeFoot}>11 filtered&ensp;·&ensp;2 came back</div>
                </div>
              </div>

              <div className={styles.flowChipRow}><span className={`${styles.flowChip} ${styles.chipGreen}`}>on track</span></div>

              <div className={styles.flowNode}>
                <div className={styles.nodeHead}>
                  <span className={styles.nodeIcon}>
                    <svg viewBox="0 0 16 16" width="10" height="10"><path d="M8 2l1.8 3.6 4 .6-2.9 2.8.7 4L8 11.1 4.4 13l.7-4L2.2 6.2l4-.6L8 2z" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinejoin="round"/></svg>
                  </span>
                  <div>
                    <div className={styles.nodeName}>Value Assignment</div>
                    <div className={styles.nodeDesc}>Estimated value per qualified lead</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`${styles.floatCard} ${styles.float1}`}>
            <span className={`${styles.floatIcon} ${styles.floatIconGreen}`}>
              <svg viewBox="0 0 16 16" width="14" height="14"><path d="M3 13V8M8 13V3.5M13 13V6" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round"/></svg>
            </span>
            <span>
              <strong>Tier 2 Qualification: Medium Intent</strong>
              <small>Qualified for standard service booking paths.</small>
            </span>
          </div>

          <div className={`${styles.floatCard} ${styles.float2}`}>
            <span className={`${styles.floatIcon} ${styles.floatIconBlue}`}>
              <svg viewBox="0 0 16 16" width="14" height="14"><path d="M12.5 6.5A5 5 0 0 0 3.4 5M3.5 9.5A5 5 0 0 0 12.6 11" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round"/><path d="M3.2 2.2v3h3M12.8 13.8v-3h-3" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
            <span>
              <strong>Qualification: Awaiting Review</strong>
              <small>Potential Tier 3; needs manual review for service fit.</small>
            </span>
          </div>

          <div className={`${styles.floatCard} ${styles.float3}`}>
            <span className={`${styles.floatIcon} ${styles.floatIconPurple}`}>
              <svg viewBox="0 0 16 16" width="14" height="14"><path d="M5 2.5h6v3a3 3 0 0 1-6 0v-3zM5 3H3v1.2A2.3 2.3 0 0 0 5.3 6.5M11 3h2v1.2a2.3 2.3 0 0 1-2.3 2.3M8 8.5v2.5M5.8 13.5h4.4M8 11v2.5" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
            <span>
              <strong>High-Value Prospect: Tier 1</strong>
              <small>Meets all priority service qualification criteria.</small>
            </span>
          </div>

          <div className={styles.skeletonCard}>
            <span className={styles.skeletonBell}>
              <svg viewBox="0 0 16 16" width="13" height="13"><path d="M8 2a4 4 0 0 0-4 4v2.5L2.8 11h10.4L12 8.5V6a4 4 0 0 0-4-4zM6.5 13a1.5 1.5 0 0 0 3 0" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
            <span className={styles.skeletonLines}>
              <span />
              <span />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AppLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
