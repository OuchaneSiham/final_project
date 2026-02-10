import React from "react";
import { Routes, Route } from "react-router-dom";
import Chat from "./pages/chat/Chat";
import Landing from "./pages/LandingPage";
import Friend from "./pages/Friends";
import MessageBubble from "./components/chat/MessageBubble"; //For testing purposes
function App() {
  return (

      <div>
        <Routes>
          <Route path="/" element={<MessageBubble />} />
        </Routes>

      </div>
  );
}
export default App;