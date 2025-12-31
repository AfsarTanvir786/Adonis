import { adminDashboard } from '@/services/adminService';
import { useQuery } from '@tanstack/react-query';

export function getUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      return await adminDashboard.getUsers();
    },
  });
}
