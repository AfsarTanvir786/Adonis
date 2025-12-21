import { useMutation, useQueryClient } from '@tanstack/react-query';
import { myNoteService } from '@/services/api/myNoteService';

export function useDeleteNote(userId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (noteId: number) => myNoteService.delete(noteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myNoteList', userId] });
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
}
