import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axios';

/**
 * useUser
 * Fetches the current logged-in user's data.
 * Redirects to home page if user is unauthorized (401).
 */
export const useUser = () => {
  const navigate = useNavigate();

  return useQuery({
    queryKey: ['user'], // Unique cache key for the user data
    queryFn: async () => {
      const response = await axiosInstance.get('/api/v1/auth/me');
      return response.data;
    },
    staleTime: Infinity,          // Never automatically mark stale
    cacheTime: 1000 * 60 * 60,    // Keep in cache for 1 hour
    onError: (error) => {
      console.error('Failed to fetch user:', error);
      if (error.response?.status === 401) {
        navigate('/'); // Redirect unauthorized users
      }
    },
  });
};
