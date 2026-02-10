import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Upload, History, LogOut } from "lucide-react";

import { useQueryClient } from "@tanstack/react-query"; // ✅ ADD THIS
import axios from "axios";

function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient(); // ✅ ADD THIS

  // ✅ Updated logout function with cache clearing
  const handleLogout = async () => {
    try {
      const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

      const response = await axios.post(
        `${API_BASE}/api/v1/auth/signout`,
        {},
        { withCredentials: true }
      );

      if (response.data.success) {
        console.log("✅ Logout successful");

        // ✅ Clear React Query cache
        queryClient.clear();

        // Clear browser storage
        localStorage.clear();
        sessionStorage.clear();

        // Redirect to home/login
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error("❌ Logout error:", error);

      // ✅ Still clear cache even on error
      queryClient.clear();

      // Still redirect even if there's an error
      navigate("/", { replace: true });
    }
  };

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden fixed top-6 left-4 z-50 bg-white p-2 rounded-full shadow-lg text-[#3b7ce9] hover:scale-105 transition-transform"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={24} />
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside>
        <div
          className={`fixed top-0 left-0 h-full z-10 bg-[#3b7ce9] text-white
                      w-64 sm:w-[16vw] xl:w-[16vw] pt-24
                      transform transition-transform duration-300 ease-in-out
                      ${
                        isOpen ? "translate-x-0" : "-translate-x-full"
                      } md:translate-x-0
                      flex flex-col justify-between`}
        >
          {/* Top Section: Header + Nav */}
          <div>
            <h2 className="text-xl font-bold text-center mb-8">Dashboard</h2>

            <nav className="flex flex-col space-y-2">
              <Link
                to="/upload"
                className="flex items-center gap-1 px-3 py-2 hover:bg-blue-700 hover:bg-opacity-80 transition-all cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                <Upload size={18} />
                Upload
              </Link>

              <Link
                to="/history"
                className="flex items-center gap-1 px-3 py-2 hover:bg-blue-700 hover:bg-opacity-80 transition-all cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                <History size={18} />
                History
              </Link>
            </nav>
          </div>

          {/* ✅ Logout Button with cache clearing */}
          <div className="mb-6">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-1 px-3 py-2 hover:bg-red-600 hover:bg-opacity-80 transition-all cursor-pointer text-left"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default DashboardSidebar;
