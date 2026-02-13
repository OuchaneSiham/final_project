import React from "react";
import { Routes, Route } from "react-router-dom";
import Chat from "./pages/chat/Chat";
import Landing from "./pages/LandingPage";
import Friend from "./pages/Friends";
import Profile from "./pages/Profile";

function App() {
  return (

      <div>
        <Routes>
          <Route path="/" element={<Profile />} />
        </Routes>

      </div>
  );
}
export default App;