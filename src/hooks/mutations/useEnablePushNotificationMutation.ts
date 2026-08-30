import { useMutation, useQueryClient } from '@tanstack/react-query';
import { registerFcmToken, updatePushSettings } from '@/apis/auth';
import { AUTH_QUERY_KEYS } from '@/hooks/queries/useAuthQuery';
import type { CurrentUser } from '@/lib/auth';
import { requestFcmToken } from '@/lib/firebase-messaging';

export function useEnablePushNotificationMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const fcmToken = await requestFcmToken();

      await registerFcmToken(fcmToken);
      return updatePushSettings({
        urgentPushEnabled: true,
        musicPushEnabled: true,
        votePushEnabled: true,
      });
    },
    onSuccess: (currentUser) => {
      queryClient.setQueryData<CurrentUser>(
        AUTH_QUERY_KEYS.currentUser(),
        currentUser,
      );
    },
  });
}

export function useDismissPushNotificationMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      updatePushSettings({
        urgentPushEnabled: false,
        musicPushEnabled: false,
        votePushEnabled: false,
      }),
    onSuccess: (currentUser) => {
      queryClient.setQueryData<CurrentUser>(
        AUTH_QUERY_KEYS.currentUser(),
        currentUser,
      );
    },
  });
}
