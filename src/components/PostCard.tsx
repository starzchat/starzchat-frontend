import React from 'react';
import type { Post } from '../lib/types';

interface PostCardProps {
  post: Post;
  onLike: (id: number) => void;
}

export function PostCard({ post, onLike }: PostCardProps) {
  const handleLike = () => onLike(post.id);
  return (
    <article className="post-card">
      <div className="post-header">
        <div className="post-author">
          <img
            src={post.avatar_url || '/favicon.svg'}
            alt={post.display_name || post.username}
            className="post-avatar"
          />
          <div className="post-meta">
            <div className="post-name">{post.display_name || post.username}</div>
            <div className="post-info">
              {new Date(post.created_at).toLocaleDateString(undefined, { hour: '2-digit', minute: '2-digit' })} · {post.location}
            </div>
          </div>
        </div>
        <button className="post-menu" aria-label="More options">···</button>
      </div>

      <div className="post-content">{post.content}</div>

      {post.image_url && (
        <img src={post.image_url} alt="Post" className="post-image" />
      )}

      <div className="post-actions">
        <button className={`action-btn ${post.is_liked ? 'liked' : ''}`} onClick={handleLike} aria-label="Like">
          <span className="action-icon">❤</span>
          <span className="action-count">{post.like_count}</span>
        </button>
        <button className="action-btn" aria-label="Comment">
          <span className="action-icon">💬</span>
          <span className="action-count">{post.comment_count}</span>
        </button>
        <button className="action-btn ghost" aria-label="Share">
          <span className="action-icon">↗</span>
        </button>
        <button className="action-btn ghost" aria-label="Bookmark">
          <span className="action-icon">🔖</span>
        </button>
      </div>
    </article>
  );
}