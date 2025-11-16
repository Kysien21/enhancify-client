import { useUpload } from "./useUpload";
import Button from "./Button"; // ✅ Import your custom Button

function UploadForm({ setAnalysisData, setOpen }) {
  const {
    resumeFile,
    jobDescription,
    setJobDescription,
    category,
    setCategory,
    resumeFileSelection,
    resumeFileUpload,
    submitResumeUpload,
    fileInputRef,
    isLoading,
  } = useUpload();

  // ✅ Handler for category selection
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);

    // Automatically open file explorer after selecting a category
    if (selectedCategory) {
      resumeFileUpload();
    }
  };

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
          <h5>Select your job Category</h5>

          <select
            className="appearance-none p-[5px] xl:w-[26rem] xl:h-[4rem] xl:text-[10px]
                       rounded-[10px] bg-[#DCDCDC] text-[#1e3a8a] focus:border-[#3b7ce9] outline-none"
            value={category}
            onChange={handleCategoryChange} // ✅ use handler
          >
            <option value="" disabled hidden>
              Select your job
            </option>
            <option value="it">Information Technology</option>
            <option value="education">Education</option>
            <option value="finance">Finance</option>
            <option value="engineering">Engineering</option>
            <option value="hospitality">Hospitality</option>
          </select>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx"
            onChange={resumeFileSelection}
          />

          {/* Show selected file name */}
          {resumeFile && (
            <p className="mt-2 text-sm text-green-600 font-medium">
              📎 {resumeFile.name}
            </p>
          )}

          <h5 className="mt-4">Attach Job Description</h5>

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

          {/* ✅ Replace default button with your custom Button */}
          <Button
            disabled={isLoading || !resumeFile || !jobDescription || !category}
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