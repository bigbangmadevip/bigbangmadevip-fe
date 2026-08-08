'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const GUIDE_TABS = [
  { id: 'streaming', label: '스트리밍' },
  { id: 'download', label: '다운로드' },
  { id: 'music-video', label: '뮤비 반복재생' },
  { id: 'account', label: '아이디 생성' },
] as const;

type GuideTab = (typeof GUIDE_TABS)[number]['id'];

export default function MusicGuideContainer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const guideParam = searchParams.get('guide');
  const activeTab: GuideTab = GUIDE_TABS.some(
    (tab) => tab.id === guideParam,
  )
    ? (guideParam as GuideTab)
    : 'streaming';

  const handleTabChange = (tab: GuideTab) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('tab', 'guide');
    params.set('guide', tab);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <section>
      <div className="scrollbar-hidden -mx-5 overflow-x-auto px-5 overscroll-x-contain">
        <div className="flex w-max gap-[8px]" role="tablist">
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
                className={`h-[52px] shrink-0 rounded-[16px] px-[24px] text-body-14 ${
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

      <div
        id={`guide-panel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`guide-tab-${activeTab}`}
        className="mt-[24px]"
      />
    </section>
  );
}
