import { useUpload } from "./useUpload";
import Button from "./Button";

function UploadForm({ setAnalysisData, setOpen }) {
  const {
    resumeFile,
    jobDescription,
    setJobDescription,
    resumeFileSelection,
    resumeFileUpload,
    submitResumeUpload,
    fileInputRef,
    isLoading,
  } = useUpload();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await submitResumeUpload(e);

      setAnalysisData(result);
      setOpen(false);
    } catch (error) {
      console.error("Error submitting:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center justify-center relative my-[25px] bottom-[20px]">
          
          <h5 className="mt-4 md:mt-5 lg:mt-9 mb-1 md:mb-1 lg:mb-2 text-[10px] sm:text-[15px] font-semibold">
            Upload your Resume
          </h5>

          {/* File Upload Box */}
          <div
            className="w-[15rem] sm:w-[20rem] lg:w-[26rem] h-[3rem] sm:h-[4rem] flex items-center justify-center 
                   border border-dashed border-[#868484]
                   rounded-[10px] bg-white cursor-pointer
                   transition-all duration-500 ease-in-out"
            onClick={resumeFileUpload}
          >
            <input
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              ref={fileInputRef}
              hidden
              onChange={resumeFileSelection}
            />
            <p className="text-[10px] sm:text-[14px] lg:text-[15px] italic text-[#999]">
              {resumeFile ? resumeFile.name : "Drag and Drop your Resume file"}
            </p>
          </div>

          <h5 className="mt-4">Attach Job Description</h5>

          {/* Job Description Box */}
          <div
            className="w-40 xl:w-[26rem] h-9 xl:h-[4rem] border border-[#868484] rounded-[10px] bg-white 
                       transition-all duration-500 ease-in-out"
          >
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Copy and paste your desired job description here"
              className="w-full h-full text-center resize-none focus:outline-none focus:border-2 
                         focus:border-[#3b7ce9] text-[8px] xl:text-[15px] placeholder:italic 
                         placeholder:text-[#999] cursor-text"
            />
          </div>

          {/* Submit Button */}
          <Button
            disabled={isLoading || !resumeFile || !jobDescription}
            onConfirmAction={async () => {
              const result = await submitResumeUpload();
              if (result) {
                setAnalysisData(result);
                setOpen(false);
              }
            }}
          />
        </div>
      </form>
    </>
  );
}

export default UploadForm;