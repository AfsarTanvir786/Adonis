import { useMutation, useQueryClient } from '@tanstack/react-query';
import { myNoteService } from '@/services/api/myNoteService';
import { Toast } from '@/utils/toast';

export function useDeleteNote(userId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (noteId: number) => myNoteService.delete(noteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myNoteList', userId] });
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      Toast.success('Note successfully delete 🎉');
    },
  });
}
