import { companyService } from "@/services/api/companyService";
import { useQuery } from "@tanstack/react-query";

export function useCompany(companyId: number) {
    return useQuery({
        queryKey: ['companyDetails'],
        queryFn: () => companyService.getCompanyDetails(companyId),
        enabled: !!companyId,
    });
}