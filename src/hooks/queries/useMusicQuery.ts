import { useQuery } from '@tanstack/react-query';
import {
  getMusicDetail,
  getMusicNoticeDetail,
  getMusicNotices,
  getMusicStreaming,
} from '@/apis/music';
import { CACHE_TIME } from '@/constants/cache-time';

export const MUSIC_QUERY_KEYS = {
  all: ['music'] as const,
  streaming: () => [...MUSIC_QUERY_KEYS.all, 'streaming'] as const,
  detail: (detailId: string) =>
    [...MUSIC_QUERY_KEYS.all, 'detail', detailId] as const,
  notices: () => [...MUSIC_QUERY_KEYS.all, 'notices'] as const,
  noticeDetail: (noticeId: string) =>
    [...MUSIC_QUERY_KEYS.notices(), noticeId] as const,
};

export function useMusicStreamingQuery(enabled = true) {
  return useQuery({
    queryKey: MUSIC_QUERY_KEYS.streaming(),
    queryFn: getMusicStreaming,
    enabled,
    staleTime: CACHE_TIME.FIVE_MINUTES,
    gcTime: CACHE_TIME.THIRTY_MINUTES,
  });
}

export function useMusicDetailQuery(detailId: string, enabled = true) {
  return useQuery({
    queryKey: MUSIC_QUERY_KEYS.detail(detailId),
    queryFn: () => getMusicDetail(detailId),
    enabled: enabled && detailId.length > 0,
    staleTime: CACHE_TIME.FIVE_MINUTES,
    gcTime: CACHE_TIME.THIRTY_MINUTES,
    refetchOnWindowFocus: false,
  });
}

export function useMusicNoticesQuery() {
  return useQuery({
    queryKey: MUSIC_QUERY_KEYS.notices(),
    queryFn: getMusicNotices,
    staleTime: CACHE_TIME.FIVE_MINUTES,
    gcTime: CACHE_TIME.THIRTY_MINUTES,
  });
}

export function useMusicNoticeDetailQuery(
  noticeId: string,
  enabled = true,
) {
  return useQuery({
    queryKey: MUSIC_QUERY_KEYS.noticeDetail(noticeId),
    queryFn: () => getMusicNoticeDetail(noticeId),
    enabled: enabled && noticeId.length > 0,
    staleTime: CACHE_TIME.THIRTY_MINUTES,
    gcTime: CACHE_TIME.ONE_HOUR,
    refetchOnWindowFocus: false,
  });
}
