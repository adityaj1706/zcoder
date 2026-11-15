import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Bookmark, BookmarkCheck, CheckCircle } from "lucide-react";

const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case "Easy":
      return "text-emerald-400 bg-emerald-500/10 border-emerald-500/30";
    case "Medium":
      return "text-amber-400 bg-amber-500/10 border-amber-500/30";
    case "Hard":
      return "text-rose-400 bg-rose-500/10 border-rose-500/30";
    default:
      return "text-gray-400 bg-gray-500/10 border-gray-500/30";
  }
};

const ProblemCard = ({ problem }) => {
  const [bookmarked, setBookmarked] = useState(false);
  const [solved, setSolved] = useState(false);

  // Read the logged-in user from localStorage
  const storedUser = localStorage.getItem("user");
  const userData = storedUser ? JSON.parse(storedUser) : null;
  // Build user-specific keys. If no user, use default keys.
  const bookmarkKey = userData ? `bookmarkedProblems_${userData.username}` : "bookmarkedProblems";
  const solvedKey = userData ? `solvedProblems_${userData.username}` : "solvedProblems";

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
      await fetch(`/api/userstats?user=${userData.username}`, {
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
      await fetch(`/api/userstats?user=${userData.username}`, {
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
    <div className="glass-card hover-lift fade-up p-4 md:p-5 mb-4">
      <div className="flex items-start justify-between gap-3">
        <Link
          to={`/problems/${problem.id}`}
          state={{ problem }}
          className="block flex-1 group"
        >
          <h2 className="text-lg font-semibold flex flex-wrap items-center gap-2 transition-colors group-hover:text-indigo-400">
            <span className="font-mono text-sm text-muted">#{problem.id}</span>
            {problem.title}
            {solved && (
              <span className="px-2 py-0.5 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-semibold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Solved
              </span>
            )}
          </h2>
        </Link>
        <div className="flex gap-2">
          <button
            onClick={toggleSolved}
            className={`p-2 rounded-lg border transition-colors ${
              solved
                ? "bg-emerald-500 border-emerald-500 text-white"
                : "border-gray-500/30 text-muted hover:border-emerald-400 hover:text-emerald-400"
            }`}
            title={solved ? "Mark as unsolved" : "Mark as solved"}
          >
            <CheckCircle className="w-4 h-4" />
          </button>
          <button
            onClick={toggleBookmark}
            className={`p-2 rounded-lg border transition-colors ${
              bookmarked
                ? "bg-amber-400 border-amber-400 text-black"
                : "border-gray-500/30 text-muted hover:border-amber-400 hover:text-amber-400"
            }`}
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
      <div className="flex gap-2 mt-3 flex-wrap items-center">
        <span
          className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getDifficultyColor(
            problem.difficulty
          )}`}
        >
          {problem.difficulty}
        </span>
        {problem.tags &&
          problem.tags.map((tag, i) => (
            <span key={i} className="chip">
              {tag}
            </span>
          ))}
      </div>
    </div>
  );
};

export default ProblemCard;
