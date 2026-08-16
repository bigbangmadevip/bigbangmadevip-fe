import { agreeToTerms } from '@/apis/auth';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export function useAgreeToTermsMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: agreeToTerms,
    onSuccess: ({ termsAgreed }) => {
      if (termsAgreed) {
        router.replace('/');
      }
    },
    onError: (error) => {
      console.error('[agreeToTerms] 약관 동의 요청 실패', error);
    },
  });
}
