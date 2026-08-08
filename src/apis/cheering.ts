import { api } from '@/lib/api';

export async function participateCheering(cheeringId: string) {
  const response = await api.post(`/api/v1/cheerings/${cheeringId}`);

  return response.data;
}
