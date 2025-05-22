import apiInstance from "./instance/axiosInstance";

export const getTopicApiInstance = async (payload: string, token: string) => {
  const response = await apiInstance({
    method: 'post',
    url: '/get_user',
    data: payload,
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.data) {
    throw new Error('Failed to get user');
  }

  return response;
}