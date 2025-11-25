import { useState, useRef } from "react";
import axios from "axios";

export function useUpload() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const resumeFileSelection = (e) => {
    const file = e.target?.files?.[0] || null;
    if (!file) return;

    if (file.size === 0) {
      alert("The selected file is empty. Please upload a valid resume.");
      e.target.value = null;
      return;
    }

    const allowedFormats = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedFormats.includes(file.type)) {
      alert("Invalid file type. Only PDF, DOC, or DOCX files are allowed.");
      e.target.value = null;
      return;
    }

    setResumeFile(file);
    e.target.value = null;
  };

  const resumeFileUpload = () => {
    fileInputRef.current?.click();
  };

  const submitResumeUpload = async () => {
    if (!resumeFile) {
      return null;
    }

    if (!jobDescription.trim()) {
      return null;
    }

    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("jobDescription", jobDescription);

    try {
      setIsLoading(true);

      const { data: uploadData } = await axios.post(
        `${API_URL}/api/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      const { success, message, resumeText } = uploadData;

      if (!success) {
        alert(message || "Upload Failed");
        return null;
      }

      const { data: analysis } = await axios.post(
        `${API_URL}/api/analyze`,
        { resumeText, jobDescription },
        { withCredentials: true }
      );

      const newEntry = {
        resumeText,
        jobDescription,
        overallScore: analysis.overallScore || 0,
        createdAt: new Date().toISOString(),
      };

      const history = JSON.parse(localStorage.getItem("history") || "[]");
      history.push(newEntry);
      localStorage.setItem("history", JSON.stringify(history));

      return analysis.analysis;
    } catch (error) {
      console.error("Upload Failed:", error);

      if (error.response?.data) {
        alert(error.response.data.message || "Upload Failed, Server Error");
      } else {
        alert("Upload Failed, Server Error");
      }

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
