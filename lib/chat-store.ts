"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Message } from "@/types/chat";

interface ChatState {
  messages: Message[];
  addMessage: (message: Message) => void;
  clearMessages: () => void;
  updateLastMessage: (content: string) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: [],
      addMessage: (message) =>
        set((state) => ({
          messages: [...state.messages, message],
        })),
      clearMessages: () => set({ messages: [] }),
      updateLastMessage: (content) =>
        set((state) => {
          const updatedMessages = [...state.messages];
          if (updatedMessages.length > 0) {
            updatedMessages[updatedMessages.length - 1].content = content;
          }
          return { messages: updatedMessages };
        }),
    }),
    {
      name: "chat-storage",
    }
  )
);
