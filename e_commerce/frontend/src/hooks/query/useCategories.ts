import { CategoryService } from "@/services/api/categoryService";
import { useQuery } from "@tanstack/react-query";

export function useCategories() {
    return useQuery({
        queryKey: ['categories'],
        queryFn: () => CategoryService.list(),
        retry: 1,
        retryDelay: 2000,
    });
}