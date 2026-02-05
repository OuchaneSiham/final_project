
'use client';
import { useEffect, useState } from "react";

export default function ChatPage({ params }: { params: { conversationId: string } }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [messageText, setMessageText] = useState("");

  const conversationId = Number(params.conversationId);

  useEffect(() => {
    fetch(`http://localhost:3001/conversation/${conversationId}/messages`)
      .then(res => res.json())
      .then(setMessages)
      .catch(console.error);
  }, [conversationId]);

  const handleSendMessage = async () => {
    if (!messageText) return;
    const res = await fetch(`http://localhost:3001/conversation/${conversationId}/message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: 1, content: messageText }) // replace 1 with logged-in user
    });
    const newMessage = await res.json();
    setMessages(prev => [...prev, newMessage]);
    setMessageText("");
  };

  return (
    <div>
      <div>
        {messages.map(msg => (
          <div key={msg.id}><b>{msg.sender.username}:</b> {msg.content}</div>
        ))}
      </div>
      <input value={messageText} onChange={e => setMessageText(e.target.value)} />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}

