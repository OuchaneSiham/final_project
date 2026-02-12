import React from "react";
import { Routes, Route } from "react-router-dom";
import Chat from "./pages/chat/Chat";
import Landing from "./pages/LandingPage";
import Friend from "./pages/Friends";
import Profile from "./pages/Profile";
import Login from "./pages/Auth/Login"
import SignUp from "./pages/Auth/register";
function App() {
  return (

    // <GoogleOAuthProvider clientId="470373993744-tjq6l6bk7ikvbvl46vpbd12pcqepuctb.apps.googleusercontent.com">     
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
    // </GoogleOAuthProvider> 

  );
}
export default App;