
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const token = localStorage.getItem("token");

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data.cart.items.map(item => item.book));
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    if (token) fetchCart();
  }, [token]);

  const addToCart = async (book) => {
    try {
      await axios.post(
        "http://localhost:8080/api/cart/add",
        { bookId: book._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCart();
    } catch (err) {
      toast.error("❌ Failed to add to cart.");
    }
  };

  const removeFromCart = async (bookId) => {
    try {
      console.log(bookId,"----bookId--")
      await axios.delete(`http://localhost:8080/api/cart/${bookId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("❌ Removed from cart!");
      fetchCart();
    } catch (err) {
      toast.error("Failed to remove item.");
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
