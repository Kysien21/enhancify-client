import { useState } from "react";
import AnalysisIcon from "../../assets/Analysis.png";
import Uploadform from "./Components/Uploadform";
import ATSResumeOptimizer from "../Result/ATSResumeOptimizer";
import DashboardHeader from "../Header and Sidebar/DashboardHeader";
import DasboardSidebar from "../Header and Sidebar/DasboardSidebar";
import { useUser } from "../../hooks/useUser";

function Upload() {
  const [analysisData, setAnalysisData] = useState(null); // Store resume analysis result
  const [open, setOpen] = useState(false); // Toggle upload form modal

  const { data: userData, isLoading, isError } = useUser(); // Fetch logged-in user

  // Loading state while fetching user data
  if (isLoading) {
    return (
      <section className="pt-15 md:ml-[16%] xl:ml-[16%] min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
          <p className="mt-4 text-blue-800">Loading...</p>
        </div>
      </section>
    );
  }

  // Stop rendering if error fetching user
  if (isError) return null;

  // Show analysis page if data exists
  if (analysisData) {
    return <ATSResumeOptimizer analysisData={analysisData} setAnalysisData={setAnalysisData} />;
  }

  return (
    <>
      {/* Dashboard Layout */}
      <DashboardHeader />
      <DasboardSidebar />

      <section>
        <div className="pt-15 md:ml-[16%] xl:ml-[16%] min-h-screen flex items-center justify-center px-6">
          <div className="w-full max-w-6xl mx-auto">
            {/* Welcome card before opening upload */}
            {!open && (
              <div className="bg-blue-100 border-2 border-blue-400 rounded-2xl p-10 text-center animate-fadeIn">
                <h1 className="text-4xl font-bold text-blue-900">
                  Welcome, {userData?.name}.
                </h1>
                <p className="mt-2 text-lg text-blue-800/80">
                  Let's start improving your resume.
                </p>

                <div className="flex justify-center">
                  <button
                    onClick={() => setOpen(true)}
                    className="mt-10 px-7 py-3 text-lg font-semibold text-white bg-blue-900 hover:bg-blue-800 active:scale-95 transition rounded-xl shadow-md flex items-center gap-1"
                  >
                    <img src={AnalysisIcon} alt="Icon" className="w-5 h-5" />
                    <span>Start Analysis</span>
                  </button>
                </div>
              </div>
            )}

            {/* Upload form modal */}
            {open && (
              <div className="bg-blue-100 border-2 border-blue-400 rounded-2xl p-10 text-center animate-fadeIn">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-blue-900">Add Your Resume</h1>
                  <p className="mt-2 text-blue-700/70 text-lg">
                    Upload your resume. You may also add a job description if you want.
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
