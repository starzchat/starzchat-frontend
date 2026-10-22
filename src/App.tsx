import React, { useEffect, useState } from 'react';
import { api, initAuth } from './lib/api';
import { connectSocket, onSocketConnect } from './lib/socket';
import { AuthView } from './pages/AuthView';
import { AppView } from './pages/AppView';
import type { UserPayload } from './lib/types';

function App() {
  const [user, setUser] = useState<UserPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore token from storage and boot
    const stored = localStorage.getItem('starzchat_token');
    if (stored) {
      initAuth(stored);
    }

    if (!stored) {
      setLoading(false);
      return;
    }

    api.me()
      .then((u) => setUser(u))
      .catch(() => {
        // token invalid → back to auth
        initAuth(null);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (user) {
      connectSocket();
      onSocketConnect(() => {
        // socket connected, nothing extra needed
      });
    }
  }, [user]);

  if (loading) {
    return <div className="center">Loading…</div>;
  }

  if (!user) {
    return <AuthView onLoggedIn={(u) => setUser(u)} />;
  }

  return <AppView user={user} />;
}

export default App;
