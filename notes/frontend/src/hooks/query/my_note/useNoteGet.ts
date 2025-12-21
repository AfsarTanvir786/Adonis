import { NoteService } from '@/services/api/noteService';
import { useQuery } from '@tanstack/react-query';

export function useNoteGet(noteId: number, userId: number) {
  return useQuery({
    queryKey: ['myNote', noteId, userId],
    queryFn: () => NoteService.get(noteId),
    enabled: !!noteId,
  });
}
