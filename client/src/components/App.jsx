import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Signin from "./Signin";
import HomePage from "./HomePage";
import CheckList from "./CheckList";
import Settings from "./Settings";
import Account from "./Account";
import Emergency from "./Emergency";
import Chat from "./Chat";
import TaskPath from "./TaskPath";

function App() {
  const [user, setUser] = useState(null);
  return (
    <Router>
      <div className="App">

        <Routes>
          <Route path="/login" element={<Signin setUser={setUser}/>} />
          <Route path="/chat" element={<Chat user={user}/>} />
          <Route path="/home" element={<HomePage user={user} />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/checklist" element={<CheckList user={user} />} />
          <Route path="/settings" element={<Settings user={user} />} />
          <Route path="/account" element={<Account user={user} />} />
          <Route path="/emergency" element={<Emergency user={user} />} />
          <Route path="/TaskPath" element={<TaskPath user={user} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

