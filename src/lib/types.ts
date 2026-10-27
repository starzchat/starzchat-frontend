export interface UserPayload {
  id: number;
  student_id: string;
  username: string;
  display_name: string | null;
  created_at: string;
  token_version: number;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  student_id: string;
  username: string;
  password: string;
  display_name?: string;
}

export interface AuthResponse {
  token: string;
  user: UserPayload;
}

export interface ChatListItem {
  id: number;
  kind: 'direct' | 'group';
  name: string;
  last_message: { body: string; created_at: string } | null;
  unread_count: number;
  expires_at: string | null;
}

export interface ChatListResponse {
  chats: ChatListItem[];
}

export interface Conversation {
  id: number;
  kind: 'direct' | 'group';
  name: string;
  members: Member[];
  last_message_at: string | null;
  ttl_seconds: number | null;
}

export interface Member {
  id: number;
  conversation_id: number;
  user_id: number;
  username: string;
  role: 'admin' | 'member';
  last_read_message_id: number;
}

export interface Message {
  id: number;
  conversation_id: number;
  sender: string;
  body: string;
  created_at: string;
  expires_at: string;
  edited_at: string | null;
}

export interface MessageRequest {
  body: string;
}

export interface MessageResponse {
  message: Message;
}

export interface MemberRequest {
  student_id: string;
}

export interface MemberResponse {
  member: Member;
}

export interface SavedMessage {
  id: number;
  conversation_id: number;
  sender: string;
  body: string;
  original_created_at: string;
  saved_at: string;
}

export interface SaveMessageRequest {
  id: number;
}

export interface GroupCreateRequest {
  name: string;
  members: string[];
}

export interface GroupCreateResponse {
  chat: Conversation;
}

export interface ConnectResponse {
  connected: boolean;
}

export interface PresencePayload {
  username: string;
  online: boolean;
}

export interface TypingPayload {
  is_typing: boolean;
}

export interface UnreadCount {
  chat_id: number;
  count: number;
}

export interface ReadReceiptPayload {
  chat_id: number;
  message_id: number;
}

/* ---------- Social Feed ---------- */
export interface Story {
  id: string;
  user_id: number;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  created_at: string;
  expired: boolean;
}

export interface Post {
  id: number;
  user_id: number;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  content: string;
  image_url: string | null;
  location: string | null;
  created_at: string;
  like_count: number;
  comment_count: number;
  is_liked: boolean;
}

/* ---------- Alarm ---------- */
export interface Alarm {
  id: number;
  time: string;        // "HH:MM"
  period: 'AM' | 'PM';
  ringtone: string;
  ring_duration: string;   // e.g. "5 minutes"
  class_mode: string;      // e.g. "Class 1 (Morning)"
  active: boolean;
  created_at: string;
}

export interface AlarmFormValues {
  hour: string;
  minute: string;
  period: 'AM' | 'PM';
  ringtone: string;
  ring_duration: string;
  class_mode: string;
}
