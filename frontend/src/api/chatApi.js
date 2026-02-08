
import axios from "axios";

export const BASE_URL = "http://localhost:3001";

export const getConversations = async (userId) => {
  const res = await axios.get(`${BASE_URL}/conversation?userId=${userId}`);
  return res.data;
};

export const getMessages = async (conversationId) => {
  const res = await axios.get(`${BASE_URL}/conversation/${conversationId}/messages`);
  return res.data;
};

export const sendMessage = async (conversationId, userId, content) => {
  const res = await axios.post(`${BASE_URL}/conversation/${conversationId}/message`, {
    userId,
    content
  });
  return res.data;
};

// 🔹 Add these
export const blockUser = async (blockerId, blockedId) => {
  const res = await axios.post(`${BASE_URL}/user/${blockedId}/block`, { blockerId });
  return res.data;
};

export const unblockUser = async (blockerId, blockedId) => {
  const res = await axios.post(`${BASE_URL}/user/${blockedId}/unblock`, { blockerId });
  return res.data;
};

export const getBlockedUsers = async (userId) => {
  const res = await axios.get(`${BASE_URL}/user/${userId}/blocked`);
  return res.data;
};

