import { useMutation, useQueryClient } from '@tanstack/react-query';
import { participateCheering } from '@/apis/cheering';
import { HOME_QUERY_KEY } from '@/hooks/queries/useHomeQuery';

export function useParticipateCheeringMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: participateCheering,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: HOME_QUERY_KEY,
      }),
    onError: (error) => {
      console.error('[participateCheering] 응원 참여 요청 실패', error);
    },
  });
}
