import { NoteService } from '@/services/api/noteService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useNoteVote(noteId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vote: 'up' | 'down') =>
      NoteService.createNoteVote(noteId, vote),

    onMutate: async (vote) => {
      await queryClient.cancelQueries({ queryKey: ['notes'] });

      const previousNotes = queryClient.getQueriesData({
        queryKey: ['notes'],
      });

      queryClient.setQueriesData({ queryKey: ['notes'] }, (old: any) => {
        if (!old?.data) return old;

        return {
          ...old,
          data: old.data.map((note: any) => {
            if (note.id !== noteId) return note;

            return {
              ...note,
              count: vote === 'up' ? note.count + 1 : note.count - 1,
              userVote: vote,
            };
          }),
        };
      });

      return { previousNotes };
    },

    onError: (_err, _vote, context) => {
      context?.previousNotes?.forEach(([key, data]) => {
        queryClient.setQueryData(key, data);
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
}
