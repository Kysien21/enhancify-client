import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../utils/axios'

export const useUser = () => {
  const navigate = useNavigate()

  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await axiosInstance.get('/api/v1/auth/me')
      return response.data
    },
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 60,
    onError: (error) => {
      console.error('Failed to fetch user:', error)
      if (error.response?.status === 401) {
        navigate('/')
      }
    },
  })
}