import { MessageForGeneration } from "@/features/UserTopics/types/topic";
import { topicApiInstance } from "./instance/axiosInstance";

export const sendMessageApiInstance = async (payload: MessageForGeneration, token: string) => {
  const messageDTO = {...payload}
  delete messageDTO.topic;

  const response = await topicApiInstance({
    method: 'post',
    url: `/message/${payload.topic!.split(" ").join("_")}`,
    data: messageDTO,
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.data) {
    throw new Error('Failed to get user');
  }

  return response;
}