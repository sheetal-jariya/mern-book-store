import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const [bookName, setBookName] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookPrice, setBookPrice] = useState("");
  const [bookImage, setBookImage] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 🔐 Token check on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to access this page.");
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bookName || !bookAuthor || !bookPrice || !bookImage) {
      setError("All fields are required.");
      return;
    }

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("bookName", bookName);
    formData.append("bookAuthor", bookAuthor);
    formData.append("bookPrice", bookPrice);
    formData.append("bookImage", bookImage);

    try {
      const res = await axios.post("http://localhost:8080/api/createBook", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        alert("✅ Book added successfully!");
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Add book error:", err);
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "2rem auto", padding: "1rem", border: "1px solid #ccc", borderRadius: "10px" }}>
      <h2>Add New Book</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Book Name:</label>
          <input type="text" value={bookName} onChange={(e) => setBookName(e.target.value)} style={inputStyle} required />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Author:</label>
          <input type="text" value={bookAuthor} onChange={(e) => setBookAuthor(e.target.value)} style={inputStyle} required />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Price:</label>
          <input type="number" value={bookPrice} onChange={(e) => setBookPrice(e.target.value)} style={inputStyle} required />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Image:</label>
          <input type="file" onChange={(e) => setBookImage(e.target.files[0])} accept="image/*" required />
        </div>
        <button type="submit" style={btnStyle}>Add Book</button>
      </form>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  marginTop: "4px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const btnStyle = {
  padding: "10px 20px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default AddBook;
