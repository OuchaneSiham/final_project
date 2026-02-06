'use client'

import React from 'react'

export default function MessageList({ messages, userId }) {
  return (
    <div className="flex-1 overflow-auto p-4 space-y-2 flex flex-col">
      {messages.map((msg) => {
        const isMe = msg.senderId === userId
        return (
          <div
            key={msg.id}
            className={`p-2 rounded max-w-xs ${
              isMe ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 self-start'
            }`}
          >
            <div className="text-xs opacity-70 mb-1">
              {isMe ? 'You' : msg.sender?.username ?? `User ${msg.senderId}`}
            </div>
            <div>{msg.content}</div>
          </div>
        )
      })}
    </div>
  )
}




