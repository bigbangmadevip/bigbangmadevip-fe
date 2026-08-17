import { agreeToTerms } from '@/apis/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { AUTH_QUERY_KEYS } from '@/hooks/queries/useAuthQuery';
import type { CurrentUser } from '@/lib/auth';

export function useAgreeToTermsMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: agreeToTerms,
    onSuccess: ({ termsAgreed }) => {
      if (termsAgreed) {
        queryClient.setQueryData<CurrentUser>(
          AUTH_QUERY_KEYS.currentUser(),
          (currentUser) =>
            currentUser ? { ...currentUser, termsAgreed: true } : currentUser,
        );
        router.replace('/');
      }
    },
    onError: (error) => {
      console.error('[agreeToTerms] 약관 동의 요청 실패', error);
    },
  });
}
