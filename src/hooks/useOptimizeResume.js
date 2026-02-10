import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

/**
 * submitResumeUpload
 * Handles uploading a resume and optionally analyzing it against a job description.
 */
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

  const { success, message, resumeText } = uploadData;

  if (!success) {
    alert(message || "Upload Failed");
    return null;
  }

  // Analyze resume
  const analysisPayload = { resumeText };
  if (jobDescription.trim()) analysisPayload.jobDescription = jobDescription;

  const { data: analysis } = await axios.post(`${API_URL}/api/analyze`, analysisPayload, {
    withCredentials: true,
  });

  return analysis.analysis; // Return analyzed resume data
};

/**
 * useOptimizeResume
 * React Query mutation hook to upload and analyze a resume.
 */
export const useOptimizeResume = (option = {}) => {
  return useMutation({
    mutationFn: (data) => submitResumeUpload(data.resumeFile, data.jobDescription),
    ...option,
  });
};
