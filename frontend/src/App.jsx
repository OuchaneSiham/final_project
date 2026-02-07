import React from "react";
import { Routes, Route } from "react-router-dom";
import Chat from "./pages/chat/Chat";
import Landing from "./pages/LandingPage";

function App() {
  return (

      <div>
        <Routes>
          {/* <Route path="/" element={<Tto />} /> */}
          {/* <Route path="/GameLobby" element={<GameLobby />} /> */}
          <Route path="/" element={<Landing />} />
        </Routes>

      </div>
  );
}
export default App;