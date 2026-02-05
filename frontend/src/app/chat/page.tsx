
"use client"

import { useEffect, useState } from "react"

export default function ChatPage() {
  const [conversations, setConversations] = useState([])

  useEffect(() => {
    fetch("http://localhost:3001/conversation?userId=1")
      .then(res => res.json())
      .then(setConversations)
      .catch(console.error)
  }, [])

  return (
    <div>
      <h2>Conversations</h2>

      {conversations.length === 0 && <p>No conversations yet</p>}
        {conversations.map((c: any) => (
          <div key={c.id}>{c.name ?? `Conversation ${c.id}`}</div>
        ))}
    </div>
  )
}







