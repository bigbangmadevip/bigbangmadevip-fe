'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import FloatingShareButton from '@/components/common/FloatingShareButton';
import { HeaderIconButton } from '@/components/common/HeaderIconButton';
import { PageHeader } from '@/components/common/PageHeader';
import type { VoteGuideDetail } from '@/constants/vote-guide-detail';

type VoteGuideDetailContainerProps = {
  guide: VoteGuideDetail;
};

const ALL_TAB_ID = 'all';

export default function VoteGuideDetailContainer({
  guide,
}: VoteGuideDetailContainerProps) {
  const router = useRouter();
  const contentTopRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(ALL_TAB_ID);

  const handleBack = () => {
    const hasSameOriginReferrer = (() => {
      if (!document.referrer) return false;

      try {
        return new URL(document.referrer).origin === window.location.origin;
      } catch {
        return false;
      }
    })();

    if (hasSameOriginReferrer) {
      router.back();
      return;
    }

    router.replace('/vote?tab=guide');
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);

    const target =
      tabId === ALL_TAB_ID
        ? contentTopRef.current
        : document.getElementById(`vote-guide-${tabId}`);

    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    if (guide.sections.length === 0) return;

    const scrollToHash = () => {
      const targetId = decodeURIComponent(window.location.hash.slice(1));
      const target = targetId ? document.getElementById(targetId) : null;

      if (!target) return;

      const sectionId = targetId.replace('vote-guide-', '');
      setActiveTab(sectionId);
      window.requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: 'auto', block: 'start' });
      });
    };

    const handleScroll = () => {
      const activationLine =
        Number.parseFloat(
          getComputedStyle(document.documentElement).fontSize || '16',
        ) + 125;
      let nextTab = ALL_TAB_ID;

      for (const section of guide.sections) {
        const element = document.getElementById(`vote-guide-${section.id}`);

        if (element && element.getBoundingClientRect().top <= activationLine) {
          nextTab = section.id;
        }
      }

      setActiveTab(nextTab);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('hashchange', scrollToHash);
    scrollToHash();
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', scrollToHash);
    };
  }, [guide.sections]);

  const tabs = [
    { id: ALL_TAB_ID, label: '전체' },
    ...guide.sections.map((section) => ({
      id: section.id,
      label: section.label,
    })),
  ];
  const activeTabIndex = Math.max(
    tabs.findIndex((tab) => tab.id === activeTab),
    0,
  );

  return (
    <main>
      <PageHeader
        title={guide.title}
        sticky
        leftAction={
          <HeaderIconButton label="뒤로가기" align="start" onClick={handleBack}>
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

      {guide.sections.length > 0 && (
        <nav
          aria-label="투표 가이드 바로가기"
          className="sticky top-[calc(56px+env(safe-area-inset-top))] z-30 -mx-5 bg-background px-5 py-[12px]"
        >
          <div
            className="relative grid rounded-full bg-secondary-800 p-[4px]"
            style={{
              gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))`,
            }}
          >
            <div
              aria-hidden="true"
              className="absolute bottom-[4px] left-[4px] top-[4px] rounded-full bg-secondary-950 transition-transform duration-300 ease-out"
              style={{
                width: `calc((100% - 8px) / ${tabs.length})`,
                transform: `translateX(${activeTabIndex * 100}%)`,
              }}
            />

            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabClick(tab.id)}
                className={`relative z-10 min-w-0 rounded-full px-[10px] py-[10px] text-body-13 transition-colors duration-300 ${
                  activeTab === tab.id
                    ? 'font-bold text-secondary-1'
                    : 'font-normal text-secondary-400'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </nav>
      )}

      <div ref={contentTopRef} className="scroll-mt-[140px] pt-[12px]">
        {guide.overviewImage && (
          <Image
            src={guide.overviewImage}
            alt={`${guide.title} 전체 안내`}
            priority
            width={400}
            height={200}
            className="h-auto w-full rounded-[12px]"
          />
        )}

        {!guide.overviewImage && guide.sections.length === 0 && (
          <div className="flex min-h-[60dvh] items-center justify-center rounded-[12px] bg-secondary-900 text-body-13 text-secondary-500">
            가이드 이미지 영역
          </div>
        )}

        <div className={guide.overviewImage ? 'mt-[12px]' : ''}>
          {guide.sections.map((section) => (
            <section
              key={section.id}
              id={`vote-guide-${section.id}`}
              className="scroll-mt-[140px] py-[6px]"
            >
              {section.images?.length ? (
                <div className="flex flex-col gap-[12px]">
                  {section.images.map((image, index) => (
                    <Image
                      key={`${image[0]}-${index}`}
                      src={image}
                      alt={`${section.label} ${index + 1}`}
                      loading="lazy"
                      width={400}
                      height={1000}
                      className="h-auto w-full rounded-[12px]"
                    />
                  ))}
                </div>
              ) : (
                <div className="flex min-h-[320px] items-center justify-center rounded-[12px] bg-secondary-900 text-body-13 text-secondary-500">
                  {section.label} 이미지 영역
                </div>
              )}
            </section>
          ))}
        </div>
      </div>

      <FloatingShareButton title={guide.title} />
    </main>
  );
}
