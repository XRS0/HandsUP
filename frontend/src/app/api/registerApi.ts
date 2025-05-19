import apiInstance from "@/app/api/axiosInstance";
import { LoginResponseData, RegisterResponseData } from "@/features/types";

export const registerApiInstance = async (payload: RegisterResponseData) => { 
  const response = await apiInstance.post("/register", payload);
  if (!response.data) {
    throw new Error('Failed to fetch register');
  }

  return response.data;
}

export const loginApiInstance = async (payload: LoginResponseData, token: string) => {
  // let config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   }
  // }
  const response = await apiInstance.post("/login", payload);
  if (!response.data) {
    throw new Error('Failed to fetch login');
  }

  return response.data;
}