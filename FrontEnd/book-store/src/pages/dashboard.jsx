
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nameFilter, setNameFilter] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
const { addToCart } = useCart();

  useEffect(() => {
    setRole(localStorage.getItem("role")); // get role from localStorage

    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/allbooks", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setBooks(res.data.data);
      } catch (error) {
        toast.error("Failed to fetch books.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:8080/api/deletebooks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("✅ Book deleted successfully!");
      setBooks((prev) => prev.filter((book) => book._id !== id));
    } catch (err) {
      toast.error("❌ Failed to delete book.");
    }
  };

  const handleEdit = (bookId) => {
    navigate(`/edit/${bookId}`);
  };

  const filteredBooks = books
    .filter((book) =>
      book.bookName.toLowerCase().includes(nameFilter.toLowerCase())
    )
    .filter((book) =>
      book.bookAuthor.toLowerCase().includes(authorFilter.toLowerCase())
    )
    .filter((book) =>
      priceFilter === "" || Number(book.bookPrice) <= Number(priceFilter)
    );

    const handleAddToCart = (book) => {
  addToCart(book);
  navigate("/cart");
  toast.success("Added to cart!");
};
  return (
    <>
      <Navbar />
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">📚 Book List</h2>

          {role === "admin" && (
            <button
              onClick={() => navigate("/addbook")}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition"
            >
              Add Book
            </button>
          )}
        </div>

        {/* Filters - Only for USER */}
        {role === "user" && (
          <div className="flex flex-wrap gap-4 mb-6">
            <input
              type="text"
              placeholder="Search by Book Name"
              className="px-4 py-2 border rounded-md w-full sm:w-60"
              onChange={(e) => setNameFilter(e.target.value)}
            />
            <input
              type="text"
              placeholder="Search by Author"
              className="px-4 py-2 border rounded-md w-full sm:w-60"
              onChange={(e) => setAuthorFilter(e.target.value)}
            />
            <input
              type="number"
              placeholder="Max Price"
              className="px-4 py-2 border rounded-md w-full sm:w-60"
              onChange={(e) => setPriceFilter(e.target.value)}
            />
          </div>
        )}

        {/* Table */}
        {filteredBooks.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Image</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Name</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Author</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Price</th>

                  {role === "admin" && (
                    <>
                      <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Edit</th>
                      <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Delete</th>
                    </>
                  )}

                  {role === "user" && (
                    <>
                      <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Add to Cart</th>
                      <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Buy Now</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredBooks.map((book) => (
                  <tr key={book._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <img
                        src={`http://localhost:8080${book.bookImage}`}
                        alt="book"
                        className="w-14 h-20 object-cover rounded-md"
                      />
                    </td>
                    <td className="px-6 py-4">{book.bookName}</td>
                    <td className="px-6 py-4">{book.bookAuthor}</td>
                    <td className="px-6 py-4 font-semibold text-gray-700">₹{book.bookPrice}</td>

                    {/* Admin Buttons */}
                    {role === "admin" && (
                      <>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleEdit(book._id)}
                            className="bg-green-500 text-white px-4 py-1.5 rounded hover:bg-green-600 transition"
                          >
                            Edit
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleDelete(book._id)}
                            className="bg-red-500 text-white px-4 py-1.5 rounded hover:bg-red-600 transition"
                          >
                            Delete
                          </button>
                        </td>
                      </>
                    )}

                    {/* User Buttons */}
                    {role === "user" && (
                      <>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleAddToCart(book)}
                            className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition"
                          >
                            Add to Cart
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => toast.success("Order placed")}
                            className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition"
                          >
                            Buy Now
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600 mt-6">
            {loading ? "Loading books..." : "No books available or match filters."}
          </p>
        )}
      </div>
    </>
  );
};

export default Dashboard;
