'use client';

import { useState, useEffect } from 'react';

export function useChat(userId, conversationId) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!conversationId) return;

    setLoading(true);
    fetch(`http://localhost:3001/conversation/${conversationId}/messages?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [conversationId, userId]);

  const sendMessage = async (content) => {
    if (!conversationId) return;

    try {
      const res = await fetch(`http://localhost:3001/conversation/${conversationId}/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, content }),
      });
      const message = await res.json();
      setMessages((prev) => [...prev, message]);
    } catch (err) {
      console.error(err);
    }
  };

  return { messages, sendMessage, loading };
}

