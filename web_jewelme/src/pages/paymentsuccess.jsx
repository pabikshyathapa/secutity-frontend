import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCheckCircle, FaHome, FaShoppingBag, FaShieldAlt } from "react-icons/fa";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  
  const orderId = searchParams.get("orderId") || location.state?.orderId;
  const method = location.state?.method || "esewa";

  // Real-time countdown state
  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    // Auto redirect after 15 seconds
    const redirect = setTimeout(() => {
      navigate("/dashboard");
    }, 15000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FCFBF7] p-4 overflow-hidden relative font-serif">
      {/* Decorative background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-[#D4AF37]/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#C5A028]/10 rounded-full blur-3xl animate-pulse" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl shadow-[#D4AF37]/5 p-10 text-center border border-white relative z-10"
      >
        {/* Animated Success Icon Container */}
        <div className="relative mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto shadow-inner"
          >
            <FaCheckCircle className="text-[#D4AF37] text-5xl" />
          </motion.div>
          {/* Subtle ring animation */}
          <div className="absolute inset-0 w-24 h-24 border-4 border-[#D4AF37]/20 rounded-full mx-auto animate-ping opacity-20" />
        </div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-2 mb-8"
        >
          <h1 className="text-4xl font-light tracking-[0.2em] text-gray-800 uppercase">
            Perfect!
          </h1>
          <h2 className="text-xl font-semibold text-[#D4AF37]">
            Order Confirmed
          </h2>
          <p className="text-gray-600 font-light px-4 leading-relaxed">
            Your order has been successfully placed and is being processed.
          </p>
        </motion.div>

        {/* Transaction Card */}
        {orderId && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#FAF7ED] border border-[#D4AF37]/20 rounded-2xl p-5 mb-8"
          >
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-left">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                  Order ID
                </p>
                <p className="font-mono text-sm font-semibold text-gray-800">
                  #{orderId.slice(-8).toUpperCase()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                  Payment
                </p>
                <p className="text-sm font-semibold text-gray-800 uppercase">
                  {method === "cod" ? "COD" : "eSewa"}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-[#D4AF37]/10">
              <FaShieldAlt className="text-[#D4AF37]" size={16} />
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                Secure Transaction
              </span>
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <button
            onClick={() => navigate("/my-orders")}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold uppercase tracking-[0.15em] text-sm transition-all hover:shadow-xl active:scale-95"
            style={{
              background: "linear-gradient(135deg, #D4AF37 0%, #C5A028 100%)",
              color: "white",
            }}
          >
            <FaShoppingBag size={18} />
            View My Orders
          </button>
          
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-[#D4AF37] text-[#D4AF37] py-4 rounded-2xl font-bold uppercase tracking-[0.15em] text-sm hover:bg-[#FAF7ED] transition-all active:scale-95"
          >
            <FaHome size={18} />
            Continue Shopping
          </button>
        </motion.div>

        {/* Progress Countdown Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10 pt-6 border-t border-gray-100"
        >
          <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            <span>Auto Redirect</span>
            <span>{countdown}s</span>
          </div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full transition-all duration-1000 ease-linear"
              style={{ 
                width: `${(countdown / 15) * 100}%`,
                background: "linear-gradient(90deg, #D4AF37 0%, #C5A028 100%)",
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;