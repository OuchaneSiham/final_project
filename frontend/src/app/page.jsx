'use client'

import { useEffect, useRef, useState } from 'react'
import { useSocket } from '@/hooks/useSocket'
import { config } from '@/lib/config'
import { formatDistanceToNow } from 'date-fns'
import { Send } from 'lucide-react'

export default function ChatPage() {
  const { socket, isConnected } = useSocket()
  const userId = config.CURRENT_USER_ID

  const [conversations, setConversations] = useState([])
  const [messages, setMessages] = useState([])
  const [selectedConversationId, setSelectedConversationId] = useState(null)
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)

  // fetch conversations
  useEffect(() => {
    if (!isConnected) return

    fetch(`${config.API_BASE_URL}/conversation?userId=${userId}`)
      .then(res => res.json())
      .then(data => {
        const convs = Array.isArray(data)
          ? data
          : Array.isArray(data.conversations)
            ? data.conversations
            : []

        setConversations(convs)

        if (convs.length && !selectedConversationId) {
          setSelectedConversationId(convs[0].id)
        }
      })
      .catch(console.error)
  }, [isConnected])

  // fetch messages for selected conversation
  useEffect(() => {
    if (!selectedConversationId) return

    fetch(`${config.API_BASE_URL}/conversation/${selectedConversationId}/messages`)
      .then(res => res.json())
      .then(setMessages)
      .catch(console.error)
  }, [selectedConversationId])

  // handle incoming socket messages
  useEffect(() => {
    if (!socket) return

    const onNewMessage = (msg) => {
      setMessages(prev =>
        prev.some(m => m.id === msg.id) ? prev : [...prev, msg]
      )
    }

    socket.on('message:new', onNewMessage)
    return () => {
      socket.off('message:new', onNewMessage)
    }
  }, [socket])

  // scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || !selectedConversationId) return

    const res = await fetch(
      `${config.API_BASE_URL}/conversation/${selectedConversationId}/message`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userId,
          content: input,
        }),
      }
    )

    const msg = await res.json()
    setMessages(prev => [...prev, msg])
    setInput('')
  }

  return (
    <div className="flex h-screen">
      {/* SIDEBAR */}
      <aside className="w-64 border-r">
        {Array.isArray(conversations) &&
          conversations.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedConversationId(c.id)}
              className="w-full p-3 text-left hover:bg-blue"
            >
              <p className="font-medium">{c.name ?? `Conversation ${c.id}`}</p>
              <p className="text-xs text-muted-foreground">
                {c.updatedAt
                  ? `${formatDistanceToNow(new Date(c.updatedAt))} ago`
                  : '—'}
              </p>
            </button>
          ))}
      </aside>

      {/* CHAT */}
      <main className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((m, index) => {
            const isMe = m.senderId === userId
            return (
              <div
                key={m.id ?? `msg-${m.senderId}-${m.createdAt}-${index}`}
                className={`max-w-xs p-2 rounded ${
                  isMe ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-200'
                }`}
              >
                <div className="text-xs opacity-70 mb-1">
                  {isMe ? 'You' : m.sender?.username ?? `User ${m.senderId}`}
                </div>
                <div>{m.content}</div>
              </div>
            )
          })}
          <div ref={bottomRef} />
        </div>

        <div className="p-3 border-t flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            className="flex-1 border rounded px-3"
            placeholder="Message..."
          />
          <button onClick={sendMessage}>
            <Send />
          </button>
        </div>
      </main>
    </div>
  )
}
