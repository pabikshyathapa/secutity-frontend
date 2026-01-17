import React from "react";
import { useCart } from "../pages/cartContext";
import { getBackendImageUrl } from "../utils/backend-image";

export default function CartPage() {
  const { cartItems, removeFromCart } = useCart();

  console.log("Cart Items:", cartItems); // Debugging line

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid gap-4">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between bg-white p-4 rounded shadow"
            >
              <div className="flex items-center gap-4">
                <img
                  src={
                    item.filepath
                      ? getBackendImageUrl(item.filepath)
                      : "/images/default-product.png"
                  }
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-600">Rs. {item.price}</p>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
