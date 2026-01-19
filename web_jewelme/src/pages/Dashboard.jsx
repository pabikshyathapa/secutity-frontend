import React, { useEffect, useState } from "react";
import { fetchAllProducts } from "../api/publicProductApi";
import { getBackendImageUrl } from "../utils/backend-image";
import {
  FaHeart,
  FaUserCircle,
  FaShoppingBag,
  FaSearch,
} from "react-icons/fa";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useWishlist } from "../pages/wishlistContent";
import { useAddToCart } from "../hooks/useCart";
import { toast } from "react-toastify";

export default function Dashboard() {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?._id;
  const userName = storedUser?.name || "Guest";

  const { mutate: addToCart } = useAddToCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [products, setProducts] = useState([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  // Logic remains identical
  const bestsellers = products.filter(
    (product) => product.categoryId?.name?.toLowerCase() === "best sellers"
  );

  const shopProducts = products.filter(
    (product) => !bestsellers.some((b) => b._id === product._id)
  );

  const toggleFavorite = (product) => {
    const alreadyFavorited = isInWishlist(product._id);
    alreadyFavorited
      ? removeFromWishlist(product._id)
      : addToWishlist(product);
  };

  const handleAddToCart = (product) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user._id) {
      toast.error("Please login to add items to cart");
      return;
    }

    const payload = {
      userId: user._id,
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
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // UI Custom Colors
  const goldPrimary = "#D4AF37";
  const goldDark = "#B8860B";
  const softCream = "#FFFEF9";

  return (
    <div className="font-serif bg-[#FCFBF7] min-h-screen text-gray-800">
      {/* Header */}
      <header
        className="flex justify-between items-center p-5 border-b border-gold-200 sticky top-0 z-[100] shadow-sm"
        style={{ backgroundColor: softCream }}
      >
        <div className="w-36 transition-transform hover:scale-105">
          <img src="/images/splash.png" alt="JewelMe Logo" className="drop-shadow-sm" />
        </div>

        <nav className="hidden lg:flex space-x-8 text-sm uppercase tracking-widest font-medium">
          {[
            ["/dashboard", "Home"],
            ["/necklaces", "Necklaces"],
            ["/hoops", "Hoops"],
            ["/rings", "Rings"],
            ["/bracelets", "Bracelets"],
            ["/watches", "Watches"],
            ["/bestsellers", "Best Sellers"],
          ].map(([path, label]) => (
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
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-5 text-xl">
          {/* Search */}
          <div className="relative">
            <button
              onClick={() => setShowSearchDropdown((p) => !p)}
              className="hover:text-[#D4AF37] transition-colors text-gray-700"
            >
              <FaSearch size={18} />
            </button>

            <AnimatePresence>
              {showSearchDropdown && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-4 bg-white border border-gold-100 rounded-xl shadow-2xl z-50 p-4 w-72"
                >
                  <input
                    type="text"
                    placeholder="Search our collection..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:border-[#D4AF37] text-sm"
                  />

                  {searchTerm && (
                    <div className="mt-3 max-h-60 overflow-y-auto">
                      {products
                        .filter((p) =>
                          p.name.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .slice(0, 5)
                        .map((p) => (
                          <div
                            key={p._id}
                            className="cursor-pointer px-3 py-2 text-sm hover:bg-[#FAF7ED] rounded-lg transition-colors flex items-center gap-3"
                            onClick={() => {
                              navigate(`/products/${p._id}`);
                              setShowSearchDropdown(false);
                            }}
                          >
                            <img src={getBackendImageUrl(p.filepath)} className="w-8 h-8 rounded-full object-cover" alt="" />
                            <span>{p.name}</span>
                          </div>
                        ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/profile" className="text-gray-700 hover:text-[#D4AF37] transition-colors flex items-center gap-2">
            <FaUserCircle />
            <span className="text-xs uppercase tracking-tighter hidden md:inline">Hi, {userName}</span>
          </Link>

          <Link to="/tobag" className="text-gray-700 hover:text-[#D4AF37] transition-colors relative">
            <FaShoppingBag />
          </Link>

          <Link to="/wishlist" className="text-gray-700 hover:text-[#D4AF37] transition-colors">
            <FaHeart />
          </Link>
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
                <h1 className="text-5xl md:text-7xl font-light tracking-widest uppercase drop-shadow-lg">Timeless Elegance</h1>
                <p className="text-lg md:text-xl italic font-serif">Handcrafted Gold & Diamond Jewelry</p>
            </div>
        </div>
      </motion.div>

      {/* Products Sections */}
      {[["Bestsellers", bestsellers], ["Discover Collection", shopProducts]].map(
        ([title, list]) => (
          <section key={title} className="max-w-7xl mx-auto px-6 py-16">
            <div className="flex items-center justify-center gap-4 mb-12">
                <div className="h-[1px] w-12 bg-[#D4AF37]"></div>
                <h2 className="text-3xl md:text-4xl font-light uppercase tracking-[0.2em] text-center text-gray-800">
                {title}
                </h2>
                <div className="h-[1px] w-12 bg-[#D4AF37]"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {list.map((product) => {
                const isFavorited = isInWishlist(product._id);

                return (
                  <motion.div
                    key={product._id}
                    whileHover={{ y: -10 }}
                    onClick={() => navigate(`/products/${product._id}`)}
                    className="relative group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-transparent hover:border-[#D4AF37]/30 cursor-pointer"
                  >
                    {/* Favorite Button */}
                    <button
                      className={`absolute top-4 right-4 z-10 p-2.5 rounded-full shadow-md backdrop-blur-md transition-all ${
                        isFavorited ? "bg-[#D4AF37] text-white" : "bg-white/80 text-gray-400 hover:text-[#D4AF37]"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(product);
                      }}
                    >
                      <FaHeart size={16} />
                    </button>

                    <div className="overflow-hidden aspect-[4/5]">
                        <img
                        src={getBackendImageUrl(product.filepath)}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    </div>

                    <div className="p-6 text-center space-y-3">
                      <h3 className="text-lg font-medium text-gray-800 truncate uppercase tracking-wider">{product.name}</h3>
                      <div className="flex flex-col items-center">
                        <p className="text-[#B8860B] font-semibold text-xl">Rs. {product.price.toLocaleString()}</p>
                        <p className="text-[10px] text-gray-400 uppercase mt-1 tracking-tighter">Availability: {product.stock > 0 ? `${product.stock} units` : 'Out of Stock'}</p>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02, backgroundColor: "#B8860B" }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 rounded-lg text-sm font-bold uppercase tracking-widest shadow-lg transition-colors"
                        style={{ 
                            background: "linear-gradient(135deg, #D4AF37 0%, #C5A028 100%)",
                            color: "white"
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                      >
                        Add to Bag
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>
        )
      )}

      {/* Footer Decoration */}
      <footer className="py-12 border-t border-gold-100 bg-[#FAF9F6] text-center">
          <p className="text-[#D4AF37] italic font-serif">Luxury is in each detail.</p>
          <div className="flex justify-center gap-6 mt-4 text-gray-400">
              <span className="hover:text-[#D4AF37] cursor-pointer transition-colors text-xs uppercase tracking-widest">About Us</span>
              <span className="hover:text-[#D4AF37] cursor-pointer transition-colors text-xs uppercase tracking-widest">Sustainability</span>
              <span className="hover:text-[#D4AF37] cursor-pointer transition-colors text-xs uppercase tracking-widest">Contact</span>
          </div>
      </footer>
    </div>
  );
}