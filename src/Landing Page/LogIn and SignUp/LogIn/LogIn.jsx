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

  const [showPassword, setShowPassword] = useState(false);
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [activeEmail, setActiveEmail] = useState("");

  const handleForgotPassword = () => setShowEmailPopup(true);

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
      <div className="min-h-screen w-full flex items-center justify-center p-2 sm:p-0">
        <div className="relative w-full max-w-[99%] sm:max-w-lg md:max-w-lg lg:max-w-md rounded-xl py-7 sm:py-10 md:py-10 lg:py-15 px-15 sm:px-15 md:px-15 lg:px-20 bg-[#ffff]/60 backdrop-blur-md transition-all duration-500 ease-in-out">

          <button
            type="button"
            onClick={handleModalClose}
            className="absolute top-3 right-3 text-blue-900 hover:text-[#102c5d] transition cursor-pointer"
          >
            <X size={20} />
          </button>

          <div className="flex flex-col flex-1 items-center justify-center">
            <div className="text-center mb-0 md:mb-8">
              <h1 className="text-3xl md:text-4xl font-medium text-blue-900">
                WELCOME BACK
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Sign in to access your dashboard
              </p>
            </div>

            <form onSubmit={onSubmit}>
              {/* Email */}
              <label className="flex flex-col w-full">
                <h2 className="text-sm text-blue-900 mt-5 mb-1 ml-1">
                  Email:
                </h2>
                <input
                  type="text"
                  ref={emailRef}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      passwordRef.current?.focus();
                    }
                  }}
                  className="w-full h-9 px-10 sm:px-7 text-sm sm:text-base border border-[#3b7ce9] bg-[#fbf5f5]/30 backdrop-blur-md shadow rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </label>

              {/* Password */}
              <label className="flex flex-col w-full">
                <h2 className="text-sm text-blue-900 mt-5 mb-1 ml-1">
                  Password:
                </h2>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    ref={passwordRef}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        onSubmit(e);
                      }
                    }}
                    className="w-full h-9 px-10 sm:px-7 text-sm sm:text-base border border-[#3b7ce9] bg-[#fbf5f5]/30 backdrop-blur-md shadow rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-blue-900 hover:text-[#102c5d] transition cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </label>

              {/* Forgot password */}
              <div className="flex justify-end w-full pr-5 my-2">
                <a
                  href="#"
                  className="text-xs italic text-blue-900 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    handleForgotPassword();
                  }}
                >
                  Forgot Password?
                </a>
              </div>

              {/* Login button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-30 rounded-lg py-2 mt-4 text-md text-white bg-blue-900 hover:bg-blue-800 active:scale-95 transition cursor-pointer"
                >
                  {loggingIn ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {showEmailPopup && <EmailPopup onEmailValid={handleEmailValid} />}
      {showNewPassword && <NewPassword email={activeEmail} />}
    </main>
  );
}

export default LogIn;
