
'use client'
import { useEffect, useState } from 'react'

const USER_ID = 1 // TODO: replace with auth later

export default function ChatPage({ params }: { params: { conversationId: string } }) {
  const conversationId = Number(params.conversationId)

  const [messages, setMessages] = useState<any[]>([])
  const [messageText, setMessageText] = useState('')

  useEffect(() => {
    fetch(`http://localhost:3001/conversation/${conversationId}/messages`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setMessages(data)
      })
      .catch(console.error)
  }, [conversationId])

  const handleSendMessage = async () => {
    if (!messageText.trim()) return

    const res = await fetch(
      `http://localhost:3001/conversation/${conversationId}/message`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: USER_ID,
          content: messageText,
        }),
      }
    )

    if (!res.ok) {
      console.error('Failed to send message')
      return
    }

    const newMessage = await res.json()

    setMessages(prev => [...prev, newMessage])
    setMessageText('')
  }

  return (
    <div style={{ padding: 20 }}>
      <div style={{ marginBottom: 10 }}>
        {messages.map((m, index) => {
          const isMe = m.senderId === USER_ID;

          return (
            <div
              key={m.id ?? index}
              style={{
                maxWidth: 300,
                padding: 8,
                marginBottom: 6,
                borderRadius: 6,
                background: isMe ? "#3b82f6" : "#e5e7eb",
                color: isMe ? "white" : "black",
                marginLeft: isMe ? "auto" : "0",
              }}
            >
              <div style={{ fontSize: 12, opacity: 0.7 }}>
                {isMe ? "You" : m.sender?.username ?? `User ${m.senderId}`}
              </div>
              <div>{m.content}</div>
            </div>
          );
        })}
      </div>

      <input
        value={messageText}
        onChange={e => setMessageText(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  )
}

