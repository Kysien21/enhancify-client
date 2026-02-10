import WebsiteHeader from "../Header/WebsiteHeader";
import Background1 from "../../assets/homepage.jpg";
import Websiteicon1 from "../../assets/Website Icon 1.png";
import { useWebsiteHeader } from "../Header/useWebsiteHeader";

/**
 * Website Component
 * 
 * This component renders the main landing page of the website.
 * It includes:
 * - WebsiteHeader with signup/login modals
 * - Hero section with background, text, and illustration
 * - Footer
 */
function Website() {
  // Custom hook to manage header state and modal actions
  const { signup, login, toggleSignup, toggleLogin, handleModalClose } = useWebsiteHeader();

  return (
    <main className="flex flex-col min-h-screen">
      {/* Header Section */}
      <WebsiteHeader
        signup={signup}               // Boolean: Show/hide signup modal
        login={login}                 // Boolean: Show/hide login modal
        toggleSignup={toggleSignup}   // Function: Toggle signup modal
        toggleLogin={toggleLogin}     // Function: Toggle login modal
        handleModalClose={handleModalClose} // Function: Close any open modal
      />

      {/* Hero Section */}
      <section className="relative flex-1">
        {/* Background Image */}
        <img
          src={Background1}               // Hero background
          alt="background"
          className="absolute inset-0 -z-10 w-full h-full object-cover"
        />

        {/* Content Wrapper */}
        <div className="w-full min-h-[500px] sm:min-h-[600px] md:min-h-[680px] flex flex-col lg:flex-row justify-around items-center px-4 sm:px-8 lg:px-16 py-8 gap-8 lg:gap-0">

          {/* Text Block */}
          <div className="space-y-4 max-w-full lg:max-w-lg text-center lg:text-left pt-10">
            {/* Hero Title */}
            <h1 className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-bold text-white leading-tight tracking-wide">
              AI-Powered Resume<br />Optimization
            </h1>

            {/* Hero Description */}
            <p className="text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px] font-light text-white leading-relaxed">
              In today's fast-paced job market, a well-optimized resume is your ticket to success. Resume Optimizer analyzes, enhances, and refines your resume using cutting-edge AI and Machine Learning to help you stand out from the competition.
            </p>

            <p className="text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px] font-light text-white">
              Upload Resume & Optimize Now!
            </p>

            {/* Call-to-Action Button */}
            <div className="flex justify-center lg:justify-start">
              <button
                onClick={toggleSignup}  // Open signup modal when clicked
                className="px-5 sm:px-[25px] py-2.5 sm:py-3 text-[14px] sm:text-[15px] font-semibold text-white bg-blue-900 hover:bg-blue-800 active:scale-95 cursor-pointer rounded-lg transition"
              >
                Get Started
              </button>
            </div>
          </div>

          {/* Illustration/Image Block */}
          <img
            src={Websiteicon1}              // Hero illustration
            alt="illustration"
            className="w-[200px] sm:w-[280px] md:w-[350px] lg:w-[500px] object-contain pt-10"
          />
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-white w-full h-12 flex justify-center items-center text-center">
        {/* Currently empty; can add footer content or warnings here */}
      </footer>
    </main>
  );
}

export default Website;
