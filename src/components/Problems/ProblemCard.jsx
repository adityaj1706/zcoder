import { Link } from "react-router-dom";
import { useTheme } from "../../App"; // Adjust path if needed

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

  return (
    <div className={`p-4 rounded-2xl shadow hover:shadow-lg hover:ring-2 hover:ring-blue-500 hover:ring-opacity-30 transition duration-200 ease-in-out transform hover:scale-[1.01] mb-4
      ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}
    `}>
      <Link to="/editor" state={{ problem }} className="block hover:underline">
        <h2 className="text-lg font-semibold">{problem.title}</h2>
      </Link>
      <p className={`text-sm font-semibold mt-1 ${getDifficultyColor(problem.difficulty)}`}>
        {problem.difficulty}
      </p>
      <div className="flex gap-2 mt-3 flex-wrap">
        {problem.tags.map((tag, i) => (
          <span
            key={i}
            className={`px-3 py-1 rounded-full text-sm font-medium hover:shadow-lg hover:ring-2
              ${theme === "dark" ? "bg-blue-900 text-gray-100" : "bg-gray-200 text-gray-800"}
            `}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProblemCard;