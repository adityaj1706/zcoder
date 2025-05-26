import React, { useState, useEffect } from "react";
import { useTheme } from "../App";

export default function Profile() {
  const { theme } = useTheme();
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [authMode, setAuthMode] = useState("login"); // "login" or "signup"
  const [solvedProblems, setSolvedProblems] = useState([
    "Two Sum",
    "Reverse Linked List",
    "Valid Parentheses",
  ]);
  const [bookmarkedProblems, setBookmarkedProblems] = useState([]);

  useEffect(() => {
    const bookmarks = JSON.parse(
      localStorage.getItem("bookmarkedProblems") || "[]"
    );
    setBookmarkedProblems(bookmarks);
  }, []);

  // Mock login handler
  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      setUser({ name: username });
      setUsername("");
      setPassword("");
    }
  };

  // Mock signup handler
  const handleSignup = (e) => {
    e.preventDefault();
    if (name.trim() && username.trim() && signupEmail.trim() && signupPassword.trim()) {
  setUser({ name }); // Use name instead of username
  setName("");
  setUsername("");
  setSignupEmail("");
  setSignupPassword("");
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
        ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}
      >
        <div
          className={`rounded-xl p-8 w-full max-w-md border transition-colors duration-300
          ${theme === "dark"
            ? "bg-[#1c1f26] text-white border-gray-700 shadow-[0_0_20px_rgba(0,0,0,0.6)]"
            : "bg-white text-gray-900 border-gray-200 shadow-lg"}`}
        >
          {authMode === "login" ? (
            <>
              <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>
              <form onSubmit={handleLogin}>
                <input
                  className={`w-full px-4 py-3 rounded-lg border mb-4 transition-all duration-200 focus:outline-none
                  ${theme === "dark"
                    ? "bg-gray-800 text-white placeholder-gray-400 border-gray-600 focus:ring-2 focus:ring-blue-600"
                    : "bg-gray-50 text-gray-900 border-gray-300 focus:ring-2 focus:ring-blue-500"}`}
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                />
                <input
                  type="password"
                  className={`w-full px-4 py-3 rounded-lg border mb-2 transition-all duration-200 focus:outline-none
                  ${theme === "dark"
                    ? "bg-gray-800 text-white placeholder-gray-400 border-gray-600 focus:ring-2 focus:ring-blue-600"
                    : "bg-gray-50 text-gray-900 border-gray-300 focus:ring-2 focus:ring-blue-500"}`}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <div className="flex justify-between items-center mb-4">
                  <button
                    type="button"
                    className="text-xs text-blue-600 hover:underline"
                    onClick={() => alert("Password reset link sent (mock)!")}
                  >
                    Forgot password?
                  </button>
                  <button
                    type="button"
                    className="text-xs text-blue-600 hover:underline"
                    onClick={() => setAuthMode("signup")}
                  >
                    Sign up
                  </button>
                </div>
                <button
                  type="submit"
                  className={`w-full font-semibold py-3 rounded-lg mt-2 transition-all
                  ${theme === "dark"
                    ? "bg-blue-700 hover:bg-blue-800 text-white shadow hover:shadow-lg"
                    : "bg-blue-600 hover:bg-blue-700 text-white shadow hover:shadow-md"}`}
                >
                  Log In
                </button>
              </form>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
              <form onSubmit={handleSignup}>
                <input
                  className={`w-full px-4 py-3 rounded-lg border mb-4 transition-all duration-200 focus:outline-none
                  ${theme === "dark"
                    ? "bg-gray-800 text-white placeholder-gray-400 border-gray-600 focus:ring-2 focus:ring-blue-600"
                    : "bg-gray-50 text-gray-900 border-gray-300 focus:ring-2 focus:ring-blue-500"}`}
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
                <input
                  className={`w-full px-4 py-3 rounded-lg border mb-4 transition-all duration-200 focus:outline-none
                  ${theme === "dark"
                    ? "bg-gray-800 text-white placeholder-gray-400 border-gray-600 focus:ring-2 focus:ring-blue-600"
                    : "bg-gray-50 text-gray-900 border-gray-300 focus:ring-2 focus:ring-blue-500"}`}
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                />
                <input
                  type="email"
                  className={`w-full px-4 py-3 rounded-lg border mb-4 transition-all duration-200 focus:outline-none
                  ${theme === "dark"
                    ? "bg-gray-800 text-white placeholder-gray-400 border-gray-600 focus:ring-2 focus:ring-blue-600"
                    : "bg-gray-50 text-gray-900 border-gray-300 focus:ring-2 focus:ring-blue-500"}`}
                  placeholder="Email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  autoComplete="email"
                />
                <input
                  type="password"
                  className={`w-full px-4 py-3 rounded-lg border mb-2 transition-all duration-200 focus:outline-none
                  ${theme === "dark"
                    ? "bg-gray-800 text-white placeholder-gray-400 border-gray-600 focus:ring-2 focus:ring-blue-600"
                    : "bg-gray-50 text-gray-900 border-gray-300 focus:ring-2 focus:ring-blue-500"}`}
                  placeholder="Create Password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  autoComplete="new-password"
                />
                <div className="flex justify-end items-center mb-4">
                  <button
                    type="button"
                    className="text-xs text-blue-600 hover:underline"
                    onClick={() => setAuthMode("login")}
                  >
                    Back to login
                  </button>
                </div>
                <button
                  type="submit"
                  className={`w-full font-semibold py-3 rounded-lg mt-2 transition-all
                  ${theme === "dark"
                    ? "bg-blue-700 hover:bg-blue-800 text-white shadow hover:shadow-lg"
                    : "bg-blue-600 hover:bg-blue-700 text-white shadow hover:shadow-md"}`}
                >
                  Sign Up
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    );
  }
  return (
    <div
      className={`max-w-2xl mx-auto mt-12 p-6 rounded-lg shadow-lg transition-colors duration-300
      ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
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