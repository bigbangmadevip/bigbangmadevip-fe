'use client';

import { DayPicker, type DayButtonProps } from '@daypicker/react';
import { ko } from '@daypicker/react/locale';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { HeaderIconButton } from '@/components/common/HeaderIconButton';
import { PageHeader } from '@/components/common/PageHeader';
import { SectionTitle } from '@/components/common/SectionTitle';
import { cn } from '@/lib/utils';
import CheeringRecordSheet from './CheeringRecordSheet';
import '@daypicker/react/style.css';

const INITIAL_MONTH = new Date(2026, 7, 1);
const INITIAL_SELECTED_DATE = new Date(2026, 7, 20);
const MARQUEE_ITEM = '• 20 YEARS • BIGBANG IS VIP\u00A0';
const MARQUEE_ITEMS = Array.from({ length: 6 }, (_, index) => index);
const CHEERING_DATES = [
  new Date(2026, 7, 20),
  new Date(2026, 7, 21),
  new Date(2026, 7, 22),
  new Date(2026, 7, 24),
  new Date(2026, 7, 26),
  new Date(2026, 7, 29),
];

const CHEERING_RECORDS: Record<string, string[]> = {
  '2026-08-20': [
    '음원 스트리밍',
    '인기가요 사전 투표',
    '멜론 주간인기상 투표',
    '유튜브 뮤직비디오 조회',
    '네이버 기사 댓글 작성',
    'SNS 해시태그 언급',
  ],
};

function getDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function MyPageDayButton({
  day,
  modifiers,
  className,
  ...buttonProps
}: DayButtonProps) {
  return (
    <button
      {...buttonProps}
      className={`${className ?? ''} flex h-[40px] w-full items-center justify-center text-body-12 font-medium ${
        modifiers.selected
          ? 'text-secondary-950'
          : modifiers.cheered
            ? 'text-secondary-100'
            : 'text-secondary-600'
      }`}
    >
      <span
        className={cn(
          'flex h-[28px] w-[28px] items-center justify-center rounded-full border border-transparent',
          modifiers.cheered && 'border-[#C6C31B]',
          modifiers.selected && 'border-main bg-main',
        )}
      >
        {day.date.getDate()}
      </span>
    </button>
  );
}

export default function MyPageContainer() {
  const [month, setMonth] = useState(INITIAL_MONTH);
  const [selectedDate, setSelectedDate] = useState<Date>(INITIAL_SELECTED_DATE);
  const [isRecordSheetOpen, setIsRecordSheetOpen] = useState(false);
  const selectedRecords =
    CHEERING_RECORDS[getDateKey(selectedDate)] ??
    (CHEERING_DATES.some(
      (date) => getDateKey(date) === getDateKey(selectedDate),
    )
      ? ['오늘의 응원']
      : []);

  const moveMonth = (offset: number) => {
    setMonth(
      (currentMonth) =>
        new Date(
          currentMonth.getFullYear(),
          currentMonth.getMonth() + offset,
          1,
        ),
    );
  };

  return (
    <main>
      <PageHeader
        rightAction={
          <HeaderIconButton label="설정" align="end">
            <Image
              src="/icon/setting.svg"
              alt=""
              width={24}
              height={24}
              aria-hidden="true"
            />
          </HeaderIconButton>
        }
      />

      <div className="-mx-5 overflow-hidden border-y border-[#3C3A11] bg-[rgba(255,251,31,0.03)] py-[10px]">
        <div
          aria-label={MARQUEE_ITEM}
          className="marquee-track flex w-max whitespace-nowrap text-caption-10 font-medium text-secondary-600"
        >
          <div className="flex shrink-0" aria-hidden="true">
            {MARQUEE_ITEMS.map((item) => (
              <span key={`marquee-first-${item}`}>{MARQUEE_ITEM}</span>
            ))}
          </div>
          <div className="flex shrink-0" aria-hidden="true">
            {MARQUEE_ITEMS.map((item) => (
              <span key={`marquee-second-${item}`}>{MARQUEE_ITEM}</span>
            ))}
          </div>
        </div>
      </div>

      <section className="pt-[32px]">
        <h1 className="text-[36px] leading-[1.35] font-extralight tracking-[-0.04em] text-secondary-1">
          ALWAYS <strong className="font-bold text-main">VIP👑</strong>
          <br />
          언제까지나
          <br />
          FOREVER WITH <strong className="font-bold">BiiiG</strong>
        </h1>

        <div className="mt-[40px] rounded-[16px] bg-secondary-900 p-[16px]">
          <div className="flex items-center justify-between">
            <span className="rounded-[8px] border border-secondary-800 px-[12px] py-[6px] text-body-12 font-medium text-secondary-300">
              오늘의 응원 현황
            </span>
            <p className="text-body-13 text-secondary-400">
              <strong className="text-secondary-1">3</strong>{' '}
              <span className="pr-[4px]">/8</span>완료
            </p>
          </div>

          <div className="mt-[24px] h-[8px] overflow-hidden rounded-full bg-secondary-700">
            <div className="h-full w-[42%] rounded-full bg-main" />
          </div>

          <p className="mt-[8px] text-body-15 text-secondary-400">
            5개 남았어요
          </p>

          <Link
            href="/"
            className="mt-[16px] flex items-center justify-between rounded-full bg-secondary-800 pl-[20px] pr-[12px] py-[12px] text-body-13 font-medium text-secondary-1"
          >
            오늘의 응원 하러 가기
            <Image
              src="/icon/arrow-right_gray-24.svg"
              alt="ArrowIcon"
              width={24}
              height={24}
            />
          </Link>
        </div>
      </section>

      <section className="mt-[40px]">
        <SectionTitle>내 응원 기록</SectionTitle>

        <div className="mt-[23px] flex gap-[15px]">
          <div className="flex items-start gap-[32px] justify-between border-t border-secondary-900 pt-[12px]">
            <strong className="font-suit text-[80px] leading-[66px] font-bold text-main">
              19
            </strong>
            <span className="text-body-12 text-secondary-100">번 응원</span>
          </div>

          <dl className="w-[52%] border-t border-secondary-900 pt-[12px]">
            <div className="flex items-start justify-between border-b border-secondary-900 pb-[20px] px-[4px]">
              <dt className="text-body-11 text-secondary-400">응원한 날</dt>
              <dd className="font-suit text-[24px] leading-none font-bold text-secondary-1">
                12
                <small className="ml-[4px] inline-block align-top text-body-11 leading-none">
                  일째
                </small>
              </dd>
            </div>
            <div className="flex items-start justify-between border-b border-secondary-900 py-[20px] px-[4px]">
              <dt className="text-body-11 text-secondary-400">
                이번 달 응원한 날
              </dt>
              <dd className="font-suit text-[24px] leading-none font-bold text-secondary-1">
                10
                <small className="ml-[4px] inline-block align-top text-body-11 leading-none">
                  일
                </small>
              </dd>
            </div>
            <div className="flex items-start justify-between pt-[14px] px-[4px]">
              <dt className="text-body-11 text-secondary-400">첫 응원</dt>
              <dd className="font-suit text-[24px] leading-none font-bold text-secondary-1">
                26.08.19
              </dd>
            </div>
          </dl>
        </div>

        <div className="rounded-[16px] mt-[32px] bg-secondary-900 px-[12px] pt-[16px] pb-[20px]">
          <div className="flex h-[40px] items-center justify-center gap-[20px]">
            <button
              type="button"
              aria-label="이전 달"
              onClick={() => moveMonth(-1)}
              className="flex h-[36px] w-[36px] items-center justify-center text-[24px] font-extralight text-secondary-500"
            >
              ‹
            </button>
            <p className="min-w-[100px] text-center text-body-13 font-bold text-secondary-1">
              {month.getFullYear()}년 {month.getMonth() + 1}월
            </p>
            <button
              type="button"
              aria-label="다음 달"
              onClick={() => moveMonth(1)}
              className="flex h-[36px] w-[36px] items-center justify-center text-[24px] font-extralight text-secondary-500"
            >
              ›
            </button>
          </div>

          <DayPicker
            mode="single"
            required
            locale={ko}
            timeZone="Asia/Seoul"
            month={month}
            onMonthChange={setMonth}
            selected={selectedDate}
            onSelect={(date) => {
              setSelectedDate(date);
              setIsRecordSheetOpen(true);
            }}
            modifiers={{ cheered: CHEERING_DATES }}
            showOutsideDays={false}
            fixedWeeks
            hideNavigation
            formatters={{
              formatWeekdayName: (date) =>
                ['일', '월', '화', '수', '목', '금', '토'][date.getDay()],
            }}
            components={{ DayButton: MyPageDayButton }}
            classNames={{
              root: 'mt-[8px] w-full [--rdp-day-width:auto] [--rdp-day-height:40px]',
              months: 'w-full max-w-none',
              month: 'w-full',
              month_caption: 'hidden',
              month_grid: 'w-full table-fixed border-collapse',
              weekdays: 'h-[40px]',
              weekday:
                'p-0 text-center text-caption-10 font-medium text-secondary-400',
              week: 'h-[40px]',
              day: 'h-[40px] w-auto p-0',
              day_button: 'h-[40px] w-full',
              outside: 'invisible',
              selected: 'font-normal text-inherit',
              today: 'text-inherit',
            }}
          />
        </div>
      </section>

      <CheeringRecordSheet
        open={isRecordSheetOpen}
        onOpenChange={setIsRecordSheetOpen}
        date={selectedDate}
        records={selectedRecords}
      />
    </main>
  );
}
