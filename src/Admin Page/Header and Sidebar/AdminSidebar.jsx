import { useState } from "react";
import { Link } from "react-router-dom";

function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger Button (mobile only) */}
      <button
        className="md:hidden fixed top-15 left-4 z-20 bg-[#3b7ce9] p-2 rounded text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Hamburger Icon */}
        <div className="space-y-1">
          <span className="block w-6 h-0.5 bg-white"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
        </div>
      </button>

      <aside>
        <div
          className={`fixed z-15
                      bg-[#3b7ce9] text-white h-full
                      pt-35
                      transition-all duration-500 ease-in-out
                      w-40 lg:w-40 xl:w-60

                      ${isOpen ? "left-0" : "-left-40"}
                      md:left-0
                    `}
        >
          <nav>
            <ul
              className="flex flex-col gap-5 xl:gap-4 px-9 text-[15px]
                         transition-all duration-400 ease-in-out"
            >
              <li>
                <Link
                  to="/home"
                  className="flex gap-2 items-center hover:opacity-80"
                >
                  
Home/Overview
                </Link>
              </li>

              <li>
                <Link
                  to="/user"
                  className="flex gap-2 items-center hover:opacity-80"
                >
                  User Management
                </Link>
              </li>

                            <li>
                <Link
                  to="/report"
                  className="flex gap-2 items-center hover:opacity-80"
                >
                  Reports and Analytics
                </Link>
              </li>

                            <li>
                <Link
                  to="/system"
                  className="flex gap-2 items-center hover:opacity-80"
                >
                  System Management
                </Link>
                
              </li>
                                          <li>
                <Link
                  to="/"
                  className="flex gap-2 items-center hover:opacity-80"
                >
                  logout
                </Link>
                
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;