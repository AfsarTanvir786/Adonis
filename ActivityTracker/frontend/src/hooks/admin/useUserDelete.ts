import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Toast } from '@/utils/toast';
import { adminDashboard } from '@/services/adminService';

export function useUserDelete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminDashboard.removeUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['USERPAGINATION'] });
      Toast.success('User successfully Removed 🎉');
    },
  });
}
