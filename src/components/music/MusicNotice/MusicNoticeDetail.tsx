'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import FloatingShareButton from '@/components/common/FloatingShareButton';
import { HeaderIconButton } from '@/components/common/HeaderIconButton';
import LoadingScreen from '@/components/common/LoadingScreen';
import { PageHeader } from '@/components/common/PageHeader';
import { useMusicNoticeDetailQuery } from '@/hooks/queries/useMusicQuery';
import { formatDate } from '@/utils/date';

interface MusicNoticeDetailProps {
  noticeId: string;
}

export default function MusicNoticeDetail({
  noticeId,
}: MusicNoticeDetailProps) {
  const router = useRouter();
  const {
    data: notice,
    isPending,
    isError,
  } = useMusicNoticeDetailQuery(noticeId);

  return (
    <main>
      <PageHeader
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

      {isPending ? (
        <LoadingScreen label="음원 공지 상세 불러오는 중" />
      ) : isError || !notice ? (
        <div className="py-[64px] text-center text-body-13 text-secondary-500">
          공지를 불러오지 못했어요.
        </div>
      ) : (
        <article className="mt-[20px]">
          <h1 className="text-[22px] font-bold text-secondary-1">
            {notice.title}
          </h1>
          <time className="mt-[12px] mb-[12px] block text-body-12 font-medium text-secondary-600">
            {formatDate(notice.createdAt)}
          </time>
          {notice.links.map((link, idx) => (
            <div
              key={`${link.label}-${idx}`}
              className="text-body-12 font-medium text-[#7676ff] mb-[24px]"
            >
              <a href={`${link.url}`}>바로가기 {link.label}</a>
            </div>
          ))}

          <div className="border-t border-secondary-900 pt-[32px] text-body-13 text-secondary-100">
            <p className="whitespace-pre-line leading-[1.7]">
              {notice.content}
            </p>

            {notice.imageUrls.length > 0 && (
              <div className="scrollbar-hidden -mx-5 mt-[32px] flex snap-x snap-mandatory gap-[12px] overflow-x-auto px-5">
                {notice.imageUrls.map((imageUrl, index) => (
                  <div
                    key={`${imageUrl}-${index}`}
                    className="w-full shrink-0 snap-center overflow-hidden rounded-[16px] bg-secondary-900"
                  >
                    {/* API 이미지의 원본 비율이 일정하지 않아 브라우저가 비율을 유지합니다. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imageUrl}
                      alt={`공지 첨부 이미지 ${index + 1}`}
                      className="h-auto w-full"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </article>
      )}

      {notice && <FloatingShareButton title={notice.title} />}
    </main>
  );
}
