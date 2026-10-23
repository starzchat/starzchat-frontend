import React, { useState } from 'react';
import type { UserPayload } from '../lib/types';
import { initAuth } from '../lib/api';
import { ChatListSidebar } from './ChatListSidebar';
import { ChatDetail } from './ChatDetail';
import { SavedMessagesPanel } from './SavedMessagesPanel';

interface AppViewProps {
  user: UserPayload;
}

export function AppView({ user }: AppViewProps) {
  const [panel, setPanel] = useState<'chats' | 'saved'>('chats');
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    initAuth(null);
    try { localStorage.removeItem('starzchat_token'); } catch { /* ignore */ }
    window.location.reload();
  };

  return (
    <div className="app-view">
      <button className="menu-btn" onClick={() => setMenuOpen(true)} aria-label="Open menu">☰</button>
      <div className={`sidebar-backdrop ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)} />
      <ChatListSidebar
        user={user}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onLogout={logout}
        panel={panel}
        onPanel={setPanel}
      />
      <main className="main-area">
        {panel === 'chats' ? <ChatDetail /> : <SavedMessagesPanel />}
      </main>
    </div>
  );
}
