import Logo from "../../assets/Logo.png";
import LogIn from "../LogIn and SignUp/LogIn/LogIn";
import SignUp from "../LogIn and SignUp/SignUp/SignUp";
import { useWebsiteHeader } from "./useWebsiteHeader";

function WebsiteHeader() {
  const {
    login,
    signup,
    toggleLogin,
    toggleSignup,
    handleModalClose,
  } = useWebsiteHeader();

  let modalContent = null;

  if (login || signup) {
    modalContent = (
      <div className="fixed w-screen h-[110vh] flex items-center justify-center z-10">
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={handleModalClose}
            className="absolute top-33 right-4 text-xl font-bold text-gray-700 hover:text-gray-900 z-20 cursor-pointer"
          >
            ✕
          </button>

          {login && <LogIn />}
          {signup && <SignUp />}
        </div>
      </div>
    );
  }

  return (
    <>
      <header className="fixed w-full h-[65px] flex justify-between items-center bg-white shadow-md z-30 px-3 sm:px-10">
        <div className="flex items-center gap-2">
          <img src={Logo} alt="Enhancify.ai" className="w-[50px]" />
          <h1 className="text-[12px] font-medium text-[#133970]">
            Enhancify.ai
          </h1>
        </div>

        <div className="flex gap-5">
          <button
            onClick={toggleLogin}
            className="font-medium text-[#133970] text-[13px] hover:text-[#8c9bf0]"
          >
            Log In
          </button>
          <button
            onClick={toggleSignup}
            className="font-medium text-[#133970] text-[13px] hover:text-[#8c9bf0]"
          >
            Sign Up
          </button>
        </div>
      </header>

      {modalContent}
    </>
  );
}

export default WebsiteHeader;
