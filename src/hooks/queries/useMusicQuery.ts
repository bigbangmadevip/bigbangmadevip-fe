import { useQuery } from '@tanstack/react-query';
import { getMusicDetail, getMusicStreaming } from '@/apis/music';

export const MUSIC_QUERY_KEYS = {
  all: ['music'] as const,
  streaming: () => [...MUSIC_QUERY_KEYS.all, 'streaming'] as const,
  detail: (detailId: string) =>
    [...MUSIC_QUERY_KEYS.all, 'detail', detailId] as const,
};

export function useMusicStreamingQuery(enabled = true) {
  return useQuery({
    queryKey: MUSIC_QUERY_KEYS.streaming(),
    queryFn: getMusicStreaming,
    enabled,
  });
}

export function useMusicDetailQuery(detailId: string, enabled = true) {
  return useQuery({
    queryKey: MUSIC_QUERY_KEYS.detail(detailId),
    queryFn: () => getMusicDetail(detailId),
    enabled: enabled && detailId.length > 0,
  });
}
