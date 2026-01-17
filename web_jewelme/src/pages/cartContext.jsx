import React, { createContext, useState, useEffect, useContext } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

const CART_KEY = "jewelme_cart"; // Unique key for localStorage

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem(CART_KEY);
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  //  Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  //  Add to cart with quantity = 1
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const exists = prevItems.find((item) => item._id === product._id);
      if (exists) return prevItems;
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // Remove from cart
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  //  Update quantity (+ or -)
  const updateQuantity = (id, change) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
