import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export function useSignUp() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [category, setCategory] = useState("");

  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const categoryRef = useRef();

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!firstname || !lastname || !email || !password || !confirmPassword || !category) {
      alert("Please fill in all fields.");
      return;
    }

    // ✅ Allowed domains
    const allowedDomains = ["@gmail.com", "@normi.edu.ph"];
    const isValidDomain = allowedDomains.some((domain) => email.endsWith(domain));

    if (!isValidDomain) {
      alert("Please enter a valid Gmail (@gmail.com) or NORMAI (@normi.edu.ph) email.");
      return;
    }

    if (password.length < 10) {
      alert("Password must be at least 10 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const URL = `${API_URL}/api/v1/auth/signup`;

      const response = await axios.post(URL, {
        First_name: firstname,
        Last_name: lastname,
        Email_Address: email,
        Password: password,
        Confirm_Password: confirmPassword,
        Category: category,
      });

      const { message } = response.data;

      if (message) {
        alert(message);
        navigate("/", { state: { showLogin: true } });
      }
    } catch (error) {
      console.error("Signup Failed.", error);
      alert(error?.response?.data?.message || "Signup Failed. Try again");
    }
  };

  return {
    firstname,
    setFirstname,
    lastname,
    setLastname,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    category,
    setCategory,
    firstnameRef,
    lastnameRef,
    emailRef,
    passwordRef,
    confirmPasswordRef,
    categoryRef,
    handleSignup,
  };
}