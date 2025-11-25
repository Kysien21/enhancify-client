import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export function useSignUp() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const mobileRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!firstname || !lastname || !mobile || !email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (!mobile || mobile.length < 11 || !/^\d+$/.test(mobile)) {
      alert("Mobile number must be 11 digits and contain only numbers.");
      return;
    }

    if (!email.includes("@gmail.com") || email.indexOf("@gmail.com") === 0) {
      alert("Please enter a valid Gmail address.");
      return;
    }

    if (password.length < 10) {
      alert("Password must be at least 6 characters long.");
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
        Mobile_No: mobile,
        Email_Address: email,
        Password: password,
        Confirm_Password: confirmPassword,
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
    mobile,
    setMobile,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    firstnameRef,
    lastnameRef,
    mobileRef,
    emailRef,
    passwordRef,
    confirmPasswordRef,
    handleSignup,
  };
}
