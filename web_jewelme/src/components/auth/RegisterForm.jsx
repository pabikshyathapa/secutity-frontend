import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRegisterUser } from "../../hooks/useRegisteruser";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterForm() {
  const { mutate, isLoading } = useRegisterUser();
  const [message, setMessage] = useState("");
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone number is required").matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const payload = {
        name: values.name || "",
        email: values.email || "",
        phone: values.phone || "",
        password: values.password || "",
      };

      mutate(payload, {
        onSuccess: (res) => {
          setMessage(res?.message || "Registration successful!");
          formik.resetForm();
        },
        onError: (err) => {
          setMessage(
            err?.response?.data?.message ||
              "Registration failed. Please try again."
          );
        },
      });
    },
  });

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Side Image */}
      <div className="w-1/2 bg-[#e0d8cc] flex items-center justify-center">
        <img
          src="/images/register.png"
          alt="Register"
          className="object-contain max-h-full"
        />
      </div>

      {/* Right Side Form */}
      <div className="w-1/2 flex items-center justify-center p-10">
        <div className="w-full max-w-md space-y-4">
          <h2 className="text-[#D4AF37] text-xl font-semibold text-center">
            Create Account
          </h2>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {["name", "email", "phone", "password"].map((field) => (
              <div key={field}>
                <label className="text-[#D4AF37] block">
                  {field === "name"
                    ? "Full Name"
                    : field === "phone"
                    ? "Phone Number"
                    : field === "password"
                    ? "Password"
                    : "Email Address"}
                </label>
                
                {/* Wrapped input in a relative div to position the icon */}
                <div className="relative">
                  <input
                    name={field}
                    // Toggle type between 'password' and 'text'
                    type={
                      field === "password" 
                        ? (showPassword ? "text" : "password") 
                        : "text"
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values[field]}
                    className="w-full border rounded px-4 py-2 bg-gray-50 pr-10"
                  />
                  
                  {/* Show eye icon only for password field */}
                  {field === "password" && (
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <Eye size={16} />
                      ) : (
                        <EyeOff size={16} />
                      )}
                    </button>
                  )}
                </div>

                {formik.touched[field] && formik.errors[field] && (
                  <p className="text-sm text-[#D4AF37]">{formik.errors[field]}</p>
                )}
              </div>
            ))}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#D4AF37] hover:bg-[#B8962E] text-white py-2 rounded"
            >
              {isLoading ? "Registering..." : "Sign Up"}
            </button>
            {/* Added Section Below Button */}
            <div className="text-center mt-4 text-black">Or</div>
            <div className="text-center">
              <span className="text-black">Already have an account? </span>
              <a href="/login" className="text-[#D4AF37] hover:underline">
                Login
              </a>
            </div>
          </form>
          {message && (
            <p className="text-center text-green-600 mt-2">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
}