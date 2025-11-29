import { useState } from "react";
import { useLogIn } from "./useLogIn";
import { Eye, EyeOff, X } from "lucide-react";

import EmailPopup from "../../Forgot Password/EmailPopup";
import NewPassword from "../../Forgot Password/NewPassword";

function LogIn({ handleModalClose }) {
  const {
    email,
    setEmail,
    password,
    setPassword,
    emailRef,
    passwordRef,
    loggingIn,
    onSubmit,
  } = useLogIn();

  // Local States
  const [showPassword, setShowPassword] = useState(false);
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [activeEmail, setActiveEmail] = useState("");

  // Mock Database
  const databaseEmails = ["test@gmail.com", "user@example.com", "admin@example.com"];

  // Forgot Password → Show email popup
  const handleForgotPassword = () => {
    setShowEmailPopup(true);
  };

  // Email validation callback
  const handleEmailValid = (enteredEmail) => {
    if (databaseEmails.includes(enteredEmail)) {
      setActiveEmail(enteredEmail);
      setShowEmailPopup(false);
      setShowNewPassword(true);
    } else {
      alert("Email not found in database!");
    }
  };

  return (
    <main>
      <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="relative w-full max-w-[90%] sm:max-w-md md:max-w-lg lg:max-w-xl rounded-xl p-7 sm:p-0 sm:px-8 md:px-10 lg:px-16 md:py-6 lg:py-11 bg-[#fbf5f5]/30 backdrop-blur-md transition-all duration-500 ease-in-out">

          {/* Close Button */}
          <button
            type="button"
            onClick={handleModalClose}
            className="absolute top-3 right-3 text-[#133970] hover:text-[#102c5d] transition cursor-pointer"
          >
            <X size={20} />
          </button>

          <div className="flex flex-col flex-1 items-center justify-center">

            {/* Header */}
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#133970]">
                WELCOME BACK
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Sign in to access your dashboard
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={onSubmit}>
              
              {/* Email Input */}
              <label className="flex flex-col w-full">
                <h2 className="text-sm text-[#133970] mt-5 mb-1 ml-1">Email:</h2>
                <input
                  type="text"
                  ref={emailRef}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && passwordRef.current?.focus()
                  }
                  className="w-full h-9 px-4 sm:px-5 text-sm sm:text-base border border-[#3b7ce9] bg-[#fbf5f5]/30 backdrop-blur-md shadow rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </label>

              {/* Password Input */}
              <label className="flex flex-col w-full">
                <h2 className="text-sm text-[#133970] mt-5 mb-1 ml-1">Password:</h2>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    ref={passwordRef}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && onSubmit(e)}
                    className="w-full h-9 px-4 sm:px-5 text-sm sm:text-base border border-[#3b7ce9] bg-[#fbf5f5]/30 backdrop-blur-md shadow rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />

                  {/* Show / Hide Password */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-[#133970] hover:text-[#102c5d] transition cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </label>

              {/* Forgot Password */}
              <div className="flex justify-end w-full pr-5 my-2">
                <a
                  href="#"
                  className="text-xs italic text-[#133970] cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    handleForgotPassword();
                  }}
                >
                  Forgot Password?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="min-w-65 py-1 mt-4 text-[14px] text-white bg-[#133970] hover:bg-[#102c5d] transition cursor-pointer"
              >
                {loggingIn ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showEmailPopup && <EmailPopup onEmailValid={handleEmailValid} />}
      {showNewPassword && <NewPassword email={activeEmail} />}
    </main>
  );
}

export default LogIn;
