import { UploadFilePayload } from "@/features/UserFirstAction/types";
import { uploadApiInstance } from "./instance/axiosInstance";

export const uploadFileApiInstance = async (payload: UploadFilePayload, token: string) => {
  const response = await uploadApiInstance({
    method: 'post',
    url: `/upload`,
    data: payload,
    headers: { 
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  if (!response.data) {
    throw new Error('Failed to upload file');
  }

  return response.data;
}