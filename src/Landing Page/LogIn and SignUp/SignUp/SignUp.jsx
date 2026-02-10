import { useState } from "react";
import { useSignUp } from "./useSignUp";
import { EyeOff, Eye, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ErrorPopup from "../../Components/ErrorPopup";
import SuccessPopup from "../../Components/SucessPopup";

function SignUp({ handleModalClose }) {
  // Custom hook to manage signup form state and references
  const {
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
  } = useSignUp();

  // Navigation hook from react-router-dom
  const navigate = useNavigate();

  // Local state to show/hide passwords and popups
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  /**
   * Handles the form submission.
   * Validates all fields, passwords, and email domain.
   * Calls handleSignup and displays success/error popups accordingly.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1️⃣ Check if all required fields are filled
    if (!firstname.trim() || !lastname.trim() || !category.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setErrorMessage("Please fill in all fields");
      setShowErrorPopup(true);
      return;
    }

    // 2️⃣ Check password length
    if (password.length < 10) {
      setErrorMessage("Password must be at least 10 characters long");
      setShowErrorPopup(true);
      return;
    }

    // 3️⃣ Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      setShowErrorPopup(true);
      return;
    }

    // 4️⃣ Validate allowed email domains
    const allowedDomains = ["@gmail.com", "@normi.edu.ph"];
    if (!allowedDomains.some((domain) => email.endsWith(domain))) {
      setErrorMessage("Please enter a valid Gmail (@gmail.com) or NORMAI (@normi.edu.ph) email.");
      setShowErrorPopup(true);
      return;
    }

    // 5️⃣ Attempt signup and handle success/error
    try {
      const result = await handleSignup();
      if (!result.success) {
        setErrorMessage(result.message);
        setShowErrorPopup(true);
        return;
      }
      setShowSuccessPopup(true);
    } catch (error) {
      setErrorMessage(error?.message || "Signup failed. Try again");
      setShowErrorPopup(true);
    }
  };

  return (
    <main>
      <div className="min-h-screen w-full flex items-center justify-center p-2 sm:p-0 mb-0 sm:mb-13">
        <div className="relative w-full max-w-[90%] rounded-xl py-7 sm:py-10 lg:py-15 px-5 sm:px-15 bg-[#ffff]/60 backdrop-blur-md transition-all duration-500 ease-in-out">

          {/* Close modal button */}
          <button
            type="button"
            // Close the modal when clicking the X button
            onClick={() => handleModalClose()}
            className="absolute top-3 right-3 text-blue-900 hover:text-[#102c5d] transition cursor-pointer"
          >
            <X size={20} />
          </button>

          <div className="flex flex-col items-center justify-center">
            {/* Signup header */}
            <h1 className="lg:text-3xl text-xl font-medium text-blue-900 text-center mb-5">
              We're excited to have you<br />onboard!
            </h1>

            {/* Signup form */}
            <form className="flex flex-col gap-3 w-full" onSubmit={handleSubmit}>

              {/* First Name and Last Name */}
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <label className="flex flex-col flex-1">
                  <span className="text-sm text-blue-900 mb-1 ml-1">First Name:</span>
                  <input
                    type="text"
                    ref={firstnameRef}
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)} // Update firstname state
                    onKeyDown={(e) => {
                      // Move focus to lastname input when Enter is pressed
                      if (e.key === "Enter") {
                        e.preventDefault();
                        lastnameRef.current?.focus();
                      }
                    }}
                    className="w-full h-9 px-3 text-sm sm:text-base border border-[#3b7ce9] bg-[#fbf5f5]/30 backdrop-blur-md shadow rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </label>

                <label className="flex flex-col flex-1">
                  <span className="text-sm text-blue-900 mb-1 ml-1">Last Name:</span>
                  <input
                    type="text"
                    ref={lastnameRef}
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)} // Update lastname state
                    onKeyDown={(e) => {
                      // Move focus to category select when Enter is pressed
                      if (e.key === "Enter") {
                        e.preventDefault();
                        categoryRef.current?.focus();
                      }
                    }}
                    className="w-full h-9 px-3 text-sm sm:text-base border border-[#3b7ce9] bg-[#fbf5f5]/30 backdrop-blur-md shadow rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </label>
              </div>

              {/* Department selection */}
              <label className="flex flex-col w-full relative">
                <span className="text-sm text-blue-900 mb-1 ml-1">Department:</span>
                <select
                  ref={categoryRef}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)} // Update category state
                  onKeyDown={(e) => {
                    // Move focus to email input when Enter is pressed
                    if (e.key === "Enter") {
                      e.preventDefault();
                      emailRef.current?.focus();
                    }
                  }}
                  className="w-full h-10 pl-4 pr-10 text-sm sm:text-base border border-[#3b7ce9] bg-white/80 backdrop-blur-md shadow-md rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none cursor-pointer hover:bg-blue-50"
                >
                  <option value="" disabled>Select your Department</option>
                  <option value="CIT">CIT - College of Information Technology</option>
                  <option value="CBA">CBA - College of Business Administration</option>
                  <option value="CTE">CTE - College of Teacher Education</option>
                  <option value="CAS">CAS - College of Arts and Sciences</option>
                  <option value="CCJE">CCJE - College of Criminal Justice Education</option>
                  <option value="HM">HM - Hospitality Management</option>
                </select>
              </label>

              {/* Email field */}
              <label className="flex flex-col w-full">
                <span className="text-sm text-blue-900 mb-1 ml-1">Email Address:</span>
                <input
                  type="email"
                  ref={emailRef}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Update email state
                  onKeyDown={(e) => {
                    // Move focus to password input when Enter is pressed
                    if (e.key === "Enter") {
                      e.preventDefault();
                      passwordRef.current?.focus();
                    }
                  }}
                  className="w-full h-9 px-3 text-sm sm:text-base border border-[#3b7ce9] bg-[#fbf5f5]/30 backdrop-blur-md shadow rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </label>

              {/* Password and Confirm Password */}
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                {/* Password */}
                <label className="flex flex-col flex-1 relative">
                  <span className="text-sm text-blue-900 mb-1 ml-1">Password:</span>
                  <input
                    type={showPassword ? "text" : "password"} // Toggle password visibility
                    ref={passwordRef}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Update password state
                    onKeyDown={(e) => {
                      // Move focus to confirm password when Enter is pressed
                      if (e.key === "Enter") {
                        e.preventDefault();
                        confirmPasswordRef.current?.focus();
                      }
                    }}
                    className="w-full h-9 px-3 text-sm sm:text-base border border-[#3b7ce9] bg-[#fbf5f5]/30 backdrop-blur-md shadow rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {/* Toggle password visibility */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
                    className="absolute right-3 top-8 cursor-pointer text-blue-900 hover:text-[#102c5d] transition"
                  >
                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </label>

                {/* Confirm Password */}
                <label className="flex flex-col flex-1 relative">
                  <span className="text-sm text-blue-900 mb-1 ml-1">Confirm Password:</span>
                  <input
                    type={showConfirmPassword ? "text" : "password"} // Toggle confirm password visibility
                    ref={confirmPasswordRef}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} // Update confirmPassword state
                    onKeyDown={(e) => {
                      // Trigger form submission when Enter is pressed
                      if (e.key === "Enter") handleSubmit(e);
                    }}
                    className="w-full h-9 px-3 text-sm sm:text-base border border-[#3b7ce9] bg-[#fbf5f5]/30 backdrop-blur-md shadow rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {/* Toggle confirm password visibility */}
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle showConfirmPassword state
                    className="absolute right-3 top-8 cursor-pointer text-blue-900 hover:text-[#102c5d] transition"
                  >
                    {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </label>
              </div>

              {/* Submit button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-30 rounded-lg py-2 mt-4 text-md text-white bg-blue-900 hover:bg-blue-800 active:scale-95 transition cursor-pointer"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Error popup */}
      {showErrorPopup && (
        <ErrorPopup
          message={errorMessage}
          onClose={() => setShowErrorPopup(false)} // Close error popup
        />
      )}

      {/* Success popup */}
      {showSuccessPopup && (
        <SuccessPopup
          onClose={() => {
            setShowSuccessPopup(false); // Close success popup
            navigate("/", { state: { showLogin: true } }); // Navigate to login
          }}
        />
      )}
    </main>
  );
}

export default SignUp;
