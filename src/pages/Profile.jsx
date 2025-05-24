import React, { useState, useEffect } from "react";
import { useTheme } from "../App";

export default function Profile() {
  const { theme } = useTheme();
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [solvedProblems, setSolvedProblems] = useState([
    "Two Sum",
    "Reverse Linked List",
    "Valid Parentheses",
  ]);
  const [bookmarkedProblems, setBookmarkedProblems] = useState([]);

  // Load bookmarks from localStorage
  useEffect(() => {
    const bookmarks = JSON.parse(
      localStorage.getItem("bookmarkedProblems") || "[]"
    );
    setBookmarkedProblems(bookmarks);
  }, []);

  // Mock login/signup handler
  const handleLogin = () => {
    if (username.trim()) {
      setUser({ name: username });
    }
  };

  // Calculate progress (example: total problems = 10)
  const totalProblems = 10;
  const solvedCount = solvedProblems.length;
  const progressPercent = Math.round((solvedCount / totalProblems) * 100);

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
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Sign Up / Log In
          </h2>
          <input
            className={`border px-4 py-2 rounded mb-4 w-full outline-none transition-colors duration-300
              ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-gray-50 border-gray-300 text-gray-900"
              }`}
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            className="w-full bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-950 font-semibold transition"
            onClick={handleLogin}
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`max-w-2xl mx-auto mt-12 p-6 rounded-lg shadow-lg transition-colors duration-300
      ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-white text-gray-900"
      }`}
    >
      <div className="flex items-center mb-8">
        <div className="bg-blue-900 text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl font-bold mr-6 shadow">
          {user.name[0].toUpperCase()}
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-1">Welcome, {user.name}!</h2>
          <div className="text-gray-500 dark:text-gray-300">
            Your coding journey starts here 🚀
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div
        className={`mb-8 p-5 rounded-lg shadow transition-colors duration-300 flex flex-col items-center
        ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}
      >
        <div className="flex items-center mb-2">
          <span className="text-blue-900 text-2xl mr-2">📈</span>
          <h3 className="text-lg font-semibold">Progress</h3>
        </div>
        <div className="w-full">
          <div className="flex justify-between text-sm mb-1">
            <span>
              {solvedCount} of {totalProblems} problems solved
            </span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-3">
            <div
              className="bg-blue-900 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Solved Problems Card */}
        <div
          className={`rounded-lg shadow p-5 transition-colors duration-300 ${
            theme === "dark" ? "bg-gray-800" : "bg-gray-100"
          }`}
        >
          <div className="flex items-center mb-3">
            <span className="text-green-500 text-2xl mr-2">✔</span>
            <h3 className="text-lg font-semibold">Solved Problems</h3>
          </div>
          <ul className="list-disc ml-6">
            {solvedProblems.length === 0 ? (
              <li className="text-gray-400">No problems solved yet.</li>
            ) : (
              solvedProblems.map((prob, idx) => <li key={idx}>{prob}</li>)
            )}
          </ul>
        </div>

        {/* Bookmarked Problems Card */}
        <div
          className={`rounded-lg shadow p-5 transition-colors duration-300 ${
            theme === "dark" ? "bg-gray-800" : "bg-gray-100"
          }`}
        >
          <div className="flex items-center mb-3">
            <span className="text-yellow-400 text-2xl mr-2">★</span>
            <h3 className="text-lg font-semibold">Bookmarked Problems</h3>
          </div>
          <ul className="list-disc ml-6">
            {bookmarkedProblems.length === 0 ? (
              <li className="text-gray-400">No bookmarked problems yet.</li>
            ) : (
              bookmarkedProblems.map((prob, idx) => <li key={idx}>{prob}</li>)
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}