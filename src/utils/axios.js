// src/utils/axios.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // ✅ Send cookies with every request
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request interceptor for debugging
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('🚀 Request:', config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// ✅ Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('✅ Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', {
      status: error.response?.status,
      message: error.response?.data?.message,
      url: error.config?.url
    });

    if (error.response?.status === 401) {
      // Clear any local state and redirect to login
      console.log('🔒 Unauthorized - Redirecting to login');
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;