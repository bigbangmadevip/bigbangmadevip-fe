'use client';

import { SectionTitle } from '@/components/common/SectionTitle';
import { useState } from 'react';

const MUSIC_TABS = [
  {
    tabId: 0,
    title: '스트리밍',
  },
  {
    tabId: 1,
    title: '앨범 구매',
  },
  { tabId: 2, title: '음원 가이드' },
  { tabId: 3, title: '공지' },
];

export default function MembershipPage() {
  const [activeTab, setActiveTab] = useState(MUSIC_TABS[0].tabId);

  return (
    <>
      <main>
        {/* HEADER */}
        <div className="flex justify-center py-[14px] text-title-17 font-bold">
          음원
        </div>
        {/* TABS */}
        <div className="-mx-5 mb-[24px] border-b-2 border-[#555555]">
          <div className="flex h-[44px] items-center" role="tablist">
            {MUSIC_TABS.map((tab) => (
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
                  🚨 오늘 저녁 12시 30분 멜론 개별곡 다운로드 총공
                </p>
                <p>{'>'}</p>
              </div>
              <div className="mb-[32px]">
                <SectionTitle>원클릭 스트리밍</SectionTitle>
                <div className="grid grid-cols-3 gap-[8px]">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={index}
                      className="min-h-[88px] rounded-[16px] bg-secondary-900"
                    />
                  ))}
                </div>
              </div>
              <div>
                <SectionTitle
                  action={
                    <p className="text-body-13 font-[#777777]">
                      최신 업데이트 : 7/19 18:00
                    </p>
                  }
                >
                  스트리밍 리스트
                </SectionTitle>
                <div className="rounded-[16px] bg-amber-200 w-full h-[440px]"></div>
              </div>
            </>
          )}
          {/* {activeTab === 1 && <AlbumTab />}
          {activeTab === 2 && <GuideTab />}
          {activeTab === 3 && <NoticeTab />} */}
        </section>
      </main>
    </>
  );
}
