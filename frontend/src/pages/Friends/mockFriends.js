// file for mock data to be used in the frined list 
export const mockFriends = [
  {
    id: '1',
    userName: 'Ochangli',
    userFace: 'https://i.pravatar.cc/150?img=1', // or use a URL
    status: 'online',
    wins: 10,
    Loses: 1,
    MatchPlaye:11,
    lastMessage: "The design looks great.",
  },
  {
    id: '2',
    userName: 'oThmane',
    userFace: 'https://i.pravatar.cc/150?img=2',
    status: 'offline',
    wins: 10,
    Loses: 1,
    MatchPlaye:11,
    lastMessage: "The design looks great.",
  },
]


export const messages = [
  {
    id: "msg_1",
    senderId: "user_1",      // Sent BY ohmane
    receiverId: "user_me",   // Sent TO you
    content: "Hey, did you finish the layout?",
    timestamp: "2023-10-27T10:00:00Z",
  },
  {
    id: "msg_2",
    senderId: "user_me",     // Sent BY you
    receiverId: "user_1",    // Sent TO ohmane
    content: "Almost! Just tweaking the colors.",
    timestamp: "2023-10-27T10:05:00Z",
  },
   {
    id: "msg_3",
    senderId: "user_1",
    receiverId: "user_me",
    content: "Make sure it pops!",
    timestamp: "2023-10-27T10:06:00Z",
  },
];