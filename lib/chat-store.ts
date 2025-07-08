import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Message, ChatSession } from '@/types/chat';

interface ChatStore {
  sessions: ChatSession[];
  currentSessionId: string | null;
  createSession: (type: 'general' | 'lawyer') => void;
  addMessage: (message: Message) => void;
  updateLastMessage: (content: string) => void;
  clearMessages: () => void;
  switchSession: (sessionId: string) => void;
  deleteSession: (sessionId: string) => void;
  getCurrentSession: () => ChatSession | null;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      sessions: [],
      currentSessionId: null,

      createSession: (type) => {
        const now = new Date();
        const systemMessage: Message = {
          id: `system-${now.getTime()}`,
          role: 'system',
          timestamp: now,
          content:
            'You are AinBondhu, a legal assistant focused on Bangladeshi law and human rights. Politely refuse to answer questions outside of legal topics.',
        };

        const newSession: ChatSession = {
          id: now.getTime().toString(),
          title: `New Chat ${get().sessions.length + 1}`,
          createdAt: now,
          messages: [systemMessage],
          type,
        };
        set((state) => ({
          sessions: [newSession, ...state.sessions],
          currentSessionId: newSession.id,
        }));
      },

      addMessage: (message) => {
        set((state) => {
          const currentSession = state.sessions.find(
            (s) => s.id === state.currentSessionId
          );
          if (!currentSession) return state;

          const updatedSession = {
            ...currentSession,
            messages: [...currentSession.messages, message],
          };

          return {
            sessions: state.sessions.map((s) =>
              s.id === state.currentSessionId ? updatedSession : s
            ),
          };
        });
      },

      updateLastMessage: (content) => {
        set((state) => {
          const currentSession = state.sessions.find(
            (s) => s.id === state.currentSessionId
          );
          if (!currentSession || !currentSession.messages.length) return state;

          const messages = [...currentSession.messages];
          messages[messages.length - 1] = {
            ...messages[messages.length - 1],
            content,
          };

          return {
            sessions: state.sessions.map((s) =>
              s.id === state.currentSessionId
                ? { ...s, messages }
                : s
            ),
          };
        });
      },

      clearMessages: () => {
        set((state) => {
          const currentSession = state.sessions.find(
            (s) => s.id === state.currentSessionId
          );
          if (!currentSession) return state;

          return {
            sessions: state.sessions.map((s) =>
              s.id === state.currentSessionId
                ? { ...s, messages: [] }
                : s
            ),
          };
        });
      },

      switchSession: (sessionId) => {
        set({ currentSessionId: sessionId });
      },

      deleteSession: (sessionId) => {
        set((state) => {
          const filteredSessions = state.sessions.filter((s) => s.id !== sessionId);
          return {
            sessions: filteredSessions,
            currentSessionId:
              state.currentSessionId === sessionId
                ? filteredSessions[0]?.id || null
                : state.currentSessionId,
          };
        });
      },

      getCurrentSession: () => {
        const state = get();
        return state.sessions.find((s) => s.id === state.currentSessionId) || null;
      },
    }),
    {
      name: 'chat-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        sessions: state.sessions,
        currentSessionId: state.currentSessionId,
      }),
    }
  )
);