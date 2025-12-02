import { useState } from "react"

import AnalysisIcon from "../../assets/Analysis.png"
import Uploadform from "./Components/Uploadform"
import ATSResumeOptimizer from "../Result/ATSResumeOptimizer"
import DashboardHeader from "../Header and Sidebar/DashboardHeader"
import DasboardSidebar from "../Header and Sidebar/DasboardSidebar"
import { useUser } from "../../hooks/useUser"

function Upload() {
  const [analysisData, setAnalysisData] = useState(null)
  const [open, setOpen] = useState(false)

  // ✅ Use React Query - fetches only once and caches
  const { data: userData, isLoading, isError } = useUser()

  // ✅ Loading state
  if (isLoading) {
    return (
      <>
        <section>
          <div className="pt-15 md:ml-[16%] xl:ml-[16%] min-h-screen flex items-center justify-center px-6">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
              <p className="mt-4 text-blue-800">Loading...</p>
            </div>
          </div>
        </section>
      </>
    )
  }

  // ✅ Error state (user already redirected by useUser hook)
  if (isError) {
    return null
  }

  if (analysisData) {
    return (
      <ATSResumeOptimizer
        analysisData={analysisData}
        setAnalysisData={setAnalysisData}
      />
    )
  }

  return (
    <>
      <DashboardHeader />
      <DasboardSidebar />

      <section>
        <div className="pt-15 md:ml-[16%] xl:ml-[16%] min-h-screen flex items-center justify-center px-6">
          <div className="w-full max-w-6xl mx-auto">
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

            {/* Upload Modal */}
            {open && (
              <div className="bg-blue-100 border-2 border-blue-400 rounded-2xl p-10 text-center animate-fadeIn">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-blue-900">
                    Resume Upload and Job Description
                  </h1>
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
  )
}

export default Upload