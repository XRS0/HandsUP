import apiInstance from "./instance/axiosInstance";

export const getUserTokenApiInstance = async (token: string) => {
  const response = await apiInstance({
    method: 'get',
    url: '/get_user',
    headers: { Authorization: `Bearer ${token}` },
  });

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