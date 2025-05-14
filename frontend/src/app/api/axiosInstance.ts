// import process from "process";
import axios from "axios";

const apiInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
});

export default apiInstance;