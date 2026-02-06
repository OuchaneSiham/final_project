'use client'

import { createContext, useContext, useState } from 'react'

const ChatContext = createContext(undefined)

export function ChatProvider({ children }) {
  const [conversations, setConversations] = useState([])
  const [currentConversation, setCurrentConversation] = useState(null)
  const [messages, setMessages] = useState([])

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
  )
}

export function useChatContext() {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChatContext must be used inside ChatProvider')
  }
  return context
}

