import { Link } from "react-router-dom";
import { useState } from "react";
import LogoIcon from "../../assets/Logo.png";
import ProfileIcon from "../../assets/Profile.png";
import TooltipIcon from "../../assets/Tooltip.png";
import Profile from "../Profile/Profile"; // make sure the path is correct

function DashboardHeader() {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const toggleTooltip = () => setTooltipOpen((prev) => !prev);
  const openProfileModal = () => setProfileModalOpen(true);
  const closeProfileModal = () => setProfileModalOpen(false);

  return (
    <header>
      <div
        className="bg-white fixed z-30 w-full transition-all duration-500 ease-in-out 
                   text-[#133970] h-10 sm:h-13 2xl:h-15 flex items-center justify-between shadow-md px-3 sm:px-10"
      >
        <div className="flex items-center gap-1">
          <img src={LogoIcon} alt="Logo" className="w-7 sm:w-10" />
          <h3 className="text-[11px] sm:text-[15px]">Enhancify.AI</h3>
        </div>

        <div className="flex items-center space-x-1">
          {/* Profile Icon */}
          <img
            src={ProfileIcon}
            alt="User Profile"
            className="w-7 sm:w-10 cursor-pointer"
            onClick={openProfileModal}
          />

          <div className="relative">
            <img
              src={TooltipIcon}
              alt="Tooltip Icon"
              className="w-2 sm:w-3 cursor-pointer"
              onClick={toggleTooltip}
            />

            {tooltipOpen && (
              <div
                className="absolute top-[30px] sm:top-[45px] right-0 bg-[#f6efef] border border-[#1d3989] 
                           rounded-md w-15 sm:w-25 h-15 sm:h-20 z-20 p-1.5 sm:p-3"
              >
                <ul className="text-[11px] sm:text-[15px] flex flex-col gap-2 sm:gap-3">
                  <li className="hover:text-[#8c9bf0]">
                    <Link to="/profile" onClick={() => setTooltipOpen(false)}>
                      Profile
                    </Link>
                  </li>
                  <li className="hover:text-[#8c9bf0]">
                    <Link to="/" onClick={() => setTooltipOpen(false)}>
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      {profileModalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4 ml-50 mt-10">
          <div className="w-full max-w-2xl">
            <Profile />
            <button
              className="absolute top-4 right-4 text-white text-xl font-bold"
              onClick={closeProfileModal}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default DashboardHeader;
