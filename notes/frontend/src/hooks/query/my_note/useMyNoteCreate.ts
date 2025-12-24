import { myNoteService } from '@/services/api/myNoteService';
import { Toast } from '@/utils/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export function useMyNoteCreate(userId: number) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: myNoteService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myNoteList', userId] });
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      Toast.success('Note successfully created 🎉');
      navigate(`/notes`);
    },
  });
}
