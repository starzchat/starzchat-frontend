import React, { useState } from 'react';
import { StoryCircle } from '../components/StoryCircle';
import { PostCard } from '../components/PostCard';
import type { Story, Post } from '../lib/types';

const STORIES: Story[] = [
  { id: 'add', user_id: 0, username: 'add', display_name: 'Add Story', avatar_url: null, created_at: new Date().toISOString(), expired: false },
  { id: 'yours', user_id: 1, username: 'you', display_name: 'Your Story', avatar_url: null, created_at: new Date().toISOString(), expired: false },
  { id: 'david', user_id: 2, username: 'david', display_name: 'David', avatar_url: null, created_at: new Date().toISOString(), expired: false },
  { id: 'jessica', user_id: 3, username: 'jessica', display_name: 'Jessica', avatar_url: null, created_at: new Date().toISOString(), expired: false },
  { id: 'emmanuel', user_id: 4, username: 'emmanuel', display_name: 'Emmanuel', avatar_url: null, created_at: new Date().toISOString(), expired: false },
];

const POSTS: Post[] = [
  {
    id: 1,
    user_id: 10,
    username: 'augustus',
    display_name: 'Augustus Nyumah',
    avatar_url: null,
    content: 'Big dreams, consistent actions, and the right people around you can change your future. Keep going! 💪',
    image_url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80',
    location: 'Monrovia, Liberia',
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    like_count: 24,
    comment_count: 5,
    is_liked: false,
  },
  {
    id: 2,
    user_id: 11,
    username: 'lonercj',
    display_name: 'Loner CJ',
    avatar_url: null,
    content: 'Great content creates great opportunities. Let\'s grow together! #DigitalMarketing #Liberia #CustomerFirst',
    image_url: null,
    location: 'Monrovia, Liberia',
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    like_count: 12,
    comment_count: 3,
    is_liked: false,
  },
];

export function HomeFeed() {
  const [liked, setLiked] = useState<Set<number>>(new Set());

  const handleLike = (id: number) => {
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  return (
    <div className="home-feed">
      {/* Top bar */}
      <header className="home-header">
        <h1 className="home-title">Dashboard</h1>
        <div className="home-search">
          <input
            type="text"
            placeholder="Search people, posts, or topics..."
            className="search-input"
            aria-label="Search people, posts, or topics"
          />
        </div>
        <div className="home-actions">
          <button className="icon-btn" aria-label="Notifications">🔔</button>
          <button className="icon-btn avatar-btn" aria-label="Profile">👤</button>
        </div>
      </header>

      {/* Quick action tabs */}
      <div className="quick-tabs">
        <button className="quick-tab active">Schedule</button>
        <button className="quick-tab">Friends</button>
        <button className="quick-tab">Messages</button>
      </div>

      {/* Stories */}
      <div className="stories-section">
        <div className="stories-scroll">
          {STORIES.map((s) => (
            <StoryCircle key={s.id} story={s} active={s.id === 'yours'} />
          ))}
        </div>
      </div>

      {/* Feed */}
      <div className="feed">
        {POSTS.map((p) => (
          <PostCard key={p.id} post={{ ...p, is_liked: liked.has(p.id) }} onLike={handleLike} />
        ))}
        {POSTS.length === 0 && <div className="empty-feed">No posts yet.</div>}
      </div>
    </div>
  );
}