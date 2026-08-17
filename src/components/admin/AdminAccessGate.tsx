'use client';

import LoadingScreen from '@/components/common/LoadingScreen';
import { useCurrentUserQuery } from '@/hooks/queries/useAuthQuery';
import type { UserRole } from '@/lib/auth';

type AdminAccessGateProps = {
  allowedRoles: UserRole[];
  children: React.ReactNode;
};

export default function AdminAccessGate({
  allowedRoles,
  children,
}: AdminAccessGateProps) {
  const { data: currentUser, isPending, isError } = useCurrentUserQuery();

  if (isPending) {
    return <LoadingScreen label="관리자 권한 확인 중" />;
  }

  if (isError || !currentUser || !allowedRoles.includes(currentUser.role)) {
    return (
      <main className="flex min-h-[calc(100dvh-env(safe-area-inset-top))] items-center justify-center px-5 text-center">
        <p className="text-body-13 text-secondary-400">
          관리자 페이지에 접근할 권한이 없어요.
        </p>
      </main>
    );
  }

  return children;
}
