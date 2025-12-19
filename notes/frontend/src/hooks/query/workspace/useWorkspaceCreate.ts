import { useMutation, useQueryClient } from '@tanstack/react-query'
import { workspaceService } from '@/services/api/workspaceService'
import { useNavigate } from 'react-router-dom'

export function useWorkspaceCreate() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: workspaceService.create,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
      navigate(`/workspaces`);
    },
  });
}
