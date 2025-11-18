import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axios";

export function useLogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    if (!email.endsWith("@gmail.com")) {
      alert("Only @gmail.com emails are allowed.");
      return;
    }

    try {
      const response = await axiosInstance.post("/api/v1/auth/signin", {
        email,
        password,
      });

      // ✅ Extract user from response
      const { success, message, user } = response.data;

      if (success || message === "Login successful") {
        // ✅ Check user role and route accordingly
        if (user && user.role === 'admin') {
          navigate("/home"); // Admin dashboard
        } else {
          navigate("/upload"); // User dashboard
        }
      } else {
        alert(message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed.");
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    emailRef,
    passwordRef,
    handleLogin,
  };
}