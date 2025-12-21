import { useQuery } from '@tanstack/react-query';
import { NoteService } from '@/services/api/noteService';
import type { Pagination } from '@/types/type';

export function useMyNoteList(
  userId: number,
  params: Partial<Pagination>,
  type: 'all' | 'private' | 'public' = 'all'
) {
  return useQuery({
    queryKey: ['myNoteList', userId, params, type],
    queryFn: () => NoteService.myNotes(params, type),
    placeholderData: (previousData) => previousData,
    enabled: !!userId,
  });
}
