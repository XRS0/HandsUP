import apiInstance from "./instance/axiosInstance";

export const getUserApiInstance = async (token: string) => {
  const response = await apiInstance.get(
    `/get_user/${token}`,
    { withCredentials: true }
  );

  if (!response.data) {
    throw new Error('Failed to get user');
  }

  return response;
}

export const updateUserTokenApiInstance = async () => {
  const response = await apiInstance({
    method: 'get',
    url: '/refresh',
  });

  if (!response.data) {
    throw new Error('Failed to get new jwts');
  }

  return response.data;
}