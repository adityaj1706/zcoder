import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProblemsHub from "./pages/Problems/ProblemsHub";
import ProblemDetail from "./pages/Problems/ProblemDetail";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:userId" element={<div>Profile Page</div>} />
        <Route path="/practice" element={<div>Practice Page</div>} />
        <Route path="/rooms" element={<div>Interactive Rooms Page</div>} />
        <Route path="/editor" element={<div>Editor Page</div>} />
        <Route path="/problems" element={<ProblemsHub />} />
        <Route path="/problems/:id" element={<ProblemDetail />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
