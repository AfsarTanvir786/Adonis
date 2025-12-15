import { NoteService } from "@/services/api/noteService";
import { useQuery } from "@tanstack/react-query";

export function useMyNoteList() {
    return useQuery({
        queryKey: ['myNotes'],
        queryFn: () => NoteService.myNoteListResponse(),
    });
}