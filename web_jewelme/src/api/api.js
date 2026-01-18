// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5050/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5050/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // IMPORTANT: Enable sending cookies
});

// Store CSRF token
let csrfToken = null;

// Function to get CSRF token
export const fetchCsrfToken = async () => {
  try {
    const response = await api.get("/auth/csrf-token");
    csrfToken = response.data.csrfToken;
    return csrfToken;
  } catch (error) {
    console.error("Failed to fetch CSRF token:", error);
    throw error;
  }
};

// Request interceptor to add CSRF token to headers
api.interceptors.request.use(
  async (config) => {
    // Skip CSRF token for GET requests and for the csrf-token endpoint itself
    if (config.method !== "get" && !config.url.includes("/csrf-token")) {
      // If we don't have a CSRF token yet, fetch it
      if (!csrfToken) {
        try {
          await fetchCsrfToken();
        } catch (error) {
          console.error("Failed to get CSRF token:", error);
        }
      }
      
      // Add CSRF token to headers
      if (csrfToken) {
        config.headers["X-CSRF-Token"] = csrfToken;
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle CSRF token errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If CSRF token is invalid or expired, fetch a new one and retry
    if (
      error.response?.status === 403 &&
      error.response?.data?.code === "EBADCSRFTOKEN" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      
      try {
        await fetchCsrfToken();
        originalRequest.headers["X-CSRF-Token"] = csrfToken;
        return api(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    // If session expired (401), clear any stored data
    if (error.response?.status === 401) {
      localStorage.removeItem("user");
      localStorage.removeItem("mfaEmail");
      csrfToken = null;
      
      // Optionally redirect to login
      if (window.location.pathname !== '/login' && window.location.pathname !== '/') {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;