import { useQuery } from '@tanstack/react-query'
import { NoteService } from '@/services/api/noteService'

type Params = {
  page: number
  pageSize: number
  sortBy: 'title' | 'createdAt'
  order: 'asc' | 'desc'
}

export function useNotePagination(workspaceId: number, params: Params) {
  return useQuery({
    queryKey: ['notes', params],
    queryFn: () => NoteService.sortList(workspaceId, params),
    placeholderData: (previousData) => previousData,
  });
}
