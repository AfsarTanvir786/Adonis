import { orderItemService } from '@/services/api/orderItemService';
import { useQuery } from '@tanstack/react-query';

export function useOrderItems() {
    return useQuery({
        queryKey: ['orderItems'],
        queryFn: () => orderItemService.list(),
    });
}
