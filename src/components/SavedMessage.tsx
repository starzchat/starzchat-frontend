import React from 'react';
import type { SavedMessage as SavedMessageType } from '../lib/types';

interface SavedMessageProps {
  message: SavedMessageType;
  onDelete: (id: number) => void;
}

export function SavedMessage({ message, onDelete }: SavedMessageProps) {
  return (
    <div className="saved-message">
      <div className="saved-message-header">
        <span className="message-sender">{message.sender}</span>
        <span className="chat-time">{new Date(message.original_created_at).toLocaleString()}</span>
      </div>
      <div className="saved-message-body">{message.body}</div>
      <div className="saved-message-actions">
        <button className="secondary button-sm" onClick={() => onDelete(message.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
