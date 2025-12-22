import { useMutation, useQueryClient } from '@tanstack/react-query';
import { NoteService } from '@/services/api/noteService';

export function useNoteVoteDelete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (noteId: number) => NoteService.deleteNoteVote(noteId),
    onSuccess: () => {
      // Refresh note lists
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
}
