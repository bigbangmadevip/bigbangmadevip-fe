import { api } from '@/lib/api';
import type {
  CheeringCalendarResponse,
  CheeringRecordsResponse,
  MyPageResponse,
} from '@/types/mypage';

type MyPageApiResponse<T> = {
  data: T;
  success?: boolean;
};

export async function getMyPage(): Promise<MyPageResponse> {
  const response = await api.get<MyPageApiResponse<MyPageResponse>>(
    '/api/v1/mypage',
  );

  return response.data.data;
}

export async function getCheeringCalendar(
  yearMonth: string,
): Promise<CheeringCalendarResponse> {
  const response = await api.get<
    MyPageApiResponse<CheeringCalendarResponse>
  >(`/api/v1/mypage/cheering-calendar/${yearMonth}`);

  return response.data.data;
}

export async function getCheeringRecords(
  date: string,
): Promise<CheeringRecordsResponse> {
  const response = await api.get<MyPageApiResponse<CheeringRecordsResponse>>(
    `/api/v1/mypage/cheering-records/${date}`,
  );

  return response.data.data;
}
