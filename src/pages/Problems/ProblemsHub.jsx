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
  useEffect(() => {
    fetch("http://localhost:3000/api/problems")
      .then((res) => res.json())
      .then((data) => {
        setAllProblems(data);
        setFilteredProblems(data);
      });
  }, []);

  return (
    <div
      className={`px-4 py-8 min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <h1 className="center-heading">🧠Problems Hub</h1>
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
};

export default ProblemsHub;
