import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookName, setBookName] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookPrice, setBookPrice] = useState("");
  const [bookImage, setBookImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/books/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const book = res.data.data;
        setBookName(book.bookName);
        setBookAuthor(book.bookAuthor);
        setBookPrice(book.bookPrice);
        setPreview(`http://localhost:8080${book.bookImage}`);
      } catch (err) {
        console.error("Failed to fetch book:", err);
        toast.error("Failed to load book.");
        navigate("/dashboard");
      }
    };

    fetchBook();
  }, [id, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!bookName || !bookAuthor || !bookPrice) {
      toast.error("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("bookName", bookName);
    formData.append("bookAuthor", bookAuthor);
    formData.append("bookPrice", bookPrice);
    if (bookImage) formData.append("bookImage", bookImage);

    try {
      await axios.put(`http://localhost:8080/api/books/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("✅ Book updated successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("❌ Failed to update book.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.1)] ring-1 ring-orange-200">
      <h2 className="text-2xl font-bold mb-6 text-orange-500">✏️ Edit Book</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="font-semibold block mb-1">Book Name:</label>
          <input
            type="text"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div>
          <label className="font-semibold block mb-1">Author:</label>
          <input
            type="text"
            value={bookAuthor}
            onChange={(e) => setBookAuthor(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div>
          <label className="font-semibold block mb-1">Price (₹):</label>
          <input
            type="number"
            value={bookPrice}
            onChange={(e) => setBookPrice(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div>
          <label className="font-semibold block mb-1">Image:</label>
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-24 h-32 object-cover mb-2 rounded border"
            />
          )}
          <input
            type="file"
            onChange={(e) => setBookImage(e.target.files[0])}
            accept="image/*"
            className="block"
          />
        </div>

        <button
          type="submit"
          className="bg-orange-500 text-white px-5 py-2 rounded hover:bg-orange-600 transition"
        >
          Update Book
        </button>
      </form>
    </div>
  );
};

export default EditBook;
