'use client'

import React, { useEffect, useState } from 'react'
import ChatWindow from './ChatWindow'

export default function ChatLayout() {
  const [conversations, setConversations] = useState([])
  const [selectedConversation, setSelectedConversation] = useState(null)
  const userId = 1

  useEffect(() => {
    fetch(`http://localhost:3001/conversation/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setConversations(Array.isArray(data) ? data : [])
      })
      .catch(console.error)
  }, [userId])

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r p-4 bg-gray-50">
        <h2 className="font-bold mb-4">Conversations</h2>

        {conversations.length === 0 ? (
          <p className="text-sm text-gray-500">No conversations yet</p>
        ) : (
          conversations.map((conv) => (
            <button
              key={conv.id}
              className={`block w-full text-left p-2 mb-1 rounded ${
                conv.id === selectedConversation ? 'bg-gray-200' : 'hover:bg-gray-100'
              }`}
              onClick={() => setSelectedConversation(conv.id)}
            >
              {conv.name ?? `Conversation ${conv.id}`}
            </button>
          ))
        )}
      </aside>

      {/* Chat content */}
      <main className="flex-1 flex flex-col">
        {selectedConversation ? (
          <ChatWindow conversationId={selectedConversation} userId={userId} />
        ) : (
          <div className="p-4 text-gray-500">
            Select a conversation to start chatting
          </div>
        )}
      </main>
    </div>
  )
}
