const express = require('express');
const multer = require('multer');
const path = require('path');
const authenticateUser = require("../middlewares/authMiddleware");
const user_controller = require('../controllers/userController');
const booksController=require("../controllers/BooksController");

const router=express.Router();
router.use(express.urlencoded({extended:true}))

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder to store images
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // unique name
  }
});
const upload = multer({ storage: storage });

router.post("/register", user_controller.registerUser );
router.post("/login", user_controller.userLogin );
router.get("/profile",authenticateUser,user_controller.getUserProfile);
router.put("/editprofile", authenticateUser, user_controller.updateUserProfile);
router.get("/allbooks", authenticateUser, booksController.getAllBooks);

router.get("/books/:id", authenticateUser, booksController.getBookById);

router.post("/createBook", authenticateUser, upload.single("bookImage"), booksController.createBook);

router.put("/books/:id", authenticateUser, upload.single("bookImage"), booksController.updateBook);

router.delete("/deletebooks/:id", authenticateUser, booksController.deleteBook);
module.exports = router;