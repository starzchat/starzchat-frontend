import React, { useState } from 'react';
import { UserPayload } from '../lib/types';
import { ChatListSidebar } from './ChatListSidebar';
import { ChatDetail } from './ChatDetail';
import { SavedMessagesPanel } from './SavedMessagesPanel';

interface AppViewProps {
  user: UserPayload;
}

export function AppView({ user }: AppViewProps) {
  const [activePanel, setActivePanel] = useState<'chats' | 'saved'>('chats');

  return (
    <div className="app-view">
      {activePanel === 'chats' && (
        <>
          <main className="main-area">
            <ChatDetail />
          </main>
        </>
      )}

      {activePanel === 'saved' && (
        <>
          <ChatListSidebar user={user} />
          <main className="main-area">
            <SavedMessagesPanel />
          </main>
        </>
      )}
    </div>
  );
}
