import { productService } from "@/services/api/productService";
import { useQuery } from "@tanstack/react-query";

export function useProducts() {
    return useQuery({
        queryKey: ['products'],
        queryFn: () => productService.list(),
    })
}