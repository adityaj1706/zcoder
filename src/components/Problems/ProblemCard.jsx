import { Link } from "react-router-dom";

const ProblemCard = ({ problem }) => {
  return (
    <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-4 rounded-2xl shadow hover:shadow-lg hover:ring-2 hover:ring-blue-500 hover:ring-opacity-30 transition duration-200 ease-in-out transform hover:scale-[1.01] mb-4">
      <Link to={`/problems/${problem.id}`}>
        <h2 className="text-lg font-semibold hover:underline">
          {problem.title}
        </h2>
      </Link>
      <p className="text-sm text-gray-500">{problem.difficulty}</p>
      <div className="flex gap-2 mt-2 flex-wrap">
        {problem.tags.map((tag, i) => (
          <span
            key={i}
            className="bg-white dark:bg-gray-800 text-black dark:text-white p-4 rounded-2xl shadow hover:shadow-lg hover:ring-2 hover:ring-blue-500 hover:ring-opacity-30 transition duration-200 ease-in-out transform hover:scale-[1.01] mb-4"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProblemCard;
