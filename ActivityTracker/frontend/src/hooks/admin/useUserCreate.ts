import { adminDashboard } from '@/services/adminService';
import { Toast } from '@/utils/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUserCreate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminDashboard.createUser,
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ['USERPAGINATION'] });
        Toast.success('Register new User successful 🎉');
      }
    },
    onError: (error: any) => {
      const errors = error?.data?.errors;

      if (errors && errors.length > 0) {
        Toast.error(errors[0].message);
      } else {
        Toast.error('Registration failed');
      }
    },
  });
}
