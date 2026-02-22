import { useState } from "react";
import { useUpload } from "../useUpload";
import UploadButton from "./UploadButton";
import { useQueryClient } from "@tanstack/react-query";
import { useOptimizeResume } from "../../../hooks/useOptimizeResume";
import UploadLimitModal from "./UploadLimitModal";
import UploadErrorPopup from "./UploadErrorPopup";

function UploadForm({ setAnalysisData, setOpen }) {
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [limitError, setLimitError] = useState(null);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const queryClient = useQueryClient();

  const {
    resumeFile,
    jobDescription,
    setJobDescription,
    resumeFileSelection,
    resumeFileUpload,
    fileInputRef,
  } = useUpload();

  const MAX_SIZE = 1 * 1024 * 1024; // 1MB

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // ✅ PDF validation
    if (file.type !== "application/pdf") {
      setErrorMessage("Only PDF files are allowed.");
      setShowErrorPopup(true);
      e.target.value = null;
      return;
    }

    // ✅ File size validation
    if (file.size > MAX_SIZE) {
      setErrorMessage("File size exceeds 1 MB limit. Please upload a smaller PDF.");
      setShowErrorPopup(true);
      e.target.value = null;
      return;
    }

    resumeFileSelection(e);
  };

  const { mutate: handleOptimize, isPending: isLoading } =
    useOptimizeResume({
      onSuccess: (result) => {
        queryClient.invalidateQueries({ queryKey: ["history"] });
        setAnalysisData(result);
        setOpen(false);
      },
      onError: (error) => {
        if (error.response?.status === 429) {
          const errorData = error.response.data;
          setLimitError({
            message: errorData.message,
            resetAt: errorData.resetAt,
            hoursLeft: errorData.hoursUntilReset,
          });
          setShowLimitModal(true);
        } else {
          setErrorMessage(
            error.response?.data?.message ||
              "Upload failed. Please try again."
          );
          setShowErrorPopup(true);
        }
      },
    });

  return (
    <>
      {showErrorPopup && (
        <UploadErrorPopup
          message={errorMessage}
          onClose={() => setShowErrorPopup(false)}
        />
      )}

      <UploadLimitModal
        isOpen={showLimitModal}
        onClose={() => {
          setShowLimitModal(false);
          setLimitError(null);
        }}
        resetAt={limitError?.resetAt}
        hoursLeft={limitError?.hoursLeft}
      />

      <div className="flex flex-col items-center w-full max-w-md mx-auto text-center animate-fadeIn">

        <h5 className="text-blue-900 mt-5 mb-2 text-sm font-semibold tracking-wide">
          Upload Your Resume (PDF Only)
        </h5>

        <div
          onClick={resumeFileUpload}
          className="w-full h-20 flex items-center justify-center border-2 border-dashed border-blue-300 bg-white rounded-xl cursor-pointer hover:shadow-md transition-all duration-300"
        >
          <input
            type="file"
            accept="application/pdf"
            ref={fileInputRef}
            hidden
            onChange={handleFileSelect}
          />
          <p className="text-sm italic text-gray-500 px-4">
            {resumeFile ? resumeFile.name : "Click to upload your PDF resume"}
          </p>
        </div>

        <h5 className="text-blue-900 mt-10 mb-2 text-sm font-semibold tracking-wide">
          Job Description
        </h5>

        <div className="w-full h-20">
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full h-full text-center resize-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white rounded-xl focus:outline-none text-xs xl:text-sm placeholder:italic pt-8 xl:pt-7 hover:shadow-md transition-all duration-300"
            placeholder="Paste job description here"
          />
        </div>

        <div className="mt-2 w-full">
          <UploadButton
            disabled={isLoading || !resumeFile || !jobDescription.trim()}
            onConfirmAction={() =>
              handleOptimize({ resumeFile, jobDescription })
            }
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
}

export default UploadForm;