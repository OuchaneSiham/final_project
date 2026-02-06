'use client'

import React, { useState } from 'react'

export default function MessageInput({ conversationId, userId, onNewMessage }) {
  const [text, setText] = useState('')

  const handleSend = async () => {
    if (!text.trim()) return

    try {
      const res = await fetch(
        `http://localhost:3001/conversation/${conversationId}/message`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, content: text }),
        }
      )

      if (res.ok) {
        const newMsg = await res.json()
        onNewMessage(newMsg)
        setText('')
      } else {
        console.error('Failed to send message')
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="flex p-2 border-t">
      <input
        className="flex-1 border p-2 rounded"
        type="text"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />
      <button
        className="ml-2 p-2 bg-blue-500 text-white rounded"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  )
}




