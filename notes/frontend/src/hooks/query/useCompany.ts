import { companyService } from "@/services/api/companyService";
import { useQuery } from "@tanstack/react-query";

export function useCompany(companyId: number) {
    return useQuery({
        queryKey: ['customerList'],
        queryFn: () => companyService.getCompanyDetails(companyId),
    });
}