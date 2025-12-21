import { historyService } from '@/services/api/historyService';
import { useQuery } from '@tanstack/react-query';

export function useHistoryList(noteId: number) {
  return useQuery({
    queryKey: ['historys'],
    queryFn: () => historyService.getHistory(noteId),
    enabled: !!noteId,
  });
}
