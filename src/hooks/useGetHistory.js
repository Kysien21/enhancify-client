import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axios";

/**
 * useGetHistory
 * Fetches the user's resume optimization history from the backend.
 */
export default function useGetHistory() {
  return useQuery({
    queryKey: ["history"],   // Unique cache key for React Query
    queryFn: async () => {
      const { data } = await axiosInstance.get("/api/v1/user/resume-optimize-history");
      return data.history || []; // Return an empty array if no history
    },
    staleTime: 1000 * 60 * 5,        // 5 minutes stale time
    refetchOnMount: true,            // Refetch every time component mounts
    refetchOnWindowFocus: "always",  // Refetch when window regains focus
  });
}
