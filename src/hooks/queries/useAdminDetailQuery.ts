import { useQuery } from '@tanstack/react-query';
import {
  getAdminMusicDetail,
  getAdminMusicDetails,
  getAdminVoteDetail,
  getAdminVoteDetails,
} from '@/apis/admin-detail';

export const ADMIN_DETAIL_QUERY_KEYS = {
  all: ['admin-details'] as const,
  music: () => [...ADMIN_DETAIL_QUERY_KEYS.all, 'music'] as const,
  musicDetail: (id: string) =>
    [...ADMIN_DETAIL_QUERY_KEYS.music(), id] as const,
  vote: () => [...ADMIN_DETAIL_QUERY_KEYS.all, 'vote'] as const,
  voteDetail: (id: string) =>
    [...ADMIN_DETAIL_QUERY_KEYS.vote(), id] as const,
};

export function useAdminMusicDetailsQuery(enabled = true) {
  return useQuery({
    queryKey: ADMIN_DETAIL_QUERY_KEYS.music(),
    queryFn: getAdminMusicDetails,
    enabled,
  });
}

export function useAdminMusicDetailQuery(id: string, enabled = true) {
  return useQuery({
    queryKey: ADMIN_DETAIL_QUERY_KEYS.musicDetail(id),
    queryFn: () => getAdminMusicDetail(id),
    enabled: enabled && id.length > 0,
  });
}

export function useAdminVoteDetailsQuery(enabled = true) {
  return useQuery({
    queryKey: ADMIN_DETAIL_QUERY_KEYS.vote(),
    queryFn: getAdminVoteDetails,
    enabled,
  });
}

export function useAdminVoteDetailQuery(id: string, enabled = true) {
  return useQuery({
    queryKey: ADMIN_DETAIL_QUERY_KEYS.voteDetail(id),
    queryFn: () => getAdminVoteDetail(id),
    enabled: enabled && id.length > 0,
  });
}
