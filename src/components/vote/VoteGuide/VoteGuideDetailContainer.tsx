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
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [guide.sections]);

  return (
    <main>
      <PageHeader
        title={guide.title}
        sticky
        leftAction={
          <HeaderIconButton label="뒤로가기" align="start" onClick={handleBack}>
            <Image
              src="/icon/arrow-left_white-24.svg"
              alt=""
              width={24}
              height={24}
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
          <div className="flex rounded-full bg-secondary-800 p-[4px]">
            <button
              type="button"
              onClick={() => handleTabClick(ALL_TAB_ID)}
              className={`min-w-0 flex-1 rounded-full px-[10px] py-[10px] text-body-13 ${
                activeTab === ALL_TAB_ID
                  ? 'bg-secondary-950 font-bold text-secondary-1'
                  : 'font-normal text-secondary-400'
              }`}
            >
              전체
            </button>

            {guide.sections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => handleTabClick(section.id)}
                className={`min-w-0 flex-1 rounded-full px-[10px] py-[10px] text-body-13 ${
                  activeTab === section.id
                    ? 'bg-secondary-950 font-bold text-secondary-1'
                    : 'font-normal text-secondary-400'
                }`}
              >
                {section.label}
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
            unoptimized
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
                      key={image.src}
                      src={image}
                      alt={`${section.label} ${index + 1}`}
                      unoptimized
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
