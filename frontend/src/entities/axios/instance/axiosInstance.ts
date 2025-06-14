import axios from "axios";

const apiInstance = axios.create({
  baseURL: process.env.AUTH_BASE_URL,
});

export default apiInstance;

export const userApiInstance = axios.create({
  baseURL: process.env.USER_BASE_URL,
});

export const topicApiInstance = axios.create({
  baseURL: process.env.CHAT_BASE_URL,
});

export const uploadApiInstance = axios.create({
  baseURL: process.env.UPLOAD_BASE_URL,
});
