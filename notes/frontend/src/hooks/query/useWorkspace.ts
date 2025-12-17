import { WorkspaceService } from "@/services/api/workspaceService";
import { useQuery } from "@tanstack/react-query";

export function useWorkspace(workspaceId: number) {
    return useQuery({
        queryKey: ['workspace', workspaceId],
        queryFn: () => WorkspaceService.get(workspaceId),
        enabled: !!workspaceId,
        staleTime: 60 * 60 * 1000 * 60,
    });
}