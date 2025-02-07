// src/services/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/', // Your backend API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to headers if available
axiosInstance.interceptors.request.use(
  (config) => {
    const token = document.cookie.split('; ').find(row => row.startsWith('access_token='));
    if (token) {
      config.headers['Authorization'] = `Bearer ${token.split('=')[1]}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
