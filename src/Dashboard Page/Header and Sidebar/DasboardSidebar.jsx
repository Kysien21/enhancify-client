import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Home, Users, LogOut } from "lucide-react";

function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(false);

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
                ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
                flex flex-col justify-between`}
  >
    {/* Top Section: Header + Nav */}
    <div>
      <h2 className="text-xl font-bold text-center mb-8">Dashboard</h2>

      <nav className="flex flex-col space-y-2">
        <Link
          to="/upload"
          className="flex items-center gap-1 px-3 py-2 hover:bg-blue-700 hover:bg-opacity-80 transition-all"
        >
          <Home size={18} />
          Upload
        </Link>

        <Link
          to="/history"
          className="flex items-center gap-1 px-3 py-2 hover:bg-blue-700 hover:bg-opacity-80 transition-all"
        >
          <Users size={18} />
          History
        </Link>
      </nav>
    </div>

    {/* Logout at Bottom */}
    <div className="mb-6">
      <Link
        to="/"
        className="flex items-center gap-1 px-3 py-2 hover:bg-red-600 hover:bg-opacity-80 transition-all"
      >
        <LogOut size={18} />
        Logout
      </Link>
    </div>
  </div>
</aside>

    </>
  );
}

export default DashboardSidebar;
