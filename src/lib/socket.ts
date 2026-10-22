import { io, Socket } from 'socket.io-client';
import type { PresencePayload, TypingPayload } from './types';

// VITE_SOCKET_URL is set by Vite at build time from env variables
let socketInstance: Socket | null = null;
let connectCallbacks: (() => void)[] = [];
let eventCallbacks: Map<string, ((...args: unknown[]) => void)[]> = new Map();

function getSocket(): Socket {
  if (!socketInstance) {
    const meta = import.meta as { env?: { VITE_SOCKET_URL?: string } };
    const socketUrl = meta.env?.VITE_SOCKET_URL || 'http://localhost:5000';
    socketInstance = io(socketUrl, {
      auth: { token: typeof localStorage !== 'undefined' ? localStorage.getItem('starzchat_token') ?? '' : '' },
      reconnection: true,
      autoConnect: true
    });
  }
  return socketInstance;
}

export function connectSocket() {
  const socket = getSocket();
  socket.on('connect', () => {
    connectCallbacks.forEach(cb => cb());
    connectCallbacks = [];
  });
  socket.on('disconnect', () => { });
  return socket;
}

export function onSocketConnect(cb: () => void) {
  const socket = getSocket();
  if (socket.connected) {
    cb();
  } else {
    connectCallbacks.push(cb);
  }
}

export function on(event: string, cb: (...args: unknown[]) => void) {
  if (!eventCallbacks.has(event)) {
    eventCallbacks.set(event, []);
  }
  eventCallbacks.get(event)!.push(cb);
  return () => {
    const list = eventCallbacks.get(event)!;
    const idx = list.indexOf(cb);
    if (idx !== -1) list.splice(idx, 1);
  };
}

export function emit(event: string, ...args: unknown[]) {
  const socket = getSocket();
  if (socket.connected) {
    socket.emit(event, ...args);
  }
}

export function disconnectSocket() {
  if (socketInstance) {
    socketInstance.disconnect();
    socketInstance = null;
  }
}

export { on as onEvent };

export function emitTyping(chatId: number, isTyping: boolean) {
  emit('typing', { conversation_id: chatId, is_typing: isTyping });
}

export function emitReadReceipt(chatId: number, messageId: number) {
  emit('read_receipt', { conversation_id: chatId, message_id: messageId });
}

export function emitPresence(online: boolean) {
  emit('presence', { username: 'current', online });
}
