

export async function getUserConversations(userId) {
  const res = await fetch(`/conversation/user/${userId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch user conversations");
  }
  return res.json();
}



