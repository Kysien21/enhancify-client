// src/context/HistoryContext.jsx
import { createContext, useContext, useState, useEffect, useRef } from "react";
import axios from "axios";

const HistoryContext = createContext();

export const useHistoryContext = () => {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error("useHistoryContext must be used within HistoryProvider");
  }
  return context;
};

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const HistoryProvider = ({ children }) => {
  const [historyData, setHistoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // ✅ Use useRef instead of useState to prevent re-renders
  const hasFetchedRef = useRef(false);

  const fetchHistory = async (force = false) => {
    // ✅ If already fetched and not forcing, return early
    if (hasFetchedRef.current && !force) {
      console.log("✅ Using cached history data");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      console.log("🔄 Fetching history data from server...");
      
      const URL = `${API_URL}/api/v1/user/resume-optimize-history`;
      const { data } = await axios.get(URL, {
        withCredentials: true,
      });
      
      setHistoryData(data.history || []);
      hasFetchedRef.current = true; // ✅ Mark as fetched
      console.log("✅ History data loaded successfully");
    } catch (error) {
      console.error("❌ Error fetching history:", error);
      setError(error.message || "Failed to fetch history");
      setHistoryData([]);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Only fetch once when component mounts
  useEffect(() => {
    if (!hasFetchedRef.current) {
      fetchHistory();
    }
  }, []); // Empty dependency array - runs only once

  const value = {
    historyData,
    isLoading,
    error,
    refetch: () => fetchHistory(true), // Force refetch when called manually
    addHistory: (newEntry) => {
      setHistoryData((prev) => [newEntry, ...prev]);
    },
  };

  return (
    <HistoryContext.Provider value={value}>
      {children}
    </HistoryContext.Provider>
  );
};


