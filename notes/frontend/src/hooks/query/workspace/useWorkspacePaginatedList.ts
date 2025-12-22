import { workspaceService } from '@/services/api/workspaceService';
import type { Pagination } from '@/types/type';
import { useQuery } from '@tanstack/react-query';

export function useWorkspacePaginatedList(
  companyId: number,
  params: Partial<Pagination>
) {
  return useQuery({
    queryKey: ['workspaces', companyId, params],
    queryFn: () => workspaceService.paginatedList(params),
    enabled: !!companyId,
    staleTime: 5 * 60 * 1000, // refresh after 5 minutes
    gcTime: 60 * 60 * 1000, // clear cache after 1 hours
    placeholderData: (previousData) => previousData,
  });
}
