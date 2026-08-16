'use client';

import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoadingScreen from '@/components/common/LoadingScreen';
import { getCurrentUser, initializeCsrfToken } from '@/lib/auth';

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
    LOCAL_AUTH_BYPASS_PATHS.includes(pathname);

  useEffect(() => {
    if (canBypassAuth) return;

    const controller = new AbortController();

    const authenticate = async () => {
      try {
        const user = await getCurrentUser(controller.signal);

        if (!user.termsAgreed) {
          router.replace('/agreement');
          return;
        }
      } catch (error: unknown) {
        if (!axios.isCancel(error)) {
          router.replace('/login');
        }

        return;
      }

      try {
        await initializeCsrfToken();
      } catch (error) {
        console.error('[GET /api/v1/csrf-token] 요청 실패', error);
      }

      if (!controller.signal.aborted) {
        setIsAuthenticated(true);
      }
    };

    void authenticate();

    return () => controller.abort();
  }, [canBypassAuth, router]);

  if (canBypassAuth) {
    return children;
  }

  if (!isAuthenticated) {
    return <LoadingScreen label="로그인 확인 중" />;
  }

  return children;
}
