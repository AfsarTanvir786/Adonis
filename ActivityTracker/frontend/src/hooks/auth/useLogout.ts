import { authService } from '@/services/authService';
import { Toast } from '@/utils/toast';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export function useLogout() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      Toast.success('Logged out successfully');
      navigate('/auth/login', { replace: true });
    },
    onError: (error: any) => {
      Toast.error(error?.response?.data?.message || 'Logout failed');
    },
  });
}
