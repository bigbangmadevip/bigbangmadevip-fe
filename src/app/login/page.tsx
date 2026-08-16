'use client';

import LoadingScreen from '@/components/common/LoadingScreen';
import { createKakaoLoginUrl } from '@/lib/auth';
import Image from 'next/image';
import { useState } from 'react';

export default function LoginPage() {
  const [isPending, setIsPending] = useState(false);

  const handleLogin = () => {
    if (isPending) return;

    setIsPending(true);

    window.setTimeout(() => {
      window.location.href = createKakaoLoginUrl();
    }, 50);
  };

  return (
    <main className="flex flex-col min-h-[calc(100dvh-env(safe-area-inset-top))] items-center justify-center px-5">
      {isPending && <LoadingScreen label="로그인 진행 중" />}
      <section>
        <div className="flex flex-col justify-center items-center mb-[64px]">
          <p className="text-[24px] font-bold mb-[24px]">👑</p>
          <p className="text-title-36 font-extralight">BIGBANG</p>
          <p className="text-title-36 font-extralight">MADEVIP</p>
          <p className="text-body-13 mt-[4px]">
            20주년을 향한 <strong>VIP의 응원</strong>
          </p>
        </div>
      </section>
      <button
        type="button"
        onClick={handleLogin}
        disabled={isPending}
        className="flex h-12 w-full max-w-[320px] gap-[8px] items-center justify-center rounded-xl bg-[#FEE500] font-bold text-[#191919]"
      >
        <Image src={'/icon/kakao.svg'} alt="kakaoIcon" width={16} height={16} />
        <p>카카오로 시작하기</p>
      </button>
    </main>
  );
}
