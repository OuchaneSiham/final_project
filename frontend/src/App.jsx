import React from "react";
import { Routes, Route } from "react-router-dom";
import Tto from './pages/tto/index.jsx';

function App() {
  return (

      <div>
        <Routes>
          <Route path="/" element={<Tto />} />
          <Route path="/tto" element={<Tto />} /> 
        </Routes>

      </div>
  );
}
export default App;