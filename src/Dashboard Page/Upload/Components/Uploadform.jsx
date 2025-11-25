import { useUpload } from "../useUpload";
import UploadButton from "./UploadButton";

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

  return (
    <div className="flex flex-col items-center justify-center relative my-[25px] bottom-0">
      <h5 className="text-[#133970] mt-5 md:mt-5 lg:mt-9 mb-1 text-xs sm:text-sm font-bold">
        Upload your Resume
      </h5>

      <div
        className="w-60 sm:w-[20rem] lg:w-98 h-12 sm:h-16 flex items-center justify-center 
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
        <p className=" text-xs sm:text-sm italic text-[#999]">
          {resumeFile ? resumeFile.name : "Drag and Drop your Resume file"}
        </p>
      </div>

      <h5 className="text-[#133970] mt-5 md:mt-5 lg:mt-9 mb-1 text-xs sm:text-sm font-bold">
        Attach your Job Description
      </h5>

      <div className="w-40 lg:w-98 h-9 xl:h-16 border border-[#868484] rounded-[10px] bg-white">
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Copy and paste your desired job description here"
          className="w-full h-full text-center resize-none focus:outline-none text-[8px] xl:text-[15px] placeholder:italic placeholder:text-[#999] pt-5"
        />
      </div>

      <UploadButton
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
  );
}

export default UploadForm;
