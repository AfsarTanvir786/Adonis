import { NoteService } from "@/services/api/noteService";
import { useQuery } from "@tanstack/react-query";

export function useVote(noteId: number) {
  return useQuery({
    queryKey: ['vote', noteId],
    queryFn: () => NoteService.getVote(noteId),
    enabled: !!noteId,
    staleTime: 1000 * 30,
  })
}
