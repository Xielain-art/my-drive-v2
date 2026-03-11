import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('kc_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
