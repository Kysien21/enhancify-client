import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axios";

export default function useGetHistory() {
  return useQuery({
    queryKey: ["history"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        "/api/v1/user/resume-optimize-history"
      );
      return data.history || [];
    },
    staleTime: 1000 * 60 * 5,
    refetchOnMount: true,
    refetchOnWindowFocus: "always",
  });
}
