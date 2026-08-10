import { SectionTitle } from '@/components/common/SectionTitle';
import UrgentNoticeBanner from '@/components/common/UrgentNoticeBanner';
import type { VoteCategory } from '@/types/vote';
import VoteListItem, { VoteListItemProps } from './VoteListItem';

interface VoteCategoryContentProps {
  category: VoteCategory;
}

const VOTE_DEADLINE_LIST_MOCK: VoteListItemProps[] = [
  {
    id: '0',
    badgeNm: '음악방송',
    title: '인기가요 [1317회] 핫스테이지...',
    deadLine: '1시간 8분',
    icon: 'icon',
    platform: '하이어(Higher)',
    href: '/vote',
  },
  {
    id: '1',
    badgeNm: '기념일',
    title: '포도알 데뷔 카페 이벤트',
    deadLine: '16시간 18분',
    icon: 'icon',
    platform: '포도알',
    href: '/vote',
  },
];

export default function VoteCategoryContent({
  category,
}: VoteCategoryContentProps) {
  return (
    <div data-category={category}>
      <UrgentNoticeBanner
        title="오늘 저녁 11시 50분 최애돌 투표 총공"
        link=""
        className="mt-[12px]"
      />

      <div className="mb-[32px]">
        <div className="rounded-t-[16px] bg-[#371A1E] px-[12] py-[16px] text-body-12 font-medium text-[#FF5940]">
          마감 임박! 지금 바로 투표해 주세요!
        </div>
        <div className="flex h-[240px] w-full flex-col gap-[20px] rounded-b-[16px] bg-secondary-900 p-[16px]">
          {VOTE_DEADLINE_LIST_MOCK.map((item) => (
            <VoteListItem key={item.id} {...item} />
          ))}
        </div>
      </div>

      <div className="mb-[40px]">
        <SectionTitle>진행 중인 투표</SectionTitle>
        <div className="flex flex-col gap-[15px]">
          <div className="rounded-[16px] bg-secondary-900 p-[16px]">
            <div className="mb-[16px] flex justify-between">
              <div className="rounded-[4px] bg-[#B6921C] px-[8px] py-[2px] text-caption-10 font-medium">
                🏆 시상식
              </div>
              <p className="text-body-12 font-medium text-[#8D8D8D]">
                4일 남음
              </p>
            </div>
            <div className="flex items-center justify-between gap-[19px]">
              <div className="flex items-center justify-between gap-[12px]">
                <div className="h-[50px] min-w-[50px] rounded-[12px] bg-secondary-1">
                  icon
                </div>
                <div className="flex flex-col gap-[4px]">
                  <p className="line-clamp-1 text-body-15 font-bold">
                    포브스코리아 여름 휴가 패션을 기대하게 만드는 아티스트
                  </p>
                  <p className="text-body-13 text-[#777777]">포도알</p>
                </div>
              </div>
              <div>{'>'}</div>
            </div>
          </div>

          <div className="rounded-[16px] bg-secondary-900 p-[16px]">
            <div className="mb-[16px] flex justify-between">
              <div className="rounded-[4px] bg-[#1DA794] px-[8px] py-[2px] text-caption-10 font-medium">
                👑 기타
              </div>
              <p className="text-body-12 font-medium text-[#8D8D8D]">
                6일 남음
              </p>
            </div>
            <div className="flex items-center justify-between gap-[19px]">
              <div className="flex items-center justify-between gap-[12px]">
                <div className="h-[50px] min-w-[50px] rounded-[12px] bg-secondary-1">
                  icon
                </div>
                <div className="flex flex-col gap-[4px]">
                  <p className="line-clamp-1 text-body-15 font-bold">
                    벅스 8월 아티스트
                  </p>
                  <p className="text-body-13 text-[#777777]">벅스</p>
                </div>
              </div>
              <div>{'>'}</div>
            </div>
          </div>

          <div className="rounded-[16px] bg-secondary-900 p-[16px]">
            <div className="mb-[16px] flex justify-between">
              <div className="rounded-[4px] bg-[#603587] px-[8px] py-[2px] text-caption-10 font-medium">
                🎂 기념일
              </div>
              <p className="text-body-12 font-medium text-[#8D8D8D]">
                8일 남음
              </p>
            </div>
            <div className="flex items-center justify-between gap-[19px]">
              <div className="flex items-center justify-between gap-[12px]">
                <div className="h-[50px] min-w-[50px] rounded-[12px] bg-secondary-1">
                  icon
                </div>
                <div className="flex flex-col gap-[4px]">
                  <p className="line-clamp-1 text-body-15 font-bold">
                    포도알 8월 데뷔 아티스트
                  </p>
                  <p className="text-body-13 text-[#777777]">포도알</p>
                </div>
              </div>
              <div>{'>'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
