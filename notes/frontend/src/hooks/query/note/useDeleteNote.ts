import { useMutation, useQueryClient } from '@tanstack/react-query';
import { NoteService } from '@/services/api/noteService';

export function useDeleteNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (noteId: number) => NoteService.delete(noteId),
    onSuccess: () => {
      // Refresh note lists
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      queryClient.invalidateQueries({ queryKey: ['myNotes'] });
    },
  });
}
