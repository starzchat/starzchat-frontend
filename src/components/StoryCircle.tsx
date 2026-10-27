import React from 'react';
import type { Story } from '../lib/types';

interface StoryCircleProps {
  story: Story;
  active?: boolean;
  onClick?: () => void;
}

export function StoryCircle({ story, active = false, onClick }: StoryCircleProps) {
  const avatarUrl = story.avatar_url || '/favicon.svg';
  return (
    <div
      className={`story-circle ${active ? 'active' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') onClick?.(); }}
    >
      <div className="story-ring" />
      <img src={avatarUrl} alt={story.display_name || story.username} className="story-avatar" />
      <div className="story-label">{story.display_name || story.username}</div>
    </div>
  );
}