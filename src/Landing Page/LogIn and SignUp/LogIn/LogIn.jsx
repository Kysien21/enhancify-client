import { useState } from "react";
import { useLogIn } from "./useLogIn";
import { Eye, EyeOff, X } from "lucide-react";   // <-- You must import X here

function LogIn({ handleModalClose, toggleSignup }) {
   const { email, setEmail, password, setPassword, emailRef, passwordRef, loggingIn, onSubmit } = useLogIn();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main>
      <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="relative w-full max-w-[90%] sm:max-w-md md:max-w-lg lg:max-w-xl rounded-xl p-7 sm:p-0 sm:px-8 md:px-10 lg:px-16 md:py-6 lg:py-11 bg-[#fbf5f5]/30 backdrop-blur-md transition-all duration-500 ease-in-out">

          {/* ❌ X CLOSE BUTTON */}
           <button
            type="button"
            onClick={handleModalClose}
            className="absolute top-3 right-3 text-[#133970] hover:text-[#102c5d] transition cursor-pointer"
          >
            <X size={20} />
          </button>

          <div className="flex flex-col flex-1 items-center justify-center">
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#133970]">
                WELCOME BACK
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Sign in to access your dashboard
              </p>
            </div>

            <form onSubmit={onSubmit}>
              <label className="flex flex-col w-full">
                <h2 className="text-sm text-[#133970] mt-5 mb-1 ml-1">Email:</h2>
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
                  className="w-full h-9 px-4 sm:px-5 text-sm sm:text-base border border-[#3b7ce9] bg-[#fbf5f5]/30 backdrop-blur-md shadow rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </label>

              <label className="flex flex-col w-full">
                <h2 className="text-sm text-[#133970] mt-5 mb-1 ml-1">Password:</h2>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    ref={passwordRef}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        onSubmit(e);
                      }
                    }}
                    className="w-full h-9 px-4 sm:px-5 text-sm sm:text-base border border-[#3b7ce9] bg-[#fbf5f5]/30 backdrop-blur-md shadow rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-[#133970] hover:text-[#102c5d] transition cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </label>

              <div className="flex justify-end w-full pr-5 my-2">
                <a href="#" className="text-xs italic text-[#133970] cursor-pointer">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="min-w-65 py-1 mt-4 text-[14px] text-white bg-[#133970] hover:bg-[#102c5d] transition cursor-pointer"
              >
                {loggingIn ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="flex flex-col items-center mt-4">
              <p className="text-[11px] text-[#133970] cursor-pointer">Not yet registered?</p>
              <p
  className="text-[11px] text-[#133970] mt-3 cursor-pointer underline"
  onClick={() => {
    handleModalClose(); // close login modal
    toggleSignup();     // open signup modal
  }}
>
  Sign up now
</p>

            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

export default LogIn;
