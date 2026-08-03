'use client';

import { SectionTitle } from '@/components/common/SectionTitle';
import VoteListItem, {
  VoteListItemProps,
} from '@/components/vote/VoteListItem';
import { useState } from 'react';

const VOTE_TABS = [
  {
    tabId: 0,
    title: '오늘의 투표',
  },
  {
    tabId: 1,
    title: '예정된 투표',
  },
  { tabId: 2, title: '총공 지원' },
  { tabId: 3, title: '공지' },
];

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

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState(VOTE_TABS[0].tabId);

  return (
    <main>
      {/* HEADER */}
      <div className="flex justify-center py-[14px] text-title-17 font-bold">
        투표
      </div>
      {/* TABS */}
      <div className="-mx-5 mb-[24px] border-b-2 border-[#555555]">
        <div className="flex h-[44px] items-center" role="tablist">
          {VOTE_TABS.map((tab) => (
            <button
              type="button"
              key={tab.tabId}
              id={`music-tab-${tab.tabId}`}
              role="tab"
              aria-selected={activeTab === tab.tabId}
              aria-controls={`music-panel-${tab.tabId}`}
              onClick={() => setActiveTab(tab.tabId)}
              className={`flex h-[44px] pt-[10px] pb-[16px] flex-1 items-center justify-center text-body-14 ${
                activeTab === tab.tabId
                  ? '-mb-[2px] border-b-2 border-secondary-1 font-bold text-secondary-1'
                  : 'font-normal text-[#777777]'
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>
      </div>

      {/* 탭 */}
      <section
        id={`music-panel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`music-tab-${activeTab}`}
      >
        {/* 스트리밍 탭 화면 */}
        {activeTab === 0 && (
          <>
            <div className="flex justify-between items-center rounded-full border border-[#ECE818] mb-[24px] px-[16px] py-[12px]">
              <p className="font-bold text-body-13">
                🚨 오늘 저녁 11시 50분 최애돌 투표 총공
              </p>
              <p>{'>'}</p>
            </div>
            <div className="mb-[32px]">
              <div className="rounded-t-[16px] px-[12] py-[16px] text-body-12 font-medium text-[#FF5940] bg-[#371A1E]">
                마감 임박! 지금 바로 투표해 주세요!
              </div>
              <div className="flex flex-col gap-[20px] rounded-b-[16px] p-[16px] bg-secondary-900 w-full h-[240px]">
                {VOTE_DEADLINE_LIST_MOCK.map((item) => (
                  <VoteListItem
                    key={item.id}
                    badgeNm={item.badgeNm}
                    deadLine={item.deadLine}
                    icon={item.icon}
                    title={item.title}
                    platform={item.platform}
                    href={item.href}
                  />
                ))}
              </div>
            </div>
            <div className="mb-[40px]">
              <SectionTitle>진행 중인 투표</SectionTitle>
              <div className="flex flex-col gap-[15px]">
                {/* 진행중인 투표 1 */}
                <div className="rounded-[16px] bg-secondary-900 p-[16px]">
                  <div className="flex justify-between mb-[16px]">
                    <div className="px-[8px] py-[2px] bg-[#B6921C] rounded-[4px] text-caption-10 font-medium">
                      🏆 시상식
                    </div>
                    <p className="text-[#8D8D8D] text-body-12 font-medium">
                      4일 남음
                    </p>
                  </div>
                  <div className="flex justify-between items-center gap-[19px]">
                    <div className="flex justify-between items-center gap-[12px]">
                      <div className="h-[50px] min-w-[50px] rounded-[12px] bg-secondary-1">
                        icon
                      </div>
                      <div className="flex flex-col gap-[4px]">
                        <p className="text-body-15 font-bold line-clamp-1">
                          포브스코리아 여름 휴가 패션을 기대하게 만드는 아티스트
                        </p>
                        <p className="text-body-13 text-[#777777]">포도알</p>
                      </div>
                    </div>
                    <div>{'>'}</div>
                  </div>
                </div>
                {/* 진행중인 투표 2 */}
                <div className="rounded-[16px] bg-secondary-900 p-[16px]">
                  <div className="flex justify-between mb-[16px]">
                    <div className="px-[8px] py-[2px] bg-[#1DA794] rounded-[4px] text-caption-10 font-medium">
                      👑 기타
                    </div>
                    <p className="text-[#8D8D8D] text-body-12 font-medium">
                      6일 남음
                    </p>
                  </div>
                  <div className="flex justify-between items-center gap-[19px]">
                    <div className="flex justify-between items-center gap-[12px]">
                      <div className="h-[50px] min-w-[50px] rounded-[12px] bg-secondary-1">
                        icon
                      </div>
                      <div className="flex flex-col gap-[4px]">
                        <p className="text-body-15 font-bold line-clamp-1">
                          벅스 8월 아티스트
                        </p>
                        <p className="text-body-13 text-[#777777]">벅스</p>
                      </div>
                    </div>
                    <div>{'>'}</div>
                  </div>
                </div>
                {/* 진행중인 투표 3 */}
                <div className="rounded-[16px] bg-secondary-900 p-[16px]">
                  <div className="flex justify-between mb-[16px]">
                    <div className="px-[8px] py-[2px] bg-[#603587] rounded-[4px] text-caption-10 font-medium">
                      🎂 기념일
                    </div>
                    <p className="text-[#8D8D8D] text-body-12 font-medium">
                      8일 남음
                    </p>
                  </div>
                  <div className="flex justify-between items-center gap-[19px]">
                    <div className="flex justify-between items-center gap-[12px]">
                      <div className="h-[50px] min-w-[50px] rounded-[12px] bg-secondary-1">
                        icon
                      </div>
                      <div className="flex flex-col gap-[4px]">
                        <p className="text-body-15 font-bold line-clamp-1">
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
          </>
        )}
        {/* {activeTab === 1 && <AlbumTab />}
          {activeTab === 2 && <GuideTab />}
          {activeTab === 3 && <NoticeTab />} */}
      </section>
    </main>
  );
}
