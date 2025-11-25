import { useState } from "react";
import { useLogIn } from "./useLogIn";
import { Eye, EyeOff } from "lucide-react";

function LogIn() {
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

  return (
    <main>
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex w-[390px] h-[485px] rounded-[10px] bg-[#fbf5f5]/30 backdrop-blur-md">
          <div className="flex flex-col flex-1 items-center justify-center">
            <div className="flex items-center justify-center">
              <div className="relative text-center">
                <h1 className="text-[35px] text-[#133970] leading-tight">
                  WELCOME BACK
                </h1>
                <p className="text-[9px] font-medium tracking-[2px] text-[#133970]">
                  Sign in to access your dashboard
                </p>
              </div>
            </div>

            <form onSubmit={onSubmit}>
              <label className="flex flex-col w-[260px]">
                <h2 className="text-[15px] text-[#133970] mt-5 mb-1 ml-1">Email:</h2>
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
                  className="h-[30px] px-5 py-4 mb-4 border border-[#3b7ce9] bg-[#fbf5f5]/30 backdrop-blur-md shadow
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </label>

              <label className="flex flex-col w-[260px]">
                <h2 className="text-[15px] text-[#133970] mt-5 mb-1 ml-1">Password:</h2>
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
                    className="h-[30px] w-full px-5 py-4 mb-4 border border-[#3b7ce9] bg-[#fbf5f5]/30 backdrop-blur-md shadow
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[7px] text-[#133970] hover:text-[#102c5d] transition"
                  >
                    {showPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
              </label>

              <div className="flex justify-end w-full pr-5">
                <a href="#" className="text-[9px] italic text-[#133970]">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="min-w-65 py-1 mt-4 text-[14px] text-white bg-[#133970] hover:bg-[#102c5d] transition"
              >
                {loggingIn ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="flex flex-col items-center mt-4">
              <p className="text-[11px] text-[#133970]">Not yet registered?</p>
              <a href="/signup" className="text-[11px] text-[#133970] underline">
                Sign up now
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default LogIn;