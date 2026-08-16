'use client';

import { DayPicker, type DayButtonProps } from '@daypicker/react';
import { ko } from '@daypicker/react/locale';
import { useState } from 'react';
import NavigationListItem, {
  type NavigationListItemProps,
} from '@/components/common/NavigationListItem';
import { cn } from '@/lib/utils';
import '@daypicker/react/style.css';

const FIRST_AVAILABLE_MONTH = new Date(2026, 7, 1);
const INITIAL_SELECTED_DATE = new Date(2026, 7, 9);

type ScheduleCategory = 'all' | 'music' | 'vote';
type EventCategory = Exclude<ScheduleCategory, 'all'>;
type ScheduleListItem = NavigationListItemProps & {
  id: string;
  category: EventCategory;
};

const CATEGORY_TABS = [
  { id: 'all', label: '전체' },
  { id: 'music', label: '음원 총공' },
  { id: 'vote', label: '투표 총공' },
] as const;

const SCHEDULE_MOCK: Record<string, EventCategory[]> = {
  '2026-08-03': ['vote', 'vote'],
  '2026-08-04': ['vote', 'vote'],
  '2026-08-06': ['music', 'vote'],
  '2026-08-09': ['music', 'music', 'vote'],
  '2026-08-10': ['music', 'music', 'vote'],
  '2026-08-11': ['music', 'music', 'vote', 'vote', 'vote'],
  '2026-08-12': ['music', 'music', 'music'],
  '2026-08-15': ['music', 'vote', 'vote', 'vote'],
  '2026-08-16': ['vote'],
  '2026-08-17': ['music', 'vote'],
  '2026-08-19': ['music', 'music', 'vote', 'vote', 'music', 'vote'],
  '2026-08-20': ['music', 'vote', 'vote', 'music', 'vote'],
  '2026-08-21': ['music', 'music', 'music', 'vote'],
  '2026-08-22': ['music'],
  '2026-08-23': ['music', 'vote'],
  '2026-08-24': ['music', 'vote', 'vote'],
  '2026-08-25': ['vote'],
  '2026-08-28': ['music', 'music', 'vote', 'vote'],
  '2026-08-29': ['music', 'vote'],
  '2026-08-30': ['vote'],
};

const SPECIAL_DATE_ICONS: Record<string, string> = {
  '2026-08-19': '👑',
};

const SCHEDULE_LIST_MOCK: Record<string, ScheduleListItem[]> = {
  '2026-08-09': [
    {
      id: '2026-08-09-melon',
      category: 'music',
      icon: '',
      title: '멜론 다운로드 총공',
      time: '19:00',
      platform: '멜론 (Melon)',
      href: '/urgent/1',
    },
    {
      id: '2026-08-09-bugs',
      category: 'music',
      icon: '',
      title: '벅스 다운로드 총공',
      time: '20:00',
      platform: '벅스 (Bugs)',
      href: '/urgent/2',
    },
    {
      id: '2026-08-09-vote',
      category: 'vote',
      icon: '',
      title: '최애돌 생일 이벤트 화력 지원',
      time: '23:50',
      platform: '최애돌',
      href: '/urgent/3',
    },
  ],
};

function getDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function getEvents(date: Date, category: ScheduleCategory) {
  const events = SCHEDULE_MOCK[getDateKey(date)] ?? [];

  return category === 'all'
    ? events
    : events.filter((event) => event === category);
}

function getScheduleItems(date: Date, category: ScheduleCategory) {
  const dateKey = getDateKey(date);
  const savedItems = SCHEDULE_LIST_MOCK[dateKey];
  const items =
    savedItems ??
    (SCHEDULE_MOCK[dateKey] ?? []).map((eventCategory, index) => ({
      id: `${dateKey}-${eventCategory}-${index}`,
      category: eventCategory,
      icon: '',
      title: eventCategory === 'music' ? '음원 총공 일정' : '투표 총공 일정',
      time: eventCategory === 'music' ? '19:00' : '23:50',
      platform: eventCategory === 'music' ? '음원 플랫폼' : '투표 플랫폼',
      href: `/urgent/${index + 1}`,
    }));

  return category === 'all'
    ? items
    : items.filter((item) => item.category === category);
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

interface ScheduleDayButtonProps extends DayButtonProps {
  category: ScheduleCategory;
}

function ScheduleDayButton({
  day,
  modifiers,
  category,
  className,
  ...buttonProps
}: ScheduleDayButtonProps) {
  const events = getEvents(day.date, category);
  const visibleEvents = events.slice(0, 4);
  const hiddenEventCount = events.length - visibleEvents.length;
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
            className="absolute -top-[8px] text-[14px] leading-none"
          >
            {specialIcon}
          </span>
        )}
        {day.date.getDate()}
      </span>

      {events.length > 0 && (
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
  const [month, setMonth] = useState(FIRST_AVAILABLE_MONTH);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    INITIAL_SELECTED_DATE,
  );
  const [category, setCategory] = useState<ScheduleCategory>('all');
  const selectedScheduleItems = selectedDate
    ? getScheduleItems(selectedDate, category)
    : [];
  const isFirstMonth =
    month.getFullYear() === FIRST_AVAILABLE_MONTH.getFullYear() &&
    month.getMonth() === FIRST_AVAILABLE_MONTH.getMonth();

  const moveMonth = (offset: number) => {
    setMonth((currentMonth) => {
      const nextMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + offset,
        1,
      );

      return nextMonth < FIRST_AVAILABLE_MONTH
        ? FIRST_AVAILABLE_MONTH
        : nextMonth;
    });
  };

  return (
    <section className="-mx-5 mt-[8px] overflow-hidden rounded-t-[20px] bg-secondary-800 px-[20px] pt-[24px] pb-[20px]">
      <div className="flex h-[44px] items-center justify-center gap-[24px]">
        <button
          type="button"
          aria-label="이전 달"
          disabled={isFirstMonth}
          onClick={() => moveMonth(-1)}
          className="flex h-[40px] w-[40px] items-center justify-center text-[32px] font-extralight text-secondary-400 disabled:text-secondary-800"
        >
          ‹
        </button>

        <p className="min-w-[120px] text-center text-title-17 font-bold text-secondary-1">
          {month.getFullYear()}년 {month.getMonth() + 1}월
        </p>

        <button
          type="button"
          aria-label="다음 달"
          onClick={() => moveMonth(1)}
          className="flex h-[40px] w-[40px] items-center justify-center text-[32px] font-extralight text-secondary-400"
        >
          ›
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
        onSelect={setSelectedDate}
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
            <ScheduleDayButton {...props} category={category} />
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

        {selectedScheduleItems.length > 0 ? (
          <div className="flex flex-col gap-[8px]">
            {selectedScheduleItems.map((schedule) => (
              <NavigationListItem
                key={schedule.id}
                icon={schedule.icon}
                title={schedule.title}
                time={schedule.time}
                platform={schedule.platform}
                href={schedule.href}
              />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[120px] items-center justify-center text-body-13 text-secondary-500">
            등록된 총공 일정이 없어요.
          </div>
        )}
      </div>
    </section>
  );
}
