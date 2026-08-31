'use client';

import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { CategoryTabs } from '@/components/common/CategoryTabs';
import ComingSoon from '@/components/common/ComingSoon';
import FloatingShareButton from '@/components/common/FloatingShareButton';
import { HeaderIconButton } from '@/components/common/HeaderIconButton';
import { PageHeader } from '@/components/common/PageHeader';
import { UnderlineTabs } from '@/components/common/UnderlineTabs';
import type { FollowAccountCategory } from '@/constants/x-guide';
import XFollowAccountList from './XFollowAccountList';

const X_GUIDE_TABS = [
  { id: 'account', label: '계정 사용 가이드' },
  { id: 'hashtag', label: '해시태그 가이드' },
  { id: 'follow', label: '필수 팔로우 계정' },
] as const;

const FOLLOW_CATEGORY_TABS = [
  { id: 'all', label: '전체' },
  { id: 'official', label: '공식 계정' },
  { id: 'help', label: '덕질 도움 계정' },
  { id: 'report', label: '신고 계정' },
] as const;

type XGuideTab = (typeof X_GUIDE_TABS)[number]['id'];

function isXGuideTab(value: string | null): value is XGuideTab {
  return X_GUIDE_TABS.some((tab) => tab.id === value);
}

function isFollowAccountCategory(
  value: string | null,
): value is FollowAccountCategory {
  return FOLLOW_CATEGORY_TABS.some((tab) => tab.id === value);
}

export default function XGuideContainer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const categoryParam = searchParams.get('category');
  const activeTab: XGuideTab = isXGuideTab(tabParam) ? tabParam : 'account';
  const activeFollowCategory: FollowAccountCategory = isFollowAccountCategory(
    categoryParam,
  )
    ? categoryParam
    : 'all';

  const updateSearchParams = (
    nextTab: XGuideTab,
    nextCategory?: FollowAccountCategory,
  ) => {
    const params = new URLSearchParams(searchParams.toString());
    const category = nextCategory ?? null;

    params.set('tab', nextTab);

    if (nextTab === 'follow') {
      params.set(
        'category',
        isFollowAccountCategory(category) ? category : 'all',
      );
    } else {
      params.delete('category');
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <main>
      <PageHeader
        title="X 활동 가이드"
        leftAction={
          <HeaderIconButton
            label="홈으로 가기"
            align="start"
            onClick={() => router.push('/')}
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

      <UnderlineTabs
        tabs={X_GUIDE_TABS}
        value={activeTab}
        onChange={(tab) => updateSearchParams(tab)}
        idPrefix="x-guide-tab"
        panelIdPrefix="x-guide-panel"
        className="sticky top-[env(safe-area-inset-top)] z-40 bg-background"
      />

      <section
        id={`x-guide-panel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`x-guide-tab-${activeTab}`}
      >
        {activeTab === 'follow' && (
          <div className="sticky top-[calc(44px+env(safe-area-inset-top))] z-30 -mx-5 bg-background pt-[16px] pb-[12px]">
            <CategoryTabs
              tabs={FOLLOW_CATEGORY_TABS}
              value={activeFollowCategory}
              onChange={(category) => updateSearchParams('follow', category)}
              idPrefix="x-follow-category-tab"
              panelIdPrefix="x-follow-category-panel"
            />
          </div>
        )}

        {activeTab === 'follow' ? (
          <XFollowAccountList category={activeFollowCategory} />
        ) : (
          <ComingSoon
            description={`조금만 기다려주세요\nVIP가 더 쉽게 응원할 수 있도록 안내를 준비하고 있어요.`}
          />
        )}
      </section>

      <FloatingShareButton title="X 활동 가이드" />
    </main>
  );
}
