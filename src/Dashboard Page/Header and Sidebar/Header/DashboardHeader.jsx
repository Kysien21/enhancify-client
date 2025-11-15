import { Link } from "react-router-dom";
import { useState } from "react";
import Logoicon from "../../../assets/Logo.png";
import Profileicon from "../../../assets/Profile.png";
import Tooltipicon from "../../../assets/Tooltip.png";

function DashboardHeader() {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggleTooltip = () => setTooltipOpen((prev) => !prev);

  return (
    <header>
      <div
        className="bg-white fixed z-[200] w-full transition-all duration-500 ease-in-out 
                   text-[#133970] h-10 sm:h-13 2xl:h-15 flex items-center justify-between shadow-md px-3 sm:px-10"
      >
        <div className="flex items-center gap-1">
          <img src={Logoicon} alt="Logo" className="w-7 sm:w-10" />
          <h3 className="text-[11px] sm:text-[15px]">Enhancify.AI</h3>
        </div>

        <nav className="flex items-center gap-3 sm:gap-5">
          <Link
            to="#"
            className="text-[11px] sm:text-[15px] font-semibold hover:text-[#8c9bf0] transition-all duration-300"
          >
            Help
          </Link>

          <Link
            to="#"
            className="text-[11px] sm:text-[15px] font-semibold hover:text-[#8c9bf0] transition-all duration-300"
          >
            About
          </Link>

          <Link
            to="#"
            className="text-[11px] sm:text-[15px] font-semibold hover:text-[#8c9bf0] transition-all duration-300"
          >
            Contacts
          </Link>

          <Link to="#">
            <button
              className="text-[10px] sm:text-[14px] font-semibold text-white bg-[#133970] 
                         rounded-full px-2 sm:px-3 py-1 my-10 sm:my-0 cursor-pointer"
            >
              Upgrade Plan
            </button>
          </Link>

          <div className="flex items-center space-x-1">
            <img
              src={Profileicon}
              alt="User Profile"
              className="w-7 sm:w-10 cursor-pointer"
            />

            <div className="relative">
              <img
                src={Tooltipicon}
                alt="Tooltip Icon"
                className="w-2 sm:w-3 cursor-pointer"
                onClick={toggleTooltip}
              />

              {tooltipOpen && (
                <div
                  className="absolute top-[25px] sm:top-[40px] right-0 bg-[#f6efef] border border-[#1d3989] 
                             rounded-md w-15 sm:w-25 h-20 sm:h-30 z-[200] p-1.5 sm:p-3"
                >
                  <ul className="text-[11px] sm:text-[15px] flex flex-col gap-2 sm:gap-3">
                    <li className="hover:text-[#8c9bf0]">
                      <Link to="/profile" onClick={() => setTooltipOpen(false)}>
                        Profile
                      </Link>
                    </li>
                    <li className="hover:text-[#8c9bf0]">
                      <Link to="/settings" onClick={() => setTooltipOpen(false)}>
                        Settings
                      </Link>
                    </li>
                    <li className="hover:text-[#8c9bf0]">
                      <Link to="/website" onClick={() => setTooltipOpen(false)}>
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default DashboardHeader;
