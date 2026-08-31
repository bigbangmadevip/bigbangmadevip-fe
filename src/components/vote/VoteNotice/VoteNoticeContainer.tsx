'use client';

import Image from 'next/image';
import LoadingScreen from '@/components/common/LoadingScreen';
import { useVoteNoticesQuery } from '@/hooks/queries/useVoteQuery';
import { formatDate } from '@/utils/date';
import VoteNoticeLinkBtn from './VoteNoticeLinkBtn';
import VoteNoticeListItem from './VoteNoticeListItem';

export default function VoteNoticeContainer() {
  const { data: notices, isPending, isError } = useVoteNoticesQuery();

  return (
    <section className="mt-[24px]">
      <VoteNoticeLinkBtn
        iconSrc="/icon/x-logo-circle.svg"
        title="투표총공팀 X 바로가기"
        description="실시간 공지와 긴급 안내를 확인하세요!"
        href="https://x.com/_voteinpeace"
      />

      {isPending ? (
        <LoadingScreen label="투표 공지 불러오는 중" />
      ) : isError ? (
        <div className="py-[64px] text-center text-body-13 text-secondary-500">
          공지를 불러오지 못했어요.
        </div>
      ) : notices.length > 0 ? (
        <div>
          {notices.map((notice) => (
            <VoteNoticeListItem
              key={notice.id}
              noticeId={String(notice.id)}
              title={notice.title}
              date={formatDate(notice.createdAt)}
              pinned={notice.pinned}
              showThumbnail={false}
            />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[calc(100dvh-env(safe-area-inset-top)-340px)] flex-col items-center justify-center gap-[2px]">
          <Image
            src="/icon/empty.svg"
            alt=""
            width={64}
            height={64}
            aria-hidden="true"
          />
          <p className="text-body-13 text-secondary-500">
            올라온 공지가 없어요.
          </p>
        </div>
      )}
    </section>
  );
}
