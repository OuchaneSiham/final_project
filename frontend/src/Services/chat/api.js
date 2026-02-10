// src/services/api.js
import { users, messages, CURRENT_USER_ID } from './mockData';

// A helper to fake the delay (e.g., 500ms)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 1. Fetch the list of users for the sidebar
export const getContacts = async () => {
  await delay(500); // Fake network loading
  return users;
};

// 2. Fetch conversation with a specific user
export const getMessages = async (contactId) => {
  await delay(300); // Fake network loading
  
  // Filter messages where the sender OR receiver is the contactId
  return messages.filter(msg => 
    (msg.senderId === contactId && msg.receiverId === CURRENT_USER_ID) ||
    (msg.senderId === CURRENT_USER_ID && msg.receiverId === contactId)
  );
};