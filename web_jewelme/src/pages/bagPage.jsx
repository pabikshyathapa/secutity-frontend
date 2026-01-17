import React, { useState, useEffect } from "react";
import { useAllCartItems } from "../hooks/useCart";
import { getBackendImageUrl } from "../utils/backend-image";
import { toast } from "react-toastify";
import { useNavigate, Link, NavLink } from "react-router-dom";
import {
  FaShoppingBag,
  FaHeart,
  FaUserCircle,
  FaInstagram,
  FaFacebook,
  FaTiktok,
} from "react-icons/fa";

const MyBag = () => {
  const { data: fetchedItems = [], isLoading, isError, error } = useAllCartItems();
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userName = storedUser?.name || "Guest";

  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    if (fetchedItems.length > 0) {
      const initialized = fetchedItems.map((item) => ({
        ...item,
        quantity: item.quantity ?? 1,
      }));
      setCartItems(initialized);
      setSelectedItems(initialized.map((item) => item._id || item.productId));
    } else {
      setCartItems([]);
      setSelectedItems([]);
    }
  }, [fetchedItems]);

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  if (isError) {
    toast.error(error?.message || "Failed to load cart");
    return <div className="text-center py-10 text-red-600">Error loading cart</div>;
  }

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        (item._id || item.productId) === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemove = (itemId) => {
    {
      setCartItems((items) => items.filter((item) => (item._id || item.productId) !== itemId));
      setSelectedItems((ids) => ids.filter((id) => id !== itemId));
    }
  };

  const handleSelect = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const total = cartItems
    .filter((item) => selectedItems.includes(item._id || item.productId))
    .reduce((sum, item) => sum + item.quantity * item.price, 0);

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      toast.warn("Please select at least one item to checkout");
      return;
    }
    const selectedProducts = cartItems.filter((item) =>
      selectedItems.includes(item._id || item.productId)
    );
    navigate("/checkout", { state: { selectedItems: selectedProducts } });
  };

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

      {/* Main Content */}
      <main className="flex-grow bg-indigo-50 p-6 md:p-10">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
            <FaShoppingBag className="text-red-500" />
        <span className="text-3xl text-black font-bold">{userName}'s Bag</span>
          </h1>

          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center text-lg py-24">Your Bag is empty.</p>
          ) : (
            <>
              <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {cartItems.map((item) => {
                  const id = item._id || item.productId;
                  const isSelected = selectedItems.includes(id);
                  return (
                    <div
                      key={id}
                      className={`flex flex-col md:flex-row gap-5 md:items-center border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow ${
                        isSelected ? "bg-red-50" : "bg-white"
                      }`}
                    >
                      <div className="flex items-start gap-4 w-full md:w-auto">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelect(id)}
                          className="mt-2 h-5 w-5 cursor-pointer"
                          aria-label={`Select ${item.name}`}
                        />
                        <img
                          src={getBackendImageUrl(item.filepath)}
                          alt={item.name}
                          className="w-28 h-28 object-cover rounded-xl cursor-pointer"
                          onClick={() => navigate(`/products/${id}`)}
                        />
                      </div>

                      <div
                        className="flex-grow cursor-pointer"
                        onClick={() => navigate(`/products/${id}`)}
                      >
                        <h2 className="text-lg font-semibold text-gray-900">{item.name}</h2>
                        <p className="text-gray-600 mt-1">
                          Price: <span className="font-medium">Rs.{item.price}</span>
                        </p>

                        <div className="flex items-center gap-3 mt-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleQuantityChange(id, item.quantity - 1);
                            }}
                            className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition disabled:opacity-50"
                            disabled={item.quantity <= 1}
                          >
                            −
                          </button>
                          <span className="text-lg font-semibold">{item.quantity}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleQuantityChange(id, item.quantity + 1);
                            }}
                            className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemove(id);
                        }}
                        className="mt-4 md:mt-0 md:ml-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow transition"
                      >
                        Remove
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="mt-10 border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-xl font-bold text-gray-800">
                  Total ({selectedItems.length} item{selectedItems.length !== 1 ? "s" : ""}):{" "}
                  <span className="text-red-600">Rs.{total.toFixed(2)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={selectedItems.length === 0}
                  className={`bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-medium shadow-md transition ${
                    selectedItems.length === 0 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-red-300 text-black px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
        <div>
          <h4 className="text-lg font-bold mb-3 tracking-wide">Stay Connected</h4>
          <p className="leading-relaxed">
            Discover exclusive offers, early access to new collections, style inspiration, and
            personalized recommendations just for you. Be the first to know about limited-time
            deals and member-only perks.
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
};

export default MyBag;
