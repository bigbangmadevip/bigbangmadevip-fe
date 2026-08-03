import { KAKAO_LOGIN_URL } from '@/lib/auth';

export default function LoginPage() {
  return (
    <main className="flex min-h-[calc(100dvh-env(safe-area-inset-top))] items-center justify-center px-5">
      <a
        href={KAKAO_LOGIN_URL}
        className="flex h-12 w-full max-w-[320px] items-center justify-center rounded-xl bg-[#FEE500] font-bold text-[#191919]"
      >
        카카오로 로그인
      </a>
    </main>
  );
}
