import axios from "axios";

const BASE_URL = "http://localhost:3001";


export const blockUser = (blockerId, blockedUserId) =>
  axios.post(`${BASE_URL}/user/${blockedUserId}/block`, { blockerId });


export const unblockUser = (blockerId, blockedId) => {
  return axios.post(`${BASE_URL}/user/${blockedId}/unblock`, {
    blockerId,
  });
};


export const getBlockedUsers = (userId) =>
  axios.get(`${BASE_URL}/user/${userId}/blocked`);



