'use client';

import { Suspense } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { PageHeader } from '@/components/common/PageHeader';
import { UnderlineTabs } from '@/components/common/UnderlineTabs';
import MusicGuideContainer from '@/components/music/MusicGuide/MusicGuideContainer';
import MusicNoticeContainer from '@/components/music/MusicNotice/MusicNoticeContainer';
import MusicStreamingContainer from '@/components/music/MusicStreamingContainer';

const MUSIC_TABS = [
  { id: 'streaming', label: '스트리밍' },
  { id: 'album', label: '앨범 구매' },
  { id: 'guide', label: '음원 가이드' },
  { id: 'notice', label: '음총 공지' },
] as const;

type MusicTab = (typeof MUSIC_TABS)[number]['id'];

function isMusicTab(value: string | null): value is MusicTab {
  return MUSIC_TABS.some((tab) => tab.id === value);
}

function MusicPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const activeTab: MusicTab = isMusicTab(tabParam) ? tabParam : 'streaming';

  const handleTabChange = (tab: MusicTab) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('tab', tab);

    if (tab !== 'guide') {
      params.delete('guide');
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      <main>
        <PageHeader title="음원" />
        {/* TABS */}
        <UnderlineTabs
          tabs={MUSIC_TABS}
          value={activeTab}
          onChange={handleTabChange}
          idPrefix="music-tab"
          panelIdPrefix="music-panel"
          className="sticky top-[env(safe-area-inset-top)] z-40 bg-background"
        />

        {/* 탭 */}
        <section
          id={`music-panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`music-tab-${activeTab}`}
        >
          {/* 스트리밍 탭 화면 */}
          {activeTab === 'streaming' && <MusicStreamingContainer />}
          {/* {activeTab === 'album' && <AlbumTab />} */}
          {activeTab === 'guide' && <MusicGuideContainer />}
          {activeTab === 'notice' && <MusicNoticeContainer />}
        </section>
      </main>
    </>
  );
}

export default function MusicPage() {
  return (
    <Suspense fallback={null}>
      <MusicPageContent />
    </Suspense>
  );
}
