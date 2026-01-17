import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { useWishlist } from "./wishlistContent";
import { useAddToCart } from "../hooks/useCart"; // backend mutation hook
import { toast } from "react-toastify";
import { getBackendImageUrl } from "../utils/backend-image";

export default function ProductDetails() {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { mutate: addToCart } = useAddToCart();

  useEffect(() => {
    axios
      .get(`http://localhost:5050/api/products/${id}`)
      .then((res) => {
        setProduct(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);

  const toggleFavorite = (product) => {
    const alreadyFavorited = isInWishlist(product._id);
    if (alreadyFavorited) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (product) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id) {
      toast.error("Please login to add items to cart");
      return;
    }
    const payload = {
      userId: user.id,
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      filepath: product.filepath || "",
    };
    addToCart(payload);
  };

  if (loading)
    return (
      <div className="p-10 text-center text-gray-600">Loading product...</div>
    );
  if (!product)
    return (
      <div className="p-10 text-center text-red-500">Product not found.</div>
    );

  const isFavorited = isInWishlist(product._id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white px-6 py-12 flex justify-center">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-xl p-8 flex flex-col md:flex-row gap-10 relative">
        {/* Favorite Heart Icon */}
        <button
          className={`absolute top-2 right-4 z-10 bg-white p-2 rounded-full shadow-lg transition-colors duration-300 ${
            isFavorited ? "text-red-500" : "text-gray-400 hover:text-red-500"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product);
          }}
        >
          <FaHeart size={20} />
        </button>

        {/* Left Side: Image */}
        <div className="w-full md:w-3/5 h-full flex items-start">
          <img
            src={getBackendImageUrl(product.filepath)}
            alt={product.name}
            className="w-full h-full max-h-[600px] object-cover rounded-2xl shadow-md transition-transform duration-500 hover:scale-105 cursor-zoom-in"
          />
        </div>

        {/* Right Side: Info */}
        <div className="w-full md:w-2/5 flex flex-col justify-between gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-indigo-800 mb-2">
              {product.name}
            </h1>
            <p className="text-xl text-red-600 font-bold mb-4">
              Rs. {product.price}
            </p>
            <p className="text-base text-gray-700 mb-2">
              {product.description || "No description available."}
            </p>
            <p className="text-sm text-gray-600">
              In Stock: <strong>{product.stock}</strong>
            </p>
            <p className="text-sm text-gray-600">
              {/* Category: {product.categoryId?.name || "N/A"} */}
            </p>
          </div>
          <div className="pt-3">
            <motion.button
              whileTap={{ scale: 0.15 }}
              className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold py-2 rounded-xl shadow-md hover:from-pink-600 hover:to-red-600 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-300"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(product);
              }}
            >
              Add to Bag
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
