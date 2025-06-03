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
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    const bookmarks = JSON.parse(
      localStorage.getItem("bookmarkedProblems") || "[]"
    );
    setBookmarkedProblems(bookmarks);
  }, []);

  useEffect(() => {
    if (user) {
      const fetchUserStats = async () => {
        try {
          const res = await fetch(`/api/userstats?user=${user.username}`);
          const data = await res.json();
          // Assume your backend returns { solved: [...], bookmarks: [...] }
          setSolvedProblems(data.solved || []);
          setBookmarkedProblems(data.bookmarks || []);
        } catch (err) {
          console.error("Error fetching user stats:", err);
        }
      };
      fetchUserStats();
      const intervalId = setInterval(fetchUserStats, 5000); // Poll every 5 seconds
      return () => clearInterval(intervalId);
    }
  }, [user]);

  // Updated login handler to send data to the backend
  const handleLogin = async (e) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      try {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        if (response.ok) {
          const loggedInUser = {
            username: username,
            name: data.name || username,
          };
          setUser(loggedInUser);
          localStorage.setItem("user", JSON.stringify(loggedInUser));
          setUsername("");
          setPassword("");
          alert(data.message);
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Login error:", error);
        alert("An error occurred during login");
      }
    } else {
      alert("Please enter both username and password");
    }
  };

  // Updated signup handler to send data to the backend
  const handleSignup = async (e) => {
    e.preventDefault();
    if (
      name.trim() &&
      username.trim() &&
      signupEmail.trim() &&
      signupPassword.trim()
    ) {
      try {
        const response = await fetch("/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            name,
            email: signupEmail,
            password: signupPassword,
          }),
        });
        const data = await response.json();
        if (response.ok) {
          const newUser = { username, name };
          setUser(newUser);
          localStorage.setItem("user", JSON.stringify(newUser));
          setName("");
          setUsername("");
          setSignupEmail("");
          setSignupPassword("");
          alert(data.message);
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Signup error:", error);
        alert("An error occurred during signup");
      }
    } else {
      alert("Please enter all required fields");
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
          ${theme === "dark" ? " text-white" : " text-gray-900"}`}
      >
        <div
          className={`rounded-xl p-8 w-full max-w-md border transition-colors duration-300
          ${
            theme === "dark"
              ? "bg-[#1c1f26] text-white border-gray-700 shadow-[0_0_20px_rgba(0,0,0,0.6)]"
              : "bg-white text-gray-900 border-gray-200 shadow-lg"
          }`}
        >
          {authMode === "login" ? (
            <>
              <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>
              <form onSubmit={handleLogin}>
                <input
                  className={`w-full px-4 py-3 rounded-lg border mb-4 transition-all duration-200 focus:outline-none
                  ${
                    theme === "dark"
                      ? "bg-gray-800 text-white placeholder-gray-400 border-gray-600 focus:ring-2 focus:ring-blue-600"
                      : "bg-gray-50 text-gray-900 border-gray-300 focus:ring-2 focus:ring-blue-500"
                  }`}
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                />
                <input
                  type="password"
                  className={`w-full px-4 py-3 rounded-lg border mb-2 transition-all duration-200 focus:outline-none
                  ${
                    theme === "dark"
                      ? "bg-gray-800 text-white placeholder-gray-400 border-gray-600 focus:ring-2 focus:ring-blue-600"
                      : "bg-gray-50 text-gray-900 border-gray-300 focus:ring-2 focus:ring-blue-500"
                  }`}
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
                  ${
                    theme === "dark"
                      ? "bg-blue-700 hover:bg-blue-800 text-white shadow hover:shadow-lg"
                      : "bg-blue-600 hover:bg-blue-700 text-white shadow hover:shadow-md"
                  }`}
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
                  ${
                    theme === "dark"
                      ? "bg-gray-800 text-white placeholder-gray-400 border-gray-600 focus:ring-2 focus:ring-blue-600"
                      : "bg-gray-50 text-gray-900 border-gray-300 focus:ring-2 focus:ring-blue-500"
                  }`}
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
                <input
                  className={`w-full px-4 py-3 rounded-lg border mb-4 transition-all duration-200 focus:outline-none
                  ${
                    theme === "dark"
                      ? "bg-gray-800 text-white placeholder-gray-400 border-gray-600 focus:ring-2 focus:ring-blue-600"
                      : "bg-gray-50 text-gray-900 border-gray-300 focus:ring-2 focus:ring-blue-500"
                  }`}
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                />
                <input
                  type="email"
                  className={`w-full px-4 py-3 rounded-lg border mb-4 transition-all duration-200 focus:outline-none
                  ${
                    theme === "dark"
                      ? "bg-gray-800 text-white placeholder-gray-400 border-gray-600 focus:ring-2 focus:ring-blue-600"
                      : "bg-gray-50 text-gray-900 border-gray-300 focus:ring-2 focus:ring-blue-500"
                  }`}
                  placeholder="Email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  autoComplete="email"
                />
                <input
                  type="password"
                  className={`w-full px-4 py-3 rounded-lg border mb-2 transition-all duration-200 focus:outline-none
                  ${
                    theme === "dark"
                      ? "bg-gray-800 text-white placeholder-gray-400 border-gray-600 focus:ring-2 focus:ring-blue-600"
                      : "bg-gray-50 text-gray-900 border-gray-300 focus:ring-2 focus:ring-blue-500"
                  }`}
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
                  ${
                    theme === "dark"
                      ? "bg-blue-700 hover:bg-blue-800 text-white shadow hover:shadow-lg"
                      : "bg-blue-600 hover:bg-blue-700 text-white shadow hover:shadow-md"
                  }`}
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
      className={`max-w-5xl mx-auto mt-12 p-4 md:p-8 rounded-2xl shadow-2xl transition-colors duration-300 flex flex-col md:flex-row gap-10
      ${theme === "dark" ? " text-white" : "text-gray-900"}`}
    >
      {/* Left Section: User & Progress */}
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
        <div className="flex flex-col items-center md:items-start mb-10">
          <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white rounded-full w-24 h-24 flex items-center justify-center text-5xl font-extrabold mb-4 shadow-lg border-4 border-blue-200 dark:border-gray-700">
            {user.username[0].toUpperCase()}
          </div>
          <h2 className="text-3xl font-extrabold mb-1 tracking-tight text-blue-900 dark:text-blue-200">
            {user.username}
          </h2>
          <div className="text-base text-gray-500 dark:text-gray-300 mb-2">
            Welcome back, coder! 🚀
          </div>
        </div>
        <div
          className={`w-full mb-8 p-6 rounded-xl shadow-lg flex flex-col items-center bg-gradient-to-br
          ${
            theme === "dark"
              ? "from-gray-800 to-gray-900"
              : "from-blue-100 to-blue-200"
          }`}
        >
          <div className="flex items-center mb-4">
            <span className="text-blue-900 dark:text-blue-300 text-2xl mr-2">
              📈
            </span>
            <h3 className="text-xl font-semibold">Progress</h3>
          </div>
          <div className="w-full flex flex-col items-center">
            <div className="relative w-28 h-28 flex items-center justify-center mb-2">
              <svg className="w-28 h-28">
                <circle
                  className="text-gray-300 dark:text-gray-700"
                  strokeWidth="10"
                  stroke="currentColor"
                  fill="transparent"
                  r="50"
                  cx="56"
                  cy="56"
                />
                <circle
                  className="text-blue-700 dark:text-blue-400"
                  strokeWidth="10"
                  strokeDasharray={314.16}
                  strokeDashoffset={314.16 - (progressPercent / 100) * 314.16}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="50"
                  cx="56"
                  cy="56"
                  style={{
                    transition:
                      "stroke-dashoffset 0.6s cubic-bezier(.4,2,.6,1)",
                  }}
                />
              </svg>
              <span className="absolute text-2xl font-extrabold text-blue-900 dark:text-blue-200">
                {progressPercent}%
              </span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-semibold">{solvedCount}</span> of{" "}
              <span className="font-semibold">{totalProblems}</span> problems
              solved
            </div>
          </div>
        </div>
      </div>

      {/* Right Section: Solved & Bookmarked Problems */}
      <div className="w-full md:w-1/2 flex flex-col gap-8">
        <div
          className={`rounded-xl shadow-lg p-6 bg-gradient-to-br
          ${
            theme === "dark"
              ? "from-gray-800 to-gray-900"
              : "from-green-50 to-green-100"
          }`}
        >
          <div className="flex items-center mb-4">
            <span className="text-green-500 text-2xl mr-2">✔</span>
            <h3 className="text-lg font-bold">Solved Problems</h3>
          </div>
          <ul className="list-disc ml-6 max-h-32 overflow-y-auto custom-scrollbar">
            {solvedProblems.length === 0 ? (
              <li className="text-gray-400">No problems solved yet.</li>
            ) : (
              solvedProblems.map((prob, idx) => (
                <li key={idx} className="mb-1 text-gray-800 dark:text-gray-200">
                  {prob}
                </li>
              ))
            )}
          </ul>
        </div>
        <div
          className={`rounded-xl shadow-lg p-6 bg-gradient-to-br
          ${
            theme === "dark"
              ? "from-gray-800 to-gray-900"
              : "from-yellow-50 to-yellow-100"
          }`}
        >
          <div className="flex items-center mb-4">
            <span className="text-yellow-400 text-2xl mr-2">★</span>
            <h3 className="text-lg font-bold">Bookmarked Problems</h3>
          </div>
          <ul className="list-disc ml-6 max-h-32 overflow-y-auto custom-scrollbar">
            {bookmarkedProblems.length === 0 ? (
              <li className="text-gray-400">No bookmarked problems yet.</li>
            ) : (
              bookmarkedProblems.map((prob, idx) => (
                <li key={idx} className="mb-1 text-gray-800 dark:text-gray-200">
                  {prob}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
