import { api } from '@/lib/api';
import type {
  ScheduleDayResponse,
  ScheduleMonthResponse,
  ScheduleRequestOptions,
  ScheduleResponse,
} from '@/types/schedule';

type ScheduleApiResponse<T> = {
  data: T;
  success?: boolean;
};

export async function getSchedule(
  options: ScheduleRequestOptions,
): Promise<ScheduleResponse> {
  const response = await api.get<ScheduleApiResponse<ScheduleResponse>>(
    '/api/v1/schedule',
    { params: options },
  );

  return response.data.data;
}

export async function getScheduleMonth(
  yearMonth: string,
  options: ScheduleRequestOptions,
): Promise<ScheduleMonthResponse> {
  const response = await api.get<ScheduleApiResponse<ScheduleMonthResponse>>(
    `/api/v1/schedule/months/${yearMonth}`,
    { params: options },
  );

  return response.data.data;
}

export async function getScheduleDay(
  date: string,
  options: ScheduleRequestOptions,
): Promise<ScheduleDayResponse> {
  const response = await api.get<ScheduleApiResponse<ScheduleDayResponse>>(
    `/api/v1/schedule/days/${date}`,
    { params: options },
  );

  return response.data.data;
}
