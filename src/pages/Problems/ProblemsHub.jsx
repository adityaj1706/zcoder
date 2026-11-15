import React, { useEffect, useState } from "react";
import { useTheme } from "../../App";
import SearchFilterBar from "../../components/Problems/SearchFilterBar";
import ProblemCard from "../../components/Problems/ProblemCard";
import "../../App.css";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
Chart.register(ArcElement, Tooltip, Legend);

export default function ProblemsHub() {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [allProblems, setAllProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);

  const [filterType, setFilterType] = useState("");
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    fetch("/api/problems")
      .then((res) => res.json())
      .then((data) => {
        setAllProblems(data);
        setFilteredProblems(data);
      });
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const userData = storedUser ? JSON.parse(storedUser) : null;
    const solvedKey = userData
      ? `solvedProblems_${userData.username}`
      : "solvedProblems";
    const solved = JSON.parse(localStorage.getItem(solvedKey) || "[]");
    setSolvedProblems(solved);
  }, []);

  // Count by difficulty
  const countByDifficulty = (problems, solvedList) => {
    const difficulties = ["Easy", "Medium", "Hard"];
    const total = { Easy: 0, Medium: 0, Hard: 0 };
    const solved = { Easy: 0, Medium: 0, Hard: 0 };
    problems.forEach((p) => {
      if (difficulties.includes(p.difficulty)) {
        total[p.difficulty]++;
        if (solvedList.includes(p.title)) solved[p.difficulty]++;
      }
    });
    return { total, solved };
  };

  const { total, solved } = countByDifficulty(allProblems, solvedProblems);

  // Pie chart data
  const pieData = {
    labels: ["Easy", "Medium", "Hard"],
    datasets: [
      {
        data: [solved.Easy, solved.Medium, solved.Hard],
        backgroundColor: ["#22c55e", "#facc15", "#ef4444"], // green, yellow, red
        borderWidth: 2,
        borderColor: theme === "dark" ? "#18181b" : "#fff",
      },
      {
        // For unsolved (transparent, just for legend)
        data: [
          total.Easy - solved.Easy,
          total.Medium - solved.Medium,
          total.Hard - solved.Hard,
        ],
        backgroundColor: ["#bbf7d0", "#fef9c3", "#fecaca"], // light green, yellow, red
        borderWidth: 0,
        borderColor: "transparent",
      },
    ],
  };

  // Pie chart options with center text
  const solvedCount = solvedProblems.length;
  const totalCount = allProblems.length;

  const pieOptions = {
    plugins: {
      legend: {
        display: false, // Hide default legend
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const idx = context.dataIndex;
            const label = context.chart.data.labels[idx];
            const solvedVal = pieData.datasets[0].data[idx];
            const totalVal =
              pieData.datasets[0].data[idx] + pieData.datasets[1].data[idx];
            return `${label}: ${solvedVal} / ${totalVal} solved`;
          },
        },
      },
    },
    cutout: "82%", // More space in the center
    responsive: true,
    maintainAspectRatio: false,
  };

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
      className={`relative px-4 py-8 min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "text-white" : "text-gray-900"
      }`}
      style={{ position: "relative", zIndex: 1 }}
    >
      {/* Top right progress */}
      <div className="glass-card fade-up mx-auto mb-8 xl:mb-0 xl:absolute xl:top-8 xl:right-8 flex flex-col items-center p-6 z-10 w-64">
        <div className="text-lg font-bold mb-2">Progress</div>
        <div className="relative w-40 h-40 mb-2 flex items-center justify-center">
          <Pie data={pieData} options={pieOptions} width={160} height={160} />
          {/* Center text */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
            style={{ zIndex: 10 }}
          >
            <span className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
              {solvedCount} / {totalCount}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-300 mt-1">
              Solved
            </span>
          </div>
        </div>
        {/* Custom legend below the chart */}
        <div className="flex justify-between w-full mt-4 text-sm">
          <span className="flex items-center gap-2">
            <span className="inline-block w-4 h-4 rounded bg-green-500"></span>
            Easy
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-block w-4 h-4 rounded bg-yellow-400"></span>
            Medium
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-block w-4 h-4 rounded bg-red-500"></span>
            Hard
          </span>
        </div>
      </div>

      <div className="text-center mb-8 fade-up">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Problems <span className="gradient-text">Hub</span>
        </h1>
        <p className="mt-2 text-sm text-muted font-mono">
          {totalCount} problems · pick one and start coding
        </p>
      </div>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex flex-wrap items-center gap-3 mb-4 fade-up delay-1">
          <SearchFilterBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            problems={allProblems}
            setFilteredProblems={setFilteredProblems}
          />
          <div className="relative flex gap-2">
            <select
              className="field"
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
                className="field"
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
                className="field"
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
        {allProblems.length > 0 && filteredProblems.length === 0 && (
          <div className="glass-card p-8 text-center text-muted">
            No problems match your search.
          </div>
        )}
      </div>
    </div>
  );
}
