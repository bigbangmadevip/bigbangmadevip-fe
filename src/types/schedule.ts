import type { MenuType } from '@/types/home';

export type ScheduleCategory = 'ALL' | 'MUSIC' | 'VOTE';
export type VoteDisplay = 'EVERY_DAY' | 'DEADLINE_ONLY';

export type ScheduleMonthDay = {
  date: string;
  musicCount: number;
  voteCount: number;
};

export type ScheduleMonthResponse = {
  days: ScheduleMonthDay[];
};

export type ScheduleDayItem = {
  menuType: MenuType;
  detailId: number;
  title: string;
  time: string;
  platformNames: string[];
};

export type ScheduleDayResponse = {
  date: string;
  items: ScheduleDayItem[];
};

export type ScheduleResponse = {
  month: ScheduleMonthResponse;
  day: ScheduleDayResponse;
};

export type ScheduleRequestOptions = {
  category: ScheduleCategory;
  voteDisplay: VoteDisplay;
};
