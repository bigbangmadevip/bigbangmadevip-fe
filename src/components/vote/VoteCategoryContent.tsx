import Image from 'next/image';
import { SectionTitle } from '@/components/common/SectionTitle';
import UrgentNoticeBanner from '@/components/common/UrgentNoticeBanner';
import type { CategoryBadgeType } from '@/constants/category-badge';
import type { VoteCategory } from '@/types/vote';
import DeadlineVoteListItem from './DeadlineVoteListItem';
import { VOTE_DEADLINE_LIST_MOCK, VOTE_ONGOING_LIST_MOCK } from './mock';
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

export default function VoteCategoryContent({
  category,
}: VoteCategoryContentProps) {
  const selectedBadge =
    category === 'all' ? null : VOTE_BADGE_BY_CATEGORY[category];
  const deadlineVotes = selectedBadge
    ? VOTE_DEADLINE_LIST_MOCK.filter(
        (item) => item.category === selectedBadge,
      )
    : VOTE_DEADLINE_LIST_MOCK;
  const ongoingVotes = selectedBadge
    ? VOTE_ONGOING_LIST_MOCK.filter(
        (item) => item.category === selectedBadge,
      )
    : VOTE_ONGOING_LIST_MOCK;

  return (
    <div data-category={category}>
      <UrgentNoticeBanner
        title="오늘 저녁 11시 50분 최애돌 투표 총공"
        link=""
        className="mt-[12px]"
      />

      {deadlineVotes.length > 0 && (
        <div className="mb-[32px]">
          <div className="flex gap-[4px] rounded-t-[16px] bg-[#371A1E] px-[12px] py-[16px] text-body-12 font-medium text-accent-red">
            <Image
              src="/icon/time-red.svg"
              alt=""
              width={12}
              height={12}
              className="m-[2px]"
              aria-hidden="true"
            />
            마감 임박! 지금 바로 투표해 주세요!
          </div>
          <div className="flex w-full flex-col gap-[20px] rounded-b-[16px] bg-secondary-900 p-[16px]">
            {deadlineVotes.map((item) => (
              <DeadlineVoteListItem key={item.id} {...item} />
            ))}
          </div>
        </div>
      )}

      {ongoingVotes.length > 0 && (
        <div className="mb-[40px]">
          <SectionTitle>진행 중인 투표</SectionTitle>
          <div className="flex flex-col gap-[15px]">
            {ongoingVotes.map((item) => (
              <OngoingVoteListItem key={item.id} {...item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
