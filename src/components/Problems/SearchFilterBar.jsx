const SearchFilterBar = ({
  searchTerm,
  setSearchTerm,
  problems,
  setFilteredProblems,
}) => {
  const handleChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = problems.filter((p) =>
      p.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProblems(filtered);
  };

  return (
    <div className="w-full p-3 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-300 shadow">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search problems..."
        className="w-full p-3 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-300 shadow"
      />
    </div>
  );
};

export default SearchFilterBar;
