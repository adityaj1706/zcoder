import { Link } from "react-router-dom";
import { useTheme } from "../../App";
import React, { useEffect, useState } from "react";
import { Bookmark, BookmarkCheck, CheckCircle } from "lucide-react";

const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case "Easy":
      return "text-green-600";
    case "Medium":
      return "text-yellow-500";
    case "Hard":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
};

const ProblemCard = ({ problem }) => {
  const { theme } = useTheme();
  const [bookmarked, setBookmarked] = useState(false);
  const [solved, setSolved] = useState(false);

  // Read the logged-in user from localStorage
  const storedUser = localStorage.getItem("user");
  const userData = storedUser ? JSON.parse(storedUser) : null;
  // Build user-specific keys. If no user, use default keys.
  const bookmarkKey = userData ? `bookmarkedProblems_${userData.name}` : "bookmarkedProblems";
  const solvedKey = userData ? `solvedProblems_${userData.name}` : "solvedProblems";

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem(bookmarkKey) || "[]");
    setBookmarked(bookmarks.includes(problem.title));

    const solvedProblems = JSON.parse(localStorage.getItem(solvedKey) || "[]");
    setSolved(solvedProblems.includes(problem.title));
  }, [problem.title, bookmarkKey, solvedKey]);

  const toggleBookmark = async (e) => {
    e.preventDefault(); // Prevent navigating when clicking the button
    if (!userData) return; // Only allow logged-in users
    let bookmarks = JSON.parse(localStorage.getItem(bookmarkKey) || "[]");
    let action = "";
    if (bookmarks.includes(problem.title)) {
      // Remove bookmark
      bookmarks = bookmarks.filter((p) => p !== problem.title);
      setBookmarked(false);
      action = "remove";
    } else {
      // Add bookmark
      bookmarks.push(problem.title);
      setBookmarked(true);
      action = "add";
    }
    localStorage.setItem(bookmarkKey, JSON.stringify(bookmarks));

    // Update bookmarks in user stats backend
    try {
      await fetch(`/api/userstats?user=${userData.name}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookmarks: problem.title,
          action: action,
        }),
      });
    } catch (err) {
      console.error("Error updating user stats for bookmarks", err);
    }
  };

  const toggleSolved = async (e) => {
    e.preventDefault(); // Prevent default link navigation
    if (!userData) return; // Only allow logged-in users
    let solvedProblems = JSON.parse(localStorage.getItem(solvedKey) || "[]");
    let action = "";
    if (solvedProblems.includes(problem.title)) {
      // Remove solved problem
      solvedProblems = solvedProblems.filter((p) => p !== problem.title);
      setSolved(false);
      action = "remove";
    } else {
      // Add solved problem
      solvedProblems.push(problem.title);
      setSolved(true);
      action = "add";
    }
    localStorage.setItem(solvedKey, JSON.stringify(solvedProblems));

    // Update solved in user stats backend
    try {
      await fetch(`/api/userstats?user=${userData.name}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          solved: problem.title,
          action: action,
        }),
      });
    } catch (err) {
      console.error("Error updating user stats for solved", err);
    }
  };

  return (
    <div
      className={`p-4 rounded-2xl shadow hover:shadow-lg hover:ring-2 hover:ring-blue-500 hover:ring-opacity-30 transition duration-200 ease-in-out transform hover:scale-[1.01] mb-4 ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex items-start justify-between">
        <Link
          to={`/problems/${problem.id}`}
          state={{ problem }}
          className="block hover:underline flex-1"
        >
          <h2 className="text-lg font-semibold flex items-center gap-2">
            {problem.title}
            {solved && (
              <span className="ml-2 px-2 py-1 bg-green-500 text-white rounded text-xs font-semibold flex items-center gap-1">
                <CheckCircle className="w-4 h-4" /> Solved
              </span>
            )}
          </h2>
        </Link>
        <div className="flex gap-2">
          <button
            onClick={toggleSolved}
            className={`px-2 py-1 rounded font-semibold flex items-center gap-1 ${
              solved
                ? "bg-green-400 text-black"
                : "bg-gray-300 text-gray-700"
            } hover:bg-green-500`}
            title={solved ? "Mark as unsolved" : "Mark as solved"}
          >
            {solved ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <CheckCircle className="w-4 h-4 opacity-50" />
            )}
          </button>
          <button
            onClick={toggleBookmark}
            className={`px-2 py-1 rounded font-semibold flex items-center gap-1 ${
              bookmarked
                ? "bg-yellow-400 text-black"
                : "bg-gray-300 text-gray-700"
            } hover:bg-yellow-500`}
            title={bookmarked ? "Remove Bookmark" : "Bookmark this problem"}
          >
            {bookmarked ? (
              <BookmarkCheck className="w-4 h-4" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
      <p className={`text-sm font-semibold mt-1 ${getDifficultyColor(problem.difficulty)}`}>
        {problem.difficulty}
      </p>
      {problem.tags && problem.tags.length > 0 && (
        <div className="flex gap-2 mt-3 flex-wrap">
          {problem.tags.map((tag, i) => (
            <span
              key={i}
              className={`px-3 py-1 rounded-full text-sm font-medium hover:shadow-lg hover:ring-2 ${
                theme === "dark" ? "bg-blue-900 text-gray-100" : "bg-gray-200 text-gray-800"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProblemCard;