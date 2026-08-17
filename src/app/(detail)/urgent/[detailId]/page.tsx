'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { CategoryBadge } from '@/components/common/CategoryBadge';
import CommonErrorScreen from '@/components/common/CommonErrorScreen';
import FloatingShareButton from '@/components/common/FloatingShareButton';
import { HeaderIconButton } from '@/components/common/HeaderIconButton';
import LoadingScreen from '@/components/common/LoadingScreen';
import { PageHeader } from '@/components/common/PageHeader';
import { getMusicGuideLinks } from '@/constants/music-guide';
import { useMusicDetailQuery } from '@/hooks/queries/useMusicQuery';
import { useVoteDetailQuery } from '@/hooks/queries/useVoteQuery';
import type { MusicDetailResponse } from '@/types/music';
import type { VoteDetailResponse } from '@/types/vote';
import { formatDateTimeToMinute } from '@/utils/date';

type MenuType = 'MUSIC' | 'VOTE';

function isMenuType(value: string | null): value is MenuType {
  return value === 'MUSIC' || value === 'VOTE';
}

function isMusicDetailData(
  menuType: MenuType,
  detail: MusicDetailResponse | VoteDetailResponse,
): detail is MusicDetailResponse {
  return menuType === 'MUSIC' && 'songName' in detail;
}

export default function UrgentDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { detailId } = useParams<{ detailId: string }>();
  const menuTypeParam = searchParams.get('menuType')?.toUpperCase() ?? null;
  const menuType = isMenuType(menuTypeParam) ? menuTypeParam : null;
  const musicDetailQuery = useMusicDetailQuery(detailId, menuType === 'MUSIC');
  const voteDetailQuery = useVoteDetailQuery(detailId, menuType === 'VOTE');
  const carouselRef = useRef<HTMLDivElement>(null);
  const pageTitleRef = useRef<HTMLHeadingElement>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showHeaderTitle, setShowHeaderTitle] = useState(false);
  const activeQuery =
    menuType === 'MUSIC'
      ? musicDetailQuery
      : menuType === 'VOTE'
        ? voteDetailQuery
        : null;
  const detail = activeQuery?.data;

  useEffect(() => {
    const pageTitle = pageTitleRef.current;

    if (!pageTitle || !detail) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowHeaderTitle(!entry.isIntersecting),
      { rootMargin: '-56px 0px 0px' },
    );

    observer.observe(pageTitle);

    return () => observer.disconnect();
  }, [detail]);

  if (!menuType) {
    return <CommonErrorScreen message="잘못된 상세 경로예요." />;
  }

  if (activeQuery?.isPending) {
    return <LoadingScreen label="총공 상세 불러오는 중" />;
  }

  if (activeQuery?.isError || !detail) {
    return <CommonErrorScreen />;
  }

  const isMusicDetail = isMusicDetailData(menuType, detail);
  const imageUrls = detail.imageUrls;
  const musicGuideLinks = isMusicDetail
    ? getMusicGuideLinks(detail.category, detail.platformNames).filter(
        (guide) =>
          detail.guides.some((registeredGuide) =>
            registeredGuide.title
              .toLowerCase()
              .includes(guide.title.toLowerCase()),
          ),
      )
    : [];
  const voteGuideLinks = !isMusicDetail
    ? detail.guides.map((guide) => ({
        id: String(guide.guideId),
        title: guide.title,
        description: '투표 가이드',
        href: `/vote/guide/${guide.guideId}`,
      }))
    : [];
  const hasGuides = musicGuideLinks.length > 0 || voteGuideLinks.length > 0;

  const handleImageScroll = () => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    const slideWidth = carousel.clientWidth + 12;
    const nextIndex = Math.round(carousel.scrollLeft / slideWidth);

    setActiveImageIndex(Math.min(nextIndex, imageUrls.length - 1));
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
    <main data-detail-id={detailId} data-menu-type={menuType} className="-mx-5">
      <PageHeader
        sticky
        className="bg-secondary-950 px-5"
        title={detail.title}
        titleClassName={`transition-opacity duration-200 ${
          showHeaderTitle ? 'opacity-100' : 'opacity-0'
        }`}
        leftAction={
          <HeaderIconButton
            label="뒤로가기"
            align="start"
            onClick={() => router.back()}
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

      <section className="bg-secondary-950 px-5 pb-[24px]">
        <div className="pt-[20px]">
          <CategoryBadge category={detail.category} />

          <h1
            ref={pageTitleRef}
            className="mt-[20px] whitespace-pre-line text-[22px] font-bold tracking-[-0.04em] text-secondary-1"
          >
            {detail.title}
          </h1>

          <dl className="mt-[20px] grid grid-cols-[72px_minmax(0,1fr)] gap-x-[16px] gap-y-[10px] text-body-13">
            {isMusicDetail ? (
              <>
                {detail.songName && (
                  <>
                    <dt className="text-secondary-300">곡명</dt>
                    <dd className="font-bold text-secondary-100">
                      {detail.songName}
                    </dd>
                  </>
                )}

                <dt className="text-secondary-300">플랫폼</dt>
                <dd className="font-medium text-secondary-100">
                  {detail.platformNames.join(', ')}
                </dd>

                {detail.eventAt && (
                  <>
                    <dt className="text-secondary-300">총공 시간</dt>
                    <dd className="font-medium text-secondary-100">
                      {formatDateTimeToMinute(detail.eventAt)}
                    </dd>
                  </>
                )}
              </>
            ) : (
              <>
                {detail.rewardDescription && (
                  <>
                    <dt className="text-secondary-300">리워드</dt>
                    <dd className="font-bold text-secondary-100">
                      {detail.rewardDescription}
                    </dd>
                  </>
                )}

                <dt className="text-secondary-300">플랫폼</dt>
                <dd className="font-medium text-secondary-100">
                  {detail.platformNames.join(', ')}
                </dd>

                {detail.eventStartAt && (
                  <>
                    <dt className="text-secondary-300">시작 시간</dt>
                    <dd className="font-medium text-secondary-100">
                      {formatDateTimeToMinute(detail.eventStartAt)}
                    </dd>
                  </>
                )}

                {detail.eventEndAt && (
                  <>
                    <dt className="text-secondary-300">마감 시간</dt>
                    <dd className="font-medium text-secondary-100">
                      {formatDateTimeToMinute(detail.eventEndAt)}
                    </dd>
                  </>
                )}
              </>
            )}
          </dl>

          {isMusicDetail && detail.description && (
            <p className="mt-[20px] whitespace-pre-line text-body-13 text-secondary-200">
              {detail.description}
            </p>
          )}

          {!isMusicDetail && detail.platformUrl && (
            <a
              href={detail.platformUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-[20px] flex w-full items-center justify-center rounded-[12px] bg-main py-[14px] text-body-15 font-bold text-secondary-950"
            >
              {detail.ctaButtonLabel || '투표하러 가기'}
            </a>
          )}
        </div>
      </section>

      <div className="h-[6px] w-full bg-secondary-900" />

      {hasGuides && (
        <>
          <section className="bg-secondary-950 px-5 py-[24px]">
            <div className="mb-[16px] flex items-baseline gap-[8px]">
              <h2 className="shrink-0 text-title-15 font-bold text-secondary-1">
                가이드 바로 가기
              </h2>
              <p className="text-body-11 font-medium text-secondary-300">
                처음 참여하는 VIP라면 가이드를 먼저 확인해주세요!
              </p>
            </div>

            {isMusicDetail ? (
              <div
                className={`grid gap-[8px] ${
                  musicGuideLinks.length === 1 ? 'grid-cols-1' : 'grid-cols-2'
                }`}
              >
                {musicGuideLinks.map((guide) => (
                  <Link
                    key={guide.id}
                    href={guide.href}
                    className="flex min-w-0 items-center rounded-[12px] border border-[rgba(255,255,255,0.08)] bg-secondary-900 py-[16px] pr-[8px] pl-[12px] text-left"
                  >
                    <Image
                      src={guide.iconSrc}
                      alt=""
                      width={40}
                      height={40}
                      aria-hidden="true"
                      className="h-[40px] w-[40px] shrink-0 rounded-full"
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
                      src="/icon/line/arrow-right_gray-24.svg"
                      alt=""
                      width={24}
                      height={24}
                      aria-hidden="true"
                      className="shrink-0"
                    />
                  </Link>
                ))}
              </div>
            ) : (
              <div
                className={`grid gap-[8px] ${
                  voteGuideLinks.length === 1 ? 'grid-cols-1' : 'grid-cols-2'
                }`}
              >
                {voteGuideLinks.map((guide) => (
                  <Link
                    key={guide.id}
                    href={guide.href}
                    className="flex min-w-0 items-center rounded-[12px] border border-[rgba(255,255,255,0.08)] bg-secondary-900 p-[16px] text-left"
                  >
                    <span className="min-w-0 flex-1">
                      <strong className="block line-clamp-2 text-body-13 font-bold text-secondary-1">
                        {guide.title}
                      </strong>
                      <span className="block text-body-11 text-secondary-300">
                        {guide.description}
                      </span>
                    </span>
                    <Image
                      src="/icon/line/arrow-right_gray-24.svg"
                      alt=""
                      width={24}
                      height={24}
                      aria-hidden="true"
                      className="shrink-0"
                    />
                  </Link>
                ))}
              </div>
            )}
          </section>
          <div className="h-[6px] w-full bg-secondary-900" />
        </>
      )}

      {(detail.checklist.length > 0 || imageUrls.length > 0) && (
        <section className="bg-secondary-950 px-5 py-[24px]">
          {detail.checklist.length > 0 && (
            <>
              <h2 className="text-title-15 font-bold text-secondary-1">
                체크 사항
              </h2>
              <ul className="mt-[12px] flex flex-col gap-[6px] rounded-[16px] bg-secondary-900 p-[16px]">
                {detail.checklist.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-[8px] text-body-12 text-secondary-200"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[1px] text-body-13 font-medium text-secondary-500"
                    >
                      ✓
                    </span>
                    <span className="text-body-13 font-medium text-secondary-200">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {imageUrls.length > 0 && (
            <>
              <h2
                className={`${
                  detail.checklist.length > 0 ? 'mt-[24px]' : ''
                } text-title-15 font-bold text-secondary-1`}
              >
                관련 이미지
              </h2>
              <div
                ref={carouselRef}
                onScroll={handleImageScroll}
                className="scrollbar-hidden mt-[16px] flex snap-x snap-mandatory gap-[12px] overflow-x-auto overscroll-x-contain"
              >
                {imageUrls.map((imageUrl, index) => (
                  <div
                    key={imageUrl}
                    className="relative aspect-square w-full shrink-0 snap-center overflow-hidden rounded-[16px] bg-secondary-800"
                  >
                    <Image
                      src={imageUrl}
                      alt={`관련 이미지 ${index + 1}`}
                      fill
                      unoptimized
                      sizes="(max-width: 430px) 100vw, 390px"
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>

              {imageUrls.length > 1 && (
                <div
                  className="mt-[12px] flex justify-center gap-[6px]"
                  aria-label="관련 이미지 페이지"
                >
                  {imageUrls.map((imageUrl, index) => (
                    <button
                      key={imageUrl}
                      type="button"
                      aria-label={`${index + 1}번 이미지 보기`}
                      aria-current={
                        activeImageIndex === index ? 'true' : undefined
                      }
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
            </>
          )}
        </section>
      )}

      <FloatingShareButton title={detail.title} />
    </main>
  );
}
