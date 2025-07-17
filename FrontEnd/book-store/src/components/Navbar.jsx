import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "../pages/ThemeToggle";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-orange-500 dark:bg-gray-800 text-white dark:text-gray-100 shadow-md px-4 py-2">
      <div className="flex justify-between items-center w-full max-w-7xl mx-auto">

        <h1 className="text-2xl font-bold text-white dark:text-white">📚 BookStore</h1>

        <ul className="flex gap-6 font-medium text-white dark:text-gray-200 text-md">
          <li>
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
          </li>
          <li>
            <Link to="/profile" className="hover:underline">My Profile</Link>
          </li>
          <li>
            <Link to="/addbook" className="hover:underline">Add Book</Link>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={handleLogout}
            className="bg-white dark:bg-gray-100 text-orange-500 px-3 py-1 rounded-md text-sm font-medium hover:bg-orange-100 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
