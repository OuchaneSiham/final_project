// frontend/src/services/api/message.js

export async function getMessages(conversationId) {
  const res = await fetch(`/conversation/${conversationId}/messages`);
  if (!res.ok) throw new Error("Failed to fetch messages");
  return res.json();
}

export async function sendMessage(conversationId, userId, text) {
  const res = await fetch(`/conversation/${conversationId}/message`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, text }),
  });
  if (!res.ok) throw new Error("Failed to send message");
  return res.json();
}
