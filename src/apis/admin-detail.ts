import { api } from '@/lib/api';
import type {
  AdminMusicDetail,
  AdminMusicDetailPayload,
  AdminVoteDetail,
  AdminVoteDetailPayload,
} from '@/types/admin-detail';
import type {
  MusicStreamingOsGroup,
  MusicStreamingPlatform,
} from '@/types/music';

type ApiResponse<T> = {
  data: T;
  success?: boolean;
};

export async function uploadAdminImage(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post<ApiResponse<{ url: string }>>(
    '/api/v1/admin/images',
    formData,
  );
  return response.data.data.url;
}

export type AdminMusicStreamingImage = {
  id: number;
  imageUrl: string;
  active: boolean;
  sortOrder: number;
  createdAt?: string;
  updatedAt?: string;
};

export async function createAdminMusicStreamingImage(payload: {
  imageUrl: string;
  active: boolean;
  sortOrder: number;
}) {
  const response = await api.post<ApiResponse<AdminMusicStreamingImage>>(
    '/api/v1/admin/music/streaming-images',
    payload,
  );
  return response.data.data;
}

export async function getAdminMusicStreamingLinks() {
  const response = await api.get<ApiResponse<MusicStreamingPlatform[]>>(
    '/api/v1/admin/music/streaming-links',
  );

  return response.data.data;
}

export async function updateAdminMusicStreamingLinks(
  platformId: number,
  payload: { osGroups: MusicStreamingOsGroup[] },
) {
  const response = await api.put<ApiResponse<MusicStreamingPlatform>>(
    `/api/v1/admin/music/streaming-links/platforms/${platformId}`,
    payload,
  );

  return response.data.data;
}

export async function getAdminMusicDetails() {
  const response = await api.get<ApiResponse<AdminMusicDetail[]>>(
    '/api/v1/admin/music/details',
  );
  return response.data.data;
}

export async function getAdminMusicDetail(id: string) {
  const response = await api.get<ApiResponse<AdminMusicDetail>>(
    `/api/v1/admin/music/details/${id}`,
  );
  return response.data.data;
}

export async function createAdminMusicDetail(
  payload: AdminMusicDetailPayload,
) {
  const response = await api.post<ApiResponse<AdminMusicDetail>>(
    '/api/v1/admin/music/details',
    payload,
  );
  return response.data.data;
}

export async function updateAdminMusicDetail(
  id: string,
  payload: AdminMusicDetailPayload,
) {
  const response = await api.put<ApiResponse<AdminMusicDetail>>(
    `/api/v1/admin/music/details/${id}`,
    payload,
  );
  return response.data.data;
}

export async function getAdminVoteDetails() {
  const response = await api.get<ApiResponse<AdminVoteDetail[]>>(
    '/api/v1/admin/vote/details',
  );
  return response.data.data;
}

export async function getAdminVoteDetail(id: string) {
  const response = await api.get<ApiResponse<AdminVoteDetail>>(
    `/api/v1/admin/vote/details/${id}`,
  );
  return response.data.data;
}

export async function createAdminVoteDetail(payload: AdminVoteDetailPayload) {
  const response = await api.post<ApiResponse<AdminVoteDetail>>(
    '/api/v1/admin/vote/details',
    payload,
  );
  return response.data.data;
}

export async function updateAdminVoteDetail(
  id: string,
  payload: AdminVoteDetailPayload,
) {
  const response = await api.put<ApiResponse<AdminVoteDetail>>(
    `/api/v1/admin/vote/details/${id}`,
    payload,
  );
  return response.data.data;
}
