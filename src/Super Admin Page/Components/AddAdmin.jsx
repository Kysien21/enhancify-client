import { useState, useRef } from "react";
import { X } from "lucide-react";

function AddAdmin({ handleModalClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Refs for inputs
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

  const handleAddAdmin = async () => {
    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill in all fields!");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (password.length < 8) {
      alert("Password must be at least 8 characters long!");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/admin/admins`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username: name, email, password }),
      });

      const data = await response.json();

      if (data.success) {
        alert(data.message || "Admin added successfully!");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        handleModalClose();
      } else {
        alert(data.message || "Failed to add admin");
      }
    } catch (error) {
      console.error("Error adding admin:", error);
      alert("Failed to add admin");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nextRef?.current?.focus();
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-5 sm:p-0 md:ml-[17%] mt-15">
      <div className="w-full max-w-md sm:max-w-xl mx-auto bg-white rounded-xl sm:rounded-2xl border-[#cfcfcf] border-2 p-9 relative">
        {/* Close button */}
        <button
          type="button"
          onClick={handleModalClose}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 text-blue-900 hover:text-[#102c5d] transition cursor-pointer z-10"
        >
          <X size={20} className="sm:w-5 sm:h-5" />
        </button>

        <h1 className="text-xl sm:text-2xl font-semibold text-[#1E3A8A] mb-6 sm:mb-8 pr-8">
          Add New Admin
        </h1>

        <div className="space-y-4 sm:space-y-6">
          {/* Name */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-slate-600 mb-1 sm:mb-2">
              Name
            </label>
            <input
              ref={nameRef}
              type="text"
              placeholder="Admin Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, emailRef)}
              disabled={loading}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#E0E1E4] border-0 rounded-lg text-sm sm:text-base text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-slate-600 mb-1 sm:mb-2">
              Gmail
            </label>
            <input
              ref={emailRef}
              type="email"
              placeholder="admin@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, passwordRef)}
              disabled={loading}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#E0E1E4] border-0 rounded-lg text-sm sm:text-base text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-slate-600 mb-1 sm:mb-2">
              Password
            </label>
            <input
              ref={passwordRef}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, confirmPasswordRef)}
              disabled={loading}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#E0E1E4] border-0 rounded-lg text-sm sm:text-base text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-slate-600 mb-1 sm:mb-2">
              Confirm Password
            </label>
            <input
              ref={confirmPasswordRef}
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddAdmin();
                }
              }}
              disabled={loading}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-[#E0E1E4] border-0 rounded-lg text-sm sm:text-base text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:justify-evenly">
            <button
              onClick={handleAddAdmin}
              disabled={loading}
              className="bg-blue-700 hover:bg-blue-800 text-white py-2 sm:py-2 px-8 sm:px-16 text-sm rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed order-1"
            >
              {loading ? "Adding..." : "Add Admin"}
            </button>
            <button
              onClick={handleModalClose}
              disabled={loading}
              className="bg-red-500 hover:bg-red-600 text-white py-2 sm:py-2 px-8 sm:px-16 text-sm rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed order-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAdmin;
