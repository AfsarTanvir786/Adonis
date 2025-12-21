import { useMutation, useQueryClient } from '@tanstack/react-query';
import { NoteService } from '@/services/api/noteService';

export function useDeleteNote(userId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (noteId: number) => NoteService.delete(noteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myNoteList', userId] });
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
}
