import { NoteService } from "@/services/api/noteService";
import { useQuery } from "@tanstack/react-query";

export function useHistoryList(noteId: number) {
    return useQuery({
        queryKey: ['historys'],
        queryFn: () => NoteService.getHistory(noteId),
    });
}