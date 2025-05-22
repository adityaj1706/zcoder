import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext"; // Step 4: import hook

const Navbar = () => {
  const { darkMode, setDarkMode } = useTheme(); // use theme context

  return (
    <nav className="bg-blue-900 dark:bg-blue-950 h-20 shadow-md flex items-center justify-between px-6">
      <div className="text-white text-xl font-bold">ZCoder</div>

      <div className="flex items-center space-x-6 text-white text-sm">
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/practice">Practice</Link>
        <Link to="/rooms">Rooms</Link>
        <Link to="/problems">Problems Hub</Link>


        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-3 py-1 rounded bg-white text-black dark:bg-gray-700 dark:text-white transition"
        >
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
