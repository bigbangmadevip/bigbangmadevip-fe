import { useQuery } from '@tanstack/react-query';
import {
  getVoteDetail,
  getVoteNoticeDetail,
  getVoteNotices,
  getVoteToday,
} from '@/apis/vote';
import { CACHE_TIME } from '@/constants/cache-time';

export const VOTE_QUERY_KEYS = {
  all: ['vote'] as const,
  today: () => [...VOTE_QUERY_KEYS.all, 'today'] as const,
  detail: (detailId: string) =>
    [...VOTE_QUERY_KEYS.all, 'detail', detailId] as const,
  notices: () => [...VOTE_QUERY_KEYS.all, 'notices'] as const,
  noticeDetail: (noticeId: string) =>
    [...VOTE_QUERY_KEYS.notices(), noticeId] as const,
};

export function useVoteTodayQuery() {
  return useQuery({
    queryKey: VOTE_QUERY_KEYS.today(),
    queryFn: getVoteToday,
    staleTime: CACHE_TIME.THIRTY_SECONDS,
    gcTime: CACHE_TIME.TEN_MINUTES,
  });
}

export function useVoteDetailQuery(detailId: string, enabled = true) {
  return useQuery({
    queryKey: VOTE_QUERY_KEYS.detail(detailId),
    queryFn: () => getVoteDetail(detailId),
    enabled: enabled && detailId.length > 0,
    staleTime: CACHE_TIME.ONE_MINUTE,
    gcTime: CACHE_TIME.TEN_MINUTES,
  });
}

export function useVoteNoticesQuery() {
  return useQuery({
    queryKey: VOTE_QUERY_KEYS.notices(),
    queryFn: getVoteNotices,
    staleTime: CACHE_TIME.FIVE_MINUTES,
    gcTime: CACHE_TIME.THIRTY_MINUTES,
  });
}

export function useVoteNoticeDetailQuery(
  noticeId: string,
  enabled = true,
) {
  return useQuery({
    queryKey: VOTE_QUERY_KEYS.noticeDetail(noticeId),
    queryFn: () => getVoteNoticeDetail(noticeId),
    enabled: enabled && noticeId.length > 0,
    staleTime: CACHE_TIME.THIRTY_MINUTES,
    gcTime: CACHE_TIME.ONE_HOUR,
    refetchOnWindowFocus: false,
  });
}
