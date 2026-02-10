import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios";

/**
 * EmailPopup
 *
 * Component to allow users to request a password reset link via email.
 * Handles validation, sending request, and showing success/error messages.
 */
function EmailPopup() {
  // State variables
  const [email, setEmail] = useState("");       // User input email
  const [error, setError] = useState("");       // Error message
  const [isLoading, setIsLoading] = useState(false); // Loading state for request
  const [success, setSuccess] = useState(false);     // Indicates if email was sent successfully

  const navigate = useNavigate(); // React Router hook for navigation

  /**
   * handleSend
   * Validate email and send password reset request to backend.
   */
  const handleSend = async () => {
    setError("");

    // Check if email is provided
    if (!email) {
      setError("Please enter your email");
      return;
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      console.log("📧 Sending password reset request for:", email);

      const response = await axiosInstance.post("/api/v1/auth/forgot-password", {
        email: email.trim(),
      });

      console.log("✅ Response:", response.data);

      if (response.data.success) {
        setSuccess(true);
        setError("");
      }
    } catch (err) {
      console.error("❌ Forgot password error:", err);

      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to send reset email. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * goToHome
   * Redirect user to homepage
   */
  const goToHome = () => {
    navigate("/");
  };

  // ✅ Render success message after email is sent
  if (success) {
    return (
      <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center pt-20 z-15 bg-[#2979FF]">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-auto relative animate-fadeIn">
          <div className="p-6 sm:p-15 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-blue-900 mb-3">Email Sent!</h2>
            <p className="text-sm sm:text-md text-blue-900 mb-6">
              We've sent a password reset link to <strong>{email}</strong>.
            </p>
            <button
              onClick={goToHome}
              className="w-full bg-blue-900 text-white py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors cursor-pointer"
            >
              Back to Homepage
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Render email input form
  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center pt-20 z-15 bg-[#2979FF]">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-auto relative animate-fadeIn">
        <div className="p-6 sm:p-15">
          <h2 className="text-2xl font-semibold text-blue-900 mb-3">Forgot Password</h2>
          <p className="text-sm sm:text-md text-blue-900 mb-6 sm:mb-8">
            Enter your email address below, and we'll send you a link to reset your password.
          </p>

          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-blue-900 mb-2">Email Address:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              placeholder="Enter email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all text-gray-700 placeholder-gray-400"
              disabled={isLoading}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>

          <button
            onClick={handleSend}
            disabled={isLoading}
            className="w-full bg-blue-900 text-white py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmailPopup;
