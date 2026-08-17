'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoadingScreen from '@/components/common/LoadingScreen';
import { useCurrentUserQuery } from '@/hooks/queries/useAuthQuery';
import { initializeCsrfToken } from '@/lib/auth';

type AuthGateProps = {
  children: React.ReactNode;
};

const LOCAL_AUTH_BYPASS_PATHS = ['/schedule', '/mypage'];

export function AuthGate({ children }: AuthGateProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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

    let cancelled = false;

    const initializeAuth = async () => {

      try {
        await initializeCsrfToken();
      } catch (error) {
        console.error('[GET /api/v1/csrf-token] 요청 실패', error);
      }

      if (!cancelled) {
        setIsAuthenticated(true);
      }
    };

    void initializeAuth();

    return () => {
      cancelled = true;
    };
  }, [canBypassAuth, currentUser, isError, router]);

  if (canBypassAuth) {
    return children;
  }

  if (isPending || !isAuthenticated) {
    return <LoadingScreen label="로그인 확인 중" />;
  }

  return children;
}
