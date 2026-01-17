import React, { useEffect, useState } from "react";
import { fetchAllProducts } from "../api/publicProductApi";
import { getBackendImageUrl } from "../utils/backend-image";
import {
  FaHeart,
  FaUserCircle,
  FaShoppingBag,
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaSearch,
} from "react-icons/fa";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useWishlist } from "../pages/wishlistContent";
import { useAddToCart } from "../hooks/useCart";

export default function Dashboard() {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?._id;
  const userName = storedUser?.name || "Guest";

  const { mutate: addToCart } = useAddToCart(); // <-- backend mutation
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [products, setProducts] = useState([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();

  const bestsellers = products.filter(
    (product) => product.categoryId?.name?.toLowerCase() === "best sellers"
  );

  const shopProducts = products.filter(
    (product) => !bestsellers.some((b) => b._id === product._id)
  );

  const toggleDrawer = () => setCartOpen((prev) => !prev);

  const toggleFavorite = (product) => {
    const alreadyFavorited = isInWishlist(product._id);
    alreadyFavorited ? removeFromWishlist(product._id) : addToWishlist(product);
  };

  const handleAddToCart = (product) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.id) {
      toast.error("Please login to add items to cart");
      return;
    }

    const payload = {
      userId: user.id, // ✅ correct key
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      filepath: product.filepath || "",
    };

    addToCart(payload); // ✅ correct usage
  };

  useEffect(() => {
    fetchAllProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="font-serif">
      {/* Header */}
      <header
        className="flex justify-between items-center p-4 border-b"
        style={{ backgroundColor: "#FFFEF9" }}
      >
        <div className="w-32">
          <img
            src="/images/splash.png"
            alt="JewelMe Logo"
            className="w-full h-auto"
          />
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
              {
                [
                  "Home",
                  "Necklaces",
                  "Hoops",
                  "Rings",
                  "Bracelets",
                  "Watches",
                  "Best Sellers",
                ][idx]
              }
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3 text-xl">
          {/* Search */}
          <div className="relative">
            <button
              onClick={() => setShowSearchDropdown((prev) => !prev)}
              title="Search"
              className="text-red-500 hover:text-black transition-colors duration-200 p-1"
            >
              <FaSearch size={18} />
            </button>

            {showSearchDropdown && (
              <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg z-50 p-4 w-64">
                <input
                  type="text"
                  placeholder="Search products..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border rounded mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
                />

                <div className="border-t pt-2">
                  <p className="text-xs font-semibold mb-1 text-gray-500">
                    Categories
                  </p>
                  {[
                    { label: "Best Sellers", path: "/bestsellers" },
                    { label: "Necklaces", path: "/necklaces" },
                    { label: "Hoops", path: "/hoops" },
                    { label: "Rings", path: "/rings" },
                    { label: "Bracelets", path: "/bracelets" },
                    { label: "Watches", path: "/watches" },
                    { label: "Traditionals", path: "/traditionals" },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      to={item.path}
                      className="block px-2 py-1 text-sm text-gray-700 hover:bg-red-100 rounded"
                      onClick={() => setShowSearchDropdown(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                {searchTerm && (
                  <div className="border-t mt-2 pt-2">
                    <p className="text-xs font-semibold text-gray-500 mb-1">
                      Results
                    </p>
                    {products
                      .filter((product) =>
                        product.name
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      )
                      .slice(0, 5)
                      .map((product) => (
                        <div
                          key={product._id}
                          className="cursor-pointer px-2 py-1 text-sm hover:bg-gray-100 rounded"
                          onClick={() => {
                            navigate(`/products/${product._id}`);
                            setShowSearchDropdown(false);
                          }}
                        >
                          {product.name}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <Link
            to="/profile"
            title="Profile"
            className="text-red-500 hover:text-black"
          >
            <FaUserCircle />
          </Link>
          <span className="text-sm text-black font-normal">Welcome, {userName}</span>

          <Link
            to="/tobag"
            title="Bag"
            onClick={toggleDrawer}
            className="text-red-500 hover:text-black"
          >
            <FaShoppingBag />
          </Link>
          <Link
            to="/wishlist"
            title="Wishlist"
            className="text-red-500 hover:text-black"
          >
            <FaHeart />
          </Link>
        </div>
      </header>

      {/* Hero */}
      <motion.div
        className="w-full h-[600px] bg-cover bg-center"
        style={{ backgroundImage: "url('/images/homepagee.png')" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Bestsellers */}
      <section className="px-6 pt-12">
        <h2 className="text-4xl font-bold text-center text-yellow-600 mb-8">
          Bestsellers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {bestsellers.map((product) => {
            const isFavorited = isInWishlist(product._id);

            return (
              <div
                key={product._id}
                onClick={() => navigate(`/products/${product._id}`)}
                className="relative group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer"
              >
                <button
                  className={`absolute top-3 right-3 z-10 bg-white p-2 rounded-full shadow-lg transition-colors duration-300 ${
                    isFavorited
                      ? "text-red-500"
                      : "text-gray-400 hover:text-red-500"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(product);
                  }}
                >
                  <FaHeart size={18} />
                </button>

                <img
                  src={getBackendImageUrl(product.filepath)}
                  alt={product.name}
                  className="w-full h-[320px] object-cover transition-transform duration-300 group-hover:scale-105"
                />

                <div className="p-5 space-y-2">
                  <h3 className="text-xl font-bold text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-md text-gray-600">Rs. {product.price}</p>
                  <p className="text-sm text-gray-500">
                    In Stock: {product.stock}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {product.description || "No description available"}
                  </p>

                  <div className="pt-3">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold py-2 rounded-xl shadow-md hover:from-pink-600 hover:to-red-600 transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                        addToCart(product);
                      }}
                    >
                      Add to Bag
                    </motion.button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Shop Products */}
      <section className="px-6 pt-16 pb-12">
        <h2 className="text-4xl font-bold text-center text-red-500 mb-8">
          Shop Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {shopProducts.map((product) => {
            const isFavorited = isInWishlist(product._id);

            return (
              <div
                key={product._id}
                onClick={() => navigate(`/products/${product._id}`)}
                className="relative group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer"
              >
                <button
                  className={`absolute top-3 right-3 z-10 bg-white p-2 rounded-full shadow-lg transition-colors duration-300 ${
                    isFavorited
                      ? "text-red-500"
                      : "text-gray-400 hover:text-red-500"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(product);
                  }}
                >
                  <FaHeart size={18} />
                </button>

                <img
                  src={getBackendImageUrl(product.filepath)}
                  alt={product.name}
                  className="w-full h-[320px] object-cover transition-transform duration-300 group-hover:scale-105"
                />

                <div className="p-5 space-y-2">
                  <h3 className="text-xl font-bold text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-md text-gray-600">Rs. {product.price}</p>
                  <p className="text-sm text-gray-500">
                    In Stock: {product.stock}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {product.description || "No description available"}
                  </p>

                  <div className="pt-3">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold py-2 rounded-xl shadow-md hover:from-pink-600 hover:to-red-600 transition-all duration-300"
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
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-red-300 text-black px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
        {/* Stay Connected */}
        <div>
          <h4 className="text-lg font-bold mb-3 tracking-wide">
            Stay Connected
          </h4>
          <p className="leading-relaxed">
            Discover exclusive offers, early access to new collections, style
            inspiration, and personalized recommendations just for you. Be the
            first to know about limited-time deals and member-only perks.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-bold mb-3 tracking-wide">Quick Links</h4>
          <ul className="space-y-2">
            <li className="hover:underline cursor-pointer">Help</li>
            <li className="hover:underline cursor-pointer">
              Shipping & Returns
            </li>
            <li className="hover:underline cursor-pointer">Jewelry Guide</li>
            <li className="hover:underline cursor-pointer">Our Story</li>
            <li className="hover:underline cursor-pointer">FAQs</li>
            <li className="hover:underline cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-bold mb-3 tracking-wide">Contact Us</h4>
          <p className="mb-1">Phone: 123-456-789</p>
          <p className="mb-1">Email: support@jewelme.com</p>
          <p className="mb-3"> Kathmandu, Nepal</p>
          <p className="font-semibold mt-2">Working Hours:</p>
          <p>Mon - Fri: 9:00am - 6:00pm</p>
          <p>Sat - Sun: 10:00am - 4:00pm</p>
        </div>

        {/* Social Media */}
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
