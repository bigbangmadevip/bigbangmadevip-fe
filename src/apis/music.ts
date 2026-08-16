import { api } from '@/lib/api';
import type {
  MusicDetailResponse,
  MusicNoticeDetail,
  MusicNoticeListItem,
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

export async function getMusicNotices(): Promise<MusicNoticeListItem[]> {
  const response = await api.get<MusicApiResponse<MusicNoticeListItem[]>>(
    '/api/v1/music/notices',
  );

  return response.data.data;
}

export async function getMusicNoticeDetail(
  noticeId: string,
): Promise<MusicNoticeDetail> {
  const response = await api.get<MusicApiResponse<MusicNoticeDetail>>(
    `/api/v1/music/notices/${noticeId}`,
  );

  return response.data.data;
}
