import React, { useState, useRef, useEffect } from 'react';
import { MessageBubble } from './MessageBubble';
import type { Message } from '../lib/types';

interface MessageInputProps {
  activeChatId: number | null;
  messages: Message[];
  active: boolean;
  onSend: (body: string) => void;
}

export function MessageInput({ activeChatId, messages, active, onSend }: MessageInputProps) {
  const [draft, setDraft] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [draft]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text || !activeChatId) return;
    onSend(text);
    setDraft('');
  };

  return (
    <form className="composer" onSubmit={handleSubmit}>
      <textarea
        ref={textareaRef}
        className="composer-input"
        placeholder="Write a message (auto-deletes after expiry)..."
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        rows={1}
        aria-label="Message"
      />
      <button type="submit" className="composer-send" disabled={!draft.trim() || !activeChatId}>
        Send
      </button>
    </form>
  );
}
