import React, { useState, createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProblemsHub from "./pages/Problems/ProblemsHub";
import ProblemDetail from "./pages/Problems/ProblemDetail";
import Editor from "./pages/editor";
import Profile from "./pages/Profile";
import Rooms from "./pages/Rooms"; // <-- Import the Rooms page

// Theme context
const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

function App() {
  const [theme, setTheme] = useState("light"); // 'light' or 'dark'

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === "dark" ? "dark bg-gray-900 text-white min-h-screen" : "bg-white text-gray-900 min-h-screen"}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/practice" element={<div>Practice Page</div>} />
            <Route path="/rooms" element={<Rooms />} /> {/* <-- Use the Rooms component */}
            <Route path="/editor" element={<Editor />} />
          </Routes>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;