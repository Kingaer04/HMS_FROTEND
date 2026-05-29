import { create } from "zustand";
import { ChatRoom, ChatMessage } from "@/types/chat.types";

interface ChatState {
  activeRoomId: string | null;
  rooms: ChatRoom[];
  messages: Record<string, ChatMessage[]>;
  setActiveRoom: (roomId: string | null) => void;
  setRooms: (rooms: ChatRoom[]) => void;
  setMessages: (roomId: string, messages: ChatMessage[]) => void;
  appendMessage: (roomId: string, message: ChatMessage) => void;
  updateMessage: (roomId: string, messageId: string, updates: Partial<ChatMessage>) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  activeRoomId: null,
  rooms: [],
  messages: {},
  setActiveRoom: (roomId) => set({ activeRoomId: roomId }),
  setRooms: (rooms) => set({ rooms }),
  setMessages: (roomId, messages) =>
    set((s) => ({ messages: { ...s.messages, [roomId]: messages } })),
  appendMessage: (roomId, message) =>
    set((s) => ({
      messages: {
        ...s.messages,
        [roomId]: [...(s.messages[roomId] || []), message],
      },
    })),
  updateMessage: (roomId, messageId, updates) =>
    set((s) => ({
      messages: {
        ...s.messages,
        [roomId]: (s.messages[roomId] || []).map((m) =>
          m.id === messageId ? { ...m, ...updates } : m
        ),
      },
    })),
}));
