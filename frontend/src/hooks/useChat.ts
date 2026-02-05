'use client';
import { useState, useEffect } from 'react';


export function useChat(userId: number, conversationId: number | null) {
  const [messages, setMessages] = useState<
    { id: number; content: string; sender: { username: string } }[]
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!conversationId) return;

    setLoading(true);
    apiFetch(`/conversation/${conversationId}/messages?userId=${userId}`)
      .then((data) => setMessages(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [conversationId, userId]);

  const sendMessage = async (content: string) => {
    if (!conversationId) return;
    const message = await apiFetch(`/conversation/${conversationId}/message`, {
      method: 'POST',
      body: JSON.stringify({ userId, content }),
    });
    setMessages((prev) => [...prev, message]);
  };

  return { messages, sendMessage, loading };
}
