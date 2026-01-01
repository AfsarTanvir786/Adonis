import { authService } from '@/services/authService';
import type { AppDispatch } from '@/store';
import { authSlice } from '@/store/slices/authSlice';
import { Toast } from '@/utils/toast';
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export function useLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      if (data.data) {
        dispatch(authSlice.actions.setUser({ user: data.data }));
      }
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
