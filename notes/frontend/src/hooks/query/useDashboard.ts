import { dashboardService } from "@/services/api/dashboardService";
import { useQuery } from "@tanstack/react-query";

export function useDashboardList() {
    return useQuery({
        queryKey: ['dashboard'],
        queryFn: () => dashboardService.dashboard(),
    });
}