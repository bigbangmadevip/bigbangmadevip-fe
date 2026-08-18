import { api } from '@/lib/api';

export type ParticipateCheeringResponse = {
  typeCompletedCount: number;
};

type ParticipateCheeringApiResponse = {
  data: ParticipateCheeringResponse;
  success?: boolean;
};

export async function participateCheering(
  cheeringId: string,
): Promise<ParticipateCheeringResponse> {
  const response = await api.post<ParticipateCheeringApiResponse>(
    `/api/v1/cheerings/${cheeringId}`,
  );

  return response.data.data;
}
