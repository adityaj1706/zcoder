import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../App";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  // Instead of using local state, read directly from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("user");
    // Force a re-render by navigating to a different route and back if necessary
    navigate("/profile"); // redirect to profile (login form)
  };

  return (
    <nav className="bg-blue-900 dark:bg-blue-900 h-20 shadow-md flex items-center justify-between px-6">
      <Link to="/" className="text-white text-xl font-bold hover:underline">
        ZCoder
      </Link>
      <div className="flex items-center space-x-6 text-white text-sm">
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/rooms">Rooms</Link>
        <Link to="/problems">Problems Hub</Link>
        <button
          onClick={toggleTheme}
          className="ml-4 px-3 py-1 rounded font-semibold bg-white text-blue-900 hover:bg-blue-950 transition"
        >
          {theme === "dark" ? "🔆Light" : "🌙Dark"}
        </button>
        {user && (
          <button
            onClick={handleLogout}
            className="ml-4 px-3 py-1 rounded font-semibold bg-red-600 text-white hover:bg-red-700 transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;