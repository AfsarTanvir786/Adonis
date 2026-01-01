import { planSection } from '@/services/planSection';
import { useQuery } from '@tanstack/react-query';

export function usePlan() {
  return useQuery({
    queryKey: ['PLANS'],
    queryFn: () => planSection.get(),
  });
}
