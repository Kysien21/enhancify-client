import WebsiteHeader from "../Header/WebsiteHeader";
import Background1 from "../../assets/homepage.jpg";
import Background2 from "../../assets/how it works.jpg";
import Websiteicon1 from "../../assets/Website Icon 1.png";

function Website() {

  return(
    <main>
      <WebsiteHeader />
<section>
  <img src={Background1} alt="background" className="absolute -z-10" />

  <div className="w-full h-190 relative flex justify-around items-center">
    <div className="space-y-5">
      <h1 className="text-[40px] font-bold text-[#ffff] leading-13 tracking-wide">
        AI-Powered Resume<br></br>Optimization
      </h1>
      <p className="text-[18px] font-light text-[#ffff] leading-6 tracking-wide">
        In todays fast-paced job market, a well-optimized resume is your ticket to<br></br>success.
        Resume Optimizer analyzes, enhances, and refines your resume<br></br>using cutting-edge AI and
        Machine Learning to help you stand out from the<br></br>competition
      </p>
      <p className="text-[18px] font-light text-[#ffff] tracking-wide">Upload Resume & Optimize Now!</p>
      <button
        type="submit"
        className="px-[25px] py-[8px] text-[15px] font-semibold text-white bg-[#133970] cursor-pointer"
      >
        Get Started
      </button>
    </div>
    <img src={Websiteicon1} alt="background" className="w-[500px]" />
  </div>
  <div className="flex justify-center">
    <div className="w-110 h-22 bg-[#236ee7] relative bottom-12 rounded-[20px] flex items-center justify-center">
      <h3 className="text-[25px] text-[#ffff] tracking-wider">Why <b>Enhancify.AI</b>?</h3>
    </div>
  </div>
</section>

<section>
  <div className=" w-full h-screen">
  </div>
</section>

<section>
    <img src={Background2} alt="background" className="absolute -z-10" />
      <div className="flex justify-center">
    <div className="w-110 h-22 bg-[#236ee7] relative bottom-11 rounded-[20px] flex items-center justify-center">
      <h3 className="text-[20px] text-[#ffff] tracking-wider">This is how <b>Resume Optimizer</b><br></br>works</h3>
    </div>
  </div>
    <div className="w-full h-screen">

    </div>
</section>
<footer>
</footer>
    </main>
  )
}

export default Website;