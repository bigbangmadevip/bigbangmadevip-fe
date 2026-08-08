import { useQuery } from '@tanstack/react-query';
import { getHomeData } from '@/apis/home';

export const HOME_QUERY_KEY = ['home'] as const;

export function useHomeQuery() {
  return useQuery({
    queryKey: HOME_QUERY_KEY,
    queryFn: getHomeData,
  });
}
