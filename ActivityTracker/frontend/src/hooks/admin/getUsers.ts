import { adminDashboard } from '@/services/adminService';
import type { Pagination } from '@/type/type';
import { useQuery } from '@tanstack/react-query';

export function getUsers() {
  return useQuery({
    queryKey: ['USERS'],
    queryFn: adminDashboard.getUsers,
  });
}

export function getUsersPagination(params: Partial<Pagination>){
  return useQuery({
    queryKey: ['USERPAGINATION', params],
    queryFn: () => adminDashboard.getUsersPagination(params),
    placeholderData: (previousData) => previousData,
  });
}