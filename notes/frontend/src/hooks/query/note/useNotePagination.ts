import { useQuery } from '@tanstack/react-query';
import { NoteService } from '@/services/api/noteService';
import type { Pagination } from '@/types/type';

export function useNotePagination(
  workspaceId: number,
  params: Partial<Pagination>
) {
  return useQuery({
    queryKey: ['notes', workspaceId, params],
    queryFn: () => NoteService.list(workspaceId, params),
    placeholderData: (previousData) => previousData,
    enabled: !!workspaceId,
  });
}
