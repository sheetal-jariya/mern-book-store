import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookName, setBookName] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookPrice, setBookPrice] = useState("");
  const [bookImage, setBookImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }

    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/books/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const book = res.data.data;
        setBookName(book.bookName);
        setBookAuthor(book.bookAuthor);
        setBookPrice(book.bookPrice);
        setPreview(`http://localhost:8080${book.bookImage}`);
      } catch (err) {
        console.error("Failed to fetch book:", err);
        setError("Failed to load book.");
      }
    };

    fetchBook();
  }, [id, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!bookName || !bookAuthor || !bookPrice) {
      setError("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("bookName", bookName);
    formData.append("bookAuthor", bookAuthor);
    formData.append("bookPrice", bookPrice);
    if (bookImage) {
      formData.append("bookImage", bookImage);
    }

    try {
      await axios.put(`http://localhost:8080/api/books/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("✅ Book updated successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Update failed:", err);
      setError("Failed to update book.");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "2rem auto", padding: "1rem", border: "1px solid #ccc", borderRadius: "10px" }}>
      <h2>Edit Book</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleUpdate}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Book Name:</label>
          <input type="text" value={bookName} onChange={(e) => setBookName(e.target.value)} required style={inputStyle} />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Author:</label>
          <input type="text" value={bookAuthor} onChange={(e) => setBookAuthor(e.target.value)} required style={inputStyle} />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Price:</label>
          <input type="number" value={bookPrice} onChange={(e) => setBookPrice(e.target.value)} required style={inputStyle} />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Image:</label><br />
          {preview && <img src={preview} alt="preview" style={{ width: "100px", marginBottom: "1rem" }} />}
          <input type="file" onChange={(e) => setBookImage(e.target.files[0])} accept="image/*" />
        </div>
        <button type="submit" style={btnStyle}>Update Book</button>
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

export default EditBook;
