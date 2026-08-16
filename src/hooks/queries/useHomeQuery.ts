import { useQuery } from '@tanstack/react-query';
import { getHomeData } from '@/apis/home';
import { CACHE_TIME } from '@/constants/cache-time';

export const HOME_QUERY_KEY = ['home'] as const;

export function useHomeQuery() {
  return useQuery({
    queryKey: HOME_QUERY_KEY,
    queryFn: getHomeData,
    staleTime: CACHE_TIME.THIRTY_SECONDS,
    gcTime: CACHE_TIME.TEN_MINUTES,
  });
}
