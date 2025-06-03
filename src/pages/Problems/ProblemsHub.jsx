import React, { useEffect, useState, useRef } from "react";
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
  const chartRef = useRef();

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
      <div className="absolute top-8 right-8 flex flex-col items-center bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-lg p-6 z-10 w-64">
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

      <div className="flex justify-center mb-8">
        <h1
          className="text-4xl md:text-5xl font-extrabold drop-shadow"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            display: "inline-block",
            verticalAlign: "middle",
          }}
        >
          <span className="typing">🧠 Problems Hub</span>
        </h1>
      </div>
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
}
