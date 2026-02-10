import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios";

/**
 * NewPassword
 *
 * Allows users to create a new password using a token received from email.
 * Handles validation, password visibility, and API request for password reset.
 */
function NewPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { token } = useParams();  // Token from URL
  const navigate = useNavigate();

  // ✅ Check if token exists
  useEffect(() => {
    if (!token) {
      alert("Invalid password reset link. Please request a new one.");
      navigate("/forgot-password");
    }
  }, [token, navigate]);

  /**
   * handleConfirm
   * Validate passwords and send reset request to backend.
   */
  const handleConfirm = async () => {
    setError("");

    // Validation
    if (!newPassword || !confirmPassword) {
      setError("Please fill in both fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    if (newPassword.length < 10) {
      setError("Password must be at least 10 characters.");
      return;
    }

    setIsLoading(true);

    try {
      console.log("🔐 Resetting password with token");

      const response = await axiosInstance.post(`/api/v1/auth/reset-password/${token}`, {
        newPassword,
        confirmPassword,
      });

      console.log("✅ Password reset response:", response.data);

      if (response.data.success) {
        alert(response.data.message || "Password has been reset successfully!");
        setTimeout(() => {
          navigate("/", { state: { showLogin: true } });
        }, 1000);
      }
    } catch (err) {
      console.error("❌ Password reset error:", err);

      if (err.response?.status === 400) {
        setError(err.response?.data?.message || "Password reset link is invalid or expired.");
        setTimeout(() => navigate("/forgot-password"), 3000);
      } else if (err.response?.status === 404) {
        setError("Reset token not found. Please request a new password reset.");
        setTimeout(() => navigate("/forgot-password"), 3000);
      } else {
        setError("Failed to reset password. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center pt-20 z-15 bg-[#2979FF]">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-auto relative animate-fadeIn">
        <div className="p-6 sm:p-15">
          <h2 className="text-2xl font-semibold text-blue-900 mb-3">Create New Password</h2>
          <p className="text-sm sm:text-md text-blue-900 mb-6 sm:mb-8">
            Please enter a new password for your account.
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* New Password */}
          <div className="mb-6 relative">
            <label htmlFor="newPassword" className="block text-sm font-medium text-blue-900 mb-2">New Password:</label>
            <input
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              placeholder="Enter Password (min 10 characters)"
              value={newPassword}
              onChange={(e) => { setNewPassword(e.target.value); setError(""); }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-11 text-[#133970] hover:text-[#102c5d] transition"
              disabled={isLoading}
            >
              {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="mb-6 relative">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">Confirm Password:</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="Re-enter Password"
              value={confirmPassword}
              onChange={(e) => { setConfirmPassword(e.target.value); setError(""); }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-11 text-[#133970] hover:text-[#102c5d] transition"
              disabled={isLoading}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Submit */}
          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className="w-full bg-blue-900 text-white py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Resetting..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewPassword;
