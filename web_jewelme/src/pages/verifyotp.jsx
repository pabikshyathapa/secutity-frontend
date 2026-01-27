import React, { useState } from "react";
import { useVerifyMfa } from "../hooks/useVerifyMfa";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const mutation = useVerifyMfa();

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = localStorage.getItem("mfaEmail");
    if (!email) {
      alert("Email missing. Go back to login.");
      return;
    }

    mutation.mutate({ email, otp });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="p-6 border rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Verify OTP</h2>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <button
          type="submit"
          className="w-full bg-[#D4AF37] text-white py-2 rounded"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Verifying..." : "Verify OTP"}
        </button>
        {mutation.isError && (
          <p className="text-[#D4AF37] mt-2">
            {mutation.error?.response?.data?.message ||
              "Invalid or expired OTP"}
          </p>
        )}
      </form>
    </div>
  );
}