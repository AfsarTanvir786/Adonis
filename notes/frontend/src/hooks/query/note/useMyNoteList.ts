import { useQuery } from '@tanstack/react-query'
import { NoteService } from '@/services/api/noteService'

type Params = {
  userId: number
  page: number
  pageSize: number
  type: 'all' | 'public' | 'private'
}

export function useMyNoteList(params: Params) {
  return useQuery({
    queryKey: ['my-notes', params],
    queryFn: () => NoteService.myNotes(params),
    placeholderData: (previousData) => previousData,
    enabled: !!params.userId,
  });
}
