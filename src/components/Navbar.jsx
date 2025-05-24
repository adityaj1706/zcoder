import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-900 h-20 shadow-md flex items-center justify-between px-6">
      <div className="text-white text-xl font-bold">ZCoder</div>
      <div className="space-x-6 text-white text-sm">
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/practice">Practice</Link>
        <Link to="/rooms">Rooms</Link>
        <button
          onClick={toggleTheme}
          className="ml-4 px-3 py-1 rounded font-semibold bg-white text-blue-900 hover:bg-gray-200 transition"
        >
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
