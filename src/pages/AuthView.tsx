import React, { useState } from 'react';
import { api, initAuth } from '../lib/api';
import type { UserPayload } from '../lib/types';

interface AuthViewProps {
  onLoggedIn: (user: UserPayload) => void;
}

export function AuthView({ onLoggedIn }: AuthViewProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [studentId, setStudentId] = useState('');
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const switchMode = (m: 'login' | 'register') => {
    setMode(m);
    setError('');
    setStudentId('');
    setDisplayName('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = mode === 'login'
        ? await api.login({ username, password })
        : await api.register({
            student_id: studentId.toUpperCase().replace(/[^A-Z0-9-]/g, ''),
            username: username.toLowerCase().replace(/[^a-z0-9_]/g, ''),
            password,
            display_name: displayName.trim() || undefined,
          });
      initAuth(res.token);
      onLoggedIn(res.user);
    } catch (err: unknown) {
      setError((err as Error & { body?: unknown }).message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-brand">
          <div className="auth-logo">★</div>
          <h1 className="auth-title">StarzChat</h1>
          <p className="auth-sub">Student self-deleting real-time messenger</p>
        </div>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
            onClick={() => switchMode('login')}
          >
            Log In
          </button>
          <button
            className={`auth-tab ${mode === 'register' ? 'active' : ''}`}
            onClick={() => switchMode('register')}
          >
            Register
          </button>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          {mode === 'register' && (
            <div className="field">
              <label htmlFor="student-id">Student ID</label>
              <input
                id="student-id"
                placeholder="e.g. S1001"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                autoComplete="off"
              />
            </div>
          )}

          <div className="field">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              placeholder="e.g. alice"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
            />
          </div>

          {mode === 'register' && (
            <div className="field">
              <label htmlFor="display-name">Display Name (optional)</label>
              <input
                id="display-name"
                placeholder="e.g. Alice Johnson"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                autoComplete="off"
              />
            </div>
          )}

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
          </div>

          <button type="submit" className="btn-primary" disabled={submitting}>
            {submitting ? 'Please wait…' : mode === 'login' ? 'Log In' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
}
