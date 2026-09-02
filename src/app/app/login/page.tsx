'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './login.module.css';

function LoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/capture';

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
      <div className={styles.atmosphere} />
      <form className={styles.card} onSubmit={handleSubmit}>
        <div className={styles.brand}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/rosebud-brand-orb.png"
            alt="Rosebud Solutions"
            className={styles.brandMark}
            width={32}
            height={32}
          />
          <div>
            <div className={styles.brandText}>Rosebud Solutions</div>
            <div className={styles.brandSub}>Part of Rosebud Global</div>
          </div>
        </div>

        <h1 className={styles.title}>
          Sign in to your <em>console</em>
        </h1>

        <p className={styles.subtitle}>Your operation, running.</p>

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
          Not a client yet? <a href="https://rosebud.global/pricing">See plans and pricing</a>
        </div>
      </form>
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
