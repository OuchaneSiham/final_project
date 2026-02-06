import React from "react";
import { Routes, Route } from "react-router-dom";
// import Tto from './pages/tto/index.jsx';
import GameLobby from './pages/GameLobby/index';
import Chat from "./pages/chat/Chat";
function App() {
  return (

      <div>
        <Routes>
          {/* <Route path="/" element={<Tto />} /> */}
          {/* <Route path="/GameLobby" element={<GameLobby />} /> */}
          <Route path="/Chat" element={<Chat />} />
        </Routes>

      </div>
  );
}
export default App;