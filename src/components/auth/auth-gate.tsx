'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LoadingScreen from '@/components/common/LoadingScreen';
import { useCurrentUserQuery } from '@/hooks/queries/useAuthQuery';
import { initializeCsrfToken } from '@/lib/auth';
import { IS_CSRF_ENABLED } from '@/lib/api';

type AuthGateProps = {
  children: React.ReactNode;
};

const PROTECTED_PATHS = ['/mypage'];

function isProtectedPath(pathname: string) {
  return PROTECTED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

export function AuthGate({ children }: AuthGateProps) {
  const router = useRouter();
  const pathname = usePathname();
  const requiresAuth = isProtectedPath(pathname);
  const { data: currentUser, isPending, isError } = useCurrentUserQuery();

  useEffect(() => {
    if (isError) {
      return;
    }

    if (!isPending && !currentUser && requiresAuth) {
      router.replace('/login');
      return;
    }

    if (currentUser && !currentUser.termsAgreed) {
      router.replace('/agreement');
      return;
    }

    if (IS_CSRF_ENABLED) {
      // 로컬 변경 요청에 필요한 CSRF 토큰은 조회 화면을 막지 않고 준비한다.
      void initializeCsrfToken().catch((error: unknown) => {
        console.error('[GET /api/v1/csrf-token] 요청 실패', error);
      });
    }
  }, [
    currentUser,
    isError,
    isPending,
    requiresAuth,
    router,
  ]);

  if (currentUser && !currentUser.termsAgreed) {
    return <LoadingScreen label="로그인 확인 중" />;
  }

  // 공개 화면과 인증 확인 중인 보호 화면은 렌더링을 막지 않는다.
  // 비로그인 보호 경로는 위 effect에서 로그인 화면으로 이동한다.
  return children;
}
