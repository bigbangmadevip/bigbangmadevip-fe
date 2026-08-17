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

const LOCAL_AUTH_BYPASS_PATHS = ['/schedule', '/mypage'];

export function AuthGate({ children }: AuthGateProps) {
  const router = useRouter();
  const pathname = usePathname();
  const canBypassAuth =
    process.env.NODE_ENV === 'development' &&
    LOCAL_AUTH_BYPASS_PATHS.some(
      (path) => pathname === path || pathname.startsWith(`${path}/`),
    );
  const {
    data: currentUser,
    isPending,
    isError,
  } = useCurrentUserQuery(!canBypassAuth);

  useEffect(() => {
    if (canBypassAuth) return;

    if (isError) {
      router.replace('/login');
      return;
    }

    if (!currentUser) return;

    if (!currentUser.termsAgreed) {
      router.replace('/agreement');
      return;
    }

    if (IS_CSRF_ENABLED) {
      // 로컬 변경 요청에 필요한 CSRF 토큰은 조회 화면을 막지 않고 준비한다.
      void initializeCsrfToken().catch((error: unknown) => {
        console.error('[GET /api/v1/csrf-token] 요청 실패', error);
      });
    }
  }, [canBypassAuth, currentUser, isError, router]);

  if (canBypassAuth) {
    return children;
  }

  if (isPending || isError || !currentUser?.termsAgreed) {
    return <LoadingScreen label="로그인 확인 중" />;
  }

  return children;
}
