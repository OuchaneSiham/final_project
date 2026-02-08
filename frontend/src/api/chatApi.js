import axios from "axios";

const BASE_URL = "http://localhost:3001";

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
