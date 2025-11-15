import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

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
      const response = await axios.post(
        `${API_URL}/api/v1/auth/signin`,
        {
          email,
          password,
        },
        {
          withCredentials: true, // ✅ ALLOW cookies (for session)
        }
      );
      const { success, message } = response.data;

      if (success || message === "Login successful") {
        navigate("/upload");
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
