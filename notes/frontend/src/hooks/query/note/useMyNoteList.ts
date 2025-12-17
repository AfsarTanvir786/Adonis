import { NoteService } from "@/services/api/noteService";
import { useQuery } from "@tanstack/react-query";

export function useMyNoteList(userId: number) {
    return useQuery({
        queryKey: ['myNotes'],
        queryFn: () => NoteService.myNoteListResponse(),
        enabled: !!userId,
    });
}