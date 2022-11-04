import axios from 'axios';
import { getToken } from './auth';

const api = axios.create({
  baseURL: 'https://delta-delivery.herokuapp.com',
});

api.interceptors.request.use(async (config) => {
  const token = getToken();

  if (token) {
    if (config.headers) config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
