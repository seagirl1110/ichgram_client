import axios, { AxiosInstance } from 'axios';
import { BASE_URL } from './../config/index';
import { getToken } from './auth';

const axiosWithToken: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosWithToken.interceptors.request.use((config) => {
  const token: string | null = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosWithToken;
