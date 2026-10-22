import React from 'react';
import { SavedMessage } from '../components/SavedMessage';

interface SavedMessagesPanelProps {
  initialSaved?: unknown[];
}

export function SavedMessagesPanel({ initialSaved }: SavedMessagesPanelProps = {}) {
  return (
    <div className="saved-panel">
      <div className="chat-header">
        <h2 className="chat-title">Saved Messages</h2>
      </div>

      <div className="messages-area">
        <div className="empty-state">
          No saved messages yet.
        </div>
      </div>

      <div className="composer">
        <input
          className="composer-input"
          placeholder="Nothing to write here (saved messages never expire)..."
          aria-label="Saved messages"
        />
        <button className="composer-send disabled">Send</button>
      </div>
    </div>
  );
}
