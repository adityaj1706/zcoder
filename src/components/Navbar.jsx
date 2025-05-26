import { Link } from "react-router-dom";
import { useTheme } from "../App"; // Import the theme context

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-blue-900 dark:bg-blue-900 h-20 shadow-md flex items-center justify-between px-6">
      <Link to="/" className="text-white text-xl font-bold hover:underline">
        ZCoder
      </Link>
      <div className="flex items-center space-x-6 text-white text-sm">
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        {/* <Link to="/practice">Practice</Link> */}
        <Link to="/editor">Editor</Link>
        <Link to="/rooms">Rooms</Link>
        <Link to="/problems">Problems Hub</Link>
        <button
          onClick={toggleTheme}
          className="ml-4 px-3 py-1 rounded font-semibold bg-white text-blue-900 hover:bg-blue-950 transition"
        >
          {theme === "dark" ? "🔆Light" : "🌙Dark"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;