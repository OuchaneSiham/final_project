import axios from "axios";

const BASE_URL = "http://localhost:3001";

// export const blockUser = async (userId, blockerId) => {
//   const res = await axios.post(`${BASE_URL}/user/${userId}/block`, { blockerId });
//   return res.data;
// };

// export const unblockUser = async (userId, blockerId) => {
//   const res = await axios.post(`${BASE_URL}/user/${userId}/unblock`, { blockerId });
//   return res.data;
// };

// export const getBlockedUsers = async (userId) => {
//   const res = await axios.get(`${BASE_URL}/user/${userId}/blocked`);
//   return res.data;
// };


export const blockUser = (blockerId, blockedUserId) =>
  axios.post(`${BASE_URL}/user/${blockedUserId}/block`, { blockerId });

export const unblockUser = (blockerId, blockedUserId) =>
  axios.post(`${BASE_URL}/user/${blockedUserId}/unblock`, { blockerId });

export const getBlockedUsers = (userId) =>
  axios.get(`${BASE_URL}/user/${userId}/blocked`);


