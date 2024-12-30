import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Signin from "./Signin";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/register" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
