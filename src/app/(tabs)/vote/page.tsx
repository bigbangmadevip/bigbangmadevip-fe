'use client';

import { Suspense } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { PageHeader } from '@/components/common/PageHeader';
import { UnderlineTabs } from '@/components/common/UnderlineTabs';
import VoteGuideContainer from '@/components/vote/VoteGuide/VoteGuideContainer';
import VotePlanContainer from '@/components/vote/VotePlan/VotePlanContainer';
import VoteDailyContainer from '@/components/vote/VoteDailyContainer';
import VoteNoticeContainer from '@/components/vote/VoteNotice/VoteNoticeContainer';

const VOTE_TABS = [
  { id: 'daily', label: '오늘의 투표' },
  { id: 'plan', label: '투표 플랜' },
  { id: 'guide', label: '투표 가이드' },
  { id: 'notice', label: '투총 공지' },
] as const;

type VoteTab = (typeof VOTE_TABS)[number]['id'];

function isVoteTab(value: string | null): value is VoteTab {
  return VOTE_TABS.some((tab) => tab.id === value);
}

function VotePageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const activeTab: VoteTab = isVoteTab(tabParam) ? tabParam : 'daily';

  const handleTabChange = (tab: VoteTab) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('tab', tab);

    if (tab !== 'daily') {
      params.delete('category');
    }

    if (tab !== 'guide') {
      params.delete('guide');
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <main>
      <PageHeader title="투표" />

      <UnderlineTabs
        tabs={VOTE_TABS}
        value={activeTab}
        onChange={handleTabChange}
        idPrefix="vote-tab"
        panelIdPrefix="vote-panel"
        className="sticky top-[env(safe-area-inset-top)] z-40 bg-background"
      />

      <section
        id={`vote-panel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`vote-tab-${activeTab}`}
      >
        {activeTab === 'daily' && <VoteDailyContainer />}
        {activeTab === 'plan' && <VotePlanContainer />}
        {activeTab === 'guide' && <VoteGuideContainer />}
        {activeTab === 'notice' && <VoteNoticeContainer />}
      </section>
    </main>
  );
}

export default function VotePage() {
  return (
    <Suspense fallback={null}>
      <VotePageContent />
    </Suspense>
  );
}
