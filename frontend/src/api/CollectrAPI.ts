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


export default collectrAPI