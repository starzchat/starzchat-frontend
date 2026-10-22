import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  UserPayload,
  ChatListItem,
  Conversation,
  Member,
  Message,
  MessageRequest,
  SavedMessage,
  ChatListResponse,
  MessageResponse,
  MemberRequest,
  MemberResponse,
  GroupCreateRequest,
  GroupCreateResponse,
  SaveMessageRequest,
  ReadReceiptPayload,
  ConnectResponse,
  PresencePayload,
  TypingPayload,
} from './types';

interface Env {
  readonly VITE_API_BASE_URL?: string;
}

const env = typeof import.meta !== 'undefined' ? (import.meta as unknown as Env) : {};
const apiBase = env.VITE_API_BASE_URL || 'http://127.0.0.1:5000';

let token = typeof localStorage !== 'undefined' ? localStorage.getItem('starzchat_token') : null;

function setToken(t: string | null) {
  token = t;
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('starzchat_token', t || '');
  }
}

function getAuthHeader(): { Authorization: string } | {} {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');
  Object.entries(getAuthHeader()).forEach(([k, v]) => headers.set(k, v as string));

  const res = await fetch(`${apiBase}${path}`, { ...options, headers });
  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    const err = new Error(body.error || body.msg || `HTTP ${res.status}`) as Error & {
      status: number;
      body: unknown;
    };
    err.status = res.status;
    err.body = body;
    throw err;
  }

  return body as T;
}

export const api = {
  login: (creds: LoginRequest): Promise<AuthResponse> => request('/api/auth/login', { method: 'POST', body: JSON.stringify(creds) }),
  register: (data: RegisterRequest): Promise<AuthResponse> => request('/api/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  me: (): Promise<UserPayload> => request('/api/me'),
  logout: (): Promise<void> => request('/api/auth/logout', { method: 'POST' }),
  logoutPassword: (): Promise<void> => request('/api/auth/password', { method: 'POST' }),

  chats: (params?: { limit?: number; offset?: number }): Promise<ChatListResponse> => {
    const qs = new URLSearchParams();
    if (params?.limit) qs.set('limit', String(params.limit));
    if (params?.offset) qs.set('offset', String(params.offset));
    const url = qs.toString() ? `/api/chats?${qs.toString()}` : '/api/chats';
    return request<ChatListResponse>(url);
  },

  chat: (id: number): Promise<Conversation> => request(`/api/chats/${id}`),
  messages: (
    id: number,
    params?: { limit?: number; before?: number }
  ): Promise<Message[]> => {
    const qs = new URLSearchParams();
    if (params?.limit) qs.set('limit', String(params.limit));
    if (params?.before) qs.set('before', String(params.before));
    const url = qs.toString() ? `/api/chats/${id}/messages?${qs.toString()}` : `/api/chats/${id}/messages`;
    return request<Message[]>(url);
  },

  createChat: (name: string, members: string[]): Promise<ChatListItem | Conversation> =>
    request('/api/chats', { method: 'POST', body: JSON.stringify({ name, members }) }),

  sendMessage: (conversationId: number, body: string): Promise<Message> =>
    request(`/api/chats/${conversationId}/messages`, { method: 'POST', body: JSON.stringify({ body }) }),

  message: (id: number): Promise<Message> => request(`/api/messages/${id}`),
  updateMessage: (id: number, body: string): Promise<Message> =>
    request(`/api/messages/${id}`, { method: 'PATCH', body: JSON.stringify({ body }) }),
  deleteMessage: (id: number): Promise<void> => request(`/api/messages/${id}`, { method: 'DELETE' }),
  saveMessage: (id: number): Promise<SavedMessage> => request(`/api/messages/${id}/save`, { method: 'POST' }),
  unsaveMessage: (id: number): Promise<void> => request(`/api/messages/${id}/save`, { method: 'DELETE' }),
  saved: (): Promise<SavedMessage[]> => request('/api/saved'),
  deleteSaved: (id: number): Promise<void> => request(`/api/saved/${id}`, { method: 'DELETE' }),

  chatMembers: (chatId: number): Promise<Member[]> => request(`/api/chats/${chatId}/members`),
  addChatMember: (chatId: number, studentId: string): Promise<Member> =>
    request(`/api/chats/${chatId}/members`, { method: 'POST', body: JSON.stringify({ student_id: studentId }) }),
  removeChatMember: (chatId: number, username: string): Promise<void> =>
    request(`/api/chats/${chatId}/members/${username}`, { method: 'DELETE' }),

  read: (chatId: number, messageId: number): Promise<void> =>
    request(`/api/chats/${chatId}/read`, { method: 'POST', body: JSON.stringify({ message_id: messageId }) }),

  ttl: (chatId: number, ttl: number): Promise<void> =>
    request(`/api/chats/${chatId}/ttl`, { method: 'PATCH', body: JSON.stringify({ ttl_seconds: ttl }) }),

  usersSearch: (q: string): Promise<UserPayload[]> => request(`/api/users/search?q=${encodeURIComponent(q)}`),

  connect: (): Promise<ConnectResponse> => request('/api/connect', { method: 'POST' }),
  disconnect: (): Promise<void> => request('/api/connect', { method: 'DELETE' }),
};

export function initAuth(tokenOrNull: string | null) {
  if (tokenOrNull) {
    setToken(tokenOrNull);
  } else {
    token = null;
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('starzchat_token');
    }
  }
}

export { token as getToken };
export { setToken };
