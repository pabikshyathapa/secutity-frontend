import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaTimesCircle, FaHome, FaRedo } from "react-icons/fa";

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FCFBF7] to-[#FAF7ED] font-serif flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Error Icon */}
        <div className="bg-gradient-to-br from-red-500 to-red-600 p-12 text-center relative overflow-hidden">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="relative z-10"
          >
            <FaTimesCircle className="text-white text-8xl mx-auto drop-shadow-lg" />
          </motion.div>
          
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3" />
        </div>

        {/* Content */}
        <div className="p-12 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-4xl font-light uppercase tracking-[0.2em] text-gray-800 mb-3">
              Payment Failed
            </h1>
            <p className="text-red-600 text-lg italic">
              We couldn't process your payment
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-red-50 rounded-2xl p-6 border border-red-200"
          >
            <p className="text-gray-700 leading-relaxed">
              Your payment was not successful. This could be due to:
            </p>
            <ul className="mt-4 space-y-2 text-sm text-gray-600 text-left max-w-md mx-auto">
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Insufficient funds in your account</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Payment gateway timeout or technical issues</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Incorrect payment details</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Transaction cancelled by you</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-3"
          >
            <p className="text-gray-600 leading-relaxed">
              Don't worry! Your items are still in your cart. You can try again
              or choose a different payment method.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 pt-6"
          >
            <button
              onClick={() => navigate("/tobag")}
              className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-white rounded-full uppercase tracking-[0.2em] text-sm font-bold hover:shadow-xl transition-all"
            >
              <FaRedo />
              Try Again
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="flex-1 flex items-center justify-center gap-3 px-8 py-4 border-2 border-[#D4AF37] text-[#D4AF37] rounded-full uppercase tracking-[0.2em] text-sm font-bold hover:bg-[#FAF7ED] transition-all"
            >
              <FaHome />
              Go Home
            </button>
          </motion.div>

          {/* Support Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="pt-6 border-t border-gray-100"
          >
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
              Need Help?
            </p>
            <p className="text-sm text-gray-600">
              Contact our support team at{" "}
              <a
                href="mailto:concierge@jewelme.com"
                className="text-[#D4AF37] hover:underline font-medium"
              >
                concierge@jewelme.com
              </a>
            </p>
          </motion.div>
        </div>

        {/* Bottom Decoration */}
        <div className="h-2 bg-gradient-to-r from-red-400 via-red-500 to-red-400" />
      </motion.div>
    </div>
  );
};

export default PaymentFailed;