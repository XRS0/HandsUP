import { topicApiInstance } from "./instance/axiosInstance";

export const getTopicApiInstance = async (payload: string, token: string) => {
  const response = await topicApiInstance({
    method: 'get',
    url: `/get_topic/${payload}`,   //topic name
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.data) {
    throw new Error('Failed to get user');
  }

  return response;
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

  return response;
}