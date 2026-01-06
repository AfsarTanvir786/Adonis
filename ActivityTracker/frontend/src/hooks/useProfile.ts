import { authService } from '@/services/authService';
import { useQuery } from '@tanstack/react-query';

export function useProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: authService.profile,
  });
}
