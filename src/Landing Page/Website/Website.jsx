import WebsiteHeader from "../Header/WebsiteHeader";
import Background1 from "../../assets/homepage.jpg";
import Websiteicon1 from "../../assets/Website Icon 1.png";

function Website() {
  return (
    <main>
      <WebsiteHeader />

      <section className="relative">
        <img
          src={Background1}
          alt="background"
          className="absolute -z-1 w-full h-full object-cover"
        />

        <div className="w-full min-h-[500px] sm:min-h-[600px] md:min-h-[700px] lg:h-[800px] relative flex flex-col lg:flex-row justify-around items-center px-4 sm:px-8 lg:px-16 py-8 lg:py-0 gap-8 lg:gap-45">
          <div className="space-y-3 sm:space-y-4 md:space-y-5 max-w-full lg:max-w-none">
            <h1 className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-bold text-[#ffff] leading-tight lg:leading-13 tracking-wide text-center lg:text-left pt-15 md:pt-15 lg:pt-0">
              AI-Powered Resume<br />Optimization
            </h1>

            <p className="text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px] font-light text-[#ffff] leading-relaxed lg:leading-6 tracking-wide text-center lg:text-left">
              In todays fast-paced job market, a well-optimized resume is your ticket to<br />
              success. Resume Optimizer analyzes, enhances, and refines your resume<br />
              using cutting-edge AI and Machine Learning to help you stand out from the<br />
              competition
            </p>

            <p className="text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px] font-light text-[#ffff] tracking-wide text-center lg:text-left">
              Upload Resume & Optimize Now!
            </p>

            <div className="flex justify-center lg:justify-start">
              <button
                type="submit"
                className="px-5 sm:px-[25px] py-2.5 sm:py-3 text-[14px] sm:text-[15px] font-semibold text-white bg-[#133970] cursor-pointer"
              >
                Get Started
              </button>
            </div>
          </div>

          <img
            src={Websiteicon1}
            alt="background"
            className="w-[280px] sm:w-[350px] md:w-[420px] lg:w-[500px]"
          />
        </div>
      </section>

      <footer></footer>
    </main>
  );
}

export default Website;
