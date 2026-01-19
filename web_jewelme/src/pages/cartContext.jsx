// import React, { createContext, useState, useEffect, useContext } from "react";

// const CartContext = createContext();
// export const useCart = () => useContext(CartContext);

// const CART_KEY = "jewelme_cart"; // Unique key for localStorage

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);

//   // Load cart from localStorage on mount
//   useEffect(() => {
//     const storedCart = localStorage.getItem(CART_KEY);
//     if (storedCart) {
//       setCartItems(JSON.parse(storedCart));
//     }
//   }, []);

//   //  Save cart to localStorage on change
//   useEffect(() => {
//     localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
//   }, [cartItems]);

//   //  Add to cart with quantity = 1
//   const addToCart = (product) => {
//     setCartItems((prevItems) => {
//       const exists = prevItems.find((item) => item._id === product._id);
//       if (exists) return prevItems;
//       return [...prevItems, { ...product, quantity: 1 }];
//     });
//   };

//   // Remove from cart
//   const removeFromCart = (id) => {
//     setCartItems((prev) => prev.filter((item) => item._id !== id));
//   };

//   //  Update quantity (+ or -)
//   const updateQuantity = (id, change) => {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item._id === id
//           ? { ...item, quantity: Math.max(1, item.quantity + change) }
//           : item
//       )
//     );
//   };

//   return (
//     <CartContext.Provider
//       value={{ cartItems, addToCart, removeFromCart, updateQuantity }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };
import React, { createContext, useContext, useEffect, useState } from "react";

/* ================= CONTEXT ================= */
const CartContext = createContext(null);

/* ================= CUSTOM HOOK ================= */
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
};

const CART_KEY = "jewelme_cart";

/* ================= PROVIDER ================= */
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  /* Load cart from localStorage */
  useEffect(() => {
    const storedCart = localStorage.getItem(CART_KEY);
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  /* Save cart to localStorage */
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  /* Add item */
  const addToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item._id === product._id);
      if (exists) return prev;
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  /* Remove item */
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  /* Update quantity */
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
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
