'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { CategoryTabs } from '@/components/common/CategoryTabs';
import type { VoteCategory } from '@/types/vote';
import VoteCategoryContent from './VoteCategoryContent';

interface VoteCategoryContainerProps {
  stickyRenderKey?: number;
}

const VOTE_CATEGORY_TABS = [
  { id: 'all', label: '전체' },
  { id: 'awards', label: '시상식' },
  { id: 'music-show', label: '음악방송' },
  { id: 'anniversary', label: '기념일' },
  { id: 'etc', label: '기타' },
] as const;

function isVoteCategory(value: string | null): value is VoteCategory {
  return VOTE_CATEGORY_TABS.some((tab) => tab.id === value);
}

export default function VoteCategoryContainer({
  stickyRenderKey = 0,
}: VoteCategoryContainerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const activeCategory: VoteCategory = isVoteCategory(categoryParam)
    ? categoryParam
    : 'all';

  const handleCategoryChange = (category: VoteCategory) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('category', category);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <section>
      <div className="sticky top-[calc(44px+env(safe-area-inset-top))] z-30 -mx-5 bg-background py-[16px]">
        <CategoryTabs
          key={stickyRenderKey}
          tabs={VOTE_CATEGORY_TABS}
          value={activeCategory}
          onChange={handleCategoryChange}
          idPrefix="vote-category-tab"
          panelIdPrefix="vote-category-panel"
        />
      </div>

      <div
        id={`vote-category-panel-${activeCategory}`}
        role="tabpanel"
        aria-labelledby={`vote-category-tab-${activeCategory}`}
      >
        <VoteCategoryContent category={activeCategory} />
      </div>
    </section>
  );
}
