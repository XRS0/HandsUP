import apiInstance from "@/app/api/axiosInstance";
import { RegisterRawData } from "./types";

export const userApiInstance = async (payload: RegisterRawData) => {
  
  const response = payload ? await apiInstance.post("./users", payload) :  await apiInstance.get("./users");
  if (!response.data) {
    throw new Error('Failed to fetch register');
  }

  return response.data;
}