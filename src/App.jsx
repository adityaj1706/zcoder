import React, { useState, createContext, useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProblemsHub from "./pages/Problems/ProblemsHub";
import Editor from "./pages/editor";
import Profile from "./pages/Profile";
import Rooms from "./pages/Rooms";

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

// Code symbols that drift up in the background
const symbols = [
  { text: "{ }", left: "6%", size: "1.6rem", duration: "26s", delay: "0s" },
  { text: "</>", left: "18%", size: "1.2rem", duration: "32s", delay: "-8s" },
  { text: "=>", left: "31%", size: "1.4rem", duration: "24s", delay: "-15s" },
  { text: "O(n)", left: "45%", size: "1.1rem", duration: "30s", delay: "-4s" },
  { text: "[ ]", left: "58%", size: "1.5rem", duration: "27s", delay: "-19s" },
  { text: "&&", left: "70%", size: "1.2rem", duration: "34s", delay: "-11s" },
  { text: "++", left: "82%", size: "1.4rem", duration: "25s", delay: "-2s" },
  { text: "//", left: "93%", size: "1.3rem", duration: "29s", delay: "-22s" },
];

const getInitialTheme = () => {
  try {
    return localStorage.getItem("theme") === "light" ? "light" : "dark";
  } catch (e) {
    return "dark";
  }
};

function App() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {
      // ignore storage errors
    }
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        className={`relative min-h-screen ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}
      >
        {/* Animated background */}
        <div className="zc-bg" aria-hidden="true">
          <div className="zc-grid" />
          <div className="zc-orb a" />
          <div className="zc-orb b" />
          <div className="zc-orb c" />
          {symbols.map((s, i) => (
            <span
              key={i}
              className="zc-sym"
              style={{
                left: s.left,
                fontSize: s.size,
                animationDuration: s.duration,
                animationDelay: s.delay,
              }}
            >
              {s.text}
            </span>
          ))}
        </div>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/rooms/:problemId" element={<Rooms />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/problems" element={<ProblemsHub />} />
            <Route path="/problems/:id" element={<Editor />} />
          </Routes>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
