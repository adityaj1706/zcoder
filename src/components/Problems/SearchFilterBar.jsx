import { useTheme } from "../../App"; 

const SearchFilterBar = ({
  searchTerm,
  setSearchTerm,
  problems,
  setFilteredProblems,
}) => {
  const { theme } = useTheme();

  const handleChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = problems.filter((p) =>
      p.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProblems(filtered);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search problems..."
        className={`w-full p-3 rounded-md shadow
          ${
            theme === "dark"
              ? "bg-gray-700 text-white placeholder-gray-300"
              : "bg-white text-gray-800 placeholder-gray-500"
          }
        `}
      />
    </div>
  );
};

export default SearchFilterBar;
