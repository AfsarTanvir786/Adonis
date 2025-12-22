import { useQuery } from '@tanstack/react-query';
import type { Pagination } from '@/types/type';
import { myNoteService } from '@/services/api/myNoteService';

export function useMyNoteList(
  userId: number,
  params: Partial<Pagination>,
  type: 'all' | 'private' | 'public' = 'all'
) {
  return useQuery({
    queryKey: ['myNoteList', userId, params, type],
    queryFn: () => myNoteService.myNotes(params, type),
    placeholderData: (previousData) => previousData,
    enabled: !!userId,
  });
}
