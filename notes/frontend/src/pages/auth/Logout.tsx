import { useEffect } from 'react';
import { authService } from '@/services/api/authService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/store';
import { authSlice } from '@/store/slices/authSlice';

function Logout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { mutate, isPending } = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      // Clear all cached data
      queryClient.clear();
      dispatch(authSlice.actions.clearUser());
      navigate('/auth/login', { replace: true });
    },
    onError: () => {
      // Force cleanup
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      dispatch(authSlice.actions.clearUser());
      queryClient.clear();
      navigate('/auth/login', { replace: true });
    },
  });

  // Trigger logout when component mounts
  useEffect(() => {
    mutate();
  }, [mutate]);

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-lg">Logging out...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <svg
          className="w-16 h-16 text-green-500 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <p className="text-lg text-green-600">Logged out successfully!</p>
        <p className="text-sm text-gray-600 mt-2">Redirecting to login...</p>
      </div>
    </div>
  );
}

export default Logout;
