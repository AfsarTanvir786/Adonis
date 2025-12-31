import { adminDashboard } from '@/services/adminService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function getImages(params: {userId: number, date: Date}) {
    const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminDashboard.getScreenshots,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['images', params] });
    },
  });
}
