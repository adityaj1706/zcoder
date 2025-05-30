import { useState, useEffect } from "react";
import SearchFilterBar from "../../components/Problems/SearchFilterBar";
import ProblemCard from "../../components/Problems/ProblemCard";
import "../../App.css";
import { useTheme } from "../../App";

const ProblemsHub = () => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [allProblems, setAllProblems] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/problems")
      .then((res) => res.json())
      .then((data) => {
        setAllProblems(data);
        setFilteredProblems(data);
      });
  }, []);

  useEffect(() => {
    let filtered = allProblems;

    if (filterType === "difficulty" && filterValue) {
      filtered = filtered.filter((p) => p.difficulty === filterValue);
    }
    if (filterType === "tags" && filterValue) {
      filtered = filtered.filter((p) => (p.tags || []).includes(filterValue));
    }
    if (filterType === "solved") {
      const user = JSON.parse(localStorage.getItem("user"));
      const solvedKey = user ? `solvedProblems_${user.name}` : "solvedProblems";
      const solvedArr = JSON.parse(localStorage.getItem(solvedKey) || "[]");
      filtered = filtered.filter((p) => solvedArr.includes(p.title));
    }
    if (filterType === "notSolved") {
      const user = JSON.parse(localStorage.getItem("user"));
      const solvedKey = user ? `solvedProblems_${user.name}` : "solvedProblems";
      const solvedArr = JSON.parse(localStorage.getItem(solvedKey) || "[]");
      filtered = filtered.filter((p) => !solvedArr.includes(p.title));
    }
    if (filterType === "bookmarked") {
      const user = JSON.parse(localStorage.getItem("user"));
      const bookmarkKey = user
        ? `bookmarkedProblems_${user.name}`
        : "bookmarkedProblems";
      const bookmarksArr = JSON.parse(
        localStorage.getItem(bookmarkKey) || "[]"
      );
      filtered = filtered.filter((p) => bookmarksArr.includes(p.title));
    }
    if (filterType === "notBookmarked") {
      const user = JSON.parse(localStorage.getItem("user"));
      const bookmarkKey = user
        ? `bookmarkedProblems_${user.name}`
        : "bookmarkedProblems";
      const bookmarksArr = JSON.parse(
        localStorage.getItem(bookmarkKey) || "[]"
      );
      filtered = filtered.filter((p) => !bookmarksArr.includes(p.title));
    }

    // Also apply search filter
    if (searchTerm) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProblems(filtered);
  }, [filterType, filterValue, searchTerm, allProblems]);

  // Get all unique tags for filter dropdown
  const allTags = [...new Set(allProblems.flatMap((p) => p.tags || []))].filter(
    Boolean
  );

  return (
    <div
      className={`px-4 py-8 min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <h1 className="center-heading">🧠Problems Hub</h1>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-4 mb-4">
          <SearchFilterBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            problems={allProblems}
            setFilteredProblems={setFilteredProblems}
          />
          <div className="relative flex gap-2">
            <select
              className={`px-2 py-1 rounded border focus:outline-none
    ${
      theme === "dark"
        ? "bg-gray-800 text-white border-gray-700"
        : "bg-white text-gray-900 border-gray-300"
    }
  `}
              value={filterType}
              onChange={(e) => {
                setFilterType(e.target.value);
                setFilterValue(""); // Reset value on type change
              }}
            >
              <option value="">Filter by...</option>
              <option value="difficulty">Difficulty</option>
              <option value="tags">Topic Tag</option>
              <option value="solved">Solved</option>
              <option value="notSolved">Not Solved</option>
              <option value="bookmarked">Bookmarked</option>
              <option value="notBookmarked">Not Bookmarked</option>
            </select>
            {filterType === "difficulty" && (
              <select
                className={`px-2 py-1 rounded border focus:outline-none
    ${
      theme === "dark"
        ? "bg-gray-800 text-white border-gray-700"
        : "bg-white text-gray-900 border-gray-300"
    }
  `}
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
              >
                <option value="">All</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            )}
            {filterType === "tags" && (
              <select
                className={`px-2 py-1 rounded border focus:outline-none
    ${
      theme === "dark"
        ? "bg-gray-800 text-white border-gray-700"
        : "bg-white text-gray-900 border-gray-300"
    }
  `}
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
              >
                <option value="">All</option>
                {allTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
        {filteredProblems.map((problem) => (
          <ProblemCard key={problem.id} problem={problem} />
        ))}
      </div>
    </div>
  );
};

export default ProblemsHub;
