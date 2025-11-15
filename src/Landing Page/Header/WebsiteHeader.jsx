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
      <div className="fixed w-screen h-[110vh] flex items-center justify-center z-[100]" onClick={handleModalClose}>
        <div onClick={(e) => e.stopPropagation()}>
          {login && <LogIn />}
          {signup && <SignUp />}
        </div>
      </div>
    );
  }
  
  return (
    <>
      <header className="fixed w-full h-[65px] flex justify-around items-center bg-white shadow-md z-50">
        
        <div className="flex items-center gap-2">
          <img src={Logo} alt="Enhancify.ai" className="w-[50px]" />
          <h1 className="text-[12px] font-medium text-[#133970]">Enhancify.ai</h1>
        </div>

        <nav className="flex gap-[20px]">
          <a href="#" className="font-medium text-[#133970] text-[13px] hover:text-[#8c9bf0]">How it Works</a>
          <a href="#" className="font-medium text-[#133970] text-[13px] hover:text-[#8c9bf0]">Pricing</a>
          <a href="#" className="font-medium text-[#133970] text-[13px] hover:text-[#8c9bf0]">Contact Us</a>
        </nav>

        <div className="flex gap-[20px]">
          <button onClick={toggleLogin} className="font-medium text-[#133970] text-[13px] hover:text-[#8c9bf0]">Log In</button>
          <button onClick={toggleSignup} className="font-medium text-[#133970] text-[13px] hover:text-[#8c9bf0]">Sign Up</button>
        </div>
      </header>

      {modalContent}
    </>
  );
}

export default WebsiteHeader;
