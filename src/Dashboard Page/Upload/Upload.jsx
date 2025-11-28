import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Uploadform from "./Components/Uploadform";

import ATSResumeOptimizer from "../Result/ATSResumeOptimizer";
import axiosInstance from "../../utils/axios";
import DashboardHeader from "../Header and Sidebar/DashboardHeader";
import DasboardSidebar from "../Header and Sidebar/DasboardSidebar";

function Upload() {
  const [firstName, setFirstName] = useState();
  const [analysisData, setAnalysisData] = useState(null);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("/api/v1/auth/me");

        if (response.data) {
          setFirstName(response.data.name);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);

        if (error.response?.status === 401) {
          navigate("/");
        }
      }
    };

    fetchUser();
  }, [navigate]);

  if (analysisData) {
    return (
      <ATSResumeOptimizer
        analysisData={analysisData}
        setAnalysisData={setAnalysisData}
      />
    );
  }

  return (
    <>
      <DashboardHeader />
      <DasboardSidebar />

      <section>
        <div className="pt-16 sm:pt-20 xl:pt-24 md:ml-[16%] xl:ml-[15%] 2xl:ml-[16%] min-h-screen">
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="fixed top-16 xl:top-23 left-16 xl:left-73
                     w-[82%] xl:w-[77.5%] h-60 xl:h-10/12
                     bg-[#eef3fb] border-2 border-[#2979ff] rounded-[10px]
                     flex flex-col items-center justify-center
                     transition-all duration-500 ease-in-out"
        >
          <h1 className="text-[#133970] text-[12px] xl:text-[50px] font-semibold">
            Welcome, {firstName}.
          </h1>

          <h1 className="text-[#133970] text-[12px] xl:text-[50px] font-semibold">
            Let's start improving your Resume.
          </h1>

          <button
            onClick={() => setOpen(true)}
            className="xl:px-10 py-[5px] text-[7px] xl:text-[13px] font-semibold text-white
                       bg-[#133970] cursor-pointer mb-[30px]
                       transition-all duration-500 ease-in-out"
          >
            Start Analysis
          </button>
        </div>

        {open && (
          <div className="fixed z-2">
            <div
              className="fixed top-16 xl:top-23 left-16 xl:left-73
                         xl:w-[77.5%] h-60 xl:h-10/12
                         bg-[#eef3fb] border-2 border-[#2979ff] rounded-[10px]
                         flex items-center justify-center flex-col
                         transition-all duration-500 ease-in-out"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col items-center gap-3">
              <h1 className="text-[#133970] text-[12px] xl:text-4xl font-semibold">
                Job Selection & Upload
              </h1>

              <h3 className="text-[21px] font-light italic text-center tracking-wide">
                Select the Job you are applying for and upload your Resume
              </h3>
              </div>

              <Uploadform setAnalysisData={setAnalysisData} setOpen={setOpen} />
            </div>
          </div>
        )}
        </div>
        </div>
      </section>
    </>
  );
}

export default Upload;