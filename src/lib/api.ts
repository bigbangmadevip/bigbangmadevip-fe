import axios from 'axios';

// export const API_BASE_URL =
//   process.env.NEXT_PUBLIC_API_BASE_URL ??
//   'https://occultist-small-maximum.ngrok-free.dev';

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://bigbangmadevip.com';

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  withXSRFToken: true,
});
