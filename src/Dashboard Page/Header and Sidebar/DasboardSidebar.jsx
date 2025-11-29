import { useState } from "react";
import UploadIcon from "../../assets/Upload.png";
import ResultIcon from "../../assets/Result.png";
import { NavLink } from "react-router-dom";
import { Menu } from "lucide-react";


function DasboardSidebar() {
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
                    w-63 sm:w-[16vw] xl:w-[16vw] pt-24
                    transform transition-transform duration-300 ease-in-out
                    ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
          <h2
            className="text-2xl mb-7 font-semibold text-center
                       transition-all duration-500 ease-in-out"
          >
            Dashboard
          </h2>

          <nav>
            <ul
              className="flex flex-col gap-5 xl:gap-4 text-[15px]
                         transition-all duration-400 ease-in-out"
            >
                <li>
    <NavLink
      to="/upload"
      className={({ isActive }) =>
        `flex gap-1 items-center text-lg py-2 font-semibold transition-all duration-200 
         ml-[5%] rounded-md ${
           isActive ? "bg-white text-[#3b7ce9]" : "text-white"
         }`
      }
    >
      <img
        src={UploadIcon}
        alt="Upload"
        className="w-5 h-5 transition-transform duration-200 group-hover:scale-110"
      />
      <span className="md:inline">Uploads</span>
    </NavLink>
  </li>

  <li>
    <NavLink
      to="/history"
      className={({ isActive }) =>
        `flex gap-1 items-center text-lg py-2 font-semibold transition-all duration-200 
         ml-[5%] rounded-md ${
           isActive ? "bg-black text-[#3b7ce9]" : "text-white"
         }`
      }
    >
      <img
        src={ResultIcon}
        alt="History"
        className="w-5 h-5 transition-transform duration-200 group-hover:scale-110"
      />
      <span className="md:inline">History</span>
    </NavLink>
  </li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}

export default DasboardSidebar;
