'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { CategoryTabs } from '@/components/common/CategoryTabs';
import type { VoteGuideCategory } from '@/types/vote';
import VoteGuideContent from './VoteGuideContent';

interface VoteGuideContainerProps {
  stickyRenderKey?: number;
}

const GUIDE_TABS = [
  { id: 'all', label: '전체' },
  { id: 'music-show', label: '음악방송' },
] as const;

function isVoteGuideCategory(value: string | null): value is VoteGuideCategory {
  return GUIDE_TABS.some((tab) => tab.id === value);
}

export default function VoteGuideContainer({
  stickyRenderKey = 0,
}: VoteGuideContainerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const guideParam = searchParams.get('guide');
  const activeCategory: VoteGuideCategory = isVoteGuideCategory(guideParam)
    ? guideParam
    : 'all';

  const handleTabChange = (category: VoteGuideCategory) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('tab', 'guide');
    params.set('guide', category);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <section>
      <div className="sticky top-[calc(44px+env(safe-area-inset-top))] z-30 -mx-5 bg-background pt-[16px] pb-[12px]">
        <CategoryTabs
          key={stickyRenderKey}
          tabs={GUIDE_TABS}
          value={activeCategory}
          onChange={handleTabChange}
          idPrefix="guide-tab"
          panelIdPrefix="guide-panel"
        />
      </div>

      {/* 탭에 따른 내부 화면 렌더링 */}
      <div
        id={`guide-panel-${activeCategory}`}
        role="tabpanel"
        aria-labelledby={`guide-tab-${activeCategory}`}
      >
        <VoteGuideContent category={activeCategory} />
      </div>
    </section>
  );
}
