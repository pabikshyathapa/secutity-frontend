import React, { useState, useEffect } from "react";
import { useCart } from "../pages/cartContext";
import { getBackendImageUrl } from "../utils/backend-image";
import { useNavigate } from "react-router-dom";

export default function CartDrawer({ isOpen, onClose }) {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Your");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.name) {
      setUserName(storedUser.name.split(" ")[0]);
    }
  }, []);

  useEffect(() => {
    setSelectedItems(cartItems.map((item) => item._id));
  }, [cartItems]);

  const handleSelect = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const selectedProducts = cartItems.filter((item) =>
    selectedItems.includes(item._id)
  );

  const total = selectedProducts.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div
      className={`fixed top-0 right-0 w-full sm:w-[550px] h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button
        className="absolute top-4 right-4 text-gray-500 hover:text-black"
        onClick={onClose}
      >
        ✕
      </button>

      <div className="p-6 overflow-y-auto h-full pb-28">
        <h2 className="text-3xl font-semibold mb-8">{userName}'s Bag</h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your Bag is empty.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-start gap-2 bg-gray-100 p-3 rounded"
              >
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item._id)}
                  onChange={() => handleSelect(item._id)}
                  className="mt-2"
                />
                <img
                  src={getBackendImageUrl(item.filepath)}
                  alt={item.name}
                  className="w-20 h-25 object-cover rounded cursor-pointer"
                  onClick={() => navigate(`/products/${item._id}`)}
                />
                <div
                  className="flex-1 cursor-pointer"
                  onClick={() => navigate(`/products/${item._id}`)}
                >
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">Rs. {item.price}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateQuantity(item._id, -1);
                      }}
                      className="px-2 text-lg font-bold border rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateQuantity(item._id, 1);
                      }}
                      className="px-2 text-lg font-bold border rounded"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromCart(item._id);
                    }}
                    className="text-red-500 text-xs hover:underline mt-1"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {/* TOTAL and CHECKOUT */}
            <div className="pt-4 border-t mt-4">
              <p className="font-bold text-lg">
                Total ({selectedItems.length} items): Rs. {total}
              </p>
              <button
                disabled={selectedItems.length === 0}
                className={`mt-2 w-full py-2 rounded text-white font-semibold ${
                  selectedItems.length === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-500 hover:bg-indigo-600"
                }`}
                onClick={() => {
                  const selectedProducts = cartItems.filter((item) =>
                    selectedItems.includes(item._id)
                  );

                  navigate("/checkout", {
                    state: {
                      selectedItems: selectedProducts,
                    },
                  });
                }}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
