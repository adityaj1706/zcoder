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
      ? `solvedProblems_${userData.name}`
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

  return (
    <div
      className={`relative px-4 py-8 min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Top right progress */}
      <div className="absolute top-8 right-8 flex flex-col items-center bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 z-10 w-64">
        <div className="text-lg font-bold mb-2">Progress</div>
        <div className="relative w-40 h-40 mb-2 flex items-center justify-center">
          <Pie
            data={pieData}
            options={pieOptions}
            width={160}
            height={160}
          />
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

      <h1 className="center-heading mb-8">🧠 Problems Hub</h1>
      <div className="max-w-3xl mx-auto space-y-6">
        <SearchFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          problems={allProblems}
          setFilteredProblems={setFilteredProblems}
        />
        {filteredProblems.map((problem) => (
          <ProblemCard key={problem.id} problem={problem} />
        ))}
      </div>
    </div>
  );
}
