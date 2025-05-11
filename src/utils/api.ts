import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { env } from './env';

// Create axios instance with default config
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  timeout: env.apiTimeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (env.enableLogging) {
      console.log(`Making request to ${config.url}`);
    }
    return config;
  },
  (error: AxiosError) => {
    if (env.enableLogging) {
      console.error('Request error:', error);
    }
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    if (env.enableLogging) {
      console.log(`Response from ${response.config.url}:`, response.status);
    }
    return response;
  },
  (error: AxiosError) => {
    if (env.enableLogging) {
      console.error('Response error:', error);
    }
    return Promise.reject(error);
  }
);
