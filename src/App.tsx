import React, { useEffect, useState } from 'react';
import { api, initAuth } from './lib/api';
import { connectSocket, onSocketConnect } from './lib/socket';
import { AuthView } from './pages/AuthView';
import { AppView } from './pages/AppView';
import { LoadingScreen } from './pages/LoadingScreen';
import type { UserPayload } from './lib/types';

function App() {
  const [user, setUser] = useState<UserPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [minTimePassed, setMinTimePassed] = useState(false);

  // keep the loading screen visible for at least 1.2s so the branding shows
  useEffect(() => {
    const t = setTimeout(() => setMinTimePassed(true), 1200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
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
        initAuth(null);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (user) {
      connectSocket();
      onSocketConnect(() => {});
    }
  }, [user]);

  if (loading || !minTimePassed) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <AuthView onLoggedIn={(u) => setUser(u)} />;
  }

  return <AppView user={user} />;
}

export default App;
