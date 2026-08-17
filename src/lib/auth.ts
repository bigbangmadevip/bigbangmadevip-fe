import { API_BASE_URL, api, initializeCsrfToken } from '@/lib/api';

const LOCAL_FRONTEND_URL = 'http://localhost:3000';
const PRODUCTION_FRONTEND_URL = 'https://www.bigbangmadevip.com';

function isLocalFrontendUrl(url: string) {
  try {
    const hostname = new URL(url).hostname;

    return hostname === 'localhost' || hostname === '127.0.0.1';
  } catch {
    return false;
  }
}

export function getLoginRedirectUrl() {
  if (process.env.NODE_ENV === 'development') {
    return LOCAL_FRONTEND_URL;
  }

  const configuredUrl = process.env.NEXT_PUBLIC_FRONTEND_URL?.trim();

  if (!configuredUrl || isLocalFrontendUrl(configuredUrl)) {
    return PRODUCTION_FRONTEND_URL;
  }

  return configuredUrl;
}

export function createKakaoLoginUrl() {
  const redirectUrl = getLoginRedirectUrl();

  return (
    `${API_BASE_URL}/oauth2/authorization/kakao` +
    `?redirect=${encodeURIComponent(redirectUrl)}`
  );
}

export type CurrentUser = {
  id: number;
  name: string;
  nickname: string;
  email: string;
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
