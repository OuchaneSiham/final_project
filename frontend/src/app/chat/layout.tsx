'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface Conversation {
  id: number
  name: string | null
}

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const router = useRouter()
  const userId = 1

  useEffect(() => {
    fetch(`http://localhost:3001/conversation?userId=${userId}`)
      .then(res => res.json())
      .then(setConversations)
      .catch(console.error)
  }, [userId])

  const handleSelect = (id: number) => {
    router.push(`/chat/${id}`)
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <aside style={{ width: 300, borderRight: '1px solid #ddd', padding: 12 }}>
        <h2>Conversations</h2>
        {conversations.length === 0 && <p>No conversations yet</p>}
        {conversations.map(c => (
          <button key={c.id} onClick={() => handleSelect(c.id)} style={{ display: 'block', margin: '4px 0' }}>
            {c.name ?? `Conversation ${c.id}`}
          </button>
        ))}
      </aside>
      <main style={{ flex: 1 }}>{children}</main>
    </div>
  )
}

