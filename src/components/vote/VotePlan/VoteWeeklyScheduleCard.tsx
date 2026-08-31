'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

type VoteScheduleTone = 'advance' | 'live' | 'text' | 'special';

type VoteScheduleSummary = {
  label: string;
  time: string;
  tone: VoteScheduleTone;
};

type VoteScheduleDetail = VoteScheduleSummary & {
  rows: Array<{ label: string; value: string }>;
};

type VoteScheduleGuide = {
  id: string;
  title: string;
  iconSrc: string;
  href?: string;
};

export type VoteWeeklySchedule = {
  id: string;
  title: string;
  channel: string;
  broadcastTime: string;
  iconSrc: string;
  description: string;
  summaries: VoteScheduleSummary[];
  details: VoteScheduleDetail[];
  guides: VoteScheduleGuide[];
};

type VoteWeeklyScheduleCardProps = {
  schedule: VoteWeeklySchedule;
};

const TONE_TEXT_CLASS: Record<VoteScheduleTone, string> = {
  advance: 'text-[#FAB12A]',
  live: 'text-[#5DCCF8]',
  text: 'text-[#A17BFF]',
  special: 'text-[#DEFF4B]',
};

export default function VoteWeeklyScheduleCard({
  schedule,
}: VoteWeeklyScheduleCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article className="overflow-hidden rounded-[16px] bg-secondary-900">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={`weekly-vote-schedule-${schedule.id}`}
        onClick={() => setIsOpen((open) => !open)}
        className="flex min-h-[88px] w-full items-center gap-[12px] p-[16px] text-left"
      >
        <span className="relative h-[48px] w-[48px] shrink-0 overflow-hidden rounded-[12px] bg-secondary-1">
          <Image
            src={schedule.iconSrc}
            alt=""
            fill
            sizes="48px"
            aria-hidden="true"
            className="object-contain"
          />
        </span>

        <span className="min-w-0 flex-1">
          <strong className="block truncate text-body-15 font-bold text-secondary-1">
            {schedule.title}
          </strong>
          <span className="mt-[2px] block truncate text-body-13 text-secondary-300">
            {schedule.channel} <b className="px-[4px] text-secondary-700">|</b>{' '}
            {schedule.broadcastTime}
          </span>
        </span>

        {isOpen ? (
          <Image
            src={'/icon/line/arrow-up.svg'}
            alt="ArrowUpIcon"
            width={24}
            height={24}
          />
        ) : (
          <Image
            src={'/icon/line/arrow-down_gray-24.svg'}
            alt="ArrowDownIcon"
            width={24}
            height={24}
          />
        )}
      </button>

      {isOpen && (
        <div
          id={`weekly-vote-schedule-${schedule.id}`}
          className="px-[16px] pb-[16px]"
        >
          <span className="text-body-12 py-[6px] px-[12px] bg-secondary-700 text-secondary-200 rounded-full">
            <strong>사전투표 점수</strong>가 합산되어 차트에 반영됩니다.
          </span>

          <p className="mt-[20px] text-body-15 font-bold text-secondary-1">
            투표 일정
          </p>
          <div className="mt-[12px] flex flex-col gap-[8px]">
            {schedule.summaries.map((summary) => (
              <div
                key={`${summary.label}-${summary.time}`}
                className="grid grid-cols-[100px_minmax(0,1fr)] gap-[8px] text-body-13 font-medium"
              >
                <span className={`${TONE_TEXT_CLASS[summary.tone]}`}>
                  {summary.label}
                </span>
                <span className="text-secondary-200">{summary.time}</span>
              </div>
            ))}
          </div>

          <div className="mt-[20px] border-t border-secondary-800">
            {schedule.details.map((detail) => (
              <section
                key={`${detail.label}-${detail.time}`}
                className="border-b border-secondary-800 py-[20px] last:border-b-0"
              >
                <div className="flex flex-wrap items-baseline gap-x-[8px] gap-y-[2px]">
                  <p
                    className={`text-body-15 font-bold ${TONE_TEXT_CLASS[detail.tone]}`}
                  >
                    {detail.label}
                  </p>
                  {/* <p className="text-body-11 text-secondary-500">
                    {detail.time}
                  </p> */}
                </div>

                <dl className="mt-[14px] grid grid-cols-[92px_minmax(0,1fr)] gap-x-[8px] gap-y-[10px] text-body-13">
                  {detail.rows.map((row) => (
                    <div
                      key={`${detail.label}-${row.label}`}
                      className="contents"
                    >
                      <dt className="text-secondary-500">{row.label}</dt>
                      <dd className="whitespace-pre-line text-secondary-200">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            ))}
          </div>

          {schedule.guides.length > 0 && (
            <div className="mt-[20px]">
              <p className="text-body-15 font-bold text-secondary-1">
                관련 가이드
              </p>
              <div className="mt-[12px] flex flex-col gap-[8px]">
                {schedule.guides.map((guide) => {
                  const guideContent = (
                    <>
                      <span className="relative h-[36px] w-[36px] shrink-0 overflow-hidden rounded-full bg-secondary-1">
                        <Image
                          src={guide.iconSrc}
                          alt=""
                          fill
                          sizes="36px"
                          aria-hidden="true"
                          className="object-contain"
                        />
                      </span>
                      <strong className="min-w-0 flex-1 truncate text-body-14 font-bold text-secondary-1">
                        {guide.title}
                      </strong>
                      <Image
                        src="/icon/line/arrow-right_gray-24.svg"
                        alt=""
                        width={24}
                        height={24}
                        aria-hidden="true"
                        className="shrink-0"
                      />
                    </>
                  );

                  return guide.href ? (
                    <Link
                      key={guide.id}
                      href={guide.href}
                      className="flex min-h-[64px] items-center gap-[12px] rounded-[12px] border border-secondary-700 px-[12px]"
                    >
                      {guideContent}
                    </Link>
                  ) : (
                    <div
                      key={guide.id}
                      className="flex min-h-[64px] items-center gap-[12px] rounded-[12px] border border-secondary-700 px-[12px]"
                    >
                      {guideContent}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </article>
  );
}
