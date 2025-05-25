import { userApiInstance } from "./instance/axiosInstance";

export const getUserApiInstance = async (token: string) => {
  const response = await userApiInstance.get(`/get_user/${token}`);

  if (!response.data) {
    throw new Error('Failed to get user');
  }

  return response;
}