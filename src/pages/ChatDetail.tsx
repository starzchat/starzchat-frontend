import React from 'react';
import { ChatItem } from '../components/ChatItem';

interface ChatDetailProps {
  initialChatId?: number;
}

export function ChatDetail({ initialChatId }: ChatDetailProps = {}) {
  return (
    <div className="chat-detail">
      <div className="chat-header">
        <div>
          <h2 className="chat-title">Select a chat to start messaging</h2>
        </div>
        <div className="chat-controls">
          <button className="secondary button-sm">Search</button>
          <button className="secondary button-sm">Settings</button>
        </div>
      </div>

      <div className="messages-area">
        <div className="empty-state">
          Select or start a chat on the left
        </div>
      </div>

      <form className="composer">
        <input
          className="composer-input"
          placeholder="Write a message (auto-deletes after expiry)..."
          aria-label="Message"
        />
        <button className="composer-send">Send</button>
      </form>
    </div>
  );
}
