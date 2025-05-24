import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../App";
import { problemDescriptions, fetchCodeforcesProblems } from "./editor";

// Helper to extract tags from description
function extractTags(desc) {
  const match = desc.match(/\*\*Tags:\*\*\s*(.+)/);
  if (match) {
    return match[1].split(",").map(tag => tag.trim());
  }
  return [];
}

const Home = () => {
  const { theme } = useTheme();
  const [allProblems, setAllProblems] = useState(problemDescriptions);

  useEffect(() => {
    fetchCodeforcesProblems().then((cf) => {
      setAllProblems((prev) => ({ ...prev, ...cf }));
    });
  }, []);

  const problems = Object.keys(allProblems).map((title) => {
    const desc = allProblems[title];
    return {
      title,
      description:
        desc.split("\n")[2]?.replace(/[*#`]/g, "").trim() ||
        "Solve this coding problem.",
      tags: extractTags(desc),
    };
  });

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-[80vh] transition-colors duration-300
        ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}
    >
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-blue-900 drop-shadow">
        Welcome to ZCoder
      </h1>
      <p className="text-lg md:text-xl mb-8 text-center max-w-2xl">
        Practice coding problems, collaborate in real-time rooms, and track your progress — all in one place.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <Link
          to="/editor"
          className={`rounded-lg shadow-lg p-6 flex flex-col items-center transition
            ${theme === "dark"
              ? "bg-gray-800 hover:bg-blue-900"
              : "bg-white hover:bg-blue-100"}`}
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
            ${theme === "dark"
              ? "bg-gray-800 hover:bg-blue-900"
              : "bg-white hover:bg-blue-100"}`}
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
            ${theme === "dark"
              ? "bg-gray-800 hover:bg-blue-900"
              : "bg-white hover:bg-blue-100"}`}
        >
          <span className="text-2xl mb-2">👤</span>
          <span className="font-bold text-lg mb-1">Your Profile</span>
          <span className="text-sm text-center">
            View your progress and solved problems.
          </span>
        </Link>
      </div>
      <div className="w-full max-w-2xl mt-8">
        <h2 className="text-2xl font-bold mb-4">Problems</h2>
        <ul>
          {problems.map((prob, idx) => (
            <li key={idx} className="mb-4">
              <Link
                to="/editor"
                state={{ problem: prob.title }}
                className={`block p-4 rounded shadow transition hover:scale-[1.02] cursor-pointer
                  ${theme === "dark" ? "bg-gray-800 hover:bg-blue-900" : "bg-white hover:bg-blue-100"}`}
              >
                <div className="font-semibold text-lg">{prob.title}</div>
                <div className="text-sm opacity-80 mb-2">{prob.description}</div>
                <div className="flex flex-wrap gap-2 mt-1">
                  {prob.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 rounded bg-blue-900 text-white text-xs font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
