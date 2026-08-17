'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { ComponentType } from 'react';
import { CategoryTabs } from '@/components/common/CategoryTabs';
import MusicGuideStreaming from './MusicGuideStreaming';
import MusicGuideDownload from './MusicGuideDownload';
import MusicGuideReplay from './MusicGuideReplay';
import MusicGuideMakeId from './MusicGuideMakeId';
import MusicGuideKChart from './MusicGuideKChart';

const GUIDE_TABS = [
  { id: 'streaming', label: '스트리밍' },
  // { id: 'download', label: '다운로드' },
  // { id: 'music-video', label: '뮤비 반복재생' },
  // { id: 'account', label: '아이디 생성' },
  // { id: 'melon-kchart', label: '멜론 K차트' },
] as const;

type GuideTab = (typeof GUIDE_TABS)[number]['id'];

const GUIDE_CONTENT = {
  streaming: MusicGuideStreaming,
  // download: MusicGuideDownload,
  // 'music-video': MusicGuideReplay,
  // account: MusicGuideMakeId,
  // 'melon-kchart': MusicGuideKChart,
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
      <div className="sticky top-[calc(44px+env(safe-area-inset-top))] z-30 -mx-5 bg-background pt-[16px] pb-[12px]">
        <CategoryTabs
          tabs={GUIDE_TABS}
          value={activeTab}
          onChange={handleTabChange}
          idPrefix="guide-tab"
          panelIdPrefix="guide-panel"
        />
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
