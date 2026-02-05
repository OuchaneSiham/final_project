
'use client'

import { useEffect, useRef, useState } from 'react'
import { useSocket } from '@/hooks/useSocket'
import { config } from '@/lib/config'
import { formatDistanceToNow } from 'date-fns'
import { Send } from 'lucide-react'

interface Conversation {
  id: number
  name?: string | null
  type?: string
  updatedAt?: string
}


interface Message {
  id: number
  senderId: number
  content: string
  createdAt: string
}

export default function ChatPage() {
  const { socket, isConnected } = useSocket()
  const userId = config.CURRENT_USER_ID

  const [conversations, setConversations] = useState<Conversation[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [selectedConversationId, setSelectedConversationId] = useState<number | null>(null)
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isConnected) return

    fetch(`${config.API_BASE_URL}/conversation?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setConversations(data)
        if (data.length && !selectedConversationId) {
          setSelectedConversationId(data[0].id)
        }
      })
      .catch(console.error)
  }, [isConnected])

  useEffect(() => {
    if (!selectedConversationId) return

    fetch(`${config.API_BASE_URL}/conversation/${selectedConversationId}/messages`)
      .then((res) => res.json())
      .then(setMessages)
      .catch(console.error)
  }, [selectedConversationId])

  useEffect(() => {
    if (!socket) return

    const onNewMessage = (msg: Message) => {
      setMessages((prev) =>
        prev.some((m) => m.id === msg.id) ? prev : [...prev, msg]
      )
    }

    socket.on('message:new', onNewMessage)
    return () => {
      socket.off('message:new', onNewMessage)
    }
  }, [socket])

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
          senderId: userId,
          content: input,
        }),
      }
    )

    const msg = await res.json()
    setMessages((prev) => [...prev, msg])
    setInput('')
  }

  return (
    <div className="flex h-screen">
      {/* SIDEBAR */}
      <aside className="w-64 border-r">
        {conversations.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedConversationId(c.id)}
            className="w-full p-3 text-left hover:bg-muted"
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
          {messages.map((m) => (
            <div
              key={m.id}
              className={`max-w-xs p-2 rounded ${
                m.senderId === userId
                  ? 'ml-auto bg-primary text-primary-foreground'
                  : 'bg-muted'
              }`}
            >
              {m.content}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <div className="p-3 border-t flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
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
