// utils/axiosConfig.js
import axios from 'axios';

export const base_url = "http://localhost:5000/api/";

export const getTokenFromLocalStorage = () => {
  const customer = localStorage.getItem("customer")
    ? JSON.parse(localStorage.getItem("customer"))
    : null;
  return customer?.token;
};

export const config = {
  headers: {
    'Authorization': `Bearer ${getTokenFromLocalStorage()}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

// Create axios instance with default config
export const axiosInstance = axios.create({
  baseURL: base_url,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getTokenFromLocalStorage();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);