import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axios";

export function useLogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [loggingIn, setLoggingIn] = useState(false);

  const allowedDomains = ["@gmail.com", "@normi.edu.ph"];

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    const isValidDomain = allowedDomains.some((domain) =>
      email.endsWith(domain)
    );

    if (!isValidDomain) {
      alert("Email must be @gmail.com or @normi.edu.ph");
      return;
    }

    setLoggingIn(true);

    try {
      const response = await axiosInstance.post("/api/v1/auth/signin", {
        email,
        password,
      });

      const { success, message, user } = response.data;

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
      // Reset loading state
      setLoggingIn(false);
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
