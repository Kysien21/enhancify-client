import { useState } from "react";
import { useSignUp } from "./useSignUp";
import { Eye, EyeOff, X } from "lucide-react";

function SignUp({ handleModalClose }) {
  const {
    firstname,
    setFirstname,
    lastname,
    setLastname,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    firstnameRef,
    lastnameRef,
    emailRef,
    passwordRef,
    confirmPasswordRef,
    handleSignup,
  } = useSignUp();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <main>
      <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-8">
        
        {/* Make container relative so the X button can be positioned */}
        <div className="relative w-full max-w-[90%] sm:max-w-md md:max-w-lg lg:max-w-xl rounded-xl p-7 sm:p-0 sm:px-8 md:py-6 md:px-10 lg:py-7 lg:px-15 bg-[#fbf5f5]/30 backdrop-blur-md transition-all duration-500 ease-in-out">

          {/* ❌ X CLOSE BUTTON */}
          <button
            type="button"
            onClick={ handleModalClose }
            className="absolute top-3 right-3 text-[#133970] hover:text-[#102c5d] transition cursor-pointer"
          >
            <X size={20} />
          </button>

          <div className="flex flex-col flex-1 items-center justify-center">

            <div className="text-center mb-6 sm:mb-5">
              <h1 className="text-2xl text-[#133970] leading-tight font-medium text-center">
                We're excited to have you
                <br />
                on Board!
              </h1>
            </div>

            <form className="relative flex flex-col" onSubmit={handleSignup}>

              <label className="flex flex-col w-full">
                <h2 className="text-sm text-[#133970] mb-1 ml-1">Firstname:</h2>
                <input
                  type="text"
                  ref={firstnameRef}
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    (e.preventDefault(), lastnameRef.current?.focus())
                  }
                  className="w-full h-9 px-4 sm:px-5 text-sm sm:text-base border border-[#3b7ce9] bg-[#fbf5f5]/30 backdrop-blur-md shadow rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </label>

              <label className="flex flex-col w-full">
                <h2 className="text-sm text-[#133970] mb-1 ml-1">Lastname:</h2>
                <input
                  type="text"
                  ref={lastnameRef}
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    (e.preventDefault(), mobileRef.current?.focus())
                  }
                  className="w-full h-9 px-4 sm:px-5 text-sm sm:text-base border border-[#3b7ce9] bg-[#fbf5f5]/30 backdrop-blur-md shadow rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </label>

              <label className="flex flex-col w-full">
                <h2 className="text-sm text-[#133970] mb-1 ml-1">Email Address:</h2>
                <input
                  type="text"
                  ref={emailRef}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    (e.preventDefault(), passwordRef.current?.focus())
                  }
                  className="w-full h-9 px-4 sm:px-5 text-sm sm:text-base border border-[#3b7ce9] bg-[#fbf5f5]/30 backdrop-blur-md shadow rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </label>

              <label className="flex flex-col w-full">
                <h2 className="text-sm text-[#133970] mb-1 ml-1">Password:</h2>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    ref={passwordRef}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(), confirmPasswordRef.current?.focus())
                    }
                    className="w-full h-9 px-4 sm:px-5 text-sm sm:text-base border border-[#3b7ce9] bg-[#fbf5f5]/30 backdrop-blur-md shadow rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-[#133970] hover:text-[#102c5d] transition"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </label>

              <label className="flex flex-col w-full">
                <h2 className="text-sm text-[#133970] mb-1 ml-1">Confirm Password:</h2>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    ref={confirmPasswordRef}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSignup(e)}
                    className="w-full h-9 px-4 sm:px-5 text-sm sm:text-base border border-[#3b7ce9] bg-[#fbf5f5]/30 backdrop-blur-md shadow rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-[#133970] hover:text-[#102c5d] transition"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </label>

              <div className="flex justify-center w-full my-1">
                <span className="inline text-[9px] text-[#133970]">
                  I agree to the Terms of Service and Privacy Policy
                </span>
              </div>

              <button
                type="submit"
                className="min-w-65 py-1 mt-4 text-[14px] text-white bg-[#133970] hover:bg-[#102c5d] transition cursor-pointer"
              >
                Confirm
              </button>

            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SignUp;
