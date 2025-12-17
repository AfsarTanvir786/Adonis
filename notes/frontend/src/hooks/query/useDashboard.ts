import { dashboardService } from "@/services/api/dashboardService";
import { useQuery } from "@tanstack/react-query";

export function useDashboardList(userId: number) {
    return useQuery({
        queryKey: ['dashboard'],
        queryFn: () => dashboardService.dashboard(),
        enabled: !!userId,
    });
}