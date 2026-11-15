import { Search } from "lucide-react";

const SearchFilterBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative flex-1">
      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search problems..."
        className="field w-full !pl-9"
      />
    </div>
  );
};

export default SearchFilterBar;
