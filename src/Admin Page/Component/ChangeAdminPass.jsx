import { useState } from "react";
import axios from "axios";

function ChangeAdminPass() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

  const handleUpdate = async () => {
    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill in all fields!");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    if (newPassword.length < 8) {
      alert("Password must be at least 8 characters long!");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${API_BASE}/admin/change-password`,
        {
          currentPassword,
          newPassword
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        alert(response.data.message || "Password updated successfully!");
        // Clear form
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        alert(response.data.message || "Failed to update password");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      alert(error.response?.data?.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="w-140 h-120 bg-white rounded-2xl border-[#cfcfcf] border-2 px-10 py-5">
      <h1 className="text-2xl font-semibold text-[#1E3A8A] mb-8">
        Change Admin Password
      </h1>

      <div className="space-y-6">
        <div>
          <label className="block text-[13px] font-medium text-slate-600 mb-2">
            Current Password
          </label>
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            disabled={loading}
            className="w-full px-4 py-3 bg-[#E0E1E4] border-0 rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
          />
        </div>

        <div>
          <label className="block text-[13px] font-medium text-slate-600 mb-2">
            New Password
          </label>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={loading}
            className="w-full px-4 py-3 bg-[#E0E1E4] border-0 rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
          />
        </div>

        <div>
          <label className="block text-[13px] font-medium text-slate-600 mb-2">
            Confirm New Password
          </label>
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
            className="w-full px-4 py-3 bg-[#E0E1E4] border-0 rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
          />
        </div>

        <div className="flex gap-4 pt-2 justify-evenly">
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-16 text-sm rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
          <button
            onClick={handleCancel}
            disabled={loading}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-16 text-sm rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>

        <p className="text-xs text-slate-500 text-center">
          Ensure your new password has at least 8 characters, including a number
          and a symbol.
        </p>
      </div>
    </div>
  );
}

export default ChangeAdminPass;