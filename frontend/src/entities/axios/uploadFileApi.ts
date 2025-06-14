import { userApiInstance } from "./instance/axiosInstance";

export const uploadFileApiInstance = async (payload: File, token: string) => {
  const response = await userApiInstance({
    method: 'post',
    url: `/upload`,
    data: payload,
    headers: { 
      Authorization: `Bearer ${token}`,
      "Content-Type":  `${payload.type}`,
      "Content-Length": `${payload.size}`,
    },
  });

  if (!response.data) {
    throw new Error('Failed to upload file');
  }

  return response;
}