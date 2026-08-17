import axios from 'axios';

type CsrfTokenResponse = {
  headerName: string;
  token: string;
};

type ApiResponse<T> = {
  data: T;
  success: boolean;
};

const CSRF_METHODS = ['post', 'put', 'patch', 'delete'];

export const IS_CSRF_ENABLED = process.env.NODE_ENV === 'development';

let csrfHeaderName: string | null = null;
let csrfToken: string | null = null;
let csrfTokenRequest: Promise<void> | null = null;

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://bigbangmadevip.com';

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 12_000,
});

export function initializeCsrfToken() {
  if (!IS_CSRF_ENABLED) {
    return Promise.resolve();
  }

  if (!csrfTokenRequest) {
    csrfTokenRequest = api
      .get<ApiResponse<CsrfTokenResponse>>('/api/v1/csrf-token')
      .then((response) => {
        csrfHeaderName = response.data.data.headerName;
        csrfToken = response.data.data.token;
      })
      .catch((error: unknown) => {
        csrfTokenRequest = null;
        throw error;
      });
  }

  return csrfTokenRequest;
}

export function resetCsrfToken() {
  csrfHeaderName = null;
  csrfToken = null;
  csrfTokenRequest = null;
}

api.interceptors.request.use(async (config) => {
  const method = config.method?.toLowerCase() ?? '';

  if (IS_CSRF_ENABLED && CSRF_METHODS.includes(method)) {
    if (!csrfHeaderName || !csrfToken) {
      await initializeCsrfToken();
    }

    if (csrfHeaderName && csrfToken) {
      config.headers.set(csrfHeaderName, csrfToken);
    }
  }

  return config;
});
