'use client';

import { DayPicker, type DayButtonProps } from '@daypicker/react';
import { ko } from '@daypicker/react/locale';
import Image from 'next/image';
import { useState } from 'react';
import LoadingScreen from '@/components/common/LoadingScreen';
import NavigationListItem from '@/components/common/NavigationListItem';
import { getPlatformLabel } from '@/constants/platform';
import { getVotePlatformLabel } from '@/constants/vote-platform';
import {
  useInitialScheduleQuery,
  useScheduleDayQuery,
  useScheduleMonthQuery,
} from '@/hooks/queries/useScheduleQuery';
import { cn } from '@/lib/utils';
import type {
  ScheduleCategory as ApiScheduleCategory,
  ScheduleMonthDay,
  ScheduleRequestOptions,
} from '@/types/schedule';
import '@daypicker/react/style.css';

const FIRST_AVAILABLE_MONTH = new Date(2026, 7, 1);
const VOTE_DISPLAY = 'EVERY_DAY' as const;

type ScheduleCategory = 'all' | 'music' | 'vote';
type EventCategory = Exclude<ScheduleCategory, 'all'>;

const CATEGORY_TABS = [
  { id: 'all', label: '전체' },
  { id: 'music', label: '음원 총공' },
  { id: 'vote', label: '투표 총공' },
] as const;

const SPECIAL_DATE_ICONS: Record<string, string> = {
  '2026-08-19': '👑',
};

function getDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function getYearMonth(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');

  return `${year}-${month}`;
}

function getApiCategory(category: ScheduleCategory): ApiScheduleCategory {
  if (category === 'music') return 'MUSIC';
  if (category === 'vote') return 'VOTE';

  return 'ALL';
}

function formatScheduleTime(value: string) {
  const matched = value.match(/[T ](\d{2}):(\d{2})/);

  return matched ? `${matched[1]}:${matched[2]}` : '';
}

function formatSelectedDate(date: Date) {
  const weekdays = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ];

  return `${date.getMonth() + 1}월 ${date.getDate()}일 ${weekdays[date.getDay()]}`;
}

function getSchedulePlatformLabel(
  menuType: 'MUSIC' | 'VOTE',
  platformNames: string[],
) {
  const getLabel =
    menuType === 'MUSIC' ? getPlatformLabel : getVotePlatformLabel;

  return platformNames.map(getLabel).join(', ');
}

interface ScheduleDayButtonProps extends DayButtonProps {
  dayCounts: Map<string, ScheduleMonthDay>;
}

function ScheduleDayButton({
  day,
  modifiers,
  dayCounts,
  className,
  ...buttonProps
}: ScheduleDayButtonProps) {
  const counts = dayCounts.get(getDateKey(day.date));
  const musicCount = counts?.musicCount ?? 0;
  const voteCount = counts?.voteCount ?? 0;
  const visibleEvents: EventCategory[] = [
    ...Array.from({ length: Math.min(musicCount, 2) }, () => 'music' as const),
    ...Array.from({ length: Math.min(voteCount, 2) }, () => 'vote' as const),
  ];
  const hiddenEventCount = musicCount + voteCount - visibleEvents.length;
  const specialIcon = SPECIAL_DATE_ICONS[getDateKey(day.date)];

  return (
    <button
      {...buttonProps}
      className={`${className ?? ''} flex h-[64px] w-full flex-col items-center justify-start gap-[6px] pt-[4px] text-body-15 font-medium ${
        modifiers.past && !modifiers.selected
          ? 'text-secondary-300'
          : 'text-secondary-1'
      }`}
    >
      <span
        className={cn(
          'relative flex h-[28px] w-[28px] items-center justify-center rounded-full border border-transparent',
          modifiers.today && !modifiers.selected && 'bg-secondary-700',
          modifiers.selected && 'border-main',
        )}
      >
        {specialIcon && (
          <span
            aria-hidden="true"
            className="absolute -top-[10px] text-[14px] leading-none"
          >
            {specialIcon}
          </span>
        )}
        {day.date.getDate()}
      </span>

      {visibleEvents.length > 0 && (
        <span className="flex h-[8px] items-center justify-center gap-[3px]">
          {visibleEvents.map((event, index) => (
            <span
              key={`${event}-${index}`}
              aria-hidden="true"
              className={cn(
                'h-[6px] w-[6px] rounded-full',
                event === 'music' ? 'bg-[#1B9CEC]' : 'bg-[#EC791B]',
              )}
            />
          ))}
          {hiddenEventCount > 0 && (
            <span className="ml-[1px] text-body-11 font-medium text-secondary-1">
              +{hiddenEventCount}
            </span>
          )}
        </span>
      )}
    </button>
  );
}

export default function ScheduleContainer() {
  const [today] = useState(() => {
    const currentDate = new Date();

    return new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
    );
  });
  const [initialDate] = useState(() =>
    today < FIRST_AVAILABLE_MONTH ? FIRST_AVAILABLE_MONTH : today,
  );
  const [month, setMonth] = useState(
    () => new Date(initialDate.getFullYear(), initialDate.getMonth(), 1),
  );
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    initialDate,
  );
  const [category, setCategory] = useState<ScheduleCategory>('all');
  const initialYearMonth = getYearMonth(initialDate);
  const initialDateKey = getDateKey(initialDate);
  const yearMonth = getYearMonth(month);
  const selectedDateKey = selectedDate ? getDateKey(selectedDate) : '';
  const requestOptions: ScheduleRequestOptions = {
    category: getApiCategory(category),
    voteDisplay: VOTE_DISPLAY,
  };
  const {
    data: initialSchedule,
    isPending: isInitialPending,
    isError: isInitialError,
  } = useInitialScheduleQuery();
  const canUseInitialMonth =
    category === 'all' && yearMonth === initialYearMonth;
  const canUseInitialDay =
    category === 'all' && selectedDateKey === initialDateKey;
  const monthQuery = useScheduleMonthQuery(
    yearMonth,
    requestOptions,
    !canUseInitialMonth || isInitialError,
  );
  const dayQuery = useScheduleDayQuery(
    selectedDateKey,
    requestOptions,
    !canUseInitialDay || isInitialError,
  );
  const monthData =
    canUseInitialMonth && initialSchedule
      ? initialSchedule.month
      : monthQuery.data;
  const dayData =
    canUseInitialDay && initialSchedule ? initialSchedule.day : dayQuery.data;
  const isMonthPending = canUseInitialMonth
    ? isInitialPending
    : monthQuery.isPending;
  const isDayPending = canUseInitialDay ? isInitialPending : dayQuery.isPending;
  const isDayError = canUseInitialDay ? isInitialError : dayQuery.isError;
  const dayCounts = new Map(
    (monthData?.days ?? []).map((item) => [item.date, item]),
  );
  const selectedScheduleItems = dayData?.items ?? [];
  const isFirstMonth =
    month.getFullYear() === FIRST_AVAILABLE_MONTH.getFullYear() &&
    month.getMonth() === FIRST_AVAILABLE_MONTH.getMonth();

  const moveMonth = (offset: number) => {
    const nextMonth = new Date(
      month.getFullYear(),
      month.getMonth() + offset,
      1,
    );

    if (nextMonth < FIRST_AVAILABLE_MONTH) return;

    setMonth(nextMonth);
    setSelectedDate(nextMonth);
  };

  return (
    <section className="-mx-5 mt-[8px] overflow-hidden rounded-t-[20px] bg-secondary-800 px-[20px] pt-[24px]">
      <div className="flex h-[44px] items-center justify-center gap-[24px]">
        <button
          type="button"
          aria-label="이전 달"
          disabled={isFirstMonth}
          onClick={() => moveMonth(-1)}
          className="flex h-[40px] w-[40px] items-center justify-center disabled:cursor-not-allowed"
        >
          <Image
            src={
              isFirstMonth
                ? '/icon/line/arrow-left_gray-24.svg'
                : '/icon/line/arrow-left_white-24.svg'
            }
            alt=""
            width={24}
            height={24}
            aria-hidden="true"
          />
        </button>

        <p className="min-w-[120px] text-center text-title-17 font-bold text-secondary-1">
          {month.getFullYear()}년 {month.getMonth() + 1}월
        </p>

        <button
          type="button"
          aria-label="다음 달"
          onClick={() => moveMonth(1)}
          className="flex h-[40px] w-[40px] items-center justify-center"
        >
          <Image
            src="/icon/line/arrow-right_white-24.svg"
            alt=""
            width={24}
            height={24}
            aria-hidden="true"
          />
        </button>
      </div>

      <div
        className="mt-[16px] grid grid-cols-3 rounded-[6px] bg-secondary-700 p-[6px]"
        role="tablist"
        aria-label="총공 일정 카테고리"
      >
        {CATEGORY_TABS.map((tab) => {
          const isActive = category === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setCategory(tab.id)}
              className={`rounded-[6px] py-[6px] text-body-12 ${
                isActive
                  ? 'bg-secondary-950 font-bold text-secondary-1'
                  : 'font-normal text-secondary-300'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <DayPicker
        mode="single"
        locale={ko}
        timeZone="Asia/Seoul"
        month={month}
        onMonthChange={setMonth}
        startMonth={FIRST_AVAILABLE_MONTH}
        selected={selectedDate}
        onSelect={(date) => {
          if (date) setSelectedDate(date);
        }}
        today={today}
        modifiers={{ past: { before: today } }}
        showOutsideDays={false}
        fixedWeeks
        hideNavigation
        formatters={{
          formatWeekdayName: (date) =>
            ['일', '월', '화', '수', '목', '금', '토'][date.getDay()],
        }}
        components={{
          DayButton: (props) => (
            <ScheduleDayButton {...props} dayCounts={dayCounts} />
          ),
        }}
        classNames={{
          root: 'mt-[12px] w-full [--rdp-day-width:auto] [--rdp-day-height:64px]',
          months: 'w-full max-w-none',
          month: 'w-full',
          month_caption: 'hidden',
          month_grid: 'w-full table-fixed border-collapse',
          weekdays: 'h-[48px]',
          weekday:
            'p-0 text-center text-body-14 font-medium text-secondary-300 first:text-accent-red last:text-[#3478FF]',
          week: 'h-[64px]',
          day: 'h-[64px] w-auto p-0 align-top',
          day_button: 'h-[64px] w-full',
          outside: 'invisible',
          selected: 'font-normal text-inherit',
          today: 'text-inherit',
        }}
      />

      {category === 'all' && (
        <div className="mt-[16px] flex items-center gap-[20px] text-body-12 text-secondary-400">
          <span className="flex items-center gap-[6px]">
            <span className="h-[8px] w-[8px] rounded-full bg-[#1B9CEC]" />
            음원 총공
          </span>
          <span className="flex items-center gap-[6px]">
            <span className="h-[8px] w-[8px] rounded-full bg-[#EC791B]" />
            투표 총공
          </span>
        </div>
      )}

      <div className="h-[6px] bg-[#303030] -mx-5 mt-[24px]" />

      <div className="border-secondary-900 pt-[24px]">
        <div className="mb-[12px] flex items-center justify-between">
          <h2 className="text-title-15 font-bold text-secondary-1">
            {selectedDate
              ? formatSelectedDate(selectedDate)
              : '날짜를 선택해주세요'}
          </h2>
          <p className="text-body-13 text-secondary-400">
            총공 <strong>{selectedScheduleItems.length}</strong>개
          </p>
        </div>

        {isDayPending ? (
          <LoadingScreen label="일정 불러오는 중" />
        ) : isDayError ? (
          <div className="flex min-h-[120px] items-center justify-center text-body-13 text-secondary-500">
            일정을 불러오지 못했어요.
          </div>
        ) : selectedScheduleItems.length > 0 ? (
          <div className="flex flex-col gap-[8px]">
            {selectedScheduleItems.map((schedule) => (
              <NavigationListItem
                key={`${schedule.menuType}-${schedule.detailId}-${schedule.time}`}
                icon={`${schedule.menuType.toLowerCase()}-schedule`}
                title={schedule.title}
                time={formatScheduleTime(schedule.time)}
                platform={getSchedulePlatformLabel(
                  schedule.menuType,
                  schedule.platformNames,
                )}
                href={`/urgent/${schedule.detailId}?menuType=${schedule.menuType}`}
                variant="schedule"
              />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[120px] items-center justify-center text-body-13 text-secondary-500">
            등록된 총공 일정이 없어요.
          </div>
        )}
      </div>

      {isMonthPending && (
        <p className="sr-only" role="status">
          월간 일정을 불러오는 중입니다.
        </p>
      )}
    </section>
  );
}
