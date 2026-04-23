import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Login from './components/Login'; // Import Login component
import Reset from './components/Reset'; // Import Reset component
import Dashboard from './components/Dashboard'; // Import Dashboard component
import Signup from './components/Signup'; // Import Signup component
import MakeNewPass from './components/MakeNewPass'; // Import MakeNewPass component
import Chatbot from './components/chatbot'; // Import Chatbot component

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Login />} /> {/* Route for Login */}
            <Route path="/dashboard" element={<Dashboard />} /> {/* Route for Dashboard */}
            <Route path="/reset" element={<Reset />} /> {/* Route for Reset */}
            <Route path="/signup" element={<Signup />} /> {/* Route for Signup */}
            <Route path="/makenewpass" element={<MakeNewPass />} /> {/* Route for MakeNewPass */}
            <Route path="/chatbot" element={<Chatbot />} /> {/* Add this line */}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
