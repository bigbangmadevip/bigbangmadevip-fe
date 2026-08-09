'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MUSIC_NOTICE_MOCK_DATA } from './mock';

interface MusicNoticeDetailProps {
  noticeId: string;
}

export default function MusicNoticeDetail({
  noticeId,
}: MusicNoticeDetailProps) {
  const router = useRouter();
  const notice = MUSIC_NOTICE_MOCK_DATA.find((item) => item.id === noticeId);

  return (
    <main>
      <header className="flexp py-[16px] items-center">
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

        <div className="pt-[32px] border-t border-secondary-900 text-body-13 text-secondary-100">
          <p>안녕하세요, 음원총공팀입니다.</p>
          <p className="mt-[24px]">
            스트리밍 리스트 일부 구성이 수정되어 ver.2로 업데이트 되었습니다.
          </p>

          <p className="mt-[24px]">
            기존 리스트를 사용 중이셨던 VIP분들은 최신 리스트로 다시 확인 후
            스트리밍에 참여해주세요.
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
