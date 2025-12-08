import { orderService } from '@/services/api/orderService';
import { useQuery } from '@tanstack/react-query';

export function useOrders() {
    return useQuery({
        queryKey: ['orders'],
        queryFn: () => orderService.list(),
    });
}
