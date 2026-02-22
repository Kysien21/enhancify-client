import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const submitResumeUpload = async (resumeFile, jobDescription) => {
  if (!resumeFile) {
    alert("Please select a resume file");
    return null;
  }

  const formData = new FormData();
  formData.append("resume", resumeFile);

  if (jobDescription.trim()) {
    formData.append("jobDescription", jobDescription);
  }

  // Upload resume
  const { data: uploadData } = await axios.post(`${API_URL}/api/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });

  const { success, message, resumeText, resumeId } = uploadData; // ✅ extract resumeId

  if (!success) {
    alert(message || "Upload Failed");
    return null;
  }

  // Analyze resume — now includes resumeId so backend can build fileUrl
  const analysisPayload = {
    resumeText,
    resumeId, // ✅ forward resumeId to analyze
  };

  if (jobDescription.trim()) analysisPayload.jobDescription = jobDescription;

  const { data: analysis } = await axios.post(`${API_URL}/api/analyze`, analysisPayload, {
    withCredentials: true,
  });

  return analysis.analysis;
};

export const useOptimizeResume = (option = {}) => {
  return useMutation({
    mutationFn: (data) => submitResumeUpload(data.resumeFile, data.jobDescription),
    ...option,
  });
};