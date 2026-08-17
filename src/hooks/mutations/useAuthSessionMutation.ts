import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { logout, withdrawAccount } from '@/apis/auth';
import { resetCsrfToken } from '@/lib/api';

function useClearSession() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return () => {
    resetCsrfToken();
    queryClient.clear();
    router.replace('/login');
    router.refresh();
  };
}

export function useLogoutMutation() {
  const clearSession = useClearSession();

  return useMutation({
    mutationFn: logout,
    onSuccess: clearSession,
    onError: (error) => {
      console.error('[POST /api/v1/logout] 로그아웃 요청 실패', error);
    },
  });
}

export function useWithdrawAccountMutation() {
  const clearSession = useClearSession();

  return useMutation({
    mutationFn: withdrawAccount,
    onSuccess: clearSession,
    onError: (error) => {
      console.error('[DELETE /api/v1/me] 회원탈퇴 요청 실패', error);
    },
  });
}
