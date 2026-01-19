// import React, { useState, useEffect } from "react";
// import { useAllCartItems } from "../hooks/useCart";
// import { getBackendImageUrl } from "../utils/backend-image";
// import { toast } from "react-toastify";
// import { useNavigate, Link, NavLink } from "react-router-dom";
// import {
//   FaShoppingBag,
//   FaHeart,
//   FaUserCircle,
//   FaInstagram,
//   FaFacebook,
//   FaTiktok,
// } from "react-icons/fa";

// const MyBag = () => {
//   const { data: fetchedItems = [], isLoading, isError, error } = useAllCartItems();
//   const navigate = useNavigate();
//   const storedUser = JSON.parse(localStorage.getItem("user"));
//   const userName = storedUser?.name || "Guest";

//   const [cartItems, setCartItems] = useState([]);
//   const [selectedItems, setSelectedItems] = useState([]);

//   useEffect(() => {
//     if (fetchedItems.length > 0) {
//       const initialized = fetchedItems.map((item) => ({
//         ...item,
//         quantity: item.quantity ?? 1,
//       }));
//       setCartItems(initialized);
//       setSelectedItems(initialized.map((item) => item._id || item.productId));
//     } else {
//       setCartItems([]);
//       setSelectedItems([]);
//     }
//   }, [fetchedItems]);

//   if (isLoading) return <div className="text-center py-10">Loading...</div>;

//   if (isError) {
//     toast.error(error?.message || "Failed to load cart");
//     return <div className="text-center py-10 text-red-600">Error loading cart</div>;
//   }

//   const handleQuantityChange = (itemId, newQuantity) => {
//     if (newQuantity < 1) return;
//     setCartItems((items) =>
//       items.map((item) =>
//         (item._id || item.productId) === itemId ? { ...item, quantity: newQuantity } : item
//       )
//     );
//   };

//   const handleRemove = (itemId) => {
//     {
//       setCartItems((items) => items.filter((item) => (item._id || item.productId) !== itemId));
//       setSelectedItems((ids) => ids.filter((id) => id !== itemId));
//     }
//   };

//   const handleSelect = (itemId) => {
//     setSelectedItems((prev) =>
//       prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
//     );
//   };

//   const total = cartItems
//     .filter((item) => selectedItems.includes(item._id || item.productId))
//     .reduce((sum, item) => sum + item.quantity * item.price, 0);

//   const handleCheckout = () => {
//     if (selectedItems.length === 0) {
//       toast.warn("Please select at least one item to checkout");
//       return;
//     }
//     const selectedProducts = cartItems.filter((item) =>
//       selectedItems.includes(item._id || item.productId)
//     );
//     navigate("/checkout", { state: { selectedItems: selectedProducts } });
//   };

//   return (
//     <div className="font-serif min-h-screen flex flex-col">
//       {/* Header */}
//       <header
//         className="flex justify-between items-center p-4 border-b"
//         style={{ backgroundColor: "#FFFEF9" }}
//       >
//         <div className="w-32">
//           <img src="/images/splash.png" alt="JewelMe Logo" className="w-full h-auto" />
//         </div>

//         <nav className="space-x-6 text-sm">
//           {[
//             "/dashboard",
//             "/necklaces",
//             "/hoops",
//             "/rings",
//             "/bracelets",
//             "/watches",
//             "/bestsellers",
//           ].map((path, idx) => (
//             <NavLink
//               key={path}
//               to={path}
//               className={({ isActive }) =>
//                 isActive
//                   ? "text-red-500"
//                   : "text-black hover:text-red-500 transition-colors duration-300"
//               }
//             >
//               {["Home", "Necklaces", "Hoops", "Rings", "Bracelets", "Watches", "Best Sellers"][idx]}
//             </NavLink>
//           ))}
//         </nav>

//         <div className="flex items-center gap-3 text-xl">
//           <Link to="/profile" title="Profile" className="text-red-500 hover:text-black">
//             <FaUserCircle />
//           </Link>
//           <span className="text-sm text-black font-normal">Welcome, {userName}</span>

//           <Link to="/tobag" title="Bag" className="text-red-500 hover:text-black">
//             <FaShoppingBag />
//           </Link>
//           <Link to="/wishlist" title="Wishlist" className="text-red-500 hover:text-black">
//             <FaHeart />
//           </Link>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="flex-grow bg-indigo-50 p-6 md:p-10">
//         <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-10">
//           <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
//             <FaShoppingBag className="text-red-500" />
//         <span className="text-3xl text-black font-bold">{userName}'s Bag</span>
//           </h1>

//           {cartItems.length === 0 ? (
//             <p className="text-gray-500 text-center text-lg py-24">Your Bag is empty.</p>
//           ) : (
//             <>
//               <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
//                 {cartItems.map((item) => {
//                   const id = item._id || item.productId;
//                   const isSelected = selectedItems.includes(id);
//                   return (
//                     <div
//                       key={id}
//                       className={`flex flex-col md:flex-row gap-5 md:items-center border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow ${
//                         isSelected ? "bg-red-50" : "bg-white"
//                       }`}
//                     >
//                       <div className="flex items-start gap-4 w-full md:w-auto">
//                         <input
//                           type="checkbox"
//                           checked={isSelected}
//                           onChange={() => handleSelect(id)}
//                           className="mt-2 h-5 w-5 cursor-pointer"
//                           aria-label={`Select ${item.name}`}
//                         />
//                         <img
//                           src={getBackendImageUrl(item.filepath)}
//                           alt={item.name}
//                           className="w-28 h-28 object-cover rounded-xl cursor-pointer"
//                           onClick={() => navigate(`/products/${id}`)}
//                         />
//                       </div>

//                       <div
//                         className="flex-grow cursor-pointer"
//                         onClick={() => navigate(`/products/${id}`)}
//                       >
//                         <h2 className="text-lg font-semibold text-gray-900">{item.name}</h2>
//                         <p className="text-gray-600 mt-1">
//                           Price: <span className="font-medium">Rs.{item.price}</span>
//                         </p>

//                         <div className="flex items-center gap-3 mt-4">
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleQuantityChange(id, item.quantity - 1);
//                             }}
//                             className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition disabled:opacity-50"
//                             disabled={item.quantity <= 1}
//                           >
//                             −
//                           </button>
//                           <span className="text-lg font-semibold">{item.quantity}</span>
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleQuantityChange(id, item.quantity + 1);
//                             }}
//                             className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition"
//                           >
//                             +
//                           </button>
//                         </div>
//                       </div>

//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleRemove(id);
//                         }}
//                         className="mt-4 md:mt-0 md:ml-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow transition"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   );
//                 })}
//               </div>

//               <div className="mt-10 border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
//                 <div className="text-xl font-bold text-gray-800">
//                   Total ({selectedItems.length} item{selectedItems.length !== 1 ? "s" : ""}):{" "}
//                   <span className="text-red-600">Rs.{total.toFixed(2)}</span>
//                 </div>
//                 <button
//                   onClick={handleCheckout}
//                   disabled={selectedItems.length === 0}
//                   className={`bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-medium shadow-md transition ${
//                     selectedItems.length === 0 ? "opacity-50 cursor-not-allowed" : ""
//                   }`}
//                 >
//                   Proceed to Checkout
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="bg-red-300 text-black px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
//         <div>
//           <h4 className="text-lg font-bold mb-3 tracking-wide">Stay Connected</h4>
//           <p className="leading-relaxed">
//             Discover exclusive offers, early access to new collections, style inspiration, and
//             personalized recommendations just for you. Be the first to know about limited-time
//             deals and member-only perks.
//           </p>
//         </div>

//         <div>
//           <h4 className="text-lg font-bold mb-3 tracking-wide">Quick Links</h4>
//           <ul className="space-y-2">
//             <li className="hover:underline cursor-pointer">Help</li>
//             <li className="hover:underline cursor-pointer">Shipping & Returns</li>
//             <li className="hover:underline cursor-pointer">Jewelry Guide</li>
//             <li className="hover:underline cursor-pointer">Our Story</li>
//             <li className="hover:underline cursor-pointer">FAQs</li>
//             <li className="hover:underline cursor-pointer">Privacy Policy</li>
//           </ul>
//         </div>

//         <div>
//           <h4 className="text-lg font-bold mb-3 tracking-wide">Contact Us</h4>
//           <p className="mb-1">Phone: 123-456-789</p>
//           <p className="mb-1">Email: support@jewelme.com</p>
//           <p className="mb-3">Kathmandu, Nepal</p>
//           <p className="font-semibold mt-2">Working Hours:</p>
//           <p>Mon - Fri: 9:00am - 6:00pm</p>
//           <p>Sat - Sun: 10:00am - 4:00pm</p>
//         </div>

//         <div>
//           <h4 className="text-lg font-bold mb-3 tracking-wide">Follow Us</h4>
//           <p>Connect on social platforms:</p>
//           <div className="flex items-center gap-4 mt-3">
//             <FaInstagram className="text-2xl hover:scale-110 hover:text-white transition-all duration-200 cursor-pointer" />
//             <FaFacebook className="text-2xl hover:scale-110 hover:text-white transition-all duration-200 cursor-pointer" />
//             <FaTiktok className="text-2xl hover:scale-110 hover:text-white transition-all duration-200 cursor-pointer" />
//           </div>
//           <p className="mt-2 text-xs font-bold">@Jewelmeeveryday</p>
//         </div>
//       </footer>

//       <div className="bg-red-300 text-center text-sm py-4 text-black border-t border-black">
//         © 2025 JewelMe. All rights reserved.
//       </div>
//     </div>
//   );
// };

// export default MyBag;
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
  FaTrashAlt,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const MyBag = () => {
  const { data: fetchedItems = [], isLoading, isError, error } = useAllCartItems();
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userName = storedUser?.name || "Guest";

  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  // Logic remains identical as requested
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

  if (isLoading) return <div className="flex justify-center items-center min-h-screen text-[#D4AF37] font-serif tracking-widest uppercase">Loading your treasures...</div>;

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
    setCartItems((items) => items.filter((item) => (item._id || item.productId) !== itemId));
    setSelectedItems((ids) => ids.filter((id) => id !== itemId));
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
    <div className="font-serif min-h-screen flex flex-col bg-[#FCFBF7]">
      {/* Header - Consistent with Dashboard */}
      <header
        className="flex justify-between items-center p-5 border-b border-gold-200 sticky top-0 z-[100] shadow-sm"
        style={{ backgroundColor: "#FFFEF9" }}
      >
        <div className="w-36 transition-transform hover:scale-105 cursor-pointer" onClick={() => navigate("/dashboard")}>
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
          <Link to="/profile" title="Profile" className="text-gray-700 hover:text-[#D4AF37] transition-colors flex items-center gap-2">
            <FaUserCircle />
            <span className="text-xs uppercase tracking-tighter hidden md:inline">Hi, {userName}</span>
          </Link>
          <Link to="/tobag" className="text-[#D4AF37] transition-colors relative">
            <FaShoppingBag />
          </Link>
          <Link to="/wishlist" className="text-gray-700 hover:text-[#D4AF37] transition-colors">
            <FaHeart />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-6 md:p-12">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#FAF7ED]">
          <div className="bg-[#FAF7ED] px-8 py-10 border-b border-[#D4AF37]/20 flex justify-between items-end">
            <div>
              <h1 className="text-4xl font-light uppercase tracking-[0.2em] text-gray-800">
                Shopping Bag
              </h1>
              <p className="text-[#D4AF37] italic mt-2">Personal selection for {userName}</p>
            </div>
            <div className="text-right hidden sm:block">
               <p className="text-xs uppercase tracking-widest text-gray-400">Total Selection</p>
               <p className="text-2xl font-semibold text-[#B8860B]">{selectedItems.length} Items</p>
            </div>
          </div>

          <div className="p-6 md:p-10">
            {cartItems.length === 0 ? (
              <div className="text-center py-32 space-y-6">
                <FaShoppingBag className="mx-auto text-6xl text-[#FAF7ED]" />
                <p className="text-gray-400 text-xl font-light italic tracking-widest">Your collection is currently empty.</p>
                <button 
                    onClick={() => navigate("/dashboard")}
                    className="mt-4 px-8 py-3 bg-[#D4AF37] text-white rounded-full uppercase tracking-widest text-xs hover:bg-[#B8860B] transition-all"
                >
                    Start Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-8 max-h-[55vh] overflow-y-auto pr-4 custom-scrollbar">
                  <AnimatePresence>
                  {cartItems.map((item) => {
                    const id = item._id || item.productId;
                    const isSelected = selectedItems.includes(id);
                    return (
                      <motion.div
                        key={id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className={`flex flex-col md:flex-row gap-6 md:items-center border-b border-gray-100 pb-8 transition-all duration-500 ${
                          isSelected ? "opacity-100" : "opacity-60"
                        }`}
                      >
                        <div className="flex items-center gap-6">
                          <div className="relative">
                            <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => handleSelect(id)}
                                className="accent-[#D4AF37] h-5 w-5 cursor-pointer rounded-full"
                            />
                          </div>
                          <div className="relative group overflow-hidden rounded-2xl w-32 h-32 flex-shrink-0 shadow-md">
                            <img
                                src={getBackendImageUrl(item.filepath)}
                                alt={item.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 cursor-pointer"
                                onClick={() => navigate(`/products/${id}`)}
                            />
                          </div>
                        </div>

                        <div className="flex-grow space-y-2">
                          <h2 
                            className="text-xl font-medium text-gray-800 uppercase tracking-wider cursor-pointer hover:text-[#D4AF37] transition-colors"
                            onClick={() => navigate(`/products/${id}`)}
                          >
                            {item.name}
                          </h2>
                          <p className="text-[#B8860B] font-semibold text-lg">Rs. {item.price.toLocaleString()}</p>

                          <div className="flex items-center gap-4 mt-4">
                            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                                <button
                                    onClick={() => handleQuantityChange(id, item.quantity - 1)}
                                    className="px-3 py-1 bg-[#FAF7ED] hover:bg-[#D4AF37]/10 transition-colors disabled:opacity-30"
                                    disabled={item.quantity <= 1}
                                >
                                    −
                                </button>
                                <span className="px-5 py-1 text-sm font-bold border-x border-gray-100">{item.quantity}</span>
                                <button
                                    onClick={() => handleQuantityChange(id, item.quantity + 1)}
                                    className="px-3 py-1 bg-[#FAF7ED] hover:bg-[#D4AF37]/10 transition-colors"
                                >
                                    +
                                </button>
                            </div>
                            <button
                                onClick={() => handleRemove(id)}
                                className="text-gray-300 hover:text-red-400 transition-colors ml-4 p-2"
                                title="Remove item"
                            >
                                <FaTrashAlt size={16} />
                            </button>
                          </div>
                        </div>

                        <div className="text-right hidden md:block">
                            <p className="text-xs text-gray-400 uppercase tracking-tighter">Subtotal</p>
                            <p className="text-xl font-light text-gray-800">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                  </AnimatePresence>
                </div>

                <div className="mt-12 bg-[#FAF7ED]/50 p-8 rounded-2xl flex flex-col md:flex-row justify-between items-center border border-[#D4AF37]/10">
                  <div className="text-center md:text-left mb-6 md:mb-0">
                    <p className="text-sm uppercase tracking-widest text-gray-500 mb-1">Grand Total</p>
                    <div className="text-4xl font-light text-gray-900">
                      Rs. <span className="font-bold">{total.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCheckout}
                    disabled={selectedItems.length === 0}
                    style={{ 
                        background: "linear-gradient(135deg, #D4AF37 0%, #C5A028 100%)",
                        boxShadow: "0 10px 20px -10px rgba(212, 175, 55, 0.5)"
                    }}
                    className={`text-white px-12 py-4 rounded-full text-sm font-bold uppercase tracking-[0.2em] transition-all ${
                      selectedItems.length === 0 ? "opacity-30 grayscale cursor-not-allowed shadow-none" : ""
                    }`}
                  >
                    Proceed to Checkout
                  </motion.button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Footer - Upgraded to Luxurious Dark Gold theme */}
      <footer className="bg-[#1A1A1A] text-[#D4AF37] px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
        <div className="space-y-4">
          <h4 className="text-lg font-light tracking-[0.2em] uppercase border-b border-[#D4AF37]/20 pb-2">Stay Connected</h4>
          <p className="text-gray-400 leading-relaxed font-light">
            Discover exclusive offers, early access to new collections, and
            personalized style recommendations. Join the world of JewelMe.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-light tracking-[0.2em] uppercase border-b border-[#D4AF37]/20 pb-2">Client Services</h4>
          <ul className="space-y-2 text-gray-400 font-light">
            <li className="hover:text-[#D4AF37] transition-colors cursor-pointer">Shipping & Returns</li>
            <li className="hover:text-[#D4AF37] transition-colors cursor-pointer">Jewelry Care Guide</li>
            <li className="hover:text-[#D4AF37] transition-colors cursor-pointer">Bespoke Appointments</li>
            <li className="hover:text-[#D4AF37] transition-colors cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-light tracking-[0.2em] uppercase border-b border-[#D4AF37]/20 pb-2">Contact</h4>
          <div className="text-gray-400 font-light space-y-1">
            <p>123.456.789</p>
            <p>concierge@jewelme.com</p>
            <p className="pt-2">Kathmandu, Nepal</p>
            <p className="pt-2 text-[10px] uppercase tracking-widest text-[#D4AF37]">Mon - Fri: 9am - 6pm</p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-light tracking-[0.2em] uppercase border-b border-[#D4AF37]/20 pb-2">Follow Us</h4>
          <div className="flex items-center gap-6 text-2xl pt-2">
            <FaInstagram className="hover:text-white transition-all duration-300 cursor-pointer" />
            <FaFacebook className="hover:text-white transition-all duration-300 cursor-pointer" />
            <FaTiktok className="hover:text-white transition-all duration-300 cursor-pointer" />
          </div>
          <p className="mt-4 text-[10px] uppercase tracking-[0.3em] font-bold text-gray-500">@Jewelmeeveryday</p>
        </div>
      </footer>

      <div className="bg-[#111111] text-center text-[10px] py-6 text-gray-600 tracking-widest uppercase border-t border-white/5">
        © 2026 JewelMe Haute Joaillerie. All rights reserved.
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #FAF9F6;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #D4AF37;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default MyBag;