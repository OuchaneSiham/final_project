// mockUsers.js
export const CURRENT_USER_ID = "user_me";


export const users = [
  {
    id: 1,
    userName: "Alex",
    userFace: "https://i.pravatar.cc/150?img=1",
    status: "online",
  },
  {
    id: 2,
    userName: "Sarah",
    userFace: "https://i.pravatar.cc/150?img=2",
    status: "offline",
  },
  {
    id: 3,
    userName: "John",
    userFace: "https://i.pravatar.cc/150?img=3",
    status: "online",
  },
  {
    id: 4,
    userName: "Emma",
    userFace: "https://i.pravatar.cc/150?img=4",
    status: "offline",
  },
  {
    id: 5,
    userName: "Mike",
    userFace: "https://i.pravatar.cc/150?img=5",
    status: "online",
  },
];

// mockMessages.js
export const messages = [
  {
    id: 1,
    senderId: 1,
    receiverId: 2,
    content: "Hey Sarah, how are you?",
    time: "09:15am",
  },
  {
    id: 2,
    senderId: 2,
    receiverId: 1,
    content: "I'm good! What about you?",
    time: "09:17am",
  },
  {
    id: 3,
    senderId: 3,
    receiverId: 1,
    content: "Are we still meeting today?",
    time: "11:00am",
  },
  {
    id: 4,
    senderId: 1,
    receiverId: 3,
    content: "Yes, at 5pm 👍",
    time: "11:05am",
  },
  {
    id: 5,
    senderId: 5,
    receiverId: 4,
    content: "Did you finish the task?",
    time: "04:30pm",
  },
];
