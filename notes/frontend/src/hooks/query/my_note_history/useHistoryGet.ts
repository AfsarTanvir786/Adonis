import { historyService } from '@/services/api/historyService';
import { useQuery } from '@tanstack/react-query';

export function useHistoryGet(historyId: number, userId: number) {
  return useQuery({
    queryKey: ['historys'],
    // queryFn: historyService.getHistory,
    enabled: !!historyId,
  });
}
