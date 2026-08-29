import { useQuery } from '@tanstack/react-query';
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
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
}
