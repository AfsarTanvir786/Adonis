import { authService } from '@/services/authService';
import type { AppDispatch } from '@/store';
import { authSlice } from '@/store/slices/authSlice';
import { Toast } from '@/utils/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export function useLogout() {
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      queryClient.clear();
      dispatch(authSlice.actions.clearUser());
      navigate('/auth/login', { replace: true });
      Toast.success('Logged out successfully');
    },
    onError: (error: any) => {
      Toast.error(error?.response?.data?.message || 'Logout failed');
    },
  });
}
