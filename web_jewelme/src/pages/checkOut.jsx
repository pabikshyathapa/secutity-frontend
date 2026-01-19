// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { motion } from "framer-motion";
// import { getBackendImageUrl } from "../utils/backend-image";
// import api from "../api/api"; // <-- import your Axios instance

// const Checkout = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const selectedItemsFromState = location.state?.selectedItems || [];

//   const [address, setAddress] = useState({
//     fullName: "",
//     phone: "",
//     city: "",
//     landmark: "",
//   });
//   const [paymentMethod, setPaymentMethod] = useState("cod");
//   const [loading, setLoading] = useState(false);

//   const totalAmount = selectedItemsFromState.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setAddress((prev) => ({ ...prev, [name]: value }));
//   };

//   const handlePlaceOrder = async () => {
//     if (!address.fullName || !address.phone || !address.city) {
//       toast.warn("Please fill all required address fields");
//       return;
//     }

//     if (selectedItemsFromState.length === 0) {
//       toast.warn("No items selected for checkout");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await api.post("/order/create", {
//         paymentMethod,
//         items: selectedItemsFromState,
//         shippingAddress: address,
//       });

//       const data = res.data;

//       // COD flow
//       if (paymentMethod === "cod") {
//         toast.success("Order placed successfully (COD)");
//         navigate(`/order-success?orderId=${data.order._id}`);
//       }

//       // eSewa flow
//       if (paymentMethod === "esewa" && data.isEsewa) {
//         // Dynamically create a form and submit to eSewa
//         const form = document.createElement("form");
//         form.method = "POST";
//         form.action = data.paymentData.esewa_url;

//         Object.entries(data.paymentData).forEach(([key, value]) => {
//           const input = document.createElement("input");
//           input.type = "hidden";
//           input.name = key;
//           input.value = value;
//           form.appendChild(input);
//         });

//         document.body.appendChild(form);
//         form.submit();
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error(error.response?.data?.message || "Failed to place order");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#FCFBF7] font-serif flex flex-col">
//       <header className="p-6 border-b border-[#D4AF37]/20">
//         <h1 className="text-3xl font-light uppercase tracking-widest text-gray-800">
//           Checkout
//         </h1>
//         <p className="text-[#D4AF37] mt-1">Review your order & payment</p>
//       </header>

//       <main className="flex-grow max-w-4xl mx-auto p-6 md:p-12 space-y-10">
//         {/* Shipping Address */}
//         <section className="bg-white p-8 rounded-2xl shadow-md space-y-4 border border-[#FAF7ED]">
//           <h2 className="text-xl font-medium tracking-wide">Shipping Address</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input
//               type="text"
//               name="fullName"
//               placeholder="Full Name *"
//               value={address.fullName}
//               onChange={handleChange}
//               className="border p-3 rounded-lg w-full"
//             />
//             <input
//               type="text"
//               name="phone"
//               placeholder="Phone *"
//               value={address.phone}
//               onChange={handleChange}
//               className="border p-3 rounded-lg w-full"
//             />
//             <input
//               type="text"
//               name="city"
//               placeholder="City *"
//               value={address.city}
//               onChange={handleChange}
//               className="border p-3 rounded-lg w-full"
//             />
//             <input
//               type="text"
//               name="landmark"
//               placeholder="Landmark / Optional"
//               value={address.landmark}
//               onChange={handleChange}
//               className="border p-3 rounded-lg w-full"
//             />
//           </div>
//         </section>

//         {/* Selected Items */}
//         <section className="bg-white p-8 rounded-2xl shadow-md border border-[#FAF7ED] space-y-4">
//           <h2 className="text-xl font-medium tracking-wide">Order Summary</h2>
//           <div className="space-y-4 max-h-72 overflow-y-auto">
//             {selectedItemsFromState.map((item) => (
//               <div key={item._id || item.productId} className="flex justify-between items-center">
//                 <div className="flex items-center gap-4">
//                   <img
//                     src={getBackendImageUrl(item.filepath)}
//                     alt={item.name}
//                     className="w-16 h-16 object-cover rounded-lg"
//                   />
//                   <span className="font-medium">{item.name}</span>
//                 </div>
//                 <span className="font-semibold">
//                   Rs. {(item.price * item.quantity).toLocaleString()} ({item.quantity})
//                 </span>
//               </div>
//             ))}
//           </div>
//           <div className="text-right mt-4">
//             <p className="text-lg font-semibold">
//               Total: Rs. {totalAmount.toLocaleString()}
//             </p>
//           </div>
//         </section>

//         {/* Payment Method */}
//         <section className="bg-white p-8 rounded-2xl shadow-md border border-[#FAF7ED] space-y-4">
//           <h2 className="text-xl font-medium tracking-wide">Payment Method</h2>
//           <div className="flex flex-col md:flex-row gap-6">
//             <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:border-[#D4AF37] transition-colors">
//               <input
//                 type="radio"
//                 name="paymentMethod"
//                 value="cod"
//                 checked={paymentMethod === "cod"}
//                 onChange={() => setPaymentMethod("cod")}
//                 className="accent-[#D4AF37] w-5 h-5"
//               />
//               Cash on Delivery
//             </label>

//             <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:border-[#D4AF37] transition-colors">
//               <input
//                 type="radio"
//                 name="paymentMethod"
//                 value="esewa"
//                 checked={paymentMethod === "esewa"}
//                 onChange={() => setPaymentMethod("esewa")}
//                 className="accent-[#D4AF37] w-5 h-5"
//               />
//               eSewa (Online Payment)
//             </label>
//           </div>
//         </section>

//         {/* Place Order */}
//         <div className="text-center">
//           <motion.button
//             whileHover={{ scale: 1.03 }}
//             whileTap={{ scale: 0.97 }}
//             onClick={handlePlaceOrder}
//             disabled={loading}
//             className={`bg-gradient-to-r from-[#D4AF37] to-[#C5A028] px-12 py-4 rounded-full font-bold uppercase tracking-wider text-white transition-all ${
//               loading ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//           >
//             {loading ? "Processing..." : "Place Order"}
//           </motion.button>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Checkout;

import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { FaShoppingBag, FaLock, FaCreditCard, FaMoneyBillWave } from "react-icons/fa";
import { useCreateOrder } from "../hooks/usecheckoutorder";
import { submitEsewaPayment } from "../services/checkoutorder";
import { getBackendImageUrl } from "../utils/backend-image";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedItems = [] } = location.state || {};
  
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    phone: "",
    city: "",
    landmark: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const { mutate: createOrderMutation } = useCreateOrder();

  // Redirect if no items selected
  if (selectedItems.length === 0) {
    navigate("/tobag");
    return null;
  }

  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingFee = 100;
  const total = subtotal + shippingFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!shippingAddress.fullName.trim()) {
      toast.error("Please enter your full name");
      return false;
    }
    if (!shippingAddress.phone.trim() || !/^\d{10}$/.test(shippingAddress.phone)) {
      toast.error("Please enter a valid 10-digit phone number");
      return false;
    }
    if (!shippingAddress.city.trim()) {
      toast.error("Please enter your city");
      return false;
    }
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);

    const orderData = {
      paymentMethod,
      shippingAddress,
    };

    try {
      createOrderMutation(orderData, {
        onSuccess: (data) => {
          if (data.isEsewa && data.paymentData) {
            // eSewa payment - redirect to eSewa
            toast.info("Redirecting to eSewa payment gateway...");
            setTimeout(() => {
              submitEsewaPayment(data.paymentData);
            }, 1000);
          } else {
            // COD - success
            toast.success(data.message || "Order placed successfully!");
            setTimeout(() => {
              navigate("/payment-success", {
                state: { orderId: data.order._id, method: "cod" },
              });
            }, 1500);
          }
        },
        onError: (error) => {
          setIsProcessing(false);
          toast.error(error.message || "Failed to place order");
        },
      });
    } catch (error) {
      setIsProcessing(false);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-[#FCFBF7] font-serif">
      {/* Header */}
      <header className="bg-[#FFFEF9] border-b border-[#D4AF37]/20 p-5 flex justify-between items-center sticky top-0 z-50 shadow-sm">
        <div className="w-36 cursor-pointer" onClick={() => navigate("/dashboard")}>
          <img src="/images/splash.png" alt="JewelMe" className="drop-shadow-sm" />
        </div>
        <div className="flex items-center gap-3 text-[#D4AF37]">
          <FaLock className="text-xl" />
          <span className="text-sm uppercase tracking-widest font-medium">Secure Checkout</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6 md:p-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Shipping & Payment */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl p-8 border border-[#FAF7ED]"
            >
              <h2 className="text-2xl font-light uppercase tracking-[0.2em] text-gray-800 mb-6 pb-4 border-b border-[#D4AF37]/20">
                Shipping Address
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm uppercase tracking-wider text-gray-600 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={shippingAddress.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm uppercase tracking-wider text-gray-600 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={shippingAddress.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all"
                    placeholder="9800000000"
                    maxLength="10"
                  />
                </div>
                <div>
                  <label className="block text-sm uppercase tracking-wider text-gray-600 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={shippingAddress.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all"
                    placeholder="Kathmandu"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm uppercase tracking-wider text-gray-600 mb-2">
                    Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    name="landmark"
                    value={shippingAddress.landmark}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all"
                    placeholder="Near City Mall"
                  />
                </div>
              </div>
            </motion.div>

            {/* Payment Method */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-xl p-8 border border-[#FAF7ED]"
            >
              <h2 className="text-2xl font-light uppercase tracking-[0.2em] text-gray-800 mb-6 pb-4 border-b border-[#D4AF37]/20">
                Payment Method
              </h2>
              <div className="space-y-4">
                {/* Cash on Delivery */}
                <label
                  className={`flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all ${
                    paymentMethod === "cod"
                      ? "border-[#D4AF37] bg-[#FAF7ED]/50"
                      : "border-gray-200 hover:border-[#D4AF37]/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-[#D4AF37] h-5 w-5"
                  />
                  <FaMoneyBillWave className="text-3xl text-[#D4AF37]" />
                  <div className="flex-grow">
                    <p className="font-semibold text-gray-800 uppercase tracking-wider">
                      Cash on Delivery
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Pay when you receive your order
                    </p>
                  </div>
                </label>

                {/* eSewa */}
                <label
                  className={`flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all ${
                    paymentMethod === "esewa"
                      ? "border-[#D4AF37] bg-[#FAF7ED]/50"
                      : "border-gray-200 hover:border-[#D4AF37]/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="esewa"
                    checked={paymentMethod === "esewa"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-[#D4AF37] h-5 w-5"
                  />
                  <FaCreditCard className="text-3xl text-green-600" />
                  <div className="flex-grow">
                    <p className="font-semibold text-gray-800 uppercase tracking-wider">
                      eSewa Payment
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Secure online payment via eSewa
                    </p>
                  </div>
                  <img
                    src="https://esewa.com.np/common/images/esewa-logo.png"
                    alt="eSewa"
                    className="h-8"
                  />
                </label>
              </div>
            </motion.div>
          </div>

          {/* Right: Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#FAF7ED] sticky top-24">
              <h2 className="text-2xl font-light uppercase tracking-[0.2em] text-gray-800 mb-6 pb-4 border-b border-[#D4AF37]/20">
                Order Summary
              </h2>

              {/* Items */}
              <div className="space-y-4 max-h-60 overflow-y-auto mb-6 pr-2">
                {selectedItems.map((item) => (
                  <div key={item._id || item.productId} className="flex gap-4">
                    <img
                      src={getBackendImageUrl(item.filepath)}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-grow">
                      <p className="text-sm font-medium text-gray-800">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      <p className="text-sm text-[#B8860B] font-semibold">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div className="space-y-3 border-t border-gray-100 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Rs. {shippingFee}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-[#D4AF37]/20 pt-3">
                  <span>Total</span>
                  <span className="text-[#D4AF37]">Rs. {total.toLocaleString()}</span>
                </div>
              </div>

              {/* Place Order Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full mt-6 py-4 rounded-full text-white font-bold uppercase tracking-[0.2em] text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: "linear-gradient(135deg, #D4AF37 0%, #C5A028 100%)",
                  boxShadow: "0 10px 20px -10px rgba(212, 175, 55, 0.5)",
                }}
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  `Place Order - Rs. ${total.toLocaleString()}`
                )}
              </motion.button>

              <div className="mt-4 text-center text-xs text-gray-500">
                <FaLock className="inline mr-1" />
                Secure & encrypted checkout
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <style>{`
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
};
export default Checkout;