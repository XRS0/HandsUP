import apiInstance from "@/app/api/instance/axiosInstance";
import { SignInResponseData, SignUpResponseData } from "@/features/Auth/types/auth";

export const registerApiInstance = async (payload: SignUpResponseData) => { 
  const response = await apiInstance({
    method: 'post',
    url: '/register', 
    data: payload,
    timeout: 5000,
  });
  if (!response.data) {
    throw new Error('Failed to fetch registration');
  }
  
  return response.data;
}

export const loginApiInstance = async (payload: SignInResponseData, token: string | null) => {
  const response = await apiInstance({
    method: 'post',
    url: '/login', 
    data: payload,
    timeout: 5000,
    headers: { Authorization: `Bearer ${token ? token : ''}` },
  });
  if (!response.data) {
    throw new Error('Failed to fetch login');
  }

  return response.data;
}
