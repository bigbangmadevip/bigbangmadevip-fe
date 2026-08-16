import { api } from '@/lib/api';

type TermsAgreement = {
  termsAgreed: boolean;
};

type TermsAgreementResponse = {
  data: TermsAgreement;
};

export async function agreeToTerms() {
  const response = await api.post<TermsAgreementResponse>(
    '/api/v1/me/terms-agreement',
  );

  return response.data.data;
}
