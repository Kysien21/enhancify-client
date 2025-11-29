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
        <div  className="pt-15 md:ml-[16%] xl:ml-[16%] min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-6xl mx-auto">
          {!open && (
            <div className="bg-[#eef3fb] border-2 border-[#2979ff] rounded-2xl p-10 text-center animate-fadeIn">
              <h1 className="text-4xl font-bold text-blue-900">
                Welcome, {firstName}.
              </h1>
              <p className="mt-2 text-lg text-blue-800/80">
                Let's start improving your resume.
              </p>

              <button
                onClick={() => setOpen(true)}
                className="mt-10 px-8 py-3 text-lg font-semibold text-white bg-[#133970] hover:bg-blue-800 active:scale-95 transition rounded-xl shadow-md"
              >
                Start Analysis
              </button>
            </div>
          )}

          {/* Upload Modal */}
          {open && (
            <div className="bg-[#eef3fb] border-2 border-[#2979ff] rounded-2xl p-10 text-center animate-fadeIn">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-blue-900">
                  Job Selection & Upload
                </h1>
                <p className="mt-2 text-blue-700/70 text-lg">
                  Select the job you're applying for and upload your resume.
                </p>
              </div>

              <Uploadform setAnalysisData={setAnalysisData} setOpen={setOpen} />
            </div>
          )}
        </div>
        </div>
      </section>
    </>
  );
}

export default Upload;
