import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/profile/:userId" element={<div>Profile Page</div>} />
          <Route path="/practice" element={<div>Practice Page</div>} />
          <Route path="/rooms" element={<div>Interactive Rooms Page</div>} />
          <Route path="/editor" element={<div>Editor Page</div>} />        
        {/* Add more pages like profile, practice, rooms later */}
      </Routes>
    </Router>
  );
}

export default App;
