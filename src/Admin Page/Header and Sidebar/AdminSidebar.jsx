import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="md:hidden fixed top-23 left-5 z-30 bg-white p-2 rounded text-[#3b7ce9] shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={24} />
      </button>

      <aside>
       <div
          className={`fixed top-0 left-0 h-full z-10 bg-[#3b7ce9] text-white 
                      w-63 sm:w-[16vw] xl:w-[16vw] pt-35
                      transform transition-transform duration-300 ease-in-out
                      ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        >
          <nav>
           <ul
              className="flex flex-col text-[15px]
                         transition-all duration-400 ease-in-out mx-3"
            >
              <li>
                <Link
                  to="/home"
                  className="flex gap-1 items-center text-md py-2 font-normal transition-all duration-200 ml-[5%] rounded-md text-white"
                >
                  
Home/Overview
                </Link>
              </li>

              <li>
                <Link
                  to="/user"
                  className="flex gap-1 items-center text-md py-2 font-normal transition-all duration-200 ml-[5%] rounded-md text-white"
                >
                  User Management
                </Link>
              </li>

                            <li>
                <Link
                  to="/report"
                  className="flex gap-1 items-center text-md py-2 font-normal transition-all duration-200 ml-[5%] rounded-md text-white"
                >
                  Reports and Analytics
                </Link>
              </li>

                            <li>
                <Link
                  to="/system"
                  className="flex gap-1 items-center text-md py-2 font-normal transition-all duration-200 ml-[5%] rounded-md text-white"
                >
                  System Management
                </Link>
                
              </li>
                                          <li>
                <Link
                  to="/"
                  className="flex gap-1 items-center text-md py-2 font-normal transition-all duration-200 ml-[5%] rounded-md text-white"
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