import React, { useEffect, useState } from "react";
import { fetchAllProducts } from "../../api/publicProductApi";
import { getBackendImageUrl } from "../../utils/backend-image";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { FaHeart, FaUserCircle, FaShoppingBag, FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";
import { useWishlist } from "../wishlistContent";
import { motion } from "framer-motion";
import { useAddToCart } from "../../hooks/useCart"; // backend mutation
import { toast } from "react-toastify";

export default function NecklacesPage() {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { mutate: addToCart } = useAddToCart();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userName = storedUser?.name || "Guest";

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

  useEffect(() => {
    fetchAllProducts()
      .then((res) => {
        const necklaces = res.data.filter(
          (product) => product.categoryId?.name?.toLowerCase() === "necklaces"
        );
        setProducts(necklaces);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="font-serif min-h-screen flex flex-col">
      {/* Header */}
      <header
        className="flex justify-between items-center p-4 border-b"
        style={{ backgroundColor: "#FFFEF9" }}
      >
        <div className="w-32">
          <img src="/images/splash.png" alt="JewelMe Logo" className="w-full h-auto" />
        </div>

        <nav className="space-x-6 text-sm">
          {[
            "/dashboard",
            "/necklaces",
            "/hoops",
            "/rings",
            "/bracelets",
            "/watches",
            "/bestsellers",
          ].map((path, idx) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                isActive
                  ? "text-red-500"
                  : "text-black hover:text-red-500 transition-colors duration-300"
              }
            >
              {["Home", "Necklaces", "Hoops", "Rings", "Bracelets", "Watches", "Best Sellers"][idx]}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3 text-xl">
          <Link to="/profile" title="Profile" className="text-red-500 hover:text-black">
            <FaUserCircle />
          </Link>
          <span className="text-sm text-black font-normal">Welcome, {userName}</span>

          <Link to="/tobag" title="Bag" className="text-red-500 hover:text-black">
            <FaShoppingBag />
          </Link>
          <Link to="/wishlist" title="Wishlist" className="text-red-500 hover:text-black">
            <FaHeart />
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="flex-grow bg-gradient-to-br from-indigo-50 to-white px-6 py-12">
        <h1 className="text-4xl font-extrabold text-center text-yellow-600 mb-10">
          Necklaces
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              onClick={() => navigate(`/products/${product._id}`)}
              className="relative group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer"
            >
              <button
                className={`absolute top-3 right-3 z-10 bg-white p-2 rounded-full shadow-lg transition-colors duration-300 ${
                  isInWishlist(product._id)
                    ? "text-red-500"
                    : "text-gray-400 hover:text-red-500"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(product);
                }}
              >
                <FaHeart size={20} />
              </button>

              <img
                src={getBackendImageUrl(product.filepath)}
                alt={product.name}
                className="w-full h-[320px] object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="p-5 space-y-2">
                <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
                <p className="text-md text-gray-600">Rs. {product.price}</p>
                <p className="text-sm text-gray-500">In Stock: {product.stock}</p>
                <p className="text-sm text-gray-500 truncate">
                  {product.description || "No description available"}
                </p>

                <div className="pt-3">
                  <motion.button
                    whileTap={{ scale: 0.12, rotate: -12 }}
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
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-red-300 text-black px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
        <div>
          <h4 className="text-lg font-bold mb-3 tracking-wide">Stay Connected</h4>
          <p className="leading-relaxed">
            Discover exclusive offers, early access to new collections, style inspiration, and personalized recommendations just for you. Be the first to know about limited-time deals and member-only perks.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-3 tracking-wide">Quick Links</h4>
          <ul className="space-y-2">
            <li className="hover:underline cursor-pointer">Help</li>
            <li className="hover:underline cursor-pointer">Shipping & Returns</li>
            <li className="hover:underline cursor-pointer">Jewelry Guide</li>
            <li className="hover:underline cursor-pointer">Our Story</li>
            <li className="hover:underline cursor-pointer">FAQs</li>
            <li className="hover:underline cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-3 tracking-wide">Contact Us</h4>
          <p className="mb-1">Phone: 123-456-789</p>
          <p className="mb-1">Email: support@jewelme.com</p>
          <p className="mb-3">Kathmandu, Nepal</p>
          <p className="font-semibold mt-2">Working Hours:</p>
          <p>Mon - Fri: 9:00am - 6:00pm</p>
          <p>Sat - Sun: 10:00am - 4:00pm</p>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-3 tracking-wide">Follow Us</h4>
          <p>Connect on social platforms:</p>
          <div className="flex items-center gap-4 mt-3">
            <FaInstagram className="text-2xl hover:scale-110 hover:text-white transition-all duration-200 cursor-pointer" />
            <FaFacebook className="text-2xl hover:scale-110 hover:text-white transition-all duration-200 cursor-pointer" />
            <FaTiktok className="text-2xl hover:scale-110 hover:text-white transition-all duration-200 cursor-pointer" />
          </div>
          <p className="mt-2 text-xs font-bold">@Jewelmeeveryday</p>
        </div>
      </footer>

      <div className="bg-red-300 text-center text-sm py-4 text-black border-t border-black">
        © 2025 JewelMe. All rights reserved.
      </div>
    </div>
  );
}
