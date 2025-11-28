import { createContext, useContext, useState, useEffect, useRef } from "react";
import axiosInstance from "../../utils/axios";

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // ✅ Use useRef to prevent refetching on navigation
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    const fetchUser = async () => {
      // ✅ If already fetched, skip
      if (hasFetchedRef.current) {
        console.log("✅ User already fetched, using cached data");
        setIsLoading(false);
        return;
      }

      try {
        console.log("🔄 Fetching user data...");
        setIsLoading(true);
        const response = await axiosInstance.get("/api/v1/auth/me");
        
        if (response.data) {
          setUser({
            name: response.data.name,
            email: response.data.email,
            role: response.data.role,
          });
          hasFetchedRef.current = true; // ✅ Mark as fetched
          console.log("✅ User data loaded:", response.data.name);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setError(error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []); // ✅ Empty dependency array - only run once

  const value = {
    user,
    isLoading,
    error,
    refetchUser: async () => {
      try {
        console.log("🔃 Manual user refetch");
        setIsLoading(true);
        hasFetchedRef.current = false; // Reset the flag
        const response = await axiosInstance.get("/api/v1/auth/me");
        if (response.data) {
          setUser({
            name: response.data.name,
            email: response.data.email,
            role: response.data.role,
          });
          hasFetchedRef.current = true;
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    },
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};