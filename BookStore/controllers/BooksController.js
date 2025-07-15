
const book = require("../models/Book");

const getAllBooks = async (req, res) => {
  try {
    const books = await book.find();
    res.status(200).json({
      success: true,
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch books",
      error: error.message,
    });
  }
};

const createBook = async (req, res) => { 
  try {
    const { bookName, bookAuthor, bookPrice } = req.body;
    const bookImage = req.file?.filename;

    if (!bookName || !bookAuthor || !bookPrice || !bookImage) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newBook = new book({
      bookName,
      bookAuthor,
      bookPrice,
      bookImage: `/uploads/${bookImage}`, // Save path
    });

    await newBook.save();

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: newBook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create book",
      error: error.message,
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const deletedBook = await book.findByIdAndDelete(bookId);

    if (!deletedBook) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete book",
      error: error.message,
    });
  }
};

const getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const foundBook = await book.findById(bookId);

    if (!foundBook) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    res.status(200).json({
      success: true,
      data: foundBook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch book",
      error: error.message,
    });
  }
};

const updateBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const { bookName, bookAuthor, bookPrice } = req.body;
    const bookImage = req.file?.filename;

    const updateData = {
      bookName,
      bookAuthor,
      bookPrice,
    };

    if (bookImage) {
      updateData.bookImage = `/uploads/${bookImage}`;
    }

    const updatedBook = await book.findByIdAndUpdate(bookId, updateData, { new: true });

    if (!updatedBook) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update book",
      error: error.message,
    });
  }
};


module.exports = { 
  getAllBooks ,
  createBook,
  deleteBook,
  getBookById,
  updateBook
};
