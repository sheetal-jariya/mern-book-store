
const express = require('express');
const multer = require('multer');
const path = require('path');
const { authenticateUser, authorizeRoles } = require("../middlewares/authMiddleware");
const user_controller = require('../controllers/userController');
const booksController = require("../controllers/BooksController");
const Cart = require("../models/Cart");
const {
  addToCart,
  getCart,
  removeFromCart,
  updateCartItem,
  clearCart
} = require("../controllers/cartController");
const router = express.Router();
router.use(express.urlencoded({ extended: true }));

// File upload setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});
const upload = multer({ storage: storage });

// -------------------- Auth Routes --------------------
router.post("/register", user_controller.registerUser);
router.post("/login", user_controller.userLogin);
router.post("/forgot-password", user_controller.forgotPasswordController);
router.post("/reset-password", user_controller.resetPasswordController);

// -------------------- User Profile --------------------
router.get("/profile", authenticateUser, user_controller.getUserProfile);
router.put("/editprofile", authenticateUser, user_controller.updateUserProfile);

// -------------------- Books Routes --------------------

// View books (accessible to both user and admin)
router.get("/allbooks", authenticateUser, authorizeRoles("admin", "user"), booksController.getAllBooks);
router.get("/books/:id", authenticateUser, authorizeRoles("admin", "user"), booksController.getBookById);

// Admin-only: Add, update, delete books
router.post("/createBook", authenticateUser, authorizeRoles("admin"), upload.single("bookImage"), booksController.createBook);
router.put("/books/:id", authenticateUser, authorizeRoles("admin"), upload.single("bookImage"), booksController.updateBook);
router.delete("/deletebooks/:id", authenticateUser, authorizeRoles("admin"), booksController.deleteBook);

//---------------------Add to cart ----------------------------------------
router.post("/cart/add", authenticateUser, authorizeRoles("user"), addToCart);
router.get("/cart", authenticateUser, authorizeRoles("user"), getCart);
router.delete("/cart/:bookId", authenticateUser, authorizeRoles("user"), removeFromCart);
router.put("/cart/:bookId", authenticateUser, authorizeRoles("user"), updateCartItem);
router.delete("/cart", authenticateUser, authorizeRoles("user"), clearCart); 


module.exports = router;
