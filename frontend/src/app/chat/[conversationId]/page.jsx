"use client";

import { useEffect, useState } from "react";
import { use } from "react";

const USER_ID = 1;

export default function ChatPage({ params }) {
  const { conversationId } = use(params);
  const id = Number(conversationId);

  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3001/conversation/${id}/messages`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setMessages(data);
      })
      .catch(console.error);
  }, [id]);

  const handleSendMessage = async () => {
    if (!messageText.trim()) return;

    try {
      const res = await fetch(
        `http://localhost:3001/conversation/${id}/message`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: USER_ID,
            content: messageText,
          }),
        }
      );

      if (!res.ok) return;

      const newMessage = await res.json();
      setMessages((prev) => [...prev, newMessage]);
      setMessageText("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Conversation {id}</h2>

      <div style={{ marginBottom: 20 }}>
        {messages.map((m) => {
          const isMe = m.senderId === USER_ID;
          const username = isMe
            ? "You"
            : m.sender?.username ?? `User ${m.senderId}`;

          return (
            <div
              key={m.id}
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
                {username}
              </div>
              <div>{m.content}</div>
            </div>
          );
        })}
      </div>

      <input
        type="text"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        placeholder="Type a message..."
        style={{ padding: 8, width: "80%", marginRight: 10 }}
      />
      <button onClick={handleSendMessage} style={{ padding: 8 }}>
        Send
      </button>
    </div>
  );
}



