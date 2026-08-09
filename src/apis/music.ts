import { api } from '@/lib/api';
import type {
  MusicDetailResponse,
  MusicStreamingResponse,
} from '@/types/music';

type MusicApiResponse<T> = {
  data: T;
  success: boolean;
};

export async function getMusicStreaming(): Promise<MusicStreamingResponse> {
  const response = await api.get<MusicApiResponse<MusicStreamingResponse>>(
    '/api/v1/music/streaming',
  );

  return response.data.data;
}

export async function getMusicDetail(
  detailId: string,
): Promise<MusicDetailResponse> {
  const response = await api.get<MusicApiResponse<MusicDetailResponse>>(
    `/api/v1/music/detail/${detailId}`,
  );

  return response.data.data;
}
