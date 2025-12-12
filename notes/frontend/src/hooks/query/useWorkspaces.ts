import { WorkspaceService } from "@/services/api/workspaceService";
import { useQuery } from "@tanstack/react-query";

export function useWorkspaceList() {
    return useQuery({
        queryKey: ['workspaces'],
        queryFn: () => WorkspaceService.list(),
    });
}