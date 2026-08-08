import { api } from '@/lib/api';
import type { HomeResponse } from '@/types/home';

type HomeApiResponse = {
  data: HomeResponse;
  success: boolean;
};

export async function getHomeData(): Promise<HomeResponse> {
  const response = await api.get<HomeApiResponse>('/api/v1/home');

  return response.data.data;
}
