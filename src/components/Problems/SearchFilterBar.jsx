import { useTheme } from "../../App";

const SearchFilterBar = ({ searchTerm, setSearchTerm }) => {
  const { theme } = useTheme();

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
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
