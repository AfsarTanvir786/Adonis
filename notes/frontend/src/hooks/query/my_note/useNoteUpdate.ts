import { myNoteService } from '@/services/api/myNoteService';
import type { Note } from '@/types/type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export function useNoteUpdate(
  noteId: number,
  userId: number,
  data: Partial<Note>
) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => myNoteService.update(noteId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myNoteList', userId] });
      queryClient.invalidateQueries({ queryKey: ['myNote', noteId] });
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      navigate(`/notes/details/${noteId}`);
    },
  });
}
