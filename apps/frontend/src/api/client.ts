import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,

});

apiClient.interceptors.request.use((config) => {
  return config;
});
