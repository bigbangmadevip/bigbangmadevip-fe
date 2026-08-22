'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { getPlatformLabel } from '@/constants/platform';
import { getVotePlatformLabel } from '@/constants/vote-platform';
import type { UrgentDetail } from '@/types/home';

interface HomeUrgentCarouselProps {
  items: UrgentDetail[];
  now: number | null;
}

function formatRemainingTime(eventEndAt: string, now: number | null) {
  const remainingMinutes = Math.ceil(
    (new Date(eventEndAt).getTime() - (now ?? Date.now())) / 60_000,
  );

  if (!Number.isFinite(remainingMinutes)) return '';

  const safeRemainingMinutes = Math.max(remainingMinutes, 0);
  const hours = Math.floor(safeRemainingMinutes / 60);
  const minutes = safeRemainingMinutes % 60;

  if (hours > 0) {
    return `${hours}시간 ${minutes}분 남음`;
  }

  return `${minutes}분 남음`;
}

function getPlatformNames(item: UrgentDetail) {
  const getLabel =
    item.menuType === 'VOTE' ? getVotePlatformLabel : getPlatformLabel;

  return item.platformNames.map(getLabel).join(', ');
}

function scrollToSlide(
  carousel: HTMLDivElement,
  index: number,
  behavior: ScrollBehavior,
) {
  const slide = carousel.children[index] as HTMLElement | undefined;
  if (!slide) return;

  carousel.scrollTo({
    left: slide.offsetLeft - (carousel.clientWidth - slide.clientWidth) / 2,
    behavior,
  });
}

export default function HomeUrgentCarousel({
  items,
  now,
}: HomeUrgentCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollEndTimerRef = useRef<number | null>(null);
  const virtualIndexRef = useRef(1);
  const touchStartXRef = useRef(0);
  const hasDraggedRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTouching, setIsTouching] = useState(false);
  const hasMultipleItems = items.length > 1;
  const slides = hasMultipleItems
    ? [items[items.length - 1], ...items, items[0]]
    : items;
  const carouselClassName = hasMultipleItems
    ? 'scrollbar-hidden relative -mx-[20px] mb-[40px] flex w-[calc(100%_+_40px)] snap-x snap-mandatory gap-[8px] overflow-x-auto overscroll-x-contain'
    : 'mb-[40px] flex w-full overflow-hidden';
  const slideClassName = hasMultipleItems
    ? 'block min-w-[calc(100%_-_40px)] snap-center rounded-[16px] border border-main bg-[rgba(255,251,31,0.04)] p-[16px]'
    : 'block w-full rounded-[16px] border border-main bg-[rgba(255,251,31,0.04)] p-[16px]';

  useLayoutEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || !hasMultipleItems) return;

    virtualIndexRef.current = 1;
    scrollToSlide(carousel, 1, 'auto');
  }, [hasMultipleItems, items.length]);

  useEffect(() => {
    if (!hasMultipleItems || isTouching) return;

    const timer = window.setTimeout(() => {
      const carousel = carouselRef.current;
      if (!carousel) return;

      scrollToSlide(carousel, virtualIndexRef.current + 1, 'smooth');
    }, 3_000);

    return () => window.clearTimeout(timer);
  }, [activeIndex, hasMultipleItems, isTouching]);

  useEffect(() => {
    return () => {
      if (scrollEndTimerRef.current !== null) {
        window.clearTimeout(scrollEndTimerRef.current);
      }
    };
  }, []);

  const handleScroll = () => {
    const carousel = carouselRef.current;
    if (!carousel || carousel.clientWidth === 0) return;

    const viewportCenter = carousel.scrollLeft + carousel.clientWidth / 2;
    const virtualIndex = Array.from(carousel.children).reduce(
      (closestIndex, child, index) => {
        const slide = child as HTMLElement;
        const closestSlide = carousel.children[closestIndex] as HTMLElement;
        const slideCenter = slide.offsetLeft + slide.clientWidth / 2;
        const closestCenter =
          closestSlide.offsetLeft + closestSlide.clientWidth / 2;

        return Math.abs(slideCenter - viewportCenter) <
          Math.abs(closestCenter - viewportCenter)
          ? index
          : closestIndex;
      },
      0,
    );
    virtualIndexRef.current = virtualIndex;
    const nextIndex = hasMultipleItems
      ? (virtualIndex - 1 + items.length) % items.length
      : 0;
    setActiveIndex(nextIndex);

    if (!hasMultipleItems) return;
    if (scrollEndTimerRef.current !== null) {
      window.clearTimeout(scrollEndTimerRef.current);
    }

    scrollEndTimerRef.current = window.setTimeout(() => {
      if (virtualIndex === 0) {
        virtualIndexRef.current = items.length;
        scrollToSlide(carousel, items.length, 'auto');
      } else if (virtualIndex === items.length + 1) {
        virtualIndexRef.current = 1;
        scrollToSlide(carousel, 1, 'auto');
      }
    }, 100);
  };

  return (
    <div
      ref={carouselRef}
      onScroll={handleScroll}
      onTouchStart={(event) => {
        touchStartXRef.current = event.touches[0]?.clientX ?? 0;
        hasDraggedRef.current = false;
        setIsTouching(true);
      }}
      onTouchMove={(event) => {
        const currentX = event.touches[0]?.clientX ?? touchStartXRef.current;
        if (Math.abs(currentX - touchStartXRef.current) > 8) {
          hasDraggedRef.current = true;
        }
      }}
      onTouchEnd={() => setIsTouching(false)}
      className={carouselClassName}
    >
      {slides.map((item, index) => (
        <Link
          key={`${item.menuType}-${item.detailId}-${index}`}
          href={{
            pathname: `/urgent/${item.detailId}`,
            query: { menuType: item.menuType },
          }}
          onClick={(event) => {
            if (!hasDraggedRef.current) return;
            event.preventDefault();
            hasDraggedRef.current = false;
          }}
          className={slideClassName}
        >
          <p className="mb-[20px] text-body-12 font-medium">
            🚨 놓치면 안되는 VIP 긴급 총공
          </p>

          <div className="flex items-center justify-between gap-[12px]">
            <div className="min-w-0">
              <p className="mb-[2px] line-clamp-2 text-title-17 font-bold">
                {item.title}
              </p>

              <div className="flex min-w-0 items-center gap-[2px]">
                {item.eventEndAt && (
                  <Image
                    src="/icon/line/clock_red-16.svg"
                    alt=""
                    width={16}
                    height={16}
                    aria-hidden="true"
                    className="shrink-0"
                  />
                )}
                {item.eventEndAt && (
                  <>
                    <span className="shrink-0 text-body-13 text-accent-red">
                      {formatRemainingTime(item.eventEndAt, now)}
                    </span>
                    <span className="px-[6px] text-body-13 font-bold text-secondary-300">
                      |
                    </span>
                  </>
                )}
                <span className="truncate text-body-13 font-medium text-secondary-300">
                  {getPlatformNames(item)}
                </span>
              </div>
            </div>

            <Image
              src="/icon/line/arrow-right_yellow-bg.svg"
              alt=""
              width={32}
              height={32}
              aria-hidden="true"
              className="shrink-0"
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
