import axios, { AxiosError } from 'axios';
import { env } from '../../app/config/env'
import type { HttpError } from '../types/http-error';

export const httpClient = axios.create({
    baseURL: env.apiBaseUrl,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// httpClient.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('access_token');

//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }

//         return config;
//     },
//     (error) => Promise.reject(error)
// );

httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const normalizedError: HttpError = {
      status: error.response?.status ?? 0,
      message:
        (error.response?.data as any)?.message ??
        'Unexpected error occurred',
    };

    return Promise.reject(normalizedError);
  }
);
