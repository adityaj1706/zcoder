import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Sun, Moon, Menu, X, LogOut } from "lucide-react";
import { useTheme } from "../App";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/problems", label: "Problems" },
  { to: "/rooms", label: "Rooms" },
  { to: "/profile", label: "Profile" },
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // Instead of using local state, read directly from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("user");
    setOpen(false);
    navigate("/profile"); // redirect to profile (login form)
  };

  const linkClass = ({ isActive }) => `nav-link ${isActive ? "active" : ""}`;

  return (
    <nav
      className="sticky top-0 z-40 border-b backdrop-blur-xl"
      style={{ background: "var(--surface)", borderColor: "var(--border)" }}
    >
      <div className="max-w-6xl mx-auto h-16 px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="font-mono text-sm font-bold text-white px-2 py-1 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/40 transition-transform group-hover:rotate-6">
            {"</>"}
          </span>
          <span className="text-xl font-extrabold tracking-tight gradient-text">
            ZCoder
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-7 text-sm">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="btn-ghost !p-2 !rounded-lg"
            title={theme === "dark" ? "Switch to light" : "Switch to dark"}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
          {user ? (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/profile" className="chip !py-1.5 font-mono">
                @{user.username}
              </Link>
              <button
                onClick={handleLogout}
                className="btn-ghost !py-1.5 !px-3 text-sm hover:!border-red-400 hover:text-red-400"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          ) : (
            <Link
              to="/profile"
              className="hidden md:inline-flex btn-primary !py-1.5 !px-4 text-sm"
            >
              Sign in
            </Link>
          )}
          <button
            className="md:hidden btn-ghost !p-2 !rounded-lg"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          className="md:hidden px-4 pb-4 flex flex-col gap-3 text-sm border-t"
          style={{ borderColor: "var(--border)" }}
        >
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={linkClass}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
          {user && (
            <button
              onClick={handleLogout}
              className="btn-ghost !py-1.5 text-sm self-start"
            >
              <LogOut className="w-4 h-4" /> Logout (@{user.username})
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
