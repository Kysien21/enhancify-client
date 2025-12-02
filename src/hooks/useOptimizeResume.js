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

  // ✅ Only append job description if it has content
  if (jobDescription.trim()) {
    formData.append("jobDescription", jobDescription);
  }

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

  // ✅ Only analyze with job description if provided
  const analysisPayload = { resumeText };
  if (jobDescription.trim()) {
    analysisPayload.jobDescription = jobDescription;
  }

  const { data: analysis } = await axios.post(
    `${API_URL}/api/analyze`,
    analysisPayload,
    { withCredentials: true }
  );

  // const newEntry = {
  //   resumeText,
  //   jobDescription: jobDescription.trim() || null,
  //   overallScore: analysis.overallScore || 0,
  //   createdAt: new Date().toISOString(),
  // };

  // const history = JSON.parse(localStorage.getItem("history") || "[]");
  // history.push(newEntry);
  // localStorage.setItem("history", JSON.stringify(history));

  return analysis.analysis;

  //   try {
  //     const { data: uploadData } = await axios.post(
  //       `${API_URL}/api/upload`,
  //       formData,
  //       {
  //         headers: { "Content-Type": "multipart/form-data" },
  //         withCredentials: true,
  //       }
  //     );

  //     const { success, message, resumeText } = uploadData;

  //     if (!success) {
  //       alert(message || "Upload Failed");
  //       return null;
  //     }

  //     // ✅ Only analyze with job description if provided
  //     const analysisPayload = { resumeText };
  //     if (jobDescription.trim()) {
  //       analysisPayload.jobDescription = jobDescription;
  //     }

  //     const { data: analysis } = await axios.post(
  //       `${API_URL}/api/analyze`,
  //       analysisPayload,
  //       { withCredentials: true }
  //     );

  //     // const newEntry = {
  //     //   resumeText,
  //     //   jobDescription: jobDescription.trim() || null,
  //     //   overallScore: analysis.overallScore || 0,
  //     //   createdAt: new Date().toISOString(),
  //     // };

  //     // const history = JSON.parse(localStorage.getItem("history") || "[]");
  //     // history.push(newEntry);
  //     // localStorage.setItem("history", JSON.stringify(history));

  //     return analysis.analysis;
  //   } catch (error) {
  //     console.error("Upload Failed:", error);

  //     if (error.response?.data) {
  //       alert(error.response.data.message || "Upload Failed, Server Error");
  //     } else {
  //       alert("Upload Failed, Server Error");
  //     }

  //     return null;
  //   }
};

export const useOptimizeResume = (option = {}) => {
  return useMutation({
    mutationFn: (data) =>
      submitResumeUpload(data.resumeFile, data.jobDescription),
    ...option,
  });
};
