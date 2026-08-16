import { useMutation, useQueryClient } from '@tanstack/react-query';
import { participateCheering } from '@/apis/cheering';
import { HOME_QUERY_KEY } from '@/hooks/queries/useHomeQuery';
import { MY_PAGE_QUERY_KEYS } from '@/hooks/queries/useMyPageQuery';

export function useParticipateCheeringMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: participateCheering,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: HOME_QUERY_KEY,
        }),
        queryClient.invalidateQueries({
          queryKey: MY_PAGE_QUERY_KEYS.all,
        }),
      ]);
    },
    onError: (error) => {
      console.error('[participateCheering] 응원 참여 요청 실패', error);
    },
  });
}
