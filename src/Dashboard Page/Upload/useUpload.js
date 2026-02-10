import { useState, useRef } from "react";
import axios from "axios";

export function useUpload() {
  // State for selected resume and optional job description
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef(null); // For programmatic file input click
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  // Handle file selection
  const resumeFileSelection = (e) => {
    const file = e.target?.files?.[0] || null; 
    if (!file) return;

    if (file.size === 0) {
      alert("The selected file is empty. Please upload a valid resume.");
      e.target.value = null;
      return;
    }

    setResumeFile(file);
    e.target.value = null; // Reset input so same file can be re-selected
  };

  // Open file input programmatically
  const resumeFileUpload = () => fileInputRef.current?.click();

  // Submit resume and analyze
  const submitResumeUpload = async () => {
    if (!resumeFile) {
      alert("Please select a resume file");
      return null;
    }

    const formData = new FormData();
    formData.append("resume", resumeFile);

    if (jobDescription.trim()) formData.append("jobDescription", jobDescription);

    try {
      setIsLoading(true);

      // Upload resume to backend
      const { data: uploadData } = await axios.post(`${API_URL}/api/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      const { success, message, resumeText } = uploadData;

      if (!success) {
        alert(message || "Upload Failed");
        return null;
      }

      // Send resume (and optional job description) for analysis
      const analysisPayload = { resumeText };
      if (jobDescription.trim()) analysisPayload.jobDescription = jobDescription;

      const { data: analysis } = await axios.post(`${API_URL}/api/analyze`, analysisPayload, {
        withCredentials: true,
      });

      return analysis.analysis; // Return analysis result
    } catch (error) {
      console.error("Upload Failed:", error);
      alert(error.response?.data?.message || "Upload Failed, Server Error");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    resumeFile,
    jobDescription,
    setJobDescription,
    resumeFileSelection,
    resumeFileUpload,
    submitResumeUpload,
    fileInputRef,
    isLoading,
  };
}
