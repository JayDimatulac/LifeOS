import axios from 'axios';

/**
 * Central Axios instance for all API calls.
 * In development, Vite proxies "/api" to the ASP.NET Core backend (see vite.config.ts).
 * In production, set VITE_API_URL to the deployed API's base URL.
 */
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach the access token (once auth is implemented) to every request.
api.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('lifeos-access-token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Centralized error handling / future refresh-token logic goes here.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);
