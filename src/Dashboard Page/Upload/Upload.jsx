import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "../Header and Sidebar/Header/DashboardHeader";
import DashboardSidebar from "../Header and Sidebar/Sidebar/DasboardSidebar";
import UploadForm from "./Uploadform";
import AnalysisAndFeedback from "../Analysis and Feedback/AnalysisAndFeedback";
import ATSResumeOptimizer from "../ATSResumeOptimizer";
import axiosInstance from "../../utils/axios"; // ✅ Import your axios instance

function Upload() {
  const [firstName, setFirstName] = useState();
  const [analysisData, setAnalysisData] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // ✅ Use axiosInstance instead of fetch
        const response = await axiosInstance.get("/api/v1/auth/me");

        if (response.data) {
          setFirstName(response.data.name);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        // Only redirect on 401 (unauthorized)
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
    <main>
      <DashboardHeader />
      <DashboardSidebar />

      <section>
        <div
          className="fixed top-[4rem] xl:top-[6rem] left-[4rem] xl:left-[18.5rem]
                     w-[82%] xl:w-[77.5%] h-[15rem] xl:h-[38rem]
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

          <p className="xl:text-[26px] font-light italic text-center my-[40px]">
            You don't have any analysis yet. Upload your first Resume
            <br />
            below
          </p>

          <button
            onClick={() => setOpen(true)}
            className="xl:px-[2.5rem] py-[5px] text-[7px] xl:text-[13px] font-semibold text-white
                       bg-[#133970] cursor-pointer mb-[30px]
                       transition-all duration-500 ease-in-out"
          >
            Start Analysis
          </button>

          <p className="font-bold text-black text-center">
            Daily Resume Analysis 0/1
          </p>
          <p className="font-light">
            Freemium users can analyze 1 Resume per day. Upgrade to unlock
            unlimited optimizations.
          </p>
        </div>

        {open && (
          <div className="fixed z-50">
            <div
              className="fixed top-[4rem] xl:top-[6rem] left-[4rem] xl:left-[18.5rem]
                         xl:w-[77.5%] h-[15rem] xl:h-[38rem]
                         bg-[#eef3fb] border-2 border-[#2979ff] rounded-[10px]
                         flex items-center justify-center flex-col
                         transition-all duration-500 ease-in-out"
              onClick={(e) => e.stopPropagation()}
            >
              <h1 className="text-[#133970] text-[12px] xl:text-[40px] font-semibold mb-[40px]">
                Job Selection & Upload
              </h1>

              <h3 className="text-[21px] font-light italic text-center tracking-wide">
                Select the Job you are applying for and upload your Resume
              </h3>

              <UploadForm setAnalysisData={setAnalysisData} setOpen={setOpen} />
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default Upload;
