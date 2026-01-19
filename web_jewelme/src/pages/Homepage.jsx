import React, { useContext, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaHeart,
  FaChevronRight,
  FaChevronLeft,
} from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";

const categories = [
  { name: "Jhumka", img: "/images/jhumka1.jpg" },
  { name: "Necklaces", img: "/images/necklace1.jpg" },
  { name: "Hoops", img: "/images/heartear.jpg" },
  { name: "Gold Rings", img: "/images/ring.jpg" },
  { name: "Vintage Watch", img: "/images/watch.jpg" },
  { name: "Diamond Rings", img: "/images/dia.jpg" },
  { name: "Bracelets", img: "/images/bracelet2.jpg" },
];

const catalogImages = [
  "/images/bracelet2.jpg",
  "/images/dia.jpg",
  "/images/necklace3.jpg",
  "/images/watch.jpg",
  "/images/dia.jpg",
  "/images/necklace3.jpg",
  "/images/watch.jpg",
];
const softCream = "#FFFEF9";
const goldPrimary = "#D4AF37";

export default function JewelMeHome() {
  const { user, logout } = useContext(AuthContext);
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="font-serif">
      {/* Header */}
      <header
        className="flex justify-between items-center p-5 border-b border-gold-200 sticky top-0 z-[100] shadow-sm"
        style={{ backgroundColor: softCream }}
      >
        <div className="w-36 transition-transform hover:scale-105">
          <img
            src="/images/splash.png"
            alt="JewelMe Logo"
            className="drop-shadow-sm"
          />
        </div>

        <nav className="hidden lg:flex space-x-8 text-sm uppercase tracking-widest font-medium">
          {["/", "/shop", "/pages", "/about"].map((path, idx) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `transition-all duration-300 border-b-2 ${
                  isActive
                    ? "border-[#D4AF37] text-[#D4AF37]"
                    : "border-transparent text-gray-600 hover:text-[#D4AF37] hover:border-[#D4AF37]"
                }`
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

        <div className="space-x-2">
          {!user ? (
            <>
              <Link
                to="/login"
                className="px-4 py-1 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-yellow-300 rounded transition-colors duration-300"
                style={{
                  background: "transparent",
                }}
              >
                LOGIN
              </Link>

              <Link
                to="/register"
                className="px-4 py-1 text-white rounded transition-all duration-300 shadow-md hover:opacity-90"
                style={{
                  background:
                    "linear-gradient(135deg, #D4AF37 0%, #C5A028 100%)",
                  color: "white",
                }}
              >
                SIGNUP
              </Link>
            </>
          ) : (
            <>
              <span className="text-sm">Welcome, {user.email}</span>
              <button
                onClick={logout}
                className="px-4 py-1 border border-red-400 text-red-400 hover:bg-red-400 hover:text-white rounded transition-colors duration-300"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </header>

      {/* Hero */}
      <motion.div
        className="w-full h-[500px] md:h-[650px] bg-cover bg-center relative"
        style={{ backgroundImage: "url('/images/homepagee.png')" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
          <div className="text-center text-white space-y-4">
            <h1 className="text-5xl md:text-7xl font-light tracking-widest uppercase drop-shadow-lg">
              Timeless Elegance
            </h1>
            <p className="text-lg md:text-xl italic font-serif">
              Handcrafted Gold & Diamond Jewelry
            </p>
          </div>
        </div>
      </motion.div>

      {/* Categories Section */}
      <section className="py-10 bg-[linear-gradient(to_right,_#fef6f9,_#f0f4ff,_#f6fff9)]">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8 tracking-wide"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          Best Sellers
        </motion.h2>

        <div className="flex justify-center flex-wrap gap-6 px-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              className="text-center text-black cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300, delay: i * 0.1 }}
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="w-48 h-48 object-cover rounded-full shadow-lg mx-auto"
              />
              <p className="mt-3 font-semibold text-lg text-gray-700">
                {cat.name}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="bg-[#f4f1ed] p-8 relative">
        <motion.h2
          className="text-4xl font-bold text-gray-800 mb-6 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Best Sellers
        </motion.h2>

        {/* Scroll Buttons */}
        <button
          onClick={scrollLeft}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition"
        >
          <FaChevronLeft className="text-xl text-gray-700" />
        </button>

        <button
          onClick={scrollRight}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition"
        >
          <FaChevronRight className="text-xl text-gray-700" />
        </button>

        {/* Scrollable Images */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto overflow-y-hidden scroll-smooth px-1 pb-2 h-80"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {catalogImages.map((img, i) => (
            <motion.div
              key={i}
              className="relative min-w-[200px] h-80 rounded-lg overflow-hidden shadow-lg flex-shrink-0 will-change-transform"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{ scrollbarWidth: "none" }}
            >
              <img
                src={img}
                alt={`Catalog ${i}`}
                className="w-full h-full object-cover"
              />
              <button className="absolute bottom-3 right-3 bg-white p-2 rounded-full shadow hover:text-red-500 transition text-gray-700">
                <FaHeart />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Spring Catalog Section */}
      <section className="relative bg-[url('/images/beachimg.jpg')] bg-cover bg-center h-[800px] md:h-[800px] w-full text-center text-white">
        <div className="max-w-4xl mx-auto px-6 flex flex-col justify-center h-full">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-800 mb-6">
            Summer Catalog
          </h1>
          <a
            href="#"
            className="text-xl md:text-5xl font-medium text-gray-700 hover:text-white inline-flex items-center justify-center gap-2"
          >
            View Now <span className="text-3xl">→</span>
          </a>
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
