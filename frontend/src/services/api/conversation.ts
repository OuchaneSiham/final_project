// frontend/src/services/api/conversation.ts

export async function getUserConversations(userId: number) {
  const res = await fetch(`/conversation/user/${userId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch user conversations");
  }
  return res.json(); // returns the array of conversations
}


