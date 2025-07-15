
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/allbooks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBooks(res.data.data);
      } catch (err) {
        console.error("API error:", err);
        setError("Unauthorized or failed to load books.");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [navigate]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:8080/api/deletebooks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
        alert("✅ Book deleted successfully!");
      setBooks(books.filter((book) => book._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete book.");
    }
  };

  const handleEdit = (bookId) => {
    navigate(`/edit/${bookId}`);
  };

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: "3rem" }}>🔐 Verifying token...</p>;
  }

  return (
    <div style={{ padding: "2rem", }}>
  <h2>📚 Book Dashboard</h2>

  <button onClick={()=>{navigate('/addbook')}}>Add Book</button>
  {error && <p style={{ color: "red" }}>{error}</p>}

  {books.length > 0 ? (
    <table style={{ width: "100%", minWidth: "800px", borderCollapse: "collapse", marginTop: "1rem" }}>
      <thead>
        <tr style={{ backgroundColor: "#f2f2f2" }}>
          <th style={thStyle}>Image</th>
          <th style={thStyle}>Name</th>
          <th style={thStyle}>Author</th>
          <th style={thStyle}>Price</th>
          <th style={thStyle}>Actions</th>
          <th style={thStyle}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book._id}>
            <td style={tdStyle}>
              <img
                src={`http://localhost:8080${book.bookImage}`}
                alt="book"
                style={{ width: "60px", height: "80px", objectFit: "cover" }}
              />
            </td>
            <td style={tdStyle}>{book.bookName}</td>
            <td style={tdStyle}>{book.bookAuthor}</td>
            <td style={tdStyle}>₹{book.bookPrice}</td>
            <td style={tdStyle}>
              <button onClick={() => handleEdit(book._id)} style={btnStyle} >Edit</button>
            </td>
            <td style={tdStyle}>

              <button onClick={() => handleDelete(book._id)} style={{ ...btnStyle, backgroundColor: "#f44336" }}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>No books available.</p>
  )}
</div>

  );
};

const thStyle = {
  padding: "12px",
  border: "1px solid #ddd",
  textAlign: "left",
};

const tdStyle = {
  padding: "12px",
  border: "1px solid #ddd",
};

const btnStyle = {
  marginRight: "8px",
  padding: "6px 12px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default Dashboard;
