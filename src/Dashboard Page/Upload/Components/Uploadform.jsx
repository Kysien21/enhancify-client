import { useState } from "react"; // ✅ ADD THIS
import { useUpload } from "../useUpload";
import UploadButton from "./UploadButton";
import { useQueryClient } from "@tanstack/react-query";
import { useOptimizeResume } from "../../../hooks/useOptimizeResume";
import UploadLimitModal from "./UploadLimitModal"; // ✅ ADD THIS

function UploadForm({ setAnalysisData, setOpen }) {
  // ✅ Add state
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [limitError, setLimitError] = useState(null);
  
  // ✅ ADD THIS - Watch when modal state changes
  console.log("🔍 Modal state:", showLimitModal);
  console.log("🔍 Limit error:", limitError);
  
  const queryClient = useQueryClient();
  const {
    resumeFile,
    jobDescription,
    setJobDescription,
    resumeFileSelection,
    resumeFileUpload,
    submitResumeUpload,
    fileInputRef,
  } = useUpload();
  
  const { mutate: handleOptimize, isPending: isLoading } = useOptimizeResume({
    onSuccess: (result) => {
      console.log("BEFORE INVALIDATING QUERY");
      queryClient.invalidateQueries({ queryKey: ["history"] });
      console.log("AFTER INVALIDATING QUERY");
      setAnalysisData(result);
      setOpen(false);
    },
    onError: (error) => {
      console.log("❌ ERROR:", error);
      console.log("❌ ERROR STATUS:", error.response?.status);
      console.log("❌ ERROR DATA:", error.response?.data);
      
      // ✅ Check for 429 status (rate limit)
      if (error.response?.status === 429) {
        console.log("🚨 RATE LIMIT HIT!");
        const errorData = error.response.data;
        const newLimitError = {
          message: errorData.message,
          resetAt: errorData.resetAt,
          hoursLeft: errorData.hoursUntilReset
        };
        console.log("🚨 Setting limit error:", newLimitError);
        setLimitError(newLimitError);
        console.log("🚨 Setting modal to true");
        setShowLimitModal(true);
      } else {
        // Regular error handling
        if (error.response?.data) {
          alert(error.response.data.message || "Upload Failed, Server Error");
        } else {
          alert("Upload Failed, Server Error");
        }
      }
    },
  });

  return (
    <>
      {/* ✅ Add Modal */}
      <UploadLimitModal
        isOpen={showLimitModal}
        onClose={() => {
          console.log("🔴 Closing modal");
          setShowLimitModal(false);
          setLimitError(null);
        }}
        resetAt={limitError?.resetAt}
        hoursLeft={limitError?.hoursLeft}
      />

      <div className="flex flex-col items-center w-full max-w-md mx-auto text-center animate-fadeIn">
        {/* Resume Upload Label */}
        <h5 className="text-blue-900 mt-5 mb-2 text-sm font-semibold tracking-wide">
          Upload Your Resume
        </h5>

        {/* Upload Box */}
        <div
          onClick={resumeFileUpload}
          className="w-full h-20 flex items-center justify-center border-2 border-dashed focus:ring-blue-500 focus:border-blue-500 border-blue-300 bg-white rounded-xl cursor-pointer hover:shadow-md transition-all duration-300"
        >
          <input
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            ref={fileInputRef}
            hidden
            onChange={resumeFileSelection}
          />

          <p className="text-sm italic text-gray-500 px-4">
            {resumeFile ? resumeFile.name : "Click to upload your resume"}
          </p>
        </div>

        {/* Job Description Label */}
        <h5 className="text-blue-900 mt-10 mb-2 text-sm font-semibold tracking-wide">
          Job Description (Optional)
        </h5>

        {/* Textarea */}
        <div className="w-full h-20">
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full h-full text-center resize-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white rounded-xl focus:outline-none text-xs xl:text-sm placeholder:italic placeholder:text-[#999] hover:shadow-md pt-8 xl:pt-7 transition-all duration-300"
            placeholder="Paste job description here"
          />
        </div>

        {/* Submit Button */}
        <div className="mt-0 w-full">
          <UploadButton
            disabled={isLoading || !resumeFile}
            onConfirmAction={() => handleOptimize({ resumeFile, jobDescription })}
            isLoading={isLoading}
          />
        </div>
      </div>
    </> // ✅ ADD THIS CLOSING TAG
  );
}

export default UploadForm;