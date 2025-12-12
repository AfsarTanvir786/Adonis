import { NoteService } from "@/services/api/noteService";
import { useQuery } from "@tanstack/react-query";

export function useNoteList(workspaceId: number) {
    return useQuery({
        queryKey: ['Notes'],
        queryFn: () => NoteService.list(workspaceId),
    });
}