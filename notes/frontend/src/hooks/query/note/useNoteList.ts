// import { NoteService } from "@/services/api/noteService";
// import { useQuery } from "@tanstack/react-query";

// export function useNoteList(workspaceId: number) {
//     return useQuery({
//         queryKey: ['notes'],
//         queryFn: () => NoteService.list(workspaceId),
//         enabled: !!workspaceId,
//     });
// }