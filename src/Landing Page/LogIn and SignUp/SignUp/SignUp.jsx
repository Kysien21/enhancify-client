import { useState } from "react";
import { useSignUp } from "./useSignUp";
import { Eye, EyeOff } from "lucide-react";

function SignUp() {
  const {
    firstname,
    setFirstname,
    lastname,
    setLastname,
    mobile,
    setMobile,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    firstnameRef,
    lastnameRef,
    mobileRef,
    emailRef,
    passwordRef,
    confirmPasswordRef,
    handleSignup,
  } = useSignUp();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <main>
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex w-[390px] h-[485px] rounded-[10px] bg-[#fbf5f5]/30 backdrop-blur-md">
          <div className="flex flex-col flex-1 items-center justify-center">
            <div className="flex items-center justify-center relative">
              <div className="flex items-center relative">
                <h1 className="text-[20px] text-[#133970] leading-tight mb-1 text-center">
                  We're excited to have you
                  <br />
                  on Board!
                </h1>
              </div>
            </div>

            <form className="relative flex flex-col" onSubmit={handleSignup}>
              <label className="flex flex-col w-[230px]">
                <h2 className="text-[12.5px] text-[#133970] mb-1 ml-1">Firstname:</h2>
                <input
                  type="text"
                  ref={firstnameRef}
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    (e.preventDefault(), lastnameRef.current?.focus())
                  }
                  className="h-[30px] px-4 py-1 mb-1 border border-[#3b7ce9] bg-[#fbf5f5]/30 backdrop-blur-md shadow
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </label>

              <label className="flex flex-col w-[230px]">
                <h2 className="text-[13px] text-[#133970] mb-1 ml-1">Lastname:</h2>
                <input
                  type="text"
                  ref={lastnameRef}
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    (e.preventDefault(), mobileRef.current?.focus())
                  }
                  className="h-[30px] px-4 py-1 mb-1 border border-[#3b7ce9] bg-[#fbf5f5]/30 backdrop-blur-md shadow
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </label>

              <label className="flex flex-col w-[230px]">
                <h2 className="text-[13px] text-[#133970] mb-1 ml-1">Mobile No:</h2>
                <input
                  type="text"
                  ref={mobileRef}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    (e.preventDefault(), emailRef.current?.focus())
                  }
                  className="h-[30px] px-4 py-1 mb-1 border border-[#3b7ce9] bg-[#fbf5f5]/30 backdrop-blur-md shadow
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </label>

              <label className="flex flex-col w-[230px]">
                <h2 className="text-[13px] text-[#133970] mb-1 ml-1">Email Address:</h2>
                <input
                  type="text"
                  ref={emailRef}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    (e.preventDefault(), passwordRef.current?.focus())
                  }
                  className="h-[30px] px-4 py-1 mb-1 border border-[#3b7ce9] bg-[#fbf5f5]/30 backdrop-blur-md shadow
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </label>

              <label className="flex flex-col w-[230px]">
                <h2 className="text-[13px] text-[#133970] mb-1 ml-1">Password:</h2>
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
                    className="h-[30px] w-full px-4 py-1 mb-1 border border-[#3b7ce9] bg-[#fbf5f5]/30 backdrop-blur-md shadow
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-[7px] text-[#133970] hover:text-[#102c5d] transition"
                  >
                    {showPassword ? (
                      <EyeOff size={14} />
                    ) : (
                      <Eye size={14} />
                    )}
                  </button>
                </div>
              </label>

              <label className="flex flex-col w-[230px]">
                <h2 className="text-[13px] text-[#133970] mb-1 ml-1">Confirm Password:</h2>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    ref={confirmPasswordRef}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSignup(e)}
                    className="h-[30px] w-full px-4 py-1 mb-1 border border-[#3b7ce9] bg-[#fbf5f5]/30 backdrop-blur-md shadow
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 top-[7px] text-[#133970] hover:text-[#102c5d] transition"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={14} />
                    ) : (
                      <Eye size={14} />
                    )}
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
                className="w-[230px] h-[30px] text-[16px] text-white bg-[#133970] hover:bg-[#102c5d] transition"
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