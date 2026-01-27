import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import api, { fetchCsrfToken } from "../../api/api";

const RECAPTCHA_SITE_KEY = "6Lc-s0wsAAAAAGth5Eyh3MU38Ne8H8zhECzqsmwP";

export default function LoginForm() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [captchaRequired, setCaptchaRequired] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch CSRF token when component mounts
  useEffect(() => {
    fetchCsrfToken().catch((err) => {
      console.error("Failed to fetch CSRF token:", err);
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      setErrorMsg("");

      try {
        // Use the configured api instance instead of direct axios
        await api.post("/auth/login", {
          email: values.email,
          password: values.password,
          captchaToken,
        });

        localStorage.setItem("mfaEmail", values.email);

        toast.success("OTP sent to your email", {
          position: "top-center",
        });

        // Reset CAPTCHA state on successful login
        setCaptchaRequired(false);
        setCaptchaToken(null);
        setErrorMsg("");

        navigate("/verify-otp");
      } catch (err) {
        const data = err?.response?.data;

        // Show CAPTCHA if backend says it's required
        if (data?.captchaRequired) {
          setCaptchaRequired(true);
          setCaptchaToken(null); // Reset captcha for retry
          setErrorMsg("Please verify CAPTCHA");
        } else if (
          err?.response?.status === 403 &&
          data?.code === "EBADCSRFTOKEN"
        ) {
          // CSRF token error - try to refetch and retry
          setErrorMsg("Security token expired. Please try again.");
          try {
            await fetchCsrfToken();
          } catch (csrfErr) {
            console.error("Failed to refresh CSRF token:", csrfErr);
          }
        } else {
          setErrorMsg(data?.message || "Invalid email or password");
        }
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="flex min-h-screen bg-white">
      <ToastContainer />

      {/* Left Image */}
      <div className="w-1/2 bg-[#e0d8cc] flex items-center justify-center">
        <img
          src="/images/login.png"
          alt="Login"
          className="object-contain max-h-full"
        />
      </div>

      {/* Right Form */}
      <div className="w-1/2 flex items-center justify-center p-10">
        <div className="w-full max-w-md space-y-4">
          <h2 className="text-[#D4AF37] text-xl font-semibold text-center">
            Log In
          </h2>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <label className="text-[#D4AF37] block">Email Address</label>
              <input
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="w-full border rounded px-4 py-2 bg-gray-100"
                disabled={isLoading}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-[#D4AF37] text-sm mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="text-[#D4AF37] block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className="w-full border rounded px-4 py-2 bg-gray-50 pr-10"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  disabled={isLoading}
                >
                  {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-[#D4AF37] text-sm mt-1">
                  {formik.errors.password}
                </p>
              )}
            </div>

            {/* CAPTCHA (only shown when required) */}
            {captchaRequired && (
              <div className="flex justify-center">
                <ReCAPTCHA
                  sitekey={RECAPTCHA_SITE_KEY}
                  onChange={(token) => {
                    setCaptchaToken(token); // Save token
                    setErrorMsg(""); // Clear error when ticked
                  }}
                />
              </div>
            )}

            {errorMsg && (
              <p className="text-[#D4AF37] text-center text-sm">{errorMsg}</p>
            )}

            <button
              type="submit"
              className="w-full bg-[#D4AF37] hover:bg-[#B8962E] text-white py-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <div className="text-center mt-4 text-black">Or</div>

          <div className="text-center">
            <span className="text-black">Don't have an account? </span>
            <a href="/register" className="text-[#D4AF37] hover:underline">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
