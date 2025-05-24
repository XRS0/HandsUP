import apiInstance from "@/app/api/instance/axiosInstance";
import { SignInResponseData, SignUpResponseData } from "@/features/Auth/types/auth";

export const registerApiInstance = async (payload: SignUpResponseData) => { 
  const response = await apiInstance.post("/register", payload);
  if (!response.data) {
    throw new Error('Failed to fetch register');
  }

  return response.data;
}

export const loginApiInstance = async (payload: SignInResponseData, token: string | null) => {
  const response = await apiInstance({
    method: 'post',
    url: '/login', 
    data: payload,
    headers: { Authorization: `Bearer ${token ? token : ''}` },
  });
  if (!response.data) {
    throw new Error('Failed to fetch login');
  }

  return response.data;
}