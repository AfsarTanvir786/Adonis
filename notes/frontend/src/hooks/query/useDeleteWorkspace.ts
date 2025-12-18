import { useMutation, useQueryClient } from '@tanstack/react-query'
import { WorkspaceService } from '@/services/api/workspaceService'
import { useNavigate } from 'react-router-dom'

export function useDeleteWorkspace() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (workspaceId: number) =>
      WorkspaceService.delete(workspaceId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspaces'] })
      navigate('/workspaces')
    },
  })
}
