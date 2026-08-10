'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoadingScreen from '@/components/common/LoadingScreen';
import { getCurrentUser, initializeCsrfToken } from '@/lib/auth';

type AuthGateProps = {
  children: React.ReactNode;
};

export function AuthGate({ children }: AuthGateProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const authenticate = async () => {
      try {
        await getCurrentUser(controller.signal);
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
  }, [router]);

  if (!isAuthenticated) {
    return <LoadingScreen label="로그인 확인 중" />;
  }

  return children;
}
