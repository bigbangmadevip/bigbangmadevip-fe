'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getCurrentUser } from '@/lib/auth';

type AuthGateProps = {
  children: React.ReactNode;
};

export function AuthGate({ children }: AuthGateProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    getCurrentUser(controller.signal)
      .then(() => setIsAuthenticated(true))
      .catch((error: unknown) => {
        if (!axios.isCancel(error)) {
          router.replace('/login');
        }
      });

    return () => controller.abort();
  }, [router]);

  if (!isAuthenticated) {
    return (
      <main className="flex min-h-[calc(100dvh-env(safe-area-inset-top))] items-center justify-center">
        <p className="text-sm text-[#777777]">로그인 확인 중...</p>
      </main>
    );
  }

  return children;
}
