import { useState } from "react";
import SearchFilterBar from "../../components/Problems/SearchFilterBar";
import ProblemCard from "../../components/Problems/ProblemCard";
import '../../App.css';

const dummyProblems = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    tags: ["Array", "Hash Table"],
  },
  {
    id: 2,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    tags: ["String", "Sliding Window"],
  },
];

// const ProblemsHub = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredProblems, setFilteredProblems] = useState(dummyProblems);

//   return (
//     <div className="problemshub-wrapper text-black dark:text-white">
//       <h1 className="center-heading">🧠 Problems Hub</h1>
      
//       <SearchFilterBar
//         searchTerm={searchTerm}
//         setSearchTerm={setSearchTerm}
//         problems={dummyProblems}
//         setFilteredProblems={setFilteredProblems}
//       />

//       <div className="problem-card-container mt-6">
//         {filteredProblems.map((problem) => (
//           <ProblemCard key={problem.id} problem={problem} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProblemsHub;


const ProblemsHub = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProblems, setFilteredProblems] = useState(dummyProblems);

  return (
    <div className="p-6">
      <h1 className="center-heading">🧠Problems Hub</h1>

      <SearchFilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        problems={dummyProblems}
        setFilteredProblems={setFilteredProblems}
      />
      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-4 rounded-lg shadow-md mb-4">
        {filteredProblems.map((problem) => (
          <ProblemCard key={problem.id} problem={problem} />
        ))}
      </div>
    </div>
  );
};

export default ProblemsHub;
