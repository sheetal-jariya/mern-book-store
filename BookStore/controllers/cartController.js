const Cart = require("../models/Cart");
const Book = require("../models/Book");

const addToCart = async (req, res) => {
  const userId = req.user.id;
  const { bookId, quantity = 1 } = req.body;

  try {
    const existingBook = await Book.findById(bookId);
    if (!existingBook) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [{ book: bookId, quantity }] });
    } else {
      const existingItem = cart.items.find(item => item.book.toString() === bookId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ book: bookId, quantity });
      }
    }

    await cart.save();
    res.status(200).json({ success: true, message: "Added to cart", cart });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};
// Get user's cart
const getCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ user: userId }).populate("items.book");
    if (!cart) return res.status(404).json({ message: "Cart is empty" });

    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.log(error,"-----------")
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  const userId = req.user.id;
  const bookId = req.params.bookId;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(item => item.book.toString() !== bookId);
    await cart.save();

    res.status(200).json({ success: true, message: "Item removed", cart });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Update item quantity
const updateCartItem = async (req, res) => {
  const userId = req.user.id;
  const bookId = req.params.bookId;
  const { quantity } = req.body;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(item => item.book.toString() === bookId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.quantity = quantity;
    await cart.save();

    res.status(200).json({ success: true, message: "Quantity updated", cart });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Clear full cart
const clearCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = [];
    await cart.save();

    res.status(200).json({ success: true, message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
  updateCartItem,
  clearCart
};
