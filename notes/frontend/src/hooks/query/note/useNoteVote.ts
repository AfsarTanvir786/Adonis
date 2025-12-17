import { NoteService } from '@/services/api/noteService'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useNoteVote(noteId: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (vote: 'up' | 'down') =>
      NoteService.createNoteVote(noteId, vote),

    onMutate: async (vote) => {
      await queryClient.cancelQueries({ queryKey: ['voteCount', noteId] })

      const previous = queryClient.getQueryData<any>(['voteCount', noteId])

      queryClient.setQueryData(['voteCount', noteId], (old: any) => {
        if (!old) return old

        return {
          ...old,
          data: {
            ...old.data,
            upVoteCount:
              vote === 'up'
                ? old.data.upVoteCount + 1
                : old.data.upVoteCount,
            downVoteCount:
              vote === 'down'
                ? old.data.downVoteCount + 1
                : old.data.downVoteCount,
          },
        }
      })

      return { previous }
    },

    onError: (_err, _vote, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['voteCount', noteId], context.previous)
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['voteCount', noteId] })
      queryClient.invalidateQueries({ queryKey: ['vote', noteId] })
    },
  })
}
