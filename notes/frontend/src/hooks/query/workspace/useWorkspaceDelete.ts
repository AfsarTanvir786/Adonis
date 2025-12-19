import { useMutation, useQueryClient } from '@tanstack/react-query'
import { workspaceService } from '@/services/api/workspaceService'
import { useNavigate } from 'react-router-dom'

export function useWorkspaceDelete() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (workspaceId: number) =>
      workspaceService.delete(workspaceId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspaces'] })
      navigate('/workspaces')
    },
  })
}
