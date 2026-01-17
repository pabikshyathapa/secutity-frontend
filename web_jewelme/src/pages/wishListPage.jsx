import React, { useEffect, useState } from "react";
import { useWishlist } from "../pages/wishlistContent";
import { getBackendImageUrl } from "../utils/backend-image";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { useCart } from "./cartContext";
import {
  FaHeart,
  FaUserCircle,
  FaShoppingBag,
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaSearch,
} from "react-icons/fa";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, updateQuantity } = useWishlist();
  const [userName, setUserName] = useState("Your");
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.name) {
      setUserName(storedUser.name.split(" ")[0]);
    }
  }, []);

  return (
    <div className="font-serif min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-4 border-b" style={{ backgroundColor: "#FFFEF9" }}>
        <div className="w-32">
          <img src="/images/splash.png" alt="JewelMe Logo" className="w-full h-auto" />
        </div>

        <nav className="space-x-6 text-sm">
          {["/dashboard", "/necklaces", "/hoops", "/rings", "/bracelets", "/watches", "/bestsellers"].map((path, idx) => (
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

      {/* Main Wishlist Section */}
      <main className="flex-grow bg-white px-6 py-12">
<h2 className="text-3xl font-bold mb-8 text-center">{userName}'s Wishlist</h2>
        {wishlist.length === 0 ? (
          <p className="text-gray-600 text-center">No items in wishlist.</p>
        ) : (
          <div className="space-y-12">
           {wishlist.map((product) => (
  <div
    key={product._id}
    className="flex flex-col md:flex-row gap-6 items-start md:items-center border-b pb-8"
  >
    {/* Updated Image Container */}
    <div className="w-[200px] h-[200px] rounded-xl overflow-hidden shadow-md transition-transform duration-300 hover:scale-105">
      <img
        src={getBackendImageUrl(product.filepath)}
        alt={product.name}
        className="w-full h-full object-cover cursor-pointer"
        onClick={() => navigate(`/products/${product._id}`)}
      />
    </div>

    {/* Product Details */}
    <div className="flex-1 space-y-3">
      <div
        onClick={() => navigate(`/products/${product._id}`)}
        className="cursor-pointer"
      >
        <h3 className="text-xl font-semibold">{product.name}</h3>
        <p className="text-md mt-1 text-gray-700">Rs. {product.price}</p>
      </div>

      <div className="flex items-center space-x-3 mt-3">
        <button
          disabled={(product.quantity || 1) <= 1}
          onClick={(e) => {
            e.stopPropagation();
            updateQuantity(product._id, -1);
          }}
          className={`px-3 py-1 border text-lg rounded-sm ${
            (product.quantity || 1) <= 1
              ? "text-gray-400 border-gray-300 cursor-not-allowed"
              : "text-black border-black hover:bg-gray-100"
          }`}
        >
          –
        </button>
        <span className="w-8 text-center">{product.quantity || 1}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            updateQuantity(product._id, 1);
          }}
          className="px-3 py-1 border border-black text-lg rounded-sm hover:bg-gray-100"
        >
          +
        </button>
      </div>

      <div className="mt-8 flex items-center space-x-6">
        <button
          onClick={(e) => {
            e.stopPropagation();
            removeFromWishlist(product._id);
          }}
          className="bg-red-500 text-white py-2 px-10 rounded-full hover:bg-red-600 transition"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
))}

          </div>
        )}
      </main>

 <footer className="bg-red-300 text-black px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
  {/* Stay Connected */}
  <div>
    <h4 className="text-lg font-bold mb-3 tracking-wide">Stay Connected</h4>
    <p className="leading-relaxed">
      Discover exclusive offers, early access to new collections, style inspiration, and personalized
      recommendations just for you. Be the first to know about limited-time deals and member-only perks.
    </p>
  </div>

  {/* Quick Links */}
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
};

export default WishlistPage;
