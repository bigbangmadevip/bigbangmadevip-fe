import { useQuery } from '@tanstack/react-query';
import {
  getSchedule,
  getScheduleDay,
  getScheduleMonth,
} from '@/apis/schedule';
import type { ScheduleRequestOptions } from '@/types/schedule';
import { CACHE_TIME } from '@/constants/cache-time';

export const SCHEDULE_QUERY_KEYS = {
  all: ['schedule'] as const,
  initial: () => [...SCHEDULE_QUERY_KEYS.all, 'initial'] as const,
  month: (yearMonth: string, options: ScheduleRequestOptions) =>
    [
      ...SCHEDULE_QUERY_KEYS.all,
      'month',
      yearMonth,
      options.category,
      options.voteDisplay,
    ] as const,
  day: (date: string, options: ScheduleRequestOptions) =>
    [
      ...SCHEDULE_QUERY_KEYS.all,
      'day',
      date,
      options.category,
      options.voteDisplay,
    ] as const,
};

export function useInitialScheduleQuery() {
  return useQuery({
    queryKey: SCHEDULE_QUERY_KEYS.initial(),
    queryFn: () =>
      getSchedule({ category: 'ALL', voteDisplay: 'EVERY_DAY' }),
    staleTime: CACHE_TIME.ONE_MINUTE,
    gcTime: CACHE_TIME.TEN_MINUTES,
  });
}

export function useScheduleMonthQuery(
  yearMonth: string,
  options: ScheduleRequestOptions,
  enabled = true,
) {
  return useQuery({
    queryKey: SCHEDULE_QUERY_KEYS.month(yearMonth, options),
    queryFn: () => getScheduleMonth(yearMonth, options),
    enabled: enabled && yearMonth.length > 0,
    staleTime: CACHE_TIME.FIVE_MINUTES,
    gcTime: CACHE_TIME.THIRTY_MINUTES,
  });
}

export function useScheduleDayQuery(
  date: string,
  options: ScheduleRequestOptions,
  enabled = true,
) {
  return useQuery({
    queryKey: SCHEDULE_QUERY_KEYS.day(date, options),
    queryFn: () => getScheduleDay(date, options),
    enabled: enabled && date.length > 0,
    staleTime: CACHE_TIME.ONE_MINUTE,
    gcTime: CACHE_TIME.TEN_MINUTES,
  });
}
