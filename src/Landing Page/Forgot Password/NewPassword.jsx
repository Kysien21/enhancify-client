import { useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";

function NewPassword({ email }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Function to handle password reset
  const handleConfirm = () => {
    if (!newPassword || !confirmPassword) {
      alert("Please fill in both fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (newPassword.length < 10) {
      alert("Password must be at least 10 characters.");
      return;
    }

    // Mock "submit" action
    alert(`Password for ${email} has been successfully reset!`);

    // Optionally, clear inputs
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center pt-20 z-15 bg-[#2979FF]">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-auto relative animate-fadeIn">
        <div className="p-6 sm:p-15">
          <h2 className="text-2xl font-semibold text-blue-900 mb-3">
            Create New Password
          </h2>
          {email && <p className="text-sm text-blue-900 mb-4">For: {email}</p>}
          <p className="text-sm sm:text-md text-blue-900 mb-6 sm:mb-8">
            Please enter a new password for your account. Make sure it's strong,
            secure, and something you'll remember.
          </p>

          <div>
            {/* New Password */}
            <div className="mb-6 relative">
              <label htmlFor="newPassword" className="block text-sm font-medium text-blue-900 mb-2">
                New Password:
              </label>
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                placeholder="Enter Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-11 text-[#133970] hover:text-[#102c5d] transition"
              >
                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="mb-6 relative">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password:
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Re-enter Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-11 text-[#133970] hover:text-[#102c5d] transition"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              onClick={handleConfirm}
              className="w-full bg-blue-900 text-white py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewPassword;
