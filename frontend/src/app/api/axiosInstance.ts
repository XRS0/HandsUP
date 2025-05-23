import axios from "axios";

const apiInstance = axios.create({
  baseURL: process.env.REST_BASE_URL,
});

export default apiInstance;