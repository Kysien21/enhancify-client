import { useState } from "react";

function AddAdminAcc() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    if (!fullName || !email || !password || !confirmPassword) {
      alert("Please fill in all fields!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (password.length < 0) {
      alert("Password must be at least 8 characters long!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address!");
      return;
    }

    alert("Admin account created successfully!");
    setFullName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="w-140 h-120 bg-white rounded-2xl border-[#cfcfcf] border-2 px-10 py-5">
      <h1 className="text-2xl font-semibold text-[#1E3A8A] mb-2">
        Add Another Admins Account
      </h1>

      <div className="space-y-3">
        <div>
          <label className="block text-[13px] font-medium text-slate-600 mb-2">
            Full Name
          </label>
          <input
            type="text"
            placeholder="e.g., Jane Doe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-3 bg-[#E0E1E4] border-0 rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div>
          <label className="block text-[13px] font-medium text-slate-600 mb-2">
            Email Address
          </label>
          <input
            type="email"
            placeholder="janedoe@serinahcity.ai"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-[#E0E1E4] border-0 rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div>
          <label className="block text-[13px] font-medium text-slate-600 mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="Set Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-[#E0E1E4] border-0 rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div>
          <label className="block text-[13px] font-medium text-slate-600 mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 bg-[#E0E1E4] border-0 rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className=" bg-blue-700 hover:bg-blue-800 text-white py-2 px-16 text-sm rounded-lg transition duration-200"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddAdminAcc;
