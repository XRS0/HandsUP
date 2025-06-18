import apiInstance from "@/entities/axios/instance/axiosInstance";
import { SignInClientData } from "@/features/LoginUser/types";
import { SignUpClientData } from "@/features/RegisterUser/types";

export const registerApiInstance = async (payload: SignUpClientData) => { 
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

export const loginApiInstance = async (payload: SignInClientData, token: string | null) => {
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
