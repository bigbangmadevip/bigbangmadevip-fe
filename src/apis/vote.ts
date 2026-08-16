import { api } from '@/lib/api';
import type {
  VoteDetailResponse,
  VoteNoticeDetail,
  VoteNoticeListItem,
  VoteTodayResponse,
} from '@/types/vote';

type VoteApiResponse<T> = {
  data: T;
  success: boolean;
};

export async function getVoteDetail(
  detailId: string,
): Promise<VoteDetailResponse> {
  const response = await api.get<VoteApiResponse<VoteDetailResponse>>(
    `/api/v1/vote/detail/${detailId}`,
  );

  return response.data.data;
}

export async function getVoteToday(): Promise<VoteTodayResponse> {
  const response = await api.get<VoteApiResponse<VoteTodayResponse>>(
    '/api/v1/vote/today',
  );

  return response.data.data;
}

export async function getVoteNotices(): Promise<VoteNoticeListItem[]> {
  const response = await api.get<VoteApiResponse<VoteNoticeListItem[]>>(
    '/api/v1/vote/notices',
  );

  return response.data.data;
}

export async function getVoteNoticeDetail(
  noticeId: string,
): Promise<VoteNoticeDetail> {
  const response = await api.get<VoteApiResponse<VoteNoticeDetail>>(
    `/api/v1/vote/notices/${noticeId}`,
  );

  return response.data.data;
}
