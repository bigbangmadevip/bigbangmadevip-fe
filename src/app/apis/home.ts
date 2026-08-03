import { api } from '@/lib/api';
import type { HomeResponse } from '@/types/home';

export async function getHomeData(): Promise<HomeResponse> {
  const response = await api.get<{ data: HomeResponse }>('/api/v1/home');

  return response.data.data;
}
