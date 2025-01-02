import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Signin from "./Signin";
import Chat from "./Chat";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="App">

        <Routes>
          <Route path="/" element={<Signin setUser={setUser}/>} />
          <Route path="/register" element={<Signup />} />
          <Route path="/chat" element={<Chat user={user}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
