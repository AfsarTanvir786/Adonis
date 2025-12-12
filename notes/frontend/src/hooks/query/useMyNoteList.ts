import { NoteService } from "@/services/api/noteService";
import { useQuery } from "@tanstack/react-query";

export function useMyNoteList() {
    return useQuery({
        queryKey: ['MyNote'],
        queryFn: () => NoteService.myNoteList(),
    });
}