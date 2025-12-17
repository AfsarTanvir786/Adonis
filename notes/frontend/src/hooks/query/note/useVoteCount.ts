import { NoteService } from "@/services/api/noteService";
import { useQuery } from "@tanstack/react-query";

export function useVoteCount(noteId: number) {
  return useQuery({
    queryKey: ['voteCount', noteId],
    queryFn: () => NoteService.getVoteCount(noteId),
    enabled: !!noteId,
    staleTime: 1000 * 10,
  })
}
