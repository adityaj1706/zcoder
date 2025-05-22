import React, { useState } from "react";
import { useTheme } from "../App"; // Import the theme context

export default function Profile() {
  const { theme } = useTheme(); // Get current theme

  // Mock state for authentication and solved problems
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [solvedProblems, setSolvedProblems] = useState([
    "Two Sum",
    "Reverse Linked List",
    "Valid Parentheses",
  ]);

  // Mock login/signup handler
  const handleLogin = () => {
    if (username.trim()) {
      setUser({ name: username });
    }
  };

  if (!user) {
    return (
      <div
        className={`flex flex-col items-center justify-center min-h-[60vh] transition-colors duration-300
        ${
          theme === "dark"
            ? "bg-gray-900 text-white"
            : "bg-gray-100 text-gray-900"
        }`}
      >
        <h2 className="text-2xl font-semibold mb-4">Sign Up / Log In</h2>
        <input
          className={`border px-4 py-2 rounded mb-2 outline-none transition-colors duration-300
            ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-semibold transition"
          onClick={handleLogin}
        >
          Continue
        </button>
      </div>
    );
  }

  return (
    <div
      className={`max-w-xl mx-auto mt-10 p-6 rounded shadow transition-colors duration-300
      ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-white text-gray-900"
      }`}
    >
      <h2 className="text-2xl font-semibold mb-2">Welcome, {user.name}!</h2>
      <h3 className="text-lg font-bold mt-6 mb-2">Solved Problems:</h3>
      <ul className="list-disc ml-6">
        {solvedProblems.length === 0 ? (
          <li>No problems solved yet.</li>
        ) : (
          solvedProblems.map((prob, idx) => <li key={idx}>{prob}</li>)
        )}
      </ul>
    </div>
  );
}
