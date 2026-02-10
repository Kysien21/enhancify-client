import { useState } from "react";
import { useLogIn } from "./useLogIn";
import { Eye, EyeOff, X } from "lucide-react";
import { Link } from "react-router-dom";
import ErrorPopup from "../../Components/ErrorPopup";

/**
 * LogIn component renders the login form and handles user login.
 */
function LogIn({ handleModalClose }) {
  const {
    email,
    setEmail,
    password,
    setPassword,
    emailRef,
    passwordRef,
    loggingIn,
    onSubmit: originalOnSubmit,
  } = useLogIn();

  // Local state for toggling password visibility and showing errors
  const [showPassword, setShowPassword] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * Handles the form submission.
   * Validates email, password, and allowed domains, then calls the original hook onSubmit.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!email.trim() || !password.trim()) {
      setErrorMessage("Please enter Email and Password");
      setShowErrorPopup(true);
      return;
    }

    const allowedDomains = ["@gmail.com", "@normi.edu.ph"];
    const isValidDomain = allowedDomains.some((domain) => email.endsWith(domain));
    if (!isValidDomain) {
      setErrorMessage("Email must be @gmail.com or @normi.edu.ph");
      setShowErrorPopup(true);
      return;
    }

    // Attempt login
    try {
      const result = await originalOnSubmit(e);
      if (result?.success === false) {
        setErrorMessage(result.message || "Login failed. Please try again.");
        setShowErrorPopup(true);
      }
    } catch (err) {
      setErrorMessage(err?.message || "Login failed. Please try again.");
      setShowErrorPopup(true);
    }
  };

  return (
    <main>
      <div className="min-h-screen flex items-center justify-center p-2 sm:p-0 sm:mb-11">
        <div className="relative w-full max-w-[99%] sm:max-w-lg md:max-w-lg lg:max-w-md rounded-xl py-7 sm:py-10 lg:py-15 px-15 sm:px-15 lg:px-20 bg-[#ffff]/60 backdrop-blur-md transition-all duration-500 ease-in-out">
          
          {/* Close Button */}
          <button
            type="button"
            onClick={() => handleModalClose()} // Close the login modal
            className="absolute top-3 right-3 text-blue-900 hover:text-[#102c5d] transition"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="flex flex-col items-center">
            <h1 className="text-3xl md:text-4xl font-medium text-blue-900 text-center">
              Welcome
            </h1>
            <p className="text-sm sm:text-base text-gray-600 text-center">
              Sign in to access your dashboard
            </p>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="w-full mt-5">
              {/* Email Input */}
<label className="flex flex-col w-full">
  <span className="text-sm text-blue-900 mb-1 ml-1">Email:</span>
  <input
    type="text"
    ref={emailRef}
    value={email}
    onChange={(e) => setEmail(e.target.value)} // Update email state
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        passwordRef.current?.focus(); // Focus password input
      }
    }}
    className="w-full h-9 px-3 text-sm sm:text-base border border-[#3b7ce9] bg-[#fbf5f5]/30 backdrop-blur-md shadow rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  />
</label>


              {/* Password Input */} 
              <label className="flex flex-col w-full mt-5">
                <span className="text-sm text-blue-900 mb-1 ml-1">Password:</span>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"} // Toggle visibility
                    ref={passwordRef}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Update password state
                    onKeyDown={(e) => e.key === "Enter" && passwordRef.current?.focus()} // Submit form on Enter
                    className="w-full h-9 px-3 text-sm sm:text-base border border-[#3b7ce9] bg-[#fbf5f5]/30 backdrop-blur-md shadow rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)} // Toggle showPassword
                    className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-blue-900 hover:text-[#102c5d] transition"
                  >
                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
              </label>

              {/* Forgot Password Link */}
              <div className="flex justify-end w-full pr-5 my-2">
                <Link
                  to="/forgot-password"
                  className="text-xs italic text-blue-900"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Login Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-30 rounded-lg py-2 mt-4 text-md text-white bg-blue-900 hover:bg-blue-800 active:scale-95 transition"
                >
                  {loggingIn ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Error Popup */}
      {showErrorPopup && (
        <ErrorPopup
          message={errorMessage}
          onClose={() => setShowErrorPopup(false)} // Close error popup
        />
      )}
    </main>
  );
}

export default LogIn;
