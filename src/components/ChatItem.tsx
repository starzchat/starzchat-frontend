import React from 'react';
import type { ChatListItem } from '../lib/types';

interface ChatItemProps {
  chat: ChatListItem;
  active: boolean;
  onClick: () => void;
}

export function ChatItem({ chat, active, onClick }: ChatItemProps) {
  return (
    <div
      className={`chat-item ${active ? 'active' : ''}`}
      onClick={onClick}
    >
      <div className="chat-info">
        <div className="chat-name">{chat.name}</div>
        {chat.last_message && (
          <div className="chat-last-message">{chat.last_message.body}</div>
        )}
      </div>
      <div className="chat-meta">
        {chat.unread_count > 0 && <span className="unread-badge">{chat.unread_count}</span>}
        <span className="chat-time">{new Date(chat.last_message?.created_at || '').toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
    </div>
  );
}
