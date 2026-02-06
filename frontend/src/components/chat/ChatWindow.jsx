
'use client'
import React, { useEffect, useState } from 'react'
import MessageList from './MessageList'
import MessageInput from './MessageInput'

export default function ChatWindow({ conversationId, userId }) {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (!conversationId) return

    fetch(`http://localhost:3001/conversation/${conversationId}/messages`)
      .then(res => res.json())
      .then(data => {
        const msgs = Array.isArray(data)
          ? data
          : Array.isArray(data.messages)
          ? data.messages
          : []
        setMessages(msgs)
      })
      .catch(console.error)
  }, [conversationId])

  const handleNewMessage = (msg) => {
    setMessages(prev => [...prev, msg])
  }

  return (
    <div className="flex flex-col flex-1">
      <MessageList messages={messages} userId={userId} />
      <MessageInput
        conversationId={conversationId}
        userId={userId}
        onNewMessage={handleNewMessage}
      />
    </div>
  )
}

