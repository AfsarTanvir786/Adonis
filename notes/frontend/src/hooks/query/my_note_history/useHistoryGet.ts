import { historyService } from '@/services/api/historyService';
import { useQuery } from '@tanstack/react-query';

export function useHistoryGet(historyId: number) {
  return useQuery({
    queryKey: ['history', historyId],
    queryFn: () => historyService.getHistory(historyId),
    enabled: !!historyId,
  });
}
