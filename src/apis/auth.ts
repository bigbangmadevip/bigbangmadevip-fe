import { api } from '@/lib/api';
import type { CurrentUser } from '@/lib/auth';

type TermsAgreement = {
  termsAgreed: boolean;
};

type TermsAgreementResponse = {
  data: TermsAgreement;
};

type AuthActionResponse = {
  success: boolean;
};

type RegisterFcmTokenResponse = {
  success: boolean;
};

export type PushSettings = {
  urgentPushEnabled: boolean;
  musicPushEnabled: boolean;
  votePushEnabled: boolean;
};

type PushSettingsResponse = {
  data: CurrentUser;
  success?: boolean;
};

export async function agreeToTerms() {
  const response = await api.post<TermsAgreementResponse>(
    '/api/v1/me/terms-agreement',
  );

  return response.data.data;
}

export async function logout() {
  const response = await api.post<AuthActionResponse>('/api/v1/logout');

  return response.data;
}

export async function withdrawAccount() {
  const response = await api.delete<AuthActionResponse>('/api/v1/me');

  return response.data;
}

export async function registerFcmToken(fcmToken: string) {
  const response = await api.patch<RegisterFcmTokenResponse>(
    '/api/v1/me/fcm-token',
    { fcmToken },
  );

  return response.data;
}

export async function updatePushSettings(settings: PushSettings) {
  const response = await api.patch<PushSettingsResponse>(
    '/api/v1/me/push-settings',
    settings,
  );

  return response.data.data;
}
