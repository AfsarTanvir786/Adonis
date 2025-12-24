import { authService } from '@/services/api/authService';
import { Toast } from '@/utils/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export function useRegister() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => authService.register(payload),
    onSuccess: (data) => {
      if (data.success) {
        queryClient.setQueryData(['user'], data.user);
        navigate('/dashboard', { replace: true });
        Toast.success('Register successful 🎉');
      }
    },
    onError: (error: any) => {
      Toast.error('Register failed');
      throw new error(
        'Registration failed:',
        error.response?.data || error.message
      );
    },
  });
}
