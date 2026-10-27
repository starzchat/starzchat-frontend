import React, { useState } from 'react';
import type { UserPayload } from '../lib/types';
import { initAuth } from '../lib/api';
import { HomeFeed } from './HomeFeed';
import { AddAlarm } from './AddAlarm';
import { ChatDetail } from './ChatDetail';
import { SavedMessagesPanel } from './SavedMessagesPanel';

interface AppViewProps {
  user: UserPayload;
}

export function AppView({ user }: AppViewProps) {
  const [tab, setTab] = useState<'home' | 'friends' | 'messages' | 'profile'>('home');
  const [showAlarm, setShowAlarm] = useState(false);
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

      {/* Sidebar (mobile) */}
      <aside className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="user-badge">
            <strong className="username">@{user.username}</strong>
            <span className="student-id">ID: {user.student_id}</span>
          </div>
          <button className="secondary button-sm" onClick={logout}>Log out</button>
        </div>

        <div className="nav-tabs">
          <button
            className={`nav-tab ${tab === 'home' ? 'active' : ''}`}
            onClick={() => { setTab('home'); setMenuOpen(false); }}
          >Home</button>
          <button
            className={`nav-tab ${tab === 'friends' ? 'active' : ''}`}
            onClick={() => { setTab('friends'); setMenuOpen(false); }}
          >Friends</button>
          <button
            className={`nav-tab ${tab === 'messages' ? 'active' : ''}`}
            onClick={() => { setTab('messages'); setMenuOpen(false); }}
          >Messages</button>
          <button
            className={`nav-tab ${tab === 'profile' ? 'active' : ''}`}
            onClick={() => { setTab('profile'); setMenuOpen(false); }}
          >Profile</button>
        </div>

        <div className="chat-list">
          <div className="empty-state">No chats yet.</div>
        </div>
      </aside>

      {/* Main content */}
      <main className="main-area">
        {showAlarm ? (
          <AddAlarm />
        ) : tab === 'home' ? (
          <HomeFeed />
        ) : tab === 'messages' ? (
          <div className="chat-detail-view">
            {panel === 'chats' ? <ChatDetail /> : <SavedMessagesPanel />}
          </div>
        ) : tab === 'friends' ? (
          <div className="friends-view">
            <h2 className="view-title">Friends</h2>
            <div className="empty-state">No friends yet.</div>
          </div>
        ) : (
          <div className="profile-view">
            <h2 className="view-title">Profile</h2>
            <div className="empty-state">Profile coming soon.</div>
          </div>
        )}
      </main>

      {/* Bottom navigation */}
      <nav className="bottom-nav">
        <button
          className={`nav-item ${tab === 'home' ? 'active' : ''}`}
          onClick={() => { setTab('home'); setShowAlarm(false); }}
          aria-label="Home"
        >
          <span className="nav-icon">🏠</span>
          <span className="nav-label">Home</span>
        </button>
        <button
          className={`nav-item ${tab === 'friends' ? 'active' : ''}`}
          onClick={() => { setTab('friends'); setShowAlarm(false); }}
          aria-label="Friends"
        >
          <span className="nav-icon">👥</span>
          <span className="nav-label">Friends</span>
        </button>
        <button
          className="nav-item add-btn"
          onClick={() => { setShowAlarm(true); setTab('home'); }}
          aria-label="Add"
        >
          <span className="nav-icon">+</span>
        </button>
        <button
          className={`nav-item ${tab === 'messages' ? 'active' : ''}`}
          onClick={() => { setTab('messages'); setShowAlarm(false); }}
          aria-label="Messages"
        >
          <span className="nav-icon">💬</span>
          <span className="nav-label">Messages</span>
        </button>
        <button
          className={`nav-item ${tab === 'profile' ? 'active' : ''}`}
          onClick={() => { setTab('profile'); setShowAlarm(false); }}
          aria-label="Profile"
        >
          <span className="nav-icon">👤</span>
          <span className="nav-label">Profile</span>
        </button>
      </nav>
    </div>
  );
}
