import axios from "axios";
import { apiEndpoints } from "@/assets/constants/";

const collectrAPI = axios.create({
  baseURL: apiEndpoints.api,
  headers: {
    "Content-Type": "application/json",

  }
})

export default collectrAPI