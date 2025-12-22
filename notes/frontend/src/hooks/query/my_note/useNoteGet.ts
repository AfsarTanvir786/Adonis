import { myNoteService } from '@/services/api/myNoteService';
import { useQuery } from '@tanstack/react-query';

export function useNoteGet(noteId: number, userId: number) {
  return useQuery({
    queryKey: ['myNote', noteId, userId],
    queryFn: () => myNoteService.get(noteId),
    enabled: !!noteId,
  });
}
