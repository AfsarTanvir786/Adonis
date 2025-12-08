import { CustomerService } from "@/services/api/customerService";
import { useQuery } from "@tanstack/react-query";

export function useCustomers() {
    return useQuery({
        queryKey: ['customerList'],
        queryFn: () => CustomerService.list(),
    });
}