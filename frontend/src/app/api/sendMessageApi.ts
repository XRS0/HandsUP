import { MessageForGeneration } from "@/features/UserTopics/types/topic";
import apiInstance from "./instance/axiosInstance";

export const sendMessageApiInstance = async (payload: MessageForGeneration, token: string) => {
  const response = await apiInstance({
    method: 'post',
    url: '/generate',
    data: payload,
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.data) {
    throw new Error('Failed to get user');
  }

  return response;
}