import { useState } from "react";
import SearchFilterBar from "../../components/Problems/SearchFilterBar";
import ProblemCard from "../../components/Problems/ProblemCard";
import '../../App.css';
import { useTheme } from "../../App";

const dummyProblems = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    tags: ["Array", "Hash Table"],
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    input: "Input: nums = [2,7,11,15], target = 9",
    output: "Output: [0,1]",
    constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9"],
  },
  {
    id: 2,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    tags: ["String", "Sliding Window"],
    description: "Given a string s, find the length of the longest substring without repeating characters.",
    input: "Input: s = 'abcabcbb'",
    output: "Output: 3",
    constraints: ["0 <= s.length <= 5 * 10^4", "s consists of English letters, digits, symbols and spaces."],
  },
];

const ProblemsHub = () => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProblems, setFilteredProblems] = useState(dummyProblems);

  return (
    <div className={`px-4 py-8 min-h-screen transition-colors duration-300 ${
      theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
    }`}>
      <h1 className="center-heading">🧠Problems Hub</h1>
      <div className="max-w-3xl mx-auto space-y-6">
        <SearchFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          problems={dummyProblems}
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