"use client";

import { createContext, useContext, useState } from "react";
import { Conversation, Message } from "@/types/chat";

interface ChatContextType {
  conversations: Conversation[];
  setConversations: (c: Conversation[]) => void;

  currentConversation: Conversation | null;
  setCurrentConversation: (c: Conversation | null) => void;

  messages: Message[];
  setMessages: (m: Message[]) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] =
    useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  return (
    <ChatContext.Provider
      value={{
        conversations,
        setConversations,
        currentConversation,
        setCurrentConversation,
        messages,
        setMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used inside ChatProvider");
  }
  return context;
}
