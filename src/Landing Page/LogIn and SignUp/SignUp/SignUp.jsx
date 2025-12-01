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
    category,
    setCategory,
    firstnameRef,
    lastnameRef,
    emailRef,
    passwordRef,
    confirmPasswordRef,
    categoryRef,
    handleSignup,
  } = useSignUp();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <main>
      <div className="min-h-screen w-full flex items-center justify-center p-2 sm:p-0">
        <div className="relative w-full max-w-[99%] rounded-xl py-7 sm:py-10 md:py-10 lg:py-15 px-5 sm:px-15 bg-[#ffff]/60 backdrop-blur-md transition-all duration-500 ease-in-out">

          {/* ❌ X CLOSE BUTTON */}
          <button
            type="button"
            onClick={handleModalClose}
            className="absolute top-3 right-3 text-blue-900 hover:text-[#102c5d] transition cursor-pointer"
          >
            <X size={20} />
          </button>

          <div className="flex flex-col flex-1 items-center justify-center">
            {/* Heading */}
            <div className="text-center mb-6 sm:mb-5">
              <h1 className="text-3xl font-medium text-blue-900 text-center">
                We're excited to have you
                <br />
                on Board!
              </h1>
            </div>

            <form className="relative flex flex-col gap-3" onSubmit={handleSignup}>

              {/* Firstname + Lastname */}
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <label className="flex flex-col flex-1">
                  <h2 className="text-sm text-blue-900 mb-1 ml-1">Firstname:</h2>
                  <input
                    type="text"
                    ref={firstnameRef}
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        lastnameRef.current?.focus();
                      }
                    }}
                    className="w-full h-9 px-10 sm:px-5 text-sm sm:text-base border border-[#3b7ce9] bg-[#fbf5f5]/30 backdrop-blur-md shadow rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </label>

                <label className="flex flex-col flex-1">
                  <h2 className="text-sm text-blue-900 mb-1 ml-1">Lastname:</h2>
                  <input
                    type="text"
                    ref={lastnameRef}
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        categoryRef.current?.focus();
                      }
                    }}
                    className="w-full h-9 px-10 sm:px-5 text-sm sm:text-base border border-[#3b7ce9] bg-[#fbf5f5]/30 backdrop-blur-md shadow rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </label>
              </div>

              {/* Category - ✅ FIXED: Values now match backend validation */}
              <label className="flex flex-col w-full relative">
                <h2 className="text-sm text-blue-900 mb-1 ml-1">Category:</h2>
                <div className="relative w-full">
                  <select
                    ref={categoryRef}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        emailRef.current?.focus();
                      }
                    }}
                    className="w-full h-10 pl-4 pr-10 text-sm sm:text-base border border-[#3b7ce9] bg-white/80 backdrop-blur-md shadow-md rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none cursor-pointer hover:bg-blue-50"
                  >
                    <option value="" disabled>Select your Department</option>
                    <option value="CIT">CIT</option>
                    <option value="CBA">CBA</option>
                    <option value="CTE">CTE</option>
                    <option value="CAS">CAS</option>
                    <option value="CCJE">CCJE</option>
                  </select>
                </div> 
              </label>

              {/* Email */}
              <label className="flex flex-col w-full">
                <h2 className="text-sm text-blue-900 mb-1 ml-1">Email Address:</h2>
                <input
                  type="email"
                  ref={emailRef}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      passwordRef.current?.focus();
                    }
                  }}
                  className="w-full h-9 px-10 sm:px-5 text-sm sm:text-base border border-[#3b7ce9] bg-[#fbf5f5]/30 backdrop-blur-md shadow rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </label>

              {/* Password + Confirm Password */}
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                {/* Password */}
                <label className="flex flex-col flex-1 relative">
                  <h2 className="text-sm text-blue-900 mb-1 ml-1">Password:</h2>
                  <input
                    type={showPassword ? "text" : "password"}
                    ref={passwordRef}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        confirmPasswordRef.current?.focus();
                      }
                    }}
                    className="w-full h-9 px-10 sm:px-5 text-sm sm:text-base border border-[#3b7ce9] bg-[#fbf5f5]/30 backdrop-blur-md shadow rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 sm:right-3 top-8 cursor-pointer text-blue-900 hover:text-[#102c5d] transition"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </label>

                {/* Confirm Password */}
                <label className="flex flex-col flex-1 relative">
                  <h2 className="text-sm text-blue-900 mb-1 ml-1">Confirm Password:</h2>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    ref={confirmPasswordRef}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleSignup(e);
                      }
                    }}
                    className="w-full h-9 px-10 sm:px-5 text-sm sm:text-base border border-[#3b7ce9] bg-[#fbf5f5]/30 backdrop-blur-md shadow rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 sm:right-3 top-8 cursor-pointer text-blue-900 hover:text-[#102c5d] transition"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </label>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-30 rounded-lg py-2 mt-4 text-md text-white bg-blue-900 hover:bg-blue-800 active:scale-95 transition cursor-pointer"
                >
                  Confirm
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SignUp;