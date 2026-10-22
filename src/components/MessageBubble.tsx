import React from 'react';
import type { Message } from '../lib/types';

interface MessageBubbleProps {
  message: Message;
  active: boolean;
}

export function MessageBubble({ message, active }: MessageBubbleProps) {
  const isMine = active && message.sender === 'current';
  const isExpired = Date.now() > new Date(message.expires_at).getTime();

  return (
    <div
      className={`message-bubble ${isMine ? 'mine' : ''}`}
      style={{ '--expiry': message.expires_at } as React.CSSProperties}
    >
      <div className="message-header">
        <span className="message-sender">{message.sender}</span>
        {isExpired && <span className="message-expired">EXPIRED</span>}
      </div>
      <div className="message-body">{message.body}</div>
      {message.edited_at && (
        <div className="message-edited">Edited</div>
      )}
    </div>
  );
}
