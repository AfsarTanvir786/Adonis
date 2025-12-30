import { authService } from '@/services/authService';
import { Toast } from '@/utils/toast';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export function useLogin() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: () => {
      Toast.success('Login successful 🎉');
      navigate('/dashboard', { replace: true });
    },
    onError: (error: any) => {
      Toast.error(
        error?.response?.data?.message || 'Login failed'
      );
    },
  });
}
