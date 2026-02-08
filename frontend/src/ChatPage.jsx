// import React, { useEffect, useState } from "react";
// import { getConversations, getMessages, sendMessage } from "./api/chatApi";
// import { blockUser, unblockUser, getBlockedUsers } from "./api/userApi";
// import { socket } from "./socket";

// const CURRENT_USER_ID = 1;
// const currentUserId = 1; 

// const App = () => {
//   const [conversations, setConversations] = useState([]);
//   const [selectedConversation, setSelectedConversation] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [blockedUsers, setBlockedUsers] = useState([]);

//   useEffect(() => {
//     fetchConversations();
//     fetchBlockedUsers();
//     socket.connect();

//     socket.on("message:new", (msg) => {
//       if (selectedConversation && msg.conversationId === selectedConversation.id) {
//         setMessages((prev) => [...prev, msg]);
//       }
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [selectedConversation]);

//   const fetchConversations = async () => {
//     const data = await getConversations(CURRENT_USER_ID);
//     setConversations(data);
//   };

//   const fetchMessages = async (conversation) => {
//     setSelectedConversation(conversation);
//     const data = await getMessages(conversation.id);
//     setMessages(data);
//   };

//   const fetchBlockedUsers = async () => {
//     try {
//       const { data } = await getBlockedUsers(currentUserId);
//       if (Array.isArray(data)) {
//         setBlockedUsers(data);
//       } else {
//         setBlockedUsers([]);
//       }
//     } catch (err) {
//       console.error("Failed to fetch blocked users:", err);
//     }
//   };


//   const handleSend = async () => {
//     if (!input.trim() || !selectedConversation) return;
//     const msg = await sendMessage(selectedConversation.id, CURRENT_USER_ID, input);
//     setMessages([...messages, msg]);
//     setInput("");
//   };

//   const handleBlock = async (userId) => {
//     await blockUser(userId, CURRENT_USER_ID);
//     fetchBlockedUsers();
//   };

//   const handleUnblock = async (userId) => {
//     await unblockUser(userId, CURRENT_USER_ID);
//     fetchBlockedUsers();
//   };

//   {blockedUsers.map((b) => (
//     <div key={b.id} style={{ marginBottom: 5 }}>
//       {b.blockedUser.username}{" "}
//       <button onClick={async () => {
//         await unblockUser(currentUserId, b.blockedUser.id);
//         fetchBlockedUsers(); // refresh the list immediately
//       }}>
//         Unblock
//       </button>
//     </div>
//   ))}


//   return (
//     <div className="container">
//       <div className="sidebar">
//         <h2>Conversations</h2>
//         {conversations.map((c) => {
//           const otherUser = c.user1.id === CURRENT_USER_ID ? c.user2 : c.user1;
//           return (
//             <div
//               key={c.id}
//               className={`conversation-item ${selectedConversation?.id === c.id ? "active" : ""}`}
//               onClick={() => fetchMessages(c)}
//             >
//               {otherUser.username}
//             </div>
//           );
//         })}
//       </div>

//       <div className="chat-area">
//         <div className="top-buttons">
//           {selectedConversation && (
//             <>
//               <button onClick={() => handleBlock(
//                 selectedConversation.user1.id === CURRENT_USER_ID
//                   ? selectedConversation.user2.id
//                   : selectedConversation.user1.id
//               )}>
//                 Block
//               </button>
//               <button onClick={() => fetchBlockedUsers()}>
//                 Show Blocked Users
//               </button>
//             </>
//           )}
//         </div>

//         <div className="messages">
//           {messages.map((m) => (
//             <div key={m.id} className={`message ${m.sender.id === CURRENT_USER_ID ? "me" : ""}`}>
//               <span className="username">{m.sender.username}:</span> {m.content}
//             </div>
//           ))}
//         </div>

//         <div className="input-area">
//           <input
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Type a message..."
//           />
//           <button onClick={handleSend}>Send</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;


import React, { useEffect, useState } from "react";
import { getConversations, getMessages, sendMessage } from "./api/chatApi";
import { blockUser, unblockUser, getBlockedUsers } from "./api/userApi";
import { socket } from "./socket";

const CURRENT_USER_ID = 1; // set your current userId

const App = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [blockedUsers, setBlockedUsers] = useState([]);

  useEffect(() => {
    fetchConversations();
    fetchBlockedUsers();
    socket.connect();

    socket.on("message:new", (msg) => {
      if (selectedConversation && msg.conversationId === selectedConversation.id) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => socket.disconnect();
  }, [selectedConversation]);

  const fetchConversations = async () => {
    const data = await getConversations(CURRENT_USER_ID);
    setConversations(data);
  };

  const fetchMessages = async (conversation) => {
    setSelectedConversation(conversation);
    const data = await getMessages(conversation.id);
    setMessages(data);
  };

  const fetchBlockedUsers = async () => {
    try {
      const { data } = await getBlockedUsers(CURRENT_USER_ID);
      if (Array.isArray(data)) {
        setBlockedUsers(data);
      } else {
        setBlockedUsers([]);
      }
    } catch (err) {
      console.error("Failed to fetch blocked users:", err);
    }
  };

    const handleSend = async () => {
    if (!input.trim() || !selectedConversation) return;

    const otherUser = selectedConversation.user1.id === CURRENT_USER_ID
        ? selectedConversation.user2
        : selectedConversation.user1;

    const isBlocked = blockedUsers.some(b => b.blockedUser.id === otherUser.id);
    if (isBlocked) {
        alert("You cannot send a message to a user you have blocked.");
        return;
    }

    try {
        const msg = await sendMessage(selectedConversation.id, CURRENT_USER_ID, input);
        setMessages(prev => [...prev, msg]);
        setInput("");
    } catch (err) {
        console.error("Failed to send message:", err);
        alert("Cannot send message. Maybe the user is blocked.");
    }
    };


  const handleBlock = async (userId) => {
    await blockUser(CURRENT_USER_ID, userId);
    fetchBlockedUsers();
  };

  const handleUnblock = async (userId) => {
    await unblockUser(CURRENT_USER_ID, userId);
    fetchBlockedUsers();
  };

  return (
    <div className="container" style={{ display: "flex", gap: 20 }}>
      {/* Sidebar */}
      <div className="sidebar" style={{ width: 250 }}>
        <h2>Conversations</h2>
        {conversations.map((c) => {
          const otherUser = c.user1.id === CURRENT_USER_ID ? c.user2 : c.user1;
          return (
            <div
              key={c.id}
              style={{
                cursor: "pointer",
                fontWeight: selectedConversation?.id === c.id ? "bold" : "normal",
                marginBottom: 5
              }}
              onClick={() => fetchMessages(c)}
            >
              {otherUser.username}
            </div>
          );
        })}

        <h3>Blocked Users</h3>
        {blockedUsers.length === 0 && <p>No blocked users</p>}
        {blockedUsers.map((b) => (
          <div key={b.blockedUser.id} style={{ marginBottom: 5 }}>
            {b.blockedUser.username}{" "}
            <button onClick={() => handleUnblock(b.blockedUser.id)}>
              Unblock
            </button>
          </div>
        ))}
      </div>

      {/* Chat Area */}
      <div className="chat-area" style={{ flex: 1 }}>
        <div className="top-buttons">
          {selectedConversation && (
            <button
              onClick={() =>
                handleBlock(
                  selectedConversation.user1.id === CURRENT_USER_ID
                    ? selectedConversation.user2.id
                    : selectedConversation.user1.id
                )
              }
            >
              Block
            </button>
          )}
        </div>

        <div className="messages" style={{ border: "1px solid #ccc", height: 400, overflowY: "scroll", padding: 10 }}>
          {messages.map((m) => (
            <div key={m.id} className={`message ${m.sender.id === CURRENT_USER_ID ? "me" : ""}`}>
              <span className="username">{m.sender.username}:</span> {m.content}
            </div>
          ))}
        </div>

        <div className="input-area" style={{ marginTop: 10 }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            style={{ width: "70%", marginRight: 5 }}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default App;

