import { authService } from '@/services/authService';
import { Toast } from '@/utils/toast';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export function useRegister() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authService.register,
    onSuccess: () => {
      navigate('/auth/login', { replace: true });
      Toast.success('Register successful 🎉');
    },
    onError: (error: any) => {
      Toast.error('Register failed');
      throw new error(
        'Registration failed:',
        error.response?.data || error.message,
      );
    },
  });
}
