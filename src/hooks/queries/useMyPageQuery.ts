import { useQuery } from '@tanstack/react-query';
import {
  getCheeringCalendar,
  getCheeringRecords,
  getMyPage,
} from '@/apis/mypage';
import { CACHE_TIME } from '@/constants/cache-time';

export const MY_PAGE_QUERY_KEYS = {
  all: ['mypage'] as const,
  summary: () => [...MY_PAGE_QUERY_KEYS.all, 'summary'] as const,
  calendar: (yearMonth: string) =>
    [...MY_PAGE_QUERY_KEYS.all, 'calendar', yearMonth] as const,
  records: (date: string) =>
    [...MY_PAGE_QUERY_KEYS.all, 'records', date] as const,
};

export function useMyPageQuery() {
  return useQuery({
    queryKey: MY_PAGE_QUERY_KEYS.summary(),
    queryFn: getMyPage,
    staleTime: CACHE_TIME.THIRTY_SECONDS,
    gcTime: CACHE_TIME.TEN_MINUTES,
  });
}

export function useCheeringCalendarQuery(yearMonth: string) {
  return useQuery({
    queryKey: MY_PAGE_QUERY_KEYS.calendar(yearMonth),
    queryFn: () => getCheeringCalendar(yearMonth),
    enabled: yearMonth.length > 0,
    staleTime: CACHE_TIME.ONE_MINUTE,
    gcTime: CACHE_TIME.TEN_MINUTES,
  });
}

export function useCheeringRecordsQuery(date: string, enabled = true) {
  return useQuery({
    queryKey: MY_PAGE_QUERY_KEYS.records(date),
    queryFn: () => getCheeringRecords(date),
    enabled: enabled && date.length > 0,
    staleTime: CACHE_TIME.FIVE_MINUTES,
    gcTime: CACHE_TIME.THIRTY_MINUTES,
    refetchOnWindowFocus: false,
  });
}
