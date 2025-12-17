import { WorkspaceService } from "@/services/api/workspaceService";
import { useQuery } from "@tanstack/react-query";

export function useWorkspaceList(companyId: number) {
    return useQuery({
        queryKey: ['workspaces'],
        queryFn: () => WorkspaceService.list(),
        enabled: !!companyId,
        staleTime: 5 * 60 * 1000, // refresh after 5 minutes 
        gcTime: 60 * 60 * 1000, // clear cache after 1 hours
    });
}