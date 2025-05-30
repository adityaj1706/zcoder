import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../App";

const contestLinks = [
  {
    name: "LeetCode Weekly Contest",
    url: "https://leetcode.com/contest/",
    icon: "🟧",
    desc: "Official LeetCode weekly and biweekly contests.",
  },
  {
    name: "Codeforces Contests",
    url: "https://codeforces.com/contests",
    icon: "🟦",
    desc: "Upcoming and past Codeforces contests.",
  },
  {
    name: "AtCoder Contests",
    url: "https://atcoder.jp/contests/",
    icon: "🟩",
    desc: "Practice with AtCoder programming contests.",
  },
];

const Home = () => {
  const { theme,toggleTheme } = useTheme();

  return (
    <div
      className={`flex flex-col items-center justify-start pt-24 min-h-[80vh] transition-colors duration-300
    ${theme === "dark" ? "text-white" : "text-gray-900"}`}
    >
      <h1
        className={`text-4xl md:text-5xl font-extrabold mb-4 drop-shadow ${
          theme === "dark" ? "text-white" : "text-blue-900"
        }`}
      >
        Welcome to ZCoder
      </h1>
      <p className="text-lg md:text-xl mb-8 text-center max-w-2xl">
        Practice coding problems, collaborate in real-time rooms, and track your
        progress — all in one place.
      </p>
      {/* Main Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        <Link
          to="/editor"
          className={`rounded-lg shadow-lg p-6 flex flex-col items-center transition
            ${
              theme === "dark"
                ? "bg-gray-800 hover:bg-blue-900"
                : "bg-white hover:bg-blue-100"
            }`}
        >
          <span className="text-2xl mb-2">💻</span>
          <span className="font-bold text-lg mb-1">Code Editor</span>
          <span className="text-sm text-center">
            Solve problems in a powerful, VS Code-like editor.
          </span>
        </Link>
        <Link
          to="/rooms"
          className={`rounded-lg shadow-lg p-6 flex flex-col items-center transition
            ${
              theme === "dark"
                ? "bg-gray-800 hover:bg-blue-900"
                : "bg-white hover:bg-blue-100"
            }`}
        >
          <span className="text-2xl mb-2">🗣️</span>
          <span className="font-bold text-lg mb-1">Interactive Rooms</span>
          <span className="text-sm text-center">
            Collaborate and chat with others in real time.
          </span>
        </Link>
        <Link
          to="/profile"
          className={`rounded-lg shadow-lg p-6 flex flex-col items-center transition
            ${
              theme === "dark"
                ? "bg-gray-800 hover:bg-blue-900"
                : "bg-white hover:bg-blue-100"
            }`}
        >
          <span className="text-2xl mb-2">👤</span>
          <span className="font-bold text-lg mb-1">Your Profile</span>
          <span className="text-sm text-center">
            View your progress and solved problems.
          </span>
        </Link>
      </div>
      {/* Practice Contests Section */}
      <div
        className={`mt-12 w-full max-w-3xl rounded-xl shadow-lg p-8 transition
          ${
            theme === "dark"
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-900"
          }`}
      >
        <div className="flex items-center mb-4">
          <span className="text-2xl mr-2">🏆</span>
          <span className="font-bold text-xl">Practice Contests</span>
        </div>
        <p className="mb-4 text-sm">
          Sharpen your skills with real contest problems from popular platforms:
        </p>
        <div className="flex flex-col gap-3">
          {contestLinks.map((contest) => (
            <a
              key={contest.name}
              href={contest.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium shadow transition
                ${
                  theme === "dark"
                    ? "bg-blue-900 hover:bg-blue-800 text-white"
                    : "bg-blue-100 hover:bg-blue-200 text-blue-900"
                }`}
            >
              <span className="text-xl">{contest.icon}</span>
              <span>
                {contest.name}
                <span className="block text-xs font-normal opacity-80">
                  {contest.desc}
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;