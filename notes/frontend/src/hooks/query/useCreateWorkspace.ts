import { useMutation, useQueryClient } from '@tanstack/react-query'
import { WorkspaceService } from '@/services/api/workspaceService'
import { useNavigate } from 'react-router-dom'

export function useCreateWorkspace() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: WorkspaceService.create,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspaces'] })
      navigate(`/workspaces`)
    },
  })
}
