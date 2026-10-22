import React from 'react';
import { UserPayload } from '../lib/types';
import { ChatItem } from '../components/ChatItem';

interface ChatListSidebarProps {
  user: UserPayload;
  open?: boolean;
  onClose?: () => void;
}

export function ChatListSidebar({ user, open, onClose }: ChatListSidebarProps) {
  return (
    <aside className={`sidebar ${open ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="user-badge">
          <strong className="username">@{user.username}</strong>
          <span className="student-id">ID: {user.student_id}</span>
        </div>
        <button className="secondary button-sm" onClick={onClose}>
          Log out
        </button>
      </div>

      <div className="sidebar-actions">
        <div className="action-row">
          <input
            className="search-input"
            placeholder="Start 1:1 by Student ID..."
            aria-label="Start 1:1 by Student ID"
          />
          <button className="secondary button-sm">Chat</button>
        </div>
        <div className="action-row">
          <input
            className="search-input"
            placeholder="Group name..."
            aria-label="Group name"
          />
          <input
            className="search-input"
            placeholder="IDs (S101,S102)"
            aria-label="Group members"
          />
          <button className="secondary button-sm">+ Group</button>
        </div>
      </div>

      <div className="nav-tabs">
        <button className="active nav-tab">Chats</button>
        <button className="nav-tab">Saved</button>
      </div>

      <div className="chat-list">
        <div className="empty-state">No chats yet.</div>
      </div>
    </aside>
  );
}
