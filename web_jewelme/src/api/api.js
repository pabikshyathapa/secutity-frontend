import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5050/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, 
});

let csrfToken = null;

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

api.interceptors.request.use(
  async (config) => {
    if (config.method !== "get" && !config.url.includes("/csrf-token")) {
      if (!csrfToken) {
        try {
          await fetchCsrfToken();
        } catch (error) {
          console.error("Failed to get CSRF token:", error);
        }
      }
      
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

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

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

    if (error.response?.status === 401) {
      localStorage.removeItem("user");
      localStorage.removeItem("mfaEmail");
      csrfToken = null;
      
      if (window.location.pathname !== '/login' && window.location.pathname !== '/') {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;