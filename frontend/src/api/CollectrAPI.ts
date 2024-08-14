import axios from "axios";
import { apiEndpoints } from "@/assets/constants/";

const collectrAPI = axios.create({
  baseURL: apiEndpoints.api,
  headers: {
    "Content-Type": "application/json",

  }
})

collectrAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


collectrAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry
    ) {
      localStorage.removeItem('jwt');
    }

    return Promise.reject(error);
  },
);


export default collectrAPI