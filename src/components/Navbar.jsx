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
      </div>
    </nav>
  );
};

export default Navbar;
