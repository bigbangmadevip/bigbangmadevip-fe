import { API_BASE_URL, api } from '@/lib/api';

export const KAKAO_LOGIN_URL = `${API_BASE_URL}/oauth2/authorization/kakao`;

export type CurrentUser = Record<string, unknown>;

export async function getCurrentUser(signal?: AbortSignal) {
  const response = await api.get<CurrentUser>('/api/v1/me', { signal });
  return response.data;
}
