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

function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
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
        {/* Nebula background */}
        <div className="code-galaxy-bg">
          <div
            className="code-galaxy-snippet"
            style={{
              top: "10%",
              left: "4%",
              fontSize: "1.1rem",
              transform: "rotate(-7deg)",
            }}
          >
            {`function greet() {\n  console.log("Hello, Galaxy!");\n}`}
          </div>
          <div
            className="code-galaxy-snippet"
            style={{
              top: "60%",
              left: "90%",
              fontSize: "1.3rem",
              transform: "rotate(12deg)",
            }}
          >
            {`int x=10;`}
          </div>
          <div
            className="code-galaxy-snippet"
            style={{
              top: "45%",
              left: "40%",
              fontSize: "1.5rem",
              transform: "rotate(-3deg)",
            }}
          >
            {`// Explore the code universe`}
          </div>
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
