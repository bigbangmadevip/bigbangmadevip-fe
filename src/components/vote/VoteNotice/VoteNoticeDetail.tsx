'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { VOTE_NOTICE_MOCK_DATA } from './mock';

interface VoteNoticeDetailProps {
  noticeId: string;
}

export default function VoteNoticeDetail({
  noticeId,
}: VoteNoticeDetailProps) {
  const router = useRouter();
  const notice = VOTE_NOTICE_MOCK_DATA.find((item) => item.id === noticeId);

  return (
    <main>
      <header className="flex items-center py-[16px]">
        <button
          type="button"
          className="flex items-center justify-start"
          aria-label="뒤로가기"
          onClick={() => router.back()}
        >
          <Image
            src="/icon/arrow-left_white-24.svg"
            alt="arrowIcon"
            width={24}
            height={24}
            aria-hidden="true"
          />
        </button>
      </header>

      <article className="mt-[20px]">
        <h1 className="text-[22px] font-bold text-secondary-1">
          {notice?.title ?? '공지 상세'}
        </h1>
        <time className="mt-[12px] mb-[24px] block text-body-12 font-medium text-secondary-600">
          {notice?.date ?? ''}
        </time>

        <div className="border-t border-secondary-900 pt-[32px] text-body-13 text-secondary-100">
          <p>안녕하세요, 투표총공팀입니다.</p>
          <p className="mt-[24px]">
            인기가요 사전투표 가이드 일부 내용이 수정되어 업데이트
            되었습니다.
          </p>

          <p className="mt-[24px]">
            기존 가이드를 확인하셨던 VIP분들은 최신 가이드를 다시 확인 후
            투표에 참여해주세요.
          </p>

          <div
            className="mt-[32px] aspect-[335/440] w-full rounded-[16px] bg-secondary-800"
            role="img"
            aria-label="공지 관련 이미지 영역"
          />
        </div>
      </article>
    </main>
  );
}
