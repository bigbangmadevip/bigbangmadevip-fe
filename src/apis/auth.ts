import { api } from '@/lib/api';

type TermsAgreement = {
  termsAgreed: boolean;
};

type TermsAgreementResponse = {
  data: TermsAgreement;
};

type AuthActionResponse = {
  success: boolean;
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
