'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import LoadingScreen from '@/components/common/LoadingScreen';
import { SectionTitle } from '@/components/common/SectionTitle';
import UrgentNoticeBanner from '@/components/common/UrgentNoticeBanner';
import type { CategoryBadgeType } from '@/constants/category-badge';
import { getVotePlatformLabel } from '@/constants/vote-platform';
import { useVoteTodayQuery } from '@/hooks/queries/useVoteQuery';
import type { VoteCategory } from '@/types/vote';
import DeadlineVoteListItem from './DeadlineVoteListItem';
import OngoingVoteListItem from './OngoingVoteListItem';

interface VoteCategoryContentProps {
  category: VoteCategory;
}

const VOTE_BADGE_BY_CATEGORY: Record<
  Exclude<VoteCategory, 'all'>,
  CategoryBadgeType
> = {
  awards: 'AWARDS',
  'music-show': 'MUSIC_SHOW',
  anniversary: 'ANNIVERSARY',
  etc: 'ETC',
};

function formatRemainingTime(eventEndAt: string, now: number | null) {
  if (now === null) return '-';

  const remainingMilliseconds = new Date(eventEndAt).getTime() - now;

  if (remainingMilliseconds <= 0) return '마감';

  const totalSeconds = Math.floor(remainingMilliseconds / 1000);
  const days = Math.floor(totalSeconds / 86400);

  if (days > 0) return `${days}일`;

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map((value) => String(value).padStart(2, '0'))
    .join(':');
}

export default function VoteCategoryContent({
  category,
}: VoteCategoryContentProps) {
  const { data, isPending, isError } = useVoteTodayQuery();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const initialTimer = window.setTimeout(() => setNow(Date.now()), 0);
    const timer = window.setInterval(() => setNow(Date.now()), 1000);

    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(timer);
    };
  }, []);

  if (isPending) {
    return <LoadingScreen label="오늘의 투표 불러오는 중" />;
  }

  if (isError || !data) {
    return (
      <div className="flex min-h-[320px] items-center justify-center text-body-13 text-secondary-500">
        오늘의 투표를 불러오지 못했어요.
      </div>
    );
  }

  const selectedBadge =
    category === 'all' ? null : VOTE_BADGE_BY_CATEGORY[category];
  const deadlineVotes = selectedBadge
    ? data.dueSoonVotes.filter((item) => item.category === selectedBadge)
    : data.dueSoonVotes;
  const ongoingVotes = selectedBadge
    ? data.votes.filter((item) => item.category === selectedBadge)
    : data.votes;

  return (
    <div data-category={category}>
      {data.urgent && (
        <UrgentNoticeBanner
          title={data.urgent.urgentContent}
          link={`/urgent/${data.urgent.detailId}?menuType=VOTE`}
          className="mt-[12px]"
        />
      )}

      {deadlineVotes.length > 0 && (
        <div className="mb-[32px]">
          <div className="flex items-center gap-[4px] rounded-t-[16px] bg-[#371A1E] px-[18px] py-[12px] text-body-13 font-medium text-accent-red">
            <Image
              src="/icon/line/clock_red-16.svg"
              alt=""
              width={16}
              height={16}
              aria-hidden="true"
            />
            마감 임박! 지금 바로 투표해 주세요!
          </div>
          <div className="flex w-full flex-col gap-[20px] rounded-b-[16px] bg-secondary-900 p-[16px] last:pb-0">
            {deadlineVotes.map((item) => (
              <DeadlineVoteListItem
                key={item.detailId}
                id={String(item.detailId)}
                category={item.category}
                remainingTime={formatRemainingTime(item.eventEndAt, now)}
                title={item.title}
                platform={item.platformNames
                  .map(getVotePlatformLabel)
                  .join(', ')}
                iconPlatform={item.platformNames[0]}
                imageUrl={item.imageUrl}
                href={`/urgent/${item.detailId}?menuType=VOTE`}
              />
            ))}
          </div>
        </div>
      )}

      {ongoingVotes.length > 0 && (
        <div className="mb-[40px]">
          <SectionTitle>진행 중인 투표</SectionTitle>
          <div className="flex flex-col gap-[15px]">
            {ongoingVotes.map((item) => (
              <OngoingVoteListItem
                key={item.detailId}
                id={String(item.detailId)}
                category={item.category}
                remainingTime={formatRemainingTime(item.eventEndAt, now)}
                title={item.title}
                platform={item.platformNames
                  .map(getVotePlatformLabel)
                  .join(', ')}
                iconPlatform={item.platformNames[0]}
                imageUrl={item.imageUrl}
                href={`/urgent/${item.detailId}?menuType=VOTE`}
              />
            ))}
          </div>
        </div>
      )}

      {deadlineVotes.length === 0 && ongoingVotes.length === 0 && (
        <div className="flex flex-col min-h-[320px] items-center justify-center text-body-13 gap-[2px] text-secondary-500">
          <Image src={'/icon/empty.svg'} alt="" width={64} height={64} />
          <p>진행 중인 투표가 없어요.</p>
        </div>
      )}
    </div>
  );
}
