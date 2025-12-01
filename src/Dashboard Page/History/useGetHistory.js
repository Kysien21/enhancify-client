import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function useGetHistory() {
  const [isLoading, setIsLoading] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [error, setError] = useState(null);

  const handleGetHistory = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const URL = `${API_URL}/api/v1/user/resume-optimize-history`;
      const { data } = await axios.get(URL, { withCredentials: true });

      const history = data.history || [];

      // Save to cache
      sessionStorage.setItem("resumeHistory", JSON.stringify(history));

      setHistoryData(history);
    } catch (error) {
      console.error("Error fetching history:", error);
      setError(error.message || "Failed to fetch history");
      setHistoryData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Check cache first
    const cached = sessionStorage.getItem("resumeHistory");

    if (cached) {
      setHistoryData(JSON.parse(cached));
      return; // Prevent fetching again
    }

    handleGetHistory();
  }, []);

  return { isLoading, historyData, error, refetch: handleGetHistory };
}
