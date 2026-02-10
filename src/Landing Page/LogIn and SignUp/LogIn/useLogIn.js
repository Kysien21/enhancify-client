import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axios";

/**
 * Custom hook to manage LogIn form state and handle login API call.
 */
export function useLogIn() {
  const [email, setEmail] = useState(""); // Email state
  const [password, setPassword] = useState(""); // Password state
  const emailRef = useRef(); // Email input ref
  const passwordRef = useRef(); // Password input ref
  const navigate = useNavigate(); // Navigation hook
  const [loggingIn, setLoggingIn] = useState(false); // Loading state

  const allowedDomains = ["@gmail.com", "@normi.edu.ph"]; // Allowed email domains

  /**
   * Handles the login API request.
   * Validates email and password, then calls the backend login endpoint.
   */
  const onSubmit = async (e) => {
    e.preventDefault();

    // Input validation
    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    // Domain validation
    const isValidDomain = allowedDomains.some((domain) =>
      email.endsWith(domain)
    );

    if (!isValidDomain) {
      alert("Email must be @gmail.com or @normi.edu.ph");
      return;
    }

    setLoggingIn(true);

    try {
      // API request
      const response = await axiosInstance.post("/api/v1/auth/signin", {
        email,
        password,
      });

      const { success, message, user } = response.data;

      // Navigate based on role
      if (success || message === "Login successful") {
        if (user && user.role === "admin") {
          navigate("/home");
        } else {
          navigate("/upload");
        }
      } else {
        alert(message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed.");
    } finally {
      setLoggingIn(false); // Reset loading state
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    emailRef,
    passwordRef,
    onSubmit,
    loggingIn,
  };
}
