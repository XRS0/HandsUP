import { TopicPreview } from "@/features/UserChat/types";
import { topicApiInstance } from "./instance/axiosInstance";

export const registerTopicApiInstance = async (payload: TopicPreview, token: string) => {
  const response = await topicApiInstance({
    method: 'post',
    url: `/chats/${payload.topic.split(" ").join("_")}`,
    data: payload,
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.data) {
    throw new Error('Failed to to create topics');
  }

  return response;
}