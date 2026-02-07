'use client'

import React, { useEffect, useState } from 'react'
import ChatWindow from './ChatWindow'
import { getBlockedUsers } from '@/services/api/block'

export default function ChatLayout() {
  const [conversations, setConversations] = useState([])
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [blockedUsers, setBlockedUsers] = useState([])
  const userId = 1

  useEffect(() => {
    fetch(`http://localhost:3001/conversation/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setConversations(Array.isArray(data) ? data : [])
      })
      .catch(console.error)
  }, [userId])

  useEffect(() => {
    getBlockedUsers(userId)
      .then(setBlockedUsers)
      .catch(console.error)
  }, [userId])

  return (
    <div className="flex h-screen">
      {/* SIDEBAR */}
      <aside className="w-64 border-r p-4 bg-gray-50 flex flex-col">
        <h2 className="font-bold mb-4">Conversations</h2>

        {/* Conversations list */}
        <div className="flex-1 overflow-auto">
          {conversations.length === 0 ? (
            <p className="text-sm text-gray-500">No conversations yet</p>
          ) : (
            conversations.map((conv) => (
              <button
                key={conv.id}
                className={`block w-full text-left p-2 mb-1 rounded ${
                  conv.id === selectedConversation
                    ? 'bg-gray-200'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => setSelectedConversation(conv.id)}
              >
                {conv.name ?? `Conversation ${conv.id}`}
              </button>
            ))
          )}
        </div>

        {/* 🔒 BLOCKED USERS (HERE 👇) */}
        <div className="mt-6 border-t pt-4">
          <h3 className="font-bold text-sm mb-2">Blocked Users</h3>

          {blockedUsers.length === 0 ? (
            <p className="text-xs text-gray-500">No blocked users</p>
          ) : (
            blockedUsers.map((u) => (
              <div
                key={u.blocked.id}
                className="text-xs text-gray-600"
              >
                {u.blocked.username}
              </div>
            ))
          )}
        </div>
      </aside>

      {/* CHAT CONTENT */}
      <main className="flex-1 flex flex-col">
        {selectedConversation ? (
          <ChatWindow
            conversationId={selectedConversation}
            userId={userId}
          />
        ) : (
          <div className="p-4 text-gray-500">
            Select a conversation to start chatting
          </div>
        )}
      </main>
    </div>
  )
}
