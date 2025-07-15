import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-orange-500 text-white w-full shadow-md py-3">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide">📚 BookStore</h1>
        <ul className="flex gap-6 font-medium text-white text-md">
          <li>
            <Link to="/dashboard" className="hover:text-orange-100 transition">Dashboard</Link>
          </li>
          <li>
            <Link to="/profile" className="hover:text-orange-100 transition">My Profile</Link>
          </li>
          <li>
            <Link to="/addbook" className="hover:text-orange-100 transition">Add Book</Link>
          </li>
        </ul>
        <button
          onClick={handleLogout}
          className="bg-white text-orange-500 px-4 py-1.5 rounded-md text-sm font-semibold shadow-sm hover:bg-orange-100 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
