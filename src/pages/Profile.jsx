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
  const [authMode, setAuthMode] = useState("login");
  const [solvedProblems, setSolvedProblems] = useState([
    "Two Sum",
    "Reverse Linked List",
    "Valid Parentheses",
  ]);
  const [bookmarkedProblems, setBookmarkedProblems] = useState([]);

  // Editable profile fields
  const [education, setEducation] = useState("");
  const [skills, setSkills] = useState("");
  const [editing, setEditing] = useState(false);

  // Days active
  const [daysActive, setDaysActive] = useState(1);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    const bookmarks = JSON.parse(
      localStorage.getItem("bookmarkedProblems") || "[]"
    );
    setBookmarkedProblems(bookmarks);

    // Days active logic
    const firstLogin = localStorage.getItem("firstLoginDate");
    if (firstLogin) {
      const days =
        Math.floor(
          (Date.now() - new Date(firstLogin).getTime()) / (1000 * 60 * 60 * 24)
        ) + 1;
      setDaysActive(days);
    } else if (storedUser) {
      localStorage.setItem("firstLoginDate", new Date().toISOString());
      setDaysActive(1);
    }
  }, []);

  useEffect(() => {
    if (user) {
      const fetchUserStats = async () => {
        try {
          const res = await fetch(`/api/userstats?user=${user.username}`);
          const data = await res.json();
          setSolvedProblems(data.solved || []);
          setBookmarkedProblems(data.bookmarks || []);
        } catch (err) {
          console.error("Error fetching user stats:", err);
        }
      };
      fetchUserStats();
      const intervalId = setInterval(fetchUserStats, 5000);
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
          const loggedInUser = { name: username };
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
          const newUser = { username };
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

const handleSaveProfile = () => {
  setEditing(false);
  // Optionally save to backend/localStorage
};

return (
  <div
    className={`max-w-5xl mx-auto mt-12 p-0 md:p-6 rounded-lg shadow-lg transition-colors duration-300 flex flex-col md:flex-row gap-8
    ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
  >
    {/* Left: User Details */}
    <aside
      className={`w-full md:w-1/3 min-w-[220px] flex flex-col items-center p-6 rounded-lg shadow transition-colors duration-300
      ${theme === "dark" ? "bg-gray-800" : "bg-gray-50"}`}
    >
      <div className="bg-blue-900 text-white rounded-full w-20 h-20 flex items-center justify-center text-4xl font-bold mb-4 shadow">
        {user.username[0].toUpperCase()}
      </div>
      <h2 className="text-2xl font-bold mb-1 text-center">{user.username}</h2>
      <button
        className="text-xs text-blue-600 hover:underline mb-4"
        onClick={() => setEditing((e) => !e)}
      >
        {editing ? "Cancel" : "Edit Profile"}
      </button>
      <div className="w-full">
        <label className="block text-sm font-semibold mb-1">Education</label>
        {editing ? (
          <input
            className="w-full px-2 py-1 rounded border mb-2 text-gray-900"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            placeholder="Add education"
          />
        ) : (
          <div className="mb-2 text-gray-400">{education || "—"}</div>
        )}
        <label className="block text-sm font-semibold mb-1">Skills</label>
        {editing ? (
          <input
            className="w-full px-2 py-1 rounded border mb-2 text-gray-900"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="Add skills (comma separated)"
          />
        ) : (
          <div className="mb-2 text-gray-400">{skills || "—"}</div>
        )}
        {editing && (
          <button
            className="w-full mt-2 py-1 rounded bg-blue-700 text-white font-semibold"
            onClick={handleSaveProfile}
          >
            Save
          </button>
        )}
      </div>
    </aside>

    {/* Right: Progress & Activity */}
    <main className="flex-1 flex flex-col gap-6">
      <section
        className={`rounded-lg shadow p-6 transition-colors duration-300
        ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}
      >
        <div className="flex flex-wrap gap-8 mb-6">
          <div>
            <div className="flex items-center mb-2">
              <span className="text-blue-900 text-2xl mr-2">📈</span>
              <h3 className="text-lg font-semibold">Progress</h3>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span>
                {solvedProblems.length} of {totalProblems} solved
              </span>
              <span>
                {Math.round((solvedProblems.length / totalProblems) * 100)}%
              </span>
            </div>
            <div className="w-40 bg-gray-300 dark:bg-gray-700 rounded-full h-3">
              <div
                className="bg-blue-900 h-3 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.round(
                    (solvedProblems.length / totalProblems) * 100
                  )}%`,
                }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex items-center mb-2">
              <span className="text-yellow-400 text-2xl mr-2">★</span>
              <h3 className="text-lg font-semibold">Bookmarked</h3>
            </div>
            <div className="text-lg font-bold mb-1">
              {bookmarkedProblems.length}
            </div>
            <div className="text-gray-400 text-sm">problems bookmarked</div>
          </div>
          <div>
            <div className="flex items-center mb-2">
              <span className="text-green-500 text-2xl mr-2">⏳</span>
              <h3 className="text-lg font-semibold">DAYS ACTIVE</h3>
            </div>
            <div className="text-lg font-bold mb-1">{daysActive}</div>
            <div className="text-gray-400 text-sm">days</div>
          </div>
        </div>
      </section>

      <section
        className={`rounded-lg shadow p-6 transition-colors duration-300
        ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}
      >
        <div className="flex items-center mb-3">
          <span className="text-green-500 text-2xl mr-2">✔</span>
          <h3 className="text-lg font-semibold">Solved Problems</h3>
        </div>
        <ul className="list-disc ml-6 max-h-32 overflow-y-auto">
          {solvedProblems.length === 0 ? (
            <li className="text-gray-400">No problems solved yet.</li>
          ) : (
            solvedProblems.map((prob, idx) => <li key={idx}>{prob}</li>)
          )}
        </ul>
      </section>

      <section
        className={`rounded-lg shadow p-6 transition-colors duration-300
        ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}
      >
        <div className="flex items-center mb-3">
          <span className="text-yellow-400 text-2xl mr-2">★</span>
          <h3 className="text-lg font-semibold">BOOKEMARKED PROBLEMS</h3>
        </div>
        <ul className="list-disc ml-6 max-h-32 overflow-y-auto">
          {bookmarkedProblems.length === 0 ? (
            <li className="text-gray-400">No bookmarked problems yet.</li>
          ) : (
            bookmarkedProblems.map((prob, idx) => <li key={idx}>{prob}</li>)
          )}
        </ul>
      </section>
    </main>
  </div>
);
}
