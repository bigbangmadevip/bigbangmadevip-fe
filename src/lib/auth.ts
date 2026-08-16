import { API_BASE_URL, api, initializeCsrfToken } from '@/lib/api';

export function createKakaoLoginUrl(frontendUrl: string) {
  return (
    `${API_BASE_URL}/oauth2/authorization/kakao` +
    `?redirect=${encodeURIComponent(frontendUrl)}`
  );
}

export type CurrentUser = {
  id: number;
  name: string;
  nickname: string;
  provider: string;
  role: string;
  termsAgreed: boolean;
};

type CurrentUserResponse = {
  data: CurrentUser;
};

export async function getCurrentUser(signal?: AbortSignal) {
  const response = await api.get<CurrentUserResponse>('/api/v1/me', {
    signal,
  });

  return response.data.data;
}

export { initializeCsrfToken };
