import { TopicPreview } from "@/features/UserTopics/types/topic";
import apiInstance from "./instance/axiosInstance";

export const registerTopicApiInstance = async (payload: TopicPreview, token: string) => {
  const response = await apiInstance({
    method: 'post',
    url: '/create_topic',
    data: payload,
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.data) {
    throw new Error('Failed to get user');
  }

  return response;
}