'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import FloatingShareButton from '@/components/common/FloatingShareButton';
import { HeaderIconButton } from '@/components/common/HeaderIconButton';
import { PageHeader } from '@/components/common/PageHeader';
import { VOTE_WEEKLY_SCHEDULES } from '@/constants/vote-weekly-plan';
import VoteWeeklyScheduleCard from './VoteWeeklyScheduleCard';
import { SectionTitle } from '@/components/common/SectionTitle';

export default function VoteWeeklyPlanDetail() {
  const router = useRouter();

  return (
    <main>
      <PageHeader
        sticky
        title="VIP 주간 투표 일정"
        leftAction={
          <HeaderIconButton
            label="뒤로가기"
            align="start"
            onClick={() => router.back()}
          >
            <Image
              src="/icon/line/arrow-left_white-28.svg"
              alt=""
              width={28}
              height={28}
              aria-hidden="true"
            />
          </HeaderIconButton>
        }
      />

      <Image
        src={'/images/voteplan/voteweekly.jpg'}
        alt="VIP 주간 투표 일정"
        priority
        width={3240}
        height={4320}
        className="mt-[24px] h-auto w-full rounded-[16px]"
      />

      <section className="mt-[40px]">
        <SectionTitle>음악방송별 투표 일정</SectionTitle>
        <div className="mt-[12px] flex flex-col gap-[8px]">
          {VOTE_WEEKLY_SCHEDULES.map((schedule) => (
            <VoteWeeklyScheduleCard key={schedule.id} schedule={schedule} />
          ))}
        </div>
      </section>

      <FloatingShareButton title="VIP 주간 투표 일정" />
    </main>
  );
}
