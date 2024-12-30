import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header';
import Signup from './Signup';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Signup />
      </div>
    </Router>
  );
}

export default App;
