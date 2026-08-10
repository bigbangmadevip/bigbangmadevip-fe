'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import guideImage from '@/assets/guides/muniverse-vote-guide.png';

export default function GuideDetailPage() {
  const router = useRouter();

  return (
    <main>
      {/* HEADER */}
      <header className="relative flex h-[52px] items-center justify-center">
        <button
          type="button"
          className="absolute left-0 flex h-[44px] w-[44px] items-center justify-start"
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

        <h1 className="text-title-17 font-bold">멜론 스트리밍 가이드</h1>
      </header>

      <div className="mt-[24px]">
        <Image
          src={guideImage}
          alt="voteGuide"
          priority
          className="h-auto w-full"
        />
      </div>
    </main>
  );
}
