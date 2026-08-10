'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const URGENT_DETAIL_MOCK = {
  category: '다운로드',
  title: '오늘 저녁 8시 30분\n멜론 개별곡 다운로드 총공',
  songName: '타이틀 곡 <봄여름가을겨울>',
  platform: '멜론',
  eventAt: '2026. 07. 14 20:30',
  guides: [
    { id: 'melon', title: '멜론', description: '다운로드 가이드' },
    { id: 'genie', title: '지니', description: '다운로드 가이드' },
    { id: 'bugs', title: '벅스', description: '다운로드 가이드' },
    { id: 'flo', title: 'FLO', description: '다운로드 가이드' },
  ],
  checklist: [
    'Too Bad, Home sweet Home, Live Fast Die Slow 스트리밍 필수',
    '다운로드 파일 삭제 확인 후 진행',
  ],
  images: ['', '', ''],
};

export default function UrgentDetailPage() {
  const router = useRouter();
  const { detailId } = useParams<{ detailId: string }>();
  const carouselRef = useRef<HTMLDivElement>(null);
  const pageTitleRef = useRef<HTMLHeadingElement>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showHeaderTitle, setShowHeaderTitle] = useState(false);

  useEffect(() => {
    const pageTitle = pageTitleRef.current;

    if (!pageTitle) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowHeaderTitle(!entry.isIntersecting),
      { rootMargin: '-52px 0px 0px' },
    );

    observer.observe(pageTitle);

    return () => observer.disconnect();
  }, []);

  const handleImageScroll = () => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    const slideWidth = carousel.clientWidth + 12;
    const nextIndex = Math.round(carousel.scrollLeft / slideWidth);

    setActiveImageIndex(
      Math.min(nextIndex, URGENT_DETAIL_MOCK.images.length - 1),
    );
  };

  const handleIndicatorClick = (index: number) => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    carousel.scrollTo({
      left: index * (carousel.clientWidth + 12),
      behavior: 'smooth',
    });
  };

  return (
    <main data-detail-id={detailId} className="-mx-5">
      <header className="sticky top-[env(safe-area-inset-top)] z-40 flex h-[52px] items-center bg-secondary-950 px-5">
        <button
          type="button"
          className="z-10 flex h-[44px] w-[44px] shrink-0 items-center justify-start"
          aria-label="뒤로가기"
          onClick={() => router.back()}
        >
          <Image
            src="/icon/arrow-left_white-24.svg"
            alt=""
            width={24}
            height={24}
            aria-hidden="true"
          />
        </button>

        <p
          aria-hidden={!showHeaderTitle}
          className={`absolute right-[64px] left-[64px] truncate text-center text-title-17 font-bold text-secondary-1 transition-opacity duration-200 ${
            showHeaderTitle ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {URGENT_DETAIL_MOCK.title.replace('\n', ' ')}
        </p>
      </header>
      <section className="bg-secondary-950 px-5 pb-[24px]">
        <div className="pt-[20px]">
          <span className="inline-flex rounded-[4px] bg-[rgba(48,219,238,0.5)] px-[8px] py-[2px] text-caption-10 font-medium text-secondary-1">
            {URGENT_DETAIL_MOCK.category}
          </span>

          <h1
            ref={pageTitleRef}
            className="mt-[20px] whitespace-pre-line text-[22px] font-bold tracking-[-0.04em] text-secondary-1"
          >
            {URGENT_DETAIL_MOCK.title}
          </h1>

          <dl className="mt-[20px] grid grid-cols-[56px_minmax(0,1fr)] gap-x-[16px] gap-y-[10px] text-body-13">
            <dt className="text-secondary-300">곡명</dt>
            <dd className="font-bold text-secondary-100">
              {URGENT_DETAIL_MOCK.songName}
            </dd>

            <dt className="text-secondary-300">플랫폼</dt>
            <dd className="font-medium text-secondary-100">
              {URGENT_DETAIL_MOCK.platform}
            </dd>

            <dt className="text-secondary-300">총공 시간</dt>
            <dd className="font-medium text-secondary-100">
              {URGENT_DETAIL_MOCK.eventAt}
            </dd>
          </dl>
        </div>
      </section>
      <div className="w-full h-[6px] bg-secondary-900" />
      <section className="bg-secondary-950 px-5 py-[24px]">
        <div className="mb-[16px] flex items-baseline gap-[8px]">
          <h2 className="text-title-15 font-bold text-secondary-1">
            바로 가기
          </h2>
          <p className="text-body-11 font-medium text-secondary-300">
            처음 참여하는 VIP라면 가이드를 먼저 확인해주세요!
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-[7px] gap-y-[8px]">
          {URGENT_DETAIL_MOCK.guides.map((guide) => (
            <button
              key={guide.id}
              type="button"
              className="flex min-w-0 items-center rounded-[12px] border border-[rgba(255,255,255,0.08)] bg-secondary-900 py-[16px] pr-[8px] pl-[12px] text-left"
            >
              <span
                aria-label={`${guide.title} 플랫폼 아이콘 영역`}
                className="h-[40px] w-[40px] shrink-0 rounded-full bg-secondary-700"
              />

              <span className="ml-[8px] min-w-0 flex-1">
                <strong className="block truncate text-body-13 font-bold text-secondary-1">
                  {guide.title}
                </strong>
                <span className="block truncate text-body-11 text-secondary-300">
                  {guide.description}
                </span>
              </span>

              <Image
                src="/icon/arrow-right_gray-24.svg"
                alt=""
                width={20}
                height={20}
                aria-hidden="true"
                className="shrink-0"
              />
            </button>
          ))}
        </div>
      </section>
      <div className="w-full h-[6px] bg-secondary-900" />

      <section className="bg-secondary-950 px-5 py-[24px]">
        <h2 className="text-title-15 font-bold text-secondary-1">체크 사항</h2>

        <ul className="mt-[12px] flex flex-col gap-[6px] rounded-[16px] bg-secondary-900 p-[16px]">
          {URGENT_DETAIL_MOCK.checklist.map((item) => (
            <li
              key={item}
              className="flex items-center gap-[8px] text-body-12 text-secondary-200"
            >
              <span
                aria-hidden="true"
                className="mt-[1px] text-body-13 font-medium text-secondary-500"
              >
                ✔️
              </span>
              <span className="text-body-13 font-medium text-secondary-200">
                {item}
              </span>
            </li>
          ))}
        </ul>

        <h2 className="mt-[24px] text-title-15 font-bold text-secondary-1">
          관련 이미지
        </h2>

        <div
          ref={carouselRef}
          onScroll={handleImageScroll}
          className="scrollbar-hidden mt-[16px] flex snap-x snap-mandatory gap-[12px] overflow-x-auto overscroll-x-contain"
        >
          {URGENT_DETAIL_MOCK.images.map((_, index) => (
            <div
              key={index}
              role="img"
              aria-label={`관련 이미지 ${index + 1}`}
              className="aspect-square w-full shrink-0 snap-center rounded-[16px] bg-secondary-800"
            />
          ))}
        </div>

        {URGENT_DETAIL_MOCK.images.length > 1 && (
          <div
            className="mt-[12px] flex justify-center gap-[6px]"
            aria-label="관련 이미지 페이지"
          >
            {URGENT_DETAIL_MOCK.images.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`${index + 1}번 이미지 보기`}
                aria-current={activeImageIndex === index ? 'true' : undefined}
                onClick={() => handleIndicatorClick(index)}
                className={`h-[6px] rounded-full transition-[width,background-color] ${
                  activeImageIndex === index
                    ? 'w-[24px] bg-secondary-100'
                    : 'w-[6px] bg-secondary-600'
                }`}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
