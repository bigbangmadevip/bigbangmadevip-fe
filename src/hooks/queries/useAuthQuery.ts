import { useQuery } from '@tanstack/react-query';
import { CACHE_TIME } from '@/constants/cache-time';
import { getCurrentUser } from '@/lib/auth';

export const AUTH_QUERY_KEYS = {
  all: ['auth'] as const,
  currentUser: () => [...AUTH_QUERY_KEYS.all, 'current-user'] as const,
};

export function useCurrentUserQuery(enabled = true) {
  return useQuery({
    queryKey: AUTH_QUERY_KEYS.currentUser(),
    queryFn: ({ signal }) => getCurrentUser(signal),
    enabled,
    staleTime: CACHE_TIME.FIVE_MINUTES,
    gcTime: CACHE_TIME.THIRTY_MINUTES,
    retry: false,
  });
}
