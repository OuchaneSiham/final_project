

export async function getUserConversations(userId) {
  const res = await fetch(`/conversation/user/${userId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch user conversations");
  }
  return res.json();
}

export async function blockUser(blockerId, blockedId) {
  const res = await fetch(`http://localhost:3001/user/${blockedId}/block`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ blockerId }),
  });

  if (!res.ok) throw new Error("Failed to block user");
  return res.json();
}

export async function getBlockedUsers(userId) {
  const res = await fetch(`http://localhost:3001/user/${userId}/blocked`);
  if (!res.ok) throw new Error("Failed to fetch blocked users");
  return res.json();
}


