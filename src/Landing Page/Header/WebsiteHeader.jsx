import Logo from "../../assets/Logo.png";
import LogIn from "../LogIn and SignUp/LogIn/LogIn";
import SignUp from "../LogIn and SignUp/SignUp/SignUp";

/**
 * WebsiteHeader
 *
 * Header component of the website.
 * Displays logo, login/signup buttons, and renders modals when login/signup is active.
 */
function WebsiteHeader({ signup, login, toggleSignup, toggleLogin, handleModalClose }) {
  let modalContent = null;

  /**
   * Determine which modal to display.
   * - If either login or signup is active, show a modal overlay.
   */
  if (login || signup) {
    modalContent = (
      <div className="fixed w-screen h-[110vh] flex items-center justify-center z-10">
        {/* Prevent click propagation to background */}
        <div onClick={(e) => e.stopPropagation()}>
          {/* Login modal */}
          {login && <LogIn handleModalClose={handleModalClose} toggleSignup={toggleSignup} />}
          {/* Signup modal */}
          {signup && <SignUp handleModalClose={handleModalClose} />}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header bar */}
      <header className="fixed w-full h-[65px] flex justify-around items-center bg-white shadow-md z-30 px-3 sm:px-10">
        {/* Logo and site name */}
        <div className="flex items-center gap-2">
          <img src={Logo} alt="Enhancify.ai" className="w-[50px]" />
          <h1 className="text-[12px] font-medium text-[#133970]">Enhancify.ai</h1>
        </div>

        {/* Navigation buttons */}
        <div className="flex gap-5">
          {/* Login Button */}
          <button
            onClick={toggleLogin} // Open login modal
            className="font-medium text-[#133970] text-[13px] hover:text-[#8c9bf0] cursor-pointer"
          >
            Log In
          </button>
          {/* Signup Button */}
          <button
            onClick={toggleSignup} // Open signup modal
            className="font-medium text-[#133970] text-[13px] hover:text-[#8c9bf0] cursor-pointer"
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Render modal if login or signup is active */}
      {modalContent}
    </>
  );
}

export default WebsiteHeader;
