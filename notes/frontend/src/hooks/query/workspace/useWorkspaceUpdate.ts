import { WorkspaceService } from '@/services/api/workspaceService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export function useWorkspaceUpdate(workspaceId: number) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: { name: string; description?: string }) =>
      WorkspaceService.update(data, workspaceId),

    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ['workspace', workspaceId] });

      const previous = queryClient.getQueryData(['workspace', workspaceId]);

      queryClient.setQueryData(['workspace', workspaceId], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          data: {
            ...old.data,
            ...newData,
          },
        };
      });

      return { previous };
    },

    onError: (_err, _data, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['workspace', workspaceId], context.previous);
      }
    },

    onSuccess: () => {
      navigate(`/workspaces/details/${workspaceId}`);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['workspace', workspaceId] });
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
    },
  });
}
