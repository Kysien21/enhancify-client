import Logo from "../../assets/Logo.png";
import LogIn from "../LogIn and SignUp/LogIn/LogIn";
import SignUp from "../LogIn and SignUp/SignUp/SignUp";

function WebsiteHeader({ signup, login, toggleSignup, toggleLogin, handleModalClose }) {
  let modalContent = null;

  if (login || signup) {
    modalContent = (
      <div className="fixed w-screen h-[110vh] flex items-center justify-center z-10">
        <div onClick={(e) => e.stopPropagation()}>
          {login && <LogIn handleModalClose={handleModalClose} toggleSignup={toggleSignup} />}

          {signup && <SignUp handleModalClose={handleModalClose} />}
        </div>
      </div>
    );
  }

  return (
    <>
      <header className="fixed w-full h-[65px] flex justify-around items-center bg-white shadow-md z-30 px-3 sm:px-10">
        <div className="flex items-center gap-2">
          <img src={Logo} alt="Enhancify.ai" className="w-[50px]" />
          <h1 className="text-[12px] font-medium text-[#133970]">Enhancify.ai</h1>
        </div>

        <div className="flex gap-5">
          <button
            onClick={toggleLogin}
            className="font-medium text-[#133970] text-[13px] hover:text-[#8c9bf0] cursor-pointer"
          >
            Log In
          </button>
          <button
            onClick={toggleSignup}
            className="font-medium text-[#133970] text-[13px] hover:text-[#8c9bf0] cursor-pointer"
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
