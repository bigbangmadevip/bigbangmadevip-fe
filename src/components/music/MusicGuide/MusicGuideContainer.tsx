'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { ComponentType } from 'react';
import MusicGuideStreaming from './MusicGuideStreaming';
import MusicGuideDownload from './MusicGuideDownload';
import MusicGuideReplay from './MusicGuideReplay';
import MusicGuideMakeId from './MusicGuideMakeId';
import MusicGuideKChart from './MusicGuideKChart';

const GUIDE_TABS = [
  { id: 'streaming', label: '스트리밍' },
  { id: 'download', label: '다운로드' },
  { id: 'music-video', label: '뮤비 반복재생' },
  { id: 'account', label: '아이디 생성' },
  { id: 'melon-kchart', label: '멜론 K차트' },
] as const;

type GuideTab = (typeof GUIDE_TABS)[number]['id'];

const GUIDE_CONTENT = {
  streaming: MusicGuideStreaming,
  download: MusicGuideDownload,
  'music-video': MusicGuideReplay,
  account: MusicGuideMakeId,
  'melon-kchart': MusicGuideKChart,
} satisfies Record<GuideTab, ComponentType>;

export default function MusicGuideContainer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const guideParam = searchParams.get('guide');
  const activeTab: GuideTab = GUIDE_TABS.some((tab) => tab.id === guideParam)
    ? (guideParam as GuideTab)
    : 'streaming';
  const ActiveGuide = GUIDE_CONTENT[activeTab];

  const handleTabChange = (tab: GuideTab) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('tab', 'guide');
    params.set('guide', tab);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <section>
      <div className="sticky top-[calc(44px+env(safe-area-inset-top))] z-30 -mx-5 bg-background pt-[16px]">
        <div className="scrollbar-hidden overflow-x-auto px-5 overscroll-x-contain">
          <div className="flex w-max gap-[8px] mb-[12px]" role="tablist">
            {GUIDE_TABS.map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  id={`guide-tab-${tab.id}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`guide-panel-${tab.id}`}
                  className={`shrink-0 rounded-[6px] px-[14px] py-[8px] text-body-12 ${
                    isActive
                      ? 'bg-secondary-1 font-bold text-secondary-950'
                      : 'bg-secondary-800 font-normal text-secondary-400'
                  }`}
                  onClick={() => handleTabChange(tab.id)}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 탭에 따른 내부 화면 렌더링 */}
      <div
        id={`guide-panel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`guide-tab-${activeTab}`}
        className="mt-[12px]"
      >
        <ActiveGuide />
      </div>
    </section>
  );
}
