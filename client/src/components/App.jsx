import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Signup from "./Signup";
import Signin from "./Signin";
import HomePage from "./HomePage";
import CheckList from "./CheckList";
import Settings from "./Settings";
import Account from "./Account";
import Emergency from "./Emergency";
import Chat from "./Chat";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("token");
    return storedUser ? { userID: storedUser } : null;
  });

  return (
    <Router>
      <div className="App">
        {user && <Header user={user} />}

        <Routes>
          <Route path="/signin" element={<Signin setUser={setUser} />} />
          <Route path="/register" element={<Signup />} />

          <Route
            path="/chat"
            element={
              <ProtectedRoute user={user}>
                <Chat user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute user={user}>
                <HomePage user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checklist"
            element={
              <ProtectedRoute user={user}>
                <CheckList user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute user={user}>
                <Settings user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute user={user}>
                <Account user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/emergency"
            element={
              <ProtectedRoute user={user}>
                <Emergency user={user} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
