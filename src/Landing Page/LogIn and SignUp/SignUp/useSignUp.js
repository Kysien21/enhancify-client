import { useState, useRef } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

/**
 * Custom hook to manage SignUp form state and handle signup API call.
 */
export function useSignUp() {
  // Form state
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [category, setCategory] = useState("");

  // Refs for input focus control
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const categoryRef = useRef();

  /**
   * Handles the signup API request.
   * Sends user data to the backend and returns success or error message.
   */
  const handleSignup = async () => {
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

      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error?.response?.data?.message || "Signup failed. Try again",
      };
    }
  };

  return {
    firstname, setFirstname,
    lastname, setLastname,
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    category, setCategory,
    firstnameRef, lastnameRef, emailRef,
    passwordRef, confirmPasswordRef, categoryRef,
    handleSignup,
  };
}
