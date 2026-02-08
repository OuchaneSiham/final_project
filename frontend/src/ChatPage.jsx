

import React, { useEffect, useState } from "react";
import { getConversations, getMessages, sendMessage } from "./api/chatApi";
import { blockUser, unblockUser, getBlockedUsers } from "./api/userApi";
import { socket } from "./socket";

const CURRENT_USER_ID = 1;

const ChatPage = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [blockedUsers, setBlockedUsers] = useState([]);

  useEffect(() => {
    socket.connect();

    socket.on("message:new", (msg) => {
      if (selectedConversation && msg.conversationId === selectedConversation.id) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => socket.disconnect();
  }, [selectedConversation]);

  useEffect(() => {
    fetchConversations();
    fetchBlockedUsers();
  }, []);

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
      setBlockedUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch blocked users", err);
    }
  };

  const otherUser =
    selectedConversation &&
    (selectedConversation.user1.id === CURRENT_USER_ID
      ? selectedConversation.user2
      : selectedConversation.user1);

  const isBlocked =
    otherUser &&
    blockedUsers.some((b) => b.blockedUser.id === otherUser.id);

  const handleSend = async () => {
    if (!input.trim() || !selectedConversation) return;

    if (isBlocked) {
      alert("You cannot send messages to a blocked user.");
      return;
    }

    try {
      const msg = await sendMessage(
        selectedConversation.id,
        CURRENT_USER_ID,
        input
      );
      setMessages((prev) => [...prev, msg]);
      setInput("");
    } catch (err) {
      console.error("Failed to send message:", err);
      alert("Message failed (user may be blocked)");
    }
  };

  const handleBlock = async (userId) => {
    await blockUser(CURRENT_USER_ID, userId);
    await fetchBlockedUsers();
  };

  const handleUnblock = async (blockedUserId) => {
    try {
      await unblockUser(CURRENT_USER_ID, blockedUserId);
      fetchBlockedUsers(); // refresh list
    } catch (err) {
      console.error("Failed to unblock user:", err);
      alert("Cannot unblock user");
    }
  };


  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* ========== SIDEBAR ========== */}
      <div style={{ width: 260, borderRight: "1px solid #ccc", padding: 10 }}>
        <h3>Conversations</h3>
        {conversations.map((c) => {
          const user =
            c.user1.id === CURRENT_USER_ID ? c.user2 : c.user1;

          return (
            <div
              key={c.id}
              onClick={() => fetchMessages(c)}
              style={{
                cursor: "pointer",
                padding: 5,
                fontWeight:
                  selectedConversation?.id === c.id ? "bold" : "normal",
              }}
            >
              {user.username}
            </div>
          );
        })}

        <hr />

        <h3>Blocked Users</h3>
        {blockedUsers.length === 0 && <p>No blocked users</p>}

        {blockedUsers.map((b) => (
          <div key={b.blockedUser.id}>
            {b.blockedUser.username}
            <button
              style={{ marginLeft: 5 }}
              onClick={() => handleUnblock(b.blockedUser.id)}
            >
              Unblock
            </button>
          </div>
        ))}
      </div>

      {/* ========== CHAT AREA ========== */}
      <div style={{ flex: 1, padding: 10 }}>
        {selectedConversation ? (
          <>
            {/* TOP BUTTONS */}
            <div style={{ marginBottom: 10 }}>
              {!isBlocked && (
                <button onClick={() => handleBlock(otherUser.id)}>
                  Block
                </button>
              )}

              {isBlocked && (
                <button onClick={() => handleUnblock(otherUser.id)}>
                  Unblock
                </button>
              )}
            </div>

            {/* MESSAGES */}
            <div
              style={{
                border: "1px solid #ccc",
                height: 400,
                overflowY: "auto",
                padding: 10,
              }}
            >
              {messages.map((m) => (
                <div key={m.id}>
                  <strong>{m.sender.username}:</strong> {m.content}
                </div>
              ))}
            </div>

            {/* INPUT */}
            <div style={{ marginTop: 10 }}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isBlocked}
                placeholder={
                  isBlocked
                    ? "You have blocked this user"
                    : "Type a message..."
                }
                style={{ width: "70%" }}
              />
              <button onClick={handleSend} disabled={isBlocked}>
                Send
              </button>
            </div>
          </>
        ) : (
          <p>Select a conversation</p>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
