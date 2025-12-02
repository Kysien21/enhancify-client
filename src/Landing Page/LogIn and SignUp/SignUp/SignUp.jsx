import { useState } from "react";
import { useSignUp } from "./useSignUp";
import { Eye, EyeOff, X } from "lucide-react";
import ErrorPopup from "../../Components/ErrorPopup";

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

  // Error popup state
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Success popup state
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1️⃣ Check required fields
    if (!firstname.trim() || !lastname.trim() || !category.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setErrorMessage("Please fill in all fields");
      setShowErrorPopup(true);
      return;
    }

    // 2️⃣ Password length
    if (password.length < 10) {
      setErrorMessage("Password must be at least 10 characters long");
      setShowErrorPopup(true);
      return;
    }

    // 3️⃣ Password match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      setShowErrorPopup(true);
      return;
    }

    // 4️⃣ Email domain validation
    const allowedDomains = ["@gmail.com", "@normi.edu.ph"];
    const isValidDomain = allowedDomains.some((domain) => email.endsWith(domain));

    if (!isValidDomain) {
      setErrorMessage("Please enter a valid Gmail (@gmail.com) or NORMAI (@normi.edu.ph) email.");
      setShowErrorPopup(true);
      return;
    }

    // 5️⃣ Call the signup function and handle server errors
    try {
      const result = await handleSignup(e);

      if (result?.success === false) {
        setErrorMessage(result.message || "Signup failed. Try again");
        setShowErrorPopup(true);
      } else {
        // ✅ Signup successful
        setShowSuccessPopup(true);
      }
    } catch (error) {
      console.error("Signup Failed.", error);
      setErrorMessage(error?.response?.data?.message || "Signup Failed. Try again");
      setShowErrorPopup(true);
    }
  };

  

  return (
    <main>
      <div className="min-h-screen w-full flex items-center justify-center p-2 sm:p-0 mb-0 sm:mb-13">
        <div className="relative w-full max-w-[90%] rounded-xl py-7 sm:py-10 md:py-10 lg:py-15 px-5 sm:px-15 bg-[#ffff]/60 backdrop-blur-md transition-all duration-500 ease-in-out">

          {/* ❌ Close button */}
          <button
            type="button"
            onClick={handleModalClose}
            className="absolute top-3 right-3 text-blue-900 hover:text-[#102c5d] transition cursor-pointer"
          >
            <X size={20} />
          </button>

          <div className="flex flex-col flex-1 items-center justify-center">
            <div className="text-center mb-0 sm:mb-5">
              <h1 className="lg:text-3xl text-xl font-medium text-blue-900 text-center">
                We're excited to have you
                <br />
                on board!
              </h1>
            </div>

            <form className="relative flex flex-col gap-3" onSubmit={handleSubmit}>
              {/* Firstname + Lastname */}
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <label className="flex flex-col flex-1">
                  <h2 className="text-sm text-blue-900 mb-1 ml-1">First Name:</h2>
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
                  <h2 className="text-sm text-blue-900 mb-1 ml-1">Last Name:</h2>
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

              {/* Category */}
              <label className="flex flex-col w-full relative">
                <h2 className="text-sm text-blue-900 mb-1 ml-1">Department:</h2>
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
                  <option value="CIT">CIT - College of Information Technology</option>
                  <option value="CBA">CBA - College of Business Administration</option>
                  <option value="CTE">CTE - College of Teacher Education</option>
                  <option value="CAS">CAS - College of Arts and Sciences</option>
                  <option value="CCJE">CCJE - College of Criminal Justice Education</option>
                  <option value="HM">HM - Hospitality Management</option>
                </select>
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
                        handleSubmit(e);
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

      {/* Error Popup */}
      {showErrorPopup && (
        <ErrorPopup message={errorMessage} onClose={() => setShowErrorPopup(false)} />
      )}
    </main>
  );
}

export default SignUp;
