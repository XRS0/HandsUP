import { topicApiInstance } from "./instance/axiosInstance";

export const getTopicApiInstance = async (payload: string, token: string) => {
  const response = await topicApiInstance({
    method: 'get',
    url: `/chats/${payload.split(" ").join("_")}`,   //topic name
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.data) {
    throw new Error('Failed to get user');
  }

  return response.data;
}

export const getAllTopicApiInstance = async (token: string) => {
  const response = await topicApiInstance({
    method: 'get',
    url: `/chats`,
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.data) {
    throw new Error('Failed to get user');
  }

  return response.data;
}