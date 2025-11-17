import { useState } from "react";

function ChangeAdminPass() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdate = () => {
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    if (newPassword.length < 0) {
      alert("Password must be at least 8 characters long!");
      return;
    }
    alert("Password updated successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
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
            className="w-full px-4 py-3 bg-[#E0E1E4] border-0 rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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
            className="w-full px-4 py-3 bg-[#E0E1E4] border-0 rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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
            className="w-full px-4 py-3 bg-[#E0E1E4] border-0 rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div className="flex gap-4 pt-2 justify-evenly">
          <button
            onClick={handleUpdate}
            className=" bg-blue-700 hover:bg-blue-800  text-white py-2 px-16 text-sm rounded-lg transition duration-200"
          >
            Update Password
          </button>
          <button
            onClick={handleCancel}
            className=" bg-red-500 hover:bg-red-600 text-white py-2 px-16 text-sm rounded-lg transition duration-200"
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
